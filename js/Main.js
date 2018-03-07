//Global
var camera, scene, renderer, controls, raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

var	toolColors = ["#ff00ff", "#ffbf00", "#ffff00", "#40ff00", "#ff0000", "aqua"];
var toolNames = ["Counter Principle", "Perspectives","Body","Space","Energy","Awareness"];
var bool = false;
var objects = [];
var selected = [];



function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	var container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 190;

	var light = new THREE.AmbientLight( 0x404040 );
	scene.add( light );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 10; //Scroll Min
	controls.maxDistance = 190; //Scroll Max

	createToolGroups();

	raycaster = new THREE.Raycaster();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}

function onDocumentTouchStart( event ) {

	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {
		intersects[0].object.material.emissive.setHex( 0xffffff );
		//checkCombination(intersects[0].object);
	}
}

function onDocumentMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	//render();
}


