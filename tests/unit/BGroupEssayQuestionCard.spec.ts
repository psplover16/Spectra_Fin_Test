import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BGroupEssayQuestionCard from '@/modules/examGroups/bGroup/components/BGroupEssayQuestionCard.vue';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const question: BGroupEssayQuestionAnalysis = {
  year: '113',
  number: 4,
  subject: 'programming',
  sourceBatch: '113-diagram-batch-2',
  examPoints: ['二元樹重建', 'AVL 旋轉'],
  difficulty: 'advanced',
  questionType: 'mixed',
  originalQuestion:
    '請依前序 JBHCDIGAEF 及中序 CHBIDJEAGF 畫出唯一二元樹，並依序插入 53、68、72、5、47、14、36、21 畫出 AVL 樹。',
  questionExplanation:
    '本題有兩個圖形任務：先用前序第一個節點找根，再用中序切出左右子樹。\nAVL 部分要在每次插入後檢查平衡因子。',
  modelAnswer: '二元樹重建時根節點為 J；AVL 樹插入後以 47 作為整體根節點，左右子樹需維持高度差不超過 1。',
  modelAnswerDetails: [
    '前序提供根節點順序，中序提供左右子樹分界。',
    'AVL 插入時遇到 LL、RR、LR、RL 失衡都要旋轉修正。'
  ],
  diagramInstructions:
    '文字圖解：先畫根節點 J；J 左側接 B，B 左側接 H，H 左側接 C、右側接 D；J 右側接 G，G 左側接 I，G 右側接 A，A 左側接 E、右側接 F。AVL 圖以 47 為根，左子樹為 14，右子樹為 68，並標示 5、36、53、72、21 的相對位置。',
  diagramAltText:
    '二元樹以前序與中序重建，根為 J；AVL 完成圖以 47 為根，左右子樹高度平衡。',
  keyTerms: ['二元樹', 'AVL 樹', '旋轉'],
  scoringPoints: ['正確找出根節點', '左右子樹分界正確', 'AVL 旋轉後仍符合平衡條件'],
  commonMistakes: ['只照前序排列而未使用中序切分', '插入 AVL 後忘記回溯檢查祖先節點平衡'],
  handoutRefs: ['B-113-資料結構-樹'],
  sourceRef: {
    fileName: '113.pdf',
    pageNumber: 6,
    originalExcerpt:
      '請依下列條件畫出樹狀圖：依據前序表示法 JBHCDIGAEF 及中序表示法 CHBIDJEAGF，畫出唯一的二元樹。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  reviewStatus: 'verified',
  childItems: [
    {
      kind: 'diagram',
      label: '子題 1',
      prompt: '依前序與中序畫出唯一二元樹。',
      expectedAnswer: '以 J 為根並依中序切分左右子樹。',
      scoringPoints: ['根節點正確', '左右子樹正確']
    }
  ]
};

describe('BGroupEssayQuestionCard', () => {
  it('separates original exam content from generated teaching analysis', () => {
    const wrapper = mount(BGroupEssayQuestionCard, {
      props: { question }
    });
    const originalSection = wrapper.get('[data-testid="original-exam-section"]');
    const teachingSection = wrapper.get('[data-testid="teaching-analysis-section"]');

    expect(originalSection.text()).toContain(question.originalQuestion);
    expect(originalSection.text()).toContain('子題 1');
    expect(originalSection.text()).toContain('依前序與中序畫出唯一二元樹。');
    expect(originalSection.text()).not.toContain(question.modelAnswer);

    expect(teachingSection.text()).toContain('題意拆解');
    expect(teachingSection.text()).toContain('擬答');
    expect(teachingSection.text()).toContain(question.modelAnswer);
    expect(teachingSection.text()).toContain('評分重點');
    expect(teachingSection.text()).toContain('常見錯誤');
    expect(teachingSection.text()).not.toContain(question.originalQuestion);
  });

  it('renders textual diagram instructions and alt text without requiring image assets', () => {
    const wrapper = mount(BGroupEssayQuestionCard, {
      props: { question }
    });
    const diagramSection = wrapper.get('[data-testid="diagram-support-section"]');

    expect(diagramSection.text()).toContain('文字圖解');
    expect(diagramSection.text()).toContain('根節點 J');
    expect(diagramSection.text()).toContain('Alt text');
    expect(diagramSection.text()).toContain(question.diagramAltText);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('shows a question bookmark button and emits the current question number', async () => {
    const wrapper = mount(BGroupEssayQuestionCard, {
      props: {
        question,
        isBookmarked: true
      }
    });
    const bookmarkButton = wrapper.get('[data-testid="question-bookmark-button"]');

    expect(bookmarkButton.text()).toContain('已書籤');
    expect(bookmarkButton.attributes('aria-pressed')).toBe('true');

    await bookmarkButton.trigger('click');

    expect(wrapper.emitted('toggleBookmark')).toEqual([[question.number]]);
  });

  it('shows source traceability with PDF file, page number, and extraction status', () => {
    const wrapper = mount(BGroupEssayQuestionCard, {
      props: { question }
    });
    const source = wrapper.get('[data-testid="source-traceability"]');

    expect(source.text()).toContain('113.pdf');
    expect(source.text()).toContain('第 6 頁');
    expect(source.text()).toContain('verified');
  });
});
