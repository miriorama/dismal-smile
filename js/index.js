var Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  Events = Matter.Events
  Vector = Matter.Vector;
  Svg = Matter.Svg;

var width = 500;
var height = 500;

var blackStyle = {
  fillStyle: '#000',
  strokeStyle: '#000'
};
var options = {
  render: blackStyle,
  density: 0.0001,
  friction: 0.2,
  restitution: 0.5
};



var engine = Engine.create({
  render: {
    element: document.getElementById("player"),
    options: {
      height: height,
      width: width,
      background: '#fff'
    }
  }
});

engine.world.gravity.y = 0.3;

var rect = Matter.Bodies.rectangle(250, 250, 100, 100, options);
//World.add(engine.world, rect);

//face
var face;
$.get('face.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 30));
  });

  face = Bodies.fromVertices(250, 250, vertexSets, {
    isStatic: true,
    //render: blackStyle,
    density: 1
  }, true);

  World.add(engine.world, face);
});

Events.on(engine, 'beforeUpdate', function(event) {
    Body.setAngularVelocity(face, 0.005);
    Body.rotate(face, 0.005);
});

//eye 1
var eye;
$.get('eye.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 10));
  });

  eye = Bodies.fromVertices(250, 300, vertexSets, options, true);

  World.add(engine.world, eye);
});

//eye 2
var eye2;
$.get('eye.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 10));
  });

  eye2 = Bodies.fromVertices(200, 300, vertexSets, options, true);

  World.add(engine.world, eye2);
});


//mouth
var mouth;
$.get('mouth.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 30));
  });

  mouth = Bodies.fromVertices(250, 200, vertexSets, options, true);

  World.add(engine.world, mouth);
});

var renderOptions = engine.render.options;
renderOptions.wireframes = false;

// run the engine
Engine.run(engine);



