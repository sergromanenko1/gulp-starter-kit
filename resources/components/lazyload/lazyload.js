import $ from 'jquery';



let $elems,
	observers = [];



function observe($el, cb) {
	if (window.IntersectionObserver) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					cb()
					observer.unobserve($el[0]);
				}
			});
		});
		observer.observe($el[0]);
	} else {
		cb();
	}
}


function load($elem) {
	if ($elem[0].dataset.src) {
		$elem.attr('src', $elem[0].dataset.src);
	}
	if ($elem[0].dataset.bg) {
		$elem.css('background-image', 'url(' + $elem[0].dataset.bg + ')');
	}
}


function init() {
	observers.forEach(function(observer, i) {
		observer.unobserve($elems.eq(i)[0]);
	});

	$elems    = $('[data-src], [data-bg]');
	observers = [];

	$elems.each(function() {
		const $elem = $(this);

		observe($elem, () => {
			load($elem);
		});
	});
}




$(() => {
	init();
});



export { observe, init };
