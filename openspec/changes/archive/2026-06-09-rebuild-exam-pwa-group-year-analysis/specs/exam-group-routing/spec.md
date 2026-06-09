## ADDED Requirements

### Requirement: Group Routes Are Primary Navigation

The application SHALL expose `/a-group`, `/b-group`, and `/language` as the primary public learning routes. The root route SHALL redirect to `/a-group`.

#### Scenario: Root route opens A group

- **WHEN** a user visits `/`
- **THEN** the application navigates to `/a-group`

#### Scenario: Primary group routes are reachable

- **WHEN** a user visits `/a-group`, `/b-group`, or `/language`
- **THEN** the application renders the matching group route without a NotFound page

### Requirement: Legacy Subject Routes Redirect To Groups

The application SHALL redirect legacy subject routes to their replacement group routes.

#### Scenario: Computer and networking routes redirect to A group

- **WHEN** a user visits `/computer-principles` or `/networking`
- **THEN** the application redirects to `/a-group`

#### Scenario: Management and programming routes redirect to B group

- **WHEN** a user visits `/information-management` or `/programming`
- **THEN** the application redirects to `/b-group`

### Requirement: A Group Year Routes Resolve Valid Years

The application SHALL support A group year routes for 107 through 114 inclusive.

#### Scenario: Year 114 opens complete analysis

- **WHEN** a user visits `/a-group/114`
- **THEN** the application renders the 114 A group analysis page

#### Scenario: Years 107 to 113 open pending pages

- **WHEN** a user visits `/a-group/107`, `/a-group/108`, `/a-group/109`, `/a-group/110`, `/a-group/111`, `/a-group/112`, or `/a-group/113`
- **THEN** the application renders a pending page for that valid year
- **THEN** the page states that the year waits for layout confirmation before content production

### Requirement: Invalid A Group Years Render NotFound

The application SHALL render NotFound for A group year route parameters outside the valid 107 through 114 range or non-numeric values.

#### Scenario: Out of range year opens NotFound

- **WHEN** a user visits `/a-group/115` or `/a-group/999`
- **THEN** the application renders the NotFound page

#### Scenario: Non numeric year opens NotFound

- **WHEN** a user visits `/a-group/abc`
- **THEN** the application renders the NotFound page
