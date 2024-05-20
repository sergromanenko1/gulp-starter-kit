import $ from 'jquery';
import { debounce } from '../functions/functions.js';



const PREV_ARROW = `<button type="button" class="slick-prev">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 14">
		<rect transform="rotate(42)" x="4.5799" y="3.3533" width="10.9" height="2.1" ry="1.1"/>
		<rect transform="rotate(-42)" x="-4.7985" y="4.9413" width="10.9" height="2.1" ry="1.1"/>
	</svg>
</button>`;

const NEXT_ARROW = PREV_ARROW.replace('prev', 'next'),
	TRANSITION   = 300,
	MIN_DELAY    = 50, // The minimum delay at which the function in setTimeout is called earlier than the main code.
	regDevices   = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

let isMobile       = regDevices.test(navigator.userAgent),
	oldWindowWidth = innerWidth,
	$window,
	$wrapper;


const breakpoint = {
	TABLET: 1280,
	PHONE:  600,

	setState: () => {
		breakpoint.isTablet = innerWidth <= breakpoint.TABLET;
		breakpoint.isPhone  = innerWidth <= breakpoint.PHONE;
	}
};
breakpoint.setState();


$(() => {
	$window  = $(window);
	$wrapper = $('.page__wrapper');

	$window
		.on('resize', debounce(() => {
			isMobile = regDevices.test(navigator.userAgent);

			if (oldWindowWidth !== innerWidth) {
				oldWindowWidth = innerWidth;
				$window.trigger('resizeWidth');
			}
		}))
		.on('resizeWidth', debounce(breakpoint.setState));
});



export { PREV_ARROW, NEXT_ARROW, TRANSITION, MIN_DELAY, $window, $wrapper, breakpoint, isMobile };
