/* jQuery e8tooltip plugin
*	Version 0.2
* Author: Martin Szymanski
* Author's website: http://www.elfacht.com
* GitHub:
* License: CC-BY-SA https://creativecommons.org/licenses/by-sa/3.0/
*/
(function($) {
	$.fn.e8tooltip = function(options) {

		/* =Settings
		------------------------------------------------------*/
		var settings = $.extend({
			backgroundColor: '#000',
			color: '#fff',
			delay: 300,
			destroy: false,
			event: 'mouseenter',
			fadeDuration: 100,
			offset: 2,
			width: 240,
		}, options);

		/* =Color setting
		------------------------------------------------------*/
		var colors = {
			'backgroundColor': settings.backgroundColor,
			'color': settings.color
		}

		/* =Plugin variables
		------------------------------------------------------*/
		var tooltip = $.extend({
			wrapper: '.tooltip-wrapper',
			inner: '.tooltip-inner',
			triggerHeight: $(this).height()
		});

		/* =Destroy tooltip
		------------------------------------------------------*/
		if (settings.destroy === true) {
			destroyTooltip();
		}

		/* =Init
		------------------------------------------------------*/
		return this.each(function() {

			var trigger = $(this),
					content = trigger.attr('title'),
					position = trigger.css('position');

			/* Get title attribute after change */
			trigger.change(function(e) {
				e.preventDefault();
				content = $(this).attr('title');
				removeHoverTitle();
			});

			removeHoverTitle();

			/* Show tooltip */
			trigger.bind(settings.event, function() {
				createTemplate(trigger, content);
			});

			/* Destroy tooltip */
			if (settings.event === 'mouseenter') {
				trigger.on('mouseleave', function() {
					destroyTooltip(trigger);
				});
			}

			/* Set trigger position */
			if (position != 'relative' && position != 'absolute') {
				trigger.css({'position':'relative'});
			}

			/* Remove title attribute from element */
			function removeHoverTitle() {
				trigger.data('title', trigger.attr('title')).removeAttr('title');
			}
		});

		/* =Create template
		------------------------------------------------------*/
		function createTemplate(element, content) {
			var template =
				$(document.createElement('div')).attr({'class': 'tooltip-wrapper'}).append(
					$(document.createElement('div')).attr({'class': 'tooltip-inner'}).html(content)
				).append(
					$(document.createElement('div')).attr({'class': 'tooltip-arrow'})
				);

			/* Append template */
			setTimeout(function() {
				element.addClass('active');
				$(document.body).append(template);
				tooltipPosition(element);
			}, settings.delay);

		}

		/* =Tooltip positioning
		------------------------------------------------------*/
		function tooltipPosition(trigger) {
			var absolutePosition,
					positionHeight = tooltip.triggerHeight + settings.offset;
					positionTop = trigger.offset().top,
					positionLeft = trigger.offset().left,
					viewportHeight = $(window).height();
					marginLeft = '',
					left = '',
					position = 'top';

			if (trigger.hasClass('tt-bottom')) position = 'bottom';

			/* Set left margin on top/bottom tooltips */
			if (trigger.hasClass('tt-top') || trigger.hasClass('tt-bottom')) {
				marginLeft = settings.width / 2;
				left = positionLeft + (trigger.outerWidth() / 2)
			}

			if (trigger.hasClass('tt-top')) {
				$(tooltip.wrapper).css({
					'bottom': viewportHeight - (positionTop - positionHeight)
				});
			}

			if (trigger.hasClass('tt-bottom')) {
				$(tooltip.wrapper).css({
					'top': positionTop + positionHeight
				});
			}

			/* CSS settings */
			$(tooltip.wrapper).css({
				'left': left,
				'marginLeft': -marginLeft,
				'position': 'absolute',
				'width': settings.width
			}).addClass(position)
				.find('.tooltip-arrow').css(colors);

			$(tooltip.inner).css(colors);
		}


		/* =Destroy tooltip
		------------------------------------------------------*/
		function destroyTooltip(trigger) {
			setTimeout(function() {
				if (trigger) {
					trigger.removeClass('active');
				}

				$(tooltip.wrapper).fadeOut(settings.fadeDuration, function() {
					$(this).remove()
				});
			}, settings.delay);
		}

	}
}(jQuery));