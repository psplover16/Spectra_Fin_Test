import { describe, expect, it } from 'vitest';
import { ANSWER_OPTIONS } from '@/modules/examGroups/aGroup/types/questionAnalysis';
import { questions } from '@/modules/examGroups/aGroup/data/years/114';

function getQuestion(number: number) {
  const question = questions.find((item) => item.number === number);

  if (!question) {
    throw new Error(`Missing question ${number}.`);
  }

  return question;
}

describe('114 A group reviewed question analysis content', () => {
  it('replaces fallback teaching templates for all 50 reviewed questions', () => {
    expect(questions).toHaveLength(50);
    expect(questions.map((question) => question.number)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1)
    );

    for (const question of questions) {
      expect(question.beginnerExplanation).not.toContain('本題先辨識考點');
      expect(question.solvingSteps.join('\n')).not.toContain('PDF 題本標示答案');
      expect(question.answerNote ?? '').not.toContain('後續逐題內容審查會補強完整推導');
      expect(ANSWER_OPTIONS.every((option) => !question.optionExplanations[option].includes('PDF 題本標示'))).toBe(true);
      expect(question.keyTakeaways.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps ambiguous official answers in needs-review state with notes', () => {
    const needsReviewNumbers = questions
      .filter((question) => question.answerVerification === 'needs-review')
      .map((question) => question.number);

    expect(needsReviewNumbers).toEqual([16, 34, 43, 49]);
    for (const number of needsReviewNumbers) {
      expect(getQuestion(number).answerNote?.trim().length).toBeGreaterThan(0);
    }
  });

  it('reviews question 1 with two-complement specific analysis', () => {
    const question = getQuestion(1);

    expect(question.answerVerification).toBe('verified');
    expect(question.answerNote).toContain('6 位元二補數加法');
    expect(question.beginnerExplanation).toContain('011111');
    expect(question.beginnerExplanation).toContain('6 位元共有 2^6 = 64 種排列');
    expect(question.beginnerExplanation).toContain('反相加 1 的原理');
    expect(question.solvingSteps.some((step) => step.includes('100111'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('-2^5'))).toBe(true);
    expect(question.optionExplanations.C).toContain('011111');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('溢位'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('無號值 - 2^n'))).toBe(true);
    expect(question.tags).toContain('two-complement');
    expect(ANSWER_OPTIONS.every((option) => !question.optionExplanations[option].includes('PDF 題本標示'))).toBe(true);
  });

  it('reviews question 2 with Von Neumann architecture novice teaching', () => {
    const question = getQuestion(2);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(
      expect.arrayContaining(['馮紐曼架構', '儲存程式概念', '五大功能單元'])
    );
    expect(question.beginnerExplanation).toContain('儲存程式概念');
    expect(question.beginnerExplanation).toContain('輸入、輸出、記憶體、運算器、控制器');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('選項 A'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('選項 B'))).toBe(true);
    expect(question.optionExplanations.D).toContain('CPU 內部');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('儲存程式'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 3 with Python list and tuple mutability novice teaching', () => {
    const question = getQuestion(3);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['list', 'tuple', '可變性']));
    expect(question.beginnerExplanation).toContain('有序序列');
    expect(question.beginnerExplanation).toContain('mutable');
    expect(question.beginnerExplanation).toContain('immutable');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('append'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('索引'))).toBe(true);
    expect(question.optionExplanations.B).toContain('顛倒');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('內容會不會被改'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 4 with CRC modulo-2 division novice teaching', () => {
    const question = getQuestion(4);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['CRC', '生成多項式', '模 2 除法']));
    expect(question.beginnerExplanation).toContain('XOR');
    expect(question.beginnerExplanation).toContain('1010');
    expect(question.beginnerExplanation).toContain('補 3 個 0');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('1101000'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('餘數 100'))).toBe(true);
    expect(question.optionExplanations.A).toContain('1011');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('餘數長度'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 5 with Hamming code parity-position novice teaching', () => {
    const question = getQuestion(5);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Hamming(7,4)', '偶校驗', '校驗位位置']));
    expect(question.beginnerExplanation).toContain('2 的冪次');
    expect(question.beginnerExplanation).toContain('p1');
    expect(question.beginnerExplanation).toContain('p2');
    expect(question.beginnerExplanation).toContain('p4');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('位置 3、5、6、7'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('p2=1'))).toBe(true);
    expect(question.optionExplanations.B).toContain('0110011');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('2 的冪次'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 6 with ACID transaction-property novice teaching', () => {
    const question = getQuestion(6);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(
      expect.arrayContaining(['ACID', 'Atomicity', 'Consistency', 'Isolation', 'Durability'])
    );
    expect(question.beginnerExplanation).toContain('全做或全不做');
    expect(question.beginnerExplanation).toContain('並行交易');
    expect(question.beginnerExplanation).toContain('提交後');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('Availability'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('Concurrency'))).toBe(true);
    expect(question.optionExplanations.D).toContain('Atomicity, Consistency, Isolation, Durability');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Isolation 不是 Concurrency'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Durability'))).toBe(true);
  });

  it('reviews question 7 with priority-scheduling starvation novice teaching', () => {
    const question = getQuestion(7);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['優先權排程', '飢餓', '老化機制']));
    expect(question.beginnerExplanation).toContain('低優先權');
    expect(question.beginnerExplanation).toContain('等待時間');
    expect(question.beginnerExplanation).toContain('逐步提高');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('Aging'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('time quantum'))).toBe(true);
    expect(question.optionExplanations.D).toContain('副作用');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('等待越久'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 8 with preorder-inorder-postorder reconstruction teaching', () => {
    const question = getQuestion(8);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Preorder', 'Inorder', 'Postorder', '遞迴重建']));
    expect(question.beginnerExplanation).toContain('前序的第一個節點是根');
    expect(question.beginnerExplanation).toContain('中序');
    expect(question.beginnerExplanation).toContain('左子樹');
    expect(question.beginnerExplanation).toContain('後序是左、右、根');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('D,B,E'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('D,E,B,F,C,A'))).toBe(true);
    expect(question.optionExplanations.A).toContain('前序');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Preorder 第一個'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 9 with bucket-sort distribution novice teaching', () => {
    const question = getQuestion(9);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Bucket Sort', '均勻分佈', 'O(n)']));
    expect(question.beginnerExplanation).toContain('分配到桶');
    expect(question.beginnerExplanation).toContain('桶內');
    expect(question.beginnerExplanation).toContain('總成本');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('均勻分佈'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('集中'))).toBe(true);
    expect(question.optionExplanations.D).toContain('同一桶');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('O(n)'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 10 with stable-sort relative-order novice teaching', () => {
    const question = getQuestion(10);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Stable Sort', '相等鍵值', '相對順序']));
    expect(question.beginnerExplanation).toContain('相等鍵值');
    expect(question.beginnerExplanation).toContain('原始相對順序');
    expect(question.beginnerExplanation).toContain('多欄位排序');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('選項 D'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('時間複雜度'))).toBe(true);
    expect(question.optionExplanations.B).toContain('時間複雜度');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('相等鍵值'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 11 with memory-hierarchy speed-order novice teaching', () => {
    const question = getQuestion(11);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Memory Hierarchy', '暫存器', '快取', '主記憶體', '硬碟']));
    expect(question.beginnerExplanation).toContain('越靠近 CPU');
    expect(question.beginnerExplanation).toContain('速度越快');
    expect(question.beginnerExplanation).toContain('容量');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('暫存器、快取、主記憶體、硬碟'))).toBe(true);
    expect(question.optionExplanations.B).toContain('完全反向');
    expect(question.optionExplanations.D).toContain('暫存器');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('越靠近 CPU'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 12 with Java interface multiple-inheritance novice teaching', () => {
    const question = getQuestion(12);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['多重類別繼承', 'interface', 'Java']));
    expect(question.beginnerExplanation).toContain('多重繼承');
    expect(question.beginnerExplanation).toContain('多個父類別');
    expect(question.beginnerExplanation).toContain('多個介面');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('C++'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('Java 不能'))).toBe(true);
    expect(question.optionExplanations.B).toContain('interface');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Java 不支援多重類別繼承'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 13 with strong-dynamic typing novice teaching', () => {
    const question = getQuestion(13);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['強型別', '動態型別', 'Python']));
    expect(question.beginnerExplanation).toContain('不相容型別');
    expect(question.beginnerExplanation).toContain('執行期間');
    expect(question.beginnerExplanation).toContain('靜態型別');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('JavaScript'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('Python'))).toBe(true);
    expect(question.optionExplanations.C).toContain('強型別且動態型別');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('強弱型別'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 14 with C pass-by-value novice teaching', () => {
    const question = getQuestion(14);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['pass by value', '區域變數', '指標']));
    expect(question.beginnerExplanation).toContain('複製一份');
    expect(question.beginnerExplanation).toContain('p 是另一個區域變數');
    expect(question.beginnerExplanation).toContain('a 仍然是 3');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('p = p*p'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('printf'))).toBe(true);
    expect(question.optionExplanations.C).toContain('p 變成 9');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('pass by value'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('指標'))).toBe(true);
  });

  it('reviews question 15 with AVL balance-factor novice teaching', () => {
    const question = getQuestion(15);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['AVL 樹', 'BST', '平衡因子', '旋轉']));
    expect(question.beginnerExplanation).toContain('左右子樹高度差');
    expect(question.beginnerExplanation).toContain('-1 到 1');
    expect(question.beginnerExplanation).toContain('自平衡');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('BST'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('父子節點的鍵值差'))).toBe(true);
    expect(question.optionExplanations.B).toContain('平衡因子');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('平衡因子'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 16 with XOR adder-sum novice teaching and ambiguity note', () => {
    const question = getQuestion(16);

    expect(question.answerVerification).toBe('needs-review');
    expect(question.answerNote).toContain('二補數溢位');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['XOR', '半加器', '全加器', 'sum bit']));
    expect(question.beginnerExplanation).toContain('輸入不同輸出 1');
    expect(question.beginnerExplanation).toContain('不含進位');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('A XOR B'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('overflow'))).toBe(true);
    expect(question.optionExplanations.B).toContain('可辯性');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('sum bit'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('needs-review'))).toBe(true);
  });

  it('reviews question 17 with dirty-read isolation-level novice teaching', () => {
    const question = getQuestion(17);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['READ UNCOMMITTED', 'Dirty Read', 'rollback']));
    expect(question.beginnerExplanation).toContain('尚未提交');
    expect(question.beginnerExplanation).toContain('rollback');
    expect(question.beginnerExplanation).toContain('暫時狀態');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('non-repeatable read'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('lost update'))).toBe(true);
    expect(question.optionExplanations.C).toContain('已修改但尚未提交');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('未提交'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 18 with normalization dependency novice teaching', () => {
    const question = getQuestion(18);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['1NF', '2NF', '3NF', 'BCNF']));
    expect(question.beginnerExplanation).toContain('部分函數依賴');
    expect(question.beginnerExplanation).toContain('傳遞函數依賴');
    expect(question.beginnerExplanation).toContain('superkey');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('2NF'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('3NF'))).toBe(true);
    expect(question.optionExplanations.B).toContain('3NF');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('2NF 消除部分依賴'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 19 with currying functional-programming novice teaching', () => {
    const question = getQuestion(19);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Currying', '函數式程式設計', '單參數函式']));
    expect(question.beginnerExplanation).toContain('多個參數');
    expect(question.beginnerExplanation).toContain('一連串');
    expect(question.beginnerExplanation).toContain('部分套用');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('物件導向'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('函數式'))).toBe(true);
    expect(question.optionExplanations.C).toContain('典型概念');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('多參數函式'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 20 with red-black-tree insertion-color novice teaching', () => {
    const question = getQuestion(20);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['紅黑樹', '黑高度', '紅紅衝突', '旋轉']));
    expect(question.beginnerExplanation).toContain('黑高度');
    expect(question.beginnerExplanation).toContain('紅節點不能有紅子節點');
    expect(question.beginnerExplanation).toContain('新節點');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('直接設黑'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('紅紅衝突'))).toBe(true);
    expect(question.optionExplanations.B).toContain('紅色');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('新插入節點通常預設紅色'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 21 with FCFS scheduling tradeoff novice teaching', () => {
    const question = getQuestion(21);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['FCFS', 'FIFO', 'convoy effect']));
    expect(question.beginnerExplanation).toContain('先到先服務');
    expect(question.beginnerExplanation).toContain('公平');
    expect(question.beginnerExplanation).toContain('平均等待時間');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('平均等待時間'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('互動式系統'))).toBe(true);
    expect(question.optionExplanations.A).toContain('簡單');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('convoy effect'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 22 with RGB additive-color novice teaching', () => {
    const question = getQuestion(22);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['RGB', '加色模型', 'alpha channel']));
    expect(question.beginnerExplanation).toContain('紅、綠、藍');
    expect(question.beginnerExplanation).toContain('亮度');
    expect(question.beginnerExplanation).toContain('沒有光');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('RGB(0,0,0)'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('alpha'))).toBe(true);
    expect(question.optionExplanations.D).toContain('黑色');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('加色模型'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 23 with overfitting generalization novice teaching', () => {
    const question = getQuestion(23);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['overfitting', '泛化能力', '訓練誤差', '測試誤差']));
    expect(question.beginnerExplanation).toContain('訓練資料');
    expect(question.beginnerExplanation).toContain('測試資料');
    expect(question.beginnerExplanation).toContain('泛化');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('訓練誤差'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('測試誤差'))).toBe(true);
    expect(question.optionExplanations.D).toContain('典型');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('訓練好、測試差'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 24 with SMP shared-memory novice teaching', () => {
    const question = getQuestion(24);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['SMP', '共享主記憶體', '對稱多處理器']));
    expect(question.beginnerExplanation).toContain('共享主記憶體');
    expect(question.beginnerExplanation).toContain('同一作業系統');
    expect(question.beginnerExplanation).toContain('瓶頸');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('錯誤敘述'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('CPU 故障'))).toBe(true);
    expect(question.optionExplanations.C).toContain('不要求');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('shared-memory multiprocessing'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 25 with CPU-component classification novice teaching', () => {
    const question = getQuestion(25);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['ALU', '控制單元', 'Register', 'SRAM']));
    expect(question.beginnerExplanation).toContain('CPU 基本組成');
    expect(question.beginnerExplanation).toContain('快取');
    expect(question.beginnerExplanation).toContain('記憶體技術');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('SRAM'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('非屬'))).toBe(true);
    expect(question.optionExplanations.D).toContain('不是基本 CPU 組成');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('SRAM 是記憶體技術'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 26 with QAM-QPSK bits-per-symbol novice teaching', () => {
    const question = getQuestion(26);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['16-QAM', 'QPSK', 'bits per symbol', 'baud']));
    expect(question.beginnerExplanation).toContain('log2(M)');
    expect(question.beginnerExplanation).toContain('4 bits/symbol');
    expect(question.beginnerExplanation).toContain('2 bits/symbol');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('log2(16)=4'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('4/2'))).toBe(true);
    expect(question.optionExplanations.C).toContain('2 倍');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('log2(M)'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 27 with CIDR route-aggregation novice teaching', () => {
    const question = getQuestion(27);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['CIDR', '/21', '/19', '路由聚合']));
    expect(question.beginnerExplanation).toContain('第三個 octet');
    expect(question.beginnerExplanation).toContain('步進為 8');
    expect(question.beginnerExplanation).toContain('96、104、112、120');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('32'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('/19'))).toBe(true);
    expect(question.optionExplanations.C).toContain('/19');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('/21 在第三 octet 的步進為 8'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 28 with TCP flow-control receiver-window novice teaching', () => {
    const question = getQuestion(28);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['TCP flow control', 'receiver window', '接收端緩衝區']));
    expect(question.beginnerExplanation).toContain('接收端');
    expect(question.beginnerExplanation).toContain('接收視窗');
    expect(question.beginnerExplanation).toContain('壅塞控制');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('congestion control'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('接收端緩衝區'))).toBe(true);
    expect(question.optionExplanations.D).toContain('接收端緩衝區');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('保護接收端'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 29 with Wi-Fi power-saving mechanism novice teaching', () => {
    const question = getQuestion(29);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Wi-Fi power saving', 'Beacon/TIM', 'ARP suppression', 'TWT']));
    expect(question.beginnerExplanation).toContain('睡眠站台');
    expect(question.beginnerExplanation).toContain('Beacon/TIM');
    expect(question.beginnerExplanation).toContain('ARP suppression');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('STP BPDU'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('PS-Poll'))).toBe(true);
    expect(question.optionExplanations.A).toContain('生成樹');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('睡眠站台'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 30 with IPv4 fragmentation MTU calculation novice teaching', () => {
    const question = getQuestion(30);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['IPv4 fragmentation', 'MTU', 'IP header', '8-byte boundary']));
    expect(question.beginnerExplanation).toContain('MTU 包含 IP header');
    expect(question.beginnerExplanation).toContain('1500-20=1480');
    expect(question.beginnerExplanation).toContain('2300-1480=820');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('1500-20=1480'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('8-byte'))).toBe(true);
    expect(question.optionExplanations.A).toContain('2 個');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('MTU 包含 IP header'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 31 with PMTUD DF-bit ICMP feedback novice teaching', () => {
    const question = getQuestion(31);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['PMTUD', 'DF bit', 'ICMP Fragmentation Needed', 'Path MTU']));
    expect(question.beginnerExplanation).toContain('DF=1');
    expect(question.beginnerExplanation).toContain('不能分片');
    expect(question.beginnerExplanation).toContain('瓶頸 MTU');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('ICMP Fragmentation Needed'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('來源端'))).toBe(true);
    expect(question.optionExplanations.C).toContain('瓶頸 MTU');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('DF=1'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 32 with ping traceroute diagnostic-purpose novice teaching', () => {
    const question = getQuestion(32);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['ping', 'traceroute', 'ICMP Echo', 'TTL']));
    expect(question.beginnerExplanation).toContain('可達性');
    expect(question.beginnerExplanation).toContain('RTT');
    expect(question.beginnerExplanation).toContain('TTL');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('ICMP Echo'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('逐跳'))).toBe(true);
    expect(question.optionExplanations.B).toContain('推估沿途節點');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('ping'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 33 with CSMA/CD binary-exponential-backoff novice teaching', () => {
    const question = getQuestion(33);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['CSMA/CD', 'collision', 'binary exponential backoff', 'half-duplex Ethernet']));
    expect(question.beginnerExplanation).toContain('共享式半雙工');
    expect(question.beginnerExplanation).toContain('碰撞偵測');
    expect(question.beginnerExplanation).toContain('二元指數退避');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('binary exponential backoff'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('再次碰撞'))).toBe(true);
    expect(question.optionExplanations.A).toContain('擴大隨機等待範圍');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('半雙工'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 34 with full-duplex Ethernet collision-domain novice teaching and ambiguity note', () => {
    const question = getQuestion(34);

    expect(question.answerVerification).toBe('needs-review');
    expect(question.answerNote).toContain('C');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['full-duplex Ethernet', 'collision domain', 'switch', 'half-duplex']));
    expect(question.beginnerExplanation).toContain('全雙工');
    expect(question.beginnerExplanation).toContain('點對點');
    expect(question.beginnerExplanation).toContain('碰撞域');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('B'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('C'))).toBe(true);
    expect(question.optionExplanations.C).toContain('重疊');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('needs-review'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 35 with Wi-Fi hidden-node RTS-CTS-ACK novice teaching', () => {
    const question = getQuestion(35);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['hidden node', 'RTS', 'CTS', 'ACK', 'CSMA/CA']));
    expect(question.beginnerExplanation).toContain('彼此聽不到');
    expect(question.beginnerExplanation).toContain('AP');
    expect(question.beginnerExplanation).toContain('預約');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('RTS'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('CSMA/CD'))).toBe(true);
    expect(question.optionExplanations.A).toContain('RTS/CTS');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('隱藏節點'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 36 with HTTP stateless cookie-session novice teaching', () => {
    const question = getQuestion(36);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['HTTP stateless', 'Cookies', 'session id', 'request/response']));
    expect(question.beginnerExplanation).toContain('無狀態');
    expect(question.beginnerExplanation).toContain('後續請求');
    expect(question.beginnerExplanation).toContain('session id');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('Cookie'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('ARP'))).toBe(true);
    expect(question.optionExplanations.B).toContain('session id');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('無狀態'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 37 with DNS iterative-query referral novice teaching', () => {
    const question = getQuestion(37);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['DNS iterative query', 'referral', 'recursive query', 'authoritative answer']));
    expect(question.beginnerExplanation).toContain('下一位詢問誰');
    expect(question.beginnerExplanation).toContain('root');
    expect(question.beginnerExplanation).toContain('recursive');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('referral'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('TCP 53'))).toBe(true);
    expect(question.optionExplanations.D).toContain('下一步');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Iterative'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 38 with DNS open-resolver risk-boundary novice teaching', () => {
    const question = getQuestion(38);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Open Resolver', 'recursive resolver', 'DNS amplification', 'HTTPS certificate validation']));
    expect(question.beginnerExplanation).toContain('對外開放遞迴');
    expect(question.beginnerExplanation).toContain('放大攻擊');
    expect(question.beginnerExplanation).toContain('憑證驗證');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('非屬'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('HTTPS'))).toBe(true);
    expect(question.optionExplanations.C).toContain('自動成功');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('DNS amplification'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 39 with DDoS blackholing-sinkholing novice teaching', () => {
    const question = getQuestion(39);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['DDoS', 'blackholing', 'sinkholing', 'traffic diversion']));
    expect(question.beginnerExplanation).toContain('丟棄');
    expect(question.beginnerExplanation).toContain('受控');
    expect(question.beginnerExplanation).toContain('惡意流量');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('blackholing'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('零信任'))).toBe(true);
    expect(question.optionExplanations.B).toContain('導走');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Blackholing'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 40 with round-robin weighted-round-robin novice teaching', () => {
    const question = getQuestion(40);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Round Robin', 'Weighted Round Robin', 'weight', 'load balancer']));
    expect(question.beginnerExplanation).toContain('輪流');
    expect(question.beginnerExplanation).toContain('權重');
    expect(question.beginnerExplanation).toContain('容量');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('SSL'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('健康檢查'))).toBe(true);
    expect(question.optionExplanations.A).toContain('權重');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Weighted Round Robin'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 41 with session-stickiness load-balancing novice teaching', () => {
    const question = getQuestion(41);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Session Stickiness', 'session affinity', 'load balancer', 'stateful backend']));
    expect(question.beginnerExplanation).toContain('同一台後端');
    expect(question.beginnerExplanation).toContain('cookie');
    expect(question.beginnerExplanation).toContain('source IP hash');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('HSTS'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('OCSP'))).toBe(true);
    expect(question.optionExplanations.D).toContain('同一後端');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('session affinity'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 42 with SQL-injection prepared-statement novice teaching', () => {
    const question = getQuestion(42);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['SQL Injection', 'Prepared Statements', 'parameterized query', 'code/data separation']));
    expect(question.beginnerExplanation).toContain('字串拼接');
    expect(question.beginnerExplanation).toContain('SQL 結構');
    expect(question.beginnerExplanation).toContain('參數');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('Base64'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('Try/Catch'))).toBe(true);
    expect(question.optionExplanations.D).toContain('資料值');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('參數化'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 43 with 5G feature-boundary novice teaching', () => {
    const question = getQuestion(43);

    expect(question.answerVerification).toBe('needs-review');
    expect(question.answerNote).toContain('高頻段');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['5G', 'URLLC', 'mMTC', 'spectral efficiency']));
    expect(question.beginnerExplanation).toContain('低延遲');
    expect(question.beginnerExplanation).toContain('頻譜效率');
    expect(question.beginnerExplanation).toContain('大量裝置');
    expect(question.beginnerExplanation).toContain('部署挑戰');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('非屬'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('覆蓋率下降'))).toBe(true);
    expect(question.optionExplanations.A).toContain('部署挑戰');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('5G'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 44 with IAM RBAC containment novice teaching', () => {
    const question = getQuestion(44);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['IAM', 'RBAC', 'authentication', 'authorization', 'role']));
    expect(question.beginnerExplanation).toContain('身分');
    expect(question.beginnerExplanation).toContain('驗證');
    expect(question.beginnerExplanation).toContain('授權');
    expect(question.beginnerExplanation).toContain('角色');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('IAM ⊂ RBAC'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('RBAC=IAM'))).toBe(true);
    expect(question.optionExplanations.B).toContain('授權方式');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('RBAC 屬於 IAM'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 45 with two-step-verification authentication-strength novice teaching', () => {
    const question = getQuestion(45);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Two-Step Verification', 'authentication strength', 'second factor', 'confidentiality']));
    expect(question.beginnerExplanation).toContain('密碼');
    expect(question.beginnerExplanation).toContain('第二步');
    expect(question.beginnerExplanation).toContain('認證強度');
    expect(question.beginnerExplanation).toContain('機密性');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('完整性'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('不可否認性'))).toBe(true);
    expect(question.optionExplanations.D).toContain('認證強度');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('認證強度'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 46 with IDPS anomaly-detection unknown-attack novice teaching', () => {
    const question = getQuestion(46);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['IDPS', 'signature detection', 'anomaly detection', 'baseline', 'false positive']));
    expect(question.beginnerExplanation).toContain('已知攻擊');
    expect(question.beginnerExplanation).toContain('未知攻擊');
    expect(question.beginnerExplanation).toContain('正常基準');
    expect(question.beginnerExplanation).toContain('誤報');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('Signature'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('Stateful Protocol'))).toBe(true);
    expect(question.optionExplanations.D).toContain('未知攻擊');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Anomaly'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 47 with session-hijacking attack-path novice teaching', () => {
    const question = getQuestion(47);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Session Hijacking', 'session token', 'MITM', 'Sniffing', 'XSS']));
    expect(question.beginnerExplanation).toContain('cookie');
    expect(question.beginnerExplanation).toContain('token');
    expect(question.beginnerExplanation).toContain('非屬');
    expect(question.beginnerExplanation).toContain('UDP');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('MITM'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('XSS'))).toBe(true);
    expect(question.optionExplanations.C).toContain('非屬');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('session token'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 48 with WAF application-layer firewall novice teaching', () => {
    const question = getQuestion(48);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['WAF', 'packet-filtering firewall', 'application layer', 'HTTP', 'SQLi/XSS']));
    expect(question.beginnerExplanation).toContain('IP');
    expect(question.beginnerExplanation).toContain('port');
    expect(question.beginnerExplanation).toContain('HTTP');
    expect(question.beginnerExplanation).toContain('應用層');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('第 2 層'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('SSL'))).toBe(true);
    expect(question.optionExplanations.B).toContain('應用層');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('WAF'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 49 with MFA factor-classification novice teaching and review note', () => {
    const question = getQuestion(49);

    expect(question.answerVerification).toBe('needs-review');
    expect(question.answerNote).toContain('風險式驗證');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['MFA', 'knowledge factor', 'possession factor', 'inherence factor', 'risk-based authentication']));
    expect(question.beginnerExplanation).toContain('所知');
    expect(question.beginnerExplanation).toContain('所持');
    expect(question.beginnerExplanation).toContain('所表');
    expect(question.beginnerExplanation).toContain('位置');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('所在地'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('needs-review'))).toBe(true);
    expect(question.optionExplanations.C).toContain('情境');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('傳統 MFA'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });

  it('reviews question 50 with TCP-IP network-layer protocol novice teaching', () => {
    const question = getQuestion(50);

    expect(question.answerVerification).toBe('verified');
    expect(question.coreTerms).toEqual(expect.arrayContaining(['Internet layer', 'transport layer', 'ICMP', 'IGMP', 'OSPF', 'UDP']));
    expect(question.beginnerExplanation).toContain('定址');
    expect(question.beginnerExplanation).toContain('路由');
    expect(question.beginnerExplanation).toContain('控制訊息');
    expect(question.beginnerExplanation).toContain('傳輸層');
    expect(question.beginnerExplanation).toContain('常見陷阱');
    expect(question.solvingSteps.some((step) => step.includes('非屬'))).toBe(true);
    expect(question.solvingSteps.some((step) => step.includes('UDP'))).toBe(true);
    expect(question.optionExplanations.D).toContain('傳輸層');
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('Internet layer'))).toBe(true);
    expect(question.keyTakeaways.some((takeaway) => takeaway.includes('常見陷阱'))).toBe(true);
  });
});
