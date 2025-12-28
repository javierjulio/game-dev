import pyxel

WIDTH, HEIGHT = 160, 120
pyxel.init(WIDTH, HEIGHT, title="Mini STG")
pyxel.images[0].load(0, 0, "resource/starships.png")

# 敵機用の定数、配列
NONE, ROTATE, PARABOLA, BATTERY, BULLET = -1, 0, 1, 2, 3 # 種類
EMY_MAX = 20
emy_x  = [0] * EMY_MAX
emy_y  = [0] * EMY_MAX
emy_vx = [0] * EMY_MAX
emy_vy = [0] * EMY_MAX
emy_type = [NONE] * EMY_MAX
emy_damage = [0] * EMY_MAX

def init_enemy(): # 全ての敵機を出現していない状態にする
    for i in range(EMY_MAX):
        emy_type[i] = NONE

def set_enemy(x, y, vx, vy, typ): # 敵機をセットする
    for i in range(EMY_MAX):
        if emy_type[i] != NONE: continue
        emy_x[i] = x
        emy_y[i] = y
        emy_vx[i] = vx
        emy_vy[i] = vy
        emy_type[i] = typ
        emy_damage[i] = 0
        break

def move_enemy(): # 敵機を動かす
    for i in range(EMY_MAX):
        if emy_type[i] == NONE: continue
        emy_x[i] += emy_vx[i]
        emy_y[i] += emy_vy[i]
        if emy_x[i] < -10 or WIDTH + 10 < emy_x[i]: # 画面の外に出た
            emy_type[i] = NONE # 敵を消す

def draw_enemy(): # 敵機を表示する
    for i in range(EMY_MAX):
        if emy_type[i] == NONE: continue
        sx = 24 + emy_type[i] * 8 # 画像の切り出し位置
        ang = 0 # 画像の回転角度
        if emy_type[i] == ROTATE: # 回転する敵
            ang = pyxel.frame_count * 10
        pyxel.blt(emy_x[i] - 4, emy_y[i] - 4, 0, sx, 0, 8, 8, 0, ang)

def update(): # メイン処理（計算、判定を行う）
    if pyxel.frame_count % 30 == 0: # 回転する敵が出現
        set_enemy(WIDTH, pyxel.rndi(12, HEIGHT - 28), pyxel.rndi(-2, -1), 0, ROTATE)
    move_enemy() # 敵機の移動

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    draw_enemy() # 敵機の表示

pyxel.run(update, draw)
