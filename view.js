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
		document.getElementById('characterCreationDiv').style.display = 'none';
		
		document.getElementById('focusMobImgDiv').innerHTML = '';
		document.getElementById('focusMobDetailsDiv').innerHTML = '';
	},
	
	switchToHeadquartersMode: function() {
		document.getElementById('buttonRowDiv').style.display = 'none';
		document.getElementById('focusMobDiv').style.display = 'none';	
		document.getElementById('mapDiv').style.display = 'none';
		document.getElementById('characterCreationDiv').style.display = 'none';
		
		document.getElementById('companyHQDiv').style.display = 'block';
		
		view.focus.hero = heroes[0];
		view.refreshNews();
		view.refreshRoster();
		view.refreshProvisioning();
		view.refreshAdventures();
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
			newHexCoords.innerHTML = "(" + map.hexes[i].x + "," + map.hexes[i].y + ")<br>Hex "+i;
			newHexDiv.appendChild(newHexCoords);
			
			map.hexes[i].div = newHexDiv;
		};
	},
	
	refreshMapMobs: function() {
		
// 		document.getElementById('mapMobDiv').innerHTML = '';
		for (i in mobs) {
			if (mobs[i].location !== undefined) {
				var newMobDiv = document.createElement('div');
				newMobDiv.className = 'mobDiv';
				document.getElementById('mapMobDiv').appendChild(newMobDiv);

				newMobDiv.setAttribute("onclick","handlers.mobSelect("+i+")");

				newMobDiv.appendChild(mobs[i].imgMob);
		
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
			draw.strokeStyle = 'rgba(255,255,255,0)';
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
		
		if (mob.player) {
			mob.refreshManeuvers();
		};
		
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
		
			var focusMobImgDiv = document.getElementById('focusMobImgDiv');
			focusMobImgDiv.innerHTML = '';
			focusMobImgDiv.appendChild(mob.imgPortrait);
		
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
		
		document.getElementById('rosterPortraitBackdropDiv').innerHTML = '';
		document.getElementById('rosterPortraitBackdropDiv').appendChild(hero.imgMob);
		
		document.getElementById('rosterStatMoveSpan').innerHTML = hero.stats.move;
		document.getElementById('rosterStatStrengthSpan').innerHTML = hero.stats.strength;
		document.getElementById('rosterStatFocusSpan').innerHTML = hero.stats.focus;
		
		document.getElementById('rosterManeuversList').innerHTML = '';
		for (m in hero.maneuvers) {
			var newManeuver = document.createElement('li');
			var num = parseInt(m)+1;
			newManeuver.innerHTML = num + ". " + hero.maneuvers[m].name;
			newManeuver.className = 'focusMobManeuverButton';
			newManeuver.setAttribute('onclick','handlers.refreshRosterManeuverDescription(dataManeuvers.'+hero.maneuvers[m].id+')');
			document.getElementById('rosterManeuversList').appendChild(newManeuver);
		};
		
		if (hero.equipment) {
			document.getElementById('rosterEquipArmorDiv').style.display = 'block';
			document.getElementById('rosterEquipRightDiv').style.display = 'block';
			document.getElementById('rosterEquipLeftDiv').style.display = 'block';
			document.getElementById('rosterEquipItem0Div').style.display = 'block';
			document.getElementById('rosterEquipItem1Div').style.display = 'block';
			document.getElementById('rosterEquipItem2Div').style.display = 'block';	
			
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
		} else {
			document.getElementById('rosterEquipArmorDiv').style.display = 'none';
			document.getElementById('rosterEquipRightDiv').style.display = 'none';
			document.getElementById('rosterEquipLeftDiv').style.display = 'none';
			document.getElementById('rosterEquipItem0Div').style.display = 'none';
			document.getElementById('rosterEquipItem1Div').style.display = 'none';
			document.getElementById('rosterEquipItem2Div').style.display = 'none';			
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
	
	refreshProvisioning: function() {
		var provisioningList = document.getElementById('provisioningList');
		provisioningList.innerHTML = '';
		for (m in dataMarkets) {
			var newItem = document.createElement('li');
			newItem.innerHTML = dataMarkets[m].name;
			newItem.className = 'HQItem provisioningItem';
			newItem.setAttribute('onclick','view.displayMarket("'+m+'")');
			provisioningList.appendChild(newItem);
		};
	},
	
	displayMarket: function(m) {
		if (m == undefined) {
			var market = view.focus.market;
		} else {
			var market = dataMarkets[m];
			view.focus.market = market;
		};
		
		var provisioningMarketDiv = document.getElementById('provisioningMarketDiv');
		provisioningMarketDiv.innerHTML = '';
		var marketTopDiv = document.createElement('div');
		marketTopDiv.id = 'marketTopDiv';
		provisioningMarketDiv.appendChild(marketTopDiv);
		var marketBottomDiv = document.createElement('div');
		marketBottomDiv.id = 'marketBottomDiv';
		provisioningMarketDiv.appendChild(marketBottomDiv);
		var marketHead = document.createElement('h2');
		marketHead.innerHTML = market.name;
		marketTopDiv.appendChild(marketHead);
		var marketProprietorDiv = document.createElement('div');
		marketProprietorDiv.id = 'marketProprietorDiv';
		var marketProprietorSVG = draw.drawMob(market.proprietor);
		marketProprietorSVG.className = 'mobImg';
		marketProprietorSVG.id = 'marketProprietorSVG';
		marketProprietorDiv.appendChild(marketProprietorSVG);
		marketTopDiv.appendChild(marketProprietorDiv);
		var marketDialogueDiv = document.createElement('div');
		marketDialogueDiv.id = 'marketDialogueDiv';
		marketTopDiv.appendChild(marketDialogueDiv);
		
		var repCheck = true;
		for (i in market.requirements) {
			if (company.reputations[i] == undefined) {company.reputations[i] = 0;};
			if (market.requirements[i] > company.reputations[i]) {
				repCheck = false;
			};
		};
		if (!repCheck) {
			var marketRefusalP = document.createElement('p');
			marketRefusalP.innerHTML = market.refusal;
			marketDialogueDiv.appendChild(marketRefusalP);
			marketDialogueDiv.innerHTML += '<hr />';
			marketDialogueDiv.innerHTML += 'This market requires greater reputation than you currently have.';
			var repList = document.createElement('ul');
			for (i in market.requirements) {
				var newItem = document.createElement('li');
				newItem.innerHTML += i.charAt(0).toUpperCase() + i.slice(1) + ' ( ' + company.reputations[i] + ' / ' + market.requirements[i] + ' )';
				repList.appendChild(newItem);
			};
			marketDialogueDiv.appendChild(repList);
		} else {
			var marketWelcomeP = document.createElement('p');
			marketWelcomeP.innerHTML = market.welcome;
			marketDialogueDiv.appendChild(marketWelcomeP);
			
			var marketMarksP = document.createElement('p');
			marketMarksP.id = 'marketMarksP';
			marketMarksP.innerHTML = company.marks + " marks";
			marketDialogueDiv.appendChild(marketMarksP);
			
			// Wares
			var marketWaresDiv = document.createElement('div');
			marketWaresDiv.id = 'marketWaresDiv';
			marketBottomDiv.appendChild(marketWaresDiv);
			var waresHead = document.createElement('h3');
			waresHead.className = 'rosterHead';
			waresHead.innerHTML = "Wares";
			var waresList = document.createElement('ul');
			waresList.id = 'waresList';
			marketWaresDiv.appendChild(waresHead);
			marketWaresDiv.appendChild(waresList);
			for (i in market.wares) {
				var newItem = document.createElement('li');
				newItem.className = 'HQItem provisioningItem';
				newItem.innerHTML = market.wares[i].name;
				newItem.setAttribute('onclick','handlers.refreshMarketDescription("wares",'+i+')');
				waresList.appendChild(newItem);
			};
			
			// Description
			var marketDescriptionDiv = document.createElement('div');
			marketDescriptionDiv.id = 'marketDescriptionDiv';
			marketDescriptionDiv.className = 'itemDescriptionDiv';
			marketDescriptionDiv.innerHTML = '&nbsp';
			marketBottomDiv.appendChild(marketDescriptionDiv);
			
			// Armory
			var marketStocksDiv = document.createElement('div');
			marketStocksDiv.id = 'marketStocksDiv';
			marketBottomDiv.appendChild(marketStocksDiv);
			var stocksHead = document.createElement('h3');
			stocksHead.className = 'rosterHead';
			stocksHead.innerHTML = "Armory";
			var stocksList = document.createElement('ul');
			stocksList.id = 'stocksList';
			marketStocksDiv.appendChild(stocksHead);
			marketStocksDiv.appendChild(stocksList);
			for (i in company.armory) {
				var newItem = document.createElement('li');
				newItem.className = 'HQItem provisioningItem';
				newItem.innerHTML = company.armory[i].name;
				newItem.setAttribute('onclick','handlers.refreshMarketDescription("stocks",'+i+')');
				stocksList.appendChild(newItem);
			};

		};
	},
	
	refreshAdventures: function() {
		var adventuresSelectList = document.getElementById('adventuresSelectList');
		adventuresSelectList.innerHTML = '';
		for (l in dataLevels) {
			var newItem = document.createElement('li');
			newItem.innerHTML = dataLevels[l].name;
			newItem.className='HQItem adventuresItem';
			newItem.setAttribute('onclick','view.displayAdventureDescription("'+l+'")');
			adventuresSelectList.appendChild(newItem);
		};
		view.displayAdventureDescription('hellhoundCave');
	},
	
	displayAdventureDescription: function(level) {
		l = dataLevels[level];
		var adventuresTextDiv = document.getElementById('adventuresTextDiv');
		adventuresTextDiv.innerHTML = "<h2>"+l.name+"</h2>";
		adventuresTextDiv.innerHTML += l.description;
		var adventuresLoadButton = document.getElementById('adventuresLoadButton');
		adventuresLoadButton.setAttribute('onclick','handlers.loadLevel('+level+')');
		adventuresLoadButton.disabled = false;
	},
	
	refreshNews: function() {
		var newsList = document.getElementById('newsList');
		newsList.innerHTML = '';
		for (n in dataNews) {
			var newItem = document.createElement('li');
			newItem.innerHTML = dataNews[n].name;
			newItem.className = 'HQItem newsItem';
			newItem.setAttribute('onclick','view.displayNewsItem("'+n+'")');
			newsList.appendChild(newItem);
		};
		view.displayNewsItem('newsRevolution');
	},
	
	displayNewsItem: function(n) {
		n = dataNews[n];
		var newsDetailsDiv = document.getElementById('newsDetailsDiv');
		newsDetailsDiv.innerHTML = "<h2>"+n.name+"</h2>";
		newsDetailsDiv.innerHTML += n.text;
	},
	
	refreshRosterDescription: function(type,object) {
		var rosterDescriptionDiv = document.getElementById('rosterDescriptionDiv');
		rosterDescriptionDiv.innerHTML = '';
		if (type === 'maneuver') {
			console.log(object);
			rosterDescriptionDiv.innerHTML += '<h4>'+object.name+'</h4>';
			var costText = '<p class="rosterManeuverCostP">Cost: ';
			for (c in object.cost) {
				costText += object.cost[c] + " " + c + " ";
			};
			costText += '</p>';
			rosterDescriptionDiv.innerHTML += costText;
			rosterDescriptionDiv.innerHTML += '<p>'+object.description+'</p>';
		} else if (type === 'item') {
			var description = view.itemDescription(view.focus.item);
			rosterDescriptionDiv.innerHTML = description;
		} else if (type === 'training') {
		};
	},
	
	refreshMarketDescription: function(type,item) {
		if (item !== undefined) {
			var description = view.itemDescription(item);
			marketDescriptionDiv.innerHTML = description;
		} else {
			marketDescriptionDiv.innerHTML = '';
		};
		if (type === 'wares') {
			var cost = item.value;
			var buyButton = document.createElement('button');
			buyButton.innerHTML = 'Buy '+cost+'m';
			buyButton.setAttribute('onclick','handlers.buyItem(dataItems.'+item.id+','+cost+')');
			marketDescriptionDiv.appendChild(buyButton);
		} else {
			var cost = item.value;
			var sellButton = document.createElement('button');
			sellButton.innerHTML = 'Sell '+cost+'m';
			sellButton.setAttribute('onclick','handlers.sellItem(dataItems.'+item.id+','+cost+')');
			marketDescriptionDiv.appendChild(sellButton);
		};
	},
	
	itemDescription: function(item) {
		var description = '<h4>'+item.name+'</h4>';
		if (item.passiveDefense !== undefined) {
			description += '<p>Provides armor of '+item.passiveDefense+'.</p>'
		};
		if (item.restraint !== undefined) {
			description += '<p>Provides restraints of '+item.restraint+'.</p>'
		};
		if (item.prestige !== undefined) {
			description += '<p>Provides prestige of '+item.prestige+'.</p>'
		};
		if (item.maneuvers !== undefined) {
			for (i in item.maneuvers) {
				var bonus = '';
				if (item.bonus !== undefined && item.bonus[item.maneuvers[i].id] !== undefined) {
					bonus = ' (+'+item.bonus[item.maneuvers[i].id]+')'
				};
				description += '<p>Provides the maneuver '+item.maneuvers[i].name+bonus+'.</p>';
			};
		};		
		return description;
	},
	
	displayDialogue: function(text,name,bust,bustPosition) {
	
		if (bust !== undefined) {
			bust.className = 'bustImg';
		};
	
		handlers.hideDialogueDiv();
		document.getElementById('dialogueReturnButton').style.display = "none";
		document.getElementById('dialogueContinueButton').style.display = "none";
		document.getElementById('dialogueCloseButton').style.display = "inline";
		
		document.getElementById('dialogueTextDiv').innerHTML = '';

		if (name !== undefined) {
			document.getElementById('dialogueTextDiv').innerHTML += "<span class='dialogueNameSpan'>"+name+": </span>";
		}
		
		document.getElementById('dialogueTextDiv').innerHTML += text;
		
		var dialogueBustLeftDiv = document.getElementById('dialogueBustLeftDiv');
		if (bustPosition === "left") {
			dialogueBustLeftDiv.style.display = 'block';
			dialogueBustLeftDiv.innerHTML = '';
			dialogueBustLeftDiv.appendChild(bust);
		} else {
			dialogueBustLeftDiv.style.display = 'none';
		}
		
		var dialogueBustRightDiv = document.getElementById('dialogueBustRightDiv');
		if (bustPosition === "right") {
			dialogueBustRightDiv.style.display = 'block';
			dialogueBustRightDiv.innerHTML = '';
			dialogueBustRightDiv.appendChild(bust);
		} else {
			dialogueBustRightDiv.style.display = 'none';
		}
		
		handlers.showDialogueDiv();
	},
	
	nextEvent: function(event,arg1,arg2,arg3,arg4,arg5) {
		document.getElementById('dialogueCloseButton').style.display = "none";
		document.getElementById('dialogueContinueButton').style.display = "inline";
		
		var onclick = 'map.events.'+event+'(';
		if (arg1 !== undefined) {onclick += arg1}
		if (arg2 !== undefined) {onclick += ",",arg2}
		if (arg3 !== undefined) {onclick += ",",arg3}
		if (arg4 !== undefined) {onclick += ",",arg4}
		if (arg5 !== undefined) {onclick += ",",arg5}
		onclick += ')';
		document.getElementById('dialogueContinueButton').setAttribute('onclick',onclick);

	},
	
	setupReturn: function() {
		document.getElementById('dialogueCloseButton').style.display = "none";
		document.getElementById('dialogueContinueButton').style.display = "none";
		document.getElementById('dialogueReturnButton').style.display = "inline";
	},
	
// 	Character Creation
	setSliders: function() {
		for (i in dataEthnicities.min) {
			var slider = document.getElementById(i+'Input');
			slider.max = dataEthnicities.max[i];
			slider.min = dataEthnicities.min[i];
		};
	},
	
	updateFaceDiv: function(mobSVG) {
		var faceDiv = document.getElementById('faceDiv')
		faceDiv.innerHTML = '';
		faceDiv.appendChild(mobSVG);
	},
	
	enableConfirmButton: function() {
		var name = document.getElementById('nameInput').value;
		var pronouns = document.getElementById('pronounsInput').value;
		if (name !== undefined && name !== '' && pronouns !== 'Pronouns') {
			document.getElementById('characterCreationConfirmButton').disabled = false;
		} else {
			document.getElementById('characterCreationConfirmButton').disabled = true;
		};
	},

}