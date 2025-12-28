import pyxel

WIDTH, HEIGHT = 120, 80 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="Squash")

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
score = 0 # スコア
hisco = 100 # ハイスコア

# バーを動かすための変数と関数
bar_x = WIDTH / 2
bar_y = HEIGHT - 10
bar_width = 20 # バーの幅

def move_bar(): # キー操作で動かす
    global bar_x
    if pyxel.btn(pyxel.KEY_LEFT): # 左キー
        bar_x = bar_x - 3
        if bar_x < bar_width / 2:
            bar_x = bar_width / 2
    if pyxel.btn(pyxel.KEY_RIGHT): # 右キー
        bar_x = bar_x + 3
        if bar_x > WIDTH - bar_width / 2:
            bar_x = WIDTH - bar_width / 2

# ボールを動かすための変数と関数
ball_x = 0
ball_y = 0
ball_vx = 0
ball_vy = 0
ball_r = 3 # ボールの半径

def move_ball(): # ボールを動かす
    global ball_x, ball_y, ball_vx, ball_vy
    ball_x = ball_x + ball_vx
    ball_y = ball_y + ball_vy
    if ball_x < ball_r: # 左端
        ball_vx = -ball_vx
    if ball_x > WIDTH - ball_r: # 右端
        ball_vx = -ball_vx
    if ball_y < ball_r: # 上端
        ball_vy = -ball_vy
#    if ball_y > HEIGHT - ball_r: # 下端
#        ball_vy = -ball_vy

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, score, hisco
    global bar_x, bar_y, ball_x, ball_y, ball_vx, ball_vy
    
    if scene == TITLE: # タイトル
        if pyxel.btnp(pyxel.KEY_SPACE): # スペースキーで開始
            scene = PLAY
            score = 0
            ball_x = WIDTH // 2
            ball_y = HEIGHT // 5
            ball_vx = 2
            ball_vy = 1
        
    if scene == PLAY: # ゲームプレイ
        move_bar()
        move_ball()

        # ヒットチェック
        dx = ball_x - bar_x
        dy = ball_y - bar_y
        if -(bar_width / 2 + ball_r) <= dx <= bar_width / 2 + ball_r and -ball_r <= dy <= 0:
            ball_vy = pyxel.rndi(-3, -1)
            score = score + 10
            if score > hisco:
                hisco = score

        # ボールが画面下に達した？
        if ball_y > HEIGHT:
            scene = OVER
            timer = 150

    if scene == OVER: # ゲームオーバー
        timer = timer - 1
        if timer == 0:
            scene = TITLE

def draw(): # 描画処理
    pyxel.cls(1) # 画面をクリアする

    if scene == TITLE: # タイトル
        pyxel.text(WIDTH / 2 - 12, HEIGHT * 0.3, "SQUASH", 6)
        pyxel.text(WIDTH / 2 - 26, HEIGHT * 0.7, "[SPACE] Start", pyxel.rndi(0, 15))

    if scene == PLAY: # ゲームプレイ
        pyxel.rect(bar_x - bar_width / 2, bar_y - 1, bar_width, 2, 11) # バー
        pyxel.circ(ball_x, ball_y, ball_r, 8) # ボール

    if scene == OVER: # ゲームオーバー
        pyxel.text(WIDTH / 2 - 18, HEIGHT * 0.3, "GAME OVER", 8)

    pyxel.text(1, 1, "SCORE " + str(score), 7) # スコア
    pyxel.text(WIDTH / 2, 1, "HI-SC " + str(hisco), 10) # ハイスコア

pyxel.run(update, draw)
