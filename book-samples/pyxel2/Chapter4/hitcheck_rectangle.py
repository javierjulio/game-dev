import pyxel
pyxel.init(160, 120, title="ヒットチェック 矩形")

rx, ry = 0, 0
R_W, R_H = 30, 20
bx, by = 80, 60
B_W, B_H = 40, 60

def update(): # メイン処理（更新処理）
    global rx, ry
    if pyxel.btn(pyxel.KEY_UP):    ry = ry - 1
    if pyxel.btn(pyxel.KEY_DOWN):  ry = ry + 1
    if pyxel.btn(pyxel.KEY_LEFT):  rx = rx - 1
    if pyxel.btn(pyxel.KEY_RIGHT): rx = rx + 1

def draw(): # 描画処理
    pyxel.cls(0)
    col = 8 # 赤
    dx = abs(rx - bx)
    dy = abs(ry - by)
    if dx <= (R_W + B_W) / 2 and dy <= (R_H + B_H) / 2:
        col = 10 # 黄色
    pyxel.rect(rx - R_W / 2, ry - R_H / 2, R_W, R_H, col)
    pyxel.rect(bx - B_W / 2, by - B_H / 2, B_W, B_H, 12)

pyxel.run(update, draw)
