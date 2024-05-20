import $ from 'jquery';
import { TRANSITION, $window, $wrapper, breakpoint } from '../variables/variables.js';
import { debounce } from '../functions/functions.js';
import * as page from '../page/page.js';



let $header;



$(() => {
	$header = $('.header');



	function toggleShadow() {
		const SHADOW_SCROLL_TOP = 10;

		if (!page.isScroll) {
			return;
		}

		if (SHADOW_SCROLL_TOP < $window.scrollTop()) {
			$header.addClass('header_shadow');
		} else {
			$header.removeClass('header_shadow');
		}
	}
	toggleShadow();
	$window.on('scroll', toggleShadow);



	const togglePanel = (() => {
		let toggleScrollTop = $header.innerHeight(),
			oldInnerHeight  = innerHeight,
			oldScrollTop;

		$window.on('resizeWidth', debounce(() => {
			toggleScrollTop = $header.innerHeight();
		}));

		return () => {
			const SCROLL_TOP         = $window.scrollTop(),
				HAS_SCROLL           = SCROLL_TOP !== oldScrollTop,
				IS_TOGGLE_SCROLL_TOP = toggleScrollTop < SCROLL_TOP,
				IS_RESIZE_HEIGHT     = innerHeight !== oldInnerHeight;

			if (!page.isScroll || !HAS_SCROLL) {
				return;
			}
			$header.removeClass('header_active-menu');

			if (IS_TOGGLE_SCROLL_TOP && !IS_RESIZE_HEIGHT) {
				const IS_SCROLL_UP = SCROLL_TOP < oldScrollTop;

				// So that it is fixed on the desktop when loading.
				if (!breakpoint.isTablet) {
					$header.addClass('header_fixed');
				}

				if (IS_SCROLL_UP) {
					// So that it is fixed on the mobile when scroll up.
					if (breakpoint.isTablet) {
						$header.addClass('header_fixed');
					}
					$header.removeClass('header_out');
				} else {
					$header.addClass('header_out');
				}
			}

			if (!IS_TOGGLE_SCROLL_TOP) {
				$header.removeClass('header_out');
				setTimeout(() => {
					$header.addClass('header_fixed');
				}, TRANSITION);
			}
			oldScrollTop   = SCROLL_TOP;
			oldInnerHeight = innerHeight;
		};
	})();
	togglePanel();
	$window.on('scroll', togglePanel);



	// The menu on the mobile.
	(() => {
		//  Show/hide.
		$('.header__toggle').on('click', () => {
			if (breakpoint.isTablet) {
				$header.toggleClass('header_active-menu');
				page.scrollToggle();
			}
		});



		// Hide when click outside.
		$wrapper.on('click', (e) => {
			if (breakpoint.isTablet &&
					$header.hasClass('header_active-menu') &&
					!$(e.target).closest('.header__toggle, .header__menu').length) {
				page.scrollOn();
				$header.removeClass('header_active-menu')
			}
		});



		// Enable/disable the scroll page when changing the window width.
		$window.on('resizeWidth', debounce(() => {
			const IS_ACTIVE_MENU         = $header.hasClass('header_active-menu'),
				IS_ENABLE_SCROLL_DESKTOP = (IS_ACTIVE_MENU && !page.isScroll && !breakpoint.isTablet),
				IS_DISABLE_SCROLL_MOBILE = (IS_ACTIVE_MENU && page.isScroll && breakpoint.isTablet);

			if (IS_ENABLE_SCROLL_DESKTOP || IS_DISABLE_SCROLL_MOBILE) {
				page.scrollToggle();
			}
		}));
	})();
});
