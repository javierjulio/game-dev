import pyxel

WIDTH, HEIGHT = 128, 128 # 幅と高さのピクセル数
SIZE = 8 # 1マス（タイル）のピクセル数
pyxel.init(WIDTH, HEIGHT, title="Side View Game")
pyxel.load("resource/sideview.pyxres")

TITLE, PLAY, OVER, CLEAR, NEXT = 0, 1, 2, 3, 4 # 画面遷移用の定数
STAGE_DATA = 5 # ステージの地形をいくつ用意したか
LIFE_MAX = 5 #  プレイヤーキャラの体力の最大値

scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
stage = 0 # ステージ
score = 0 # スコア
gold = 0 # 金塊の数
life = 0 # 体力（ハートの数）
muteki = 0 # 無敵状態
pl_x, pl_y = 0, 0 # プレイヤーキャラの座標

# モンスター用の定数、変数、配列
UP, DOWN, LEFT, RIGHT = 0, 1, 2, 3 # モンスターの進む向き
mon_max = 0 # モンスターの数
mon_x, mon_y, mon_dir, mon_steps = [], [], [], [] # x座標、y座標、向き、移動用

# タイルの種類を定めた定数
SPACE   = (0, 0) # 何もない空間
LADDER  = (1, 0) # 梯子
HEART   = (2, 0) # ハート
GOLD    = (3, 0) # 金塊
WALL    = [(4, 0), (5, 0)] # 壁
PLAYER  = (0, 1) # プレイヤーキャラ
MONSTER = (0, 2) # モンスター

def text(x, y, txt, col): # 黒く縁取った文字列を表示する
    pyxel.text(x, y - 1, txt, 0)
    pyxel.text(x, y + 1, txt, 0)
    pyxel.text(x - 1, y, txt, 0)
    pyxel.text(x + 1, y, txt, 0)
    pyxel.text(x, y, txt, col)

def set_stage(): # ステージをセット
    global gold, muteki, pl_x, pl_y, mon_max
    tx = 16 * ((stage - 1) % STAGE_DATA) # ステージの地形を配置した位置
    pyxel.tilemaps[0].blt(0, 0, 1, tx, 0, 16, 16) # タイルマップをコピー
    gold = 0
    muteki = 0
    mon_max = 0
    mon_x.clear()     # ┬ モンスターの配列をクリアする
    mon_y.clear()     # │ 全要素が削除され、空の配列になる
    mon_dir.clear()   # │
    mon_steps.clear() # ┘
    for ty in range(0, 15): # そのステージの全てのタイルの種類を調べる
        for tx in range(0, 15):
            x = tx * SIZE + SIZE // 2 # ┬ キャラクターの座標の代入に使用
            y = ty * SIZE + SIZE // 2 # ┘
            t = pyxel.tilemaps[0].pget(tx, ty)
            if t == GOLD: # 金塊を数える
                gold += 1
            if t == PLAYER: # プレイヤーキャラの初期位置
                pl_x, pl_y = x, y
                set_tile(tx, ty, SPACE)
            if t == MONSTER: # モンスターの配列を準備
                mon_max += 1
                mon_x.append(x)
                mon_y.append(y)
                mon_dir.append(0)
                mon_steps.append(0)
                set_tile(tx, ty, SPACE)
    pyxel.playm(0, loop=True) # ミュージックをループ再生

def set_tile(tx, ty, val): # タイルを変更する
    pyxel.tilemaps[0].pset(tx, ty, val)

def get_tile(tx, ty): # タイルを取得する
    if (0 <= tx <= 15) and (0 <= ty <= 15): # 画面の範囲内
        return pyxel.tilemaps[0].pget(tx, ty)
    return None

def chk_wall(x, y): # (x, y)にキャラクターが移動した場合、そこが壁かを調べる
    tx1, ty1 = (x - 4) // SIZE, (y - 4) // SIZE # 左上角
    tx2, ty2 = (x + 3) // SIZE, (y - 4) // SIZE # 右上角
    tx3, ty3 = (x - 4) // SIZE, (y + 3) // SIZE # 左下角
    tx4, ty4 = (x + 3) // SIZE, (y + 3) // SIZE # 右下角
    for i in range(len(WALL)): # 全ての壁のタイルについて調べる
        if get_tile(tx1, ty1) == WALL[i]: return True
        if get_tile(tx2, ty2) == WALL[i]: return True
        if get_tile(tx3, ty3) == WALL[i]: return True
        if get_tile(tx4, ty4) == WALL[i]: return True
    return False # 壁ではない

def on_ladder(x, y): # 梯子にいるかを調べる
    tx1, ty1 = (x - 4) // SIZE, (y - 4) // SIZE # 左上角
    tx2, ty2 = (x + 3) // SIZE, (y - 4) // SIZE # 右上角
    tx3, ty3 = (x - 4) // SIZE, (y + 3) // SIZE # 左下角
    tx4, ty4 = (x + 3) // SIZE, (y + 3) // SIZE # 右下角
    if get_tile(tx1, ty1) == LADDER: return True
    if get_tile(tx2, ty2) == LADDER: return True
    if get_tile(tx3, ty3) == LADDER: return True
    if get_tile(tx4, ty4) == LADDER: return True
    return False # 梯子にいない

def adjust_x_lad(x, y): # 梯子でのx座標の補正
    txl, tyl = (x - 4) // SIZE, y // SIZE # 左側に梯子があるか
    txr, tyr = (x + 3) // SIZE, y // SIZE # 右側に梯子があるか
    if get_tile(txl, tyl) == LADDER and get_tile(txr, tyr) != LADDER:
            x -= 2
    if get_tile(txl, tyl) != LADDER and get_tile(txr, tyr) == LADDER:
            x += 2
    return x

def move_player(): # プレイヤーキャラを動かす
    global score, gold, life, pl_x, pl_y
    tx, ty = pl_x // SIZE, pl_y // SIZE
    t = get_tile(tx, ty) # どのタイルにいるかを調べる
    if t == GOLD: # 金塊
        score += 100
        gold -= 1
        set_tile(tx, ty, SPACE)
        pyxel.play(3, 48, resume=True) # サウンド（効果音）
    if t == HEART: # ハート
        score += 1000
        if life < LIFE_MAX:
            life += 1
        set_tile(tx, ty, SPACE)
        pyxel.play(3, 48, resume=True) # サウンド（効果音）
    if chk_wall(pl_x, pl_y + 1) == False and on_ladder(pl_x, pl_y + 1) == False:
        pl_y += 1 # 下に壁も梯子もないなら落下
        return
    if pyxel.btn(pyxel.KEY_LEFT): # 左キー
        if chk_wall(pl_x - 2, pl_y) == False:
            pl_x -= 2
    if pyxel.btn(pyxel.KEY_RIGHT): # 右キー
        if chk_wall(pl_x + 2, pl_y) == False:
            pl_x += 2
    if pyxel.btn(pyxel.KEY_UP): # 上キー
        if on_ladder(pl_x, pl_y): # 梯子のところにいる
            pl_x = adjust_x_lad(pl_x, pl_y) # x座標の補正
            if chk_wall(pl_x, pl_y - 2) == False: # 上に壁がない
                pl_y -= 2
    if pyxel.btn(pyxel.KEY_DOWN): # 下キー
        if on_ladder(pl_x, pl_y): # 梯子のところにいる
            pl_x = adjust_x_lad(pl_x, pl_y) # x座標の補正
            if chk_wall(pl_x, pl_y + 2) == False: # 下に壁がない
                pl_y += 2
        elif on_ladder(pl_x, pl_y + 2): # 下に梯子がある
            pl_x = adjust_x_lad(pl_x, pl_y + 4) # x座標の補正
            if chk_wall(pl_x, pl_y + 2) == False: # 下に壁がない
                pl_y += 2

def draw_player(): # プレイヤーキャラを表示する
    sx = 8 *((pyxel.frame_count // 10) % 2) # 画像の切り出し位置
    if muteki > 0 and pyxel.frame_count % 2 == 0: return # 無敵状態
    pyxel.blt( pl_x - 4, pl_y - 4, 0, sx, 8, 8, 8, 0) # プレイヤーキャラのイメージ

def move_monster(): # モンスターを動かす
    for i in range(mon_max):
        if mon_steps[i] == 0: # 停止中
            if chk_wall(mon_x[i], mon_y[i] + 1) == False and on_ladder(mon_x[i], mon_y[i] + 1) == False:
                mon_y[i] += 1 # 下に壁も梯子もないなら落下
                continue
            r = pyxel.rndi(0, 9) # 敵の行動を決める乱数
            if r == 0: # 進む向きを変える
                mon_dir[i] = pyxel.rndi(UP, RIGHT)
            elif r <= 3: # 左右に進む
                if mon_dir[i] == LEFT and chk_wall(mon_x[i] - 1, mon_y[i]) == False:
                    mon_steps[i] = 8
                if mon_dir[i] == RIGHT and chk_wall(mon_x[i] + 1, mon_y[i]) == False:
                    mon_steps[i] = 8
            elif r <= 5: # 梯子を上る
                if on_ladder(mon_x[i], mon_y[i]) and chk_wall(mon_x[i], mon_y[i] - 1) == False:
                    mon_dir[i] = UP
                    mon_steps[i] = 8
            elif r == 6: # 梯子を降りる
                if on_ladder(mon_x[i], mon_y[i] + 1) and chk_wall(mon_x[i], mon_y[i] + 1) == False:
                    mon_dir[i] = DOWN
                    mon_steps[i] = 8
        if mon_steps[i] > 0: # 移動中
            if mon_dir[i] == UP:    mon_y[i] -= 1
            if mon_dir[i] == DOWN:  mon_y[i] += 1
            if mon_dir[i] == LEFT:  mon_x[i] -= 1
            if mon_dir[i] == RIGHT: mon_x[i] += 1
            mon_steps[i] -= 1

def draw_monster(): # モンスターを表示する
    sx = 8 * ((pyxel.frame_count // 10) % 2) # 画像の切り出し位置
    for i in range(mon_max):
        pyxel.blt(mon_x[i] - 4, mon_y[i] - 4, 0, sx, 16, SIZE, SIZE, 0) # モンスターのイメージ

def hit_check(): # モンスターとプレイヤーキャラのヒットチェック
    global life, muteki
    if muteki > 0: # 無敵状態ならヒットチェックしない
        muteki -= 1
        return
    for i in range(mon_max):
        dx = abs(mon_x[i] - pl_x) # x軸方向の距離
        dy = abs(mon_y[i] - pl_y) # y軸方向の距離
        if dx <= 6 and dy <= 6:
            life -= 1 # 体力（ハート）を減らす
            muteki = 60 # 一定時間、無敵状態にする
            return

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, stage, score, life

    if scene == TITLE: # タイトル
        if pyxel.btnp(pyxel.KEY_SPACE): # SPACEキーで開始
            scene = PLAY
            stage = 1
            score = 0
            life = LIFE_MAX
            set_stage() # ステージをセット
        
    if scene == PLAY: # ゲームプレイ
        move_player() # プレイヤーキャラの移動
        move_monster() # モンスターの移動
        hit_check() # ヒットチェック
        if gold == 0: # 金塊を全て回収
            scene = CLEAR
            timer = 150
            pyxel.stop() # 全てのチャンネルを停止
        if life <= 0: # 体力（ハート）がない
            scene = OVER
            timer = 150
            pyxel.stop() # 全てのチャンネルを停止

    if scene == OVER: # ゲームオーバー
        timer -= 1
        if timer == 0:
            scene = TITLE

    if scene == CLEAR: # ステージクリア
        timer -= 1
        if timer == 0:
            scene = NEXT
            timer = WIDTH
            stage += 1

    if scene == NEXT: # 次のステージへ移る演出
        timer -= 2
        if timer == 0:
            scene = PLAY
            set_stage() # ステージをセット

def draw(): # 描画処理
    pyxel.bltm(0, 0, 0, 0, 0, 128, 128) # タイルマップ（背景）の表示

    if scene == TITLE: # タイトル
        text(WIDTH // 2 - 28, 41, "SIDE VIEW GAME", 10)
        if (pyxel.frame_count // 15) % 2 == 0:
            text(WIDTH // 2 - 26, HEIGHT - 41, "[SPACE] Start", 6)

    if scene == PLAY: # ゲームプレイ
        draw_player() # プレイヤーキャラの表示
        draw_monster() # モンスターの表示

    if scene == OVER: # ゲームオーバー
        text(WIDTH // 2 - 18, 41, "GAME OVER", 8)

    if scene == CLEAR: # ステージクリア
        text(WIDTH // 2 - 22, 41, "STAGE CLEAR", pyxel.rndi(5, 7))

    if scene == NEXT: # 次のステージへ移る演出
        nsx = 128 * ((stage - 1) % STAGE_DATA)
        pyxel.bltm(timer, 0, 1, nsx, 0, 128, 128) # 次のステージのタイルマップ

    text(2, 1, f'SCORE {score}', 7) # スコア
    text(WIDTH - 34, 1, f'STAGE {stage}', 10) # ステージ
    text(WIDTH - 34, HEIGHT - 6, f'Gold {gold}', 9) # 残りの金塊
    for i in range(life): # ハート
        pyxel.blt(2 + i * 8, HEIGHT - 9, 0, 16, 0, 8, 8, 0)

pyxel.run(update, draw)
