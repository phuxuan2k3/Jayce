# Frontend Development Conventions

## _Components_

- Each file should only reflect 1 components (except context).
- Components can be: UI components, contexts (socket-context.tsx), hooks,
- There are 2 types of UI components:
  1.  Reusable components (UI): Could be used across the project (global component folder), or page specific components (same folder of its beloging page).
  2.  Routing components: A component without props and to be replaced in routers. There are 2 types: Page and Layout.

## Paths

- All navigateion (using react-router) must use pre-defined path variable in src/router/paths.ts. DO NOT use string.

## Paging

- Page component must ends with Page, ex: LoginPage.tsx.
- Page components must be in the same folder of the page that uses it.
  - If the component is shared across the page. Place it in "common" folder.
- Pages folder **ONLY being nested in a layout folder**, otherwise, place at the same level.
- Prioritize using nested components, not pages. Only use page as a check point for user can navigate back.

## Layout

- Layout component must ends with Layout, ex: NoAuthLayout.tsx.
- Layout not only for nested pages, but also contexts (useContext).
- Shared layout will be placed in the root component folder. Some shared layouts like:
  - RoleGuard (ProtectedRoute) is a layout for role managing pages.
  - ...

## Features

- All logic defined in features folder, not in the page folder. This includes:
  1.  Hooks
  2.  Redux state (backend for frontend)
  3.  API calls to backend
