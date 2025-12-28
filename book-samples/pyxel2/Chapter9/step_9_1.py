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

def update(): # メイン処理（計算、判定を行う）
    pass

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリアする
    draw_3dbg() # 背景を描く

pyxel.run(update, draw)
