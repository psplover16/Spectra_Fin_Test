# 資料庫交易異常整理：Dirty Read、Non-repeatable Read、Phantom Read、Lost Update、Read Skew、Write Skew

> 適合初學者閱讀。  
> 重點：先知道每個異常「是什麼」、再知道「為什麼會發生」、最後用例子驗算。

---

## 學習順序

1. Dirty Read
2. Non-repeatable Read
3. Phantom Read
4. Lost Update
5. Read Skew / Inconsistent Read
6. Write Skew

---

# 一、總整理表

| 名詞 | 是什麼問題 | 發生原因 | 簡例與驗算 |
|---|---|---|---|
| **Dirty Read 髒讀** | 讀到別人還沒 `COMMIT` 的資料。 | 隔離層級太低，例如 `READ UNCOMMITTED`，允許讀取未提交資料。 | T1 把 A 從 1000 改成 900 還沒提交，T2 讀到 900；若 T1 後來 `ROLLBACK`，正式資料回到 1000，所以 `900 ≠ 1000`。 |
| **Non-repeatable Read 不可重複讀** | 同一交易內，前後兩次讀同一筆資料，值不同。 | 另一個交易在兩次讀取中間修改同一筆資料並 `COMMIT`。 | T1 第一次讀 A=1000；T2 改成 A=900 並提交；T1 第二次讀變 900，所以同一筆資料前後不同。 |
| **Phantom Read 幻讀** | 同一交易內，用同一條件查兩次，結果筆數不同。 | 另一個交易在兩次查詢中間新增或刪除符合條件的資料並 `COMMIT`。 | T1 查「餘額 > 1000」有 3 筆；T2 新增一筆符合條件的資料並提交；T1 再查變 4 筆，所以 `3 ≠ 4`。 |
| **Lost Update 更新遺失** | 兩個交易同時改同一筆資料，其中一個更新結果被覆蓋掉。 | 兩個交易都根據舊值計算，後寫入的人覆蓋前寫入的人。 | A=1000，T1 要加 100，T2 要加 200；正確應為 `1000 + 100 + 200 = 1300`，但最後可能只變 1200，代表 T1 的更新被蓋掉。 |
| **Read Skew / Inconsistent Read 讀取偏斜 / 不一致讀取** | 同一交易讀到的多筆資料，不是同一時間點的狀態。 | 讀多筆資料時，另一個交易在中間修改部分資料並 `COMMIT`。 | A 轉 100 給 B，T1 讀到 A=900，但還讀到 B=500；總額變 `900 + 500 = 1400`，但原本應是 1500，表示讀到不一致狀態。 |
| **Write Skew 寫入偏斜** | 兩個交易各自看起來合法，但合起來違反規則。 | 兩個交易讀到相同舊狀態，然後修改不同資料，沒有直接覆蓋彼此，所以不容易被發現。 | 規定至少一位醫生值班；甲看到乙在班所以請假，乙看到甲在班所以請假；最後兩人都不在班，違反「至少一人值班」。 |

---

# 二、核心想法總結

這些異常的共同原因是：

> 多個交易同時執行時，如果隔離性不夠強，交易可能看到或寫入不穩定的資料。

最短記法：

```text
Dirty Read：隔離太低，讀到未提交
Non-repeatable Read：中途被改值
Phantom Read：中途被增刪筆數
Lost Update：更新互相覆蓋
Read Skew：讀到前後不同時間點
Write Skew：各自合法，合起來違規
```

---

# 三、詳細補充教學

---

## 1. Dirty Read 髒讀

### 名詞解釋

Dirty Read，中文常翻成「髒讀」。

意思是：

> 一個交易讀到了另一個交易尚未 `COMMIT` 的資料。

`COMMIT` 是正式提交。  
也就是說，資料雖然被某個交易暫時改了，但還沒有正式定案。

---

### 核心想法

Dirty Read 的重點不是「讀到錯誤數字」而已，而是：

> 讀到的資料還不是正式資料，因為對方交易可能會 `ROLLBACK`。

`ROLLBACK` 是取消交易。  
如果原本讀到的資料後來被取消，那剛剛讀到的值就是不可靠的。

---

### 如何使用

假設資料表 `account` 原本是：

| name | balance |
|---|---:|
| A | 1000 |

交易 T1：

```sql
START TRANSACTION;

UPDATE account
SET balance = 900
WHERE name = 'A';

-- 尚未 COMMIT
```

此時 T1 把 A 從 1000 改成 900。

驗算：

```text
1000 - 100 = 900
```

但是 T1 還沒 `COMMIT`，所以 900 還不是正式資料。

接著交易 T2 使用很低的隔離層級：

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

START TRANSACTION;

SELECT balance
FROM account
WHERE name = 'A';
```

T2 可能讀到：

```text
A = 900
```

這就是 Dirty Read，因為 T2 讀到了 T1 尚未提交的資料。

如果接著 T1 執行：

```sql
ROLLBACK;
```

正式資料回到：

| name | balance |
|---|---:|
| A | 1000 |

驗算：

```text
T2 讀到：900
最後正式資料：1000

900 ≠ 1000
```

所以 T2 讀到的 900 是髒資料。

#### 判斷關鍵

看到題目出現：

```text
讀到尚未提交的資料
讀到別人還沒 COMMIT 的資料
READ UNCOMMITTED
```

就要想到：

```text
Dirty Read
```

---

## 2. Non-repeatable Read 不可重複讀

### 名詞解釋

Non-repeatable Read，中文常翻成「不可重複讀」。

意思是：

> 同一個交易內，對同一筆資料讀兩次，兩次結果不一樣。

它跟 Dirty Read 不同。  
Dirty Read 是讀到「未提交資料」。  
Non-repeatable Read 是讀到「別人已提交的新資料」，所以前後結果不同。

---

### 核心想法

Non-repeatable Read 的重點是：

> 你以為同一筆資料在你的交易中應該穩定，但中間被別的交易改掉並提交了。

它發生在「同一筆資料的值改變」。

---

### 如何使用

一開始資料：

| name | balance |
|---|---:|
| A | 1000 |

交易 T1 第一次讀：

```sql
START TRANSACTION;

SELECT balance
FROM account
WHERE name = 'A';
```

T1 第一次讀到：

```text
A = 1000
```

接著交易 T2 修改同一筆資料，並且提交：

```sql
START TRANSACTION;

UPDATE account
SET balance = 900
WHERE name = 'A';

COMMIT;
```

驗算：

```text
1000 - 100 = 900
```

然後 T1 再讀同一筆資料：

```sql
SELECT balance
FROM account
WHERE name = 'A';
```

T1 第二次可能讀到：

```text
A = 900
```

驗算：

```text
T1 第一次讀到：1000
T1 第二次讀到：900

1000 ≠ 900
```

所以 T1 在同一個交易內，重複讀同一筆資料，結果不同。  
這就是 Non-repeatable Read。

#### 判斷關鍵

看到題目出現：

```text
同一筆資料
同一交易中讀兩次
兩次值不同
中間有其他交易 UPDATE 並 COMMIT
```

就要想到：

```text
Non-repeatable Read
```

---

## 3. Phantom Read 幻讀

### 名詞解釋

Phantom Read，中文常翻成「幻讀」。

意思是：

> 同一個交易內，用同一個查詢條件查兩次，結果筆數不同。

它跟 Non-repeatable Read 的差別是：

- Non-repeatable Read：同一筆資料的值變了
- Phantom Read：符合條件的資料筆數變了

---

### 核心想法

Phantom Read 的重點是：

> 不是原本那一筆資料被改值，而是有新的資料出現，或原本符合條件的資料消失。

常見原因是另一個交易在中間：

```text
INSERT 新增資料
DELETE 刪除資料
UPDATE 讓資料符合或不符合查詢條件
```

---

### 如何使用

假設資料表 `account`：

| name | balance |
|---|---:|
| A | 1200 |
| B | 1500 |
| C | 800 |

T1 第一次查詢：

```sql
START TRANSACTION;

SELECT *
FROM account
WHERE balance > 1000;
```

符合條件的是：

| name | balance |
|---|---:|
| A | 1200 |
| B | 1500 |

所以第一次查到 2 筆。

驗算：

```text
A = 1200 > 1000，符合
B = 1500 > 1000，符合
C = 800 > 1000，不符合

第一次查詢筆數 = 2
```

接著 T2 新增一筆資料並提交：

```sql
START TRANSACTION;

INSERT INTO account(name, balance)
VALUES ('D', 1300);

COMMIT;
```

D 的餘額是 1300。

驗算：

```text
1300 > 1000，符合查詢條件
```

T1 再次執行同一個查詢：

```sql
SELECT *
FROM account
WHERE balance > 1000;
```

這次符合條件的是：

| name | balance |
|---|---:|
| A | 1200 |
| B | 1500 |
| D | 1300 |

第二次查到 3 筆。

驗算：

```text
第一次查詢筆數 = 2
第二次查詢筆數 = 3

2 ≠ 3
```

這就是 Phantom Read。

#### 判斷關鍵

看到題目出現：

```text
同一條件查詢
前後筆數不同
中間有其他交易 INSERT / DELETE / UPDATE 並 COMMIT
```

就要想到：

```text
Phantom Read
```

---

## 4. Lost Update 更新遺失

### 名詞解釋

Lost Update，中文常翻成「更新遺失」。

意思是：

> 兩個交易同時修改同一筆資料，結果其中一個交易的更新被另一個蓋掉。

它不是單純讀錯，而是「寫入結果不見了」。

---

### 核心想法

Lost Update 的重點是：

> 兩個交易都根據同一個舊值計算，最後後寫入的人覆蓋前寫入的人。

常見在這種流程：

```text
先 SELECT 舊值
在程式中計算新值
再 UPDATE 寫回去
```

如果中間沒有適當鎖定，就可能 Lost Update。

---

### 如何使用

一開始資料：

| name | balance |
|---|---:|
| A | 1000 |

T1 想幫 A 加 100。  
T2 想幫 A 加 200。

正確結果應該是：

```text
1000 + 100 + 200 = 1300
```

但是錯誤流程可能是：

```text
T1 讀到 A = 1000
T2 讀到 A = 1000
```

T1 計算：

```text
1000 + 100 = 1100
```

T2 計算：

```text
1000 + 200 = 1200
```

T1 寫回：

```sql
UPDATE account
SET balance = 1100
WHERE name = 'A';
```

T2 後寫回：

```sql
UPDATE account
SET balance = 1200
WHERE name = 'A';
```

最後資料變成：

| name | balance |
|---|---:|
| A | 1200 |

驗算：

```text
正確結果應該是：1300
實際結果卻是：1200

1300 ≠ 1200
```

T1 的加 100 消失了。  
這就是 Lost Update。

#### 較安全的寫法

如果資料庫支援原子更新，通常會寫成：

```sql
UPDATE account
SET balance = balance + 100
WHERE name = 'A';
```

和：

```sql
UPDATE account
SET balance = balance + 200
WHERE name = 'A';
```

因為這種寫法讓資料庫直接在目前值上增加，較不容易發生「讀舊值後覆蓋」的問題。

#### 判斷關鍵

看到題目出現：

```text
兩個交易同時更新同一筆資料
其中一個更新結果被覆蓋
正確應該累加，但實際少算
```

就要想到：

```text
Lost Update
```

---

## 5. Read Skew / Inconsistent Read 讀取偏斜 / 不一致讀取

### 名詞解釋

Read Skew，也可叫 Inconsistent Read。

意思是：

> 同一個交易中讀到多筆相關資料，但這些資料不是同一個時間點的狀態。

它通常發生在你需要讀一組有關聯的資料，例如：

```text
A 帳戶 + B 帳戶的總金額
訂單主檔 + 訂單明細
庫存數量 + 出貨紀錄
```

---

### 核心想法

Read Skew 的重點是：

> 單獨看每一筆資料可能都沒錯，但合在一起看就不一致。

跟 Non-repeatable Read 的差別：

- Non-repeatable Read：同一筆資料前後讀不同
- Read Skew：多筆相關資料讀到不同時間點的狀態

---

### 如何使用

假設原本資料：

| name | balance |
|---|---:|
| A | 1000 |
| B | 500 |

總金額：

```text
1000 + 500 = 1500
```

現在 T2 正在做轉帳：A 轉 100 給 B。

正確交易結束後應該是：

| name | balance |
|---|---:|
| A | 900 |
| B | 600 |

驗算：

```text
A：1000 - 100 = 900
B：500 + 100 = 600

900 + 600 = 1500
```

但是 T1 在讀資料時，如果剛好讀到不同時間點，可能發生：

```text
T1 先讀 A = 900
T2 還沒讓 T1 讀到 B 的新值
T1 又讀 B = 500
```

T1 得到：

| name | balance |
|---|---:|
| A | 900 |
| B | 500 |

驗算：

```text
900 + 500 = 1400
```

但原本總金額應該維持：

```text
1500
```

比較：

```text
1400 ≠ 1500
```

所以 T1 讀到的 A 和 B 不是同一個一致時間點的資料。  
這就是 Read Skew / Inconsistent Read。

#### 判斷關鍵

看到題目出現：

```text
讀多筆相關資料
各筆資料看起來都存在
但合起來不一致
像是總額不對
```

就要想到：

```text
Read Skew / Inconsistent Read
```

---

## 6. Write Skew 寫入偏斜

### 名詞解釋

Write Skew，中文常翻成「寫入偏斜」。

意思是：

> 兩個交易各自讀到的狀態都看起來合法，然後各自修改不同資料，最後整體結果違反規則。

它跟 Lost Update 不同。

- Lost Update：兩個交易改同一筆資料，互相覆蓋
- Write Skew：兩個交易改不同筆資料，但合起來違反整體規則

---

### 核心想法

Write Skew 的重點是：

> 每個交易單獨看都合理，但兩個交易一起發生後，整體就不合理。

這種異常很陰險，因為它不一定會發生「同一筆資料被覆蓋」。  
所以如果只靠偵測同一筆資料衝突，可能抓不到。

---

### 如何使用

假設醫院規則：

```text
至少要有一位醫生值班
```

原本資料：

| doctor | on_call |
|---|---|
| 甲 | yes |
| 乙 | yes |

驗算：

```text
目前值班人數 = 2
2 >= 1，合法
```

交易 T1 是甲醫生請假。  
T1 先查：

```sql
SELECT *
FROM doctors
WHERE on_call = 'yes';
```

T1 看到：

```text
甲在班
乙在班
```

T1 想：

```text
乙還在班，所以甲可以請假
```

於是 T1 修改甲：

```sql
UPDATE doctors
SET on_call = 'no'
WHERE doctor = '甲';
```

同時，交易 T2 是乙醫生請假。  
T2 也先查：

```sql
SELECT *
FROM doctors
WHERE on_call = 'yes';
```

T2 看到：

```text
甲在班
乙在班
```

T2 想：

```text
甲還在班，所以乙可以請假
```

於是 T2 修改乙：

```sql
UPDATE doctors
SET on_call = 'no'
WHERE doctor = '乙';
```

最後兩個交易都提交。

最後資料：

| doctor | on_call |
|---|---|
| 甲 | no |
| 乙 | no |

驗算：

```text
目前值班人數 = 0
規則要求至少 1 人

0 < 1，不合法
```

這就是 Write Skew。

#### 判斷關鍵

看到題目出現：

```text
兩個交易修改不同資料
各自判斷時都合法
最後合起來違反規則
沒有直接覆蓋同一筆資料
```

就要想到：

```text
Write Skew
```

---

# 四、快速比較

| 異常 | 主要問題 | 最好記的關鍵字 |
|---|---|---|
| Dirty Read | 讀到未提交資料 | 未 Commit 被讀到 |
| Non-repeatable Read | 同一筆資料前後讀不同 | 同一筆，值變了 |
| Phantom Read | 同條件查詢筆數不同 | 同條件，筆數變了 |
| Lost Update | 更新被覆蓋 | 同一筆，後寫蓋前寫 |
| Read Skew / Inconsistent Read | 讀到不同時間點的多筆資料 | 多筆資料合起來不一致 |
| Write Skew | 各自合法，合起來違規 | 改不同筆，但破壞整體規則 |

---

# 五、最短考前版

```text
Dirty Read：
讀到別人還沒 COMMIT 的資料。

Non-repeatable Read：
同一交易內，同一筆資料讀兩次，值不同。

Phantom Read：
同一交易內，同一條件查兩次，筆數不同。

Lost Update：
兩個交易同時更新同一筆資料，導致其中一個更新被覆蓋。

Read Skew / Inconsistent Read：
同一交易讀到多筆相關資料，但不是同一時間點的狀態，合起來不一致。

Write Skew：
兩個交易各自修改不同資料，各自看都合法，但最後整體違反規則。
```

---

# 六、口訣

```text
髒讀：讀到未提交
不可重複讀：同一筆變了
幻讀：筆數變了
更新遺失：寫入被蓋掉
讀取偏斜：讀到不同時間點
寫入偏斜：各自合法，合起來出事
```
