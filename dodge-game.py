import pyxel
import random

MOVE_SPEED = 0.99


class DodgeGame:
  def __init__(self):
    pyxel.init(360, 240, title="Dodge Game", fps=60, quit_key=pyxel.KEY_Q)
    self.restart()
    pyxel.run(self.update, self.draw)

  def restart(self):
    self.player_x = pyxel.width // 2
    self.player_y = pyxel.height // 2
    self.enemies = []
    self.coins = []
    self.time = 0
    self.score = 0
    self.game_over = False

  def spawn_coin(self):
    x = random.randint(0, pyxel.width - 8)
    y = -8  # random.randint(0, pyxel.height - 8)
    self.coins.append({"x": x, "y": y})

  def spawn_enemy(self):
    x = random.randint(0, pyxel.width - 8)
    speed = random.uniform(0.3, 0.8)
    pattern = random.choice([0, 1, 2])  # 0: straight, 1: sine, 2: zigzag
    enemy = {
      "x": x,
      "y": -8,
      "speed": speed,
      "pattern": pattern,
      "amplitude": random.uniform(0.5, 1.5),
      "freq": random.uniform(-0.15, 0.15),
      "direction": 1,
      "zigzag_rate": random.randint(30, 60),
    }
    self.enemies.append(enemy)

  def collides(self, a_x, a_y, a_w, a_h, b_x, b_y, b_w, b_h):
    return a_x < b_x + b_w and a_x + a_w > b_x and a_y < b_y + b_h and a_y + a_h > b_y

  def update(self):
    if self.game_over and pyxel.btnp(pyxel.KEY_R):
      self.restart()
      return

    if not self.game_over:
      if pyxel.btn(pyxel.KEY_LEFT) or pyxel.btn(pyxel.KEY_A):
        self.player_x -= 1 * MOVE_SPEED
      if pyxel.btn(pyxel.KEY_RIGHT) or pyxel.btn(pyxel.KEY_D):
        self.player_x += 1 * MOVE_SPEED
      if pyxel.btn(pyxel.KEY_UP) or pyxel.btn(pyxel.KEY_W):
        self.player_y -= 1 * MOVE_SPEED
      if pyxel.btn(pyxel.KEY_DOWN) or pyxel.btn(pyxel.KEY_S):
        self.player_y += 1 * MOVE_SPEED

      self.player_x = max(0, min(self.player_x, pyxel.width - 8))
      self.player_y = max(0, min(self.player_y, pyxel.height - 8))

    if pyxel.frame_count % 80 == 0:
      self.spawn_coin()

    if pyxel.frame_count % 60 == 0:
      self.spawn_enemy()

    for enemy in self.enemies:
      if enemy["pattern"] == 0:  # Straight
        enemy["y"] += enemy["speed"]
      # elif enemy["pattern"] == 1:  # Sine wave
      #   enemy["y"] += enemy["speed"]
      #   enemy["x"] += enemy["speed"]
      #   enemy["y"] += math.cos(enemy["x"] * enemy["freq"]) * enemy["amplitude"]
      #   # enemy["x"] += math.sin(enemy["y"] * enemy["freq"]) * enemy["amplitude"]
      elif enemy["pattern"] == 2:  # Zigzag
        enemy["y"] += enemy["speed"]
        if (pyxel.frame_count % enemy["zigzag_rate"]) == 0:
          enemy["direction"] *= -1

        if enemy["direction"] > 0:
          enemy["x"] += enemy["speed"]
        else:
          enemy["x"] -= enemy["speed"]

        if enemy["x"] < 0:
          enemy["x"] = 0
          enemy["x"] += enemy["speed"]
        elif enemy["x"] > pyxel.width - 8:
          enemy["x"] = pyxel.width - 8
          enemy["x"] -= enemy["speed"]

    for coin in self.coins[:]:
      coin["y"] += 0.5
      if self.collides(self.player_x, self.player_y, 8, 8, coin["x"], coin["y"], 8, 8):
        self.coins.remove(coin)
        self.score += 10

    for enemy in self.enemies[:]:
      if enemy["y"] > pyxel.height:
        self.enemies.remove(enemy)
      elif self.collides(self.player_x, self.player_y, 8, 8, enemy["x"], enemy["y"], 8, 8):
        self.game_over = True

    if not self.game_over:
      self.time = pyxel.frame_count // 60

  def draw(self):
    pyxel.cls(0)
    pyxel.rect(self.player_x, self.player_y, 8, 8, 11)

    for enemy in self.enemies:
      pyxel.rect(int(enemy["x"]), int(enemy["y"]), 8, 8, 8)

    for coin in self.coins:
      pyxel.circ(coin["x"] + 4, coin["y"] + 4, 4, 10)

    if self.game_over:
      x = self.center_text("Game Over", pyxel.width)
      pyxel.text(x, pyxel.height // 2 - 5, "Game Over", 7)
      x = self.center_text("Press R to restart", pyxel.width)
      pyxel.text(x, pyxel.height // 2 + 5, "Press R to restart", 7)

    pyxel.text(5, pyxel.height - 20, f"Time: {self.time}", 7)
    pyxel.text(5, pyxel.height - 10, f"Score: {self.score}", 7)

  def center_text(self, text, page_width, char_width=pyxel.FONT_WIDTH):
    """Helper function for calculating the start x value for centered text."""
    text_width = len(text) * char_width
    return (page_width - text_width) // 2


DodgeGame()
