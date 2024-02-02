# Gaussian-Elimination-Method
Online Calculator for Matrixes of linear systems. A website to calculate the result of a linear system based on the Gaussian Elimination Algorithm.

Try the Tool here:
[Online Tool](https://rawgit.com/xremix/Gaussian-Elimination-Method/master/gaussian-elimination.html)

## Usage
Enter your Matrix space seperated into the textfield, including the result vector.

Your Matrix must have the form:
`Ax=b`
While `A` must be a `n * n` Matrix and `b` the result vector. 
The input must have `n+1` columns and `n` rows.

If you want to calculate a matrix like this:
```
1a + 2b + 3c = 2
1a + 1b + 1c = 2
3a + 3b + 1c = 0
```

Your input into the tool would be:
```
1 2 3 2
1 1 1 2
3 3 1 0
```

The result of the tool then would be:
```
a = 5
b = -6
c = 3
```

## Algorithm
The algorithm is always substracting two rows from each other like in the following sample:
```
3 9 3 | 8 
2 1 4 | 8

(3 * II) - (2 * I)

Which gives the result
3 9 3 = 8
0 -15 6 = 8
```

![Analytics](https://ga-beacon.appspot.com/UA-40522413-9/Gaussian-Elimination-Method/readme?pixel)
