# BuilderWizzardTab Component

A 4-step wizard component for creating and configuring skill assessment tests.

## Features

- 4-step wizard with progress indicator
- Comprehensive state management via Redux Toolkit
- Responsive design using TailwindCSS
- Drag and drop reordering for test topics
- Interactive difficulty distribution visualization
- Real-time preview of generated questions

## Component Structure

```
builder-wizzard-tab/
├── BuilderWizzard.tsx      # Main export file
├── index.tsx               # Wizard orchestration component
├── styles.css              # Custom styles
├── state/
│   └── wizardSlice.ts      # Redux state management
└── components/
    ├── TestBasics.tsx      # Step 1: Test basics configuration
    ├── QuestionBlueprint.tsx # Step 2: Topic management
    ├── StyleRefinement.tsx # Step 3: Style configuration
    └── PreviewExport.tsx   # Step 4: Preview and export
```

## Usage

```jsx
import BuilderWizzard from 'path/to/builder-wizzard-tab/BuilderWizzard';

function TestBuilder() {
  return (
    <div>
      <h1>Create a New Assessment</h1>
      <BuilderWizzard />
    </div>
  );
}
```

## Dependencies

- React
- Redux Toolkit
- TailwindCSS
- react-beautiful-dnd (for drag and drop functionality)
