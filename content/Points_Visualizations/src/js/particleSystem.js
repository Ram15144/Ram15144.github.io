"use strict";

/* Get or create the application global variable */
var App = App || {};
var intersectPoints=[];
var count=0;
var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];

    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data
    var bounds = {};
    var rect;
    var plane, hplane;
    var points;
    var pointsVector3=[];
    var cone1, cone2, hcylinder, vcone1, vcone2, vcylinder;
    var v = 1 , h = 0;

    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
        var height = (bounds.maxY - bounds.minY) + 1;

        // create a cylinder to contain the particle system
        var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
        var cylinder = new THREE.Mesh( geometry, material );


        // add the containment to the scene
        //sceneObject.add(cylinder);

        /*var rect2D = new THREE.BoxGeometry( 10, 0.01, 10);
        var material = new THREE.MeshBasicMaterial( {color: 0xff0000,
            transparent: true,
            opacity: 0.75} );
        rect = new THREE.Mesh( rect2D, material );
        sceneObject.add( rect );
        */


        var planeGeom = new THREE.PlaneGeometry(10, 10);
        //planeGeom.rotateX(-Math.PI / 2);
        plane = new THREE.Mesh(planeGeom, new THREE.MeshBasicMaterial({
          color: 0x5e7600,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide
        }));
        //plane.position.y = 3.14;
        //plane.rotation.x = Math.PI / 5;
        sceneObject.add(plane);

        //planeGeom.rotateX(-Math.PI / 2);
        var hplaneGeom = new THREE.PlaneGeometry(10, 10);
        //hplaneGeom.rotateX(-Math.PI / 2);
        hplane = new THREE.Mesh(hplaneGeom, new THREE.MeshBasicMaterial({
          color: 0x5e7600,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide
        }));
        hplane.rotation.x = Math.PI /2;
        //sceneObject.add(hplane);
        

        //Creating axis ********************************************** STARTS HERE

        /* Horizontal Arrow */
        var geometry = new THREE.ConeGeometry( 5, 20, 32 );
        geometry.scale(0.06,0.06,0.06);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        cone1 = new THREE.Mesh( geometry, material );
        cone1.position.x=-10;       
        cone1.position.z=3;
        cone1.rotation.x = Math.PI / 2;
        sceneObject.add( cone1 );

        var geometry = new THREE.ConeGeometry( 5, 20, 32 );
        geometry.scale(0.06,0.06,0.06);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        cone2 = new THREE.Mesh( geometry, material );
        cone2.position.x=-10;        
        cone2.position.z=-3;
        cone2.rotation.x=Math.PI * 1.5;
        sceneObject.add( cone2 );

        var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        geometry.scale(0.02,0.3,0.02);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        hcylinder = new THREE.Mesh( geometry, material );
        hcylinder.position.x=-10;
        hcylinder.rotation.x= Math.PI / 2;
        sceneObject.add( hcylinder );


        /* Vertical Arrow */
        var geometry = new THREE.ConeGeometry( 5, 20, 32 );
        geometry.scale(0.06,0.06,0.06);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        vcone1 = new THREE.Mesh( geometry, material );
        vcone1.position.x=-10;       
        vcone1.position.y=3;
        //sceneObject.add( vcone1 );

        var geometry = new THREE.ConeGeometry( 5, 20, 32 );
        geometry.scale(0.06,0.06,0.06);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        vcone2 = new THREE.Mesh( geometry, material );
        vcone2.position.x=-10;        
        vcone2.position.y=-3;
        vcone2.rotation.x=Math.PI;
        //sceneObject.add( vcone2 );

        var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        geometry.scale(0.02,0.3,0.02);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        vcylinder = new THREE.Mesh( geometry, material );
        vcylinder.position.x=-10;
        vcylinder.rotation.y= Math.PI / 2;
        //sceneObject.add( vcylinder );   

        //Creating axis ********************************************** ENDS HERE

        //var controls = new THREE.DragControls(rect, self.camera, self.renderer.domElement);
        document.addEventListener('keydown',Keyboard,false);
        document.addEventListener('keydown',drawIntersectionPoints,false);
        document.addEventListener('keydown',revertBackOpacity,false);

    };

    function sliders()
    {
        if(document.getElementById("horizontal").checked)
        {
            sceneObject.remove(cone1);
            sceneObject.remove(cone2);
            sceneObject.remove(hcylinder);
            sceneObject.remove(plane);
            v=0;
            sceneObject.add(vcone1);
            sceneObject.add(vcone2);
            sceneObject.add(vcylinder);
            sceneObject.add(hplane);
            h=1;
        }
        else
        {
            sceneObject.remove(vcone1);
            sceneObject.remove(vcone2);
            sceneObject.remove(vcylinder);
            sceneObject.remove(hplane);
            h=0;
            sceneObject.add(cone1);
            sceneObject.add(cone2);
            sceneObject.add(hcylinder);
            sceneObject.add(plane);
            v=1;
        }
    }

    function Keyboard(){
        var speed=0.01;

        if(event.keyCode == 65 && plane.position.z <= 5){
            plane.position.z +=speed;
        }
        else if(event.keyCode == 68 && plane.position.z>=-5){plane.position.z -=speed;}

        if(event.keyCode == 87 && plane.position.y < 5){
            hplane.position.y +=speed;
        }
        else if(event.keyCode == 83 && plane.position.y>-5){hplane.position.y -=speed;}
    }

    function revertBackOpacity()
    {
        if(event.keyCode==90)
        {
            sceneObject.remove(points);
            points.geometry.dispose();
            points.material.dispose();
            points = undefined;
            createParticleSys();
        }
    }


    // creates the particle system
    self.createParticleSystem = function() {

        createParticleSys();
    };

    function createParticleSys()
    {
       var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array(data.length*3);
        var colors = new Float32Array(data.length*3);
        
        var color = new THREE.Color();
        var i=0,k=0;

        data.forEach(function(val)
        {
            // positions
            vertices[i] = val.X;
            vertices[i+1] = val.Z-5;
            vertices[i+2] = val.Y;
            pointsVector3[k]=new THREE.Vector3(vertices[i],vertices[i+1],vertices[i+2]);
            k=k+1;

            // colors
            colors[i]= 1-(val.concentration/351)*0.2 ;
            colors[i+1] = 1-(val.concentration/351)*5 ;
            colors[i+2] = 1-(val.concentration/351)*5 ;
            i=i+3;

        });
        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
        geometry.computeBoundingSphere();
        
        var material = new THREE.PointsMaterial( { size: 0.06, vertexColors: THREE.VertexColors } );
        points = new THREE.Points( geometry, material );
        sceneObject.add( points );
    }
//******************************************************************************** STARTS HERE
var pointsOfIntersection = new THREE.Geometry();

var a = new THREE.Vector3(),
  b = new THREE.Vector3(),
  c = new THREE.Vector3();
var planePointA = new THREE.Vector3(),
  planePointB = new THREE.Vector3(),
  planePointC = new THREE.Vector3();
var lineAB = new THREE.Line3(),
  lineBC = new THREE.Line3(),
  lineCA = new THREE.Line3();

var pointOfIntersection = new THREE.Vector3();

function drawIntersectionPoints() {
    if(event.keyCode == 88)
    {
          var mathPlane = new THREE.Plane();
          if(v==1)
          {
              plane.localToWorld(planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a]));
              plane.localToWorld(planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b]));
              plane.localToWorld(planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c]));
              mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);
          }
          else
          {
            hplane.localToWorld(planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a]));
            hplane.localToWorld(planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b]));
            hplane.localToWorld(planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c]));
            mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC); 
          }
          var a=new THREE.Vector3(0,0,0);

            sceneObject.remove(points);
            points.geometry.dispose();
            points.material.dispose();
            points = undefined;

          //console.log(mathPlane.distanceToPoint(a));
          //console.log(mathPlane);
          count=0;
          intersectPoints=[];

            var geometry = new THREE.BufferGeometry();
            var vertices = new Float32Array(data.length*3);
            var colors = new Float32Array(data.length*3);
            var alphas = new Float32Array( data.length * 1 );
            var color = new THREE.Color();
            var i=0,k=0;

          pointsVector3.forEach(function(pintersect){

                if(Math.abs(mathPlane.distanceToPoint(pintersect))<0.01)
                {   
                    // positions
                    vertices[i] = pintersect.x;         ;
                    vertices[i+1] = pintersect.y;
                    vertices[i+2] = pintersect.z;

                    // colors
                    colors[i]= 0 ;
                    colors[i+1] = 0 ;
                    colors[i+2] = 0 ;

                    i=i+3;

                    //Alpha value
                    alphas[k]=0;
                    k=k+1;

                    intersectPoints.push(pintersect);
                    count=count+1;
                    alphas[k]=0.5;
                    //console.log(intersectPoints);
                }
          })

            geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
            geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
            geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );
            geometry.computeBoundingSphere();

            var material = new THREE.PointsMaterial( { size: 0.1, vertexColors: THREE.VertexColors } );
            material.opacity=0.1;
            points = new THREE.Points( geometry, material );
            sceneObject.add( points );
            if(v==1)
                plotpts(intersectPoints);
            else
                plotptsh(intersectPoints);
          //console.log(count);
    }
}
//*********************************************************************************** ENDS HERE

    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                data.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points1),
                    Z: Number(d.Points2),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity1),
                    W: Number(d.velocity2),
                    //color
                    //pointColor: String(d.pointColor)
                });
            })
            // when done loading
            .get(function() {
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                self.drawContainment();

                // create the particle system
                self.createParticleSystem();
            });
    };

    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        },

        enable_disable_sliders: function()
        {
            sliders();
        }
    };

    return publiclyAvailable;

};