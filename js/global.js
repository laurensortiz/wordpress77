require.config({
	"baseUrl": "content/themes/mytheme/js",
	"paths": {
		"jquery": "vendor/jquery/jquery"
	}
});

require(['jquery'], function($) {
	console.log('Working!!');
});
