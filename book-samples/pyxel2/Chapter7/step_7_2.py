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

pl_x, pl_y = 30, 40 # 自機の座標を代入する変数

def move_player(): # 自機をカーソルキーで動かす
    global pl_x, pl_y
    if pyxel.btn(pyxel.KEY_UP) and pl_y > 12: # 上キー
        pl_y -= 2
    if pyxel.btn(pyxel.KEY_DOWN) and pl_y < HEIGHT - 20: # 下キー
        pl_y += 2
    if pyxel.btn(pyxel.KEY_LEFT) and pl_x > 10: # 左キー
        pl_x -= 2
    if pyxel.btn(pyxel.KEY_RIGHT) and pl_x < WIDTH - 10: # 右キー
        pl_x += 2

def update(): # メイン処理（計算、判定を行う）
    move_player() # 自機の移動

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    scroll_bg() # 画面をスクロールさせる関数を呼び出す
    pyxel.blt(pl_x - 8, pl_y - 4, 0, 0, 0, 16, 8, 0) # 自機の表示

pyxel.run(update, draw)
