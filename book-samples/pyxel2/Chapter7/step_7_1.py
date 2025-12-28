import pyxel

WIDTH, HEIGHT = 160, 120
pyxel.init(WIDTH, HEIGHT, title="Mini STG")
pyxel.images[0].load(0, 0, "resource/starships.png")
pyxel.images[1].load(0, 0, "resource/bg.png")

def scroll_bg(): # 背景のスクロール
    ofx = pyxel.frame_count % 16 # 画像をずらすための値を計算
    for i in range(11): # 床のスクロール
        pyxel.blt(i * 16 - ofx, HEIGHT - 16, 1, 0, 0, 16, 16)
    for i in range(1, 9): # グラデーション
        pyxel.dither(i / 8)
        pyxel.rect(0, HEIGHT - (13 - i) * 4, WIDTH, 4, 2)
    pyxel.dither(1.0)

def update(): # メイン処理（計算、判定を行う）
    pass # 後で処理を記述する

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    scroll_bg() # 画面をスクロールさせる関数を呼び出す

pyxel.run(update, draw)
