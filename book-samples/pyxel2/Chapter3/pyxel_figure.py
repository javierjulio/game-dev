import pyxel
pyxel.init(160, 120, title="Pyxelのウィンドウ")
pyxel.pset(5, 4, 8) # 点
pyxel.line(5, 5, 15, 105, 10) # 線
pyxel.rect(20, 10, 40, 30, 3) # 塗りつぶした矩形
pyxel.rectb(30, 50, 20, 60, 11) # 矩形の輪郭
pyxel.circ(80, 40, 10, 5) # 塗りつぶした円
pyxel.circb(80, 40, 15, 6) # 円の輪郭
pyxel.elli(100, 10, 40, 30, 2) # 塗りつぶした楕円
pyxel.ellib(110, 50, 20, 60, 4) # 楕円の輪郭
pyxel.tri(80, 70, 70, 100, 90, 100, 13) # 塗りつぶした三角形
pyxel.trib(80, 70, 70, 100, 90, 100, 7) # 三角形の輪郭
pyxel.show()
