import pyxel
pyxel.init(160, 120, title="Pyxelの乱数")
pyxel.rseed(0)
for y in range(6):
    for x in range(8):
        cx = x * 20 + 10
        cy = y * 20 + 10
        col = pyxel.rndi(1, 15)
        pyxel.circ(cx, cy, 8, col)
pyxel.show()
