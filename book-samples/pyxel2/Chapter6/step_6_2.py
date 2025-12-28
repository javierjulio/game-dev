import pyxel

WIDTH, HEIGHT = 160, 120 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="OBAKE BUSTER")
pyxel.images[0].load(0, 0, "resource/ghost.png") # おばけの画像を読み込む
pyxel.images[1].load(0, 0, "resource/bg.png")    # 背景の画像を読み込む

# おばけを制御するための変数
obake_x = 0
obake_y = 0
obake_vx = 2
obake_vy = 1

def move_obake(): # おばけを動かす
    global obake_x, obake_y, obake_vx, obake_vy
    obake_x = obake_x + obake_vx
    obake_y = obake_y + obake_vy
    if obake_x < 0 and obake_vx < 0: # 画面左端
        obake_vx = -obake_vx
    if obake_x > WIDTH and obake_vx > 0: # 右端
        obake_vx = -obake_vx
    if obake_y < 0 and obake_vy < 0: # 上端
        obake_vy = -obake_vy
    if obake_y > HEIGHT and obake_vy > 0: # 下端
        obake_vy = -obake_vy

def draw_obake(): # おばけを表示する
    pyxel.blt(obake_x - 16, obake_y - 16, 0, 0, 0, 32, 32, 4)

def update(): # メイン処理（計算、判定を行う）
    move_obake()

def draw(): # 描画処理
    pyxel.blt(0, 0, 1, 0, 0, WIDTH, HEIGHT) # 背景
    draw_obake()

pyxel.run(update, draw)
