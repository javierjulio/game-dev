import pyxel

WIDTH, HEIGHT = 240, 160 # 幅と高さのピクセル数
CX, CY = WIDTH // 2, HEIGHT // 2 # 画面の中心の(x, y)座標
pyxel.init(WIDTH, HEIGHT, title="3D STG")
pyxel.mouse(True) # マウスポインタを表示
pyxel.images[0].load(0, 0, "resource/robot.png")

bg_scrl = 0 # 地面のスクロール用

def draw_3dbg(): # 疑似3Dの背景を描く
    global bg_scrl
    bg_scrl = (bg_scrl + 1) % 10
    pyxel.rect(0, CY, WIDTH, HEIGHT // 2, 12) # 矩形
    for i in range(9): # 移動する線
        y = i + bg_scrl / 10
        line_y = CY + y * y
        pyxel.line(0, line_y, WIDTH, line_y, 5)
    pyxel.tri(0, CY, CX, CY, 0, HEIGHT, 1) # 左側の三角形
    pyxel.tri(WIDTH, CY, CX, CY, WIDTH, HEIGHT, 1) # 右側の三角形

DEPTH = 1000 # 奥行き

# 敵機用の定数、配列
EMY_MAX = 20
EMY_MOVE = 1 # 移動
EMY_EXPLODE = 2 # 爆発
emy_x  = [0] * EMY_MAX
emy_y  = [0] * EMY_MAX
emy_z  = [0] * EMY_MAX
emy_vx = [0] * EMY_MAX
emy_vy = [0] * EMY_MAX
emy_vz = [0] * EMY_MAX
emy_action = [0] * EMY_MAX
emy_time   = [0] * EMY_MAX

def set_enemy(): # 敵機をセットする
    for i in range(EMY_MAX):
        if emy_action[i] != 0: continue
        emy_x[i] = pyxel.rndi(-CX, CX)
        emy_y[i] = pyxel.rndi(-CY, CY)
        emy_z[i] = DEPTH
        emy_vx[i] = pyxel.rndi(-6, 6)
        emy_vy[i] = pyxel.rndi(-4, 4)
        emy_vz[i] = pyxel.rndi(-10, -5)
        emy_action[i] = EMY_MOVE
        emy_time[i] = 0
        break

def move_enemy(): # 敵機を動かす
    for i in range(EMY_MAX):
        if emy_action[i] == EMY_MOVE: # 移動
            emy_x[i] += emy_vx[i]
            emy_y[i] += emy_vy[i]
            if emy_x[i] < -CX and emy_vx[i] < 0:
                emy_vx[i] = -emy_vx[i]
            if emy_x[i] > CX and emy_vx[i] > 0:
                emy_vx[i] = -emy_vx[i]
            if emy_y[i] < -CY and emy_vy[i] < 0:
                emy_vy[i] = -emy_vy[i]
            if emy_y[i] > CY and emy_vy[i] > 0:
                emy_vy[i] = -emy_vy[i]
            emy_z[i] += emy_vz[i]
            if emy_z[i] < 0: # 手前に到達
                emy_action[i] = 0

def draw_enemy(): # 敵機を表示する
    for i in range(EMY_MAX):
        x = CX + emy_x[i] * (DEPTH - emy_z[i]) / DEPTH
        y = CY + emy_y[i] * (DEPTH - emy_z[i]) / DEPTH
        siz = (DEPTH - emy_z[i]) / DEPTH
        if emy_action[i] == EMY_MOVE: # 移動
            pyxel.blt(x - 32, y - 32, 0, 0, 0, 64, 64, 13, 0, siz)

def update(): # メイン処理（計算、判定を行う）
    if pyxel.frame_count % 30 == 0: # 敵の出現
        set_enemy()
    move_enemy() # 敵機の移動

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    draw_3dbg() # 背景を描く
    draw_enemy() # 敵機の表示

pyxel.run(update, draw)
