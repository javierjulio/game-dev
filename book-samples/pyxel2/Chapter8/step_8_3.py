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

stage = 3 # ステージ
UP, DOWN, LEFT, RIGHT = 0, 1, 2, 3 # 進む向き（モンスターでも使用）

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

def update(): # メイン処理（計算、判定を行う）
    move_monster() # モンスターの移動

def draw(): # 描画処理
    draw_maze() # 迷路の表示
    draw_monster() # モンスターの表示

init_monster() # 仮の呼び出し
pyxel.run(update, draw)
