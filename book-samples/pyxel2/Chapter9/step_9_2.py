import pyxel

WIDTH, HEIGHT = 240, 160 # 幅と高さのピクセル数
CX, CY = WIDTH // 2, HEIGHT // 2 # 画面の中心の(x, y)座標
pyxel.init(WIDTH, HEIGHT, title="3D STG")
pyxel.mouse(True) # マウスポインタを表示

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

def draw_launcher(): # ランチャー
    x, y = pyxel.mouse_x, pyxel.mouse_y
    pyxel.line(x - 10, y, x + 10, y, 7)
    pyxel.line(x, y - 10, x, y + 10, 7)
    pyxel.rectb(x - 3, y - 3, 7, 7, 13)

# ミサイルを制御する配列
DEPTH = 1000 # 奥行き
MSL_MAX = 20 # ミサイルの最大数
msl_x = [0] * MSL_MAX
msl_y = [0] * MSL_MAX
msl_z = [0] * MSL_MAX
msl_flag = [False] * MSL_MAX

def set_missile(x, y, z): # ミサイルをセットする
    for i in range(MSL_MAX):
        if msl_flag[i] == True: continue
        msl_x[i], msl_y[i], msl_z[i] = x, y, z
        msl_flag[i] = True
        break

def move_missile(): # ミサイルを動かす
    for i in range(MSL_MAX):
        if msl_flag[i] == False: continue
        msl_z[i] += 40
        if msl_z[i] >= DEPTH: # 奥まで飛んだ
            msl_flag[i] = False

def draw_missile(): # ミサイルを表示する
    for i in range(MSL_MAX):
        if msl_flag[i] == False: continue
        x = CX + msl_x[i] * (DEPTH - msl_z[i]) / DEPTH
        y = CY + msl_y[i] * (DEPTH - msl_z[i]) / DEPTH
        r = 10 * (DEPTH - msl_z[i]) / DEPTH # ミサイルの半径
        pyxel.circb(x, y, r, pyxel.rndi(8, 10))

def update(): # メイン処理（計算、判定を行う）
    if pyxel.btn(pyxel.MOUSE_BUTTON_LEFT): # クリックでミサイル発射
        set_missile(pyxel.mouse_x - CX, pyxel.mouse_y - CY, 0)
    move_missile() # ミサイルの移動

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    draw_3dbg() # 背景を描く
    draw_missile() # ミサイルの表示
    draw_launcher() # ランチャーの表示

pyxel.run(update, draw)
