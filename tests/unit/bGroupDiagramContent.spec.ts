import { describe, expect, it } from 'vitest';
import { getBGroupSourceIndex } from '@/modules/examGroups/bGroup/data/sourceIndex';
import { questions as questions114 } from '@/modules/examGroups/bGroup/data/years/114';

const requiredDiagramQuestions = [
  { year: '114', number: 1, markers: ['TTL', '回程', '5 欄測試矩陣'] },
  { year: '114', number: 3, markers: ['4 欄比較表', '10 列', 'IPv4', 'IPv6'] },
  { year: '114', number: 4, markers: ['流程圖', 'seen', '循環'] },
  { year: '114', number: 6, markers: ['3 列表格', 'SQL Injection', 'XSS', 'CSRF'] }
] as const;

const needsReviewDiagramQuestions = [
  { year: '113', number: 1, reason: 'B+ tree 題缺完整資料表欄位與索引假設' },
  { year: '112', number: 4, reason: 'C 程式碼抽取已摘要化且 source index 為 needs-review' },
  { year: '111', number: 5, reason: '人事資料表對齊資訊流失且 source index 為 needs-review' },
  { year: '110', number: 5, reason: '函式清單抽取需複核且 source index 為 needs-review' },
  { year: '110', number: 6, reason: '電梯函式規則抽取需複核且 source index 為 needs-review' },
  { year: '109', number: 1, reason: '原始訂單資料表未完整抽成文字' },
  { year: '109', number: 5, reason: '原始左右二元樹圖示未保留' },
  { year: '108', number: 4, reason: '原始 HTML 與後端程式碼未完整保留' }
] as const;

function get114Question(number: number) {
  const question = questions114.find((candidate) => candidate.number === number);

  if (!question) {
    throw new Error(`Missing 114 question ${number}`);
  }

  return question;
}

describe('B group diagram text and alt text content', () => {
  it('renders required 114 diagram questions with precise textual reconstruction support', () => {
    requiredDiagramQuestions.forEach(({ number, markers }) => {
      const question = get114Question(number);

      expect(question.diagramInstructions).not.toContain('不適用');
      expect(question.diagramInstructions.length).toBeGreaterThan(80);
      expect(question.diagramAltText.length).toBeGreaterThan(20);
      markers.forEach((marker) => {
        expect(question.diagramInstructions).toContain(marker);
      });
    });
  });

  it('keeps non-diagram 114 questions explicit instead of omitting diagram fields', () => {
    const dohDnssec = get114Question(2);

    expect(dohDnssec.diagramInstructions).toContain('不適用');
    expect(dohDnssec.diagramAltText).toContain('無圖解');
  });

  it('keeps source-index diagram risks in needs-review until the missing visual/table details are resolved', () => {
    needsReviewDiagramQuestions.forEach(({ year, number }) => {
      const sourceIndexEntry = getBGroupSourceIndex(year).find((entry) => entry.number === number);

      expect(sourceIndexEntry?.extractionStatus).toBe('needs-review');
    });
  });
});
