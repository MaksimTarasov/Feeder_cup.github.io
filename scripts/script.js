
   
   // var coord2 = [];
	
   //------------------------
	// координаты центра карты.
	var cordMap_X=54.693633;
	var cordMap_Y=20.419043;
	// координаты начала построениея уровней уловов
	var cordSkill_X;
	var cordSkill_Y;
	// зум карты
	var mapZoom=18;
	// массив уловов
	var rez=[];
	// массив фамилий участников
	var nameOFPlayers=[];
	var numOFSec=[];
	//-------------------------------------
    var myMap, myGeoObject, myRectangle;
	//объект куда будет выводится\ карта  по дефолту
	var myMAP ='map';
	var countOfPlayers;
	
ymaps.ready(create_map);

function create_map()
{
 myMap = new ymaps.Map(myMAP, {
        center: [cordMap_X,cordMap_Y],
        zoom: mapZoom,
		type: 'yandex#satellite',
		controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });	
//	myCollection = new ymaps.GeoObjectCollection();
	myColl = new ymaps.Collection;
}
function coordPreob(countOfPlayers,a,a2,dx1)//, nameOFPlayers, rez)
{

	myColl.removeAll();
	
	var proj = myMap.options.get('projection');// получаем тип проекции карты
	    var cord_cent;  // переменная для хранения координат центра карты
		//var count=countOfPlayers;  //количество полигов - взять из количества участников
		//var a = 3.14;//(140*3.14)/180;   // угол линии по которой строятся полигоны, углы занести в json и брать в зависимости от места лова
		//var a2 = 1.57;// (45*3.14)/180;  // угол на который смещяется грань полигона
		var dx=-dx1; // смещение по Х - размер сектора лова
		var dy=5;	// смещение по У - величина улова
 	    //преобразование координат начала построения полигонов из проекции карт в декартову проекцию
		// данные координаты брать из координат первого сектора или последнего
	   cord_cent = myMap.converter.globalToPage(proj.toGlobalPixels([cordSkill_Y, cordSkill_X],18));
	   
	   // получение Х и У начала построение полигонов
       var x = cord_cent[0];
	   var y = cord_cent[1];
	   var coord1,coord2,coord3,coord4;
	   var colorPolygon; // массив координат полигонов
	   //var hintContent_new = "";
	  // var coord=[];	
		
		
		////-----------------------------------------------------------------------------------------
    	
 		
		for (var i=0; i<countOfPlayers; i++){ // цикл получения координат  полигонов
		// координаты первой грани с учетом смещения и поворота относительно места построения
			dy=0;
			colorPolygon = '#6699ff';
			if (rez[i]!=0) {
				dy=25+(0.01*rez[i]);
				if (rez[i]>1000) colorPolygon ='#ff3867';
				
			};
			console.log(x);    
			console.log(y);
		    coord1 = proj.fromGlobalPixels(myMap.converter.pageToGlobal([x,y]),18);
		    coord2 = proj.fromGlobalPixels(myMap.converter.pageToGlobal([Math.cos(a2)*(dy)+x,Math.sin(a2)*(dy)+y]),18);
		// координаты вторрой грани с учетом смещения, (50) это радиус или смещение полигонов, 
		// для первой пары коодинат это размер полигона, длина сектора.
		// для второй ппары координа это величина улова
			x=Math.cos(a)*(dx)+x;		
			y=Math.sin(a)*(dx)+y;
			console.log("-------------------------------------------------");
			console.log(x);    
			console.log(y);
			coord3 = proj.fromGlobalPixels(myMap.converter.pageToGlobal([x,y]),18); 	
			coord4 = proj.fromGlobalPixels(myMap.converter.pageToGlobal([Math.cos(a2)*(dy)+x,Math.sin(a2)*(dy)+y]),18);	

			myColl.add(new ymaps.Polygon([
							[
								coord1,
								coord2,
								coord4,
								coord3
								
							],
							/*[  
								coord[i],
								coord[i+1],
								coord[i+3],
								coord[i+2]
							] */
							],
							{
								hintContent: "Сектор:"+numOFSec[i]+"<br/>"+"Участник:"+nameOFPlayers[i]+"<br/>"+"Улов:"+rez[i]+"г."
							},
							{
								fillColor: colorPolygon,
								opacity: 0.5
							})
					   );
		}
////---------------------------------------------------------------------------------------------------------------------------------	
	
}

function init (myMAP1,numOfTour) {
	
	console.log("1");
	 $.getJSON('https://maksimtarasov.github.io/plase.json',function(data)
	 {
		
	    console.log("2");
		cordMap_X=data.Place[numOfTour].cord_Map_X;
		cordMap_Y=data.Place[numOfTour].cord_Map_Y;
		cordSkill_X=data.Place[numOfTour].cord_skill_x;
		cordSkill_Y=data.Place[numOfTour].cord_skill_y;
		mapZoom=data.Place[numOfTour].map_Zoom;
		nameOFPlayers.length=0;
		rez.length=0;
		for (var i in data.Place[numOfTour].result)
		{
			rez.push(data.Place[numOfTour].result[i]);
		};
		for (var i in data.Place[numOfTour].nameOfPlayers)
		{
			nameOFPlayers.push(data.Place[numOfTour].nameOfPlayers[i]);
		};
		for (var i in data.Place[numOfTour].numOfSec)
		{
			numOFSec.push(data.Place[numOfTour].numOfSec[i]);
		};
		
	//---------------------------------------------------------------------
	
    countOfPlayers=nameOFPlayers.length;
	// что передовать в -> function coordPreob(countOfPlayers,a,a2,dx1, nameOFPlayers, rez, i)
	coordPreob(countOfPlayers,data.Place[numOfTour].alpha,data.Place[numOfTour].alpha2,data.Place[numOfTour].dx)//,nameOFPlayers,rez); // построение полигонов
	
	myMap.setCenter([cordMap_X,cordMap_Y],mapZoom);	
    
	
	
  
  myMap.geoObjects
        .add(myColl);  

});
}

function loadmap(myMAP1,numOfTour) // загрузка карты.  в параметрах функции указан объект загрузки карты
{
   // delet old map
  // myMAP = myMAP1;
  // myMap.destroy();
 console.log("0");
  init(myMAP1,numOfTour); // создание новой карты
  
}








	////-----------------------------------------------------------------------------------------
		/*
		for (var i=0; i<countOfPlayers; i++){ // цикл получения координат 5 полигонов
		// координаты первой грани с учетом смещения и поворота относительно места построения
		dy=0;
		//colorPolygon = '#6699ff';
		if (rez[i]!=0) {
				dy=25+(0.01*rez[i]);
				if (rez[i]>1000) {colorPolygon.push('#ff3867');}
				else {colorPolygon.push('#6699ff');}
		};
		console.log(colorPolygon);    
		console.log(rez[i]);
		coord.push(proj.fromGlobalPixels(myMap.converter.pageToGlobal([x,y]),18));
		coord.push(proj.fromGlobalPixels(myMap.converter.pageToGlobal([Math.cos(a2)*(dy)+x,Math.sin(a2)*(dy)+y]),18));
		// координаты вторрой грани с учетом смещения, (50) это радиус или смещение полигонов, 
		// для первой пары коодинат это размер полигона, длина сектора.
		// для второй ппары координа это величина улова
        x=Math.cos(a)*(dx)+x;		
		y=Math.sin(a)*(dx)+y;
        coord.push(proj.fromGlobalPixels(myMap.converter.pageToGlobal([x,y]),18)); 	
    	coord.push(proj.fromGlobalPixels(myMap.converter.pageToGlobal([Math.cos(a2)*(dy)+x,Math.sin(a2)*(dy)+y]),18));	
		}
		
		// создание коллекции полигонов
		myColl = new ymaps.Collection;
		for (var i=0; i<coord.length; i=i+4) {
			myColl.add(new ymaps.Polygon([
							[
								coord[i],
								coord[i+1],
								coord[i+3],
								coord[i+2]
							],
							[  
								coord[i],
								coord[i+1],
								coord[i+3],
								coord[i+2]
							] 
							],
							{
								hintContent: "Многоугольник"
							},
							{
								fillColor: colorPolygon[i/4]
							})
					   );
		} */
////---------------------------------------------------------------------------------------------------------------------------------	

