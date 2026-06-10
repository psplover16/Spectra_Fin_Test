## Apply Direction

This change treats 114 A group analyses as the canonical beginner-teaching template for later years. Each question keeps the original source packet first:

- original stem
- A-D options
- official answer
- answerVerification and answerNote
- tags
- sourceRef

Every rewrite then follows the same novice workflow:

1. Identify the question type.
2. List likely novice blockers.
3. Introduce prerequisite terms.
4. State the concept purpose or problem being solved.
5. State the rule, formula, mechanism, or comparison basis.
6. Apply that rule to the current stem, values, or options.
7. Explain each A-D option by its concept or condition.
8. Add reusable takeaways and common traps.
9. Decide whether a teachingTables entry improves understanding.
10. Review against the content rubric before merge.

## Draft Packet Contract

Parallel draft agents may produce drafts, but they must not directly merge into the shared TypeScript data file. Each draft packet must include:

- Question
- Question type
- Source packet
- Potential novice blockers
- Core terms
- Beginner explanation
- Teaching tables or a paragraph-only decision
- Solving steps
- Option explanations
- Key takeaways
- Answer note changes
- Reviewer concerns

## Review Roles

Technical Reviewer checks definitions, formulas, calculations, answer uniqueness, and answerNote preservation.

Novice Reviewer checks whether a reader without a computer-science background can understand the prerequisite terms, purpose, rules, step-by-step application, and distractor options.

Table Reviewer checks whether teachingTables are used only for comparison, classification, process, layer, or formula-reference content. Tables must have title, non-empty headers, non-empty rows, equal cell counts, concrete representations where relevant, and mobile-readable cells.

Each review finding must be recorded as pass, fixed, or needs-review.

## Main-Agent Merge Rules

Only the main agent merges draft output into `src/modules/examGroups/aGroup/data/years/114ReviewedAnalyses.ts`, shared rubric tests, and card rendering behavior.

The merge must preserve:

- field order and TypeScript shape
- original stem and A-D options
- acceptedAnswers
- answerVerification and answerNote
- tags and sourceRef
- consistent Traditional Chinese teaching tone
- optional teachingTables shape

No question is complete while a technical, novice-readability, table-shape, or answerNote concern remains unresolved.
