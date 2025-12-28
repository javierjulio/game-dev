import pyxel

pyxel.init(128, 128, title="Pyxel Editorの使い方")
pyxel.load("resource/sideview.pyxres") # リソースファイルを読み込む
pyxel.mouse(True) # マウスポインタを表示

def update(): # メイン処理（計算、判定を行う）
    if pyxel.btnp(pyxel.KEY_S): # Sキー
        pyxel.play(3, 48, resume=True) # サウンドを再生

    if pyxel.btnp(pyxel.KEY_B): # Bキー
        pyxel.playm(0, loop=True) # ミュージックをループ再生

    if pyxel.btnp(pyxel.KEY_C): # Cキー
        pyxel.tilemaps[0].blt(0, 0, 1, 0, 0, 16, 16) # タイルマップをコピー

def draw(): # 描画処理
    pyxel.cls(0) # 画面をクリア

    pyxel.bltm( # タイルマップを表示
        0, 0,     # 画面上の(x,y)座標
        0,        # タイルマップ番号（0～7)
        0, 0,     # タイルマップの左上角の座標　※ピクセル単位で指定
        128, 128, # 幅、高さ
        0,        # 透明色とする色の番号（省略可能）
        0,        # 回転角（省略可能）
        1.0       # 拡大率（省略可能）
    )

    x = pyxel.frame_count % 128 # キャラクターのx座標
    y = 60
    pyxel.blt( # キャラクターを表示
        x, y,     # 画面上の(x,y)座標
        0,        # イメージバンク番号(0～2)
        0, 8,     # イメージバンクの左上角の座標
        8, 8,     # 幅、高さ
        0         # 透明色とする色の番号（省略可能）
    )

    # マウスポインタの座標
    pyxel.text(1, 1, f'({pyxel.mouse_x},{pyxel.mouse_y})', 7)

    # どのタイルかを知る
    tx = pyxel.mouse_x // 8
    ty = pyxel.mouse_y // 8
    if (0 <= tx <= 15) and (0 <= ty <= 15): # 画面の範囲内
        t = pyxel.tilemaps[0].pget(tx, ty)
        pyxel.text(1, 9, str(t), 8) # タイルの値を出力

    # キーの説明
    pyxel.text(70, 1, "[S] SE", 7)
    pyxel.text(70, 9, "[B] BGM", 7)
    pyxel.text(70, 17, "[C] TILE COPY", 14)

pyxel.run(update, draw)
