## ADDED Requirements

### Requirement: Years 107 Through 113 Contain Fifty Question Analyses
The A group analysis data SHALL contain exactly 50 question analysis records for each year from 107 through 113.

#### Scenario: Load each completed historical year analysis
- **WHEN** the application loads `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** it resolves a complete question analysis state for the requested year
- **THEN** the state contains exactly 50 question analysis records for that year

##### Example: Completed historical year counts
| Year | Source file | Expected records |
| ----- | ----- | ----- |
| 107 | 107.pdf | 50 |
| 108 | 108.pdf | 50 |
| 109 | 109.pdf | 50 |
| 110 | 110.pdf | 50 |
| 111 | 111.pdf | 50 |
| 112 | 112.pdf | 50 |
| 113 | 113.pdf | 50 |

### Requirement: PDF Source Baselines Cover Years 107 Through 113
Each 107 through 113 A group source baseline SHALL preserve the original PDF stem, A-D options, official answer marker, page number, file name, and extraction status for all 50 questions.

#### Scenario: Validate a historical year source baseline
- **WHEN** the content review validates the source baseline for any year from 107 through 113
- **THEN** the baseline contains question numbers 1 through 50 with no duplicate numbers
- **THEN** every row contains non-empty original exam text, exactly A-D options, at least one official answer value, and a source reference to the matching year PDF

##### Example: Source baseline files
| Year | File name | Page count | Answer source |
| ----- | ----- | ----- | ----- |
| 107 | 107.pdf | 4 | inline bracket answer marker |
| 108 | 108.pdf | 4 | inline bracket answer marker |
| 109 | 109.pdf | 4 | inline bracket answer marker |
| 110 | 110.pdf | 4 | inline bracket answer marker |
| 111 | 111.pdf | 4 | inline bracket answer marker |
| 112 | 112.pdf | 4 | inline bracket answer marker |
| 113 | 113.pdf | 4 | inline bracket answer marker |

### Requirement: Special Answer States Preserve Official Ambiguity
Question analysis records SHALL preserve official multi-answer and all-awarded markers without converting them into an unqualified verified single answer.

#### Scenario: Multi-answer marker is represented with review context
- **WHEN** a PDF answer marker lists more than one option such as `B or C`, `A or D`, `A or B`, or `B, C`
- **THEN** `acceptedAnswers` contains every listed option
- **THEN** `answerVerification` is `needs-review` or `suspected-error`
- **THEN** `answerNote` explains the official marker and the reason the answer is not marked as an ordinary verified single answer

#### Scenario: All-awarded marker is represented with review context
- **WHEN** a PDF answer marker states that the question is all-awarded or universally credited
- **THEN** `acceptedAnswers` contains A, B, C, and D
- **THEN** `answerVerification` is `needs-review` or `suspected-error`
- **THEN** `answerNote` names the PDF all-awarded marker and explains how learners shall interpret the question

##### Example: Known special answer markers from the PDF inventory
| Year | Question | PDF marker | Required acceptedAnswers | Required verification |
| ----- | ----- | ----- | ----- | ----- |
| 107 | 13 | B or C | B, C | needs-review or suspected-error |
| 107 | 49 | B or C | B, C | needs-review or suspected-error |
| 110 | 37 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 112 | 10 | A or D | A, D | needs-review or suspected-error |
| 112 | 21 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 112 | 32 | A or B | A, B | needs-review or suspected-error |
| 113 | 17 | all-awarded | A, B, C, D | needs-review or suspected-error |
| 113 | 43 | B, C | B, C | needs-review or suspected-error |

### Requirement: Systematic Novice Teaching Applies To Years 107 Through 113
Every 107 through 113 question analysis SHALL meet the same systematic novice teaching standard as the reviewed 114 content.

#### Scenario: Historical question passes content review
- **WHEN** the content review checks any 107 through 113 question analysis
- **THEN** `beginnerExplanation` explains prerequisite concepts, rule or formula source, applicability conditions, why the official answer holds, and common confusion boundaries
- **THEN** `solvingSteps` applies those rules step by step to the concrete stem or options
- **THEN** `optionExplanations` explains every A-D option and identifies the misconception or condition behind each distractor
- **THEN** `keyTakeaways` includes reusable rules and common traps

### Requirement: Risky PDF Extractions Require Traceable Review
Questions with PDF extraction risks SHALL remain traceable until their original text, options, and answer state are manually checked against the PDF.

#### Scenario: Extraction risk is kept visible
- **WHEN** a question comes from a PDF page with a figure, table, code block, formula symbol, repeated text, cross-line answer marker, same-line options, or special glyph
- **THEN** its source baseline identifies the matching PDF page and extraction status
- **THEN** its reviewed analysis does not mark the source extraction as verified until the risky content has been checked against the PDF

##### Example: Known extraction risks from the PDF inventory
| Year | Question or range | Risk |
| ----- | ----- | ----- |
| 108 | 9 | code layout requires manual format check |
| 108 | 22 | table layout requires manual field check |
| 109 | 25 | binary tree figure requires figure confirmation |
| 109 | 38 | route table requires column normalization |
| 110 | 9 | overline symbol requires glyph confirmation |
| 110 | 45 | arrow glyph requires normalization |
| 111 | 33, 41, 50 | same-line options or numbered clauses require manual split check |
| 112 | 33 | repeated or misplaced text requires manual confirmation |
| 113 | 41, 42 | code question formatting requires manual preservation |

## MODIFIED Requirements

### Requirement: Question Analysis Uses Verified Data Shape
Each question analysis record for years 107 through 114 SHALL include year, number, acceptedAnswers, answerNote, answerVerification, originalStem, options, coreTerms, beginnerExplanation, solvingSteps, optionExplanations, keyTakeaways, tags, and sourceRef.

#### Scenario: Question record has required fields
- **WHEN** the application reads any 107 through 114 question analysis record
- **THEN** the record has a non-empty year and number
- **THEN** acceptedAnswers contains one or more values from A, B, C, and D
- **THEN** options contains exactly A, B, C, and D keys
- **THEN** optionExplanations contains exactly A, B, C, and D keys
- **THEN** sourceRef includes a PDF file name and extractionStatus

##### Example: Accepted answers field
| Input answer state | acceptedAnswers | answerNote |
| ----- | ----- | ----- |
| Single official answer C | C | null |
| Multiple accepted answers B and C | B, C | Official material accepts B or C |
| All-awarded official marker | A, B, C, D | Official material marks the question as all-awarded |

### Requirement: Question Analysis Presents Original Exam Content Separately
The year analysis page SHALL visually separate original exam content from generated teaching analysis for every completed A group year from 107 through 114.

#### Scenario: Render a historical question card
- **WHEN** a user views any question on `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, `/a-group/113`, or `/a-group/114`
- **THEN** the question card shows original stem, accepted answer, and four original options
- **THEN** the generated beginner explanation and option explanations appear in separate teaching sections
