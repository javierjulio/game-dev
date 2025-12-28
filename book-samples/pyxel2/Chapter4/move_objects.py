import pyxel

WIDTH, HEIGHT = 120, 80
pyxel.init(WIDTH, HEIGHT, title="物体の移動")

obj_x = [0, 0, 0, 0, 0]
obj_y = [10, 25, 40, 55, 70]
obj_vx = [1, 2, 3, 4, 5]

def update(): # メイン処理（更新処理）
    for i in range(5):
        obj_x[i] = obj_x[i] + obj_vx[i]
        if obj_x[i] < 0 or WIDTH < obj_x[i]:
            obj_vx[i] = -obj_vx[i]

def draw(): # 描画処理
    pyxel.cls(0)
    for i in range(5):
        pyxel.circ(obj_x[i], obj_y[i], 7, 7+i)

pyxel.run(update, draw)
