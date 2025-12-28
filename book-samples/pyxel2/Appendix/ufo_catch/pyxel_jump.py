import pyxel

WIDTH, HEIGHT = 240, 160 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="Jump Game")

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
score = 0 # スコア
hisco = 5000 # ハイスコア

BG_COL = [4, 8, 9, 10, 3, 5, 1, 2] # 背景を描く色

# 地面のタイル
GROUND_Y = HEIGHT - 16 # 地面のy座標
TILE_COL = [0, 8, 9, 11, 6, 7] # タイルの色（厚さによって色が違う）
TILE_W = 10 # タイル1つの幅
TILE_NUM = WIDTH // TILE_W # 何個並ぶか
tile = [0] * TILE_NUM

def draw_tile(): # 地面のタイルを描く
    for i in range(TILE_NUM):
        pyxel.rect(i * TILE_W, GROUND_Y, TILE_W - 1, tile[i], TILE_COL[tile[i]])

# プレイヤーキャラの変数と関数
pl_x, pl_y = 0, 0 # 座標
pl_vx, pl_vy = 0, 0 # x軸方向の速さ、y軸方向の速さ

def move_player(): # プレイヤーキャラを動かす関数
    global scene, timer, pl_x, pl_y, pl_vx, pl_vy
    if pyxel.btn(pyxel.KEY_LEFT):    # 左キー
        if pl_vx > -5: pl_vx -= 1
    elif pyxel.btn(pyxel.KEY_RIGHT): # 右キー
        if pl_vx <  5: pl_vx += 1
    else: # 左右の入力が無ければ、x軸方向の速さを減速
        pl_vx = int(pl_vx * 0.9)
    pl_vy += 1 # y軸方向の速さを増やす
    pl_x += pl_vx # ┬ 座標を変化させる
    pl_y += pl_vy # ┘
    if pl_x < 0:      # 画面左から外に出た
        pl_x = WIDTH - 1
    if pl_x >= WIDTH: # 画面右から外に出た
        pl_x = 0
    if pl_y >= GROUND_Y - 5: # 地面に達した
        ax = int(pl_x / TILE_W) # タイルの配列の添え字
        if tile[ax] > 0: # タイルに厚さがあるなら跳ねる
            tile[ax] -= 1 # タイルが薄くなる
            pl_y = GROUND_Y - 5
            pl_vy = -17
        else: # 穴に落ちるとゲームオーバー
            scene = OVER
            timer = 0

def draw_player(col): # プレイヤーキャラを表示する関数
    pyxel.circ(pl_x, pl_y, 5, col)
    pyxel.line(pl_x - 2, pl_y - 2, pl_x - 2, pl_y, 0) # 左目
    pyxel.line(pl_x + 1, pl_y - 2, pl_x + 1, pl_y, 0) # 右目

# UFOの変数と関数
UFO_COL = [9, 10, 15, 7, 15, 10] # 明滅させる色
MOVE, CATCH = 1, 2 # 移動、捕獲
ufo_x, ufo_y = 0, HEIGHT / 2 # 座標
ufo_vx = 1 # x軸方向の速さ
ufo_act = MOVE # 移動中か、捕獲されたか

def move_ufo(): # UFOを動かす関数 ヒットチェックも行う
    global score, hisco, ufo_x, ufo_y, ufo_vx, ufo_act
    if ufo_act == MOVE: # 横に移動中
        ufo_x += ufo_vx
        if ufo_x >= WIDTH: ufo_x = 0 # 画面右に達した
        if scene == PLAY: # ゲームプレイ中はヒットチェック
            d = (ufo_x - pl_x) * (ufo_x - pl_x) + (ufo_y - pl_y) * (ufo_y - pl_y)
            if d < 12 * 12: # ヒットチェック 距離の二乗がこの値未満なら捕獲
                score += int(100 * ufo_vx) # 速く動くものほど高得点
                if score > hisco: hisco = score # ハイスコアを更新
                ax = int(ufo_x / TILE_W) # UFOの真下のタイルの添え字
                tile[ax] = 5 # そのタイルが修復される
                ufo_act = CATCH
    elif ufo_act == CATCH: # 捕獲されて空に上る
        ufo_y -= 1
        if ufo_y < -10:
            ufo_x = 0
            ufo_y = pyxel.rndi(10, HEIGHT // 2)
            ufo_vx = 1 + pyxel.rndi(0, 2) / 2
            ufo_act = MOVE

def draw_ufo(): # UFOを描く
    body_col = 7 # 本体の色
    line_col = UFO_COL[pyxel.frame_count % 6] # 線の色
    if ufo_act == CATCH: # 捕獲演出中に色を変える
        body_col = 13
        line_col = 13
    pyxel.elli(ufo_x - 5, ufo_y - 3, 11, 7, body_col)
    pyxel.line(ufo_x - 8, ufo_y , ufo_x + 8, ufo_y, line_col)

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, score, tile, pl_x, pl_y, pl_vx, pl_vy, ufo_x, ufo_y, ufo_vx, ufo_act

    move_ufo() # UFOは常に動かす（タイトル画面でも動く）

    if scene == TITLE: # タイトル
        tile.pop(0) # 配列の先頭を削除
        tile.append(pyxel.rndi(1, 5)) # 配列の末尾にデータを追加
        if pyxel.btnp(pyxel.KEY_SPACE): # スペースキーで開始
            scene = PLAY
            timer = 0
            score = 0
            tile = [5] * TILE_NUM
            pl_x, pl_y = WIDTH / 2, HEIGHT / 2
            pl_vx, pl_vy = 0, 0
            ufo_x, ufo_y = 0, HEIGHT / 8
            ufo_vx = 0.5
            ufo_act = MOVE

    if scene == PLAY: # ゲームプレイ
        move_player() # プレイヤーキャラを動かす

    if scene == OVER: # ゲームオーバー
        timer += 1
        pl_y += 1
        if timer == 180: scene = TITLE

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    pyxel.dither(0.1) # ディザリングの指定
    GH = HEIGHT // len(BG_COL) # 1つの色の高さ
    for i in range(len(BG_COL)): # 定義した色で背景を描く
        pyxel.rect(0, GH * i, WIDTH, GH, BG_COL[i])
    pyxel.dither(1.0)
    draw_tile() # 床のタイルを描く
    draw_ufo() # UFOを表示

    if scene == TITLE: # タイトル
        pyxel.text(WIDTH // 2 - 26, HEIGHT * 0.3, "CATCH THE UFO", 10)
        pyxel.text(WIDTH // 2 - 28, HEIGHT * 0.7, "[SPACE] Start", 6)

    if scene == PLAY: # ゲームプレイ
        draw_player(11) # プレイヤーキャラを表示

    if scene == OVER: # ゲームオーバー
        if timer < 30:
            draw_player(pyxel.rndi(0, 15)) # プレイヤーキャラを表示
        else:
            pyxel.text(WIDTH // 2 - 18, HEIGHT * 0.3, "GAME OVER", 8)

    pyxel.text(1, 1, f'SCORE {score}', 7) # スコア
    pyxel.text(WIDTH // 2, 1, f'HI-SC {hisco}', 10) # ハイスコア

pyxel.run(update, draw)
