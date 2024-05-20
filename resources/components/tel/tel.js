import $ from 'jquery';
import { $window, isMobile } from '../variables/variables.js';
import { debounce } from '../functions/functions.js';



$(() => {
	let tag    = '<a',
		oldTag = tag;

	function replace() {
		tag = isMobile ? '<a' : '<div';
		if (tag === oldTag) { 
			return;
		}

		$('.tel').each(function() {
			let $tel    = $(this),
				content = $tel.html(),
				wrapper = $('<div>').append($tel.html('').clone()).html();

			wrapper = wrapper.replace(oldTag, tag);
			wrapper = wrapper.replace(oldTag.replace('<', '</'), tag.replace('<', '</'));
			wrapper = $(wrapper).html(content)
			$tel.replaceWith(wrapper);
		});
		oldTag = tag;
	}
	replace();
	$window.on('resize', debounce(replace));
});
