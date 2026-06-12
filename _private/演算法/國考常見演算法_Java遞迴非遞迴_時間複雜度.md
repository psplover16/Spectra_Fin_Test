# 國考常見演算法 Java 版本與時間複雜度驗證筆記

> 適用情境：國考程式語言、資料結構、演算法基礎題。  
> 語言：Java  
> 版本：含遞迴版本與非遞迴版本。  
> 範圍：氣泡排序法、快速排序法、Fibonacci 序列、最大公因數、二元搜尋法、選擇排序法、插入排序法。

---

# 重要修正與使用原則

## 1. Binary Search 不是 Binary Search Tree

本筆記中的「二元搜尋法 Binary Search」是指：

```text
在已排序陣列中，每次取中間值比較，然後捨棄一半搜尋範圍。
```

它不是 BST、AVL、紅黑樹。

---

## 2. 二元搜尋法一定要先排序

二元搜尋法的前提是：

```text
陣列必須已經由小到大排序。
```

如果陣列沒有排序，二元搜尋法的結果可能錯誤。

---

## 3. Fibonacci 的正確基本條件

Fibonacci 標準定義：

```text
F(0) = 0
F(1) = 1
F(n) = F(n - 1) + F(n - 2)
```

所以 Java 程式應寫成：

```java
if (n <= 1) {
    return n;
}
```

不是：

```java
if (n >= 1) {
    return n;
}
```

因為如果寫 `n >= 1`，那 `fib(2)` 會直接回傳 2，不會進入 `fib(1) + fib(0)`，邏輯會錯。

---

## 4. 時間複雜度記法提醒

Big-O 主要看：

```text
資料量 n 變大時，執行步驟數的成長等級。
```

常見簡化規則：

```text
O(3n)       -> O(n)
O(n² + n)   -> O(n²)
O(n² + 3n + 10) -> O(n²)
```

原因：Big-O 忽略常數，並保留成長最快的項。

---

# 完整 Java 程式碼

以下程式可直接存成：

```text
AlgorithmExamJava.java
```

然後執行：

```bash
javac AlgorithmExamJava.java
java AlgorithmExamJava
```

若正確，會輸出：

```text
All tests passed.
```

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class AlgorithmExamJava {
    // 共用交換方法：排序演算法常需要交換兩個位置的值。
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // ============================================================
    // 1. 氣泡排序法 Bubble Sort - 非遞迴版本
    // ============================================================
    public static void bubbleSortIterative(int[] arr) {
        int n = arr.length;

        // 外層控制「第幾輪」。每一輪會把目前範圍內最大的值推到右邊。
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false; // 用來判斷本輪有沒有交換；若沒有，代表已排序完成。

            // 內層負責相鄰比較。n - i - 1 是因為右邊 i 個元素已經排好。
            for (int j = 0; j < n - i - 1; j++) {
                // 若左邊比右邊大，就交換，讓大的值慢慢往右邊「浮上去」。
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }

            // 若整輪都沒有交換，代表陣列已經由小到大排序完成。
            if (!swapped) {
                break;
            }
        }
    }

    // 1. 氣泡排序法 Bubble Sort - 遞迴版本
    public static void bubbleSortRecursive(int[] arr) {
        bubbleSortRecursive(arr, arr.length);
    }

    private static void bubbleSortRecursive(int[] arr, int n) {
        // n <= 1 表示剩 0 或 1 個元素，不需要排序。
        if (n <= 1) {
            return;
        }

        boolean swapped = false;

        // 做一輪相鄰比較，把目前前 n 個元素中的最大值推到第 n - 1 個位置。
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;
            }
        }

        // 若沒有交換，代表已排序完成，可以提前結束。
        if (!swapped) {
            return;
        }

        // 最大值已經在最右邊，接著只需要排序前 n - 1 個元素。
        bubbleSortRecursive(arr, n - 1);
    }

    // ============================================================
    // 2. 快速排序法 Quick Sort - 遞迴版本
    // ============================================================
    public static void quickSortRecursive(int[] arr) {
        quickSortRecursive(arr, 0, arr.length - 1);
    }

    private static void quickSortRecursive(int[] arr, int left, int right) {
        // left >= right 表示區間沒有元素或只有一個元素，不需要排序。
        if (left >= right) {
            return;
        }

        // partition 會把 pivot 放到正確位置，並回傳 pivot 的位置。
        int pivotIndex = partition(arr, left, right);

        // pivot 左邊都 <= pivot，右邊都 > pivot；再分別排序左右區間。
        quickSortRecursive(arr, left, pivotIndex - 1);
        quickSortRecursive(arr, pivotIndex + 1, right);
    }

    // 使用 Lomuto partition：選最右邊元素當 pivot。
    private static int partition(int[] arr, int left, int right) {
        int pivot = arr[right];
        int i = left - 1; // i 代表「小於等於 pivot 區域」的最後位置。

        // 掃描 left 到 right - 1，把 <= pivot 的元素放到左邊。
        for (int j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }

        // 把 pivot 放到中間正確位置。
        swap(arr, i + 1, right);
        return i + 1;
    }

    // 2. 快速排序法 Quick Sort - 非遞迴版本
    public static void quickSortIterative(int[] arr) {
        if (arr.length <= 1) {
            return;
        }

        // 用堆疊保存尚未排序的區間 [left, right]，取代遞迴呼叫。
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] {0, arr.length - 1});

        while (!stack.isEmpty()) {
            int[] range = stack.pop();
            int left = range[0];
            int right = range[1];

            if (left >= right) {
                continue;
            }

            int pivotIndex = partition(arr, left, right);

            // pivot 左右兩邊還沒完全排序，丟回 stack 等待處理。
            if (left < pivotIndex - 1) {
                stack.push(new int[] {left, pivotIndex - 1});
            }
            if (pivotIndex + 1 < right) {
                stack.push(new int[] {pivotIndex + 1, right});
            }
        }
    }

    // ============================================================
    // 3. Fibonacci 序列 - 遞迴版本
    // 定義：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)
    // ============================================================
    public static long fibonacciRecursive(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be >= 0");
        }

        // n = 0 回傳 0；n = 1 回傳 1。
        if (n <= 1) {
            return n;
        }

        // 把問題拆成前兩項相加。
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    // 3. Fibonacci 序列 - 非遞迴版本
    public static long fibonacciIterative(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be >= 0");
        }
        if (n <= 1) {
            return n;
        }

        long prev = 0; // F(0)
        long curr = 1; // F(1)

        // 從 F(2) 算到 F(n)。
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }

        return curr;
    }

    // ============================================================
    // 4. 最大公因數 GCD - 遞迴版本
    // 使用歐幾里得演算法：gcd(a, b) = gcd(b, a % b)
    // ============================================================
    public static int gcdRecursive(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);
        return gcdRecursivePositive(a, b);
    }

    private static int gcdRecursivePositive(int a, int b) {
        // b = 0 時，a 就是最大公因數。
        if (b == 0) {
            return a;
        }

        // 把問題改成 gcd(b, a % b)，數字會越來越小。
        return gcdRecursivePositive(b, a % b);
    }

    // 4. 最大公因數 GCD - 非遞迴版本
    public static int gcdIterative(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);

        // 不斷用餘數取代，直到 b 變成 0。
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }

        return a;
    }

    // ============================================================
    // 5. 二元搜尋法 Binary Search - 遞迴版本
    // 前提：arr 必須已經由小到大排序。
    // ============================================================
    public static int binarySearchRecursive(int[] arr, int target) {
        return binarySearchRecursive(arr, target, 0, arr.length - 1);
    }

    private static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        // left > right 表示搜尋區間不存在，也就是找不到。
        if (left > right) {
            return -1;
        }

        // 避免 (left + right) 在極大資料時整數溢位。
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (target > arr[mid]) {
            // target 比中間值大，只需要找右半邊。
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            // target 比中間值小，只需要找左半邊。
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }

    // 5. 二元搜尋法 Binary Search - 非遞迴版本
    public static int binarySearchIterative(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (target > arr[mid]) {
                left = mid + 1; // 往右半邊找。
            } else {
                right = mid - 1; // 往左半邊找。
            }
        }

        return -1; // 找不到。
    }

    // ============================================================
    // 6. 選擇排序法 Selection Sort - 非遞迴版本
    // ============================================================
    public static void selectionSortIterative(int[] arr) {
        int n = arr.length;

        // i 代表目前要放正確值的位置。
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            // 從 i + 1 到最後，找出最小值的位置。
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // 把最小值交換到 i 的位置。
            if (minIndex != i) {
                swap(arr, i, minIndex);
            }
        }
    }

    // 6. 選擇排序法 Selection Sort - 遞迴版本
    public static void selectionSortRecursive(int[] arr) {
        selectionSortRecursive(arr, 0);
    }

    private static void selectionSortRecursive(int[] arr, int start) {
        // start 到最後只剩 0 或 1 個元素時，不需要排序。
        if (start >= arr.length - 1) {
            return;
        }

        int minIndex = start;

        // 找出 start 到最後的最小值位置。
        for (int j = start + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // 把最小值放到 start。
        if (minIndex != start) {
            swap(arr, start, minIndex);
        }

        // start 位置已經排好，接著排序 start + 1 之後的部分。
        selectionSortRecursive(arr, start + 1);
    }

    // ============================================================
    // 7. 插入排序法 Insertion Sort - 非遞迴版本
    // ============================================================
    public static void insertionSortIterative(int[] arr) {
        // i 左邊視為已排序區，arr[i] 是準備插入的值。
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;

            // 把比 key 大的元素往右移，空出 key 應該放的位置。
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            // j + 1 就是 key 的正確插入位置。
            arr[j + 1] = key;
        }
    }

    // 7. 插入排序法 Insertion Sort - 遞迴版本
    public static void insertionSortRecursive(int[] arr) {
        insertionSortRecursive(arr, arr.length);
    }

    private static void insertionSortRecursive(int[] arr, int n) {
        // 前 n 個元素中，若 n <= 1，代表不需要排序。
        if (n <= 1) {
            return;
        }

        // 先排序前 n - 1 個元素。
        insertionSortRecursive(arr, n - 1);

        // 再把第 n 個元素，也就是 arr[n - 1]，插入前面已排序區。
        int key = arr[n - 1];
        int j = n - 2;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    // ============================================================
    // 測試用 main：確認各方法可執行且結果正確。
    // ============================================================
    public static void main(String[] args) {
        int[] original = {5, 1, 4, 2, 8, 5, -3};
        int[] expected = original.clone();
        Arrays.sort(expected);

        testSort("bubbleSortIterative", original, expected, AlgorithmExamJava::bubbleSortIterative);
        testSort("bubbleSortRecursive", original, expected, AlgorithmExamJava::bubbleSortRecursive);
        testSort("quickSortRecursive", original, expected, AlgorithmExamJava::quickSortRecursive);
        testSort("quickSortIterative", original, expected, AlgorithmExamJava::quickSortIterative);
        testSort("selectionSortIterative", original, expected, AlgorithmExamJava::selectionSortIterative);
        testSort("selectionSortRecursive", original, expected, AlgorithmExamJava::selectionSortRecursive);
        testSort("insertionSortIterative", original, expected, AlgorithmExamJava::insertionSortIterative);
        testSort("insertionSortRecursive", original, expected, AlgorithmExamJava::insertionSortRecursive);

        if (fibonacciRecursive(10) != 55 || fibonacciIterative(10) != 55) {
            throw new RuntimeException("Fibonacci test failed");
        }

        if (gcdRecursive(48, 18) != 6 || gcdIterative(48, 18) != 6) {
            throw new RuntimeException("GCD test failed");
        }

        int[] sorted = {-3, 1, 2, 4, 5, 5, 8};
        if (binarySearchRecursive(sorted, 4) != 3 || binarySearchIterative(sorted, 4) != 3) {
            throw new RuntimeException("Binary Search found-value test failed");
        }
        if (binarySearchRecursive(sorted, 100) != -1 || binarySearchIterative(sorted, 100) != -1) {
            throw new RuntimeException("Binary Search not-found test failed");
        }

        System.out.println("All tests passed.");
    }

    @FunctionalInterface
    interface SortFunction {
        void sort(int[] arr);
    }

    private static void testSort(String name, int[] original, int[] expected, SortFunction function) {
        int[] data = original.clone();
        function.sort(data);
        if (!Arrays.equals(data, expected)) {
            throw new RuntimeException(name + " failed: " + Arrays.toString(data));
        }
    }
}

```

---

# 一、氣泡排序法 Bubble Sort

## 名詞解釋

氣泡排序法是一種簡單排序法。

它會重複比較相鄰兩個元素：

```text
如果左邊比右邊大，就交換。
```

每一輪結束後，目前範圍中的最大值會被推到最右邊。

---

## 核心想法

假設陣列是：

```text
[5, 1, 4, 2]
```

第一輪相鄰比較：

```text
5 和 1 比，5 較大，交換 -> [1, 5, 4, 2]
5 和 4 比，5 較大，交換 -> [1, 4, 5, 2]
5 和 2 比，5 較大，交換 -> [1, 4, 2, 5]
```

第一輪後，最大值 5 已經到最右邊。

---

## 時間複雜度驗證

### 最壞情況

例如：

```text
[5, 4, 3, 2, 1]
```

每一輪都要大量交換。

比較次數大約是：

```text
(n - 1) + (n - 2) + ... + 1
= n(n - 1) / 2
= (n² - n) / 2
```

Big-O 忽略常數與低次項：

```text
O(n²)
```

### 平均情況

平均仍然需要大量相鄰比較：

```text
O(n²)
```

### 最佳情況

本筆記版本有 `swapped` 提前結束。

若資料本來已排序：

```text
[1, 2, 3, 4, 5]
```

第一輪發現沒有交換，就直接停止。

最佳情況：

```text
O(n)
```

> 注意：如果考題版本沒有 `swapped` 提前結束，則最佳情況仍會是 O(n²)。

---

# 二、快速排序法 Quick Sort

## 名詞解釋

快速排序法是一種分治法 Divide and Conquer 的排序法。

它會選一個基準值：

```text
pivot
```

然後把資料分成兩邊：

```text
左邊：小於或等於 pivot
右邊：大於 pivot
```

接著再分別排序左右兩邊。

---

## 核心想法

快速排序的流程：

```text
1. 選 pivot
2. partition：把 pivot 放到正確位置
3. pivot 左邊再排序
4. pivot 右邊再排序
```

本筆記的程式使用 Lomuto partition：

```text
選最右邊元素當 pivot。
```

---

## 時間複雜度驗證

### 平均與最佳情況

如果每次 pivot 大約都能把資料分成兩半：

```text
T(n) = 2T(n/2) + O(n)
```

意思是：

```text
左右兩邊各排序一半資料，加上 partition 掃描一次 O(n)。
```

每一層 partition 總成本約是 O(n)。

層數大約是：

```text
log n
```

所以總成本：

```text
O(n log n)
```

### 最壞情況

如果 pivot 每次都選到最大或最小，會變成：

```text
T(n) = T(n - 1) + O(n)
```

比較次數大約：

```text
n + (n - 1) + (n - 2) + ... + 1
= O(n²)
```

所以快速排序：

| 情況 | 時間複雜度 |
|---|---|
| 最佳 | O(n log n) |
| 平均 | O(n log n) |
| 最壞 | O(n²) |

---

# 三、Fibonacci 序列

## 名詞解釋

Fibonacci 序列定義：

```text
F(0) = 0
F(1) = 1
F(n) = F(n - 1) + F(n - 2)
```

前幾項是：

```text
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
```

---

## 核心想法

要求 `F(5)`：

```text
F(5) = F(4) + F(3)
F(4) = F(3) + F(2)
F(3) = F(2) + F(1)
```

遞迴版本會不斷拆成更小問題。

非遞迴版本會用變數保存前兩項，逐步往後算。

---

## 時間複雜度驗證

### 遞迴版本

遞迴式：

```text
T(n) = T(n - 1) + T(n - 2) + O(1)
```

因為每次會呼叫：

```text
fib(n - 1)
fib(n - 2)
```

這會產生大量重複計算。

例如 `fib(5)` 會重複計算很多次 `fib(3)`、`fib(2)`。

所以初學與國考常記成：

```text
O(2ⁿ)
```

更精確可說接近：

```text
O(φⁿ)
```

其中 φ 約等於 1.618。國考通常寫 `O(2ⁿ)` 即可。

### 非遞迴版本

從 2 算到 n：

```text
for i = 2 到 n
```

執行約 n 次，所以：

```text
O(n)
```

---

# 四、最大公因數 GCD

## 名詞解釋

最大公因數 Greatest Common Divisor，簡稱 GCD。

例如：

```text
48 和 18 的最大公因數是 6
```

因為：

```text
48 = 6 × 8
18 = 6 × 3
```

而 6 是兩者共同因數中最大的。

---

## 核心想法：歐幾里得演算法

使用公式：

```text
gcd(a, b) = gcd(b, a % b)
```

直到：

```text
b = 0
```

此時：

```text
gcd(a, 0) = a
```

---

## 例子

求：

```text
gcd(48, 18)
```

過程：

```text
48 % 18 = 12，所以 gcd(48, 18) = gcd(18, 12)
18 % 12 = 6，所以 gcd(18, 12) = gcd(12, 6)
12 % 6 = 0，所以 gcd(12, 6) = 6
```

答案：

```text
6
```

---

## 時間複雜度驗證

每次取餘數後，問題規模會快速變小。

歐幾里得演算法的最壞情況出現在相鄰 Fibonacci 數，例如：

```text
gcd(55, 34)
gcd(34, 21)
gcd(21, 13)
...
```

遞迴或迴圈次數大約和數字位數成正比。

國考常記：

```text
O(log min(a, b))
```

意思是：

```text
時間複雜度跟較小的那個數字有關，而且是 log 等級。
```

---

# 五、二元搜尋法 Binary Search

## 名詞解釋

二元搜尋法是一種搜尋演算法。

前提：

```text
資料必須已排序。
```

它每次檢查中間值：

```text
如果 target 等於中間值 -> 找到
如果 target 大於中間值 -> 往右半邊找
如果 target 小於中間值 -> 往左半邊找
```

---

## 核心想法

例如陣列：

```text
[1, 3, 5, 7, 9, 11, 13]
```

要找 9：

```text
中間值是 7
9 > 7，所以左半邊不用找
只找 [9, 11, 13]
```

每次都丟掉一半資料。

---

## 時間複雜度驗證

一開始有 n 筆資料。

每次砍半：

```text
n -> n/2 -> n/4 -> n/8 -> ... -> 1
```

第 k 次後剩下：

```text
n / 2^k
```

停止時：

```text
n / 2^k = 1
```

所以：

```text
n = 2^k
k = log₂ n
```

因此：

| 情況 | 時間複雜度 |
|---|---|
| 最佳 | O(1) |
| 平均 | O(log n) |
| 最壞 | O(log n) |

---

# 六、選擇排序法 Selection Sort

## 名詞解釋

選擇排序法的想法是：

```text
每一輪從未排序區找出最小值，放到目前位置。
```

---

## 核心想法

假設陣列：

```text
[5, 1, 4, 2]
```

第一輪找最小值 1，放到 index 0：

```text
[1, 5, 4, 2]
```

第二輪從剩下的 `[5, 4, 2]` 找最小值 2，放到 index 1：

```text
[1, 2, 4, 5]
```

---

## 時間複雜度驗證

選擇排序不管資料原本是否已排序，每一輪都還是要找最小值。

比較次數大約是：

```text
(n - 1) + (n - 2) + ... + 1
= n(n - 1) / 2
= O(n²)
```

因此：

| 情況 | 時間複雜度 |
|---|---|
| 最佳 | O(n²) |
| 平均 | O(n²) |
| 最壞 | O(n²) |

---

# 七、插入排序法 Insertion Sort

## 名詞解釋

插入排序法的想法是：

```text
左邊視為已排序區，每次拿一個新元素插入到正確位置。
```

像整理撲克牌：

```text
手上的牌已排序，拿到新牌後，把它插入正確位置。
```

---

## 核心想法

假設陣列：

```text
[5, 1, 4, 2]
```

過程：

```text
先看 [5]，已排序
拿 1 插入 [5] 前面 -> [1, 5, 4, 2]
拿 4 插入 1 和 5 中間 -> [1, 4, 5, 2]
拿 2 插入 1 和 4 中間 -> [1, 2, 4, 5]
```

---

## 時間複雜度驗證

### 最佳情況

如果資料本來已排序：

```text
[1, 2, 3, 4, 5]
```

每次 while 條件很快失敗，不需要大量搬移。

最佳情況：

```text
O(n)
```

### 最壞情況

如果資料反向排序：

```text
[5, 4, 3, 2, 1]
```

每次新元素都要一路往前插入。

搬移次數大約：

```text
1 + 2 + 3 + ... + (n - 1)
= n(n - 1) / 2
= O(n²)
```

### 平均情況

平均仍會有不少搬移：

```text
O(n²)
```

---

# 八、總整理表

| 演算法 | 遞迴版本時間 | 非遞迴版本時間 | 重要備註 |
|---|---|---|---|
| 氣泡排序 Bubble Sort | 最佳 O(n)，平均/最壞 O(n²) | 最佳 O(n)，平均/最壞 O(n²) | 本版本有 swapped 提前結束 |
| 快速排序 Quick Sort | 平均 O(n log n)，最壞 O(n²) | 平均 O(n log n)，最壞 O(n²) | pivot 若切得不平均會退化 |
| Fibonacci | O(2ⁿ) | O(n) | 遞迴版會大量重複計算 |
| 最大公因數 GCD | O(log min(a,b)) | O(log min(a,b)) | 使用歐幾里得演算法 |
| 二元搜尋 Binary Search | 最佳 O(1)，平均/最壞 O(log n) | 最佳 O(1)，平均/最壞 O(log n) | 陣列必須先排序 |
| 選擇排序 Selection Sort | O(n²) | O(n²) | 每輪都要找最小值 |
| 插入排序 Insertion Sort | 最佳 O(n)，平均/最壞 O(n²) | 最佳 O(n)，平均/最壞 O(n²) | 已排序資料表現很好 |

---

# 九、空間複雜度補充

國考若只問時間複雜度，可以先不用寫空間複雜度。  
但若題目問完整分析，可補充：

| 演算法 | 遞迴版本空間 | 非遞迴版本空間 | 原因 |
|---|---|---|---|
| 氣泡排序 | O(n) | O(1) | 遞迴呼叫堆疊 |
| 快速排序 | 平均 O(log n)，最壞 O(n) | 平均 O(log n)，最壞 O(n) | stack 或遞迴深度 |
| Fibonacci | O(n) | O(1) | 遞迴呼叫堆疊 / 只用變數 |
| GCD | O(log min(a,b)) | O(1) | 遞迴深度 / 只用變數 |
| 二元搜尋 | O(log n) | O(1) | 遞迴深度 / 只用變數 |
| 選擇排序 | O(n) | O(1) | 遞迴呼叫堆疊 |
| 插入排序 | O(n) | O(1) | 遞迴呼叫堆疊 |

---

# 十、考試速記

```text
氣泡排序：相鄰比較，大的往右冒泡，平均/最壞 O(n²)
快速排序：pivot 分左右，平均 O(n log n)，最壞 O(n²)
Fibonacci 遞迴：重複計算，O(2ⁿ)
Fibonacci 迴圈：一路算到 n，O(n)
GCD：輾轉相除，O(log min(a,b))
二元搜尋：已排序陣列，每次砍半，O(log n)
選擇排序：每輪選最小，永遠 O(n²)
插入排序：插入已排序區，最佳 O(n)，平均/最壞 O(n²)
```

---

# 十一、產出前檢查紀錄

本筆記產出前以三個角度檢查：

```text
1. Java 語法檢查：完整 class 使用 javac 編譯通過。
2. Java 結果檢查：main 方法測試排序、Fibonacci、GCD、Binary Search，結果通過。
3. 時間複雜度檢查：逐一確認最佳、平均、最壞情況與推導式。
```

---

# 十二、重要提醒

1. 本筆記的快速排序使用最右邊元素當 pivot，方便教學，但若資料已排序，容易出現最壞情況 O(n²)。
2. Fibonacci 遞迴版雖然適合展示遞迴觀念，但效率很差，實務上通常改用迴圈、記憶化或動態規劃。
3. Binary Search 必須用在已排序陣列；未排序陣列不能直接使用。
4. 遞迴版本通常比較直覺，但會多出遞迴呼叫堆疊的空間成本。
