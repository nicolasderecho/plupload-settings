;(function($){

	"use strict";

	function pluploadDefaultSettings(){

		var $pluploadInitializer = $(".js-plupload-initializer");
		var pluploadSettings = $pluploadInitializer.data() || {};
		var pluploadMultiParams;

		if(pluploadSettings.authenticityname && pluploadSettings.authenticitytoken){
			pluploadMultiParams = {};
			pluploadMultiParams[pluploadSettings.authenticityname] = pluploadSettings.authenticitytoken;
		}

		return {
		  multipart: true,
		  runtimes: "html5,flash,silverlight,html4",
		  flash_swf_url: pluploadSettings.silverlightxapurl,
		  silverlight_xap_url: pluploadSettings.flashurl,
	      multipart_params: pluploadMultiParams		  
		};

	}

	// Assigns default Plupload settings that work with the asset pipeline.
	var proxied = plupload.Uploader;

	plupload.Uploader = function (options) {

		var settings = pluploadDefaultSettings(); //Change this line to override default settings

		for(var attribute in options){
			if( options.hasOwnProperty(attribute) ){
				if( attribute == "multipart_params" && typeof(options[attribute]) == "object" ){
					settings[attribute] = $.extend({},settings[attribute], options[attribute] )
				}
				else{
					settings[attribute] = options[attribute];
				}
			}
		}

		return proxied.call(this, settings);
	};

	plupload.Uploader.prototype = proxied.prototype;
		


})(jQuery);