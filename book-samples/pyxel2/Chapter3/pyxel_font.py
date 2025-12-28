import pyxel
pyxel.init(120, 80, title="Bitmap Font")
bmpf = pyxel.Font("resource/misaki_gothic.bdf")
pyxel.text(0, 0, "ビットマップフォント", 8, bmpf)
pyxel.text(0, 10, "月火水木金土日", 11, bmpf)
pyxel.text(0, 20, "上下左右", 12, bmpf)
pyxel.show()
