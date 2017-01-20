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
        "acm",
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
        "acm"            : '#89c3eb',
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
    var layer_args = [
        { name:"nikaken",         x:161, y:244, width: 43, height: 44 },
        { name:"ichikaken",       x:161, y:289, width: 43, height: 45 },
        { name:"rikoukaken",      x:161, y:335, width: 43, height: 51 },
        { name:"seibutuken",      x:161, y:387, width: 43, height: 52 },
        { name:"chibilab",        x:161, y:440, width: 43, height: 45 },
        { name:"akituken_tokoro", x:161, y:485, width: 43, height: 36 },
        { name:"iidaken",         x:161, y:523, width: 43, height: 44 },
        { name:"ichisuuken",      x:161, y:568, width: 43, height: 38 },
        { name:"tenmonken",       x:229, y:225, width: 19, height: 30 },
        { name:"tenmonken",       x:248, y:225, width: 43, height: 38 },
        { name:"nisuuken",        x:248, y:264, width: 43, height: 32 },
        { name:"icibukken",       x:248, y:297, width: 43, height: 38 },
        { name:"acm",             x:244, y:338, width: 4,  height: 36 },
        { name:"acm",             x:258, y:336, width: 43, height: 48 },
        { name:"bunngukenn",      x:249, y:437, width: 42, height: 67 },
        { name:"chikaken",        x:248, y:515, width: 43, height: 31 },
        { name:"kikoukaken",      x:248, y:547, width: 43, height: 32 },
        { name:"kikoukaken",      x:262, y:579, width: 30, height: 13 },
        { name:"kindai",          x:361, y:399, width: 86, height: 75 }
   ];
    for(var layer_arg in layer_args){
        layer_arg.type = "rectangle";
        layer_arg.fillStyle = CONSTANT.organizations_color[layer_arg.name];
        layer_arg.click = function(layer){
            layer.visible = !layer.visible;
            
        };
    }
    //レイヤーに追加その1
    $(this.id_).drawImage({
        source: './resource/1f_jp.png',
        x: 0, y: 50,
        layer:true,
        name:"backimg",
        fromCenter: false
    }).addLayer({
        type:"rectangle",
        name:""
    });
    //レイヤーに追加その2 addLayer
    for(var l_a in layer_args){
        $(this.id_).addLayer(l_a);
    }
    //LayerGroup作成
    for(var o_name in CONSTANT.organizations_name_table){
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
};
var show_all_description = function(){
    var o_name;
    for(o_name in CONSTANT.organizations_name_table){
        var t_id = "#" + CONSTANT.description_id_prefix + organizations_name_table;
        $(t_id).style.display = "block";
    }
};
var exclusive_show_description = function(name){
    hide_all_description();
    $("#" + CONSTANT.description_id_prefix + name).style.display = "block";
};
$(function(){
    var map_1f = new maplayer_c("map1");
	$("#map1").drawImage(CONSTANT.backimg).drawArc({         // 1. 赤い円を描画する
        fillStyle: "#ff0000",      // 塗りつぶしの色（赤）
        strokeStyle: "#000000",    // 枠線の色（黒）
        strokeWidth: 2,            // 枠線の太さ（2px）
        x: 240,                    // x方向位置（240px）
        y: 120,                    // y方向位置（120px）
        radius: 50                 // 半径（50px）
    });
});