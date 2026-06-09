## ADDED Requirements

### Requirement: Learning Placeholder Route Is Reachable

The application SHALL expose `/learning` as a public route. The route SHALL render a non-empty placeholder view for the future learning notebook area.

#### Scenario: User opens learning route

- **WHEN** a user visits `/learning`
- **THEN** the application renders the learning placeholder view
- **THEN** the page does not render NotFound
- **THEN** the page has non-empty visible content

### Requirement: Learning Navigation Item Is Primary Navigation

The application shell SHALL include a primary navigation item labeled `學習` that points to `/learning`. The navigation item SHALL expose active state when the current route is `/learning`.

#### Scenario: Learning nav item is visible

- **WHEN** the application shell renders
- **THEN** the primary navigation includes `A 組`, `B 組`, `語言`, and `學習`
- **THEN** the `學習` item points to `/learning`

#### Scenario: Learning nav item becomes active

- **WHEN** a user visits `/learning`
- **THEN** the `學習` navigation item has page-current active state

### Requirement: Learning Placeholder Does Not Implement Notes

The learning placeholder SHALL NOT implement note data models, note lists, editors, search, export, synchronization, or notebook localStorage writes in this change.

#### Scenario: Placeholder renders without note state

- **WHEN** a user opens `/learning`
- **THEN** the page renders without reading or writing notebook storage
- **THEN** the page does not display note CRUD controls

### Requirement: Learning Placeholder Supports Route Preload And Offline Shell

The route preloader SHALL recognize `/learning`, and the PWA shell SHALL keep `/learning` reachable through the cached application shell after build output is generated.

#### Scenario: Learning route can be preloaded

- **WHEN** route preload receives `/learning`
- **THEN** it resolves the learning route component loader

#### Scenario: Learning route works in mobile smoke

- **WHEN** a 375px wide browser opens `/learning`
- **THEN** the placeholder content fits without horizontal overflow
- **THEN** primary navigation remains usable
