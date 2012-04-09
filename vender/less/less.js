(function(){
	define(['require/text', 'vender/jquery', 'vender/less/less-1.3.0.min.js'], function(text, $){
		var doc = document, head = $('head'),
			loader = $.extend({}, text, {
				load: function( name, parentRequire, onLoad, config ){
					text.load(name, parentRequire, function(content){
						// pull the template name from the name of the resource
						// we exclude the .hbs extension any any query params attached to it
						var paths = name.split('/');
						paths.pop(); // remove the file name

						new (less.Parser)({
							optimization: less.optimization,
							paths: [ paths.join('/') ]
						})
						.parse(content, function(e, root){
							// load the compiled CSS into the DOM
							var css = doc.createElement('style'),
								cssText = root.toCSS();
							css.type = 'text/css';
							if (css.styleSheet) { // IE
								css.styleSheet.cssText = cssText;
							} else {
								(function (node) {
									if (css.childNodes.length > 0) {
										if (css.firstChild.nodeValue !== node.nodeValue) {
											css.replaceChild(node, css.firstChild);
										}
									} else {
										css.appendChild(node);
									}
								})(doc.createTextNode(cssText));
							}
							head.append(css);
							onLoad(cssText);
						})
					}, config);
				}
		});

		return loader;
	});
})();