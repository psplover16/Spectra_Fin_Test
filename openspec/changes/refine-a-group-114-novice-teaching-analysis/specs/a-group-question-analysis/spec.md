## ADDED Requirements

### Requirement: Year 114 analysis teaches non-CS beginners

Year 114 A group question analyses SHALL explain each question for readers without a computer-science background before applying the answer rule.

#### Scenario: Explanation introduces prerequisite terms

- **WHEN** the application renders any year 114 A group question card
- **THEN** the beginner explanation introduces the required terms before relying on them
- **THEN** the beginner explanation states the concept purpose or problem being solved
- **THEN** the beginner explanation states the rule, formula, mechanism, or comparison basis used to answer the question

#### Scenario: Solving steps apply the rule to the current question

- **WHEN** a year 114 question uses calculation, multi-step reasoning, a process, a structure, or a comparison
- **THEN** solvingSteps walk through the reasoning in beginner-readable order
- **THEN** each solving step maps back to the original stem, option text, given value, or accepted answer basis

#### Scenario: Options explain distractor concepts

- **WHEN** a year 114 question card renders optionExplanations
- **THEN** every A through D explanation states why the option is correct or which concept, condition, or rule makes it incorrect
- **THEN** no option explanation consists only of an answer label, a generic rejection, or a restatement that the option is not the official answer

### Requirement: Year 114 comparison content supports teaching tables

Year 114 A group question analyses SHALL support teachingTables for comparison, classification, process, layer, and formula-reference content.

#### Scenario: Teaching table shape is valid

- **WHEN** a question analysis record includes teachingTables
- **THEN** each table has a non-empty title
- **THEN** each table has one or more non-empty headers
- **THEN** each table has one or more rows
- **THEN** every row has the same number of cells as the header count

##### Example: valid and invalid table rows

| Headers | Row | Expected result |
| ----- | ----- | ----- |
| Type, Example, Feature | list, [1, 2, 3], Mutable sequence | accepted |
| Type, Example, Feature | tuple, (1, 2, 3) | rejected because the row has two cells for three headers |

#### Scenario: Table cells include concrete representations when the concept has literals

- **WHEN** a teaching table compares programming data types or literal forms
- **THEN** the table includes concrete representations in its cells

##### Example: Python container representations

| Concept | Required concrete representation |
| ----- | ----- |
| list | [1, 2, 3] |
| tuple | (1, 2, 3) |
| set | {1, 2, 3} and set() for an empty set |

### Requirement: Year 114 canonical questions define the rewrite standard

The canonical year 114 questions SHALL define the minimum teaching depth for the rest of the year 114 rewrite.

#### Scenario: Q001 explains two's complement before answering

- **WHEN** the application renders 114-Q001
- **THEN** the analysis explains bit width, complement, two's complement range, negative conversion, fixed-width arithmetic, and signed overflow before concluding the answer
- **THEN** the analysis explains that the stored 6-bit result is 011111 while the mathematical sum overflows the 6-bit signed range

#### Scenario: Q002 explains Von Neumann architecture concisely

- **WHEN** the application renders 114-Q002
- **THEN** the analysis explains the purpose of the Von Neumann architecture
- **THEN** the analysis identifies input, output, memory, control unit, and arithmetic logic unit as functional units
- **THEN** the option explanations distinguish functional units from physical device lists, software lists, and CPU implementation details

#### Scenario: Q003 uses Python type and container comparison tables

- **WHEN** the application renders 114-Q003
- **THEN** the analysis includes a Python common type table with Chinese category, English type name, representation, and key feature columns
- **THEN** the analysis includes a list, tuple, and set comparison table
- **THEN** the comparison table distinguishes literal syntax, order, indexing, duplicate allowance, mutability, and exam-relevant distinction

#### Scenario: Q004 explains CRC implementation mechanics

- **WHEN** the application renders 114-Q004
- **THEN** the analysis explains CRC, the problem CRC solves, generator polynomial conversion, modulo-2 XOR division, zero padding, remainder calculation, and final codeword construction
- **THEN** the solving steps show how G(x)=X^3+X^1 becomes 1010 and why the data word is padded with three zeros

### Requirement: Year 114 content review rejects shallow teaching analysis

The year 114 content review SHALL reject question analyses that fail the non-CS beginner teaching rubric.

#### Scenario: Answer-only explanation fails review

- **WHEN** a year 114 question explanation only states the official answer or result
- **THEN** the year 114 content review fails the systematic novice teaching check

#### Scenario: Missing prerequisite terms fail review

- **WHEN** a year 114 question explanation uses technical terms without introducing the required terms
- **THEN** the year 114 content review fails the systematic novice teaching check

#### Scenario: Missing usage flow fails review

- **WHEN** a year 114 question explanation states a concept but omits how to use the rule, formula, mechanism, or comparison basis
- **THEN** the year 114 content review fails the systematic novice teaching check

#### Scenario: Missing distractor reasoning fails review

- **WHEN** a year 114 question has option explanations that do not identify the concept or condition behind distractor options
- **THEN** the year 114 content review fails the systematic novice teaching check
