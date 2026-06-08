import { describe, expect, it } from 'vitest';
import {
  getSubjectContentBySlug,
  subjectContents
} from '@/modules/exam/data/subjectContent';
import type { SubjectContent, SubjectSlug } from '@/modules/exam/types/content';

const requiredSubjects: Array<{
  slug: SubjectSlug;
  title: string;
  routePath: string;
  stage: SubjectContent['stage'];
}> = [
  {
    slug: 'computer-principles',
    title: '計算機原理',
    routePath: '/computer-principles',
    stage: 1
  },
  {
    slug: 'networking',
    title: '網路概論',
    routePath: '/networking',
    stage: 1
  },
  {
    slug: 'information-management',
    title: '資訊管理',
    routePath: '/information-management',
    stage: 2
  },
  {
    slug: 'programming',
    title: '程式設計',
    routePath: '/programming',
    stage: 2
  },
  {
    slug: 'language',
    title: '語言',
    routePath: '/language',
    stage: 3
  }
];

describe('subject content typed contract', () => {
  it('provides completed content records for the five required subjects', () => {
    expect(
      subjectContents.map(({ id, title, routePath, stage }) => ({
        slug: id,
        title,
        routePath,
        stage
      }))
    ).toEqual(requiredSubjects);

    subjectContents.forEach((content) => {
      expect(getSubjectContentBySlug(content.id)).toBe(content);
      expect(content.sourceFolders.length).toBeGreaterThan(0);
      expect(content.overview.trim().length).toBeGreaterThan(40);
      expect(content.highFrequencyPoints.length).toBeGreaterThan(0);
      expect(content.yearlySources.length).toBeGreaterThan(0);
      expect(content.lectureSections.length).toBeGreaterThan(0);
      expect(content.reviewChecklist.length).toBeGreaterThan(0);
      expect(content.pitfalls.length).toBeGreaterThan(0);
      expect(content.questionMappings.length).toBeGreaterThan(0);
      expect(content.synthesisBatches.length).toBeGreaterThan(0);
    });
  });

  it('preserves source traceability and verification status for every content area', () => {
    subjectContents.forEach((content) => {
      content.yearlySources.forEach((source) => {
        expect(source.sourceFolder).toMatch(/^_private\//);
        expect(source.sourceFile.endsWith('.pdf') || source.sourceFile.endsWith('.md')).toBe(true);
        expect(source.verificationStatus).toMatch(/^(verified|needs-review)$/);
      });

      content.highFrequencyPoints.forEach((point) => {
        expect(point.sourceRefs.length).toBeGreaterThan(0);
        expect(point.summary.trim().length).toBeGreaterThan(0);
      });

      content.lectureSections.forEach((section) => {
        expect(section.sourceRefs.length).toBeGreaterThan(0);
        expect(section.keyPoints.length).toBeGreaterThan(0);
        expect(section.body.trim().length).toBeGreaterThan(80);
      });

      content.questionMappings.forEach((mapping) => {
        expect(mapping.sourceRef.sourceFile.trim().length).toBeGreaterThan(0);
        expect(mapping.examPointId.trim().length).toBeGreaterThan(0);
        expect(mapping.questionType.trim().length).toBeGreaterThan(0);
        expect(mapping.verificationStatus).toMatch(/^(verified|needs-review)$/);
      });
    });
  });

  it('models formal multiple-choice questions only when all four-option fields are present', () => {
    const formalQuestions = subjectContents.flatMap((content) =>
      content.questionMappings.filter((mapping) => mapping.kind === 'formal-question')
    );

    formalQuestions.forEach((question) => {
      expect(question.options).toHaveLength(4);
      expect(question.optionExplanations).toHaveLength(4);
      expect(question.correctAnswer).toMatch(/^[ABCD]$/);
      expect(question.verificationStatus).toBe('verified');
    });
  });
});

