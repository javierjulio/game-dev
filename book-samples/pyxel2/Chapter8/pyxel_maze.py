import pyxel

WIDTH, HEIGHT = 136, 120 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="Maze Game")
pyxel.images[0].load(0, 0, "resource/character.png")
pyxel.images[1].load(0, 0, "resource/maze.png")

# 迷路の定義
ROW, COL, SIZE = 15, 17, 8 # 縦のマスの数、横のマスの数、1マスのピクセル数
WALL = 4 # これ以上の値は壁＝入れない
maze = [ # 0=通路、1～3=フルーツ、4～6=壁
    [4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4],
    [6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [6,0,4,0,4,5,5,4,0,4,5,5,4,0,4,0,6],
    [6,0,6,0,0,0,0,0,0,0,0,0,0,0,6,0,6],
    [6,0,6,0,4,5,5,4,0,4,5,5,4,0,6,0,6],
    [6,0,4,0,0,0,0,0,0,6,0,0,0,0,4,0,6],
    [6,0,0,0,4,0,0,4,0,4,0,0,4,0,0,0,6],
    [6,0,0,4,4,4,0,0,0,0,0,4,4,4,0,0,6],
    [6,0,0,0,4,0,0,4,0,4,0,0,4,0,0,0,6],
    [6,0,4,0,0,0,0,6,0,0,0,0,0,0,4,0,6],
    [6,0,6,0,4,5,5,4,0,4,5,5,4,0,6,0,6],
    [6,0,6,0,0,0,0,0,0,0,0,0,0,0,6,0,6],
    [6,0,4,5,5,5,5,4,0,4,5,5,5,5,4,0,6],
    [6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6],
    [4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4]
]

def draw_maze(): # 迷路を表示する
    for y in range(ROW):
        for x in range(COL):
            sx = maze[y][x] * SIZE # 画像の切り出し位置
            pyxel.blt(x * SIZE, y * SIZE, 1, sx, 0, SIZE, SIZE)

TITLE, PLAY, OVER, CLEAR = 0, 1, 2, 3 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
stage = 0 # ステージ
score = 0 # スコア
fruits = 0 # クリアに必要なフルーツの数

# プレイヤーのキャラクター用の変数
UP, DOWN, LEFT, RIGHT = 0, 1, 2, 3 # 進む向き（モンスターでも使用）
pl_x, pl_y, pl_dir, pl_steps = 0, 0, 0, 0

def init_player(): # ゲーム開始時の値を代入
    global pl_x, pl_y, pl_dir, pl_steps
    pl_x = 12
    pl_y = 12
    pl_dir = DOWN
    pl_steps = 0 # 0=停止中、1以上=座標を変化させる

def move_player(): # プレイヤーキャラをカーソルキーで動かす
    global pl_x, pl_y, pl_dir, pl_steps, score, fruits
    ax = int(pl_x / SIZE) # ┬ 配列の添え字
    ay = int(pl_y / SIZE) # ┘
    if 1 <= maze[ay][ax] <= 3: # フルーツに載った
        score += maze[ay][ax] * 100
        fruits -= 1
        maze[ay][ax] = 0

    if pl_steps == 0: # 停止中
        if pyxel.btn(pyxel.KEY_UP) and maze[ay - 1][ax] < WALL: # 上
            pl_dir = UP
            pl_steps = 4
        elif pyxel.btn(pyxel.KEY_DOWN) and maze[ay + 1][ax] < WALL: # 下
            pl_dir = DOWN
            pl_steps = 4
        elif pyxel.btn(pyxel.KEY_LEFT) and maze[ay][ax - 1] < WALL: # 左
            pl_dir = LEFT
            pl_steps = 4
        elif pyxel.btn(pyxel.KEY_RIGHT) and maze[ay][ax + 1] < WALL: # 右
            pl_dir = RIGHT
            pl_steps = 4

    if pl_steps > 0: # 移動中
        if pl_dir == UP:    pl_y -= 2 # 上に進む
        if pl_dir == DOWN:  pl_y += 2 # 下に進む
        if pl_dir == LEFT:  pl_x -= 2 # 左に進む
        if pl_dir == RIGHT: pl_x += 2 # 右に進む
        pl_steps -= 1

def draw_player(): # プレイヤーキャラを表示する
    sx = 8 * ((pyxel.frame_count // 5) % 2) # 画像の切り出し位置
    pyxel.blt(pl_x - 4, pl_y - 4, 0, sx, 0, 8, 8, 0)

# モンスター用の配列
mon_x, mon_y, mon_dir, mon_steps = [], [], [], []

def init_monster(): # モンスターの配列を初期化する
    mon_x.clear()     # ┬ 配列をクリアする
    mon_y.clear()     # │ これで空の配列になる
    mon_dir.clear()   # │
    mon_steps.clear() # ┘
    for i in range(stage):
        mon_x.append(68)
        mon_y.append(60)
        mon_dir.append(i % 4)
        mon_steps.append(0)

def move_monster(): # モンスターを動かす
    for i in range(stage):
        if mon_steps[i] == 0: # 停止中
            ax = int(mon_x[i] / SIZE) # ┬ 配列の添え字
            ay = int(mon_y[i] / SIZE) # ┘
            r = pyxel.rndi(0, 9) # 敵の行動を決める乱数
            if i == 0 and r == 0 and maze[ay][ax] == 0:
                maze[ay][ax] = pyxel.rndi(1, 3) # フルーツを置く
            if r == 1: # 向きを変える
                mon_dir[i] = pyxel.rndi(UP, RIGHT)
            if r > 7: # 進む
                if mon_dir[i] == UP and maze[ay - 1][ax] < WALL:
                    mon_steps[i] = 8
                if mon_dir[i] == DOWN and maze[ay + 1][ax] < WALL:
                    mon_steps[i] = 8
                if mon_dir[i] == LEFT and maze[ay][ax - 1] < WALL:
                    mon_steps[i] = 8
                if mon_dir[i] == RIGHT and maze[ay][ax + 1] < WALL:
                    mon_steps[i] = 8
        if mon_steps[i] > 0: # 移動中
            if mon_dir[i] == UP:    mon_y[i] -= 1
            if mon_dir[i] == DOWN:  mon_y[i] += 1
            if mon_dir[i] == LEFT:  mon_x[i] -= 1
            if mon_dir[i] == RIGHT: mon_x[i] += 1
            mon_steps[i] -= 1

def draw_monster(): # モンスターを表示する
    sx = 8 * ((pyxel.frame_count // 10) % 2) # 画像の切り出し位置
    for i in range(stage):
        pyxel.blt(mon_x[i] - 4, mon_y[i] - 4, 0, sx, 8, 8, 8, 0)

def hit_check(): # モンスターとプレイヤーキャラが接触したかを調べる
    for i in range(stage):
        dx = abs(mon_x[i] - pl_x) # X座標の距離
        dy = abs(mon_y[i] - pl_y) # Y座標の距離
        if dx < 6 and dy < 6: # 重なる条件
            return True
    return False

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, stage, score, fruits
    global pl_x, pl_y, pl_dir, pl_steps

    if scene == TITLE: # タイトル
        if pyxel.btnp(pyxel.KEY_SPACE): # SPACEキーで開始
            scene = PLAY
            stage = 1
            score = 0
            fruits = stage * 5
            init_player() # プレイヤーキャラの初期化
            init_monster() # モンスターの初期化

    if scene == PLAY: # ゲームプレイ
        move_player() # プレイヤーキャラの移動
        move_monster() # モンスターの移動
        if fruits == 0: # 必要なフルーツを回収
            scene = CLEAR
            timer = 150
        if hit_check(): # ヒットチェック
            scene = OVER
            timer = 150

    if scene == OVER: # ゲームオーバー
        timer -= 1
        if timer == 0:
            scene = TITLE

    if scene == CLEAR: # ステージクリア
        timer -= 1
        if timer == 0:
            scene = PLAY
            stage += 1
            fruits = stage * 5
            init_player() # プレイヤーキャラの初期化
            init_monster() # モンスターの初期化

def draw(): # 描画処理
    draw_maze() # 迷路の表示

    if scene == TITLE: # タイトル
        pyxel.text(WIDTH / 2 - 18, 25, "MAZE GAME", 7)
        if (pyxel.frame_count // 30)%2 == 0:
            pyxel.text(WIDTH / 2 - 26, HEIGHT - 30, "[SPACE] Start", 11)

    if scene == PLAY: # ゲームプレイ
        draw_player() # プレイヤーキャラの表示
        draw_monster() # モンスターの表示

    if scene == OVER: # ゲームオーバー
        pyxel.text(WIDTH / 2 - 18, 25, "GAME OVER", 8)

    if scene == CLEAR: # ステージクリア
        pyxel.text(WIDTH / 2 - 22, 25, "STAGE CLEAR", pyxel.rndi(5, 7))

    pyxel.text(1, 1, f'SCORE {score}', 7) # スコア
    pyxel.text(WIDTH - 32, 1, f'STAGE {stage}', 10) # ステージ
    pyxel.text(1, HEIGHT - 6, f'Fruits {fruits}', 8) # フルーツ

pyxel.run(update, draw)
