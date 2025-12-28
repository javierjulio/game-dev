import pyxel

WIDTH, HEIGHT = 120, 80
pyxel.init(WIDTH, HEIGHT, title="キャラクターの移動")
pyxel.images[0].load(0, 0, "resource/character.png")

pl_x = WIDTH // 2
pl_y = HEIGHT // 2

def update(): # メイン処理（更新処理）
    global pl_x, pl_y
    if pyxel.btn(pyxel.KEY_UP) and pl_y > 11:
        pl_y = pl_y - 1
    if pyxel.btn(pyxel.KEY_DOWN) and pl_y < 70:
        pl_y = pl_y + 1
    if pyxel.btn(pyxel.KEY_LEFT) and pl_x > 8:
        pl_x = pl_x - 1
    if pyxel.btn(pyxel.KEY_RIGHT) and pl_x < 112:
        pl_x = pl_x + 1

def draw(): # 描画処理
    pyxel.cls(3)
    pyxel.blt(pl_x - 8, pl_y - 12, 0, 0, 0, 16, 24, 13)
    xy = f'({pl_x}, {pl_y})'
    pyxel.text(1, 1, xy, 7)

pyxel.run(update, draw)
