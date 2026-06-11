import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GeneralBucketSort {
    // 陣列每個元素跟身邊的元素做比較，比較小的就交換
    public static void bubbleSort(double[] arr) {
        int arrLength = arr.length;
        for(int i=0; i < arrLength-1; i++){
            for(int j=0; j< arrLength-i-1;j++) {
                if(arr[j]>arr[j+1]){
                    double tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }
        }
    }

    public static void selectionSort(double[] arr) {
        // 把陣列當成兩部分來看，前半部分為已排序，後半部分為未排序
        int arrLength = arr.length;

        for (int i = 0; i < arrLength - 1; i++) {
            double smallNum = arr[i];
            int tmpKey = i;

            for (int j = i + 1; j < arrLength; j++) {
                if (smallNum > arr[j]) {
                    smallNum = arr[j];
                    tmpKey = j;
                }
            }

            double tmp = arr[i];
            arr[i] = smallNum;
            arr[tmpKey] = tmp;
        }
    }




}


