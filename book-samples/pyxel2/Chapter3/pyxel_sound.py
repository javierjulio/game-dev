import pyxel
pyxel.init(120, 80, title="音の出力")

pyxel.sounds[0].set( # 効果音1
    "c0d0e0f0g0a0b0rc4d4e4f4g4a4b4",
    "P",
    "777777707777777",
    "N",
    30
)

pyxel.sounds[1].set( # 効果音2
    "c0c1c2c3c4c4c4",
    "T",
    "7777531",
    "S",
    5
)

def update(): # メイン処理
    if pyxel.btnp(pyxel.KEY_Z):
        pyxel.play(3, 0) # 効果音1を再生
    if pyxel.btnp(pyxel.KEY_X):
        pyxel.play(3, 1) # 効果音2を再生

def draw(): # 描画処理
    pyxel.cls(0)
    pyxel.text(1, 1, "[Z] SE1", 8)
    pyxel.text(1, 9, "[X] SE2", 12)

pyxel.run(update, draw)
