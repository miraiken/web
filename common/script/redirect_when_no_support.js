function redirect_when_no_support(redirect_to){
	/**
	 * @param str {string} base URL
	 * @param param {string} A GET param
	 */
	var append_get_param = function(str, param){
		return str + ((str.match(/\?/)) ? "&" : "?") + param;
	}
	if(
		typeof window.addEventListener === "undefined"
		|| typeof document.getElementsByClassName === "undefined"
		|| typeof navigator.userAgent.indexOf === "undefined"
		|| typeof document.querySelector === "undefined"
		|| (document.uniqueID && window.matchMedia && document.documentMode === 10)/*IE10*/
	){
		/*redirect to announs page when not supported.*/
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.indexOf("msie") >= 0 && parseFloat(ua.replace(/mozilla\/([0-9.]+).*/g, "$1")) < 5.0) {
			/* Before IE8, goto Shift-JIS page */
			location.href = append_get_param(redirect_to.slice(0, -5) + "-sjis.html", "cause=" + encodeURIComponent("brefore IE8"));
		} else {
			var cause = "";
			var tests = [
				[typeof window.addEventListener === "undefined", "missing: window.addEventListener"],
				[typeof document.getElementsByClassName === "undefined", "missing: document.getElementsByClassName"],
				[typeof navigator.userAgent.indexOf === "undefined", "missing: navigator.userAgent.indexOf"],
				[typeof document.querySelector === "undefined", "missing: document.querySelector"],
				[(document.uniqueID && window.matchMedia && document.documentMode === 10), "detect IE10"]
			];
			var t;
			for(t in tests) if(t[0]){
				if(cause.length === 0){
					cause += "["
				}
				cause += t[1];
			}
			cause += "]"
			location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent(cause));
		}
	}
	var is_android_default_browser = function() {
		/* http://qiita.com/narikei/items/ada44891cb0902efc165 */
		var ua = window.navigator.userAgent;
		if (/Android/.test(ua) && /Linux; U;/.test(ua) && !/Chrome/.test(ua)) {
			return true;
		}
		return false;
	};
	if(is_android_default_browser()){
		location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent("is Android default browser"));
	}
	var is_deprecated_android_os = function() {
		/* http://qiita.com/devdyaya/items/406072f6ecd69b0a785f */
		var and_ua = navigator.userAgent;
		if( and_ua.indexOf("Android") > 0 ) {
			var version = parseFloat(and_ua.slice(and_ua.indexOf("Android")+8));
			return (version < 4.1);/* reject before Android 4.0.x */
		}
		return false;
	};
	var is_deprecated_ios = function() {
		/* http://qiita.com/devdyaya/items/406072f6ecd69b0a785f */
		var ios_ua = navigator.userAgent;
		if( ios_ua.indexOf("iPhone") > 0 ) {
			ios_ua.match(/iPhone OS (\w+){1,3}/g);
			var version = (RegExp.$1.replace(/_/g, "")+"00").slice(0,3);
			return (version < 800);/* reject before iOS7 */
		}
		return false;
	};
	if(is_deprecated_android_os()){
		location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent("is deprecated Andorid browser"));
	}
	if(is_deprecated_ios()){
		location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent("is deperecated iOS browser"));
	}
};
