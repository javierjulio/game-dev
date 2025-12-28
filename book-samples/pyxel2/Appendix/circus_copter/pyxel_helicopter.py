import pyxel

WIDTH, HEIGHT = 240, 160 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="Circus Copter")
pyxel.images[0].load(0, 0, "resource/copter.png")
pyxel.mouse(True) # マウスポインタを表示する

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
score = 0 # スコア
hisco = 5000 # ハイスコア
pl_x, pl_y = WIDTH / 2, HEIGHT / 2 # ヘリコプターの座標

def move_copter(): # ヘリコプターの移動
    global pl_x, pl_y
    pl_x = pl_x * 0.9 + pyxel.mouse_x * 0.1
    pl_y = pl_y * 0.9 + pyxel.mouse_y * 0.1
    if pl_x < 8: pl_x = 8
    if pl_x > WIDTH - 8: pl_x = WIDTH - 8
    if pl_y < 8: pl_y = 8
    if pl_y > HEIGHT - 8: pl_y = HEIGHT - 8

def draw_copter(): # ヘリコプターの表示
    d = int((pyxel.mouse_x - pl_x) / 10) # 向き
    if d < -2: d = -2
    if d >  2: d =  2
    sx = 16 * (pyxel.frame_count % 2) # ┬ 切り出し位置
    sy = 8 * (d + 2)                  # ┘
    pyxel.blt(pl_x - 8, pl_y - 4, 0, sx, sy, 16, 8, 0)

BLN_MAX = 100 # 風船の数
NONE, MOVE, CATCH = 0, 1, 2 # 風船の状態：0=存在しない 1=移動 2=キャッチ
BOMB = 0 # 爆弾（黒い色の風船）
bln_x, bln_y = [0]*BLN_MAX, [0]*BLN_MAX
bln_vx, bln_vy, = [0]*BLN_MAX, [0]*BLN_MAX
bln_act = [NONE]*BLN_MAX
bln_col = [0]*BLN_MAX

def set_balloon(): # 風船を1つセット
    for i in range(BLN_MAX):
        if bln_act[i] == NONE:
            bln_x[i] = pyxel.rndi(0, WIDTH)
            bln_y[i] = HEIGHT + 10
            bln_vx[i] = pyxel.rndi( -4,  4) / 5
            bln_vy[i] = pyxel.rndi(-10, -1) / 5
            bln_act[i] = MOVE
            bln_col[i] = pyxel.rndi(0, 15)
            if score > 5000 and i % 3 == 0: # 5000点超えで爆弾がたくさん出る
                bln_col[i] = BOMB
            break

def move_balloon(): # 風船を動かす
    global scene, timer, score, hisco
    for i in range(BLN_MAX):
        if bln_act[i] == MOVE: # 移動
            bln_x[i] += bln_vx[i]
            bln_y[i] += bln_vy[i]
            if bln_x[i] < -10: bln_x[i] = WIDTH + 10 # 画面左から外に出た
            if bln_x[i] > WIDTH + 10: bln_x[i] = -10 # 画面右から外に出た
            if bln_y[i] < -10: bln_act[i] = NONE     # 画面の上に出た
            # ヒットチェック
            if abs(bln_x[i] - pl_x) < 10 and abs(bln_y[i] - pl_y) < 10:
                if bln_col[i] == BOMB: # 爆弾
                    scene = OVER
                    timer = 0
                else:
                    bln_act[i] = CATCH
                    score += bln_col[i] * 10
                    if score > hisco: hisco = score
        if bln_act[i] == CATCH: # キャッチ
            bln_x[i] += 8
            bln_y[i] -= 8
            if bln_y[i] < -10: bln_act[i] = NONE # 画面の上に出た

def draw_balloon(): # 風船を表示
    for i in range(BLN_MAX):
        if bln_act[i] == NONE: continue
        pyxel.elli(bln_x[i] - 5, bln_y[i] - 6, 10, 12, bln_col[i]) # 本体
        pyxel.circ(bln_x[i] - 2, bln_y[i] - 3, 1, 7) # ハイライト
        pyxel.line(bln_x[i], bln_y[i] + 6, bln_x[i] + pyxel.rndi(-1, 1), bln_y[i] + 12, 13) # 糸
        if bln_col[i] == BOMB: # 爆弾
            pyxel.circ(bln_x[i] + pyxel.rndi(-1, 1), bln_y[i] + 12, 1, pyxel.rndi(8, 10))
            pyxel.text(bln_x[i] - 14, bln_y[i] - 12, "DANGER!", pyxel.rndi(8, 10))

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, score, pl_x, pl_y
    timer += 1

    if scene == TITLE: # タイトル
        pl_x, pl_y = WIDTH / 2, HEIGHT / 2 # ヘリコプターの座標
        if pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT): # クリックで開始
            for i in range(BLN_MAX): bln_act[i] = NONE # 風船を消す
            scene = PLAY
            timer = 0
            score = 0

    if scene == PLAY: # ゲームプレイ
        if timer % 10 == 0: set_balloon() # 風船の出現
        move_copter()  # ヘリコプターの移動
        move_balloon() # 風船の移動

    if scene == OVER: # ゲームオーバー
        if timer == 180:
            scene = TITLE

def draw(): # 描画処理
    pyxel.cls(1) # 画面をクリアする
    GH = HEIGHT // 8 # グラデの高さ
    for i in range(1, 8): # グラデーション
        pyxel.dither(i / 8)
        pyxel.rect(0, GH * i, WIDTH, GH, 5)
    pyxel.dither(1.0)
    draw_balloon() # 風船を表示

    if scene == TITLE: # タイトル
        draw_copter() # ヘリコプターを表示
        pyxel.text(WIDTH // 2 - 26, HEIGHT * 0.3, "Circus Copter", 11)
        if (pyxel.frame_count // 10) % 2 == 0:
            pyxel.text(WIDTH // 2 - 28, HEIGHT * 0.7, "Click to start", 10)

    if scene == PLAY: # ゲームプレイ
        draw_copter() # ヘリコプターを表示

    if scene == OVER: # ゲームオーバー
        if timer < 90:
            if timer%2:
                pyxel.circ(pl_x, pl_y, 8, pyxel.rndi(7, 10))
        else:
            pyxel.text(WIDTH // 2 - 18, HEIGHT * 0.3, "GAME OVER", 8)

    pyxel.text(1, 1, f'SCORE {score}', 7) # スコア
    pyxel.text(WIDTH // 2, 1, f'HI-SC {hisco}', 10) # ハイスコア

pyxel.run(update, draw)
