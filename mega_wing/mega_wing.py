# title: Mega Wing
# author: Takashi Kitao
# desc: A shoot 'em up game with lots of bullets
# site: https://gihyo.jp/book/2025/978-4-297-14657-3
# license: MIT
# version: 1.1

import pyxel


# --------------------------------------------------
# Background class
# --------------------------------------------------
class Background:
  NUM_STARS = 100  # Number of stars

  # Initialize the background and register it with the game
  def __init__(self, game):
    self.game = game  # Reference to the game
    self.stars = []  # List of star positions and speeds

    # Initialize star positions and speeds
    for _ in range(Background.NUM_STARS):
      x = pyxel.rndi(0, pyxel.width - 1)  # X coordinate
      y = pyxel.rndi(0, pyxel.height - 1)  # Y coordinate
      vy = pyxel.rndf(1, 2.5)  # Vertical speed
      self.stars.append((x, y, vy))  # Store as a tuple

    # Register background in the game
    self.game.background = self

  # Update the background
  def update(self):
    for i, (x, y, vy) in enumerate(self.stars):
      y += vy
      if y >= pyxel.height:  # If the star goes off the bottom
        y -= pyxel.height  # Wrap it back to the top
      self.stars[i] = (x, y, vy)

  # Draw the background
  def draw(self):
    # Draw the galaxy image except on the title screen
    if self.game.scene != Game.SCENE_TITLE:
      pyxel.blt(0, 0, 1, 0, 0, 120, 160)

    # Draw stars
    for x, y, speed in self.stars:
      color = 12 if speed > 1.8 else 5  # Faster stars are brighter
      pyxel.pset(x, y, color)


# --------------------------------------------------
# Player (own ship) class
# --------------------------------------------------
class Player:
  MOVE_SPEED = 2  # Movement speed
  SHOT_INTERVAL = 6  # Frames between shots

  # Initialize the player and register it with the game
  def __init__(self, game, x, y):
    self.game = game  # Reference to the game
    self.x = x  # X coordinate
    self.y = y  # Y coordinate
    self.hit_area = (1, 1, 6, 6)  # Collision area (x1, y1, x2, y2)
    self.shot_timer = 0  # Time until next shot

    # Register the player in the game
    self.game.player = self

  # Apply damage to the player
  def add_damage(self):
    # Create an explosion effect
    Blast(self.game, self.x + 4, self.y + 4)

    # Stop BGM and play explosion sound
    pyxel.stop()
    pyxel.play(0, 2)

    # Remove the player
    self.game.player = None

    # Switch to the game over scene
    self.game.change_scene(self.game.SCENE_GAMEOVER)

  # Update the player
  def update(self):
    # Move the player based on input
    if pyxel.btn(pyxel.KEY_LEFT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_LEFT):
      self.x -= Player.MOVE_SPEED
    if pyxel.btn(pyxel.KEY_RIGHT) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_RIGHT):
      self.x += Player.MOVE_SPEED
    if pyxel.btn(pyxel.KEY_UP) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_UP):
      self.y -= Player.MOVE_SPEED
    if pyxel.btn(pyxel.KEY_DOWN) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_DOWN):
      self.y += Player.MOVE_SPEED

    # Prevent the player from leaving the screen
    self.x = max(0, min(self.x, pyxel.width - 8))
    self.y = max(0, min(self.y, pyxel.height - 8))

    # Handle shooting cooldown
    if self.shot_timer > 0:
      self.shot_timer -= 1

    # Fire a bullet
    if (
      pyxel.btn(pyxel.KEY_SPACE) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_A)
    ) and self.shot_timer == 0:
      Bullet(self.game, Bullet.SIDE_PLAYER, self.x, self.y - 3, -90, 5)

      # Play shot sound
      pyxel.play(3, 0)

      # Reset shot timer
      self.shot_timer = Player.SHOT_INTERVAL

  # Draw the player
  def draw(self):
    pyxel.blt(self.x, self.y, 0, 0, 0, 8, 8, 0)


# --------------------------------------------------
# Enemy class
# --------------------------------------------------
class Enemy:
  KIND_A = 0  # Enemy type A
  KIND_B = 1  # Enemy type B
  KIND_C = 2  # Enemy type C

  # Initialize an enemy and register it with the game
  def __init__(self, game, kind, level, x, y):
    self.game = game
    self.kind = kind  # Enemy type
    self.level = level  # Strength level
    self.x = x
    self.y = y
    self.hit_area = (0, 0, 7, 7)
    self.armor = self.level - 1  # Armor points
    self.life_time = 0  # Time alive
    self.is_damaged = False  # Damage flash flag

    # Register enemy in the game
    self.game.enemies.append(self)

  # Apply damage to the enemy
  def add_damage(self):
    if self.armor > 0:
      self.armor -= 1
      self.is_damaged = True

      # Play damage sound (interrupt on channel 2)
      pyxel.play(2, 1, resume=True)
      return

    # Create explosion effect
    Blast(self.game, self.x + 4, self.y + 4)

    # Play explosion sound
    pyxel.play(2, 2, resume=True)

    # Remove enemy
    if self in self.game.enemies:
      self.game.enemies.remove(self)

    # Add score
    self.game.score += self.level * 10

  # Calculate angle toward the player
  def calc_player_angle(self):
    player = self.game.player
    if player is None:
      return 90
    return pyxel.atan2(player.y - self.y, player.x - self.x)

  # Update enemy behavior
  def update(self):
    self.life_time += 1

    # Enemy A: moves forward, shoots at the player
    if self.kind == Enemy.KIND_A:
      self.y += 1.2
      if self.life_time % 50 == 0:
        angle = self.calc_player_angle()
        Bullet(self.game, Bullet.SIDE_ENEMY, self.x, self.y, angle, 2)

    # Enemy B: moves forward and zigzags horizontally
    elif self.kind == Enemy.KIND_B:
      self.y += 1
      if (self.life_time // 30) % 2 == 0:
        self.x += 1.2
      else:
        self.x -= 1.2

    # Enemy C: slow forward movement, fires in four directions
    elif self.kind == Enemy.KIND_C:
      self.y += 0.8
      if self.life_time % 40 == 0:
        for i in range(4):
          Bullet(self.game, Bullet.SIDE_ENEMY, self.x, self.y, i * 45 + 22, 2)

    # Remove enemy if it leaves the screen
    if self.y >= pyxel.height and self in self.game.enemies:
      self.game.enemies.remove(self)

  # Draw the enemy
  def draw(self):
    if self.is_damaged:
      self.is_damaged = False
      for i in range(1, 15):
        pyxel.pal(i, 15)
      pyxel.blt(self.x, self.y, 0, self.kind * 8 + 8, 0, 8, 8, 0)
      pyxel.pal()
    else:
      pyxel.blt(self.x, self.y, 0, self.kind * 8 + 8, 0, 8, 8, 0)


# --------------------------------------------------
# Bullet class
# --------------------------------------------------
class Bullet:
  SIDE_PLAYER = 0  # Player bullet
  SIDE_ENEMY = 1  # Enemy bullet

  # Initialize a bullet and register it with the game
  def __init__(self, game, side, x, y, angle, speed):
    self.game = game
    self.side = side
    self.x = x
    self.y = y
    self.vx = pyxel.cos(angle) * speed
    self.vy = pyxel.sin(angle) * speed

    # Register bullet based on its side
    if self.side == Bullet.SIDE_PLAYER:
      self.hit_area = (2, 1, 5, 6)
      game.player_bullets.append(self)
    else:
      self.hit_area = (2, 2, 5, 5)
      game.enemy_bullets.append(self)

  # Remove the bullet
  def add_damage(self):
    if self.side == Bullet.SIDE_PLAYER:
      if self in self.game.player_bullets:
        self.game.player_bullets.remove(self)
    else:
      if self in self.game.enemy_bullets:
        self.game.enemy_bullets.remove(self)

  # Update bullet position
  def update(self):
    self.x += self.vx
    self.y += self.vy

    # Remove bullet if it leaves the screen
    if self.x <= -8 or self.x >= pyxel.width or self.y <= -8 or self.y >= pyxel.height:
      if self.side == Bullet.SIDE_PLAYER:
        self.game.player_bullets.remove(self)
      else:
        self.game.enemy_bullets.remove(self)

  # Draw the bullet
  def draw(self):
    src_x = 0 if self.side == Bullet.SIDE_PLAYER else 8
    pyxel.blt(self.x, self.y, 0, src_x, 8, 8, 8, 0)


# --------------------------------------------------
# Explosion effect class
# --------------------------------------------------
class Blast:
  START_RADIUS = 1  # Initial radius
  END_RADIUS = 8  # Maximum radius

  def __init__(self, game, x, y):
    self.game = game
    self.x = x
    self.y = y
    self.radius = Blast.START_RADIUS

    # Register explosion effect
    game.blasts.append(self)

  # Update explosion effect
  def update(self):
    self.radius += 1
    if self.radius > Blast.END_RADIUS:
      self.game.blasts.remove(self)

  # Draw explosion effect
  def draw(self):
    pyxel.circ(self.x, self.y, self.radius, 7)
    pyxel.circb(self.x, self.y, self.radius, 10)


# --------------------------------------------------
# Collision detection
# --------------------------------------------------
def check_collision(entity1, entity2):
  e1x1 = entity1.x + entity1.hit_area[0]
  e1y1 = entity1.y + entity1.hit_area[1]
  e1x2 = entity1.x + entity1.hit_area[2]
  e1y2 = entity1.y + entity1.hit_area[3]

  e2x1 = entity2.x + entity2.hit_area[0]
  e2y1 = entity2.y + entity2.hit_area[1]
  e2x2 = entity2.x + entity2.hit_area[2]
  e2y2 = entity2.y + entity2.hit_area[3]

  # Axis-aligned bounding box collision check
  if e1x1 > e2x2 or e1x2 < e2x1:
    return False
  if e1y1 > e2y2 or e1y2 < e2y1:
    return False

  return True


# --------------------------------------------------
# Game class (manages the entire game)
# --------------------------------------------------
class Game:
  SCENE_TITLE = 0
  SCENE_PLAY = 1
  SCENE_GAMEOVER = 2

  def __init__(self):
    # Initialize Pyxel
    pyxel.init(120, 160, title="Mega Wing")

    # Load resources
    pyxel.load("mega_wing.pyxres")

    # Initialize game state
    self.score = 0
    self.scene = None
    self.play_time = 0
    self.level = 0
    self.background = None
    self.player = None
    self.enemies = []
    self.player_bullets = []
    self.enemy_bullets = []
    self.blasts = []

    # Create background (always exists)
    Background(self)

    # Start on the title screen
    self.change_scene(Game.SCENE_TITLE)

    # Run the game loop
    pyxel.run(self.update, self.draw)

  # Change the current scene
  def change_scene(self, scene):
    self.scene = scene

    if scene == Game.SCENE_TITLE:
      self.player = None
      self.enemies.clear()
      self.player_bullets.clear()
      self.enemy_bullets.clear()
      pyxel.playm(0, loop=True)

    elif scene == Game.SCENE_PLAY:
      self.score = 0
      self.play_time = 0
      self.level = 1
      pyxel.playm(1, loop=True)
      Player(self, 56, 140)

    elif scene == Game.SCENE_GAMEOVER:
      self.display_timer = 60
      self.player = None

  # Update the entire game
  def update(self):
    self.background.update()

    if self.player:
      self.player.update()

    for enemy in self.enemies.copy():
      enemy.update()
      if self.player and check_collision(self.player, enemy):
        self.player.add_damage()

    for bullet in self.player_bullets.copy():
      bullet.update()
      for enemy in self.enemies.copy():
        if check_collision(enemy, bullet):
          bullet.add_damage()
          enemy.add_damage()

    for bullet in self.enemy_bullets.copy():
      bullet.update()
      if self.player and check_collision(self.player, bullet):
        bullet.add_damage()
        self.player.add_damage()

    for blast in self.blasts.copy():
      blast.update()

    if self.scene == Game.SCENE_TITLE:
      if pyxel.btnp(pyxel.KEY_RETURN) or pyxel.btnp(pyxel.GAMEPAD1_BUTTON_START):
        pyxel.stop()
        self.change_scene(Game.SCENE_PLAY)

    elif self.scene == Game.SCENE_PLAY:
      self.play_time += 1
      self.level = self.play_time // 450 + 1

      spawn_interval = max(60 - self.level * 10, 10)
      if self.play_time % spawn_interval == 0:
        kind = pyxel.rndi(Enemy.KIND_A, Enemy.KIND_C)
        Enemy(self, kind, self.level, pyxel.rndi(0, 112), -8)

    elif self.scene == Game.SCENE_GAMEOVER:
      if self.display_timer > 0:
        self.display_timer -= 1
      else:
        self.change_scene(Game.SCENE_TITLE)

  # Draw the entire game
  def draw(self):
    pyxel.cls(0)

    self.background.draw()

    if self.player:
      self.player.draw()

    for enemy in self.enemies:
      enemy.draw()

    for bullet in self.player_bullets:
      bullet.draw()

    for bullet in self.enemy_bullets:
      bullet.draw()

    for blast in self.blasts:
      blast.draw()

    pyxel.text(39, 4, f"SCORE {self.score:5}", 7)

    if self.scene == Game.SCENE_TITLE:
      pyxel.blt(0, 18, 2, 0, 0, 120, 120, 15)
      pyxel.text(31, 148, "- PRESS ENTER -", 6)

    elif self.scene == Game.SCENE_GAMEOVER:
      pyxel.text(43, 78, "GAME OVER", 8)


# --------------------------------------------------
# Create and start the game
# --------------------------------------------------
Game()
