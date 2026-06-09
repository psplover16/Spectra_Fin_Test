## MODIFIED Requirements

### Requirement: A Group Year List Shows All Years
The A group route SHALL display exactly eight year rows in descending order: 114, 113, 112, 111, 110, 109, 108, 107. Each row SHALL identify the year as a complete analysis year with 50 questions.

#### Scenario: A group shows ordered complete years
- **WHEN** a user opens `/a-group`
- **THEN** the page shows year rows in this order: 114, 113, 112, 111, 110, 109, 108, 107
- **THEN** every year row is marked as complete
- **THEN** every year row shows a question count of 50

##### Example: Year list states
| Year | Status | Question count |
| ----- | ----- | ----- |
| 114 | complete | 50 |
| 113 | complete | 50 |
| 112 | complete | 50 |
| 111 | complete | 50 |
| 110 | complete | 50 |
| 109 | complete | 50 |
| 108 | complete | 50 |
| 107 | complete | 50 |

### Requirement: Year Row Main Area Navigates To Year Route
Each A group year row SHALL navigate from its main content area to `/a-group/:year` for that row.

#### Scenario: User opens year 114 from the row body
- **WHEN** a user activates the main content area of the 114 row
- **THEN** the application navigates to `/a-group/114`

#### Scenario: User opens historical complete year from the row body
- **WHEN** a user activates the main content area of any 107 through 113 row
- **THEN** the application navigates to `/a-group/:year` for the activated year
- **THEN** the destination route renders a complete analysis page instead of a pending page
