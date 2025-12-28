import pyxel
pyxel.init(120, 80, title="キーとマウスの入力")
pyxel.mouse(True)

def update(): # メイン処理
    pass

def draw(): # 描画処理
    pyxel.cls(0)
    if pyxel.btn(pyxel.KEY_UP):
        pyxel.text(1, 1, "UP", 6)
    if pyxel.btn(pyxel.KEY_DOWN):
        pyxel.text(1, 11, "DOWN", 6)
    if pyxel.btn(pyxel.KEY_LEFT):
        pyxel.text(1, 21, "LEFT", 6)
    if pyxel.btn(pyxel.KEY_RIGHT):
        pyxel.text(1, 31, "RIGHT", 6)

    mxy = f'({pyxel.mouse_x}, {pyxel.mouse_y})'
    pyxel.text(60, 1, mxy, 7)
    if pyxel.btn(pyxel.MOUSE_BUTTON_LEFT):
        pyxel.text(60, 11, "LEFT BTN", 10)
    if pyxel.btn(pyxel.MOUSE_BUTTON_RIGHT):
        pyxel.text(60, 21, "RIGHT BTN", 10)

pyxel.run(update, draw)
