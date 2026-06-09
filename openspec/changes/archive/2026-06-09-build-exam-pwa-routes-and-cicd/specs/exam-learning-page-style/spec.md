## ADDED Requirements

### Requirement: Reference learning page experience

The system SHALL adapt the layout structure, interaction flow, and visual style of the N5 grammar subroute from the Spectra-Learning-Japanese reference project for the exam learning pages.

#### Scenario: Reference style applied to exam route

- **WHEN** a user opens any of the five learning routes on a mobile viewport
- **THEN** the page uses a learning-page layout with readable content sections, clear progress or status affordances, and a primary action area matching the reference experience in structure and interaction rhythm

### Requirement: Mobile-first reading layout

The system SHALL prioritize mobile reading and one-handed operation for the learning page layout.

#### Scenario: Mobile viewport layout

- **WHEN** a route is viewed on a 390 px wide viewport
- **THEN** text, route controls, status labels, and primary actions fit without horizontal scrolling or overlapping

### Requirement: Subject-specific visual distinction

The system SHALL keep a consistent page system while making each subject route distinguishable by title, category, source group, and route-specific accent treatment.

#### Scenario: User compares two subjects

- **WHEN** a user navigates from `計算機原理` to `語言`
- **THEN** both pages keep the same learning-page structure while displaying different subject metadata and category treatment

### Requirement: No source content import in style pages

The system MUST NOT render Markdown or PDF content from the private source folders in this change.

#### Scenario: Placeholder page rendered

- **WHEN** a learning route renders its content area
- **THEN** the page displays placeholder learning states and source group labels without converting private Markdown or PDF files into handout body content