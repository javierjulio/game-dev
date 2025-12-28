import pyxel

WIDTH, HEIGHT = 160, 144 # 幅と高さのピクセル数
pyxel.init(WIDTH, HEIGHT, title="Car Race")
pyxel.images[0].load(0, 0, "resource/car.png")
pyxel.images[1].load(0, 0, "resource/road.png")
pyxel.mouse(True) # マウスポインタを表示する

TITLE, PLAY, OVER = 0, 1, 2 # 画面遷移用の定数
scene = TITLE # 現在のシーン
timer = 0 # 時間を管理
score = 0 # スコア
hisco = 5000 # ハイスコア

ROAD_L, ROAD_R = 48, 112 # 道路の左端、右端の座標
RED, GREEN, YELLOW, BLUE = 0, 1, 2, 3 # 車の色の定数
CAR_MAX = 11 # 車の数
PL_CAR  =  0 # プレイヤーの車のインデックス
COM_CAR =  1 # コンピューターの車のインデックス（これ以降がコンピューターの車）
car_x, car_y, car_col = [0]*CAR_MAX, [0]*CAR_MAX, [0]*CAR_MAX

def set_car(): # 全ての車の座標と色をセット
    car_x[PL_CAR] = WIDTH / 2  # ┬ プレイヤーの車
    car_y[PL_CAR] = HEIGHT / 3 # │
    car_col[PL_CAR] = RED      # ┘
    for i in range(COM_CAR, CAR_MAX): # コンピューターの車
        car_x[i] = ROAD_L + 6 + 17 * (i % 4)
        car_y[i] = HEIGHT / 2 + 40 + 18 * (i // 4)
        car_col[i] = GREEN + i % 3

def move_plcar(): # プレイヤーの車の座標を計算
    car_x[PL_CAR] = car_x[PL_CAR] * 0.8 + pyxel.mouse_x * 0.2
    car_y[PL_CAR] = car_y[PL_CAR] * 0.8 + pyxel.mouse_y * 0.2
    if car_x[PL_CAR] < ROAD_L: car_x[PL_CAR] = ROAD_L
    if car_x[PL_CAR] > ROAD_R: car_x[PL_CAR] = ROAD_R
    if car_y[PL_CAR] < 10: car_y[PL_CAR] = 10
    if car_y[PL_CAR] > HEIGHT - 10: car_y[PL_CAR] = HEIGHT - 10

def move_comcar(): # コンピューターの車の座標を計算
    global scene, timer
    for i in range(COM_CAR, CAR_MAX):
        car_y[i] += 1 + (i / 10)
        if car_y[i] > HEIGHT + 16: # 画面の下に出た
            car_x[i] = pyxel.rndi(ROAD_L, ROAD_R)
            car_y[i] = pyxel.rndi(-30, -10)
         # ヒットチェック
        if abs(car_x[PL_CAR] - car_x[i]) < 9 and abs(car_y[PL_CAR] - car_y[i]) < 14:
            scene = OVER
            timer = 0

def draw_car(): # 全ての車を表示
    for i in range(CAR_MAX):
        sx = 16 * car_col[i]
        pyxel.blt(car_x[i] - 5, car_y[i] - 8, 0, sx, 0, 10, 16, 0)

def scroll_bg(): # 背景のスクロール
    ofy = 4 * (pyxel.frame_count % 12) # 道路とビルをずらすための値を計算
    for i in range(5): # 道路とビルを縦に複数、並べる
        pyxel.blt(40, -48 + ofy + i * 48, 1, 0, 0, 80, 48) # 道路
        for lr in range(2): # 左と右のビル
            x = 20 + lr * 120     # ┬ 1階の座標
            y = -8 + ofy + i * 48 # ┘
            for f in range(10): # 10フロア分、積み重ねる
                siz = 16 + f * 2 # 1フロアの大きさ（上に行くほど大きくする）
                col = 12 + (f % 2) # フロアの色を変える
                pyxel.rect(x - siz / 2, y - siz / 2, siz, siz, col)
                x = x + lr * 4 - 2         # ┬ 座標をずらしていく
                y = y - 4 + 6 * y / HEIGHT # ┘

def text(x, y, txt, col): # 黒く縁取った文字列を表示する
    for ofs in [-1, 1]: # 黒文字の座標をずらすためのfor文
        pyxel.text(x, y + ofs, txt, 0) # 上下
        pyxel.text(x + ofs, y, txt, 0) # 左右
    pyxel.text(x, y, txt, col)

def update(): # メイン処理（計算、判定を行う）
    global scene, timer, score, hisco

    if scene == TITLE: # タイトル
        if pyxel.btnp(pyxel.MOUSE_BUTTON_LEFT): # クリックで開始
            set_car()
            scene = PLAY
            score = 0

    if scene == PLAY: # ゲームプレイ
        move_plcar()  # プレイヤーの車の移動
        move_comcar() # コンピューターの車の移動
        score += 10
        if score > hisco: hisco = score

    if scene == OVER: # ゲームオーバー
        timer += 1
        if timer == 150: scene = TITLE

def draw(): # 描画処理
    pyxel.cls(1) # 画面をクリアする
    scroll_bg()  # 背景を表示（画面のスクロール）
    draw_car()   # 全ての車を表示

    if scene == TITLE: # タイトル
        text(WIDTH // 2 - 16, HEIGHT * 0.2, "CAR RACE", 7)
        if (pyxel.frame_count // 10) % 2 == 0:
            text(WIDTH // 2 - 28, HEIGHT * 0.73, "Click to start", 7)

    if scene == OVER: # ゲームオーバー
        text(WIDTH // 2 - 18, HEIGHT * 0.3, "GAME OVER", 8)

    text(1, 1, f'SCORE {score}', 7) # スコア
    text(WIDTH // 2, 1, f'HI-SC {hisco}', 14) # ハイスコア

set_car() # 車の初期座標をセット
pyxel.run(update, draw)
