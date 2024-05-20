import $ from 'jquery';
import { $window, $wrapper, MIN_DELAY, TRANSITION } from '../variables/variables.js';
import loader from '../loader/loader.js';
import * as popup from '../popup/popup.js';



function addError($el, text) {
	removeError($el);
	if (text) {
		$el.addClass('form__error-control').parent().append('<span class="form__error-text">' + text + '</span>');
	}
	$window.trigger('resize');
}



function removeError($el) {
	if ($el.hasClass('form__error-control')) {
		$el.removeClass('form__error-control').each(function() {
			$(this).parent().children('.form__error-text').remove();
		});
		$window.trigger('resize');
	}
}



function isComplete($el) {
	if ('checkbox' === $el.attr('type')) {
		return $el.filter(':checked').length;
	}

	return ($el.val() || '').trim();
}



function isValid($el) {
	const patternEmail = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

	const TYPE         = $el.attr('type'),
		VAL            = $el.val(),
		IS_EMAIL       = 'email' === TYPE,
		IS_TEL         = 'tel' === TYPE,
		IS_EMAIL_VALID = patternEmail.test(VAL),
		IS_TEL_VALID   = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(VAL);

	if ((IS_EMAIL && !IS_EMAIL_VALID) || (IS_TEL && !IS_TEL_VALID)) {
		return false;
	}

	return true;
}



function validate(success, error) {
	return function(e) {
		let $form      = $(this),
			$els       = $('[data-required]:visible, [data-error]:visible', this),
			isValidAll = true;

		$els.each(function() {
			let $input         = $(this),
				$inputRequired = $input.filter('[data-required]'),
				$inputError    = $input.filter('[data-error]'),
				IS_COMPLETE    = $inputRequired.length ? isComplete($inputRequired) : true,
				IS_VALID       = $inputError.length ? (!isComplete($inputError) || isValid($inputError)) : true;

			if (!IS_COMPLETE) {
				isValidAll = false;
				addError($inputRequired, $inputRequired.attr('data-required'));

				return;
			}

			if (!IS_VALID) {
				isValidAll = false;
				addError($inputError, $inputError.attr('data-error'));
			}
		});

		if (!isValidAll) {
			e.preventDefault();
			scrollTo($form.find('.form__error-control:visible'));

			error = error ? error : function() {};
			error.call(this, e);

			return;
		}
		success = success ? success : function() {};
		success.call(this, e);
	}
}



function scrollTo($el, transition) {
	if (!$el.length) {
		return;
	}

	setTimeout(function() {
		let $popup  = $el.closest('.popup__wrapper'),
			$parent = $popup.length ? $popup : $('html, body');

		const OFFSET_TOP = $popup.length ? popup.getOffset($el).top : $el.offset().top,
			SCROLL_TOP   = OFFSET_TOP - (innerHeight - $el.height()) / 2;

		if (SCROLL_TOP) {
			transition = (undefined !== transition) ? transition : TRANSITION;
			$parent.animate({
				scrollTop: SCROLL_TOP
			}, transition);
		}
	}, MIN_DELAY);
}



$(() => {
	scrollTo($('.form__error-control:visible'), 0);



	// Remove errors after changing value.
	$wrapper.on('input change', '[data-required], [data-error]', function() {
		removeError($(this));
	});



	// Send form.
	$('.form_send').trigger('reset').on('submit', validate(function(e) {
		const $form = $(this);

		$form.addClass('lock');
		e.preventDefault();
		$
			.ajax({
				type: 'post',
				url:  wp_data.admin_ajax,
				data: $form.serialize(),
			})
			.done(loader($form, () => {
				popup.open({
					id:      $form.attr('data-success'),
					closeID: '#' + $('.popup_active').attr('id'),
					onOpen:  () => {
						$form.trigger('reset').removeClass('lock');
					}
				});
			}));
	}));
});



export { validate, scrollTo };
