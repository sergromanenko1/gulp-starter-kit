import glob         from 'glob';

import gulp         from 'gulp';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';
import gulpSass     from 'gulp-sass';
import postcss      from 'gulp-postcss';
import ttf2woff2    from 'gulp-ttf2woff2';
import spritesmith  from 'gulp.spritesmith';
import svgSprite    from 'gulp-svg-sprite';
import replace      from 'gulp-replace';
import rename       from 'gulp-rename';

import mergeStream  from 'merge-stream';
import buffer       from 'vinyl-buffer';
import source       from 'vinyl-source-stream';

import browserSync  from 'browser-sync';
import browserify   from 'browserify';
import babelify     from 'babelify';
import watchify     from 'watchify';
import esmify       from 'esmify';

import dartSass     from 'sass-embedded';
import autoprefixer from 'autoprefixer';
import cssMqpacker  from '@hail2u/css-mqpacker';
import cssnano      from 'cssnano';

import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp       from 'imagemin-webp';
import extReplace from 'gulp-ext-replace';

const {src, dest, series, parallel, watch} = gulp;
const sass = gulpSass( dartSass );

const SCRIPT_FILES = glob.sync('resources/js/*.js');

const B_LIST = SCRIPT_FILES.map((file) => {
	return browserify(Object.assign({}, watchify.args, {
		entries: file,
		debug:   true,
		plugin: [[esmify]],
	}))
	.transform('babelify', {presets: ['@babel/preset-env']})
	.transform('browserify-shim', {global: true});
});



function buildCss(min) {
	let plugins = [
		autoprefixer(),
		cssMqpacker({
			sort: (a, b) => {
				let queries = [a, b].map((query) => {
					return query
						.split(/,|and/i)
						.map((item) => {
							let type  = null,
								value = /:(.*?)px\)/g.exec(item);

							if (-1 !== item.indexOf('max')) {
								type = 'max';
							}
							if (-1 !== item.indexOf('min')) {
								type = 'min';
							}

							return {
								type:  type,
								value: value ? parseInt(value[1]) : value,
							};
						})
						.filter((item) => item.type && item.value);
				});

				a = queries[0];
				b = queries[1];

				for (let i = 0, length = Math.max(a.length, b.length); i < length; i++) {
					if (!a[i] || !b[i]) {
						return !a[i] ? -1 : 1;
					}

					if (a[i].type !== b[i].type) {
						return ('max' === a[i].type) ? -1 : 1;
					}

					if (a[i].value !== b[i].value) {
						return ('max' === a[i].type) ?
							((a[i].value < b[i].value) ? 1 : -1) :
							((a[i].value < b[i].value) ? -1 : 1);
					}
				}
			}
		}),
	];

	const IS_MIN = 'min' === min;

	if (IS_MIN) {
		plugins.push(cssnano());
	}

	return src('resources/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('/**', '/*!'))
		.pipe(rename((path) => {
			path.basename += IS_MIN ? '.min' : '';
		}))
		.pipe(postcss(plugins))
		.pipe(sourcemaps.mapSources((sourcePath) => {
			// Удалить css файлы из карты
			sourcePath = sourcePath.replace('.min', '').replace('.css', '.scss');

			if (-1 !== sourcePath.indexOf('components')) {
				sourcePath = sourcePath.replace('..', '../../resources');
			}
			if (-1 === sourcePath.indexOf('..')) {
				sourcePath = '../../resources/scss/' + sourcePath;
			}

			return sourcePath;
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('public/css/'))
		.pipe(browserSync.stream({
			match: '**/main.css',
		}));
}



const buildMinCss = buildCss.bind(null, 'min');



function buildJs(min) {
	const IS_MIN = 'min' === min;

	return mergeStream(SCRIPT_FILES.map((file, i) => {
		const FILENAME = file.split('/').pop();

		let stream = B_LIST[i]
			.bundle()
			.on('error', function(error) {
				console.log(error.stack);
				this.emit('end');
			})
			.pipe(source(FILENAME))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(rename((path) => {
				path.basename += IS_MIN ? '.min' : '';
			}));

		if (IS_MIN) {
			stream.pipe(replace(/(\n|\r|\r\n);(|\n|\r|\r\n)\(function/g, '\n(function'))
				.pipe(uglify({
					output: {
						comments: /^\**!|@preserve|@license|@cc_on|author|copyright|sourceMappingURL/i,
					},
				}));
		}

		stream.pipe(sourcemaps.mapSources((sourcePath) => {
				return '../../' + sourcePath;
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(dest('public/js/'));

		return stream;
	}));
}



const buildMinJs = buildJs.bind(null, 'min');



function optimizeImg(src) {
	return src
		.pipe(imagemin([
			gifsicle(),
			mozjpeg({
				quality: 90,
			}),
			optipng(),
			svgo({
				plugins: [{
					name: 'preset-default',
					params: {
						overrides: {
							removeViewBox: false,
							cleanupIDs:    false,
						},
					},
				}]
			})
		]));
}



function buildImg() {
	const srcOther = optimizeImg(src(['resources/img/min/**/*.*', '!resources/img/min/**/*.{jpg,png}']));
	const srcNoMin = src('resources/img/no-min/**/*.*');

	const srcWebp = optimizeImg(src('resources/img/min/**/*.{jpg,png}'))
		.pipe(imagemin([
			webp({
				quality: 95
			}),
		]))
		.pipe(extReplace('.webp'));

	return mergeStream(srcOther, srcNoMin, srcWebp).pipe(dest('public/img/'));
}



function buildPngSprite() {
	var spriteData = src('resources/img/sprite-png/**/*.*').pipe(spritesmith({
		imgName: 'sprite.png',
		imgPath: '../img/sprite.png',
		cssName: 'sprite.scss',
		padding: 1
	}));

	var imgStream = optimizeImg(spriteData.img.pipe(buffer())).pipe(dest('public/img/')),
		cssStream = spriteData.css.pipe(dest('resources/components/sprite/'));

	return mergeStream(imgStream, cssStream);
}



function buildSvgSprite() {
	return src('resources/img/sprite-svg/**/*.svg')
		.pipe(svgSprite({
			mode: {
				defs: {
					dest:   '',
					sprite: 'sprite.svg'
				}
			},
			svg: {
				xmlDeclaration: false
			}
		}))
		.pipe(dest(/*'resources/img/sprite-svg-result/'*/'public/img/'));
}



function buildFonts() {
	return src('resources/fonts/**/*.ttf')
		.pipe(ttf2woff2({
			clone: true
		}))
		.pipe(dest('public/fonts/'));
}



function runServer(cb) {
	browserSync({
		proxy: 'http://localhost/gulp-start3/',
		notify: false,
		ui:     false,
		ghostMode: {
			clicks: false,
			forms:  true,
			scroll: true,
		},
	});
	cb();
}



function reloadBrowsers(cb) {
	browserSync.reload();
	cb();
}



function watchFiles(cb) {
	/*
	Лучше указывать только разрешающие globs, без запрещающих.
	Иначе большое количество файлов в папках /node_modules и /vendor всё равно считываются и возможна утечка памяти с крашем.
	*/
	watch(['*.php', 'inc/**/*.php', 'templates/**/*.php', 'template-parts/**/*.php', 'woocommerce/**/*.php'], reloadBrowsers);
	watch(['resources/scss/*.scss', 'resources/components/**/*.scss'], buildCss);
	watch(['resources/img/min/**/*.*', 'resources/img/no-min/**/*.*'], buildImg);
	watch('resources/img/sprite-png/**/*.*', series(buildPngSprite, buildCss));
	watch('resources/img/sprite-svg/**/*.*', buildSvgSprite);
	watch('resources/fonts/**/*.ttf', buildFonts);

	B_LIST.forEach((B) => {
		B.plugin(watchify);
		B.on('update', function() {
			buildJs();
			browserSync.reload();
		});
	} );
	cb();
}



const dev = parallel(series(buildPngSprite, buildCss), buildJs, buildImg, buildSvgSprite, buildFonts);

export const minify = parallel(series(buildPngSprite, buildMinCss), buildMinJs, buildImg, buildSvgSprite, buildFonts);
export { buildJs, buildMinJs, buildCss, buildMinCss, buildImg };
export default parallel(series(dev, runServer), watchFiles);
