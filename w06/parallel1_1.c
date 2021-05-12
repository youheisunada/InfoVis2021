#include  <stdio.h>
#include  <math.h>
#define N 1000
double a[N][N], x[N], y[N];
int main(void){
    int i, j;
    double error,ans;
    for(i = 0; i < N ; i++){
        for( j = 0; j < N; j++){
            a[i][j] = (i+1) + (j+1);
        }
        y[i] = 0;
        x[i] = i+1;
    }

    for(i = 0; i < N ; i++){
        for( j = 0; j < N; j++){
          y[i] = y[i] + a[i][j] * x[j];
        }
    }

}