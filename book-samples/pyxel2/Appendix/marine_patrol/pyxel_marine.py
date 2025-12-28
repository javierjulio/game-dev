import pyxel

WIDTH, HEIGHT = 160, 120 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="警備艇 VS 潜水艦 ゲーム")
pyxel.images[0].load(0, 0, "resource/vessel.png")
pyxel.images[1].load(0, 0, "resource/seaweed.png")

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
score = 0 # スコア
hisco = 5000 # ハイスコア

def draw_bg(): # 背景を描く
    pyxel.rect(0, 0, WIDTH, 12, 12) # 警備艇が移動する領域（空）
    for i in range(8): # 海のグラデーション
        pyxel.dither((8 - i) / 8)
        pyxel.rect(0, 12 * (i + 1), WIDTH, 12, 5)
    pyxel.dither(1.0)
    for i in range(8): # 海草
        pyxel.blt(20 * i + 2, HEIGHT - 16, 1, 0, 0, 16, 16, 0)

# 警備艇の定数、変数
LEFT, RIGHT = 0, 1 # 向き、敵の潜水艦でも使用
boat_x, boat_y, boat_dir = WIDTH // 2, 8, LEFT

def move_boat(): # 警備艇を動かす
    global boat_x, boat_dir, stop_x, stop_y, stop_flag
    if pyxel.btn(pyxel.KEY_LEFT) and boat_x > 8:          # 左キー
        boat_x -= 2
        boat_dir = LEFT
    if pyxel.btn(pyxel.KEY_RIGHT) and boat_x < WIDTH - 8: # 右キー
        boat_x += 2
        boat_dir = RIGHT
    if pyxel.btn(pyxel.KEY_SPACE) and stop_flag == False: # スペースキー
        stop_x = boat_x
        stop_y = boat_y
        stop_flag = True

def draw_boat(): # 警備艇を表示する
    sx = boat_dir * 16 # 画像を切り出すx座標
    pyxel.blt(boat_x - 8, boat_y - 4, 0, sx, 0, 16, 8, 0)

# 潜水艦を止める装置の変数
stop_x, stop_y, stop_flag = 0, 0, False

def move_stop(): # 装置を動かす（落下）
    global stop_y, stop_flag
    if stop_flag:
        stop_y += 1
        if stop_y > HEIGHT:
            stop_flag = False

def draw_stop(): # 装置を表示する
    if stop_flag:
        pyxel.blt(stop_x - 4, stop_y - 4, 0, 32, 0, 8, 8, 0)

# 潜水艦の定数、配列
NONE, MOVE, SINK  = 0, 1, 2 # 存在しない、移動、撃沈
SUB_MAX = 20
sub_x   = [0]*SUB_MAX
sub_y   = [0]*SUB_MAX
sub_dir = [0]*SUB_MAX
sub_spd = [0]*SUB_MAX
sub_act = [NONE]*SUB_MAX

def set_submarine(): # 潜水艦を1つセットする
    for i in range(SUB_MAX):
        if sub_act[i] == NONE:
            if i % 2 == 0: # 画面右端に出現
                sub_x[i] = WIDTH
                sub_dir[i] = LEFT
            else:          # 画面左端に出現
                sub_x[i] = 0
                sub_dir[i] = RIGHT
            sub_y[i] = HEIGHT - 12
            smax = 2
            if score >= 5000: smax = 3 # 5000点以上で速い潜水艦が現れる
            sub_spd[i] = pyxel.rndi(1, smax)
            sub_act[i] = MOVE
            break

def move_submarine(): # 潜水艦を動かす
    global scene, timer, score, hisco
    for i in range(SUB_MAX):
        if sub_act[i] == MOVE: # 移動
            if sub_dir[i] == LEFT: # 左へ移動
                sub_x[i] -= sub_spd[i]
                if sub_x[i] < 0:
                    sub_y[i] -= 12
                    sub_dir[i] = RIGHT
            elif sub_dir[i] == RIGHT: # 右へ移動
                sub_x[i] += sub_spd[i]
                if sub_x[i] > WIDTH:
                    sub_y[i] -= 12
                    sub_dir[i] = LEFT
            # 装置とのヒットチェック
            if stop_flag:
                dx = abs(sub_x[i] - stop_x)
                dy = abs(sub_y[i] - stop_y)
                if dx < 10 and dy < 5:
                    sub_act[i] = SINK # 撃沈
                    score += sub_y[i] * sub_spd[i]
                    if score > hisco: hisco = score
            # 警備艇とのヒットチェック
            dx = abs(sub_x[i] - boat_x)
            dy = abs(sub_y[i] - boat_y)
            if dx < 16 and dy < 8:
                scene = OVER
                timer = 0

        if sub_act[i] == SINK: # 撃沈
            sub_y[i] += 1
            if sub_y[i] > HEIGHT: sub_act[i] = NONE

def draw_submarine(): # 潜水艦を表示する
    for i in range(SUB_MAX):
        if sub_act[i] == NONE: continue
        sx = sub_dir[i] * 16 # ┬ 画像を切り出す座標
        sy = sub_spd[i] *  8 # ┘
        pyxel.blt(sub_x[i] - 8, sub_y[i] - 4, 0, sx, sy, 16, 8, 0)
        if sub_act[i] == SINK: # 撃沈
            pyxel.blt(sub_x[i] - 4, sub_y[i] - 12, 0, 32, 8, 8, 8, 0) # 白旗

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, score
    timer += 1

    if scene == TITLE: # タイトル
        if pyxel.btn(pyxel.KEY_SPACE): # スペースキーで開始
            for i in range(SUB_MAX): sub_act[i] = NONE
            scene = PLAY
            timer = 0
            score = 0

    if scene == PLAY: # ゲームプレイ
        if timer % 90 == 1: set_submarine() # 潜水艦の出現
        move_boat() # 警備艇の移動
        move_stop() # 装置の移動
        move_submarine() # 潜水艦の移動

    if scene == OVER: # ゲームオーバー
        if timer == 150: scene = TITLE

def draw(): # 描画処理
    pyxel.cls(1) # 画面をクリアする
    draw_bg() # 背景を描く

    if scene == TITLE: # タイトル
        pyxel.text(WIDTH // 2 - 2 * 25, HEIGHT * 0.3, "PATROL BOAT VS SUBMARINES", 11)
        if timer % 20 < 10:
            pyxel.text(WIDTH // 2 - 2 * 13, HEIGHT * 0.7, "[SPACE] Start", 7)

    if scene == PLAY: # ゲームプレイ
        draw_boat() # 警備艇の表示
        draw_stop() # 装置の表示
        draw_submarine() # 潜水艦の表示

    if scene == OVER: # ゲームオーバー
        pyxel.text(WIDTH // 2 - 2 * 9, HEIGHT * 0.3, "GAME OVER", 8)

    pyxel.text(1, 1, f'SCORE {score}', 7) # スコア
    pyxel.text(WIDTH - 48, 1, f'HI-SC {hisco}', 10) # ハイスコア

pyxel.run(update, draw)
