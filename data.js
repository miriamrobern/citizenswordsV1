 
 var heroes = [
 
 	{
 		name: "Daisy",
 		img: 'img/minotaur.png',
 	},
 
 	{
 		name: "Mx. Stout",
 		img: 'img/dwarf.png',
 	},
 	
 ];
 
 var dataMobs = {
 
 	hellhound: {
 		name: "Hellhound",
 		img: "img/hellhound.png",
 	},
 
 };
 
 
 var firstLevel = {
 
 	sizeX: 10,
 	sizeY: 10,
 	
 	background: 'img/background.png',
 	
 	startLocations: [
 		{x:0,y:0},
 		{x:0,y:1}
 	],
 	
 	walls: [
 		{x:0,y:4},
 		{x:7,y:0},
 		{x:8,y:0},
 		{x:9,y:0},
 		{x:8,y:1},
 		{x:9,y:1},
 		{x:7,y:2},
 		{x:6,y:3},
 		{x:7,y:3},
 		{x:9,y:3},
 		{x:7,y:4},
 		{x:8,y:5},
 		{x:9,y:6},
 		{x:9,y:7},
 		{x:8,y:8},
 		{x:9,y:8},
 		{x:8,y:9},
 		{x:9,y:9},
 		{x:5,y:5},
 		{x:5,y:6},
 		{x:6,y:7},
 		{x:5,y:8},
 		{x:5,y:9},
 	],
 		
 	pits: [
 		{x:2,y:0},
 		{x:3,y:0},
 		{x:4,y:0},
 		{x:5,y:0},
 		{x:3,y:1},
 		{x:4,y:1},
 		{x:5,y:1},
 		{x:3,y:2},
 		{x:3,y:3},
 		{x:2,y:5},
 		{x:3,y:5},
 		{x:0,y:6},
 		{x:1,y:6},
 		{x:2,y:6},
 		{x:3,y:6},
 		{x:0,y:7},
 		{x:1,y:7},
 		{x:2,y:7},
 		{x:3,y:7},
 		{x:4,y:7},
 		{x:0,y:8},
 		{x:1,y:8},
 		{x:2,y:8},
 		{x:3,y:8},
 		{x:0,y:9},
 		{x:1,y:9},
 		{x:2,y:9},
 		{x:3,y:9},
 	],
 	
 	mobs: [
 		{
			x:9,
			y:2,
			id:dataMobs.hellhound,
 		},
 	],
 	
 	events: [],
 
 };