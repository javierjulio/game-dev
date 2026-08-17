from dataclasses import dataclass

import esper
import pyxel


@dataclass
class Position:
  x: float
  y: float


@dataclass
class Velocity:
  vx: float
  vy: float


@dataclass
class DrawableShape:
  width: float
  height: float
  color: int = 0
  shape: str = "rect"  # 'rect' or 'circ'


@dataclass
class PlayerControl:
  bullet_timer: int = 0
  shoot_delay: int = 6


@dataclass
class Hitbox:
  x1: int
  y1: int
  x2: int
  y2: int


@dataclass
class Bullet:
  side: int

  SIDE_PLAYER: int = 0
  SIDE_ENEMY: int = 1


FPS = 60
PLAYER_MOVE_SPEED = 4.0


class PlayerControlSystem:
  def process(self, dt):
    for _, (position, velocity, player) in esper.get_components(Position, Velocity, PlayerControl):
      if pyxel.btn(pyxel.KEY_LEFT):
        velocity.vx = -PLAYER_MOVE_SPEED
      if pyxel.btn(pyxel.KEY_RIGHT):
        velocity.vx = PLAYER_MOVE_SPEED
      if pyxel.btn(pyxel.KEY_UP):
        velocity.vy = -PLAYER_MOVE_SPEED
      if pyxel.btn(pyxel.KEY_DOWN):
        velocity.vy = PLAYER_MOVE_SPEED

      if pyxel.btnr(pyxel.KEY_LEFT) or pyxel.btnr(pyxel.KEY_RIGHT):
        velocity.vx = 0
      if pyxel.btnr(pyxel.KEY_UP) or pyxel.btnr(pyxel.KEY_DOWN):
        velocity.vy = 0

      # TODO: Refactor to use BoundToScreen component and move to MovementSystem
      # position.x = max(0, min(position.x, pyxel.width - 8))
      # position.y = max(0, min(position.y, pyxel.height - 8))

      if player.bullet_timer > 0:
        player.bullet_timer -= 1

      if pyxel.btn(pyxel.KEY_SPACE) and player.bullet_timer == 0:
        self.spawn_player_bullet(position.x + 4, position.y - 3)
        player.bullet_timer = player.shoot_delay

  def spawn_player_bullet(self, x: int, y: int):
    esper.create_entity(
      Position(x, y),
      Velocity(0, -5),
      Bullet(Bullet.SIDE_PLAYER),
      Hitbox(2, 1, 5, 6),
      DrawableShape(6, 6, color=pyxel.COLOR_RED, shape="circ"),
    )


class MovementSystem:
  def process(self, dt):
    for _, (position, velocity) in esper.get_components(Position, Velocity):
      position.x += velocity.vx * dt * FPS
      position.y += velocity.vy * dt * FPS


class RenderSystem:
  def process(self, dt):
    pyxel.cls(0)
    for _, (position, shape) in esper.get_components(Position, DrawableShape):
      if shape.shape == "rect":
        pyxel.rect(position.x, position.y, shape.width, shape.height, shape.color)
      elif shape.shape == "circ":
        pyxel.circ(position.x + shape.width // 2, position.y + shape.height // 2, shape.width // 2, shape.color)
      else:
        raise ValueError(f"Unknown shape type: {shape.shape}")


class App:
  def __init__(self):
    pyxel.init(480, 360, title="Shmup Game", fps=FPS)
    self.start()

  def start(self):
    esper.create_entity(Position(240, 10), Velocity(0, 2), DrawableShape(16, 16, color=pyxel.COLOR_LIME, shape="rect"))
    esper.create_entity(Position(100, 30), Velocity(0, 2), DrawableShape(16, 16, color=pyxel.COLOR_WHITE, shape="rect"))
    esper.create_entity(
      Position(pyxel.width // 2, pyxel.height - 30),
      Velocity(0, 0),
      PlayerControl(),
      DrawableShape(16, 16, color=pyxel.COLOR_DARK_BLUE, shape="rect"),
    )
    esper.add_processor(PlayerControlSystem(), priority=20)
    esper.add_processor(MovementSystem(), priority=30)
    esper.add_processor(RenderSystem(), priority=70)
    pyxel.run(self.update, self.draw)

  def restart(self):
    esper.remove_processor(MovementSystem)
    esper.remove_processor(PlayerControlSystem)
    esper.remove_processor(RenderSystem)
    esper.clear_database()
    self.start()

  def update(self):
    dt = 1 / FPS
    esper.process(dt)

  def draw(self):
    pass


App()
