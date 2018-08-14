var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Body = Matter.Body;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Runner = Matter.Runner;
var Common = Matter.Common;
var Events = Matter.Events;
var Vector = Matter.Vector;
var Svg = Matter.Svg;

var width = 500;
var height = 500;

var blackStyle = {
  fillStyle: '#000',
  strokeStyle: '#000'
};
var yellowStyle = {
  fillStyle: '#000',
  strokeStyle: '#000'
};
var options = {
  isStatic: false,
  render: blackStyle,
  density: 0.0000001,
  friction: 0.1,
  restitution: 0.5
};

var engine = Engine.create();
engine.world.gravity.y = 0.4;

var render = Render.create({
  element: document.getElementById("player"),
  engine: engine,
  options: {
    height: height,
    width: width,
    background: '#fff',
    wireframes: false
  }
});

/*
var rect = Matter.Bodies.polygon(250, 250, 50, 230, {isStatic: true, render: yellowStyle});
World.add(engine.world, rect);*/


//face
var face;
$.get('svg/face.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 10));
  });

  face = Bodies.fromVertices(250, 250, vertexSets, {
    isStatic: true,
    render: yellowStyle,
    density: 1
  }, true);

  World.add(engine.world, face);
});

//mouth
var mouth;
$.get('svg/mouth.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 10));
  });

  mouth = Bodies.fromVertices(250, 200, vertexSets, options, true);

  World.add(engine.world, mouth);
});

//eye 1
var eye;
$.get('svg/eye.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 1));
  });

  eye = Bodies.fromVertices(250, 300, vertexSets, options, true);

  World.add(engine.world, eye);
});

//eye 2
var eye2;
$.get('svg/eye.svg').done(function(data) {
  var vertexSets = [];

  $(data).find('path').each(function(i, path) {
    vertexSets.push(Svg.pathToVertices(path, 1));
  });

  eye2 = Bodies.fromVertices(200, 300, vertexSets, options, true);

  World.add(engine.world, eye2);
});




Events.on(engine, 'beforeUpdate', function(event) {
  Body.setAngularVelocity(face, 0.005);
  Body.rotate(face, 0.005);
});


Render.run(render);

var runner = Runner.create();
Runner.run(runner, engine);


