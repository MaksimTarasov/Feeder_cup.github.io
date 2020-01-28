ymaps.ready(init);
    var coord2 = [];

    //var rez2=[495,2385,2315,1120,2140,1130,1295,510,0,1530,1730,2055,890,1375,3150,1540,3190,3535,1110,1240,1175,2495,0,0,0,0,0];
	var rez2=[0,0,0,0,0,2495,1175,1240,1110,3535,3190,1540,3150,1375,890,2055,1730,1530,0,510,1295,1130,2140,1120,2315,2385,495];
	var rez1 =[0,3030,1195,1975,2495,1565,1055,990,1705,450,0,725,1585,4720,645,0,0,820,1070,965,985,0,0,3905,2345,2735,1110,2260];
	//Задаем размер улова в каждом туре.
    var myMap, myGeoObject, myRectangle;
	var myMAP ='map2';
	
	
function coordPreob(rez,countOfPlayers)// переменны Rez массив результатов уловов, countsOfPlayers - число игроков
{   //Задаем начальные координаты для прорисовки прямоугольников
	var y=54.693633;//координаты первой точки
	var x=20.419043;
	var y2=54.693633;//координаты второй точки
	var x2=20.419193;
	var delta_y=0;
	var delta_x=0.000150; //смещение по Х примерно 10 метров
	
	for (var i=0; i<countOfPlayers; i++){
		coord2.push([y,x]);// построение массива координат прямоугольников
		coord2.push([y2,x2]);//  занесение в масив 1 элемент - координаты первой точки, 2 элемент координаты второй точки
		x=x+delta_x;
		x2=x2+delta_x; // смещение на 10 метров
		y2=54.693633;//54.693227;
		if (rez[i]!=0) {y2=y2-(0.0000001*rez[i])}; // смещение по У - величина улова. с корректировкой по величине улова из массива rez1 b rez2
		
}
}
function init (rez) {
    myMap = new ymaps.Map(myMAP, { // построение карты
        center: [54.693351, 20.421093],//54.693730, 20.42181255], // центровка карты
        zoom: 18,
		type: 'yandex#satellite',
		controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });  
    
	var sector;
	//var countOfPlayers=28;
	coordPreob(rez,rez.length);  // вызов функции создания массива 
    //coordPreob(rez2,countOfPlayers);
	
    myCollection = new ymaps.GeoObjectCollection(); // создание коллекции объектов
	
	for (var i=2; i<coord2.length; i=i+2){  // создание коллекции объектов
	sector = 'Сектор №'+(((coord2.length-i)/2));
	myCollection.add(new ymaps.Rectangle([
								coord2[i],
								coord2[i+1]
							],{
							//Свойства
							hintContent: rez[(i/2)-1],
							balloonContent: sector
							},{
								fillColor: '#ffff0022'
							}
							));
	}
  myMap.geoObjects
        .add(myCollection);  
} 
function loadmap(myMAP1,rez)
{
  myMAP = myMAP1;
  myMap.destroy();  
  ymaps.ready(init(rez));
  
}