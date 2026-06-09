import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import BGroupYearView from '@/modules/examGroups/bGroup/views/BGroupYearView.vue';
import type { BGroupEssayQuestionAnalysis } from '@/modules/examGroups/bGroup/types/essayQuestionAnalysis';

const routeYear = ref('114');
const sampleQuestion: BGroupEssayQuestionAnalysis = {
  year: '114',
  number: 1,
  subject: 'information-management',
  sourceBatch: '114-batch-1',
  examPoints: ['網路診斷', 'traceroute'],
  difficulty: 'intermediate',
  questionType: 'mixed',
  originalQuestion: '請以 TTL 回應與非對稱路由概念診斷 traceroute 偶發高延遲問題。',
  questionExplanation: '本題要求把 traceroute 的 TTL/ICMP 回應與實際路徑不對稱分開判讀。',
  modelAnswer: 'traceroute 只能觀察探測封包路徑與節點回應，不等於所有應用流量都走相同路徑。',
  modelAnswerDetails: ['先說明 TTL 遞增探測。', '再說明非對稱路由與回程路徑差異。'],
  diagramInstructions: '不適用：本題以文字矩陣說明協定、封包大小、時間、路徑與邊界設備即可。',
  diagramAltText: '無正式圖像；以五個測試維度描述 traceroute 診斷矩陣。',
  keyTerms: ['traceroute', 'TTL', '非對稱路由'],
  scoringPoints: ['說明 TTL/ICMP', '說明非對稱路由', '提出測試矩陣'],
  commonMistakes: ['把 traceroute 視為完整流量路徑', '忽略回程路徑'],
  handoutRefs: ['B-114-網路診斷'],
  sourceRef: {
    fileName: '114.pdf',
    pageNumber: 1,
    originalExcerpt: '用戶回報網路偶發高延遲，網路管理員使用 traceroute 指令觀察路徑。',
    extractionStatus: 'verified',
    adContentRemoved: true
  },
  reviewStatus: 'verified'
};

const loadBGroupYearQuestions = vi.fn(async (year: string) => ({
  status: 'complete',
  year,
  questions: []
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      get year() {
        return routeYear.value;
      }
    }
  })
}));

vi.mock('@/modules/examGroups/bGroup/composables/useBGroupYearQuestions', () => ({
  loadBGroupYearQuestions: (year: string) => loadBGroupYearQuestions(year)
}));

describe('BGroupYearView', () => {
  beforeEach(() => {
    routeYear.value = '114';
    loadBGroupYearQuestions.mockClear();
  });

  it('loads the requested B group year module when rendered', async () => {
    const wrapper = mount(BGroupYearView);

    await flushPromises();

    expect(loadBGroupYearQuestions).toHaveBeenCalledWith('114');
    expect(wrapper.get('[data-testid="b-group-year-view"]').text()).toContain('114 年 B 組申論解析');
    expect(wrapper.text()).toContain('已載入 0 題解析資料');
  });

  it('renders loaded B group questions as essay cards', async () => {
    loadBGroupYearQuestions.mockResolvedValueOnce({
      status: 'complete',
      year: '114',
      questions: [sampleQuestion]
    });

    const wrapper = mount(BGroupYearView);

    await flushPromises();

    expect(wrapper.get('[data-testid="b-group-question-list"]').text()).toContain(sampleQuestion.originalQuestion);
    expect(wrapper.get('[data-testid="b-group-question-card"]').text()).toContain('traceroute');
    expect(wrapper.get('[data-testid="teaching-analysis-section"]').text()).toContain(sampleQuestion.modelAnswer);
  });
});
