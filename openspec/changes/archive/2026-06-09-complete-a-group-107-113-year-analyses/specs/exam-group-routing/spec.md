## MODIFIED Requirements

### Requirement: A Group Year Routes Resolve Valid Years
The application SHALL support A group year routes for 107 through 114 inclusive, and each supported year route SHALL render a complete analysis page.

#### Scenario: Year 114 opens complete analysis
- **WHEN** a user visits `/a-group/114`
- **THEN** the application renders the 114 A group analysis page
- **THEN** the page provides 50 question analysis records

#### Scenario: Years 107 to 113 open complete analyses
- **WHEN** a user visits `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** the application renders the matching A group analysis page for that valid year
- **THEN** the page provides 50 question analysis records for the requested year
- **THEN** the page does not render the layout-confirmation pending message

##### Example: Valid complete year routes
| Route | Expected state | Expected count |
| ----- | ----- | ----- |
| /a-group/107 | complete | 50 |
| /a-group/108 | complete | 50 |
| /a-group/109 | complete | 50 |
| /a-group/110 | complete | 50 |
| /a-group/111 | complete | 50 |
| /a-group/112 | complete | 50 |
| /a-group/113 | complete | 50 |
| /a-group/114 | complete | 50 |
