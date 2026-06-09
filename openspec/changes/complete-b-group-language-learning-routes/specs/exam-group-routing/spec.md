## MODIFIED Requirements

### Requirement: Group Routes Are Primary Navigation

The application SHALL expose `/a-group`, `/b-group`, `/language`, and `/learning` as the primary public learning routes. The root route SHALL redirect to `/a-group`.

#### Scenario: Root route opens A group

- **WHEN** a user visits `/`
- **THEN** the application navigates to `/a-group`

#### Scenario: Primary group and learning routes are reachable

- **WHEN** a user visits `/a-group`, `/b-group`, `/language`, or `/learning`
- **THEN** the application renders the matching route without a NotFound page

## ADDED Requirements

### Requirement: B Group Year Routes Resolve Valid Years

The application SHALL support B group year routes for 107 through 114 inclusive, and each supported year route SHALL render a B group essay analysis page.

#### Scenario: B group valid year route opens analysis

- **WHEN** a user visits `/b-group/107`, `/b-group/108`, `/b-group/109`, `/b-group/110`, `/b-group/111`, `/b-group/112`, `/b-group/113`, or `/b-group/114`
- **THEN** the application renders the matching B group essay analysis page for that valid year
- **THEN** the page provides question analysis records whose count matches the confirmed source index for the requested year

##### Example: Valid B group year routes

| Route | Expected state |
| ----- | ----- |
| `/b-group/107` | B group analysis page |
| `/b-group/108` | B group analysis page |
| `/b-group/109` | B group analysis page |
| `/b-group/110` | B group analysis page |
| `/b-group/111` | B group analysis page |
| `/b-group/112` | B group analysis page |
| `/b-group/113` | B group analysis page |
| `/b-group/114` | B group analysis page |

### Requirement: Invalid B Group Years Render NotFound

The application SHALL render NotFound for B group year route parameters outside the valid 107 through 114 range or non-numeric values.

#### Scenario: B group out of range year opens NotFound

- **WHEN** a user visits `/b-group/115` or `/b-group/999`
- **THEN** the application renders the NotFound page

#### Scenario: B group non numeric year opens NotFound

- **WHEN** a user visits `/b-group/abc`
- **THEN** the application renders the NotFound page

### Requirement: Language Year Routes Resolve Source Years

The application SHALL support language year routes for 107 through 112 inclusive, and each supported year route SHALL render a language analysis page.

#### Scenario: Language valid year route opens analysis

- **WHEN** a user visits `/language/107`, `/language/108`, `/language/109`, `/language/110`, `/language/111`, or `/language/112`
- **THEN** the application renders the matching language analysis page for that valid year
- **THEN** the page provides question analysis records whose count matches the confirmed source index for the requested year

##### Example: Valid language year routes

| Route | Expected state |
| ----- | ----- |
| `/language/107` | language analysis page |
| `/language/108` | language analysis page |
| `/language/109` | language analysis page |
| `/language/110` | language analysis page |
| `/language/111` | language analysis page |
| `/language/112` | language analysis page |

### Requirement: Invalid Language Years Render NotFound

The application SHALL render NotFound for language year route parameters outside the valid 107 through 112 range or non-numeric values. Language years 113 and 114 SHALL render NotFound in this change.

#### Scenario: Language unsupported source year opens NotFound

- **WHEN** a user visits `/language/113` or `/language/114`
- **THEN** the application renders the NotFound page

#### Scenario: Language out of range year opens NotFound

- **WHEN** a user visits `/language/115` or `/language/999`
- **THEN** the application renders the NotFound page

#### Scenario: Language non numeric year opens NotFound

- **WHEN** a user visits `/language/abc`
- **THEN** the application renders the NotFound page
