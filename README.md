# e8tooltip
## A jQuery tooltip plugin

### Usage

Include following files:

	<link rel="stylesheet" href="jquery.e8tooltip.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="jquery.e8tooltip.js"></script>
	
The HTML:

	<span class="tooltip tt-top" title="Sup! I'm a tooltip on the top!">Insert text here</span>
	
	<span class="tooltip tt-bottom" title="Sup! I'm a tooltip on the bottom!">Insert text here</span>
	
Use the plugin:

	$('.tooltip').e8tooltip();

### Options

	$('.tooltip').e8tooltip({
		backgroundColor: '#000', // background-color
		color: '#fff', // text-color
		delay: 300, // time out when the tooltip appers and disappears
		destroy: false, // function to destroy the tooltip if needed in another function
		fadeDuration: 100, // fade out duration
		offset: 10, // set the offset position of the tooltip in px
		width: 240 // tooltip wrapper width in px
	});
	
### License

CC-BY-SA https://creativecommons.org/licenses/by-sa/3.0/

Do whatever you want.

### Author

Martin Szymanski –
[www.elfacht.com](http://www.elfacht.com)

### Changelog

0.2 – initial release
	
