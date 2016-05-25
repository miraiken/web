function redirect_when_no_support(redirect_to){
	if(
		typeof window.addEventListener === "undefined"
		|| typeof document.getElementsByClassName === "undefined"
		|| typeof document.querySelector === "undefined"
		|| (document.uniqueID && window.matchMedia && document.documentMode === 10)/*IE10*/
	){
		/*redirect to announs page when not supported.*/
		location.href = redirect_to;
	}
};