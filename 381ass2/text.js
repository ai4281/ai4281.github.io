var container, stats;

var camera, scene, renderer;

var group, text;

var group1, group2, group3, group4, group5;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var cameraX, cameraY, cameraZ;

var groupX, groupY, groupZ;
var xRad, yRad, zRad;
var xAng, yAng, zAng;
var xAngInc, yAngInc, zAngInc;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var planetProperty = new Array();

init();
animate();

function init()
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	cameraX = 0;
	cameraY = 0; 
	cameraZ = 500;

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( cameraX, cameraY, cameraZ );

	scene = new THREE.Scene();
	

	group = new THREE.Group();
	group1 = new THREE.Group();
	group2 = new THREE.Group();
	group3 = new THREE.Group();
	group4 = new THREE.Group();
	group5 = new THREE.Group();
	//group.add( text );

	initText("iat381", 0, 0, 0, 20, group, 100);
	initText("iat452", 0, 0, 0, 20, group2, 100);
	initText("School", 0, 0, 0, 50, group1, 0);
	initText("assignment2", 0, 0, 0, 5, group3, 5);

	initText("Life", -200, 50, 0, 50, group4, 5);
	initText("chores", -200, 50, 0, 20, group5, 5);
	// initText("Throw out trash", -300, 100, 10)
	// initText("recycle", -40, 100, 10)
	// initText("Submit application", 120, 100, 10)
	// initText("Graduate from school", 30, 100, -300)
	// initText("Get a job", -250, 100, -300)
	// initText("Buy a car", -100, 120, -500)

	group1.add(group);
	group1.add(group2);
	group1.add(group3);

	scene.add(group);
	scene.add(group1);
	scene.add(group2);
	scene.add(group3);
	scene.add(group4);
	scene.add(group5);

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0x000000 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	//group var
	groupX = 0, groupY = 0, groupZ = 0;

	xRad = 50, yRad = 50, zRad = 50;

	xAng = 1.1, yAng = 1.5, zAng = 3.5;

	xAngInc = 0.02, yAngInc = 0.01, zAngInc = 0.01;

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function initText(textInput, x0, y0, z0, textSize, group, orbitRad)
{
	var text0 = textInput;
	var hash = document.location.hash.substr( 1 );

	// if ( hash.length !== 0 ) {

	// 	text0 = hash;

	// }

	var text3d = new THREE.TextGeometry( text0, {
		size: textSize,
		height: 5,
		curveSegments: 2,
		font: "helvetiker"
	} );

	var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } );
	text = new THREE.Mesh( text3d, textMaterial );

	text.position.set(x0, y0, z0);

	//groupX = 0, groupY = 0, groupZ = 0;

	// xRad = 50, yRad = 50, zRad = 50;

	// xAng = 1.1, yAng = 1.5, zAng = 3.5;

	// xAngInc = 0.02, yAngInc = 0.01, zAngInc = 0.01;
	var positionArray = [0, 0, 0, orbitRad, orbitRad, orbitRad, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0, Math.random()/20, Math.random()/20, Math.random()/20];

	planetProperty.push(positionArray);

	group.add( text );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	//mouseXOnMouseDown = event.clientX - windowHalfX;
	//targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;

	//cameraX = ( mouseX - mouseXOnMouseDown ) * 0.5;


}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function rotation(group, xInc, yInc, planetIndex, xCen, yCen, zCen)
{
	var tempPropArray = planetProperty[planetIndex];

	tempPropArray[6] += tempPropArray[9];
	tempPropArray[7] += tempPropArray[10];
	tempPropArray[8] += tempPropArray[11];

	// rotation around x axis (a.k.a. pitch)
	tempPropArray[1] = Math.cos(tempPropArray[6])*yRad - Math.sin(tempPropArray[6])*zRad;
	tempPropArray[2] = Math.sin(tempPropArray[6])*yRad + Math.cos(tempPropArray[6])*zRad;

	// rotation around y axis (a.k.a. yaw)
	tempPropArray[2] = Math.cos(tempPropArray[7])*zRad - Math.sin(tempPropArray[7])*xRad;
	tempPropArray[0] = Math.sin(tempPropArray[7])*zRad + Math.cos(tempPropArray[7])*xRad;

	// // rotation around z axis (a.k.a. roll)
	// tempPropArray[0] = Math.cos(tempPropArray[8])*xRad - Math.sin(tempPropArray[8])*yRad;
	// tempPropArray[1] = Math.sin(tempPropArray[8])*xRad + Math.cos(tempPropArray[8])*yRad;

	group.position.set(tempPropArray[0] + xCen, tempPropArray[1] + yCen, tempPropArray[2] + zCen);


}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

	//cameraX += 0.1;

	rotation(group, 0.02, 0.01, 0, 75, 0, 0);
	rotation(group2, 0.02, 0.05, 2, 75, 0, 0);

	//rotation(group1, 0.02, 0.05, 1, 0, 0, 0);

	var tempPropArray = planetProperty[2];

	rotation(group3, 0.02, 0.05, 3, tempPropArray[0] + 75, tempPropArray[1], tempPropArray[2]);

	//rotation(group4, 0.02, 0.05, 2, 0, 0, 0);
	//rotation(group5, 0.02, 0.05, 2, 0, 0, 0);

	rotation(group5, 0.02, 0.05, 5, -50, 0, 0);

	//camera.position.set( cameraX, cameraY, cameraZ );


}

function render() {

	//group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
	renderer.render( scene, camera );

}