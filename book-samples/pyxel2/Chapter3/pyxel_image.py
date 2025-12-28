import pyxel
pyxel.init(120, 80, title="画像の表示")
pyxel.images[0].load(0, 0, "resource/swordman.png")
pyxel.blt(0, 0, 0, 0, 0, 16, 20)
pyxel.show()
