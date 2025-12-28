import pyxel
pyxel.init(120, 80, title="画像を動かす", fps=10)
pyxel.images[0].load(0, 0, "resource/swordman.png")

pl_x = 0

def update(): # メイン処理（更新処理）
    global pl_x
    pl_x = pl_x + 1
    if pl_x == 120:
        pl_x = 0

def draw(): # 描画処理
    pyxel.cls(3)
    pyxel.blt(pl_x, 0, 0, 0, 0, 16, 20, 13)

pyxel.run(update, draw)
