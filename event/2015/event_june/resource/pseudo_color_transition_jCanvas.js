var CONSTANT = {
	'backimg' : {
		source: './resource/1f_jp.png',
		x: 0, y: 50,
		fromCenter: false
	},
    'canvas_name' : "map1",
    'layer_group_name' : "organizations_layer_group",
    'description_id_prefix' : "description_",
    'organizations_name_table' : [
        "bunngukenn",
        "tenmonken",
        "chikaken",
        "chibilab",
        "ACM",
        "seibutuken",
        "ichikaken",
        "nikaken",
        "rikoukaken",
        "icibukken",
        "ichisuuken",
        "nisuuken",
        "kikoukaken",
        "iidaken",
        "akituken_tokoro",
        "musenken"
    ],
    'organizations_color' : {
        "bunngukenn"     : '#fef263',
        "tenmonken"      : '#fef263',
        "chikaken"       : '#fef263',
        "chibilab"       : '#f4b3c2',
        "ACM"            : '#89c3eb',
        "seibutuken"     : '#f4b3c2',
        "ichikaken"      : '#f4b3c2',
        "nikaken"        : '#f4b3c2',
        "rikoukaken"     : '#f4b3c2',
        "icibukken"      : '#fef263',
        "ichisuuken"     : '#cca6bf',
        "nisuuken"       : '#cca6bf',
        "kikoukaken"     : '#89c3eb',
        "iidaken"        : '#fef263',
        "akituken_tokoro": '#f4b3c2',
        "musenken"       : '#89c3eb'
    }
};
Object.freeze(CONSTANT);//擬似const


/*
maplayer_c

f new(id, ):レイヤー作成、レイヤーを配列として持つ、定数作成
f exclusive_draw(name):団体名を指定すると団体のレイヤーと背景画像レイヤー表示
f draw_all():全部描画
v layers_:array contain layer ref
v id_:canvas id
*/

maplayer_c = function(id){
    this.id_ = "#" + id;
    var layer_base = {
        type       : "rectangle",
        //name     : "box1",
        //fillStyle: 'red',
        x: 240, y: 160,
        width: 200, height: 100
    };
    //addLayer関数に渡す引数をつくる
    var layer_arg = new Array();
    var i;
    for(i = 0; i < CONSTANT.organizations_name_table.length; i++){
        layer_arg.push($.extend(true, {}, layer_base));//copy
        layer_arg[i]['name'] = CONSTANT.organizations_name_table[i];
        layer_arg[i]['fillStyle'] = organizations_color[organizations_name_table[i]];
    }
    //レイヤーに追加その1
    $(this.id_).drawImage({
        source: './resource/1f_jp.png',
        x: 0, y: 50,
        layer:true,
        name:"backimg",
        fromCenter: false
    });
    //レイヤーに追加その2 addLayer
    var l_a;
    for(l_a in layer_arg){
        $(this.id_).addLayer(l_a);
    }
    //LayerGroup作成
    var o_name;
    for(o_name in CONSTANT.organizations_name_table){
        $(this.id_).addLayerToGroup(o_name, CONSTANT.layer_group_name);
    }
    this.layer_group_ = $(this.id_).getLayerGroup(CONSTANT.layer_group_name);
};
maplayer_c.prototype.hide_all = function(){
    $(this.id_).setLayerGroup(this.layer_group_, {
        visible: false
    }).drawLayers();
};
maplayer_c.prototype.draw_all = function(){
    $(this.id_).setLayerGroup(this.layer_group_, {
        visible: true
    }).drawLayers();
};
maplayer_c.prototype.exclusive_draw = function(name){
    this.hide_all();
    var layer = $(this.id_).getLayer(name);
    layer.visible = true;
    (this.id_).drawLayers();
};
var hide_all_description = function(){
    var o_name;
    for(o_name in CONSTANT.organizations_name_table){
        var t_id = "#" + CONSTANT.description_id_prefix + organizations_name_table;
        $(t_id).style.display = "none";
    }
}
var show_all_description = function(){
    var o_name;
    for(o_name in CONSTANT.organizations_name_table){
        var t_id = "#" + CONSTANT.description_id_prefix + organizations_name_table;
        $(t_id).style.display = "block";
    }
}
var exclusive_show_description = function(name){
    hide_all_description();
    $("#" + CONSTANT.description_id_prefix + name).style.display = "block";
}
$(function(){
	$("#map1").drawImage(CONSTANT.backimg).drawArc({         // 1. 赤い円を描画する
        fillStyle: "#ff0000",      // 塗りつぶしの色（赤）
        strokeStyle: "#000000",    // 枠線の色（黒）
        strokeWidth: 2,            // 枠線の太さ（2px）
        x: 240,                    // x方向位置（240px）
        y: 120,                    // y方向位置（120px）
        radius: 50                 // 半径（50px）
    });
});