import { World, System, TagComponent } from "ecsy";
import { Position } from "./components/position";
import { Motion } from "./components/motion";

const NUM_ELEMENTS = 4;
const SPEED_MULTIPLIER = 0.1;
const SHAPE_SIZE = 20;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

// Initialize canvas
let canvas = document.querySelector("canvas");
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
//----------------------
// Components
//----------------------

// drawSpaceship(position) {
//   ctx.save();
//   ctx.translate(position.x >> 0, position.y >> 0);
//   // ctx.rotate(ship.angle);
//   ctx.strokeStyle = '#000';
//   // ctx.lineWidth = (Math.random() > 0.9) ? 2 : 1;
//   ctx.beginPath();
//   ctx.moveTo(10, 0);
//   ctx.lineTo(-10, -10);
//   ctx.lineTo(-10, 10);
//   ctx.lineTo(10, 0);
//   ctx.stroke();
//   ctx.closePath();
//   ctx.restore();
// }

// Velocity component
// class Velocity {
//   constructor() {
//     this.x = this.y = 0;
//   }
// }

// Shape component
class Shape {
  constructor() {
    this.primitive = 'box';
  }
}

// Renderable component
class Renderable extends TagComponent {}

//----------------------
// Systems
//----------------------

// MovableSystem
class MovableSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    // Iterate through all the entities on the query
    this.queries.moving.results.forEach(entity => {
      var motion = entity.getComponent(Motion);
      var position = entity.getMutableComponent(Position);
      position.x += motion.x * delta;
      position.y += motion.y * delta;
      position.rotation += motion.angularVelocity * delta;
      console.log(position.rotation, motion.angularVelocity)

      if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = - SHAPE_HALF_SIZE;
      if (position.x < - SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = - SHAPE_HALF_SIZE;
      if (position.y < - SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;
    });
  }
}
// Define a query of entities that have "Velocity" and "Position" components
MovableSystem.queries = {
  moving: {
    components: [Motion, Position]
  }
}
// RendererSystem
class RendererSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //ctx.globalAlpha = 0.6;

    // Iterate through all the entities on the query
    this.queries.renderables.results.forEach(entity => {
      var shape = entity.getComponent(Shape);
      var position = entity.getComponent(Position);
      // var motion = entity.getComponent(Motion);
      if (shape.primitive === 'box') {
        // this.drawBox(position);
        this.drawBox(position);
      } else {
        // this.drawCircle(position);
        this.drawSpaceship(position)
      }
    });
  }

  drawSpaceship(position) {
    ctx.save();
    ctx.translate(position.x >> 0, position.y >> 0);
    ctx.rotate(position.rotation * 180 / Math.PI);
    ctx.strokeStyle = '#000';
    // ctx.lineWidth = (Math.random() > 0.9) ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-10, 10);
    ctx.lineTo(10, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  drawCircle(position) {
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#222";
    ctx.stroke();
  }

  drawBox(position) {
    // ctx.save();
    // ctx.beginPath();
    // // ctx.lineWidth = (Math.random() > 0.2) ? 4 : 3;
    // ctx.strokeStyle = "#000";
    // var j = 7// (Math.random() * 2 + 7) >> 0;
    // var sides = j;
    // let doublePI = Math.PI * 2;
    // let angle = 0
    // let radius = 30
    // ctx.translate(position.x + radius / 2, position.y + radius / 2);
    // ctx.rotate(position.rotation * 180 / Math.PI);
    // ctx.translate(-(position.x + radius / 2), -(position.y + radius / 2));
    // ctx.fillStyle= "#000";
    // ctx.moveTo((position.x + Math.cos(doublePI * (j / sides) + angle) * radius) >> 0, (position.y + Math.sin(doublePI * (j / sides) + angle) * radius) >> 0);

    // for(j; j > -1; --j) {
    //   ctx.lineTo(
    //     (position.x + Math.cos(doublePI * (j / sides) + angle) * radius) >> 0,
    //     (position.y + Math.sin(doublePI * (j / sides) + angle) * radius) >> 0
    //   )
    // }

    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath();
    // ctx.restore();
    // return;

// let angle = 0
// let radius = 30
// ctx.save();
// ctx.beginPath();
// ctx.translate(position.x >> 0, position.y >> 0);
// ctx.fillStyle= "#000";
// ctx.moveTo(radius, 0);
// while( angle < Math.PI * 2 ) {
//   var length = ( 0.75 + Math.random() * 0.25 ) * radius;
//   var posX = Math.cos( angle ) * length;
//   var posY = Math.sin( angle ) * length;
//   ctx.lineTo(posX, posY);
//   angle += Math.random() * 0.5;
// }
// ctx.lineTo( radius, 0 );
// ctx.fill();
// ctx.closePath();
// ctx.restore();
// return;

    ctx.save();
    ctx.beginPath();
    // //Set the origin to the center of the object
    ctx.translate(position.x + SHAPE_SIZE / 2, position.y + SHAPE_SIZE / 2);
    ctx.rotate(position.rotation * 180 / Math.PI);
    ctx.translate(-position.x - SHAPE_SIZE / 2, -position.y - SHAPE_SIZE / 2);
    ctx.fillStyle= "#f28d89";
    ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#800904";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

// Define a query of entities that have "Renderable" and "Shape" components
RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] }
}

// Create world and register the systems on it
var world = new World();
world
  .registerSystem(MovableSystem)
  .registerSystem(RendererSystem);
// Some helper functions when creating the components
function getRandomVelocity() {
  return {
    x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    angularVelocity: (2 * Math.random() - 1) * 0.00005,
    damping: 0
  };
}
// new Motion(
//   ( Math.random() - 0.5 ) * 4 * ( 50 - radius ),
//   ( Math.random() - 0.5 ) * 4 * ( 50 - radius ),
//   Math.random() * 2 - 1,
//   0
// )


// ctx.fillStyle= "#000";
// ctx.fill();
// ctx.lineWidth = 1;
// ctx.strokeStyle = "#800904";
// ctx.stroke();


// var angle : Number = 0;
// graphics.beginFill( 0xFFFFFF );
// graphics.moveTo( radius, 0 );
// while( angle < Math.PI * 2 )
// {
//   var length : Number = ( 0.75 + Math.random() * 0.25 ) * radius;
//   var posX : Number = Math.cos( angle ) * length;
//   var posY : Number = Math.sin( angle ) * length;
//   graphics.lineTo( posX, posY );
//   angle += Math.random() * 0.5;
// }
// graphics.lineTo( radius, 0 );
// graphics.endFill();

function getRandomPosition() {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    rotation: 0
  };
}

function getRandomShape() {
    return {
      primitive: Math.random() >= 0.5 ? 'circle' : 'box'
    };
}

for (let i = 0; i < NUM_ELEMENTS; i++) {
  world
    .createEntity()
    .addComponent(Motion, getRandomVelocity())
    .addComponent(Shape, getRandomShape())
    .addComponent(Position, getRandomPosition())
    .addComponent(Renderable)
}

// Run!
function run() {
  // Compute delta and elapsed time
  var time = performance.now();
  var delta = time - lastTime;
  // Run all the systems
  world.execute(delta, time);
  lastTime = time;
  requestAnimationFrame(run);
}
var lastTime = performance.now();
run();