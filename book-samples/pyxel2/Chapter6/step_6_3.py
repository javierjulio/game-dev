import pyxel

WIDTH, HEIGHT = 160, 120 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="OBAKE BUSTER")
pyxel.images[0].load(0, 0, "resource/ghost.png") # おばけの画像を読み込む
pyxel.images[1].load(0, 0, "resource/bg.png")    # 背景の画像を読み込む

# おばけを制御するための配列
OBAKE_MAX = 5 # おばけの数
obake_x = [0] * OBAKE_MAX
obake_y = [0] * OBAKE_MAX
obake_vx = [0] * OBAKE_MAX
obake_vy = [0] * OBAKE_MAX

def set_obake(n): # おばけの座標と速さをセットする
    obake_x[n] = pyxel.rndi(0, WIDTH)  # ┬ 出現位置
    obake_y[n] = pyxel.rndi(0, HEIGHT) # ┘
    obake_vx[n] = pyxel.rndi(-1, 1) # ┬ 各軸方向の速さ
    obake_vy[n] = pyxel.rndi(-1, 1) # ┘

def move_obake(): # おばけを動かす
    for i in range(OBAKE_MAX):
        obake_x[i] = obake_x[i] + obake_vx[i]
        obake_y[i] = obake_y[i] + obake_vy[i]
        if obake_x[i] < 0 and obake_vx[i] < 0: # 画面左端
            obake_vx[i] = -obake_vx[i]
        if obake_x[i] > WIDTH and obake_vx[i] > 0: # 右端
            obake_vx[i] = -obake_vx[i]
        if obake_y[i] < 0 and obake_vy[i] < 0: # 上端
            obake_vy[i] = -obake_vy[i]
        if obake_y[i] > HEIGHT and obake_vy[i] > 0: # 下端
            obake_vy[i] = -obake_vy[i]

def draw_obake(): # おばけを表示する
    for i in range(OBAKE_MAX):
        pyxel.blt(obake_x[i] - 16, obake_y[i] - 16, 0, 0, 0, 32, 32, 4)

def update(): # メイン処理（計算、判定を行う）
    move_obake()

def draw(): # 描画処理
    pyxel.blt(0, 0, 1, 0, 0, WIDTH, HEIGHT) # 背景
    draw_obake()

for i in range(OBAKE_MAX): # 仮：完成させる時にupdate()内に移動する
    set_obake(i)

pyxel.run(update, draw)
