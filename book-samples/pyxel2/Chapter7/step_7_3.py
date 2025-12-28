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
    if pyxel.btnp(pyxel.KEY_SPACE, 0, 10): # スペースキー
        set_bullet(pl_x, pl_y, 10, 0)

# 自機から発射する弾を制御する配列
BUL_MAX = 10
bul_x  = [0] * BUL_MAX
bul_y  = [0] * BUL_MAX
bul_vx = [0] * BUL_MAX
bul_vy = [0] * BUL_MAX
bul_flag = [False] * BUL_MAX

def set_bullet(x, y, vx, vy): # 弾をセットする
    for i in range(BUL_MAX):
        if bul_flag[i] == True: continue
        bul_x[i] = x
        bul_y[i] = y
        bul_vx[i] = vx
        bul_vy[i] = vy
        bul_flag[i] = True
        break

def move_bullet(): # 弾を動かす
    for i in range(BUL_MAX):
        if bul_flag[i] == False: continue
        bul_x[i] += bul_vx[i]
        bul_y[i] += bul_vy[i]
        if bul_x[i] > WIDTH:
            bul_flag[i] = False

def draw_bullet(): # 弾を表示する
    for i in range(BUL_MAX):
        if bul_flag[i] == True:
            pyxel.blt(bul_x[i] - 4, bul_y[i] - 4, 0, 16, 0, 8, 8, 0)

def update(): # メイン処理（計算、判定を行う）
    move_player() # 自機の移動
    move_bullet() # 弾の移動

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    scroll_bg() # 画面をスクロールさせる関数を呼び出す
    pyxel.blt(pl_x - 8, pl_y - 4, 0, 0, 0, 16, 8, 0) # 自機の表示
    draw_bullet() # 弾の表示

pyxel.run(update, draw)
