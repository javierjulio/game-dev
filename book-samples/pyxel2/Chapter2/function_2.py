def triangle(w, h):
    a = w * h / 2
    return a

print("三角形の面積を求めよう")
a = triangle(12, 8)
print("底辺12、高さ8 面積は", a)
print("底辺5、高さ20 面積は", triangle(5, 20))
