import $ from 'jquery';
import { $window, isMobile, MIN_DELAY } from '../variables/variables.js';



class Select {
	constructor(el) {
		this.$el       = $(el);
		this.$default  = this.$el.children('.select__default');
		this.$head     = this.$el.children('.select__head');
		this.iSelected = 0;

		this.$el.addClass('select_init');
		this.toggleEventMobile();
		this.addEventHead();
		this.createItems();
		this.addEventsItems();
		this.addEventOutside();
		this.addEventDefault();
	}



	toggleEventMobile() {
		let isSelectMobile = false;


		var toggle = () => {
			if (isMobile && !isSelectMobile) {
				this.$el.addClass('select_mobile');
				isSelectMobile = true;
			}
			if (!isMobile && isSelectMobile) {
				this.$el.removeClass('select_mobile');
				isSelectMobile = false;
			}
		}
		toggle();
		$window.on('resize', toggle);
	}



	addEventHead() {
		this.$head.on('click', () => {
			this.$el.toggleClass('select_active');
			this.$items.removeClass('select__item_active'); 
			this.$items.eq(this.iSelected).addClass('select__item_active');
		});
	}



	createItems() {
		let self      = this,
			$options  = self.$default.children('option'),
			$selected = $options.filter('[selected]'),
			list      = '<ul class="select__list">';

		$selected = $selected.length ? $selected : $options.filter(':not([disabled])').eq(0);
		this.$head.text($selected.text());

		$options.each(function() {
			let $option   = $(this),
				attrClass = 'select__item',
				attrValue = $option.attr('value');

			if ($option.attr('disabled')) {
				attrClass += ' select__item_disable';
			}
			if ($option.attr('selected')) {
				attrClass += ' select__item_active';
				self.iSelected = $option.index();
			}

			attrValue = attrValue ? 'data-value="' + attrValue + '"' : '';
			list += '<li class="' + attrClass + '"' + attrValue + '>' + $option.text() + '</li>';
		});
		list += '</ul>';

		this.$el.append(list);
		this.$items = this.$el.find('.select__item');
	}



	addEventsItems() {
		let self = this;

		self.$items
			.on('mouseenter', function() {
				let $item = $(this);

				if (!$item.hasClass('select__item_disable')) {
					self.$items.removeClass('select__item_active'); 
					$item.addClass('select__item_active');
				}
			})
			.on('click', function() {
				let $item = $(this),
					val   = $item.attr('data-value') || $item.text();

				if (!$item.hasClass('select__item_disable')) {
					self.iSelected = $item.index();

					if (val !== self.$default.val()) {
						self.$default.val(val).trigger('change');
					}
					self.$el.removeClass('select_active');
				}
			});
	}



	addEventOutside() {
		$('body').on('click', (e) => {
			if (this.$el.hasClass('select_active') && !$(e.target).closest(this.$el).length) {
				this.$el.removeClass('select_active');
				this.$items.removeClass('select__item_active'); 
				this.$items.eq(this.iSelected).addClass('select__item_active');
			}
		});
	}



	addEventDefault() {
		let self = this;

		function reinit() {
			self.$default.prop('selectedIndex', -1).trigger('change');
			self.$el.find('.select__list').remove();
			self.createItems();
			self.addEventsItems();
		}

		self.$default
			.on('change changeVal', function() {
				// Delay is needed because when the page loads the value of the select is not defidned.
				setTimeout(() => {
					const VAL = self.$default.val();

					if (!VAL) {
						self.$el.addClass('select_empty');
					} else {
						self.$el.removeClass('select_empty');
					}

					self.$items.each(function(i) {
						let $item = $(this),
							text  = $item.text();

						if ((VAL === $item.attr('data-value')) || (VAL === text) || (!VAL && $item.hasClass('select__item_disable'))) {
							self.iSelected = i;
							self.$head.text(text);
							self.$items.removeClass('select__item_active'); 
							$item.addClass('select__item_active');
						}
					});
				}, MIN_DELAY);
			})
			.on('changeHtml', reinit)
			.closest('form').on('reset', reinit);
	}
}



function init() {
	$('.select:not(.select_init)').each(function() {
		new Select(this);
	});
}



$(() => {
	init();
});



export { init };
