
var mobDesign = {
	
	updateColoring: function(face) {

		var skinRed = 255;
		var skinGreen = 237;
		var skinBlue = 220;
		
		// Black Eumelanin
		var blackEumelanin = 100 - face.blackEumelanin;
		skinRed *= blackEumelanin / 100;
		skinGreen *= blackEumelanin / 100;
		skinBlue *= blackEumelanin / 100;
		
		// Brown Eumelanin
		var brownEumelanin = 100 - face.brownEumelanin;
		skinBlue *= brownEumelanin / 100;

		// Pink Pheomelanin
		var pinkPheomelanin = 100 - face.pinkPheomelanin;
		skinGreen *= pinkPheomelanin / 100;
		skinBlue *= pinkPheomelanin / 100;

		// Green Keratin
		var greenDiff = face.greenKeratin/100 * (255 - skinGreen)
		skinGreen += greenDiff;
		skinRed = Math.max(0,skinRed - greenDiff);
		skinBlue = Math.max(0,skinBlue - greenDiff);
		
// 		console.log('pigments',100-blackEumelanin,100-brownEumelanin,100-pinkPheomelanin);
// 		console.log('RGB',Math.round(skinRed),Math.round(skinGreen),Math.round(skinBlue));
		
		face.skinColor = "#" + ("0" + Math.round(skinRed).toString(16)).substr(-2) + ("0" + Math.round(skinGreen).toString(16)).substr(-2) + ("0" + Math.round(skinBlue).toString(16)).substr(-2);
		
		var noseShading = face.noseShading;
		var targetShade = 255;
		if (noseShading < 0) {
			var noseRed = skinRed * (100 + noseShading)/100;
			var noseGreen = skinGreen * (100 + noseShading)/100;
			var noseBlue = skinBlue * (100 + noseShading)/100;
		} else {		
			var noseRed = skinRed + (255-skinRed)*noseShading/100;
			var noseGreen = skinGreen + (255-skinGreen)*noseShading/100;
			var noseBlue = skinBlue + (255-skinBlue)*noseShading/100;
		};
		var nosePinkness = face.nosePinkness
		if (nosePinkness > 0) {
			noseGreen *= (100 - nosePinkness)/100;
			noseBlue *= (100 - nosePinkness)/100;
		};
		face.noseColor= "#" + ("0" + Math.round(noseRed).toString(16)).substr(-2) + ("0" + Math.round(noseGreen).toString(16)).substr(-2) + ("0" + Math.round(noseBlue).toString(16)).substr(-2);
		
		var lipShading = face.lipShading;
		var targetShade = 255;
		if (lipShading < 0) {
			var lipRed = skinRed * (100 + lipShading)/100;
			var lipGreen = skinGreen * (100 + lipShading)/100;
			var lipBlue = skinBlue * (100 + lipShading)/100;
		} else {		
			var lipRed = skinRed + (255-skinRed)*lipShading/100;
			var lipGreen = skinGreen + (255-skinGreen)*lipShading/100;
			var lipBlue = skinBlue + (255-skinBlue)*lipShading/100;
		};
		var lipPinkness = face.lipPinkness;
		if (lipPinkness > 0) {
			lipGreen *= (100 - lipPinkness)/100;
			lipBlue *= (100 - lipPinkness)/100;
		};
		face.lipColor= "#" + ("0" + Math.round(lipRed).toString(16)).substr(-2) + ("0" + Math.round(lipGreen).toString(16)).substr(-2) + ("0" + Math.round(lipBlue).toString(16)).substr(-2);
		
		var earShading = face.earShading;
		var targetShade = 255;
		if (earShading < 0) {
			var earRed = skinRed * (100 + earShading)/100;
			var earGreen = skinGreen * (100 + earShading)/100;
			var earBlue = skinBlue * (100 + earShading)/100;
		} else {		
			var earRed = skinRed + (255-skinRed)*earShading/100;
			var earGreen = skinGreen + (255-skinGreen)*earShading/100;
			var earBlue = skinBlue + (255-skinBlue)*earShading/100;
		};
		var earPinkness = face.earPinkness;
		if (earPinkness > 0) {
			earGreen *= (100 - earPinkness)/100;
			earBlue *= (100 - earPinkness)/100;
		};
		face.earColor= "#" + ("0" + Math.round(earRed).toString(16)).substr(-2) + ("0" + Math.round(earGreen).toString(16)).substr(-2) + ("0" + Math.round(earBlue).toString(16)).substr(-2);
		
		return face;
	},
	
	randomizeFace: function(heritages) {
// 		console.log(heritages);
		var newFace = {};
		
		// Randomized Base
		for (i in {eyeColor:0,hairColor:0}) {
			var red = Math.random() * 255 << 0;
			var green = Math.random() * 255  << 0;
			var blue = Math.random() * 255 << 0;
			newFace[i] = "#" + ("0" + red.toString(16)).substr(-2) + ("0" + green.toString(16)).substr(-2) + ("0" + blue.toString(16)).substr(-2);
		};
		
		var grandparents = [{faceData:{}},{faceData:{}},{faceData:{}},{faceData:{}}];
		
		// Generate Random Grandparents
		for (i=0;i<4;i++) {
			for (f in dataEthnicities.min) {
				var random = Math.random();
				grandparents[i].faceData[f]= random*dataEthnicities.min[f] + (1-random)*dataEthnicities.max[f];
			};
		};
		
		// Get Grandparents' Ethnicities
		if (heritages == undefined) {
			var ethnicities = Object.keys(dataEthnicities);
			ethnicities.splice(ethnicities.indexOf('min'),1);
			ethnicities.splice(ethnicities.indexOf('max'),1);
			var masterEthnicities = [];
			for (i in ethnicities) {
				masterEthnicities[i] = ethnicities[i];
			};
			var heritages = [];
			for (i=0;i<4;i++) {
				grandparents[i].ethnicity = ethnicities[Math.random() * ethnicities.length << 0];
				ethnicities = dataEthnicities[grandparents[i].ethnicity].neighbors;
				ethnicities = ethnicities.concat([grandparents[i].ethnicity,grandparents[i].ethnicity,grandparents[i].ethnicity]);
				ethnicities = ethnicities.concat(masterEthnicities[Math.random() * masterEthnicities.length << 0]);
			};
		} else {
			for (i=0;i<4;i++) {
				grandparents[i].ethnicity = heritages[ i % heritages.length ];
			};
		};
		
		// Modify Grandparents' FaceData
		for (i in grandparents) {
			for (f in dataEthnicities[grandparents[i].ethnicity]) {
				grandparents[i].faceData[f] = (grandparents[i].faceData[f] + dataEthnicities[grandparents[i].ethnicity][f] ) / 2;
				if (dataEthnicities[grandparents[i].ethnicity][f] === 0) {grandparents[i].faceData[f] = 0;}
			};
		};
		
		// Average to Parents
		var parents = [{faceData:{}},{faceData:{}}];
		for (i in parents) {
			for (f in dataEthnicities.min) {
				parents[i].faceData[f] = Math.floor(( grandparents[i].faceData[f] + grandparents[parseInt(i)+2].faceData[f] ) / 2);
			};
		};
		
		// Average to Child
		for (f in dataEthnicities.min) {
			newFace[f] = Math.floor(( parents[0].faceData[f] + parents[1].faceData[f] ) / 2 );
		};
		
		// Add random factor to too-normalized characteristics
		var randomizedFeatures = {blackEumelanin:0,brownEumelanin:0,bust:0};
		for (i in randomizedFeatures) {
			random = Math.random();
			newFace[i] = (random*dataEthnicities.min[i] + (1-random)*dataEthnicities.max[i] + newFace[i])/2
		};
				
		// Display Heritage
		heritages = [];
		for (i in grandparents) {
			if (heritages[grandparents[i].ethnicity] !== undefined) {
				heritages[grandparents[i].ethnicity]++;
			} else {
				heritages[grandparents[i].ethnicity] = 1;
			};
		};
		var heritageString = '';
		for (i in heritages) {
			heritageString += ['quarter','half','three-quarters','full-blooded'][heritages[i]-1] + " " +i + " ";
		};
		newFace.heritage = heritageString;
		
		newFace = mobDesign.updateColoring(newFace);
// 		handlers.updateFace(p1);
		
		return newFace;
	},

};