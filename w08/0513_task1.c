#include <stdio.h>
#include <omp.h>

int main(void){
    #pragma omp parallel
    {
        printf("A:my thread number = %d/n", omp_get_thread_num());
    }
     printf("B:my thread number = %d/n", omp_get_thread_num());

     return 0;

}