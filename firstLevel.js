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
			ai: 'dormant',
 		},
 		
 		{
			x:6,
			y:9,
			id:dataMobs.rat,
			ai: 'dormant',
 		},
 		
 		{
			x:7,
			y:9,
			id:dataMobs.rat,
			ai: 'dormant',
 		},
 	],
 	
 	events: [
 		{
 			x: 2,
 			y: 4,
 			execute: function() {
 				view.displayDialogue("The hellhound that has plagued the locals lurks within this cave!",this.name,this.img,"left");
 				this.location.event = undefined;
 			},
 		},
 		
 		{
 			x: 9,
 			y: 5,
 			execute: function() {
 				view.displayDialogue("You know, it was probably those rats terrorizing the locals.  I bet there isn't even a hellhound in this cave at all!",this.name,this.img,"left");
 				this.location.event = undefined;
 				mobs[2].player = true;
 			},
 		},
 		
 		{
 			x: 8,
 			y: 2,
 			execute: function() {
 				view.displayDialogue("Aren't you just the cutest little puppy?  Yes you are!  YES YOU ARE!!!<br />That's it, I'm taking you home!",this.name,this.img,"left");
 				this.location.event = undefined;
 				mobs[2].player = true;
 			},
 		},
 		
 		{
 			x: 5,
 			y: 4,
 			execute: function() {
 				view.displayDialogue("Ugh, I see rat droppings.  Is this cave filled with giant rats?  What is this, the first level of a fantasy RPG?",this.name,this.img,"left");
 				this.location.event = undefined;
 				mobs[4].stats.move = 4;
 				mobs[4].move(map.hexes[67]);
 				mobs[3].stats.move = 4;
 				mobs[3].move(map.hexes[77]);
 				mobs[3].ai = ai.basic;
 				mobs[4].ai = ai.basic;
 			},
 		},
 	],
 
 };