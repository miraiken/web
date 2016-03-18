var constexpr = {
	'name_svgid_cvt' : {
		"chikaken"  : {"second" : ["id305"]},
		"tenmonken" : {"first" : ["id266"], "third" : ["id209", "id210"]},
		"seibutuken": {"second": ["id306"]},
		"bunngukenn": {"third" : ["id207"]},
		"chibilab"  : {"first" : ["id265"]},
		"ACM"       : {"third" : ["id204", "id206"]},
		"nikaken"   : {"second" : ["id304"]},
		"ichikaken" : {"second" : ["id303"]},
		"rikoukaken": {"second" : ["id301"]}
	},
	'svgid_name_cvt' : {
		"first" : {
			"id265" : "chibilab",
			"id266" : "tenmonken"
		},
		"second" : {
			"id301" : "rikoukaken",
			"id303" : "ichikaken",
			"id304" : "nikaken",
			"id305" : "chikaken",
			"id306" : "seibutuken",
		},
		"third" : {
			"id204" : "ACM",
			"id206" : "ACM",
			"id207" : "bunngukenn",
			"id209" : "tenmonken",
			"id210" : "tenmonken"
		}
	}
};Object.freeze(constexpr);
svg_manager = function(){
	this.first  = document.getElementById("fitst_floor_svg").contentDocument;
	this.second = document.getElementById("second_floor_svg").contentDocument;
	this.third  = document.getElementById("third_floor_svg").contentDocument;
};