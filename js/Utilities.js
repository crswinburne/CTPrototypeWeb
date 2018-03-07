function createToolGroups(){
	var m = 80;
	var parentPos = new Array();
	var center = new THREE.Vector3(0,0,0);

	createText(tools[i], toolColors[i], center, "Bold 150px Arial", 512, 100, 40, "me");

	var toolVec = [
		new THREE.Vector3(0,1,0),
		new THREE.Vector3(-0.86, 0.5,0),
		new THREE.Vector3(0.86, 0.5,0),
		new THREE.Vector3(-0.86, -0.5,0),
		new THREE.Vector3(0.86, -0.5,0),
		new THREE.Vector3(0,-1,0) 
	]

	for ( var i = 0, l = tools.length; i < l; i ++ ) {
		var vecParent = toolVec[i];
		vecParent.x = vecParent.x * m;
		vecParent.y = vecParent.y * m;
		vecParent.z = vecParent.z * m;


		createText(tools[i], toolColors[i], vecParent, "Bold 80px Arial", 512, 100, 40, toolNames[i]);
		populateTools(vecParent, tools[i], toolColors[i],2,15, false);
	}
}

function populateTools(pos, array, color, size, radius, isSubtool){
	var amount = array.length;
	var childPoints = new Array();
	var radius = radius * size;

	for ( var i = 0, l = amount; i < l; i ++ ) {

		var name;
		name = array[i][1];



		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;

		var vector = new THREE.Vector3();
		vector.x = pos.x + (radius * Math.cos( theta ) * Math.sin( phi ));
		vector.y = pos.y + (radius * Math.sin( theta ) * Math.sin( phi ));
		vector.z = pos.z + (radius * Math.cos( phi ));

		
		createText(name, 'white', vector, "Bold 40px Arial", 512, 50, 30);	

		//Line Points
		childPoints.push(vector);
		if(isSubtool){
			childPoints.unshift(pos);
		}

		//Populate Subtool
		if(Array.isArray(array[i][1]) == true){
		//populateTools(childPoints[i], array[i][1], color, 1, 15, true);
		}

	}
	drawLine(childPoints, color);
}	

function createText(content, color, pos, font, width, other, size, uniqueName){
		if(uniqueName != null){
			content = uniqueName;
		}

		var textCanvas = document.createElement('canvas');
		textCanvas.width = width;
		textCanvas.height = 128;
		var text = textCanvas.getContext('2d');
		text.font =font;
		text.textAlign="center";
		text.fillStyle = "rgba(255,0,0,0.95)";
		var vector = new THREE.Vector3();
		vector.x = pos.x
		vector.y = pos.y
		vector.z = pos.z

		text.fillText(content, 300, other);
		var texture = new THREE.Texture(textCanvas);
		texture.needsUpdate = true;
		var color = new THREE.Color(color);

		var material = new THREE.MeshLambertMaterial( { 
			map: texture,
			emissive: color,
			side: THREE.DoubleSide
		} ) 
		material.transparent = true;

		var geometry = new THREE.PlaneGeometry( size, 10);
		var object = new THREE.Mesh( geometry, material );

		object.position.x = vector.x;
		object.position.y = vector.y;
		object.position.z = vector.z;
		
		object.name = content;

		objects.push(object);
		scene.add(object);
}

function drawLine(points, pColor){
	var lineMaterial = new THREE.LineBasicMaterial({
	color: pColor
	});

	var lineGeometry = new THREE.Geometry();
	for (var i = 0; i < points.length; i++) {
		lineGeometry.vertices.push(points[i]);
	}

	var line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add(line);
}

/*
function checkCombination(intersect){
	if(!bool){
		selected.push(intersect);
		console.log(selected[0].name);
		bool = true;
	}
	else{
		if(intersect.name != selected[0].name){
			if(selected.length == 2){
				selected[0].material.emissive.setHex( 0x404040);
				selected.splice(0, 2, selected[1],intersect);
			}
			else{
				selected.push(intersect);
			}

			var c = selected[0].name + selected[1].name;
			var b = selected[1].name + selected[0].name;
			console.log(c+b);
			if(combineList.includes(c) || combineList.includes(b)){
			console.log("COMBINATION");
			}
		}
	}
}
*/


