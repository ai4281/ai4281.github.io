var container, stats;

var camera, scene, renderer;

var group, text;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var cameraX, cameraY, cameraZ

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init()
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	cameraX = 0;
	cameraY = 140; 
	cameraZ = 500;

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( cameraX, cameraY, cameraZ );

	scene = new THREE.Scene();
	

	group = new THREE.Group();
	//group.add( text );

	initText("Clean room", -500, 100, 10);
	initText("Throw out trash", -300, 100, 10)
	initText("recycle", -40, 100, 10)
	initText("Submit application", 120, 100, 10)
	initText("Graduate from school", 30, 100, -300)
	initText("Get a job", -250, 100, -300)
	initText("Buy a car", -100, 120, -500)

	scene.add(group);

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function initText(textInput, x0, y0, z0)
{
	var text0 = textInput;
	var hash = document.location.hash.substr( 1 );

	// if ( hash.length !== 0 ) {

	// 	text0 = hash;

	// }

	var text3d = new THREE.TextGeometry( text0, {
		size: 20,
		height: 5,
		curveSegments: 2,
		font: "helvetiker"
	} );

	var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } );
	text = new THREE.Mesh( text3d, textMaterial );

	text.position.set(x0, y0, z0);

	group.add( text );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	//targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;

	cameraX = ( mouseX - mouseXOnMouseDown ) * 0.5;

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

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

	//cameraX += 0.1;

	camera.position.set( cameraX, cameraY, cameraZ );


}

function render() {

	//group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
	renderer.render( scene, camera );

}