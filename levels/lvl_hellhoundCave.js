var hellhoundCave = {
 
 	sizeX: 12,
 	sizeY: 11,
 	
 	background: 'img/background.png',
 	
 	startLocations: [
 		{x:1,y:1},
 		{x:0,y:2}
 	],
 	
 	walls: [
 		{x:1,y:4},
 		{x:8,y:0},
 		{x:9,y:0},
 		{x:10,y:0},
 		{x:9,y:1},
 		{x:10,y:1},
 		{x:8,y:2},
 		{x:7,y:3},
 		{x:8,y:3},
 		{x:10,y:3},
 		{x:8,y:4},
 		{x:9,y:5},
 		{x:10,y:6},
 		{x:10,y:7},
 		{x:9,y:8},
 		{x:10,y:8},
 		{x:9,y:9},
 		{x:10,y:9},
 		{x:6,y:5},
 		{x:6,y:6},
 		{x:7,y:7},
 		{x:6,y:8},
 		{x:6,y:9},
 		{x:11,y:0},
 		{x:11,y:1},
 		{x:11,y:2},
 		{x:11,y:3},
 		{x:11,y:4},
 		{x:11,y:5},
 		{x:11,y:6},
 		{x:11,y:7},
 		{x:11,y:8},
 		{x:11,y:9},
 		{x:4,y:10},
 		{x:5,y:10},
 		{x:6,y:10},
 		{x:7,y:10},
 		{x:8,y:10},
 		{x:9,y:10},
 		{x:10,y:10},
 		{x:11,y:10},
 	],
 		
 	pits: [
 		{x:3,y:0},
 		{x:4,y:0},
 		{x:5,y:0},
 		{x:6,y:0},
 		{x:4,y:1},
 		{x:5,y:1},
 		{x:6,y:1},
 		{x:4,y:2},
 		{x:4,y:3},
 		{x:3,y:5},
 		{x:4,y:5},
 		{x:1,y:6},
 		{x:2,y:6},
 		{x:3,y:6},
 		{x:4,y:6},
 		{x:1,y:7},
 		{x:2,y:7},
 		{x:3,y:7},
 		{x:4,y:7},
 		{x:5,y:7},
 		{x:1,y:8},
 		{x:2,y:8},
 		{x:3,y:8},
 		{x:4,y:8},
 		{x:1,y:9},
 		{x:2,y:9},
 		{x:3,y:9},
 		{x:4,y:9},
 		{x:0,y:6},
 		{x:0,y:7},
 		{x:0,y:8},
 		{x:0,y:9},
 		{x:0,y:10},
 		{x:1,y:10},
 		{x:2,y:10},
 		{x:3,y:10},
 	],
 	
 	mobs: [
 		{
			x:10,
			y:2,
			type:dataMobs.hellhound,
			id: "puppy",
			name: "Puppy",
			ai: 'dormant',
 		},
 		
 		{
			x:7,
			y:9,
			type:dataMobs.rat,
			ai: 'dormant',
 		},
 		
 		{
			x:8,
			y:9,
			type:dataMobs.rat,
			ai: 'dormant',
 		},
 	],
 	
 	triggers: [
 		{
 			x: 3,
 			y: 4,
 			event: 'intro',
 		},
 		
 		{
 			x: 10,
 			y: 5,
 			event: 'noHellhound',
 		},
 		
 		{
 			x: 9,
 			y: 2,
 			event: 'puppy',
 		},
 		
 		{
 			x: 6,
 			y: 4,
 			event: 'rats',
 		},
 	],
 	
 	events: {
 		intro: function() {
 			view.displayDialogue("The hellhound that has plagued the locals lurks within this cave!",this.name,this.img,"left");
 			this.location.event = undefined;
 			document.getElementById('dialogueCloseButton').style.display = "none";
 			document.getElementById('dialogueContinueButton').style.display = "inline";
 			var mobIndex = 0;
 			if (mobs[0] === this) {
 				mobIndex = 1;
 			};
 			document.getElementById('dialogueContinueButton').setAttribute('onclick','map.events.intro2('+mobIndex+')');
 		},
 		
 		intro2: function(mobIndex) {
 			view.displayDialogue("I am skeptical of the wisdom of the two of us, mere youngsters looking to make our mark, trying to take down a hellhound.  Yet, my steadfast loyalty to you, my childhood friend, impels me to join you in this misadventure.",mobs[mobIndex].name,mobs[mobIndex].img,"right");
 			document.getElementById('dialogueContinueButton').style.display = "none";
 			document.getElementById('dialogueCloseButton').style.display = "inline";
 		},
 		
 		noHellhound: function() {
 			view.displayDialogue("You know, it was probably those rats terrorizing the locals.  I bet there isn't even a hellhound in this cave at all!",this.name,this.img,"left");
 			this.location.event = undefined;
 		},
 		
 		puppy: function() {
 			view.displayDialogue("Growl?  >snurfle<  Woof.","Terrifying Hellhound... Puppy",mobs[2].img,"right");
 			this.location.event = undefined;
 			document.getElementById('dialogueCloseButton').style.display = "none";
 			document.getElementById('dialogueContinueButton').style.display = "inline";
 			for (i in mobs) {
 				if (mobs[i] === this) {
 					mobIndex = i;
 				};
 			};
 			document.getElementById('dialogueContinueButton').setAttribute('onclick','map.events.puppy2('+mobIndex+')');
 		},
 		
 		puppy2: function(mobIndex) {
 			view.displayDialogue("Gasp!  Aren't you just the cutest little puppy?  Yes you are!  YES YOU ARE!!!<br />That's it, I'm taking you home!",mobs[mobIndex].name,mobs[mobIndex].img,"left");
 			mobs[2].player = true;
 			heroes.push(mobs[2]);
 			document.getElementById('dialogueContinueButton').style.display = "none";
 			document.getElementById('dialogueCloseButton').style.display = "inline";
 		},
 		
 		rats: function() {
 			view.displayDialogue("Ugh, I see rat droppings.  Is this cave filled with giant rats?  What is this, the first level of a fantasy RPG?",this.name,this.img,"left");
 			this.location.event = undefined;
 			mobs[4].stats.move = 4;
 			mobs[4].move(map.hexes[104]);
 			mobs[3].stats.move = 4;
 			mobs[3].move(map.hexes[92]);
 			mobs[3].ai = ai.basic;
 			mobs[4].ai = ai.basic;
 		},
 		
 		home: function() {
 			if (this.id === "puppy") {
 				view.displayDialogue("Look at him go!",mobs[0].name,mobs[0].img,"left");
				document.getElementById('dialogueCloseButton').style.display = "none";
				document.getElementById('dialogueContinueButton').style.display = "none";
				document.getElementById('dialogueReturnButton').style.display = "inline";
 				document.getElementById('dialogueReturnButton').setAttribute('onclick','handlers.returnHome()');
 			};
 		},
 	},
 
 };