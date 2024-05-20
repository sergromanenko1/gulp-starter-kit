import $ from 'jquery';
import { MIN_DELAY } from '../variables/variables.js';



function debounce( cb ) {
	let timeoutID;

	return () => {
		clearTimeout( timeoutID );
		timeoutID = setTimeout( cb, MIN_DELAY )
	};
}



export { debounce };
