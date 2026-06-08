## ADDED Requirements

### Requirement: Five exam learning routes

The system SHALL expose exactly five primary learning routes for this change, using English URL slugs and Traditional Chinese display names.

#### Scenario: Route set is available

- **WHEN** the route metadata is loaded
- **THEN** it contains the five routes `/computer-principles`, `/networking`, `/information-management`, `/programming`, and `/language`

##### Example: required route metadata

| Slug | Path | Display name | Category |
| ---- | ---- | ------------ | -------- |
| `computer-principles` | `/computer-principles` | `計算機原理` | `professional` |
| `networking` | `/networking` | `網路概論` | `professional` |
| `information-management` | `/information-management` | `資訊管理` | `professional` |
| `programming` | `/programming` | `程式設計` | `professional` |
| `language` | `/language` | `語言` | `common` |

### Requirement: Route metadata shape

The system SHALL define each learning route with `slug`, `path`, `displayName`, `category`, `description`, `statusLabel`, and `sourceGroup` fields.

#### Scenario: Metadata contract is complete

- **WHEN** a route item is used by navigation, page rendering, or tests
- **THEN** every required field is present and `category` is either `professional` or `common`

### Requirement: Placeholder learning content

The system SHALL render non-empty placeholder learning content for each route while full handout and question content remains outside this change.

#### Scenario: Content has not been imported

- **WHEN** a user opens any of the five learning routes before handout import exists
- **THEN** the page displays the route title, category, description, source group, and a visible "尚未匯入正式講義" state instead of a blank page

### Requirement: Unknown route recovery

The system SHALL display a not-found state for unknown routes and provide a visible action back to the learning entry.

#### Scenario: Unknown route opened

- **WHEN** a user opens a path outside the defined route set
- **THEN** the system displays a not-found message and a navigation action back to the root learning entry