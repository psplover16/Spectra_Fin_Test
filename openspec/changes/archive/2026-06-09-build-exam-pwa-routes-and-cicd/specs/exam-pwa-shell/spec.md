## ADDED Requirements

### Requirement: Installable PWA shell

The system SHALL provide installable PWA metadata for the exam handout application, including the app name "國營資訊職員考試講義", icons, start URL, display mode, and theme metadata.

#### Scenario: Manifest metadata is available

- **WHEN** the built site is served by a browser
- **THEN** the browser can load the web app manifest with the app name "國營資訊職員考試講義" and installable metadata

### Requirement: Offline app shell fallback

The system SHALL cache the application shell and route fallback resources so the five learning routes remain readable after the first successful load.

#### Scenario: Offline route access after first load

- **WHEN** a user loads the site once and then the browser is switched offline
- **THEN** the root page and the five learning routes render their placeholder content without a network request

##### Example: offline route set

| Route | Expected visible heading |
| ----- | ------------------------ |
| `/computer-principles` | `計算機原理` |
| `/networking` | `網路概論` |
| `/information-management` | `資訊管理` |
| `/programming` | `程式設計` |
| `/language` | `語言` |

### Requirement: Non-blocking service worker failure

The system SHALL keep the online site usable when service worker registration fails and SHALL surface a non-blocking offline-readiness message.

#### Scenario: Service worker registration fails

- **WHEN** service worker registration rejects or is unavailable
- **THEN** the site remains navigable online and displays that offline support is not ready