## ADDED Requirements

### Requirement: A Group Year List Shows All Years

The A group route SHALL display exactly eight year rows in descending order: 114, 113, 112, 111, 110, 109, 108, 107.

#### Scenario: A group shows ordered years

- **WHEN** a user opens `/a-group`
- **THEN** the page shows year rows in this order: 114, 113, 112, 111, 110, 109, 108, 107

### Requirement: Year Row Main Area Navigates To Year Route

Each A group year row SHALL navigate from its main content area to `/a-group/:year` for that row.

#### Scenario: User opens year 114 from the row body

- **WHEN** a user activates the main content area of the 114 row
- **THEN** the application navigates to `/a-group/114`

#### Scenario: User opens pending year from the row body

- **WHEN** a user activates the main content area of the 113 row
- **THEN** the application navigates to `/a-group/113`

### Requirement: Bookmark Control Persists One A Group Year

The A group bookmark control SHALL persist at most one bookmarked year in localStorage under the A group bookmark snapshot. Selecting a new year SHALL replace the previous bookmark.

#### Scenario: Bookmark persists after reload

- **WHEN** a user bookmarks year 114 and reloads the page
- **THEN** year 114 remains visibly bookmarked

#### Scenario: New bookmark replaces previous bookmark

- **WHEN** a user bookmarks year 114 and then bookmarks year 113
- **THEN** year 113 is visibly bookmarked
- **THEN** year 114 is not visibly bookmarked

### Requirement: Completion Control Persists Completed Years

The A group completion control SHALL persist completed year IDs in localStorage under the A group completion snapshot.

#### Scenario: Completed year persists after reload

- **WHEN** a user marks year 114 complete and reloads the page
- **THEN** year 114 remains visibly complete

#### Scenario: Uncompleted year is removed from completion snapshot

- **WHEN** a user marks year 114 complete and then marks year 114 incomplete
- **THEN** year 114 is not visibly complete

### Requirement: Completing A Bookmarked Year Clears Its Bookmark

If a user marks the currently bookmarked year complete, the application SHALL clear that bookmark.

#### Scenario: Complete bookmarked year

- **WHEN** year 114 is bookmarked
- **AND** the user marks year 114 complete
- **THEN** no A group year remains bookmarked

### Requirement: Bookmark And Completion Controls Do Not Navigate

The bookmark and completion hit areas SHALL NOT trigger year row navigation.

#### Scenario: Bookmark click stays on A group list

- **WHEN** a user activates the bookmark control on the 114 row while viewing `/a-group`
- **THEN** the application remains on `/a-group`

#### Scenario: Completion click stays on A group list

- **WHEN** a user activates the completion control on the 114 row while viewing `/a-group`
- **THEN** the application remains on `/a-group`

### Requirement: Invalid Progress Snapshots Fail Safe

If persisted A group progress JSON is invalid or uses an unsupported version, the application SHALL ignore the invalid snapshot and render the year list with no completed years and no bookmark.

#### Scenario: Corrupt localStorage snapshot

- **WHEN** A group progress localStorage contains invalid JSON
- **THEN** `/a-group` renders without console errors
- **THEN** no year is visibly complete or bookmarked
