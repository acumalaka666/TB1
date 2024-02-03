import numpy as np

def gcd(a, b):
    a = abs(a)
    b = abs(b)
    while(b > 0):
        c = a % b
        a = b
        b = c
    return a

def output():
    widths = np.zeros((cols),dtype=int)
    for i in range(rows):
        for j in range(cols):
            widths[j] = max(widths[j],len(matrix[i][j].__str__()))
    for i in range(rows):
        for j in range(cols):
            print(matrix[i][j].__str__().ljust(widths[j]), end=' ')
        print("")
    print("")

class Fraction:
    num = 1
    den = 1

    def __init__(self, frac):
        self.num = int(frac.split("/")[0])
        if(frac.find("/") != -1):
            self.den = int(frac.split("/")[1])
        else:
            self.den = 1
        self.reduce()

    def reduce(self):
        g = gcd(self.den, self.num)
        self.den = int(self.den / g)
        self.num = int(self.num / g)
        if self.den < 0:
            self.den *= -1
            self.num *= -1

    def __truediv__(self,other):
        res = Fraction("1")
        res.den = self.den * other.num
        res.num = self.num * other.den
        res.reduce()
        return res
        
    def __mul__(self,other):
        res = Fraction("1")
        res.den = self.den * other.den
        res.num = self.num * other.num
        res.reduce()
        return res

    def __add__(self,other):
        res = Fraction("1")
        lcm = int((self.den * other.den) / gcd(self.den, other.den))
        res.den = lcm
        res.num = self.num * (lcm / self.den) + other.num * (lcm / other.den)
        res.reduce()
        return res

    def __sub__(self,other):
        res = Fraction("1")
        lcm = int((self.den * other.den) / gcd(self.den, other.den))
        res.den = lcm
        res.num = self.num * (lcm / self.den) - other.num * (lcm / other.den)
        res.reduce()
        return res
    
    def __str__(self):
        if self.den != 1:
            return str(self.num) + "/" + str(self.den)
        else:
            return str(self.num)

    def __abs__(self):
        res = Fraction("1")
        res.num = abs(self.num)
        res.den = self.den
        return res

rows = 0
cols = 0

rows = int(input("Enter number of rows:"))
cols = int(input("Enter number of columns:"))

matrix = np.zeros((rows,cols), dtype=object)

print("Enter the matrix (line by line):")
for i in range(rows):
    line = input().split()
    for j in range(len(line)):
        matrix[i][j] = Fraction(line[j])

print("Gauss:")

pivot = Fraction("0")
for k in range(0,cols): #First row
    if matrix[0][k] != 0 and pivot.num == 0:
        pivot = matrix[0][k]
    if pivot.num != 0:
        matrix[0][k] /= pivot

for i in range(0,cols - 1):         #Col position / pivot
    for j in range(i + 1,rows): #Row number
        if matrix[i][i].num == 0:
            continue
        ratio = matrix[j][i] / matrix[i][i]
        print("r",j + 1,"-" if ratio.num >= 0 else "+", abs(ratio),"r",i + 1,sep='')
        pivot = Fraction("0")
        for k in range(i,cols): #Element in Row
            matrix[j][k] = matrix[j][k] - ratio * matrix[i][k]
            if matrix[j][k] != 0 and pivot.num == 0:
                pivot = matrix[j][k]
            if pivot.num != 0:
                matrix[j][k] /= pivot

        output()

        
print("Jordan:")
pivots = min(rows, cols)
for i in range(pivots - 1, 0, -1):   #Col position
    for j in range(i - 1, -1, -1):      #Row number 不包括-1
        if j > rows - 1:
            continue
        ratio = matrix[j][i]
        print("r",j + 1,"-" if ratio.num >= 0 else "+", abs(ratio),"r",i + 1,sep='')
        for k in range(cols - 1, i  - 1, -1): #Element in Row
            matrix[j][k] = matrix[j][k] - ratio * matrix[i][k]
        output()
