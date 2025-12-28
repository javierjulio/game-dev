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
    global pl_x, pl_y, pl_dir, pl_steps
    ax = int(pl_x / SIZE) # ┬ 配列の添え字
    ay = int(pl_y / SIZE) # ┘

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

def update(): # メイン処理（計算、判定を行う）
    move_player() # プレイヤーキャラの移動

def draw(): # 描画処理
    draw_maze() # 迷路の表示
    draw_player() # プレイヤーキャラの表示

init_player() # 仮の呼び出し
pyxel.run(update, draw)
