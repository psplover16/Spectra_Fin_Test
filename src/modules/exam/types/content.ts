import type { ExamRouteCategory } from '@/modules/exam/data/examRoutes';

export type SubjectSlug =
  | 'computer-principles'
  | 'networking'
  | 'information-management'
  | 'programming'
  | 'language';

export type ContentStage = 1 | 2 | 3;
export type VerificationStatus = 'verified' | 'needs-review';
export type QuestionMappingKind = 'formal-question' | 'topic-mapping';

export interface SourceReference {
  sourceFolder: string;
  sourceFile: string;
  sourceYear?: string;
  sourceBatch?: string;
  verificationStatus: VerificationStatus;
}

export interface ExamPoint {
  id: string;
  title: string;
  summary: string;
  sourceRefs: SourceReference[];
}

export interface YearlySource extends SourceReference {
  label: string;
  subjects: string[];
}

export interface LectureSection {
  id: string;
  title: string;
  body: string;
  keyPoints: string[];
  sourceRefs: SourceReference[];
}

export interface Pitfall {
  title: string;
  explanation: string;
  sourceRefs: SourceReference[];
}

export interface QuestionMapping {
  kind: QuestionMappingKind;
  subject: string;
  examPointId: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  questionType: string;
  questionStem: string;
  options: [string, string, string, string];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  optionExplanations: [string, string, string, string];
  lectureSectionId: string;
  sourceRef: SourceReference;
  verificationStatus: VerificationStatus;
}

export interface SynthesisBatch {
  id: string;
  stage: ContentStage;
  owner: string;
  sourceFiles: string[];
  outputSummary: string;
  verificationStatus: VerificationStatus;
}

export interface SubjectContent {
  id: SubjectSlug;
  title: string;
  routePath: string;
  category: ExamRouteCategory;
  stage: ContentStage;
  sourceFolders: string[];
  overview: string;
  highFrequencyPoints: ExamPoint[];
  yearlySources: YearlySource[];
  lectureSections: LectureSection[];
  reviewChecklist: string[];
  pitfalls: Pitfall[];
  questionMappings: QuestionMapping[];
  synthesisBatches: SynthesisBatch[];
}

