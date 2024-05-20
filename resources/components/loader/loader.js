import $ from 'jquery';
import { $window, MIN_DELAY, TRANSITION } from '../variables/variables.js';
import { isScroll } from '../page/page.js';

function addDataTimeoutID( $loader, timeoutID ) {
	let timeoutIDs = $loader.data( 'timeoutIDs' ) || [];

	timeoutIDs.push( timeoutID );
	$loader.data( 'timeoutIDs', timeoutIDs );
}

export default ( $parent, callback ) => {
	const $loader = $parent.find( '.loader' );

	let delay      = new Date().getTime();
	let timeoutIDs = $loader.data( 'timeoutIDs' ) || [];

	while( timeoutIDs.length ) {
		clearTimeout( timeoutIDs.shift() );
	}
	$loader.addClass( 'loader_animate' );

	const TIMEOUT_ID1 = setTimeout( () => {
		$loader.addClass( 'loader_active' );
	}, MIN_DELAY );

	addDataTimeoutID( $loader, TIMEOUT_ID1 );

	return function() {
		const callArguments = arguments;
		const MIN_DELAY     = 700;

		delay = MIN_DELAY - ( new Date().getTime() - delay );
		delay = Math.max( delay, 0 );

		const TIMEOUT_ID2 = setTimeout( () => {
			callback.apply( null, callArguments );
			$loader.removeClass( 'loader_animate' );

			let TIMEOUT_ID3 =setTimeout( () => {
				$loader.removeClass( 'loader_active' );
			}, TRANSITION + 1 );

			addDataTimeoutID( $loader, TIMEOUT_ID3 );
		}, delay );

		addDataTimeoutID( $loader, TIMEOUT_ID2 );
	};
};
