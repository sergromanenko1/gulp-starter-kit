import $ from 'jquery';
import PhotoSwipe from 'photoswipe/dist/photoswipe.esm.min';
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.min';
import { $wrapper, MIN_DELAY, TRANSITION } from '../variables/variables.js';
import * as page from '../page/page.js';
import { init as svgUseExternalUpdate } from '../svg-use-external/svg-use-external.js';



function close($el) {
	$el.removeClass('popup_animate');
	setTimeout(function() {
		$el.removeClass('popup_active');
		if (!$('.popup_active').length) {
			page.scrollOn();
		}
	}, TRANSITION);
}



function open(options) {
	options = $.extend({
		id:       null,
		closeID:  null,
		position: 0,
		onOpen:   () => {},
	}, options);

	const $popup    = $(options.id),
		$popupClose = $(options.closeID),
		DELAY       = $popupClose.length ? TRANSITION : 0;


	if ($popupClose.length) {
		close($popupClose);
	} else {
		page.scrollOff();
	}
	$popup.addClass('popup_active');

	setTimeout(() => {
		options.onOpen();

		setTimeout(() => {
			$popup.addClass('popup_animate');
		}, MIN_DELAY);
	}, DELAY);


	const $popupTitle = $popup.find('.popup__title'),
		$inputTitle   = $popup.find('[name="title"]');

	const POPUP_TITLE = options.title || $popupTitle.attr('data-title');

	if (POPUP_TITLE) {
		$popupTitle.text(POPUP_TITLE);
		$inputTitle.val(POPUP_TITLE);
	}
}



function getOffset($el) {
	let $parent = $el.offsetParent();

	const $box = $el.closest('.popup__box'),
		result = $el.position();

	if (($parent[0] !== $box[0]) && !$.contains($box[0], $parent[0])) {
		return;
	}

	result.top += parseFloat($box.parent('.popup__content').css('padding-top'));
	while ($parent[0] !== $box[0]) {
		let position = $parent.position();

		result.top  += position.top;
		result.left += position.left;
		$parent = $parent.offsetParent();
	}

	return result;
}



function createGallery(opts) {
	const lightbox = new PhotoSwipeLightbox($.extend({
		showHideAnimationType: 'fade',
		tapAction:             'close',
		loop:                  false,
		pswpModule:            PhotoSwipe,
	}, opts));

	lightbox.init();

	if (opts.dataSource) {
		lightbox.loadAndOpen(0);
	}
}



$(() => {
	// Open the popup on click.
	$wrapper.on('click', '.open-popup', function(e) {
		const $button   = $(this),
			$closePopup = $('.popup_active'),
			DELAY       = +$button.attr('data-delay') || 0;

		if ($button.hasClass('open-popup_active')) {
			return;
		}
		$button.addClass('open-popup_active');

		e.preventDefault();
		setTimeout(() => {
			open({
				id:      $button.attr('href'),
				closeID: $closePopup.length ? ('#' + $closePopup.attr('id')) : null,
				title:   $button.attr('data-title'),
			});
			$button.removeClass('open-popup_active');
		}, DELAY);
	});



	// Close the popup on click Esc on the mouseboard.
	$wrapper.on('keydown', function(e) {
		if (-1 !== ('' + e.key).indexOf('Esc')) {
			$('.popup_active .popup__close').trigger('click');
		}
	});



	// Close the popup.
	$wrapper.on('click', '.popup', function(e) {
		const $target = $(e.target),
			IS_CLOSE  = $target.closest('.popup__close').length,
			IS_BOX    = $target.closest('.popup__box').length,
			IS_SLIDER = $target.closest('.popup__slider').length;

		if ((!IS_BOX && !IS_SLIDER) || IS_CLOSE) {
			close($target.closest('.popup'));
		}
	});



	// Create a gallery.
	createGallery({
		gallery:  '.popup-gallery',
		children: '[data-pswp-width][data-pswp-height]',
	});
});



export { open, getOffset, createGallery };
