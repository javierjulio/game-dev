// Matter.use(MatterAttractors);

const COLOR = {
  BACKGROUND: '#212529',
  OUTER: '#495057',
  INNER: '#15aabf',
  BUMPER: '#fab005',
  BUMPER_LIT: '#fff3bf',
  PADDLE: '#e64980',
  PINBALL: '#dee2e6'
};

const GRAVITY = 0.75;
const BUMPER_BOUNCE = .15;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

let world;

// engine
let engine = Matter.Engine.create();

// world (shared)
world = engine.world;
world.bounds = {
  min: { x: 0, y: 0},
  max: { x: 500, y: 800 }
};
world.gravity.y = GRAVITY; // simulate rolling on a slanted table

// render
let render = Matter.Render.create({
  element: document.getElementById('container'),
  engine: engine,
  options: {
    width: world.bounds.max.x,
    height: world.bounds.max.y,
    wireframes: false,
    background: COLOR.BACKGROUND
  }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// now you can start adding bodies...
// params: x, y, width, height, options
// let square = Matter.Bodies.rectangle(200, 100, 50, 50, {
//   // specify options here
// });
// Matter.World.add(engine.world, square);

let pinball = Matter.Bodies.circle(100, 0, 14, {
  label: 'pinball',
  // collisionFilter: {
  //   group: stopperGroup
  // },
  restitution: BUMPER_BOUNCE,
  friction: 0.0005,
  // frictionAir: 0.0001,
  density: 0.0005,
  render: {
    fillStyle: COLOR.PINBALL
  }
});
Matter.World.add(world, pinball);
Matter.Body.setPosition(pinball, { x: 220, y: 555 });
Matter.Body.setVelocity(pinball, { x: 0, y: 35 + rand(-1, 1) });
Matter.Body.setAngularVelocity(pinball, 0);

function rect(x, y, width, height, color) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    restitution: 1,
    render: { fillStyle: color }
  });
}

// let ground = rect(0, world.bounds.max.y - 10, world.bounds.max.x, 10, COLOR.OUTER)
// Matter.World.add(engine.world, ground);

function boundary(x, y, width, height) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    render: {
      fillStyle: COLOR.OUTER
    }
  });
}

const PATHS = {
  DOME: '0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
  DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
  DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
  APRON_LEFT: '0 0 180 120 0 120 0 0',
  APRON_RIGHT: '180 0 180 120 0 120 180 0'
};

function path(x, y, path) {
  let vertices = Matter.Vertices.fromPath(path);
  return Matter.Bodies.fromVertices(x, y, vertices, {
    isStatic: true,
    render: {
      fillStyle: COLOR.OUTER,

      // add stroke and line width to fill in slight gaps between fragments
      strokeStyle: COLOR.OUTER,
      lineWidth: 1
    }
  });
}

Matter.World.add(world, [
  boundary(250, -30, 500, 100),
  boundary(250, 830, 500, 100),
  boundary(-30, 400, 100, 800),
  boundary(530, 400, 100, 800),
  path(79, 740, PATHS.APRON_LEFT),
  path(371, 740, PATHS.APRON_RIGHT),
])
