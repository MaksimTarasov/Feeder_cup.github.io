ymaps.ready(init);
    var coord2 = [];

    //var rez2=[495,2385,2315,1120,2140,1130,1295,510,0,1530,1730,2055,890,1375,3150,1540,3190,3535,1110,1240,1175,2495,0,0,0,0,0];
	var rez2=[0,0,0,0,0,2495,1175,1240,1110,3535,3190,1540,3150,1375,890,2055,1730,1530,0,510,1295,1130,2140,1120,2315,2385,495];
	var rez1 =[0,3030,1195,1975,2495,1565,1055,990,1705,450,0,725,1585,4720,645,0,0,820,1070,965,985,0,0,3905,2345,2735,1110,2260];
    
	

    var myMap, myGeoObject, myRectangle;

function coordPreob(rez,countOfPlayers)
{
	var y=54.693633;
	var x=20.419043;
	var y2=54.693633;//54.693227;
	var x2=20.419193;
	var delta_y=0;
	var delta_x=0.000150;
	
	for (var i=0; i<countOfPlayers; i++){
		coord2.push([y,x]);
		coord2.push([y2,x2]);
		x=x+delta_x;
		x2=x2+delta_x;
		y2=54.693633;//54.693227;
		if (rez[i]!=0) {y2=y2-(0.0000001*rez[i])};//1/rez[i]*0.1)};
		//document.writeln("rez=",rez[i],"|||","{y2:",i,"=",y2,"}","</br>");
	}
}

function init () {
    myMap = new ymaps.Map('map', {
        center: [54.693730, 20.42181255],
        zoom: 18
    }, {
        searchControlProvider: 'yandex#search'
    });  
    
	
	var countOfPlayers=28;
	
	
	
	
	
	/*
	for (var i=0; i<countOfPlayers+1; i++){
		coord2.push([y,x]);
		coord2.push([y2,x2]);
		x=x+delta_x;
		x2=x2+delta_x;
		y2=54.693633;//54.693227;
		if (rez[i]!=0) {y2=y2-(0.0000001*rez[i])};//1/rez[i]*0.1)};
		//document.writeln("rez=",rez[i],"|||","{y2:",i,"=",y2,"}","</br>");
	}  */
	/*document.writeln("[",coord2.length,"]");
	document.writeln("</br>");
	document.writeln("============================================================");
	document.writeln("</br>");*/
	
	//coordPreob(rez1,countOfPlayers);
	coordPreob(rez2,countOfPlayers);
	
	
	//document.writeln("============================================================");
	//document.writeln("[",coord2.length,"]");
	
		
    myCollection = new ymaps.GeoObjectCollection();
	
	for (var i=2; i<coord2.length; i=i+2){
	myCollection.add(new ymaps.Rectangle([
								coord2[i],
								coord2[i+1]
							],{
							//Свойства
							hintContent: 'iiii',//rez[(i/2)-1],
							balloonContent: 'Прямоугольник 1'
							},{
								fillColor: '#ffff0022'
							}
							));
	}
	
  // myRectangle = new ymaps.Rectangle([coord[0],coord[1]]);
   
   /*for (var i=0;i<coutOfPlayers+2;i=i+2){
	
   document.writeln(coord2[i]);
   document.writeln(coord2[i+1]);
   document.writeln("||<br>");
   
}  */
   
   

  myMap.geoObjects
        .add(myCollection);  
	
} 
