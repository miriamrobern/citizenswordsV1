var view = {

	focus: {
		hex: undefined,
		mob: undefined,
		range: [],
		
	},

	displayMap: function() {
		view.displayMapGrid();
		view.refreshMapMobs();
	},
	
	displayMapBackground: function(level) {
		var mapBackgroundImg = document.getElementById('mapBackgroundImg');
		mapBackgroundImg.src = level.background;
	},
	
	displayFog: function() {
		
		for (i in map.hexes) {
			var newFogDiv = document.createElement('div');
			document.getElementById('mapMobDiv').appendChild(newFogDiv);
			
			newFogDiv.className = 'fogTile';

			var hexPosition = {};
			hexPosition.left = map.hexes[i].x * 4;
			hexPosition.top = map.hexes[i].y * 4;
			if (map.hexes[i].y % 2 === 0) {hexPosition.left += 2};
			newFogDiv.style.left = hexPosition.left + "vw";
			newFogDiv.style.top = hexPosition.top + "vw";
			
			newFogDiv.style.width = "4vw";
			newFogDiv.style.height = "4vw";
			
			map.hexes[i].fogDiv = newFogDiv;
			
		};
	},
	
	dispelFog: function(hex) {
		hex.fogDiv.style.opacity = 0;
		var fogDispelEvent = setTimeout(view.removeFog.bind(view,hex),500);
	},
	
	removeFog: function(hex) {
		hex.fogDiv.remove();
	},
	
	displayMapGrid: function() {
		
		document.getElementById('mapGridDiv').innerHTML = "";
		
		for (i in map.hexes) {
			var newHexDiv = document.createElement('div');
			document.getElementById('mapGridDiv').appendChild(newHexDiv);
			
			newHexDiv.className = "mapTile";
			newHexDiv.id = "hex_" + map.hexes[i].x + "_" + map.hexes[i].y;
			
			var hexPosition = {};
			hexPosition.left = map.hexes[i].x * 4;
			hexPosition.top = map.hexes[i].y * 4;
			if (map.hexes[i].y % 2 === 0) {hexPosition.left += 2};
			newHexDiv.style.left = hexPosition.left + "vw";
			newHexDiv.style.top = hexPosition.top + "vw";
			
			newHexDiv.style.width = "4vw";
			newHexDiv.style.height = "4vw";
			
			newHexDiv.setAttribute("onmouseover","handlers.hexMouseOver("+map.hexes[i].x+","+map.hexes[i].y+",'over')");
			newHexDiv.setAttribute("onmouseleave","handlers.hexMouseOver("+map.hexes[i].x+","+map.hexes[i].y+",'left')");
			newHexDiv.setAttribute("onclick","handlers.hexSelect("+map.hexes[i].x+","+map.hexes[i].y+")");
			
			var newHexCanvas = document.createElement('canvas');
			newHexCanvas.className = "tileCanvas";
			newHexCanvas.setAttribute("height","50px");
			newHexCanvas.setAttribute("width","50px");
			newHexDiv.appendChild(newHexCanvas);
			
			if (map.hexes[i].type === "open") {
				var draw = newHexCanvas.getContext('2d');
				var size = document.documentElement.clientWidth * 0.04;
				var x = size / 2;
				var y = size / 2;
				view.drawHex(draw,x,y,size,false);
			};
			
			var newHexCoords = document.createElement('p');
			newHexCoords.className = 'hexCoords';
			newHexCoords.innerHTML = "(" + map.hexes[i].x + "," + map.hexes[i].y + ")";
			newHexDiv.appendChild(newHexCoords);
			
			map.hexes[i].div = newHexDiv;
		};
	},
	
	refreshMapMobs: function() {
		
// 		document.getElementById('mapMobDiv').innerHTML = '';
		for (i in mobs) {
			var newMobDiv = document.createElement('div');
			newMobDiv.className = 'mobDiv';
			document.getElementById('mapMobDiv').appendChild(newMobDiv);

			newMobDiv.setAttribute("onclick","handlers.mobSelect("+i+")");

			var newMobImg = document.createElement('img');
			newMobImg.src = mobs[i].img;
			newMobImg.className = "mobImg";
			newMobDiv.appendChild(newMobImg);
		
			var hexPosition = document.getElementById('hex_'+mobs[i].location.x+'_'+mobs[i].location.y).getBoundingClientRect();
			var mapPosition = document.getElementById('mapMobDiv').getBoundingClientRect();
			var mobPosition = {}
			mobPosition.top = hexPosition.top - mapPosition.top;
			mobPosition.bottom = hexPosition.bottom - mapPosition.bottom;
			mobPosition.left = hexPosition.left - mapPosition.left;
			mobPosition.right = hexPosition.right - mapPosition.right;
			
			newMobDiv.style.top = mobPosition.top + "px";
			newMobDiv.style.left = mobPosition.left + "px";
			newMobDiv.style.bottom = mobPosition.bottom + "px";
			newMobDiv.style.right = mobPosition.right + "px";
			
			newMobDiv.style.height = hexPosition.height + "px";
			newMobDiv.style.width = hexPosition.width + "px";
			
			mobs[i].div = newMobDiv;
			
		};
	},
	
	drawHex: function(draw,x,y,size,style) {
		draw.clearRect(0,0,50,50);
		draw.moveTo(x,y-size/2);
		draw.lineTo(x+(0.5 * Math.cos(Math.PI/6) * size),y-(0.5 * Math.sin(Math.PI/6) * size));
		draw.lineTo(x+(0.5 * Math.cos(Math.PI/6) * size),y+(0.5 * Math.sin(Math.PI/6) * size));
		draw.lineTo(x,y+size/2);
		draw.lineTo(x-(0.5 * Math.cos(Math.PI/6) * size),y+(0.5 * Math.sin(Math.PI/6) * size));
		draw.lineTo(x-(0.5 * Math.cos(Math.PI/6) * size),y-(0.5 * Math.sin(Math.PI/6) * size));
		draw.lineTo(x,y-size/2);
		if (style === 'over') {
			draw.strokeStyle = 'lightblue';
			draw.lineWidth = 2;
		} else if (style === 'targetable') {
			draw.strokeStyle = 'red';
			draw.lineWidth = 2;
		} else if (style === 'targetable-over') {
			draw.strokeStyle = 'red';
			draw.lineWidth = 4;
		} else if (style === 'selectable') {
			draw.strokeStyle = 'green';
			draw.lineWidth = 2;
		} else if (style === 'selectable-over') {
			draw.strokeStyle = 'lightgreen';
			draw.lineWidth = 4;
		} else {
			draw.strokeStyle = 'lightblue';
			draw.lineWidth = 0.5;
		};
		draw.stroke();
	},
	
	drawHexRange: function(hexes,style) {
		if (style == undefined) {style = 'selectable';};
		view.focus.range = hexes;
		for (i in hexes) {
			var draw = hexes[i].div.firstChild.getContext('2d');
			var size = document.documentElement.clientWidth * 0.04;
			var x = size / 2;
			var y = size / 2;
			view.drawHex(draw,x,y,size,style);
		};
	},
	
	mouseOverTile: function(x,y,style) {
		var hexDiv = document.getElementById('hex_'+x+'_'+y);
		var draw = hexDiv.firstChild.getContext('2d');
		draw.clearRect(0,0,hexDiv.firstChild.width,hexDiv.firstChild.height);
		
		var withinRange = false;
		for (i in view.focus.range) {
			if (view.focus.range[i].x === x && view.focus.range[i].y === y) {
				withinRange = true;
			};
		};
		if (withinRange && style === 'over' && handlers.mode === 'move') {
			style = 'selectable-over';
		} else if (withinRange && handlers.mode === 'move') {
			style = 'selectable';
		} else if (withinRange && style === 'over' && handlers.mode === 'target') {
			style = 'targetable-over';
		} else if (withinRange && handlers.mode === 'target') {
			style = 'targetable';
		};
		
		var hex = undefined;
		for (i in map.hexes) {
			if (map.hexes[i].x === x && map.hexes[i].y === y) {hex = map.hexes[i]}
		};
		if (hex.type === "open") {
			var size = document.documentElement.clientWidth * 0.04;
			var x = size / 2;
			var y = size / 2;
			view.drawHex(draw,x,y,size,style);
		};
		
	},
	
	selectMob: function(mob) {

		// Clear old selectable hexes
		var oldRange = view.focus.range;
		view.focus.range = [];
		for (i in oldRange) {
			view.mouseOverTile(oldRange[i].x,oldRange[i].y,'left')
		};
	
		view.focus.mob = mob;
		
		// focusMob display
		
		var focusMobDetailsDiv = document.getElementById('focusMobDetailsDiv');
		focusMobDetailsDiv.innerHTML = '';
		
		var focusMobImg = document.getElementById('focusMobImg');
		focusMobImg.src = mob.img;
		
		var focusMobNameHead = document.createElement('h3');
		focusMobNameHead.id = 'focusMobNameHead';
		focusMobNameHead.innerHTML = mob.name;
		focusMobDetailsDiv.appendChild(focusMobNameHead);
				
		var focusMobMoraleBar = document.createElement('div');
		focusMobMoraleBar.id = 'focusMobMoraleBar';
		var focusMobMoralFillBlock = document.createElement('div');
		focusMobMoralFillBlock.id = 'focusMobMoralFillBlock';
		focusMobMoralFillBlock.style.width = mob.stats.morale + "%";
		focusMobDetailsDiv.appendChild(focusMobMoraleBar);
		focusMobMoraleBar.appendChild(focusMobMoralFillBlock);
		
		var focusMobMoraleHead = document.createElement('h4');
		focusMobMoraleHead.innerHTML = "Morale ";
		focusMobMoraleHead.id = 'focusMobMoraleHead';
		focusMobMoralFillBlock.appendChild(focusMobMoraleHead);
		
		var focusMobMovesDiv = document.createElement('div');
		focusMobMovesDiv.id = 'focusMobMoveDiv';
		focusMobMovesDiv.className = 'focusMobStatDiv'; 
		focusMobMovesDiv.innerHTML = "<span class='bigStatSpan'>" + mob.stats.move + "</span> / " +mob.stats.moveMax + "<br /><span class='statNameSpan'>Move</span>";
		focusMobDetailsDiv.appendChild(focusMobMovesDiv);
		
		if (mob.wounds.move.length > 0) {
			var focusMobMovesWoundRule = document.createElement('hr');
			focusMobMovesDiv.appendChild(focusMobMovesWoundRule);
			for (i in mob.wounds.move) {
				var focusMobMovesWoundDiv = document.createElement('div');
				focusMobMovesWoundDiv.className = 'woundDiv';
				focusMobMovesWoundDiv.innerHTML = mob.wounds.move[i].name + " (" + mob.wounds.move[i].penalty + ")";
				focusMobMovesDiv.appendChild(focusMobMovesWoundDiv);
			};
		}
		
		var focusMobStrengthDiv = document.createElement('div');
		focusMobStrengthDiv.id = 'focusMobStrengthDiv';
		focusMobStrengthDiv.className = 'focusMobStatDiv'; 
		focusMobStrengthDiv.innerHTML = "<span class='bigStatSpan'>" + mob.stats.strength + "</span> / " +mob.stats.strengthMax + "<br /><span class='statNameSpan'>Strength</span>";
		focusMobDetailsDiv.appendChild(focusMobStrengthDiv);
		
		if (mob.wounds.strength.length > 0) {
			var focusMobMovesWoundRule = document.createElement('hr');
			focusMobStrengthDiv.appendChild(focusMobMovesWoundRule);
			for (i in mob.wounds.strength) {
				var focusMobMovesWoundDiv = document.createElement('div');
				focusMobMovesWoundDiv.className = 'woundDiv';
				focusMobMovesWoundDiv.innerHTML = mob.wounds.strength[i].name + " (" + mob.wounds.strength[i].penalty + ")";
				focusMobStrengthDiv.appendChild(focusMobMovesWoundDiv);
			};
		}
		
		var focusMobFocusDiv = document.createElement('div');
		focusMobFocusDiv.id = 'focusMobFocusDiv';
		focusMobFocusDiv.className = 'focusMobStatDiv'; 
		focusMobFocusDiv.innerHTML = "<span class='bigStatSpan'>" + mob.stats.focus + "</span> / " +mob.stats.focusMax + "<br /><span class='statNameSpan'>Focus</span>";
		focusMobDetailsDiv.appendChild(focusMobFocusDiv);
		
		if (mob.wounds.focus.length > 0) {
			var focusMobMovesWoundRule = document.createElement('hr');
			focusMobFocusDiv.appendChild(focusMobMovesWoundRule);
			for (i in mob.wounds.focus) {
				var focusMobMovesWoundDiv = document.createElement('div');
				focusMobMovesWoundDiv.className = 'woundDiv';
				focusMobMovesWoundDiv.innerHTML = mob.wounds.focus[i].name + " (" + mob.wounds.focus[i].penalty + ")";
				focusMobFocusDiv.appendChild(focusMobMovesWoundDiv);
			};
		}
		
		if (mob.player) {
			var focusMobManveuversDiv = document.createElement('div');
			focusMobManveuversDiv.id = 'focusMobManveuversDiv';
			focusMobDetailsDiv.appendChild(focusMobManveuversDiv);
		
			var focusMobManeuversList = document.createElement('ol');
			focusMobManeuversList.id = 'focusMobManeuversList';
			focusMobManveuversDiv.appendChild(focusMobManeuversList);
		
			for (i in mob.maneuvers) {
				var focusMobManeuverLi = document.createElement('li');
				focusMobManeuverLi.id = 'focusMobManeuverLi'+i;
				focusMobManeuverLi.innerHTML = mob.maneuvers[i].name;
				focusMobManeuverLi.className = 'focusMobManeuverLi';
				focusMobManeuverLi.setAttribute('onclick','handlers.selectManeuver("'+mob.maneuvers[i].id+'",focusMobManeuverLi'+i+')');
				focusMobManeuversList.appendChild(focusMobManeuverLi);
			};
		
			var moveOptions = view.focus.mob.moveOptions();
			view.drawHexRange(moveOptions,'selectable');
		};
	},
	
	deselectManeuverButton: function(button) {
		button.className = 'focusMobManeuverLi';
	},
	
	deselectAllManeuverButtons: function() {
		for (i in view.focus.mob.maneuvers) {
			document.getElementById('focusMobManeuverLi'+i).className = 'focusMobManeuverLi';
		};
	},
	
	moveMob: function(mob,hex) {
		var destinationHex = document.getElementById('hex_'+hex.x+"_"+hex.y);
		
		var hexPosition = destinationHex.getBoundingClientRect();
		var mapPosition = document.getElementById('mapMobDiv').getBoundingClientRect();
		var mobPosition = {}
		mobPosition.top = hexPosition.top - mapPosition.top;
		mobPosition.left = hexPosition.left - mapPosition.left;
		
		mob.div.style.top = mobPosition.top + "px";
		mob.div.style.left = mobPosition.left + "px";
		
		var oldRange = view.focus.range;
		view.focus.range = [];
		for (i in oldRange) {
			view.mouseOverTile(oldRange[i].x,oldRange[i].y,'left')
		};

	},
	
	tiltMob: function(mob,tilt) {
		mob.div.style.transform= "rotate("+tilt+"deg)";
	},
	
	displayDialogue: function(text,name,bust,bustPosition) {
	
		handlers.hideDialogueDiv();

		if (text !== undefined) {
			document.getElementById('dialogueTextDiv').innerHTML = "<span class='dialogueNameSpan'>"+name+": </span>";
		}
		
		document.getElementById('dialogueTextDiv').innerHTML += text;
		
		var dialogueBustLeftImg = document.getElementById('dialogueBustLeftImg');
		if (bustPosition === "left") {
			dialogueBustLeftImg.style.display = 'block';
			dialogueBustLeftImg.src = bust;
		} else {
			dialogueBustLeftImg.style.display = 'none';
		}
		
		var dialogueBustRightImg = document.getElementById('dialogueBustRightImg');
		if (bustPosition === "right") {
			dialogueBustRightImg.style.display = 'block';
			dialogueBustRightImg.src = bust;
		} else {
			dialogueBustRightImg.style.display = 'none';
		}
		
		handlers.showDialogueDiv();
	},
}