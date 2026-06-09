import type { AGroupYear } from '@/modules/examGroups/aGroup/data/yearSummaries';
import type { ExamQuestionAnalysis } from '@/modules/examGroups/aGroup/types/questionAnalysis';

export interface RiskyExtractionEntry {
  year: AGroupYear;
  number: number;
  risk: string;
}

export interface RiskyExtractionReviewConfig {
  year: AGroupYear;
  confirmedQuestionNumbers?: readonly number[];
}

export type RiskyExtractionFinding = string;

export const RISKY_A_GROUP_EXTRACTIONS: readonly RiskyExtractionEntry[] = [
  { year: '108', number: 9, risk: 'code layout requires manual format check' },
  { year: '108', number: 22, risk: 'table layout requires manual field check' },
  { year: '109', number: 25, risk: 'binary tree figure requires figure confirmation' },
  { year: '109', number: 38, risk: 'route table requires column normalization' },
  { year: '110', number: 9, risk: 'overline symbol requires glyph confirmation' },
  { year: '110', number: 45, risk: 'arrow glyph requires normalization' },
  { year: '111', number: 33, risk: 'same-line options require manual split check' },
  { year: '111', number: 41, risk: 'same-line options require manual split check' },
  { year: '111', number: 50, risk: 'numbered clauses require manual preservation' },
  { year: '112', number: 33, risk: 'repeated or misplaced text requires manual confirmation' },
  { year: '113', number: 41, risk: 'code question formatting requires manual preservation' },
  { year: '113', number: 42, risk: 'code question formatting requires manual preservation' }
];

export function getRiskyExtractionsForYear(year: AGroupYear): RiskyExtractionEntry[] {
  return RISKY_A_GROUP_EXTRACTIONS.filter((entry) => entry.year === year);
}

export function validateRiskyExtractionReview(
  questions: readonly ExamQuestionAnalysis[],
  config: RiskyExtractionReviewConfig
): RiskyExtractionFinding[] {
  const findings: RiskyExtractionFinding[] = [];
  const confirmedQuestionNumbers = new Set(config.confirmedQuestionNumbers ?? []);

  for (const entry of getRiskyExtractionsForYear(config.year)) {
    const question = questions.find((candidate) => candidate.number === entry.number);

    if (!question) {
      findings.push(`${config.year}-Q${String(entry.number).padStart(3, '0')} is missing risky extraction coverage.`);
      continue;
    }

    if (question.sourceRef.extractionStatus === 'verified' && !confirmedQuestionNumbers.has(entry.number)) {
      findings.push(
        `${config.year}-Q${String(entry.number).padStart(3, '0')} is marked verified before manual extraction confirmation: ${entry.risk}.`
      );
    }
  }

  return findings;
}
