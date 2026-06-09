## MODIFIED Requirements

### Requirement: Five exam learning routes

The system SHALL expose group-first primary learning route metadata for `/a-group`, `/b-group`, `/language`, and `/learning`. Legacy subject routes SHALL remain redirect routes and SHALL NOT appear as primary navigation items.

#### Scenario: Group-first route set is available

- **WHEN** the route metadata is loaded
- **THEN** it contains the primary routes `/a-group`, `/b-group`, `/language`, and `/learning`
- **THEN** it does not list `/computer-principles`, `/networking`, `/information-management`, or `/programming` as primary route metadata

##### Example: required group-first route metadata

| Slug | Path | Display name | Category | Source group |
| ---- | ---- | ------------ | -------- | ------------ |
| `a-group` | `/a-group` | `A 組` | `professional` | `計算機原理、網路概論` |
| `b-group` | `/b-group` | `B 組` | `professional` | `資訊管理、程式設計` |
| `language` | `/language` | `語言` | `common` | `國文、英文` |
| `learning` | `/learning` | `學習` | `learning` | `個人學習入口` |

#### Scenario: Legacy subject routes stay as redirects

- **WHEN** a user opens `/computer-principles`, `/networking`, `/information-management`, or `/programming`
- **THEN** the application redirects to the replacement group route
- **THEN** the opened legacy route does not render as a primary learning page

### Requirement: Route metadata shape

The system SHALL define each primary learning route with `slug`, `path`, `displayName`, `category`, `description`, `statusLabel`, and `sourceGroup` fields. `category` SHALL be `professional`, `common`, or `learning`.

#### Scenario: Metadata contract is complete

- **WHEN** a route item is used by navigation, page rendering, or tests
- **THEN** every required field is present
- **THEN** `category` is `professional`, `common`, or `learning`

### Requirement: Placeholder learning content

The system SHALL render non-empty placeholder content for `/learning` while future notebook functions remain outside this change. B group and language routes SHALL render their group or yearly analysis content after this change and SHALL NOT retain the old import-pending placeholder as their primary content.

#### Scenario: Learning notebook content has not been designed

- **WHEN** a user opens `/learning`
- **THEN** the page displays the route title and a visible placeholder state instead of a blank page
- **THEN** the page does not display note list, editor, search, export, or synchronization controls

#### Scenario: B group and language no longer show import-only placeholder

- **WHEN** a user opens `/b-group` or `/language`
- **THEN** the page displays the matching year list instead of the old formal-content-not-imported placeholder
