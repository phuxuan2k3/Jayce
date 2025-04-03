# Frontend Development Conventions

**_First rule: DO NOT use "any" type (for all cost)_**

**_Second rule: DO NOT use env directly, define it in env.ts_**

**_Third rule: ONLY use RTK Query to fetch data, do not use "fetch"_**

## _Components_

- Each file should only reflect 1 components (except context).
- Components can be: UI components, contexts (socket-context.tsx), hooks,
- There are 2 types of UI components:
  1.  Reusable components (UI): Could be used across the project (global component folder), or page specific components (same folder of its beloging page).
  2.  Routing components: A component without props and to be replaced in routers. There are 2 types: Page and Layout.

# Page Folder Structure (Important)

- Folder structure is a "tree".
  - Each leaf folder contain **ONE** page component.
  - Each parent folder contain **ONE or NONE** layout component. And all subfolders's pages or layouts will be that layout's child in the router.
- There are 2 special folder:
  - "common" folder is for shared component in all subfolder's components (pages, layouts, or regular components). Ex: a/b/common => shared among components in a/b/...
  - "context" folder is only used for contexts (useContext API). And that context **can ONLY be provided** in the layout at the same level. Ex: a/b/context => provided in a/b/Layout.tsx.
- Normal folder will have its name corresponding to its folder path to root. (see the Paths section below)
  - If path using dynamic ID segment, uses \[id\] name for any segment. Ex: a/:testId => a >> [id]
  - If path uses index attribute in router, use "index" name. Ex: a/ => a > index.

## Paths

- Uses plural forms (has s/es) when access a resource type (tests, scenarios, ...). ONE resource = ONE parent folder.
  - Uses dynamic path ID (:id) to access a resource's detail.
  - If a resource is nested, add one more path segments. Ex: Tests has many Attempts => tests/attempts (accessing atttmepts resource).
- Resource path **only** has layout, they **DO NOT** contain any pages. To access a page, use index in children (which means you want to get all resource of that type).
- Action path shows what you what to do with that resource:
  - tests/self => get self's tests
  - tests/[id]/edit => edit a test
- Dynamic paths are used with "in()" method (default is its dynamic segment, Ex: :testId).
- "\_layout" paths is just an extra segment, and usally has a layout wrap all pages with deeper segments (but not always). Also called ROOT path.
- If a page uses \_layout as its path, uses _index_ attribute of react-router.

## Routing Component

- Name must **follow folder structure**. Except for 2 special folder: \[id\] and index (applies for Page and Layout):
  - \[id\]: uses singular (no s/es) form of the parent folder. Ex: tests > [id] => TestPage.tsx, tests > attempts > [id] => TestsAttemptPage.tsx (get attempt of any tests).
  - index: don't add any path segment. Ex: tests > index => TestsPage.tsx

### Paging

- Name must ends with Page, ex: LoginPage.tsx.
- Page components can be shared in "common" folder.
- Prioritize using nested components, not pages. Only use page as a check point for user can navigate back.

### Layout

- Name must ends with Layout, ex: NoAuthLayout.tsx.
- Layout not only for nested pages, but also contexts (useContext), and also handle role guarding routes.
- **ONE parent** folder only has **ONE** layout. Leaf folder **DO NOT** have layout.

# More Information

## Paths

- All navigateion (using react-router) must use pre-defined path variable in src/router/paths.ts. DO NOT use hard-coded string.

## API

- **ONLY** use URL from the app/env.ts for consistency.
- All baseQuery is in app/bases folder.

## Features

- All logic defined in features folder, not in the page folder. This includes:
  1.  Hooks
  2.  Redux state (backend for frontend)
  3.  API calls to backend
- They can also contain types, functions, validation related to a specific feature.
