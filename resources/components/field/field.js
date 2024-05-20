import $ from 'jquery';
import { $wrapper } from '../variables/variables.js';



$(() => {
	// Create a phone mask
	(() => {
		const TEL_MASK = '+7 (000) 000-00-00';

		$('.field__text[type="tel"]').attr('maxlength', TEL_MASK.length).on('input', function() {
			let val          = this.value,
				selectionEnd = this.selectionEnd;

			if (-1 !== TEL_MASK.indexOf('+7') && /^8/.test(val)) {
				val = val.replace('8', '7');
			}
			val = val.split('');

			for (let i = 0; i < TEL_MASK.length; i++) {
				if (!val[i]) {
					break;
				}

				const IS_MASK_INT = '0' === TEL_MASK[i],
					IS_VAL_INT    = /\d/g.test(val[i]) && (IS_MASK_INT || val[i] !== TEL_MASK[i]);

				if (IS_MASK_INT) {
					if (!IS_VAL_INT) {
						val.splice(i, 1);
						i--;
					}
				} else {
					if (IS_VAL_INT) {
						val.splice(i, 0, TEL_MASK[i]);

						if (i <= selectionEnd && 1 <= (selectionEnd - i)) {
							selectionEnd++;
						}
					} else {
						val[i] = TEL_MASK[i];
					}
				}
			}

			this.value = val.join('').substring(0, TEL_MASK.length);
			this.selectionStart = this.selectionEnd = selectionEnd;
		});
	})();



	// Increase/decrease a number
	$wrapper.on('plus minus', '.field__number', function(e) {
		let $el = $(this),
			val = +$el.val().replace(',', '.');

		const OLD_VAL = val,
			IS_PLUS   = 'plus' === e.type,
			MIN       = +$el.attr('data-min'),
			MAX       = +$el.attr('data-max'),
			STEP      = +$el.attr('data-step') || 1,
			DIGITS    = ('' + STEP).replace(/^.+\./,'').length || 0,
			NOT_MAX   = (!MAX || !val || (val + STEP <= MAX)),
			NOT_MIN   = (!MIN || !val || (MIN <= val - STEP));

		if (MIN && MAX && (MIN > MAX)) {
			val = IS_PLUS ? MIN : MAX;
			$el.val(+val.toFixed(DIGITS));

			return;
		}

		if (IS_PLUS && NOT_MAX) {
			val = (MIN && !val) ? ((MIN > MAX) ? MAX : MIN) : (val + STEP);
			val = (MIN && val < MIN) ? MIN : val;
		}

		if (!IS_PLUS && NOT_MIN) {
			val = (MIN && !val) ? MIN : (val - STEP);
			val = (MAX && val > MAX) ? MAX : val;
		}
		val = +val.toFixed(DIGITS);
		val = ('' + val).replace('.', ',');
		$el.val(val);

		if (OLD_VAL !== +val) {
			$el.trigger('change');
		}
	});


	// Input only the numbers
	$wrapper.on('input keydown contextmenu', '.field__number', function(e) {
		const $el = $(this);

		let val = $el.val().replace(',', '.').replace(/\s/g, '');

		const MAX               = $el.attr('data-max'),
			IS_CORRECT_LENGTH = !MAX || val.length <= MAX.length,
			STEP              = $el.attr('data-step'),
			IS_STEP_FLOAT     = STEP ? ((+STEP % 1) !== 0) : false,
			patternNumper     = IS_STEP_FLOAT ? /^$|^[0-9.,+-]+$/ : /^$|^[0-9+-]+$/;

		if (/Up|Down/g.test(e.key) && !/Page/g.test(e.key)) {
			e.preventDefault();
			$el.trigger(/Up/g.test(e.key) ? 'plus' : 'minus');

			return;
		}

		if (patternNumper.test(val) && IS_CORRECT_LENGTH) {
			let offset = $el[0].oldVal ? $el[0].oldVal.substring(0, $el[0].oldStart).replace(/\S/g, '').length : 0;

			if (+val && $el.hasClass('field__number_price')) {
				val = (+val).toLocaleString().split(',')[0];
			}
			if ($el[0].oldVal) {
				offset = val.substring(0, $el[0].oldStart).replace(/\S/g, '').length - offset;
			}

			$el.val(val);
			if (('input' === e.type) && (val === $el[0].oldVal)) {
				$el[0].selectionStart = $el[0].selectionEnd = $el[0].oldStart + offset;
			}

			$el[0].oldVal   = val;
			$el[0].oldStart = $el[0].selectionStart;
			$el[0].oldEnd   = $el[0].selectionEnd;
		} else if ($el[0].hasOwnProperty('oldVal')) {
			const START = $el[0].oldStart,
				END     = $el[0].oldEnd,
				LENGTH  = $el[0].oldVal.length;

			val = $el[0].oldVal.substring(0, START) + $el[0].oldVal.substring(END, LENGTH);
			$el.val(val);
			$el[0].selectionStart = $el[0].selectionEnd = START;
		}
	});


	// If on focusout or on change value above/below the limit then set the limit
	$wrapper.on('focusout change', '.field__number', function() {
		const $input = $(this),
			VAL      = $input.val().replace(/\s/g, ''),
			MIN      = +$input.attr('data-min'),
			MAX      = +$input.attr('data-max'),
			IS_PRICE = $input.hasClass('field__number_price');

		if ('' === VAL) {
			return;
		}

		if (+VAL < MIN) {
			$input.val(IS_PRICE ? MIN.toLocaleString().split(',')[0] : MIN);
		}
		if (MAX < +VAL) {
			$input.val(IS_PRICE ? MAX.toLocaleString().split(',')[0] : MAX);
		}
	});
});
