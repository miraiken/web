/* =================================================
		easy.update.js Version 1.0 Created by Kato
==================================================*/

/* -------------------------------------------------
・更新をラクにするためのjsです。
・jsが分かる方はどんどん編集しちゃってください。
--------------------------------------------------*/ 


// -------------------------------------------------
// XML読み込み
// -------------------------------------------------
function xmlLoad(){
	$.ajax({
		url:'./update.xml',
		type:'get',
		dataType:'xml',
		timeout:1000,
		error: function(){
			alert("xmlファイルの読み込みに失敗しました。もう一度更新をしてみてください。");
		},
		success:parse_xml
	});
}

// -------------------------------------------------
// XMLデータを取得
// -------------------------------------------------
function parse_xml(xml,status){
	if(status!='success') return;
	
	// 配列の準備
	var $array = new Array();

	// 更新情報を取得
	$(xml).find("item").each( function(i){
		var $date = $(this).find('update').text();
		var $title = $(this).attr("title");
		var $url = $(this).find('url').text();
		var $category = $(this).parent().attr("category");
		if (!$category) $category = "none";
		var $color = $(this).parent().attr("color");
		if (!$color) $color = "black";
		var $season = $(this).parent().parent().attr("season");
		if (!$season) $season = "none";
		var $page = $(this).parent().parent().attr("label");
		if (!$page) $page = $title;
		var $topurl = $(this).parent().parent().attr("url");
		if (!$topurl) $topurl = $url;

		// -------------------------------------------------
		// 配列に代入
		// -------------------------------------------------
		// 0:更新日付
		// 1:ページタイトル
		// 2:URL
		// 3:出展者向け情報提供ページのカテゴリ名
		// 4:出展者向け情報提供ページのカテゴリ色
		// 5:開催時期
		// 6:トップページのお知らせのタイトル
		// 7:トップページのお知らせのURL
		$array[i] = [$date, $title, $url, $category, $color, $season, $page, $topurl];

		/* デバッグ用
		$("#trace").append( $array[i][0]+":" + $array[i][1] + ":" + $array[i][2]+":"+
												$array[i][3]+":"+$array[i][4]+":"+$array[i][5]+":"+
												$array[i][6]+":"+$array[i][7]+"<br/>" );
		*/
	});

	// 取得した日付をソート
	xsort($array,0,-1);

	// ファイルネームを取得
	var file_name = getFileName();

	// ファイル名による処理分岐
	if (file_name == "CircleTop1.html") dispCircleTop1($array);
	if (file_name == "index.html") dispIndex($array);
	if (file_name == "CircleTop.html") dispCircleTop($array);

	// デバッグ用
	if (file_name == "sample_xml.html") {
		//dispIndex($array);
		dispCircleTop($array);
		//dispCircleTop1($array);
	}
	//dispMenu();
}

// -------------------------------------------------
// 二次元配列のソート
// -------------------------------------------------
function xsort(sqs,col,order){
	//col:並べ替えの対象となる列
	//order:1=昇順、-1=降順
	sqs.sort(function(a,b){
		var dateA = new Date("20"+a[col].split(".").join("/"));
		var dateB = new Date("20"+b[col].split(".").join("/"));
		return((dateA-dateB)*order);
	});
	return(sqs);
}

// -------------------------------------------------
// ファイル名の取得
// -------------------------------------------------
function getFileName() {
	var url = window.location;
	var path = url.href.split('/');
	var file_name = path.pop();
	return file_name;
}

// -------------------------------------------------
// index用のHTMLを作成
// -------------------------------------------------
function dispIndex($array) {
	// 上から1つめまでは更新日を赤色に
	var $newUpColor = "#ff0000";

	for(var i in $array){
		$("#trace").append(
			'<p style="padding: 0.05cm;">'+
				'<font color="green">■</font><font color="'+$newUpColor+'">'+$array[i][0]+'</font><br>'+
					'&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+$array[i][7]+'">'+$array[i][6]+'</a>を更新しました'+
			'</p>' 
		);
		// 2つめ以降は更新日を黒色に
		$newUpColor = "#000000";

		// 更新表示数の制限
		if(i>10) break;
	}
}

// -------------------------------------------------
// CircleTop1用のHTMLを作成（6月期のみ）
// -------------------------------------------------
function dispCircleTop1($array) {

	// 最新の更新日のみを取得
	for(var i in $array){
		if ($array[i][5] == "June"){
			var lastUpdate = new Date("20"+$array[i][0].split(".").join("/"));
			break;
		};
	}

	// 「年」「月」「日」を Date オブジェクトから取り出してそれぞれに代入
	var y = lastUpdate.getFullYear();
	var m = lastUpdate.getMonth() + 1;
	var d = lastUpdate.getDate();

	// フォーマットを整形して表示
	$("#june-last-update").append(y+'年'+m+'月'+d+'日');
}

// -------------------------------------------------
// CircleTop用のHTMLを作成
// -------------------------------------------------
function dispCircleTop($array) {
	// お知らせの表示
	$("#trace").append($("<div/>").attr("id","news"));
	$("#news").append('<p style="background-color:green; padding: 0.05cm; margin:0px auto -15px auto;">'+
												'<font color="#ffffff">■<string>おしらせ</string></font>'+
											'</p>');

	for(var i in $array){
		if ($array[i][5] == "June") {

			// 上から3つめまでは更新日を赤色に
			var $newUpColor = "#ff0000";
			if(i>2) $newUpColor = "#000000";

			$("#news").append(
				'<p style="padding: 0.05cm;">'+
					'<font color="'+$array[i][4]+'">■</font>'+
					'<font color="#000000"><b>'+
						'<a href="'+$array[i][2]+'">'+$array[i][1]+'</a>を更新しました'+
							'(<font color="'+$newUpColor+'">'+$array[i][0]+'更新</font>)'+
					'</b></font>'+
				'</p>'
			);
		}
	}

	// カテゴリ毎の表示順と色の設定
	var $arrayCategory = new Array("総合情報", "手続きについて", "グループの情報",
																		"会計情報", "イベント直前・当日の情報", "事後処理関係");
	var $arrayColor = new Array("#ff0000", "#ffff00", "aqua", "lime", "blue", "#FFC000");
	if ($arrayCategory.length !== $arrayColor.length) alert("配列の数が一致していません。");

	for (var i=0; i<$arrayCategory.length; i++) {
		$("#trace").append("<br>");
		$("#trace").append($("<div/>").attr("id","group"+(i+1)));

		// カテゴリ項目の作成
		$("#group"+(i+1)).append('<p style="background-color:green; padding: 0.05cm; margin:0px auto 0px auto;">'+
															'<font color="'+$arrayColor[i]+'">■</font>'+
															'<font color="#ffffff"><string>'+$arrayCategory[i]+'</string></font>'+
														'</p>');

		// 上から1つめまでは更新日を赤色に
		var $newUpColor = "#ff0000";

		for(var j=0; j<$array.length; j++) {
			if($array[j][3] == $arrayCategory[i] && $array[j][5] == "June"){

				$("#group"+(i+1)).append(
						'<font color="#000000" style="padding: 0.05cm; font-size:10.0pt;"><b>'+
							'<a href="'+$array[j][2]+'">'+$array[j][1]+'</a>'+
								'(<font color="'+$newUpColor+'">'+$array[j][0]+'更新</font>)'+
						'</b></font><br>'
				);

				// 2つめ以降は更新日を黒色に
				$newUpColor = "#000000";
			}
		}
	}
}


// -------------------------------------------------
// ここからサイドメニュー・フッター用コードです。
// 以下のルールで編集してください。
// 改行するときは文末に\(バックスラッシュ)を使用。
// 文字列を囲むときは'(シングルクォーテーション)ではなく”(ダブルクォーテーション)を使用。
// -------------------------------------------------
/*
function dispMenu() {

	// 初期化
	$("sidemenu").html("");
	$("footer").html("");

	document.getElementById("sidemenu").innerHTML ='\
	<p class=MsoNormal>\
		<span lang=EN-US>\
			<a href="index.html">\
				<span style="mso-no-proof:yes;text-decoration:none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1041" src=Menu001.jpg alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Menu001.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="concept.html">\
				<span style="mso-no-proof:yes;text-decoration:none; text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1040" src=Menu002.jpg alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Menu002.jpg">\
				</span>\
			</a>\
			<br>\
			<!--\
			<a href="Contents09.html">\
				<span style="mso-no-proof:yes;text-decoration: none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1039" src=Menu003.jpg alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Menu003.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="Contents09A.html">\
				<span style="mso-no-proof:yes;text-decoration: none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1038" src="Contents_cA.jpg" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Contents_cA.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="Contents09B.html">\
				<span style="mso-no-proof:yes;text-decoration: none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1037" src="Contents_cB.jpg" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Contents_cB.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="Contents09C.html">\
				<span style="mso-no-proof:yes;text-decoration: none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1036" src="Contents_cC.jpg" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Contents_cC.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="Contents09D.html">\
				<span style="mso-no-proof:yes;text-decoration: none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1035" src="Contents_cD.jpg" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Contents_cD.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="Contents09E.html">\
				<span style="mso-no-proof:yes; text-decoration:none;text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1033" src="Contents_cE.jpg" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Contents_cE.jpg">\
				</span>\
			</a>\
			<br>\
			-->\
			<a href="access.html">\
				<span style="mso-no-proof:yes;text-decoration:none; text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1032" src=Menu005.jpg alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Menu005.jpg">\
				</span>\
			</a>\
			<br>\
			<a href="link.html">\
				<span style="mso-no-proof:yes;text-decoration:none; text-underline:none">\
					<img border=0 width=171 height=34 id="_x0000_i1031" src=Menu007.jpg alt="説明: 説明: F:\サークル\みらい研\miraiken HP\Menu007.jpg">\
				</span>\
			</a>\
			<br>\
			<br>\
			<a href="http://www.tus.ac.jp/">\
				<span style="mso-no-proof:yes;text-decoration:none;text-underline:none">\
					<img border=0 width=171 height=45 id="_x0000_i1030" src="tus_logo.gif" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\tus_logo.gif">\
				</span>\
			</a>\
		</span>\
	</p>\
	<p>\
		<span lang=EN-US>\
			<a href="http://www.miraikan.jst.go.jp/">\
				<span style="mso-no-proof:yes;text-decoration:none;text-underline:none">\
					<img border=0 width=171 height=44 id="_x0000_i1029" src="bnr_02.gif" alt="説明: 説明: F:\サークル\みらい研\miraiken HP\bnr_02.gif">\
				 </span>\
			</a>\
		</span>\
	</p>';

	document.getElementById("footer").innerHTML ='\
	<span style="font-size:10.0pt;">\
		<img border=0 width=829 height=2 src=Title002.jpg alt="Title002.jpg"><br>\
		Copyright 2006-2013 東京理科大学みらい研究室～科学へのトビラ～ All rights reserved.\
	</span>';
}
*/

// 関数実行
$(function(){
	xmlLoad();
});
