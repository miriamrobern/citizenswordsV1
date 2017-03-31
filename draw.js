var draw = {

	roughspun: function(mob,bodyConstants) {
		var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
		
		var shirtSVG = draw.simpleOnesie(mob,bodyConstants,['firebrick']);
		svgNodes.appendChild(shirtSVG);
		
		var shortsSVG = draw.simpleShorts(mob,bodyConstants);
		svgNodes.appendChild(shortsSVG);
		
		var beltSVG = draw.simpleBelt(mob,bodyConstants);
		svgNodes.appendChild(beltSVG);
					
		return svgNodes;
	},
	
	scrapArmor: function(mob,bodyConstants) {

		var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
		
		var scrapColors = ['#A0522D','#A05221','#A0452D'];
		
		// Skirt Straps
		var startX;
		var startY; 
		for (i in [0,1,2]) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",scrapColors[i]);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
		
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",scrapColors[2-i]);
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			var startX = 100 - i * mob.faceData.hips/3;
			var startY = bodyConstants.neck + 70 + i * mob.faceData.hips/-3 ;
			
			var path = 'm '+startX+','+startY;
			path += ' l -10,10 l -3,-3 l 8,-12';
			
			var startX = 100 + i * mob.faceData.hips/3;
			
			var otherPath = 'm '+startX+','+startY;
			otherPath += ' l 10,10 l 3,-3 l -8,-12';
			
			newPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(newPath);
			
			otherNewPath.setAttributeNS(null,"d",otherPath);
			svgNodes.appendChild(otherNewPath);

		}
		
		// Shoulder Straps
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",scrapColors[0]);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var x = 100 - mob.faceData.shoulders * 0.9;
		var y = bodyConstants.neck + 3;
		path = 'm '+x+','+y;
		path += 'l 10,-2 l 2,20 l -12,0 z'
		
		newPath.setAttributeNS(null,"d",path);
		svgNodes.appendChild(newPath);
		
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",scrapColors[1]);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var x = 100 + mob.faceData.shoulders * 0.9;
		var y = bodyConstants.neck + 3;
		path = 'm '+x+','+y;
		path += 'l -10,-2 l -2,20 l 12,0 z'
		
		newPath.setAttributeNS(null,"d",path);
		svgNodes.appendChild(newPath);
		
		var scraps = [
			{x:4+mob.faceData.hips,y:15,c1x:mob.faceData.hips/4},
			{x:4+mob.faceData.belly,y:10,c1x:mob.faceData.belly/2},
			{x:4+mob.faceData.shoulders*0.8,y:15,c1x:mob.faceData.bust/2},
			{x:4+mob.faceData.shoulders*0.9,y:10,c1x:mob.faceData.bust/3},
			{x:4+mob.faceData.shoulders,y:0},
		];
		
		var currentY = 50;
		for (i=0;i<scraps.length-1;i++) {
			
			var startY = bodyConstants.neck + currentY + scraps[i].x;
			
			var color = scrapColors[i % 3];
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",color);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			var overstepY = scraps[i].y + scraps[i].x - scraps[i+1].y;
			path = 'm 100,'+startY;
			x = scraps[i].x;
			y = scraps[i].x;
			var c2y = y + scraps[1].c1x;
			path += 'c '+scraps[i].c1x+',0 '+x+',-'+y+' '+x+',-'+y;
			x = scraps[i+1].x - scraps[i].x;
			y = -1 * scraps[i].y;
			if (i < scraps.length-2) {path += 'l '+x+','+y;};
			path += 'l -2,-2';
			x = -1 * scraps[i+1].x - 3;
			y = scraps[i].x + 5;
			if (i === scraps.length-2) {y -= scraps[i].y -1;};
			path += 'l '+x+','+y;
			path += ' z';
			newPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(newPath);
			
			color = scrapColors[(scraps.length-i) % 3];
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",color);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			var overstepY = scraps[i].y + scraps[i].x - scraps[i+1].y;
			path = 'm 100,'+startY;
			x = -1 * scraps[i].x;
			y = scraps[i].x;
			path += 'c -'+scraps[i].c1x+',0 '+x+',-'+y+' '+x+',-'+y;
			x = scraps[i].x - scraps[i+1].x;
			y = -1 * scraps[i].y;
			if (i < scraps.length-2) {path += 'l '+x+','+y;};
			path += 'l 2,-2';
			x = scraps[i+1].x + 3;
			y = scraps[i].x + 5;
			if (i === scraps.length-2) {y -= scraps[i].y -1;};
			path += 'l '+x+','+y;
			path += ' z';
			newPath.setAttributeNS(null,"d",path);
			svgNodes.appendChild(newPath);
			
			currentY -= 15;
		};
		
		return svgNodes;

	},
	
	simpleBelt: function(mob,bodyConstants) {
		
		// Belt
		var beltPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		beltPath.setAttribute("fill",'SaddleBrown');
		beltPath.setAttribute("stroke","#000000");
		beltPath.setAttribute("stroke-width","1");
		beltPath.setAttribute("stroke-linecap","round");
		
		var bellyDip = 0;
		if (mob.faceData.belly > 0) {
			bellyDip = (mob.faceData.belly-15) * 0.5;
		};
		
		// start right top
		x = 100 - mob.faceData.hips;
		y = bodyConstants.neck + 55;
		var path = 'm '+x+','+y;
		
		// go to left top with belly dip
		x = mob.faceData.hips * 2;
		y = 0;
		c1x = 0;
		c1y = bellyDip;
		c2x = x;
		c2y = y+bellyDip;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to left bottom
		x = 0;
		y = 3;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to right bottom with belly dip
		x = mob.faceData.hips * -2;
		y = 0;
		c1x = 0;
		c1y = bellyDip;
		c2x = x;
		c2y = y+bellyDip;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' z';
		beltPath.setAttributeNS(null,"d",path);
		
		return beltPath;
	},
	
	simpleOnesie: function(mob,bodyConstants,color) {
		var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");

		var shirtGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		
		var shirtPath = document.createElementNS('http://www.w3.org/2000/svg',"use");
		shirtPath.setAttribute("fill",color[0]);
		shirtPath.setAttribute("href",'#torso');
		shirtGroup.appendChild(shirtPath);
		
		var rightBreast = document.createElementNS('http://www.w3.org/2000/svg',"use");
		rightBreast.setAttribute("fill",color[0]);
		rightBreast.setAttribute("href",'#rightBreast');
		shirtGroup.appendChild(rightBreast);
		
		var leftBreast = document.createElementNS('http://www.w3.org/2000/svg',"use");
		leftBreast.setAttribute("fill",color[0]);
		leftBreast.setAttribute("href",'#leftBreast');
		shirtGroup.appendChild(leftBreast);
		
		var defs = document.createElementNS('http://www.w3.org/2000/svg',"defs");
		var collarClipPath = document.createElementNS('http://www.w3.org/2000/svg',"clipPath");
		var collarPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		collarClipPath.appendChild(collarPath);
		collarClipPath.id = 'collarClipPath';
		defs.appendChild(collarClipPath);
		svgNodes.appendChild(defs);
		
		// start right top
		x = 100 - mob.faceData.shoulders * 0.5;
		y = bodyConstants.neck;
		var path = 'm '+x+','+y;
		
		// go to left top with dip
		x = mob.faceData.shoulders;
		y = 0;
		c1x = 0;
		c1y = 30;
		c2x = x;
		c2y = y + 30;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		var liningPath = path;
		
		path += 'h100 v100 h-250 v-100 z';
		
		collarPath.setAttributeNS(null,"d",path);
		shirtGroup.setAttribute("clip-path","url(#collarClipPath)");
		svgNodes.appendChild(shirtGroup);
		
		// Bustline
		var bustline = document.createElementNS('http://www.w3.org/2000/svg',"path");
		bustline.setAttribute("fill",color[0]);
		bustline.setAttribute("stroke",'none');
		bustline.setAttribute("stroke-width","1");
		bustline.setAttribute("stroke-linecap","round");
					
		// start right top
		x = 100 - mob.faceData.bust / 2;
		y = bodyConstants.neck + 22;
		var depth = mob.faceData.bust / 2 + 1.5;
		var path = 'm '+x+','+y+' v'+depth+' h'+mob.faceData.bust+' v-'+depth;
		
		bustline.setAttributeNS(null,"d",path);
		svgNodes.appendChild(bustline);
		
		var collarLining = document.createElementNS('http://www.w3.org/2000/svg',"path");
		collarLining.setAttribute("fill",'none');
		collarLining.setAttribute("stroke",'#000000');
		collarLining.setAttribute("stroke-width","1");
		collarLining.setAttribute("stroke-linecap","round");
		collarLining.setAttributeNS(null,"d",liningPath);
		svgNodes.appendChild(collarLining);

		return svgNodes;
	},
	
	simpleRobe: function(mob,bodyConstants,colors) {

		var svgNodes = document.createElementNS('http://www.w3.org/2000/svg',"g");
		
		// Robe Bottom
		var robePath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		robePath.setAttribute("fill",colors[0]);
		robePath.setAttribute("stroke","#000000");
		robePath.setAttribute("stroke-width","1");
		robePath.setAttribute("stroke-linecap","round");
		
		// start right hip
		x = 100 - mob.faceData.hips;
		y = bodyConstants.neck + 53;
		var path = 'm '+x+','+y;
		
		// to right knee
		x = -27 + mob.faceData.hips;
		y = 20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y-3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to fold on top of right foot
		x = 5;
		y = 12;
		c1x = 0;
		c1y = 3;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' l 3,2 l -3,-2';
		
		// to outside of fold
		x = -2;
		y = 4;
		c1x = -3;
		c1y = -2;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to floor
		x = 24;
		y = 7;
		c1x = 0;
		c1y = 0;
		c2x = x - 10;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to top of left foot
		x = 22;
		y = -7;
		c1x = 10;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to left knee
		x = 5;
		y = -16;
		c1x = 0;
		c1y = 3;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to left hip
		x = -27 + mob.faceData.hips;
		y = -18;
		c1x = 0;
		c1y = -3;
		c2x = x;
		c2y = y-10;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		robePath.setAttributeNS(null,"d",path);
		svgNodes.appendChild(robePath);
		
		// Panel
		var panelPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		panelPath.setAttribute("fill",colors[1]);
		panelPath.setAttribute("stroke",colors[2]);
		panelPath.setAttribute("stroke-width","3");
		panelPath.setAttribute("stroke-linecap","round");
		
		// start right top
		x = 92;
		y = bodyConstants.neck;
		var path = 'm '+x+','+y;
		
		// down to bustline
		x = 0 - Math.max(0,mob.faceData.bust / 8);
		y = 24;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y - Math.max(0,mob.faceData.bust / 8);
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// down to belly
		x = 0 + Math.max(0,mob.faceData.bust / 8) - Math.max(0,mob.faceData.belly / 8);
		y = 20;
		c1x = 0;
		c1y = Math.max(0,mob.faceData.bust / 8);
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// down to floor
		x = Math.max(0,mob.faceData.belly / 8) - 2;
		y = 45;
		c1x = 0;
		c1y = 0;
		c2x = x+2;
		c2y = y-2;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// across to left bottom
		x = 20;
		y = 0;
		c1x = 0;
		c1y = 4;
		c2x = x;
		c2y = y+4;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// up to belly
		x = Math.max(0,mob.faceData.belly / 8) - 2;
		y = -45;
		c1x = -2;
		c1y = -2;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// up to bustline
		x = Math.max(0,mob.faceData.bust / 8) - Math.max(0,mob.faceData.belly / 8);
		y = -20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y + Math.max(0,mob.faceData.bust / 8);
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// up to neck
		x = 0 - Math.max(0,mob.faceData.bust / 8);
		y = -25;
		c1x = 0;
		c1y = 0 - Math.max(0,mob.faceData.bust / 8);
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' z';
		panelPath.setAttributeNS(null,"d",path);
		svgNodes.appendChild(panelPath);
		
		var sashSVG = draw.simpleSash(mob,bodyConstants,[colors[1]]);

		svgNodes.appendChild(sashSVG);
					
		return svgNodes;
 	},
 	
 	simpleSash: function(mob,bodyConstants,colors) {
		// Belt
		var beltPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		beltPath.setAttribute("fill",colors[0]);
		beltPath.setAttribute("stroke","#000000");
		beltPath.setAttribute("stroke-width","1");
		beltPath.setAttribute("stroke-linecap","round");
		
		var bellyDip = 0;
		if (mob.faceData.belly > 0) {
			bellyDip = (mob.faceData.belly-15) * 0.7;
		};
		
		// start right top
		x = 98 - mob.faceData.hips;
		y = bodyConstants.neck + 51;
		var path = 'm '+x+','+y;
		
		// go to left top with belly dip
		x = mob.faceData.hips * 2 + 4;
		y = 0;
		c1x = 0;
		c1y = bellyDip;
		c2x = x;
		c2y = y+bellyDip;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to left bottom
		x = 0;
		y = 4;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to right bottom with belly dip
		x = mob.faceData.hips * -2 - 4;
		y = 2;
		c1x = 0;
		c1y = bellyDip;
		c2x = x;
		c2y = y+bellyDip;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' z';
		beltPath.setAttributeNS(null,"d",path);
		
		return beltPath;
		
 	},
	
	simpleShorts: function(mob,bodyConstants) {
		// Shorts
		var shortsPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		shortsPath.setAttribute("fill",'tan');
		shortsPath.setAttribute("stroke","#000000");
		shortsPath.setAttribute("stroke-width","1");
		shortsPath.setAttribute("stroke-linecap","round");
		
		var bellyDip = 0;
		if (mob.faceData.belly > 0) {
			bellyDip = (mob.faceData.belly-15) * 0.5;
		};
		
		// start right top
		x = 100 - mob.faceData.hips;
		y = bodyConstants.neck + 58;
		var path = 'm '+x+','+y;
		
		// go to left top with belly dip
		x = mob.faceData.hips * 2;
		y = 0;
		c1x = 0;
		c1y = bellyDip;
		c2x = x;
		c2y = y+bellyDip;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to outside left knee
		x = 25 - mob.faceData.hips;
		y = 15;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to inside left knee
		x = -10;
		y = 5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to crotch
		x = -15;
		y = -12;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to inside right knee
		x = -15;
		y = 12;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// go to outside right knee
		x = -10;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' z';
		shortsPath.setAttributeNS(null,"d",path);
		
		return shortsPath;
	},
	
	// The Monster
	
	drawMob: function(mob) {

		var face = mob.faceData;
		var eyeline = 33;
		var neck = 90;
		var muzzle = false;
		var noseStroke = false;

		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('viewBox','0 0 200 200');
			
		// Shadow
		var shadow = document.createElementNS('http://www.w3.org/2000/svg',"ellipse");
			shadow.setAttribute("fill",'#000000');
			shadow.setAttribute("opacity",0.2);
			shadow.setAttribute("cx",100);
			shadow.setAttribute("cy",95 + neck);
			shadow.setAttribute("rx",face.shoulders * 1.3);
			shadow.setAttribute("ry",13);
		svg.appendChild(shadow);
		
		// Groups
		var backHairGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		backHairGroup.id = 'backHairGroup';
		backHairGroup.setAttribute("fill",face.hairColor);
		svg.appendChild(backHairGroup);
		
		var bodyAndClothingGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		bodyAndClothingGroup.id = 'bodyGroup';
		bodyAndClothingGroup.setAttribute("fill",face.skinColor);
		svg.appendChild(bodyAndClothingGroup);
		
		var bodyGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		bodyGroup.id = 'bodyGroup';
		bodyGroup.setAttribute("fill",face.skinColor);
		bodyAndClothingGroup.appendChild(bodyGroup);
		
		var rightArmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightArmGroup.id = 'rightArmGroup';
		bodyGroup.appendChild(rightArmGroup);
		
		var leftArmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftArmGroup.id = 'leftArmGroup';
		bodyGroup.appendChild(leftArmGroup);
		
		var clothingGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		clothingGroup.id = 'clothingGroup';
		bodyAndClothingGroup.appendChild(clothingGroup);
		
		var bodyShadingGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		bodyShadingGroup.id = 'bodyShadingGroup';
		bodyGroup.appendChild(bodyShadingGroup);
		
		var headGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		headGroup.id = 'headGroup';
		headGroup.setAttribute("fill",face.skinColor);
		svg.appendChild(headGroup);
		
		var rightArmTopGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightArmTopGroup.id = 'rightArmTopGroup';
		bodyAndClothingGroup.appendChild(rightArmTopGroup);
		
		var leftArmTopGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftArmTopGroup.id = 'leftArmTopGroup';
		bodyAndClothingGroup.appendChild(leftArmTopGroup);
		
		var rightForearmTopGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightForearmTopGroup.id = 'rightForearmTopGroup';
		rightArmTopGroup.appendChild(rightForearmTopGroup);
		
		var leftForearmTopGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftForearmTopGroup.id = 'leftForearmTopGroup';
		leftArmTopGroup.appendChild(leftForearmTopGroup);
		
		var rightHand = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightHand.id = 'rightHand';
		rightForearmTopGroup.appendChild(rightHand);

		var leftHand = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftHand.id = 'leftHand';
		leftHand.setAttributeNS('null','z-index',100);
		leftForearmTopGroup.appendChild(leftHand);
		
		// Hair in Back
		
		if (face.hairLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",'inherit');
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			var templeClearance = face.templePosition / -30 + 7 / 6;

			// start 
			var x = 100;
			var y = 20;
			var path = 'm '+x+','+y;
			
			// to above temple	
			var stepX = (25 + face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = templeClearance * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x = 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to bottom left
			stepX = 0.2 * face.hairLength / (face.hairCurl * 3);
			stepY = (face.hairLength + eyeline) / (face.hairCurl * 3);
			for (i=0;i<face.hairCurl*3;i++) {
				x = stepX + (i % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to center bottom
			stepX = (-25 - face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
			stepY = 0 / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
			};
			
			// to bottom right
			stepX = (-25 - face.templeWidth - 0.2 * face.hairLength) / face.hairCurl;
			stepY = 0 / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			// to above right temple
			stepX = 0.2 * face.hairLength / (face.hairCurl * 3);
			stepY = (face.hairLength + eyeline) / (face.hairCurl * -3);
			for (i=0;i<face.hairCurl*3;i++) {
				x = stepX + ((i+2) % 3) - 1;
				y = stepY;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}

			// to center top
			stepX = (25 + face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y =  -1 * templeClearance * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x - 25/face.hairCurl;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			backHairGroup.appendChild(newPath);
		};
		
		// Body
		
		// Arms
		
		var armWidth = 10;
		var upperArmLength = 30;
		
		rightUpperArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightUpperArmPath.id = 'rightArm';
		rightUpperArmPath.setAttribute("fill",face.skinColor);
		rightUpperArmPath.setAttribute("stroke","#000000");
		rightUpperArmPath.setAttribute("stroke-width","1");
		rightUpperArmPath.setAttribute("stroke-linecap","round");
		
		leftUpperArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftUpperArmPath.id = 'leftArm';
		leftUpperArmPath.setAttribute("fill",face.skinColor);
		leftUpperArmPath.setAttribute("stroke","#000000");
		leftUpperArmPath.setAttribute("stroke-width","1");
		leftUpperArmPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100 - face.shoulders + armWidth * 0.5;
		y = neck + 5;
		var rightShoulderPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			rightShoulderPivot.id = 'rightShoulderPivot';
			rightShoulderPivot.setAttribute("fill","none");
			rightShoulderPivot.setAttribute("stroke",'none');
			rightShoulderPivot.setAttribute("cx",x);
			rightShoulderPivot.setAttribute("cy",y + armWidth * 0.5);
			rightShoulderPivot.setAttribute("r",0);
			rightArmGroup.appendChild(rightShoulderPivot);
		path = 'm '+x+','+y;
		
		x = 100 + face.shoulders - armWidth * 0.5;
		var leftShoulderPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			leftShoulderPivot.id = 'leftShoulderPivot';
			leftShoulderPivot.setAttribute("fill","none");
			leftShoulderPivot.setAttribute("stroke",'none');
			leftShoulderPivot.setAttribute("cx",x);
			leftShoulderPivot.setAttribute("cy",y + armWidth * 0.5);
			leftShoulderPivot.setAttribute("r",0);
			rightArmGroup.appendChild(leftShoulderPivot);
		otherPath = 'm '+x+','+y;

		// to outside shoulder
		x = -0.5 * armWidth;
		y = 0.5 * armWidth;
		c1x = -0.3 * armWidth;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside elbow
		x = 0;
		y = upperArmLength;
		c1x = -5;
		c1y = 10;
		c2x = x+2;
		c2y = y-10;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to elbow end
		x = armWidth * 0.5;
		y = armWidth * 0.5;
		c1x = 0;
		c1y = armWidth * 0.2;
		c2x = x - armWidth * 0.2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside elbow
		x = armWidth * 0.5;
		y = armWidth * -0.5;
		c1x = armWidth * 0.2;
		c1y = 0;
		c2x = x;
		c2y = y + armWidth * 0.2;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside shoulder
		x = 0;
		y = -1 * upperArmLength;
		c1x = 0 - armWidth * 0.2;
		c1y = 0 - armWidth * 0.7;
		c2x = x + armWidth * 0.2;
		c2y = y + armWidth * 0.5;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of shoulder
		x = -0.5 * armWidth;
		y = -0.5 * armWidth;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += ' z';
		rightUpperArmPath.setAttributeNS(null,"d",path);
		rightArmGroup.appendChild(rightUpperArmPath);
	
		otherPath += ' z';
		leftUpperArmPath.setAttributeNS(null,"d",otherPath);
		leftArmGroup.appendChild(leftUpperArmPath);
		
		// Forearms
		
		var rightForearmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		rightForearmGroup.id = 'rightForearmGroup';
		rightArmGroup.appendChild(rightForearmGroup);
		
		var leftForearmGroup = document.createElementNS('http://www.w3.org/2000/svg',"g");
		leftForearmGroup.id = 'leftForearmGroup';
		leftArmGroup.appendChild(leftForearmGroup);
		
		var rightLowerArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightLowerArmPath.id = 'rightForearm';
		rightLowerArmPath.setAttribute("fill",face.skinColor);
		rightLowerArmPath.setAttribute("stroke","#000000");
		rightLowerArmPath.setAttribute("stroke-width","1");
		rightLowerArmPath.setAttribute("stroke-linecap","round");
		
		var leftLowerArmPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftLowerArmPath.id = 'leftForearm';
		leftLowerArmPath.setAttribute("fill",face.skinColor);
		leftLowerArmPath.setAttribute("stroke","#000000");
		leftLowerArmPath.setAttribute("stroke-width","1");
		leftLowerArmPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100 + armWidth * 0.5 - face.shoulders ;
		y = neck + 5 + upperArmLength;
		var rightElbowPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			rightElbowPivot.id = 'rightElbowPivot';
			rightElbowPivot.setAttribute("fill","none");
			rightElbowPivot.setAttribute("stroke",'none');
			rightElbowPivot.setAttribute("cx",x);
			rightElbowPivot.setAttribute("cy",y + armWidth * 0.5);
			rightElbowPivot.setAttribute("r",0);
			rightArmGroup.appendChild(rightElbowPivot);
		var rightWristPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			rightWristPivot.id = 'rightWristPivot';
			rightWristPivot.setAttribute("fill","none");
			rightWristPivot.setAttribute("stroke",'none');
			rightWristPivot.setAttribute("cx",x);
			rightWristPivot.setAttribute("cy",y + armWidth * 0.5 + 20);
			rightWristPivot.setAttribute("r",0);
			rightForearmGroup.appendChild(rightWristPivot);
		path = 'm '+x+','+y;
		
		x = 100 - armWidth * 0.5 + face.shoulders ;
		var leftElbowPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			leftElbowPivot.id = 'leftElbowPivot';
			leftElbowPivot.setAttribute("fill","none");
			leftElbowPivot.setAttribute("stroke",'none');
			leftElbowPivot.setAttribute("cx",x);
			leftElbowPivot.setAttribute("cy",y + armWidth * 0.5);
			leftElbowPivot.setAttribute("r",0);
			rightArmGroup.appendChild(leftElbowPivot);
		var leftWristPivot = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			leftWristPivot.id = 'leftWristPivot';
			leftWristPivot.setAttribute("fill","none");
			leftWristPivot.setAttribute("stroke",'none');
			leftWristPivot.setAttribute("cx",x);
			leftWristPivot.setAttribute("cy",y + armWidth * 0.5 + 20);
			leftWristPivot.setAttribute("r",0);
			leftForearmGroup.appendChild(leftWristPivot);
		otherPath = 'm '+x+','+y;

		// to outside elbow
		x = -0.5 * armWidth;
		y = 0.5 * armWidth;
		c1x = -0.3 * armWidth;
		c1y = -0.2 * armWidth;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside wrist
		x = 0.2 * armWidth;
		y = 20;
		c1x = -0.2 * armWidth;
		c1y = 0.5 * armWidth;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to wrist end
		x = armWidth * 0.3;
		y = armWidth * 0.5;
		c1x = 0;
		c1y = 0;
		c2x = x - 0.2 * armWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside wrist
		x = armWidth * 0.3;
		y = armWidth * -0.5;
		c1x = 0.2 * armWidth;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside elbow
		x = armWidth * 0.2;
		y = -20;
		c1x = 0;
		c1y = 0;
		c2x = x + 0.2 * armWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		rightLowerArmPath.setAttributeNS(null,"d",path);
		rightForearmGroup.appendChild(rightLowerArmPath);
	
		leftLowerArmPath.setAttributeNS(null,"d",otherPath);
		leftForearmGroup.appendChild(leftLowerArmPath);
				
		// Legs
		var rightLegPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightLegPath.id = 'rightLeg';
		rightLegPath.setAttribute("fill",face.skinColor);
		rightLegPath.setAttribute("stroke","#000000");
		rightLegPath.setAttribute("stroke-width","1");
		rightLegPath.setAttribute("stroke-linecap","round");
		
		var leftLegPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftLegPath.id = 'leftLeg';
		leftLegPath.setAttribute("fill",face.skinColor);
		leftLegPath.setAttribute("stroke","#000000");
		leftLegPath.setAttribute("stroke-width","1");
		leftLegPath.setAttribute("stroke-linecap","round");

		// start at crotch (behind body)
		x = 100 ;
		y = neck + 60;
		path = 'm '+x+','+y;
		otherPath = 'm '+x+','+y;

		// to inside right knee
		x = -15;
		y = 17;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right heel
		x = 5;
		y = 18;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside of right tread
		x = -4;
		y = 3;
		c1x = 0;
		c1y = 0;
		c2x = x + 2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside bottom right leg
		x = -5;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top right foot
		x = 0;
		y = -8;
		c1x = 0;
		c1y = -10;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside right knee
		x = -5;
		y = -14;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y+2;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of right leg
		x = 15;
		y = -20;
		c1x = 0;
		c1y = -4;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		rightLegPath.setAttributeNS(null,"d",path);
		bodyGroup.appendChild(rightLegPath);
	
		leftLegPath.setAttributeNS(null,"d",otherPath);
		bodyGroup.appendChild(leftLegPath);
				
		// Feet
		var rightFootPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightFootPath.id = 'rightFootPath';
		rightFootPath.setAttribute("fill",'inherit');
		rightFootPath.setAttribute("stroke","#000000");
		rightFootPath.setAttribute("stroke-width","1");
		rightFootPath.setAttribute("stroke-linecap","round");
		
		var leftFootPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftFootPath.id = 'leftFootPath';
		leftFootPath.setAttribute("fill",'inherit');
		leftFootPath.setAttribute("stroke","#000000");
		leftFootPath.setAttribute("stroke-width","1");
		leftFootPath.setAttribute("stroke-linecap","round");

		// start at crotch (behind body)
		x = 89;
		y = neck + 92;
		path = 'm '+x+','+y;
		x = 111;
		otherPath = 'm '+x+','+y;
		
		// to heel
		x = 2;
		y = 5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to inside of right tread
		x = -4;
		y = 3;
		c1x = 0;
		c1y = 0;
		c2x = x + 2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside bottom right leg
		x = -6 - face.feet;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top right foot
		x = face.feet;
		y = -8;
		c1x = 0;
		c1y = -10;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		if (face.feet < 5) {
			rightFootPath.setAttribute("fill",'#555555');
			leftFootPath.setAttribute("fill",'#666666');
			path += ' z';
			otherPath += ' z';
		};
	
		rightFootPath.setAttributeNS(null,"d",path);
		bodyGroup.appendChild(rightFootPath);
	
		leftFootPath.setAttributeNS(null,"d",otherPath);
		bodyGroup.appendChild(leftFootPath);
		
		// Torso
		
		var torsoPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		torsoPath.id = 'torso';
		torsoPath.setAttribute("fill",'inherit');
		torsoPath.setAttribute("stroke","#000000");
		torsoPath.setAttribute("stroke-width","1");
		torsoPath.setAttribute("stroke-linecap","round");

		// start 
		x = 100;
		y = neck;
		path = 'm '+x+','+y;

		// to right shoulder
		x = 0 - face.shoulders;
		y = 10;
		c1x = -1 * face.shoulders;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right rib
		x = face.shoulders * 0.2;
		y = 20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right belly
		x = face.shoulders * 0.8 - face.belly;
		y = 10;
		c1x = 0;
		c1y = 3;
		c2x = x;
		c2y = y-3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right hip
		x = face.belly - face.hips;
		y = 15;
		c1x = 0;
		c1y = face.belly / 3;
		c2x = x;
		c2y = y - face.hips/3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to butt
		x = face.hips;
		y = 10;
		c1x = 0;
		c1y = 3;
		c2x = x - face.hips;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left hip
		x = face.hips;
		y = -10;
		c1x = face.hips;
		c1y = 0;
		c2x = x;
		c2y = y+3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left belly
		x = face.belly - face.hips;
		y = -15;
		c1x = 0;
		c1y = face.hips/-3;
		c2x = x;
		c2y = y + face.belly / 3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left rib
		x = face.shoulders * 0.8 - face.belly;
		y = -10;
		c1x = 0;
		c1y = -3;
		c2x = x;
		c2y = y+3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left shoulder
		x = face.shoulders - face.shoulders * 0.8;
		y = -20;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// back to start (behind head)
		x = 0 - face.shoulders;
		y = -10;
		c1x = 0;
		c1y = 0;
		c2x = x + face.shoulders;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		torsoPath.setAttributeNS(null,"d",path);
		bodyGroup.appendChild(torsoPath);
		
		// Bust
		var rightBreastPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		rightBreastPath.id = 'rightBreast';
		var leftBreastPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		leftBreastPath.id = 'leftBreast';
		if (face.bust > 10) {
			
			rightBreastPath.setAttribute("fill",'inherit');
			rightBreastPath.setAttribute("stroke","#000000");
			rightBreastPath.setAttribute("stroke-width","1");
			rightBreastPath.setAttribute("stroke-linecap","round");
		
			leftBreastPath.setAttribute("fill",'inherit');
			leftBreastPath.setAttribute("stroke","#000000");
			leftBreastPath.setAttribute("stroke-width","1");
			leftBreastPath.setAttribute("stroke-linecap","round");

			var startX = Math.max(face.bust * 0.5 , face.shoulders * 0.7);

			// start 
			x = 100 - startX;
			y = neck + 10;
			path = 'm '+x+','+y;
		
			x = 100 + startX;
			otherPath = 'm '+x+','+y;

			// to outside of bust (if necessary)
			if (startX-face.bust < 0) {
				x = startX - face.bust;
				y = face.bust * 0.4;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y - face.bust * 0.2;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				x *= -1;
				c1x *= -1;
				c2x *= -1;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				x = 100 - (face.bust + face.shoulders * 0.7)/2;
				y = neck + face.shoulders * 0.55;
				path = 'm '+x+','+y;
				x = 100 + (face.bust + face.shoulders * 0.7)/2;
				otherPath = 'm '+x+','+y;
			};

			// to bottom of bust
			x = face.bust * 0.5;
			y = face.bust * 0.5;
			c1x = 0;
			c1y = face.bust * 0.3;
			c2x = x - face.bust * 0.33;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to inside of bust
			x = face.bust * 0.5;
			y = 0 - face.bust * 0.5;
			c1x = face.bust * 0.33;
			c1y = 0;
			c2x = x;
			c2y = y + face.bust * 0.3;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			rightBreastPath.setAttributeNS(null,"d",path);
			bodyGroup.appendChild(rightBreastPath);
		
			leftBreastPath.setAttributeNS(null,"d",otherPath);
			bodyGroup.appendChild(leftBreastPath);
		};
		
		// Head
			
		// Ear Backs
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.earColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.earColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start 
		x = 80;
		y = 25 + eyeline;
		path = 'm '+x+','+y;
		
		x = 120;
		var otherPath = 'm '+x+','+y;

		// to tip of ear
		x = 0 - face.earSize;
		y = face.earDip;
		c1x = 0 - face.earSize;
		c1y = 0 - face.earSize;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to outside of ear
		x = face.earSize * face.earWidth / -100;
		y = 0 - face.earDip;
		c1x = 0;
		c1y = 0;
		c2x = x - face.earTilt;
		c2y = y-face.earSize/3;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to lobe of ear
		x = (face.earSize - face.earSize * face.earWidth / -100) / 2;
		y = face.earLobe;
		c1x = face.earTilt;
		c1y = face.earSize/3;
		c2x = x-face.earLobe/3;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to base of ear
		x = (face.earSize - face.earSize * face.earWidth / -100) / 2;
		y = 0 - face.earLobe;
		c1x = face.earLobe/3;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
	
		otherPath += 'z';
		otherNewPath.setAttributeNS(null,"d",otherPath);
		headGroup.appendChild(otherNewPath);
	
		// Ear Tops
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start 
		x = 80;
		y = 25 + eyeline;
		path = 'm '+x+','+y;
		
		x = 120;
		var otherPath = 'm '+x+','+y;

		// to tip of ear
		x = 0 - face.earSize;
		y = face.earDip;
		c1x = 0 - face.earSize;
		c1y = 0 - face.earSize;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// back to skull
		x = face.earSize - 5;
		y = 0 - face.earDip + 5;
		c1x = 0;
		c1y = 0;
		c2x = x - face.earSize;
		c2y = y - face.earSize;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
	
		otherPath += 'z';
		otherNewPath.setAttributeNS(null,"d",otherPath);
		headGroup.appendChild(otherNewPath);
	
		// Head Shape
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");

		x = 75;
		y = 25 + eyeline;

		var path = 'm '+x+','+y;

		// to right temple
		x = face.templeWidth * -1;
		y = face.templePosition * -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y+face.templeHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		//to crown
		x = 25+face.templeWidth;
		y = -1 * (33-face.templePosition);
		c1x = 0;
		c1y = -1 * face.templeHeight;
		c2x = x-20;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left temple
		x = 25+face.templeWidth;
		y = 33-face.templePosition;
		c1x = 20;
		c1y = 0;
		c2x = x;
		c2y = y-face.templeHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left eyesocket
		x = -1 * face.templeWidth;
		y = face.templePosition;
		c1x = 0;
		c1y = face.templeHeight;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left cheekbone
		x = face.cheekboneWidth;
		y = face.cheekbonePosition;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y-face.cheekboneHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to chin
		x = -1 * (25 + face.cheekboneWidth);
		y = face.chinHeight-face.cheekbonePosition;
		c1x = 0;
		c1y = face.cheekboneHeight;
		c2x = x+face.chinWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right cheekbone
		x = -1 * (25 + face.cheekboneWidth);
		y = -1 * (face.chinHeight-face.cheekbonePosition);
		c1x = -1 * face.chinWidth;
		c1y = 0;
		c2x = x;
		c2y = y+face.cheekboneHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right eyesocket
		x = face.cheekboneWidth;
		y = -1 * face.cheekbonePosition;
		c1x = 0;
		c1y = -1 * face.cheekboneHeight;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		path += 'z';
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
		
		// Top-of-Head Hair
		if (face.hairLength > 0) {
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","none");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute('fill','none');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start 
			var x = 100;
			var y = 21;
			var path = 'm '+x+','+y;
			
			var totalY = y;
			
			// to right temple
			var stepX = (25 + face.templeWidth) / face.hairCurl;
			var stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = templeClearance * ( 0.03 * Math.pow((stepX * (i+1)),2) - 0.03 * Math.pow((stepX * (i)),2) ) + (i % 3) - 1;
				c1x = 25 / face.hairCurl;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				totalY += y;
			}
			
			x = 100 + 25 + face.templeWidth;
			y = totalY;
			otherPath = 'm '+x+','+y;
						
			// to center bottom of bangs
			stepX = (-25 - face.templeWidth) / face.hairCurl;
			stepY = -1 * (totalY - 25) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
				otherPath += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
				otherPath += ' v-1';
			};
			
			// to left bottom of bangs
			stepX = (-25 - face.templeWidth) / face.hairCurl;
			stepY = (totalY - 25) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}

			stepX = (25 + face.templeWidth) / face.hairCurl;
			stepY = 0;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y =  -1 * templeClearance * ( 0.03 * Math.pow((stepX * (face.hairCurl - i)),2) - 0.03 * Math.pow((stepX * (face.hairCurl - i-1)),2) ) + ((i+1) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x - 25/face.hairCurl;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
		
			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
		};
		
		// Top Hair
		if (face.topHairHeight > face.hairBangsLength / 3) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute('fill',face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
		
			// Start at Right Side
			x = 100 - face.topHairBase;
			y = 35;
			path = 'm '+x+','+y;
						
			// to top right
			stepX = (face.topHairBase - face.topHairWidth) / face.hairCurl;
			stepY = ( -10 - face.topHairHeight ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to middle
			stepX = face.topHairWidth / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to top left
			stepX = face.topHairWidth / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to bottom left
			stepX = ( face.topHairBase - face.topHairWidth ) / face.hairCurl;
			stepY = ( 10 + face.topHairHeight ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + (i % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
						
			// to bottom middle
			stepX = ( face.topHairBase * -1 ) / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			if (face.hairCurl % 3 === 1) {
				path += ' v2';
			} else if (face.hairCurl % 3 === 0) {
				path += ' v-1';
			};
						
			// back to bottom right
			stepX = ( face.topHairBase * -1 ) / face.hairCurl;
			stepY = ( 0 ) / face.hairCurl;
			for (i=0;i<face.hairCurl;i++) {
				x = stepX;
				y = stepY + ((face.hairCurl - i) % 3) - 1;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
		
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
		};
		
		
		// Horns
		if (face.horns > 0) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",face.skinColor);
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start above top of horn
			x = 85;
			y = 37 - face.templePosition * 0.5;
			path = 'm '+x+','+y;
			
			x = 115;
			otherPath = 'm '+x+','+y;

			// out beyond horn base
			x = -8;
			y = 4 + 0.5 * face.horns;
			c1x = -8;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to below horn base
			x = 8;
			y = 4 + 0.5 * face.horns;
			c1x = 0;
			c1y = 0;
			c2x = x-8;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
		
			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
			
			
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",'#eeeebb');
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'#eeeebb');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at top
			x = 80;
			y = 40 - face.templePosition * 0.5;
			path = 'm '+x+','+y;
			
			x = 120;
			otherPath = 'm '+x+','+y;

			// to tip
			x = -5 * face.horns;
			y = -2 * face.horns;
			c1x = 0 - face.horns;
			c1y = 0;
			c2x = x + 0.25 * face.horns * face.horns;
			c2y = y - face.horns;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to base
			x = 5 * face.horns;
			y = 2.5 * face.horns + 5;
			c1x = 0.25 * face.horns * face.horns;
			c1y = 0;
			c2x = x - face.horns;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back to top base
			x = 0;
			y = -0.5 * face.horns - 5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			path += 'z';
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
		
			otherPath += 'z';
			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
		};

		

		// Eyes
		for (i in [0,1]) {
			if (i == 1) {cx = 100-face.eyeDistance} else {cx = 100+face.eyeDistance};
			cy = 25 + eyeline;
			
			// Eyeball
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.id = 'eyeball'+i;
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","2");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",face.eyeSize);
			headGroup.appendChild(newPath);
			
			// Iris
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill",face.eyeColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","0.25");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",3.5);
			headGroup.appendChild(newPath);
			
			// Pupil
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#000000");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx);
			newPath.setAttribute("cy",eyeline+25);
			newPath.setAttribute("r",1.75);
			headGroup.appendChild(newPath);
			
			// Specular Highlight
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx+2.5);
			newPath.setAttribute("cy",eyeline+23);
			newPath.setAttribute("r",1.5);
			headGroup.appendChild(newPath);
			
			// Specular Highlight
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"circle");
			newPath.setAttribute("fill","#FFFFFF");
			newPath.setAttribute("stroke","none");
			newPath.setAttribute("stroke-width","3");
			newPath.setAttribute("cx",cx+1);
			newPath.setAttribute("cy",eyeline+24);
			newPath.setAttribute("r",0.75);
			headGroup.appendChild(newPath);
			
			// Upper Eyelid
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","3");

			var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'none');
			otherNewPath.setAttribute("stroke",'#000000');
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			x = cx;
			y = cy - face.eyeSize - 1;
			path = 'm '+x+','+y;
			
			var strokePath = '';
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath = 'm '+x+','+y;
			}
			
			x = -1 * face.eyeSize;
			y = face.eyeSize;
			c1x = -0.8 * face.eyeSize;
			c1y = 0;
			c2x = -0.8 * face.eyeSize;
			c2y = 0;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			var sX = cx - face.eyeSize;
			var sY = cy - 1;
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				strokePath = 'm '+sX+','+sY
			}
			
			if (i == 0) {
				c1y = -1 * face.insideEyelidCurve * face.eyeSize/10;
				c2y = -1 * face.outsideEyelidCurve * face.eyeSize/10;
			} else {
				c1y = -1 * face.outsideEyelidCurve * face.eyeSize/10;
				c2y = -1 * face.insideEyelidCurve * face.eyeSize/10;
			};
			x = face.eyeSize * 2;
			y = 0;
			c1x = 0.5 * face.eyeSize;
			c2x = 1.5 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = -1 * face.eyeSize;
			y = -1 * face.eyeSize;
			c1x = 0;
			c1y = -0.8 * face.eyeSize;
			c2x = 0;
			c2y = -0.8 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			if (face.eyeDistance + face.eyeSize > 25 && i == 0) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
			
			otherNewPath.setAttributeNS(null,'d',strokePath);
			headGroup.appendChild(otherNewPath);
			
			// Lower Eyelid
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.skinColor);
			newPath.setAttribute("stroke",'none');
			newPath.setAttribute("stroke-width","3");

			var otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",'none');
			otherNewPath.setAttribute("stroke",'#000000');
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			x = cx;
			y = 25 + eyeline + face.eyeSize + 1;
			path = 'm '+x+','+y;
			
			var strokePath = '';
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath = 'm '+x+','+y;
			}
			
			x = -1 * face.eyeSize;
			y = -1 * face.eyeSize;
			c1x = -0.8 * face.eyeSize;
			c1y = 0;
			c2x = -0.8 * face.eyeSize;
			c2y = 0;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			var sX = cx - face.eyeSize;
			var sY = 25 + eyeline + 1;
			if (face.eyeDistance + face.eyeSize > 25 && i == 1) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			} else {
				strokePath = 'm '+sX+','+sY
			}
			
			if (i == 0) {
				c1y = face.lowerEyelidCurve * face.eyeSize/10;
				c2y = face.lowerEyelidCurve * face.eyeSize/10;
			} else {
				c1y = face.lowerEyelidCurve * face.eyeSize/10;
				c2y = face.lowerEyelidCurve * face.eyeSize/10;
			};
			x = face.eyeSize * 2;
			y = 0;
			c1x = 0.5 * face.eyeSize;
			c2x = 1.5 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = -1 * face.eyeSize;
			y = face.eyeSize;
			c1x = 0;
			c1y = 0.8 * face.eyeSize;
			c2x = 0;
			c2y = 0.8 * face.eyeSize;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			if (face.eyeDistance + face.eyeSize > 25 && i == 0) {
				strokePath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			}
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
			
			otherNewPath.setAttributeNS(null,'d',strokePath);
			headGroup.appendChild(otherNewPath);
			
			// Eyebrows
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke",'#000000');
			newPath.setAttribute("stroke-width","1");
			
			var tilt = face.leftBrowTilt;
			if (i == 1) {tilt = face.rightBrowTilt;};
			
			// Start
			x = cx + face.eyeSize;
			y = 25 + eyeline - face.eyeSize;
			if (i == 1) {x = cx - face.eyeSize};
			path = 'm '+x+','+y;

			// in
			x = -2 * face.eyeSize;
			y = face.eyeSize/4;
			c1x = 0;
			c1y = -4;
			c2x = x + face.eyeSize/4;
			c2y = y - tilt;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// up
			x = 0;
			y = -1 * face.browSize;
			c1x = -2;
			c1y = 0;
			c2x = x-2;
			c2y = y;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back
			x = 2 * face.eyeSize;
			y = face.browSize - face.eyeSize/4;
			c1x = face.eyeSize/4;
			c1y = -1 * tilt;
			c2x = x;
			c2y = y-4;
			if (i == 1) {x *= -1; c1x *= -1; c2x *= -1;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
									
		};
		
		// Muzzle
		
		if (face.noseHeight > 60) {
		
			muzzle = true;
			
			var newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.noseColor);
			newPath.setAttribute("stroke",'#000000');
			newPath.setAttribute("stroke-width","1");
			
			// Start under right nose
			var muzzleWidth = Math.max(face.noseWidth * 2,face.mouthWidth * 1.5);
			x = 100 - muzzleWidth;
			y = 22 + eyeline + face.noseHeight * face.chinHeight / 100;
			var muzzleLength = Math.max((25 + eyeline + face.chinHeight) - y,20);

			path = 'm '+x+','+y;

			// to muzzle chin
			x = muzzleWidth;
			y = muzzleLength;
			c1x = 0;
			c1y = muzzleLength;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back under nose
			x = muzzleWidth;
			y = -1 * muzzleLength;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y+muzzleLength;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to top of muzzle
			x = -1 * muzzleWidth;
			y = -2 * face.nostrilHeight;
			c1x = 0;
			c1y = muzzleLength * -0.25;
			c2x = x + muzzleWidth * 0.5;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// back to under right nose
			x = -1 * muzzleWidth;
			y = 2 * face.nostrilHeight;
			c1x = muzzleWidth * -0.5;
			c1y = 0;
			c2x = x;
			c2y = y - muzzleLength * 0.25;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			path += 'z';
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);			
		};
		
		// Top Half of Mouth (renders before/under nose)
		
		// Teeth Backdrop
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		if (face.teeth > 0) {
			newPath.setAttribute('fill','#FFFFFF');
		} else {
			newPath.setAttribute('fill','#000000');
		};
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to top of smile / bottom of top lip
		x = face.mouthWidth;
		y = face.smile;
		c1x = 0;
		c1y = 0;
		c2x = x-face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth;
		y = -1 * face.smile;
		c1x = face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile+face.mouthOpen;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen);
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
		
		// Top Lip
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute('fill',face.lipColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to right top of cupid's bow
		x = face.mouthWidth * 0.8;
		y = face.smile-face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x-face.lipSize;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom of cupid's bow
		x = face.mouthWidth * 0.2;
		y = 0.5 * face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left top of cupid's bow
		x = face.mouthWidth * 0.2;
		y = -0.5 * face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth * 0.8;
		y = -1 * (face.smile - face.lipSize);
		c1x = face.lipSize;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * face.smile;
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
		
		// Nose
		
		// Nose Bump
		if (face.noseBump > 0) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.noseColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100 + face.nostrilHeight * 0.5;
			y -= face.nostrilHeight * 2;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 2;
			y = 0;
			c1x = 0;
			c1y = -1 * face.noseBump * face.noseHeight / 25;
			c2x = x;
			c2y = y - face.noseBump * face.noseHeight / 25;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);		
			
		};
		
		// Nose Background
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.noseColor);
		
		if (face.noseHeight*face.chinHeight/100 - face.nostrilHeight*2 - face.eyeSize > 0 && !muzzle) {
			newPath.setAttribute("stroke","none");
		} else {
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			noseStroke = true;
		};

		// start at right inside nostril
		x = 100 - face.noseWidth * 1.2;
		y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to right top nose crease
		x = -0.1 * face.noseWidth;
		y = -1.8 * face.nostrilHeight;
		c1x = -1 * face.noseWidth;
		c1y = 0;
		c2x = x - face.noseWidth * 0.2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left top nose crease
		x = 2.6 * face.noseWidth;
		y = 0;
		c1x = 0;
		c1y = -0.5 * face.nostrilHeight;
		c2x = x;
		c2y = -0.5 * face.nostrilHeight;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		newPath.setAttributeNS(null,"d",path);
		svg.appendChild(newPath);	

		// to left bottom nose crease
		x = 0;
		y = 1.8 * face.nostrilHeight;
		c1x = face.noseWidth * 0.2;
		c1y = 0;
		c2x = x + face.noseWidth;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
	
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);	
		
		// Nostrils
		
		var nostrilShadow = 0.1 * ( face.nostrilHeight - 2 )
		
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill","rgba(0,0,0,"+nostrilShadow+")");
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill","rgba(0,0,0,"+nostrilShadow+")");
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at right inside nostril
		x = 100 - face.noseWidth * 0.8;
		y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// start at left inside nostril
		x = 100 + face.noseWidth * 0.8;
		var otherPath = 'm '+x+','+y;

		// to right outside nostril
		x = -1 * face.noseWidth * 0.4;
		y = -1 * face.nostrilHeight/2;
		c1x = -1 * face.noseWidth * 0.2;
		c1y = -1 * face.nostrilHeight * 0.25;
		c2x = x;
		c2y = y + face.nostrilHeight * 0.25;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top of right nostril
		x = face.noseWidth * 0.6;
		y = -1 * face.nostrilHeight/2;
		c1x = 0;
		c1y = face.nostrilHeight * -0.25;
		c2x = x-face.noseWidth * 0.2;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right septum
		x = face.noseWidth * 0.4;
		y = face.nostrilHeight;
		c1x = face.noseWidth * 0.2;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);		
		
		otherNewPath.setAttributeNS(null,"d",otherPath);
		headGroup.appendChild(otherNewPath);
		
		// Bottom of Septum
		if (face.noseSize > 1) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth * 0.2;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 0.4;
			y = 0;
			c1x = face.noseWidth * 0.2;
			c1y = face.nostrilHeight * 0.2;
			c2x = x - face.noseWidth * 0.2;
			c2y = face.nostrilHeight * 0.2;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);		
			
		};
		
		// Top of Nose Crease
		if (face.noseSize > 2 && !noseStroke) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill","none");
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at midpoint of right nose crease
			x = 100 - face.noseWidth * 1.6;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight;
			path = 'm '+x+','+y;

			// start at midpoint of right nose crease
			x = 100 + face.noseWidth * 1.6;
			var otherPath = 'm '+x+','+y;

			// to top of nose crease
			x = face.noseWidth * 0.2;
			y = -1 * face.nostrilHeight/2;
			c1x = face.noseWidth * 0.1;
			c1y = face.nostrilHeight * -0.4;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
			
		};
		
		// Bottom of Nose Crease
		if (face.noseSize > 3 && !noseStroke) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill","none");
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at midpoint of right nose crease
			x = 100 - face.noseWidth * 1.6;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight;
			path = 'm '+x+','+y;

			// start at midpoint of left nose crease
			x = 100 + face.noseWidth * 1.6;
			var otherPath = 'm '+x+','+y;

			// to bottom of nose crease
			x = face.noseWidth * 0.4;
			y = face.nostrilHeight * 1.2;
			c1x = -0.4 * face.noseWidth;
			c1y = face.nostrilHeight;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
			
		};
		
		// Top of Nose Point
		if (face.noseSize > 4) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill","none");
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");

			// start at right side
			x = 100 - face.noseWidth * 0.2;
			y = 25 + eyeline + face.noseHeight * face.chinHeight / 100;
			y -= face.nostrilHeight * 2;
			path = 'm '+x+','+y;
			
			// to left side
			x = face.noseWidth * 0.4;
			y = 0;
			c1x = face.noseWidth * 0.2;
			c1y = face.nostrilHeight * -0.2;
			c2x = x - face.noseWidth * 0.2;
			c2y = face.nostrilHeight * -0.2;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;			
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);		
			
		};
		
		// Tusks
		if ((face.teeth > 0 && face.leftTusk > 0) || (face.teeth > 0 && face.rightTusk > 0)) {
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute('fill','#f5f7bb');
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute('fill','#f5f7bb');
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");
			
			var tuskSize = face.teeth;
		
			// Start at Right Side
			x = 100 - face.mouthWidth * 0.8;
			y = 25.5 + eyeline - face.smile * 0.6 + (100 + face.noseHeight)/2 * face.chinHeight / 100;
			path = 'm '+x+','+y;
			
			x = 100 + face.mouthWidth * 0.8;
			otherPath = 'm '+x+','+y;

			// to top of tusk
			x = -1 * tuskSize;
			y = -5 * tuskSize;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y + tuskSize * 3;
			if (face.leftTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.5;c1y *= 0.5;c2y *= 0.5;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			if (face.leftTusk === 2) {x *= 2;c1x *= 2;c2x *= 2;y *= 2;c1y *= 2;c2y *= 2;};
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.5;c1y *= 0.5;c2y *= 0.5;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// blunted end
			x = 2;
			y = -1;
			c1x = 0;
			c1y = -2;
			c2x = x;
			c2y = y;
			if (face.leftTusk === 2) {x = face.mouthWidth * 0.3;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x = -2;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x = face.mouthWidth * -0.3;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

			// to bottom of tusk
			x = tuskSize + face.mouthWidth * 0.4;
			y = 5 * tuskSize + (face.smile + face.mouthOpen) * 0.6;
			c1x = 0;
			c1y = tuskSize * 2;
			c2x = x;
			c2y = y;
			if (face.leftTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.6;c1y *= 0.5;c2y *= 0.5;};
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			if (face.leftTusk === 2) {x *= 2;c1x *= 2;c2x *= 2;y /= 0.6;c1y *= 2;c2y *= 2;};
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			if (face.rightTusk === 2) {x *= 0.5;c1x *= 0.5;c2x *= 0.5;y *= 0.6;c1y *= 0.5;c2y *= 0.5;};
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
			newPath.setAttributeNS(null,"d",path);
			otherNewPath.setAttributeNS(null,"d",otherPath);
			
			if (face.leftTusk > 0) {
				headGroup.appendChild(newPath);
			};
			if (face.rightTusk > 0) {
				headGroup.appendChild(otherNewPath);
			};
		};
		
		// Bottom Lip
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute('fill',face.lipColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		// Start at Right Side
		x = 100 - face.mouthWidth;
		y = 25 + eyeline - face.smile + (100 + face.noseHeight)/2 * face.chinHeight / 100;
		path = 'm '+x+','+y;

		// to top of bottom lip
		x = face.mouthWidth;
		y = face.smile+face.mouthOpen;
		c1x = 0;
		c1y = 0;
		c2x = x-face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to left
		x = face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen);
		c1x = face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to middle bottom
		x = -1 * face.mouthWidth;
		y = face.smile+face.mouthOpen+face.lipSize;
		c1x = 0;
		c1y = 0;
		c2x = x+face.mouthWidth * 0.5;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to right side
		x = -1 * face.mouthWidth;
		y = -1 * (face.smile+face.mouthOpen+face.lipSize);
		c1x = -1 * face.mouthWidth * 0.5;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		newPath.setAttributeNS(null,"d",path);
		headGroup.appendChild(newPath);
		
		
		
		// Bangs
		if (face.hairBangsLength > face.topHairHeight * 3 && face.hairLength > 0) {
		
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke",'none');
			
			path = 'm '+100+','+20;
			
			x = -23 - face.templeWidth;
			y = totalY - 21;
			c1x = -2;
			c1y = 0;
			c2x = x;
			c2y = y-face.templeWidth;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			x = 23 + face.templeWidth + face.hairPart;
			y = 0 - face.templeHeight;
			path += 'l '+x+","+y
			
			x = 23 +  face.templeWidth - face.hairPart;
			y = face.templeHeight;
			path += 'l '+x+","+y
			
			x = -23 - face.templeWidth;
			y = 21 - totalY;
			c1x = 0;
			c1y = 0 - face.templeWidth;
			c2x = x+2;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);
			
			newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			newPath.setAttribute("fill",face.hairColor);
			newPath.setAttribute("stroke","#000000");
			newPath.setAttribute("stroke-width","1");
			newPath.setAttribute("stroke-linecap","round");
			
			otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
			otherNewPath.setAttribute("fill",face.hairColor);
			otherNewPath.setAttribute("stroke","#000000");
			otherNewPath.setAttribute("stroke-width","1");
			otherNewPath.setAttribute("stroke-linecap","round");

			// start at top of part
			x = 100 + face.hairPart;
			y = totalY - 2 - face.templeHeight;
			path = 'm '+x+','+y;
			otherPath = 'm '+x+','+y;

			var rightBangs = Math.round(face.hairBangs * (face.hairPart+10)/20);
			var leftBangs = face.hairBangs - rightBangs;
			
			for (i=0;i<Math.max(rightBangs,leftBangs);i++) {

				// bang bang bang!
				x = (-23 - 1.5 * face.templeWidth - face.hairPart) / rightBangs;
				y = (face.hairBangsLength + face.templeHeight) / rightBangs;
				c1x = 0 - face.hairSweep;
				c1y = face.hairBangsLength;
				c2x = x - face.hairSweep;
				c2y = y+face.hairBangsLength;
				if (i < rightBangs) {path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;};
				x = (23 + 1.5 * face.templeWidth - face.hairPart) / leftBangs;
				y = (face.hairBangsLength + face.templeHeight) / leftBangs;
				c1x *= -1;
				c2x = x;
				c2y = y+face.hairBangsLength;
				if (i < leftBangs) {otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;};
			};
			
			if (rightBangs === 0) {
				// Asymmetrical Shave
				x = -24 - 1.5 * face.templeWidth - face.hairPart;
				y = face.hairBangsLength + face.templeHeight;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			};
			
			if (leftBangs === 0) {
				// Asymmetrical Shave
				x = 24 + 1.5 * face.templeWidth - face.hairPart;
				y = face.hairBangsLength + face.templeHeight;
				c1x = 0;
				c1y = 0;
				c2x = x;
				c2y = y;
				otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			};
			
			// up above hairline
			x = 0;
			y = -1 * face.hairBangsLength - 1;
			c1x = 0;
			c1y = 0;
			c2x = x - face.templeWidth;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
			newPath.setAttributeNS(null,"d",path);
			headGroup.appendChild(newPath);

			otherNewPath.setAttributeNS(null,"d",otherPath);
			headGroup.appendChild(otherNewPath);
			
			
		};
		
		// Hands
		
		// Thumbs
				
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at bottom of thumb
		x = 100 + armWidth * 0.5 - face.shoulders;
		y = neck + 5 + upperArmLength + 20;
		path = 'm '+x+','+y;

		x = 100 - armWidth * 0.5 + face.shoulders;
		otherPath = 'm '+x+','+y;

		// to top of thumb
		x = 10;
		y = -4;
		c1x = 0;
		c1y = 0;
		c2x = x-1;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to bottom of first knuckle
		x = 5;
		y = 3;
		c1x = 1;
		c1y = 0;
		c2x = x;
		c2y = y-1;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to tip of thumb
		x = 0;
		y = 10;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to pad of thumb
		x = -5;
		y = -2;
		c1x = -3;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
		newPath.setAttributeNS(null,"d",path);
		rightHand.appendChild(newPath);

		otherNewPath.setAttributeNS(null,"d",otherPath);
		leftHand.appendChild(otherNewPath);
		
		// Items Here?
		
		// Fist Fronts
				
		newPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		newPath.setAttribute("fill",face.skinColor);
		newPath.setAttribute("stroke","#000000");
		newPath.setAttribute("stroke-width","1");
		newPath.setAttribute("stroke-linecap","round");
		
		otherNewPath = document.createElementNS('http://www.w3.org/2000/svg',"path");
		otherNewPath.setAttribute("fill",face.skinColor);
		otherNewPath.setAttribute("stroke","#000000");
		otherNewPath.setAttribute("stroke-width","1");
		otherNewPath.setAttribute("stroke-linecap","round");

		// start at bottom of thumb
		x = 100 + armWidth * 0.5 - face.shoulders;
		y = neck + 5 + upperArmLength + 20;
		path = 'm '+x+','+y;

		x = 100 - armWidth * 0.5 + face.shoulders;
		otherPath = 'm '+x+','+y;

		// to top outside of fist
		x = -9;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		// to bottom outside of fist
		for (i=0;i<4;i++) {
			// dip out for knuckle
			x = -1;
			y = 1;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			// down a finger
			x = 0;
			y = 5;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			// dip in for knuckle
			x = 1;
			y = 1;
			c1x = 0;
			c1y = 0;
			c2x = x;
			c2y = y;
			path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			x *= -1;
			c1x *= -1;
			c2x *= -1;
			otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		}

		// to bottom inside of fist
		x = 16;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// Pinky Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -8 h 9';
		otherPath += ' h 8 h -9';

		// Ring Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -9 h 10';
		otherPath += ' h 9 h -10';

		// Middle Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		
		path += ' h -10 h 9';
		otherPath += ' h 10 h -9';

		// Index Finger
		// bottom corner
		x = 1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// up a finger
		x = 0;
		y = -5;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// top corner
		x = -1;
		y = -1;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to top  of fist
		x = -9;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;

		// to
		x = 0;
		y = 0;
		c1x = 0;
		c1y = 0;
		c2x = x;
		c2y = y;
		path += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
		x *= -1;
		c1x *= -1;
		c2x *= -1;
		otherPath += ' c '+c1x+','+c1y+' '+c2x+','+c2y+' '+x+','+y;
			
		newPath.setAttributeNS(null,"d",path);
		rightHand.appendChild(newPath);

		otherNewPath.setAttributeNS(null,"d",otherPath);
		leftHand.appendChild(otherNewPath);
				
		// Clothing & Equipment
		var armor = mob.equipment.armor
		
		var armorColoring = armor.simpleColoring;
		
		if (armorColoring !== undefined) {
			if (armorColoring.torso !== undefined) {
				if (armorColoring.torso.fill !== undefined) {
					torsoPath.setAttribute("fill",armorColoring.torso.fill);
					rightBreastPath.setAttribute("fill",armorColoring.torso.fill);
					leftBreastPath.setAttribute("fill",armorColoring.torso.fill);
		// 			belly.setAttribute("fill",armorColoring.torso.fill);
				};
				if (armorColoring.torso.stroke !== undefined) {
					torsoPath.setAttribute("stroke",armorColoring.torso.stroke);
					rightBreastPath.setAttribute("stroke",armorColoring.torso.stroke);
					leftBreastPath.setAttribute("stroke",armorColoring.torso.stroke);
		// 			belly.setAttribute("stroke",armorColoring.torso.stroke);
				};
			};
		
			if (armorColoring.bust !== undefined) {
				if (armorColoring.bust.fill !== undefined) {
					rightBreastPath.setAttribute("fill",armorColoring.bust.fill);
					leftBreastPath.setAttribute("fill",armorColoring.bust.fill);
				};
				if (armorColoring.bust.stroke !== undefined) {
					rightBreastPath.setAttribute("stroke",armorColoring.bust.stroke);
					leftBreastPath.setAttribute("stroke",armorColoring.bust.stroke);
				};
			};
		
			if (armorColoring.upperArms !== undefined) {
				if (armorColoring.upperArms.fill !== undefined) {
					rightUpperArmPath.setAttribute("fill",armorColoring.upperArms.fill);
					leftUpperArmPath.setAttribute("fill",armorColoring.upperArms.fill);
				};
				if (armorColoring.upperArms.stroke !== undefined) {
					rightUpperArmPath.setAttribute("stroke",armorColoring.upperArms.stroke);
					leftUpperArmPath.setAttribute("stroke",armorColoring.upperArms.stroke);
				};
			};
		
			if (armorColoring.lowerArms !== undefined) {
				if (armorColoring.lowerArms.fill !== undefined) {
					rightLowerArmPath.setAttribute("fill",armorColoring.lowerArms.fill);
					leftLowerArmPath.setAttribute("fill",armorColoring.lowerArms.fill);
				};
				if (armorColoring.lowerArms.stroke !== undefined) {
					rightLowerArmPath.setAttribute("stroke",armorColoring.lowerArms.stroke);
					leftLowerArmPath.setAttribute("stroke",armorColoring.lowerArms.stroke);
				};
			};
		
			if (armorColoring.legs !== undefined) {
				if (armorColoring.legs.fill !== undefined) {
					rightLegPath.setAttribute("fill",armorColoring.legs.fill);
					leftLegPath.setAttribute("fill",armorColoring.legs.fill);
				};
				if (armorColoring.legs.stroke !== undefined) {
					rightLegPath.setAttribute("stroke",armorColoring.legs.stroke);
					leftLegPath.setAttribute("stroke",armorColoring.legs.stroke);
				};
			};
		
			if (armorColoring.feet !== undefined && face.feet >= 5) {
				if (armorColoring.feet.fill !== undefined) {
					rightFootPath.setAttribute("fill",armorColoring.feet.fill);
					leftFootPath.setAttribute("fill",armorColoring.feet.fill);
				};
				if (armorColoring.feet.stroke !== undefined) {
					rightFootPath.setAttribute("stroke",armorColoring.feet.stroke);
					leftFootPath.setAttribute("stroke",armorColoring.feet.stroke);
				};
			};
		};
		
		if (armor.svgNodes !== undefined) {
			var armorSVGNodes = armor.svgNodes(mob,{eyeline:eyeline,neck:neck});
			clothingGroup.appendChild(armorSVGNodes);
		};
		
		// Animation		

		// Initial Pose
		rightArmGroup.setAttributeNS(null,'transform','translate(0) rotate(30 '+rightShoulderPivot.cx.animVal.value+' '+rightShoulderPivot.cy.animVal.value+')');
		rightArmTopGroup.setAttributeNS(null,'transform','translate(0) rotate(30 '+rightShoulderPivot.cx.animVal.value+' '+rightShoulderPivot.cy.animVal.value+')');

		leftArmGroup.setAttributeNS(null,'transform','translate(0) rotate(-30 '+leftShoulderPivot.cx.animVal.value+' '+leftShoulderPivot.cy.animVal.value+')');
		leftArmTopGroup.setAttributeNS(null,'transform','translate(0) rotate(-30 '+leftShoulderPivot.cx.animVal.value+' '+leftShoulderPivot.cy.animVal.value+')');

		rightForearmGroup.setAttributeNS(null,'transform','rotate(-50 '+rightElbowPivot.cx.animVal.value+' '+rightElbowPivot.cy.animVal.value+')');
		rightForearmTopGroup.setAttributeNS(null,'transform','rotate(-50 '+rightElbowPivot.cx.animVal.value+' '+rightElbowPivot.cy.animVal.value+')');

		leftForearmGroup.setAttributeNS(null,'transform','rotate(50 '+leftElbowPivot.cx.animVal.value+' '+leftElbowPivot.cy.animVal.value+')');
		leftForearmTopGroup.setAttributeNS(null,'transform','rotate(50 '+leftElbowPivot.cx.animVal.value+' '+leftElbowPivot.cy.animVal.value+')');
		
		// Test Loop
// 		var animationLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		var animationTopLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		var animationData = [
// 			{attribute:'attributeName',value:'transform'},
// 			{attribute:'attributeType',value:'xml'},
// 			{attribute:'type',value:'rotate'},
// 			{attribute:'from',value:'25 '+rightShoulderPivot.cx.animVal.value+" "+rightShoulderPivot.cy.animVal.value},
// 			{attribute:'to',value:'35 '+rightShoulderPivot.cx.animVal.value+" "+rightShoulderPivot.cy.animVal.value},
// 			{attribute:'dur',value:'1s'},
// 			{attribute:'begin',value:'0s;inAnimation.end'},
// 			];
// 		for (i in animationData) {
// 			animationLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 			animationTopLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 		};
// 		animationLoop.id = 'outAnimation';
// 		rightArmGroup.appendChild(animationLoop);
// 		rightArmTopGroup.appendChild(animationTopLoop);
// 		
// 		animationLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationTopLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationData = [
// 			{attribute:'attributeName',value:'transform'},
// 			{attribute:'attributeType',value:'xml'},
// 			{attribute:'type',value:'rotate'},
// 			{attribute:'from',value:'35 '+rightShoulderPivot.cx.animVal.value+" "+rightShoulderPivot.cy.animVal.value},
// 			{attribute:'to',value:'25 '+rightShoulderPivot.cx.animVal.value+" "+rightShoulderPivot.cy.animVal.value},
// 			{attribute:'dur',value:'1s'},
// 			{attribute:'begin',value:'outAnimation.end'},
// 			];
// 		for (i in animationData) {
// 			animationLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 			animationTopLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 		};
// 		animationLoop.id = 'inAnimation';
// 		rightArmGroup.appendChild(animationLoop);
// 		rightArmTopGroup.appendChild(animationTopLoop);
// 		
// 		animationLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationTopLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationData = [
// 			{attribute:'attributeName',value:'transform'},
// 			{attribute:'attributeType',value:'xml'},
// 			{attribute:'type',value:'rotate'},
// 			{attribute:'from',value:'-45 '+rightElbowPivot.cx.animVal.value+" "+rightElbowPivot.cy.animVal.value},
// 			{attribute:'to',value:'-65 '+rightElbowPivot.cx.animVal.value+" "+rightElbowPivot.cy.animVal.value},
// 			{attribute:'dur',value:'1s'},
// 			{attribute:'begin',value:'0s;inAnimationForearm.end'},
// 			];
// 		for (i in animationData) {
// 			animationLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 			animationTopLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 		};
// 		animationLoop.id = 'outAnimationForearm';
// 		rightForearmGroup.appendChild(animationLoop);
// 		rightForearmTopGroup.appendChild(animationTopLoop);
// 		
// 		animationLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationTopLoop = document.createElementNS('http://www.w3.org/2000/svg',"animateTransform");
// 		animationData = [
// 			{attribute:'attributeName',value:'transform'},
// 			{attribute:'attributeType',value:'xml'},
// 			{attribute:'type',value:'rotate'},
// 			{attribute:'from',value:'-65 '+rightElbowPivot.cx.animVal.value+" "+rightElbowPivot.cy.animVal.value},
// 			{attribute:'to',value:'-45 '+rightElbowPivot.cx.animVal.value+" "+rightElbowPivot.cy.animVal.value},
// 			{attribute:'dur',value:'1s'},
// 			{attribute:'begin',value:'outAnimationForearm.end'},
// 			];
// 		for (i in animationData) {
// 			animationLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 			animationTopLoop.setAttribute(animationData[i].attribute,animationData[i].value);
// 		};
// 		animationLoop.id = 'inAnimationForearm';
// 		rightForearmGroup.appendChild(animationLoop);
// 		rightForearmTopGroup.appendChild(animationTopLoop);
		
				
		// End Draw Mob
		return svg;
	},

};