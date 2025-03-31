# Frontend Development Conventions

## _Components_

- Each file should only reflect 1 components (except context).
- Components can be: UI components, contexts (socket-context.tsx), hooks,
- There are 2 types of UI components:
  1.  Reusable components (UI): Could be used across the project (global component folder), or page specific components (same folder of its beloging page).
  2.  Routing components: A component without props and to be replaced in routers. There are 2 types: Page and Layout.

# Page Folder Structure (Important)

- "common" folder is for shared component across pages in the folder or components being used by the layout.

# More Information

## Paths

- All navigateion (using react-router) must use pre-defined path variable in src/router/paths.ts. DO NOT use hard-coded string.
- Dynamic paths are used with "in()" method (default is its dynamic segment, Ex: :testId).
- "\_layout" paths is just an extra segment, and usally has a layout wrap all pages with deeper segments (but not always). Also called ROOT path.
- If a page uses \_layout as its path, uses _index_ attribute of react-router.

## Paging

- Page component must ends with Page, ex: LoginPage.tsx.
- Page components must be in the same folder of the page that uses it.
  - If the component is shared across the page. Place it in "common" folder.
- Pages folder **FOLLOW the path structure**.
- Prioritize using nested components, not pages. Only use page as a check point for user can navigate back.

## Layout & Context

- Layout component must ends with Layout, ex: NoAuthLayout.tsx.
- Layout not only for nested pages, but also contexts (useContext), and also handle role guarding routes.
- Context can be placed the same level as layout in pages if the context is used for multiple pages. Then, they will provide the layout with their context.

## Features

- All logic defined in features folder, not in the page folder. This includes:
  1.  Hooks
  2.  Redux state (backend for frontend)
  3.  API calls to backend
- They can also contain types, functions, validation related to a specific feature.
