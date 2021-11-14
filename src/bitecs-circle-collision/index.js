import {
  createWorld,
  Types,
  defineComponent,
  defineQuery,
  addEntity,
  addComponent,
  pipe,
} from 'bitecs'

const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }
const Position = defineComponent(Vector3)
const Velocity = defineComponent(Vector3)
const Shape = defineComponent({ radius: Types.f32, color: Types.f32 })

const movementQuery = defineQuery([Position, Velocity])
const rendererQuery = defineQuery([Position, Velocity, Shape])

const collisionQuery = defineQuery([Position, Velocity, Shape])

const collisionSystem = (world) => {
  const ents = collisionQuery(world)

  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i]
    const rest = ents.slice(i + 1)
    for (let j = 0; j < rest.length; j++) {
      const id = rest[j]

      var dx = Position.x[eid] - Position.x[id]
      var dy = Position.y[eid] - Position.y[id]
      var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

      if (distance <= Shape.radius[eid] + Shape.radius[id]) {
        const vx = Position.x[eid] - Position.x[id]
        const vy = Position.y[eid] - Position.y[id]

        const unitNormalX = vx / distance
        const unitNormalY = vy / distance
        const unitTangentX = -unitNormalY;
        const unitTangentY = unitNormalX;

        const a_n = Velocity.x[eid] * unitNormalX + Velocity.y[eid] * unitNormalY
        const b_n = Velocity.x[id] * unitNormalX + Velocity.y[id] * unitNormalY
        const a_t = Velocity.x[eid] * unitTangentX + Velocity.y[eid] * unitTangentY
        const b_t = Velocity.x[id] * unitTangentX + Velocity.y[id] * unitTangentY

        // TODO: replace radius (third instance) with a "mass" parameter
        const a_n_final = (a_n * (Shape.radius[eid] - Shape.radius[id]) +
          2 * Shape.radius[id] * b_n) / (Shape.radius[eid] + Shape.radius[id]);
        const b_n_final = (b_n * (Shape.radius[id] - Shape.radius[eid]) +
          2 * Shape.radius[eid] * a_n) / (Shape.radius[eid] + Shape.radius[id]);

        const a_n_x = unitNormalX * a_n_final
        const a_n_y = unitNormalY * a_n_final
        const b_n_x = unitNormalX * b_n_final
        const b_n_y = unitNormalY * b_n_final

        const a_t_x = unitTangentX * a_t
        const a_t_y = unitTangentY * a_t
        const b_t_x = unitTangentX * b_t
        const b_t_y = unitTangentY * b_t

        Velocity.x[eid] = a_n_x + a_t_x
        Velocity.y[eid] = a_n_y + a_t_y
        Velocity.x[id] = b_n_x + b_t_x
        Velocity.y[id] = b_n_y + b_t_y
      }
    }
  }
  return world
}

const movementSystem = (world) => {
  const ents = movementQuery(world)
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i]
    Position.x[eid] += Velocity.x[eid]
    Position.y[eid] += Velocity.y[eid]
    Position.z[eid] += Velocity.z[eid]

    if (Position.x[eid] - Shape.radius[eid] < 0) {
      Velocity.x[eid] = Math.abs(Velocity.x[eid]);
    } else if (Position.x[eid] + Shape.radius[eid] > canvasWidth) {
      Velocity.x[eid] = -Math.abs(Velocity.x[eid]);
    }

    if (Position.y[eid] - Shape.radius[eid] < 0) {
      Velocity.y[eid] = Math.abs(Velocity.y[eid]);
    } else if (Position.y[eid] + Shape.radius[eid] > canvasHeight) {
      Velocity.y[eid] = -Math.abs(Velocity.y[eid]);
    }
  }
  return world
}

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width = window.innerWidth
let canvasHeight = canvas.height = window.innerHeight;

if (window.devicePixelRatio > 1) {
  canvas.width = canvasWidth * window.devicePixelRatio;
  canvas.height = canvasHeight * window.devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

const rendererSystem = (world) => {
  const ents = rendererQuery(world)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i]

    ctx.beginPath();
    ctx.arc(Position.x[eid], Position.y[eid], Shape.radius[eid], 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${Shape.color[eid]}, 50%, 50%)`
    ctx.fill()
    // ctx.strokeStyle = "white";
    // ctx.stroke();
  }
  return world
}

const timeSystem = world => {
  const { time } = world
  const now = performance.now()
  const delta = now - time.then
  time.delta = delta
  time.elapsed += delta
  time.then = now
  return world
}

const pipeline = pipe(movementSystem, collisionSystem, rendererSystem, timeSystem)

const world = createWorld()
world.time = { delta: 0, elapsed: 0, then: performance.now() }

const generateEntity = (x, y, vx, vy, radius) => {
  const eid = addEntity(world)
  addComponent(world, Position, eid)
  Position.x[eid] = x
  Position.y[eid] = y

  addComponent(world, Velocity, eid)
  Velocity.x[eid] = vx
  Velocity.y[eid] = vy

  addComponent(world, Shape, eid)
  Shape.radius[eid] = radius
  Shape.color[eid] = Math.random() * 360
}

const DESIRED_NUM_OBJECTS = 100
const MIN_RADIUS = 8
const MAX_RADIUS = 32
const SPEED_MULTIPLIER = .4;

const safeAreas = []
const size = MAX_RADIUS * 2
const start = MAX_RADIUS
const maxHeight = canvasHeight - MAX_RADIUS
const maxWidth = canvasWidth - MAX_RADIUS

for (let x = start; x < maxWidth; x += size) {
  for (let y = start; y < maxHeight; y += size) {
    safeAreas.push({ x: x, y: y})
  }
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

const maxCells = Math.min(DESIRED_NUM_OBJECTS, safeAreas.length)
for (let i = 0; i < maxCells; i++) {
  const randomIndex = Math.floor(Math.random() * safeAreas.length)
  const safeArea = safeAreas.splice(randomIndex, 1)[0]

  generateEntity(
    safeArea.x,
    safeArea.y,
    SPEED_MULTIPLIER * (2 * Math.random() - 1),
    SPEED_MULTIPLIER * (2 * Math.random() - 1),
    Math.floor(randomRange(MIN_RADIUS, MAX_RADIUS))
  )
}
window.generateEntity = generateEntity
// generateEntity(40, 40, SPEED_MULTIPLIER * (2 * Math.random() - 1), SPEED_MULTIPLIER * (2 * Math.random() - 1), MAX_RADIUS)
// generateEntity(40, 280, SPEED_MULTIPLIER * (2 * Math.random() - 1), SPEED_MULTIPLIER * (2 * Math.random() - 1), MAX_RADIUS)

const run = () => {
  pipeline(world)
  requestAnimationFrame(run)
}
window.run = run
run()

// setInterval(() => {
//   pipeline(world)
// }, 16)

// // Run!
// function run() {
//   // Compute delta and elapsed time
//   var time = performance.now();
//   var delta = time - lastTime;
//   // Run all the systems
//   world.execute(delta, time);
//   lastTime = time;
//   requestAnimationFrame(run);
// }
// var lastTime = performance.now();
// run();





// import {
//   createWorld,
//   Types,
//   defineComponent,
//   defineQuery,
//   addEntity,
//   addComponent,
//   pipe,
// } from 'bitecs'
// import InputManager from './input-manager'

// const input = new InputManager(window)
// input.addEventListeners()

// const SHAPE_ASTEROID = 0
// const SHAPE_SPACESHIP = 1

// const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }
// const Position = defineComponent(Vector3)
// const Velocity = defineComponent(Vector3)
// const PlayerControlled = defineComponent()
// const Asteroid = defineComponent()
// const Shape = defineComponent({ type: Types.f32 })

// const movementQuery = defineQuery([Position, Velocity])
// const motionControlQuery = defineQuery([Position, Velocity, PlayerControlled])
// const rendererQuery = defineQuery([Position, Velocity, Shape])

// // asteroids collide with player (game over)
// // bullets collide with asteroid (hit)
// // asteroids DO NOT COLLIDE with other asteroids

// const asteroidQuery = defineQuery([Position, Velocity, Asteroid])
// const playerQuery = defineQuery([Position, Velocity, PlayerControlled])

// const collisionSystem = (world) => {
//   const player = playerQuery(world)
//   const ents = asteroidQuery(world)

//   for (let i = 0; i < player.length; i++) {
//     const eid = player[i]

//     for (let j = 0; j < ents.length; j++) {
//       const id = ents[j]

//       if (eid === id) {
//         continue;
//       }

//       const radius = 10
//       var dx = (Position.x[eid] + radius) - (Position.x[id] + radius);
//       var dy = (Position.y[eid] + radius) - (Position.y[id] + radius);
//       var distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance < radius + radius) {
//         console.log("collision detected")
//         Velocity.x[eid] *= -1
//         Velocity.y[eid] *= -1
//         Velocity.x[id] *= -1
//         Velocity.y[id] *= -1
//       }
//     }
//   }

//   // // for (let i = 0; i < ents.length; i++) {
//   // //   const eid = ents[i]

//   // //   for (let j = 0; j < ents.length; j++) {
//   // //     const id = ents[j]

//   // //     if (eid === id) {
//   // //       continue;
//   // //     }

//   //     const radius = 10
//   //     const eid = 0
//   //     const id = 1
//   //     var dx = (Position.x[eid] + radius) - (Position.x[id] + radius);
//   //     var dy = (Position.y[eid] + radius) - (Position.y[id] + radius);
//   //     var distance = Math.sqrt(dx * dx + dy * dy);

//   //     if (distance < radius + radius) {
//   //       console.log("collision detected")
//   //       Velocity.x[eid] *= -1
//   //       Velocity.y[eid] *= -1
//   //       Velocity.x[id] *= -1
//   //       Velocity.y[id] *= -1
//   //     }
//   // //   }
//   // // }
//   return world
// }

// const movementSystem = (world) => {
//   const ents = movementQuery(world)
//   for (let i = 0; i < ents.length; i++) {
//     const eid = ents[i]
//     Position.x[eid] += Velocity.x[eid]
//     Position.y[eid] += Velocity.y[eid]
//     Position.z[eid] += Velocity.z[eid]
//   }
//   return world
// }

// const motionControlSystem = (world) => {
//   const ents = motionControlQuery(world)
//   for (let i = 0; i < ents.length; i++) {
//     const eid = ents[i]
//     if (input.keyPoll.up !== 0) {
//       Velocity.y[eid] -= 0.01
//     } else if (input.keyPoll.down !== 0) {
//       Velocity.y[eid] += 0.01
//     }
//     if (input.keyPoll.left !== 0) {
//       Velocity.x[eid] -= 0.01
//     } else if (input.keyPoll.right !== 0) {
//       Velocity.x[eid] += 0.01
//     }
//   }
//   return world
// }

// let canvas = document.querySelector("canvas");
// let canvasWidth = canvas.width = window.innerWidth;
// let canvasHeight = canvas.height = window.innerHeight;
// let ctx = canvas.getContext("2d");

// const rendererSystem = (world) => {
//   const ents = rendererQuery(world)
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight)
//   for (let i = 0; i < ents.length; i++) {
//     const eid = ents[i]

//     if (Shape.type[eid] === SHAPE_ASTEROID) {
//       ctx.beginPath();
//       ctx.arc(Position.x[eid], Position.y[eid], 10, 0, 2 * Math.PI);
//       ctx.strokeStyle = "white";
//       ctx.stroke();
//     }
//     else if (Shape.type[eid] === SHAPE_SPACESHIP) {
//       ctx.beginPath();
//       ctx.arc(Position.x[eid], Position.y[eid], 10, 0, 2 * Math.PI);
//       ctx.fillStyle = "white";
//       ctx.fill();
//     }
//   }
//   return world
// }

// const timeSystem = world => {
//   const { time } = world
//   const now = performance.now()
//   const delta = now - time.then
//   time.delta = delta
//   time.elapsed += delta
//   time.then = now
//   return world
// }

// const pipeline = pipe(motionControlSystem, movementSystem, collisionSystem, rendererSystem, timeSystem)

// const world = createWorld()
// world.time = { delta: 0, elapsed: 0, then: performance.now() }

// const generateAsteroid = (x, y) => {
//   const eid = addEntity(world)
//   addComponent(world, Asteroid, eid)

//   addComponent(world, Position, eid)
//   Position.x[eid] = x
//   Position.y[eid] = y

//   addComponent(world, Velocity, eid)
//   Velocity.x[eid] = 0.1
//   Velocity.y[eid] = 0.1

//   addComponent(world, Shape, eid)
//   Shape.type[eid] = SHAPE_ASTEROID
// }

// generateAsteroid(0, 0)
// generateAsteroid(50, 0)

// const createPlayer = (x, y, vx, vy) => {
//   const eid = addEntity(world)
//   addComponent(world, PlayerControlled, eid)
//   addComponent(world, Position, eid)
//   Position.x[eid] = x
//   Position.y[eid] = y
//   addComponent(world, Velocity, eid)
//   Velocity.x[eid] = vx
//   Velocity.y[eid] = vy
//   addComponent(world, Shape, eid)
//   Shape.type[eid] = SHAPE_SPACESHIP
// }

// createPlayer(100, 0, -0.1, 0.1)

// const run = () => {
//   pipeline(world)
//   requestAnimationFrame(run)
// }
// run()

// // setInterval(() => {
// //   pipeline(world)
// // }, 16)

// // // Run!
// // function run() {
// //   // Compute delta and elapsed time
// //   var time = performance.now();
// //   var delta = time - lastTime;
// //   // Run all the systems
// //   world.execute(delta, time);
// //   lastTime = time;
// //   requestAnimationFrame(run);
// // }
// // var lastTime = performance.now();
// // run();
