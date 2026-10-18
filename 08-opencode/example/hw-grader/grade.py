def calc_average(a, b, c):
    return (a + b + c) / 3


if __name__ == "__main__":
    scores = [85, 92, "78"]
    print("學期平均：", calc_average(*scores))
