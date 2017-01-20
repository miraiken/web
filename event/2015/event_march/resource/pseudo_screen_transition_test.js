(function(){
	// デバッグモード切替
	var debugMode = true;//Release時にはfalseに

	// 置換対象のメソッドを配列として保持する
	var methods = [
	 'log',
	 'debug',
	 'info',
	 'warn',
	 'error',
	 'dir',
	 'trace',
	 'assert',
	 'dirxml',
	 'group',
	 'groupEnd',
	 'time',
	 'timeEnd',
	 'count',
	 'profile',
	 'profileEnd'
	];
	// consoleが使えない場合は空のオブジェクトを設定しておく
	if( typeof window.console === "undefined" ){
		window.console = {};
	}
	// 各メソッドをwindowへ直接追加して行く
	for( var i in methods ){
		(function( m ){
			// consoleにある？デバッグモードは有効？consoleのものは関数？
			if( console[m] && debugMode && typeof console[m] === "function" ){
				window[m] = function(){ console[m].apply( console, arguments ); };
			}
			// debugModeがfalse,もしくは該当メソッドが存在しない場合は、空のメソッドを用意する
			else{
				window[m] = function(){};
			}
		})( methods[i] );
	}

	var is_exist_in_array = function(array, key){
		log("function 'is_exist_in_array' are called.");
		var i;
		var len = array.length;
		for(i = 0; i < len && !(i in array && key == array[i]); i++);
		if(len == i){
			return -1;
		}else{
			return i;
		}
	}

	//グローバル変数begin
	var ORGANIZATIONS_NUM = 9;
	var FLOOR_NUM = 3;
	var Xfloor = ["first_floor", "second_floor", "third_floor"];
	var organizations_in_what_floor = {
		"bunngukenn" : 2,
		"tenmonken" : 1,
		"chikaken" : 1,
		"chibilab" : 3,
		"acm" : 3,
		"seibutuken" : 2,
		"ichikaken" : 3,
		"nikaken" : 3,
		"rikoukaken" : 3
	};
	var organizations_name_table = [
		"chikaken",
		"tenmonken",
		"seibutuken",
		"bunngukenn",
		"chibilab",
		"acm",
		"nikaken",
		"ichikaken",
		"rikoukaken"
	];
	var floor = new Array();
	var title_list = new Array();
	var map_link = new Array();
	var description = new Array();
	//グローバル変数end
	var echo_image = function(doc, pic_plase, pic_alt){
		log("function 'echo_image' are called.");
		doc.src = pic_plase;
		doc.alt = pic_alt;
	}
	var description_is_hidden = function(doc){
		log("function 'description_is_hidden' are called.");
		if("none" == doc.style.display){
			return true;
		}else{
			return false;
		}
	}
	var hide_all_description = function(){
		log("function 'hide_all_description' are called.");
		var i;
		for(i = 0; i < organizations_name_table.length; i++){
			if(false == description_is_hidden(description[i])){
				description[i].style.display = "none";
			}
		}
	}
	var show_organizations_description = function(organizations_name){
		log("function 'show_organizations_description' are called.");		
		//入力したidは存在するか判定
		if(-1 != is_exist_in_array(organizations_name_table, organizations_name)){
			hide_all_description();
			//表示
			var temp2 = is_exist_in_array(organizations_name_table, organizations_name);
			if(-1 != temp2){
				description[temp2].style.display = "block";
			}
		}
	}
	var floor_is_hidden = function(doc){
		log("function 'floor_is_hidden' are called.");
		var reg = /hidden/g;
		return reg.test(doc.alt);
	}
	var create_file_name = function(name){
		log("function 'create_file_name' are called.");
		return "./map/" + name + ".png";
	}
	var hide_floor_map = function(doc, base_name){
		log("function 'hide_floor_map' are called.");
		var name = base_name + "_hidden";
		echo_image(doc, create_file_name(name), name);
		doc.usemap = "";
	}
	var hide_all_floor = function(){	
		log("function 'hide_all_floor' are called.");
		for(var i = 0; i < floor.length; i++){
			hide_floor_map(floor[i], Xfloor[i]);
		}
	}
	var echo_floor_map = function(floor_id, doc, pic_plase, pic_alt){
		log("function 'echo_floor_map' are called.");
		echo_image(doc, pic_plase, pic_alt);
		doc.usemap = "#map_" + floor_id;
	}
	var show_organizations_floor = function(organizations_name){
		log("function 'show_organizations_floor' are called.");
		if(-1 != is_exist_in_array(organizations_name_table, organizations_name)){
			var int_floor = organizations_in_what_floor[organizations_name] - 1;
			if(floor_is_hidden(floor[int_floor])){
				hide_all_floor();
			}
			var name = Xfloor[int_floor] + "_" + organizations_name;
			echo_floor_map(Xfloor[int_floor], floor[int_floor], create_file_name(name), name);

		}
	}
	var show_plain_floor = function(int_floor_num){
		log("function 'show_plain_floor' are called.int_floor_num = " + int_floor_num);
		if(0 < int_floor_num && int_floor_num <= FLOOR_NUM){
			hide_all_floor();
			var name = Xfloor[int_floor_num - 1] + "_plain";
			echo_floor_map(Xfloor[int_floor_num - 1], floor[int_floor_num - 1], create_file_name(name), name);
		}
	}
	var show_plain_floor_eve = function(int_floor_num){
		log("function 'show_plain_floor_eve' are called.");
		return function(eve){
			show_plain_floor(int_floor_num);
		}
	}
	var show_organizations = function(organizations_name){
		log("function 'show_organizations' are called.");
		return function(eve){
			log("function 'show_organizations'2 are called.");
			show_organizations_floor(organizations_name);
			show_organizations_description(organizations_name);
			eve.stopPropagation();
		}
	}

	function Init(){
		log("function 'Init' are called.");
	    // 読み込み完了後の処理
	    for(var i = 0; i < ORGANIZATIONS_NUM; i++){
	    	description[i] = document.getElementById("description_" + organizations_name_table[i]);
	    }
	    //addEventListener : クリック時のイベントを記述
	    for(var j = 0; j < ORGANIZATIONS_NUM; j++){
	    	log("j=" + j);
	    	title_list[j] = document.getElementById("title_" + organizations_name_table[j]);
	    	title_list[j].addEventListener("click", show_organizations(organizations_name_table[j]), false);
	    }
	    for(var k = 0; k < ORGANIZATIONS_NUM; k++){
	    	log("k=" + k);
	    	map_link[k] = document.getElementById("map_" + organizations_name_table[k]);
	    	map_link[k].addEventListener("click", show_organizations(organizations_name_table[k]), false);
	    }
	    for(var l = 0; l < FLOOR_NUM; l++){
	    	log("l=" + l);
	    	floor[l] = document.getElementById(Xfloor[l]);
	    	floor[l].addEventListener("click", show_plain_floor_eve(l + 1), false);
	    }
	    //HTML初期化
	    hide_all_description();
	    show_plain_floor(1);
	}

	//http://so-zou.jp/web-app/tech/programming/javascript/event/handler/onload.htm
	//Script start.
	if( document.addEventListener ){
	    document.addEventListener( 'DOMContentLoaded', Init, false );
	}
	else if( document.attachEvent ){
	    // DOMContentLoadedがサポートされない環境 (IE8以前) 向け
	    var CheckReadyState = function(){
	        if( document.readyState == 'complete' ){
	            document.detachEvent( 'onreadystatechange', CheckReadyState );
	            Init();
	        }
	    }
	    document.attachEvent( 'onreadystatechange', CheckReadyState );
	    (function(){
	        try{
	            document.documentElement.doScroll( 'left' );
	        }
	        catch( e ){
	            setTimeout( arguments.callee, 10 );
	            return;
	        }
	        document.detachEvent( 'onreadystatechange', CheckReadyState );
	        Init();
	    })();
	}
	else{
	    // attachEvent()すらもサポートされない環境 (?) 向け
	    Init();
	}
})();