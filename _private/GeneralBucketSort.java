import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GeneralBucketSort {

    public static void bucketSort(double[] arr) {

        /*
         * 如果陣列是 null，代表根本沒有資料。
         * 如果陣列長度是 0 或 1，也不需要排序。
         */
        if (arr == null || arr.length <= 1) {
            return;
        }

        /*
         * bucketCount 代表桶子的數量。
         * 這裡先用最常見的做法： 桶子數量 = 資料數量
         */
        int bucketCount = arr.length;

        /*
         * --------------------------------------------------
         * 第 1 步：找出最小值 min 和最大值 max，
         * --------------------------------------------------
         */
        double min = arr[0];
        double max = arr[0];

//        把全部資料遍歷，算出最小與最大值
        for (double num : arr) {
            if (num < min) {
                min = num;
            }

            if (num > max) {
                max = num;
            }
        }

        /*
         * --------------------------------------------------
         * 特殊情況：所有數字都一樣，不需要分桶，因為已經排序好了。
         * --------------------------------------------------
         */
        if (min == max) {
            return;
        }

        /*
         * --------------------------------------------------
         * 第 2 步：建立桶子
         * --------------------------------------------------
         * buckets 是一個 List，裡面裝很多個桶子。
         * 每一個桶子本身也是一個 List<Double>。
         * 可以想成：
         * buckets.get(0) 是第 0 個桶子
         * buckets.get(1) 是第 1 個桶子
         * buckets.get(2) 是第 2 個桶子
         */
        List<List<Double>> buckets = new ArrayList<>();

        /*
         * 建立 bucketCount 個空桶子。
         *
         * 如果 bucketCount = 7，就會建立：
         *
         * bucket[0]
         * bucket[1]
         * bucket[2]
         * bucket[3]
         * bucket[4]
         * bucket[5]
         * bucket[6]
         */
        for (int i = 0; i < bucketCount; i++) {
            buckets.add(new ArrayList<>());
        }

        /*
         * --------------------------------------------------
         * 第 3 步：把每個數字放進對應桶子
         * --------------------------------------------------
         *
         * 這是 Bucket Sort 最重要的地方。
         *
         * 通用分桶公式：
         *
         * index = (int)(((num - min) / (max - min)) * bucketCount)
         *
         * 公式拆解：
         *
         * num - min
         * → 把資料起點移到 0
         *
         * max - min
         * → 算出整體資料範圍
         *
         * (num - min) / (max - min)
         * → 算出 num 在整體範圍中的比例，結果會在 0~1 之間
         *
         * 再乘上 bucketCount
         * → 把 0~1 的比例轉成桶子的編號範圍
         *
         * 最後轉 int
         * → 因為陣列索引必須是整數
         */
        for (double num : arr) {

            /*
             * range 是資料的總範圍。
             *
             * 例如：
             *
             * min = 17
             * max = 94
             *
             * range = 94 - 17 = 77
             */
            double range = max - min;

            /*
             * normalized 代表標準化後的位置。
             *
             * 標準化的意思是：
             *
             * 不管原本資料是 0~1、0~100、-50~50，
             * 都先轉成 0~1 之間的比例。
             *
             * 例如：
             *
             * num = 78
             * min = 17
             * max = 94
             *
             * normalized = (78 - 17) / (94 - 17)
             *            = 61 / 77
             *            ≈ 0.792
             *
             * 代表 78 大約在整體範圍的 79.2% 位置。
             */
            double normalized = (num - min) / range;

            /*
             * 把 0~1 的比例轉成桶子的索引。
             *
             * 假設 bucketCount = 7
             *
             * normalized = 0.792
             *
             * 0.792 * 7 = 5.544
             *
             * (int)5.544 = 5
             *
             * 所以 num 會放進 bucket[5]。
             */
            int index = (int)(normalized * bucketCount);

            /*
             * --------------------------------------------------
             * 修正 index 超出範圍的問題
             * --------------------------------------------------
             *
             * bucketCount = 7 時，桶子的編號是：
             *
             * 0, 1, 2, 3, 4, 5, 6
             *
             * 最大只能是 6。
             *
             * 但如果 num 剛好等於 max：
             *
             * normalized = 1.0
             *
             * index = (int)(1.0 * 7)
             *       = 7
             *
             * 這會變成 bucket[7]，可是 bucket[7] 不存在。
             *
             * 所以如果 index 等於 bucketCount，就改成最後一個桶子。
             */
            if (index == bucketCount) {
                index = bucketCount - 1;
            }

            /*
             * 這段通常不會發生。
             *
             * 但 double 小數運算有時候會有極小誤差。
             *
             * 為了安全，如果 index 不小心小於 0，
             * 就把它修正成 0。
             */
            if (index < 0) {
                index = 0;
            }

            /*
             * 同樣是安全保護。
             *
             * 如果 index 不小心超過最後一個桶子，
             * 就把它修正成最後一個桶子。
             */
            if (index >= bucketCount) {
                index = bucketCount - 1;
            }

            /*
             * 把 num 放進算出來的桶子。
             *
             * 例如 index = 5：
             *
             * buckets.get(5).add(num);
             *
             * 就是把 num 放進 bucket[5]。
             */
            buckets.get(index).add(num);
        }

        /*
         * --------------------------------------------------
         * 第 4 步：每個桶子內部排序
         * --------------------------------------------------
         *
         * Bucket Sort 只是先把資料分到不同區間。
         *
         * 但同一個桶子裡面可能有多個資料，
         * 而且桶子內部不一定已經排好。
         *
         * 例如：
         *
         * bucket[5] = [78, 72]
         *
         * 所以每個桶子內部還要排序，變成：
         *
         * bucket[5] = [72, 78]
         */
        for (List<Double> bucket : buckets) {
            Collections.sort(bucket);
        }

        /*
         * --------------------------------------------------
         * 第 5 步：把桶子依序合併回原本陣列
         * --------------------------------------------------
         *
         * 因為 bucket[0] 負責比較小的範圍，
         * bucket[1] 負責比較後面的範圍，
         * bucket[2] 又更大，
         * ...
         *
         * 所以只要從 bucket[0] 開始依序拿出資料，
         * 合併後就會是從小到大。
         */
        int arrIndex = 0;

        for (List<Double> bucket : buckets) {
            for (double num : bucket) {

                /*
                 * 把桶子裡的資料放回原本陣列。
                 *
                 * arrIndex 代表目前要放回 arr 的哪個位置。
                 */
                arr[arrIndex] = num;

                /*
                 * 放完一個數字後，arrIndex 往後移一格。
                 */
                arrIndex++;
            }
        }
    }
}