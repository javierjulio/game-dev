import pyxel

WIDTH, HEIGHT = 160, 120 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="OBAKE BUSTER")
pyxel.images[0].load(0, 0, "resource/ghost.png") # おばけの画像を読み込む
pyxel.images[1].load(0, 0, "resource/bg.png")    # 背景の画像を読み込む

def update(): # メイン処理（計算、判定を行う）
    pass # 後で処理を記述する

def draw(): # 描画処理
    pyxel.blt(0, 0, 1, 0, 0, WIDTH, HEIGHT) # 背景
    pyxel.blt(20, 10, 0, 0, 0, 32, 32, 4) # おばけ

pyxel.run(update, draw)
