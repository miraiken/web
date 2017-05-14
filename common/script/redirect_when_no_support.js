/**
 * @param redirect_to {string} The URL to redirect
 */
function redirect_when_no_support(redirect_to){
	/**
	 * @param str {string} base URL
	 * @param param {string} A GET param
	 */
	var append_get_param = function(str, param){
		return str + ((str.match(/\?/)) ? "&" : "?") + param;
	};

	if(document.uniqueID && window.matchMedia && document.documentMode === 10){
		location.href = append_get_param(redirect_to, "cause=" + encodeURIComponent("detect IE10"));
	} else {
		var basic_tests = function(){
			var tests = [
				{ "testcase": typeof window.addEventListener === "undefined", "message": "missing: window.addEventListener" },
				{ "testcase": typeof document.getElementsByClassName === "undefined", "message": "missing: document.getElementsByClassName" },
				{ "testcase": typeof navigator.userAgent === "undefined", "message": "missing: navigator.userAgent" },
				{ "testcase": typeof document.querySelector === "undefined", "message": "missing: document.querySelector" },
				{ "testcase": typeof Array.prototype.forEach === "undefined", "message": "missing: Array.prototype.forEach" }
			];
			var i;
			var cause = "";
			for(i = 0; i < tests.length; ++i) if(tests[i].testcase) {
				cause += (cause.length === 0) ? "[" : ",";
				cause += "\"" + tests[i].message + "\"";
			}
			if(cause.length !== 0) {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.indexOf("msie") >= 0 && parseFloat(ua.replace(/mozilla\/([0-9.]+).*/g, "$1")) < 5.0) {
					/* Before IE8, goto Shift-JIS page */
					return append_get_param(redirect_to.slice(0, -5) + "-sjis.html", "cause=" + encodeURIComponent(cause + ",\"brefore IE8\"]"));
				} else {
					return append_get_param(redirect_to, "cause=" + encodeURIComponent(cause + "]"));
				}
			}
			return "";
		};
		var additional_tests = function(){
			var tests = [
				{ "testcase": typeof JSON === "object", "message": "missing: JSON" },
				{ "testcase": parseInt("010") === 10, "message": "missing feature: parseInt ignores leading zeros" },
				{
					"testcase": { __proto__ : [] } instanceof Array && !({ __proto__ : null } instanceof Object),
					"message": "missing feature: __proto__ in object literals(basic support)"
				},
				{
					"testcase": function(){
						var obj = {
							2: true,
							0: true,
							1: true,
							" ": true,
							9: true,
							D: true,
							B: true,
							"-1": true
						};
						obj.A = true;
						obj[3] = true;
						var tmp = "EFGHIJKLMNOPQRSTUVWXYZ".split("");
						var i;
						for(i = 0; i < tmp.length; ++i){
							obj[tmp[i]] = true;
						}
						try{
							Object.defineProperty(obj, "C", { value: true, enumerable: true });
							Object.defineProperty(obj, "4", { value: true, enumerable: true });
							delete obj[2];
						} catch(e){
							return false;
						}
						obj[2] = true;

						return Object.getOwnPropertyNames(obj).join("") === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";
					}(),
					"message": "missing: Object.getOwnPropertyNames"
				}
			];
			var i;
			var cause = "";
			for(i = 0; i < tests.length; ++i) if(!tests[i].testcase) {
				cause += (cause.length === 0) ? "[" : ",";
				cause += tests[i].message;
			}
			if(cause.length !== 0) {
				return append_get_param(redirect_to, "cause=" + encodeURIComponent(cause + "]"));
			}
			return "";
		}
		var redirect_to = basic_tests();
		if(redirect_to.length !== 0) {
			location.href = redirect_to;
		} else {
			redirect_to = additional_tests();
			if(redirect_to.length !== 0) {
				location.href = redirect_to;
			}
		}
	}
};
