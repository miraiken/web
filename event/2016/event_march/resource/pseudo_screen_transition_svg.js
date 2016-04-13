'use strict'
/**
 * @const {object}
 */
var constexpr = {
	'organizations_name_table' : [
		"chikaken",
		"tenmonken",
		"seibutuken",
		"bunngukenn",
		"chibilab",
		"ACM",
		"nikaken",
		"ichikaken",
		"rikoukaken"
	],
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
floor_manager = function () {
	this.doc = {};
	for(var i = 0; i < constexpr.itos.length; ++i){
		this.doc[constexpr.itos[i]] = document.getElementById(constexpr.itos[i] + "_floor_svg");
	}
}
svg_manager = function(){
	this.floor_ = new floor_manager();
	this.svg_ = {};
	for(var i = 0; i < constexpr.itos.length; ++i){
		this.svg_[constexpr.itos[i]] = this.floor_.doc[constexpr.itos[i]];
	}
	this.svg_detail = {};
	for(var floor in constexpr.svgid_name_cvt){
		for(var id in constexpr.svgid_name_cvt[floor]){
			this.svg_detail[floor][id] = this.svg_[floor].getElementById(id);
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
/**
 * @type svg_manager_click_event_callback
 * @param  {string} floor
 * @param  {string} id
 * @return none
 */
svg_manager.prototype.on_click = function(floor, id){
	this.hide_all();
	this.show(floor, id);
};
/**
 * This callback type is called `svg_manager_click_event_callback` and is displayed as a global symbol.
 *
 * @callback svg_manager_click_event_callback
 * @param {string} floor
 * @param {string} id
 */

/**
 * @brief register on click event
 * @param  {svg_manager_click_event_callback} func
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
description_manager = function(){
	/** @type {Element{}}*/
	this.description = {};
	for(var i = 0; i < constexpr.organizations_name_table.length; ++i){
		this.description[constexpr.organizations_name_table[i]] = document.getElementById("description_" + constexpr.organizations_name_table[i]);
	}
	this.shown = [];
	this.hide_detail_all();
}
description_manager.prototype.hide_detail = function (organizations_name) {
	var detail = Array.prototype.filter.call(organizations_name, function(e){
		return e.nodeType === 1;
	});
	detail[0].style.display = "none";
}
description_manager.prototype.hide_detail_all = function () { 
	for(var i = 0; i < constexpr.organizations_name_table.length; ++i){
		this.hide_detail(constexpr.organizations_name_table[i]);
	}
	this.shown = [];
}
description_manager.prototype.hide_detail_all_fast = function (){
	for(var i = 0; i < this.shown.length; ++i){
		this.hide_detail(constexpr.organizations_name_table[i]);
	}
	this.shown = [];
}
/**
 * @param  {string} organizations_name
 */
description_manager.prototype.show_detail = function (organizations_name) {
	this.hide_detail_all_fast();
	this.description[organizations_name].style.display = "block";
	this.shown.push(organizations_name);
}
console.log(document.getElementsByTagName("body")[0]);
document.getElementsByTagName("body")[0].addEventListener("load", function(){
	setInterval(function(){
		var svg = new svg_manager();
		svg.register_on_click_event(svg.on_click);
	}, 100);
}, false);