import pyxel
pyxel.init(160, 120, title="Pyxelのウィンドウ")
pyxel.text(0, 0, "Pyxel", 8)
for i in range(10):
    pyxel.text(i*6, 10, str(i), 10)
pyxel.show()
