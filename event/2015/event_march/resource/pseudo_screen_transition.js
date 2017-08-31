function findIndex(array, element) {
  for (var index = 0; index < array.length; index++) {
    if (element == array[index]) {
      return index;
    }
  }
  return -1;
}

// グローバル変数開始
var floorIds = ['first_floor', 'second_floor', 'third_floor'];
var organizationIdToFloorNumber = {
  bunngukenn: 2,
  tenmonken: 1,
  chikaken: 1,
  chibilab: 3,
  acm: 3,
  seibutuken: 2,
  ichikaken: 3,
  nikaken: 3,
  rikoukaken: 3
};
var organizationIds = [
  'chikaken',
  'tenmonken',
  'seibutuken',
  'bunngukenn',
  'chibilab',
  'acm',
  'nikaken',
  'ichikaken',
  'rikoukaken'
];
var floors = [];
var titles = [];
var mapAnchors = [];
var descriptions = [];
// グローバル変数終了

function echoImage(doc, plase, alt) {
  doc.src = plase;
  doc.alt = alt;
}

function descriptionIsHidden(doc) {
  return 'none' == doc.style.display;
}

function hideAllDescriptions() {
  for (var index = 0; index < organizationIds.length; index++) {
    if (!descriptionIsHidden(descriptions[index])) {
      descriptions[index].style.display = 'none';
    }
  }
}

function showOrganizationDescriptions(id) {
  // 入力したidは存在するか判定
  var index = findIndex(organizationIds, id);
  if (-1 != index) {
    hideAllDescriptions();
    descriptions[index].style.display = 'block';
  }
}

function floorIsHidden(doc) {
  return /hidden/g.test(doc.alt);
}

function createFileName(name) {
  return './map/' + name + '.png';
}

function hideFloorMap(doc, id) {
  var name = id + '_hidden';
  echoImage(doc, createFileName(name), name);
  doc.usemap = '';
}

function hideAllFloorMaps() {
  floors.forEach(function(floor, index) {
    hideFloorMap(floor, floorIds[index]);
  });
}

function echoFloorMap(id, doc, plase, alt) {
  echoImage(doc, plase, alt);
  doc.usemap = '#map_' + id;
}

function showOrganizationFloor(organizationId) {
  if (-1 != findIndex(organizationIds, organizationId)) {
    var floorIndex = organizationIdToFloorNumber[organizationId] - 1;

    if (floorIsHidden(floors[floorIndex])) {
      hideAllFloorMaps();
    }

    var name = floorIds[floorIndex] + '_' + organizationId;
    echoFloorMap(floorIds[floorIndex], floors[floorIndex],
                 createFileName(name), name);
  }
}

function showPlainFloorMap(number) {
  if (0 < number && number <= floorIds.length) {
    hideAllFloorMaps();

    var name = floorIds[number - 1] + '_plain';
    echoFloorMap(floorIds[number - 1], floors[number - 1],
                 createFileName(name), name);
  }
}

function createPlainFloorShower(number) {
  return function() {
    showPlainFloorMap(number);
  };
}

function createOrganizationShower(id) {
  return function(event) {
    showOrganizationFloor(id);
    showOrganizationDescriptions(id);
    event.stopPropagation();
  };
}

function initialize() {
  // 読み込み完了後の処理

  organizationIds.forEach(function(id, index) {
    descriptions[index] = document.getElementById('description_' + id);

    // addEventListener : クリック時のイベントを記述
    var show = createOrganizationShower(id);
    titles[index] = document.getElementById('title_' + id);
    titles[index].addEventListener('click', show, false);

    mapAnchors[index] = document.getElementById('map_' + id);
    mapAnchors[index].addEventListener('click', show, false);
  });

  floorIds.forEach(function(id, index) {
    floors[index] = document.getElementById(id);
    floors[index].addEventListener('click',
                                   createPlainFloorShower(index + 1),
                                   false);
  });

  // HTML初期化
  hideAllDescriptions();
  showPlainFloorMap(1);
}

document.addEventListener('DOMContentLoaded', initialize, false);
