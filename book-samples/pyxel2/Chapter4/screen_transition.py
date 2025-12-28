import pyxel
pyxel.init(120, 80, title="画面遷移")

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理

def update(): # メイン処理（更新処理）
    global scene, timer
    timer = timer + 1

    if scene == TITLE: # タイトル画面
        if pyxel.btn(pyxel.KEY_SPACE):
            scene = PLAY

    if scene == PLAY: # プレイ画面
        if pyxel.btn(pyxel.KEY_RETURN):
            scene = OVER
            timer = 0

    if scene == OVER: # ゲームオーバー画面
        if timer == 120:
            scene = TITLE

def draw(): # 描画処理
    pyxel.cls(0)

    if scene == TITLE: # タイトル画面
        pyxel.text(50, 20, "TITLE", 11)
        if timer % 30 < 15:
            pyxel.text(35, 40, "Press [SPACE]", 7)

    if scene == PLAY: # プレイ画面
        pyxel.text(40, 20, "GAME PLAY", 12)
        if timer % 30 < 15:
            pyxel.text(35, 40, "Press [Enter]", 6)

    if scene == OVER: # ゲームオーバー画面
        pyxel.rect(0, 19, timer, 7, 8) 
        pyxel.text(40, 20, "GAME OVER", 0)

pyxel.run(update, draw)
