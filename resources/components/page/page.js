import $ from 'jquery';
import { MIN_DELAY, $window, $wrapper, isMobile } from '../variables/variables.js';
import { debounce } from '../functions/functions.js';


const patternApple = /iPhone|iPad|iPod|Mac/i;

let isScroll = true,
	isIOS    = patternApple.test(navigator.platform) && navigator.maxTouchPoints > 1,
	$el,
	scrollTop;



const compensateScrollbar = (function() {
	const getScrollbarWidth = (() => {
		const $outer = $('<div>'),
			$inner   = $('<div>');

		return () => {
			$outer.css('overflow-y', 'scroll');
			$inner.appendTo($outer);
			$outer.appendTo($el);

			const RESULT = ($el.height() !== $wrapper.height()) ? ($outer.width() - $inner.width()) : 0;

			$outer.remove();

			return RESULT;
		};
	})();



	const $paddingElems = $('.page__compensate-scrollbar').filter(function() {
		return -1 === ['absolute', 'fixed'].indexOf($(this).css('position'));
	});

	const $marginElems = $('.page__compensate-scrollbar').not($paddingElems);



	return () => {
		$paddingElems.each(function() {
			const $paddingElem    = $(this),
				$popup          = $paddingElem.closest('.popup'),
				IS_ACTIVE_POPUP = $popup.hasClass('popup_active');

			if (!IS_ACTIVE_POPUP) {
				$popup.addClass('popup_active');
			}

			var HAS_SCROLLBAR = 1 < Math.abs($paddingElem.outerHeight() - $paddingElem[0].scrollHeight);

			if (isScroll || HAS_SCROLLBAR) {
				$paddingElem.css('padding-right', 0);
			} else {
				$paddingElem.css('padding-right', getScrollbarWidth());
			}

			if (!IS_ACTIVE_POPUP) {
				$popup.removeClass('popup_active');
			}
		});
		$marginElems.css('margin-right', isScroll ? 0 : getScrollbarWidth());
	};
})();



function scrollOn() {
	if (!isScroll) {
		isScroll = true;
		compensateScrollbar();
		$el.attr('style', '');

		// On the desktop also need, since when the window shrinks then the page offsets, so forsed set the scroll page position.
		$window.scrollTop(scrollTop);

		if (isIOS) {
			setTimeout(() => {
				$window.scrollTop(scrollTop);
			}, MIN_DELAY);
		}
	}
}



function fixed() {
	$el.css({
		position: 'fixed',
		top:      -scrollTop,
		left:     0,
		right:    0,
	});
}
function scrollOff() {
	if (isScroll) {
		scrollTop = $window.scrollTop();
		isScroll  = false;
		compensateScrollbar();

		if (!isIOS) {
			$el.css('overflow', 'hidden');

			// On the desktop when the window shrinks then the page offsets, so forsed set the scroll page position.
			$window.scrollTop(scrollTop);
		} else {
			// Sometimes on the Safari IOS jumps to the top of the page which is why needs a delay.
			fixed();
			setTimeout(fixed, MIN_DELAY);
		}
	}
}



function scrollToggle() {
	if (isScroll) {
		scrollOff();
	} else {
		scrollOn();
	}
}



$(() => {
	$el = $('.page');

	$window.on('resize', debounce(() => {
		isIOS = patternApple.test(navigator.platform) && navigator.maxTouchPoints > 1;
		compensateScrollbar();
	}));



	// Disable css transition on resize/
	$window.on('resize', debounce(() => {
		$el.addClass('trans-off');
		setTimeout(() => {
			$el.removeClass('trans-off');
		}, MIN_DELAY);
	}));



	function toggleMobile() {
		if (isMobile) {
			$el.addClass('page_mobile');
		} else {
			$el.removeClass('page_mobile');
		}
	}
	toggleMobile();
	$window.on('resize', debounce(toggleMobile));



	// Prevent the selection of elemnts by double clicking.
	(() => {
		const CLICK_DELAY = 1000;
		let timeoutID;

		$el.on('dblclick', () => {
			$el.css('user-select', 'none');
			clearTimeout(timeoutID);

			timeoutID = setTimeout(() => {
				$el.css('user-select', 'unset');
			}, CLICK_DELAY);
		});
	})();
});



export { $el, isScroll, scrollOn, scrollOff, scrollToggle };
