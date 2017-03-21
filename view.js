var view = {

	focus: {
		hex: undefined,
		mob: undefined,
		range: [],
		
	},
	
	clearLevel: function() {
		document.getElementById('mapGridDiv').innerHTML = '';
		document.getElementById('mapMobDiv').innerHTML = '';
	},

	switchToLevelMode: function() {
		document.getElementById('buttonRowDiv').style.display = 'block';
		document.getElementById('focusMobDiv').style.display = 'block';	
		document.getElementById('mapDiv').style.display = 'block';
		document.getElementById('companyHQDiv').style.display = 'none';
		
		document.getElementById('focusMobImg').src = '';
		document.getElementById('focusMobDetailsDiv').innerHTML = '';
	},
	
	switchToHeadquartersMode: function() {
		document.getElementById('buttonRowDiv').style.display = 'none';
		document.getElementById('focusMobDiv').style.display = 'none';	
		document.getElementById('mapDiv').style.display = 'none';
		
		document.getElementById('companyHQDiv').style.display = 'block';
		view.refreshRoster();
	},


	displayMap: function() {
		view.displayMapGrid();
		view.refreshMapMobs();
	},
	
	displayMapBackground: function(level) {
		var mapBackgroundImg = document.getElementById('mapBackgroundImg');
		mapBackgroundImg.src = level.background;
		var totalWidth = level.sizeX * 4 + 2;
		var totalHeight = level.sizeY * 4;
		mapBackgroundImg.style.width = totalWidth + 'vw';
		mapBackgroundImg.style.height = totalHeight + 'vw';
	},
	
	displayFog: function(range) {
		
		if (range == undefined) {range = map.hexes};
		
		for (i in range) {
			var newFogDiv = document.createElement('div');
			document.getElementById('mapMobDiv').appendChild(newFogDiv);
			
			newFogDiv.className = 'fogTile';

			var hexPosition = {};
			hexPosition.left = map.hexes[i].x * 4;
			hexPosition.top = map.hexes[i].y * 4;
			if (map.hexes[i].y % 2 === 0) {
				hexPosition.left += 2;
				newFogDiv.style.backgroundPosition = '2vw 0vw';
			};
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
			newHexCanvas.setAttribute("height","55px");
			newHexCanvas.setAttribute("width","55px");
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
			mobPosition.height = hexPosition.height;
			mobPosition.width = hexPosition.width;
			
			// Translate px to vw
			for (d in mobPosition) {
				mobPosition[d] = mobPosition[d] * (100 / document.documentElement.clientWidth);
			};
			
			newMobDiv.style.top = mobPosition.top + "vw";
			newMobDiv.style.left = mobPosition.left + "vw";
			newMobDiv.style.bottom = mobPosition.bottom + "vw";
			newMobDiv.style.right = mobPosition.right + "vw";
			
			newMobDiv.style.height = mobPosition.height + "vw";
			newMobDiv.style.width = mobPosition.width + "vw";
			
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
		
		view.displayFocusMob();
		
		if (mob.player) {
			var moveOptions = view.focus.mob.moveOptions();
			view.drawHexRange(moveOptions,'selectable');
		};
	},
	
	displayFocusMob: function() {

		if (view.focus.mob !== undefined) {		
			var mob = view.focus.mob;
		
			var focusMobDetailsDiv = document.getElementById('focusMobDetailsDiv');
			focusMobDetailsDiv.innerHTML = '';
		
			var focusMobImg = document.getElementById('focusMobImg');
			focusMobImg.src = mob.img;
		
			var focusMobNameHead = document.createElement('h2');
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
				
				for (i in mob.maneuvers) {
					var focusMobManeuverButton = document.createElement('button');
					focusMobManeuverButton.id = 'focusMobManeuverButton'+i;
					focusMobManeuverButton.className = 'focusMobManeuverButton';
					var num = parseInt(i)+1;
					focusMobManeuverButton.innerHTML = num + '. ' + mob.maneuvers[i].name + ' ';
					
					// add dots for maneuver costs
					for (s in mob.maneuvers[i].cost) {
						for (c=0;c<mob.maneuvers[i].cost[s];c++) {
							focusMobManeuverButton.innerHTML += '<span class='+s+'DotSpan>&#9679;</span>';
						};
					};
					
					focusMobManeuverButton.setAttribute('onclick','handlers.selectManeuver("'+mob.maneuvers[i].id+'",focusMobManeuverButton'+i+')');
					var afford = false;
					for (c in mob.maneuvers[i].cost) {
						if (mob.maneuvers[i].cost[c] > mob.stats[c]) {
							afford = true;
						};
					};
					focusMobManeuverButton.disabled = afford;
					focusMobManveuversDiv.appendChild(focusMobManeuverButton);
				};
			};
		};

	},
	
	deselectManeuverButton: function(button) {
		button.className = 'focusMobManeuverButton';
	},
	
	deselectAllManeuverButtons: function() {
		for (i in view.focus.mob.maneuvers) {
			document.getElementById('focusMobManeuverButton'+i).className = 'focusMobManeuverButton';
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
	
	transformMob: function(mob,distX,distY,rotation,scale) {
		var transformation = '';
		if (distX !== undefined && distY !== undefined) {
			transformation += "translate("+distX+"px, "+distY+"px) ";
		};
		if (rotation !== undefined) {
			transformation += "rotate("+rotation+"deg) ";
		};
		if (scale !== undefined) {
			transformation += "scale("+scale+", "+scale+") ";
		};
		mob.div.style.transform = transformation;
	},
	
	bounceMob: function(mob) {
		view.transformMob(mob,0,-10,10,1);
		var andDown = setTimeout(view.transformMob.bind(this,mob,0,0,0,1),250);
	},
	
	jiggleMob: function(mob) {
		var timedEvent = setTimeout(view.transformMob.bind(this,mob,undefined,undefined,15),1);
		var timedEvent = setTimeout(view.transformMob.bind(this,mob,undefined,undefined,-15),150);
		var timedEvent = setTimeout(view.transformMob.bind(this,mob,undefined,undefined,0),300);	
	},
	
	defeatMob: function(mob) {
		var timedEvent = setTimeout(view.transformMob.bind(this,mob,1,1,90,1),350);
	},
	
	reviveMob: function(mob) {
		view.transformMob(mob,1,1,1,1);
		var timedEvent = setTimeout(view.bounceMob.bind(this,mob),250);
	},
	
	attackAnimate: function(mob,hex) {
		var startCoords = {x:undefined,y:mob.location.y};
		if (mob.location.y % 2 == 0) {
			startCoords.x = mob.location.x + 0.5;
		} else {
			startCoords.x = mob.location.x;
		};
		var destinationCoords = {x:undefined,y:hex.y};
		if (hex.y % 2 == 0) {
			destinationCoords.x = hex.x + 0.5;
		} else {
			destinationCoords.x = hex.x;
		};
		
		var direction = {x:destinationCoords.x-startCoords.x,y:destinationCoords.y-startCoords.y};
		var biggest = Math.max(Math.abs(direction.x),Math.abs(direction.y));
		direction.x *= 20 / biggest;
		direction.y *= 20 / biggest;
		view.transformMob(mob,direction.x,direction.y,0,1);
		
		var andBack = setTimeout(view.transformMob.bind(this,mob,0,0,0,1),250);
	},
	
	beamAnimate: function(start,destination,imgSrc) {
		
		var beamDiv = document.createElement('div');
		beamDiv.className = 'beamDiv';
		document.getElementById('mapMobDiv').appendChild(beamDiv);
		
		var beamImg = document.createElement('img');
		beamImg.className = 'beamImg';
		beamImg.src = imgSrc;
		beamDiv.appendChild(beamImg);
		
		// Positioning Beam Start
		var startHexPosition = document.getElementById('hex_'+start.x+'_'+start.y).getBoundingClientRect();
		var destinationHexPosition = document.getElementById('hex_'+destination.x+'_'+destination.y).getBoundingClientRect();
		var mapPosition = document.getElementById('mapMobDiv').getBoundingClientRect();
		
		var beamPosition = {}
		beamPosition.top = startHexPosition.top - mapPosition.top;
		beamPosition.bottom = startHexPosition.bottom - mapPosition.bottom;
		beamPosition.left = startHexPosition.left - mapPosition.left;
		beamPosition.right = startHexPosition.right - mapPosition.right;
		beamPosition.height = startHexPosition.height;
		beamPosition.width = startHexPosition.width;
		
		// Translate px to vw
		for (d in beamPosition) {
			beamPosition[d] = beamPosition[d] * (100 / document.documentElement.clientWidth);
		};
		
		beamPosition.top += 0.5;
		beamPosition.left += 2;
		
		beamDiv.style.top = beamPosition.top + "vw";
		beamDiv.style.left = beamPosition.left + "vw";
		beamDiv.style.bottom = beamPosition.bottom + "vw";
		beamDiv.style.right = beamPosition.right + "vw";
		
		// Rotation of Beam Div
		var startCoords = {x:start.x,y:start.y}
		var destinationCoords = {x:destination.x,y:destination.y}
		if (startCoords.y % 2 == 0) {startCoords.x += 0.5};
		if (destinationCoords.y % 2 == 0) {destinationCoords.x += 0.5};
		var ratio = (destinationCoords.x - startCoords.x) / (destinationCoords.y - startCoords.y);
		var degrees;
		if (ratio !== Infinity) {
			degrees = Math.atan(ratio) * 180 / Math.PI;
			if (destination.y > start.y) {
				degrees = 90 - degrees;
			} else {
				degrees = 270 - degrees;
			}
		} else {
			degrees = 0;
		};
		
		// Scaling Beam Div
		var length = 4 * Math.pow(Math.pow(destination.x-start.x,2) + Math.pow(destination.y-start.y,2),0.5);
		var srcWidth = 300;
		srcWidth = srcWidth * (100/document.documentElement.clientWidth);
		length = length/srcWidth;
		
		beamDiv.style.transform = 'rotate('+degrees+'deg) scaleX('+length+')';
		
		beamImg.style.transform = 'scaleY(10)';
		
		var timedEvent = setTimeout(view.clearBeam.bind(this,beamDiv),500);
	},
	
	clearBeam: function(div) {
		div.parentNode.removeChild(div);
	},
	
	refreshRoster: function() {
	
		// Hero List
		var rosterList = document.getElementById('rosterList');
		rosterList.innerHTML = '';
		for (h in heroes) {
			var newItem = document.createElement('li');
			newItem.className = 'HQItem rosterItem';
			newItem.innerHTML = heroes[h].name;
			newItem.setAttribute('onclick','handlers.displayHeroInRoster('+h+')');
			rosterList.appendChild(newItem);
		};
		
		if (view.focus.hero == undefined) {view.focus.hero = heroes[0]};
		view.displayHeroInRoster(view.focus.hero);
		
		view.refreshArmory();
		
		// Training
	},
	
	refreshArmory: function() {
		document.getElementById('armoryList').innerHTML = '';
		for (i in company.armory) {
			var newItem = document.createElement('li');
			newItem.className = 'HQItem rosterItem';
			newItem.id = 'armoryItem'+i;
			newItem.innerHTML = company.armory[i].name;
			newItem.addEventListener('mousedown',handlers.pickupItem.bind(this),false);
			document.getElementById('armoryList').appendChild(newItem);
		};
	},
	
	displayHeroInRoster: function(hero) {
		console.log(hero);
		view.focus.hero = hero;
		document.getElementById('rosterPortraitImg').src = hero.img;
		document.getElementById('rosterStatMoveSpan').innerHTML = hero.stats.move;
		document.getElementById('rosterStatStrengthSpan').innerHTML = hero.stats.strength;
		document.getElementById('rosterStatFocusSpan').innerHTML = hero.stats.focus;
		
		document.getElementById('rosterManeuversList').innerHTML = '';
		for (m in hero.maneuvers) {
			var newManeuver = document.createElement('li');
			var num = parseInt(m)+1;
			newManeuver.innerHTML = num + ". " + hero.maneuvers[m].name;
			newManeuver.className = 'focusMobManeuverButton';
			document.getElementById('rosterManeuversList').appendChild(newManeuver);
		};
		
		var emptyString = '<p class="rosterEquipEmpty">Empty</p>';
		document.getElementById('rosterEquipArmorDiv').innerHTML = emptyString;
		document.getElementById('rosterEquipRightDiv').innerHTML = emptyString;
		document.getElementById('rosterEquipLeftDiv').innerHTML = emptyString;
		document.getElementById('rosterEquipItem0Div').innerHTML = emptyString;
		document.getElementById('rosterEquipItem1Div').innerHTML = emptyString;
		document.getElementById('rosterEquipItem2Div').innerHTML = emptyString;
		for (e in hero.equipment) {
			var newItem = document.createElement('div');
			if ( hero.equipment[e] !== undefined) {
				newItem.innerHTML = hero.equipment[e].name;
				if (hero.equipment[e].size === 2) {
					newItem.className = 'HQItem rosterItemWide';
				} else {
					newItem.className = 'HQItem rosterItem';
				};
				newItem.addEventListener('mousedown',handlers.pickupItem.bind(this),false);
				var slot = "rosterEquip" + e.charAt(0).toUpperCase() + e.slice(1) + "Div";
				document.getElementById(slot).innerHTML = '';
				document.getElementById(slot).appendChild(newItem);
			};
		};
	},
	
	focusSlot: function(div) {
		if (view.focus.divBoat !== undefined) {
			view.focus.slot = document.getElementById(div);
			view.focus.slot.style.outline = '2px solid red';
		};
	},
	
	unfocusSlot: function(div) {
		document.getElementById(div).style.outline = '';
		view.focus.slot = undefined;
	},
	
	disableHighlight: function(e) {
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		e.cancelBubble = true;
		e.returnValue = false;
		return false;
	},
	
	refreshRosterDescription: function(type) {
		var rosterDescriptionDiv = document.getElementById('rosterDescriptionDiv');
		rosterDescriptionDiv.innerHTML = '';
		if (type === 'maneuver') {
		} else if (type === 'item') {
			rosterDescriptionDiv.innerHTML += '<h4>'+view.focus.item.name+'</h4>'
			if (view.focus.item.passiveDefense !== undefined) {
				rosterDescriptionDiv.innerHTML += '<p>Provides armor of '+view.focus.item.passiveDefense+'.</p>'
			};
			if (view.focus.item.maneuvers !== undefined) {
				for (i in view.focus.item.maneuvers) {
					rosterDescriptionDiv.innerHTML += '<p>Provides the maneuver '+view.focus.item.maneuvers[i].name+'.</p>'
				};
			};
		} else {
		};
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