import $ from 'jquery';
import { $window, MIN_DELAY } from '../variables/variables.js';
import { debounce } from '../functions/functions.js';



function init() {
	if (/MSIE|trident/i.test(navigator.userAgent)) {
		let $uses = $('use');

		if (!$uses.length) {
			return;
		}

		const SPRITE_HREF = $uses.attr('xlink:href').split('#').shift();

		$.get(SPRITE_HREF, (sprite) => {
			$uses.each(function() {
				let $use = $(this);

				const ID = $use.attr('xlink:href').split('#').pop();

				let svg = sprite.getElementById(ID);

				if (-1 === $use.attr('xlink:href').indexOf(SPRITE_HREF)) {
					return;
				}

				if (svg) {
					svg = svg.cloneNode(true);
					svg.removeAttribute('id');
					$use.replaceWith(svg);
				} else {
					$use.remove();
				}
			});
			init();
		});
	}
}



$(() => {
	init();
	$window.on('resizeWidth', debounce(() => {
		setTimeout(init, MIN_DELAY);
	}));
});



export { init };
