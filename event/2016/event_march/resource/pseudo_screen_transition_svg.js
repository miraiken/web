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
	},
	'itos' : ["first", "second", "third"]
};Object.freeze(constexpr);
svg_manager = function(){
	this.svg = {
		"first" : document.getElementById("fitst_floor_svg").contentDocument,
		"second" : document.getElementById("second_floor_svg").contentDocument,
		"third" : document.getElementById("third_floor_svg").contentDocument
	};
	this.svg_detail = {};
	for(var floor in constexpr.svgid_name_cvt){
		for(var id in constexpr.svgid_name_cvt[floor]){
			this.svg_detail[floor][id] = this.svg[floor].getElementById(id);
		}
	}
	this.current_floor = "first";
};
svg_manager.prototype.show = function(floor, id){
	var line_i;var box_i;
	var nodes = this.svg_detail[floor][id].childNodes;
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].getAttribute("fill")!= "none" && nodes[i].getAttribute("stroke") == "none") box_i = i;
		else if(nodes[i].getAttribute("fill")== "none" && nodes[i].getAttribute("stroke") != "none") line_i = i;
	}
	nodes[box_i].setAttribute('fill', nodes[line_i].getAttribute("stroke"));
};
svg_manager.prototype.hide = function(floor, id){
	var nodes = this.svg_detail[floor][id].childNodes;
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].getAttribute("fill")!= "rgb(255,255,255)" && nodes[i].getAttribute("stroke") == "none"){
			nodes[i].setAttribute("fill", "rgb(255,255,255)");
		}
	}
};
svg_manager.prototype.hide_all = function(){
	for(var floor in svgid_name_cvt){
		for(var id in svgid_name_cvt[floor]){
			this.hide(floor, id);
		}
	}
};
svg_manager.prototype.on_click = function(floor, id){
	this.hide_all();
	this.show(floor, id);
};
/**
 * @brief register on click event
 * 
 * @param func function(floor, id)
 */
svg_manager.prototype.register_on_click_event = function(func){
	for(var floor in svg_detail){
		for(var id in svg_detail[floor]){
			svg_detail[floor][id].addEventListener("click", function(that, floor, id, func){
				return function(e){
					that.on_click(floor, id);
					if(undefined !== func) func(floor, id);
				};
			}(this, floor, id, func), false);//bind this
		}
	}
};
console.log(document.getElementsByTagName("body")[0]);
document.getElementsByTagName("body")[0].addEventListener("load", function(){
	setInterval(function(){
		var svg = new svg_manager();
		svg.register_on_click_event();
	}, 100);
}, false);