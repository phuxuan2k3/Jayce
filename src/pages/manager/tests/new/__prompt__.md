You are an expert frontend engineer. Generate the complete React + TypeScript code (with TailwindCSS classes) for a `BuilderWizzardTab` component.

Requirements:

1. **Structure**

   - A 4-step wizard with progress indicator (“Step 1 of 4” through “Step 4 of 4”).
   - Navigation: “Back” and “Next” buttons; “Generate” or “Export” on final step.

2. **Steps & UI**

   - **Step 1: Test Basics**
     - Text input for “Role & Title”
     - Dropdown for “Purpose” with options: Screening, Certification, Upskilling
     - Numeric stepper or slider for “Total Questions”
   - **Step 2: Question Blueprint**
     - Editable data grid (or list) of topics: each row has “Topic Name” (text), “# Questions” (numeric stepper), and a small difficulty pie-chart trigger to set easy/med/hard ratio.
     - “Add Topic” button.
     - Drag-and-drop reordering.
   - **Step 3: Style & Refinement**
     - Accordion or card group with three sections:
       1. **Expert Persona** (radio group: Senior Architect, Hands-on Developer, Beginner-Friendly)
       2. **Sampling Settings**: Temperature slider (0.2–1.0), Self-Consistency runs (1–5 numeric input)
       3. **Examples & RAG**: File upload or textarea for past Q&A, plus “Select from Gallery” few-shot presets
   - **Step 4: Preview & Export**
     - Split pane: left scrollable list of generated questions, each with “Edit” and “Regenerate” buttons and a color-coded difficulty badge; right pane shows blueprint recap (topics & counts), export format toggles (JSON/PDF/CSV), and an email input + “Send” button for candidate invites.

3. **State Management & UX**

   - Use Redux Toolkit (RTK) as a state-management hook to persist inputs and AI outputs across steps.
   - Show skeleton loaders during AI calls.
   - Inline validation errors.
   - Tooltips on hover for help texts.

4. **Styling**

   - Use TailwindCSS utility classes exclusively.
   - Responsive layout: wizard container centered, max-width, adequate padding and margins.

5. **Code Organization**
   - All new files stay within the builder-wizzard-tab folder.
   - Split each step into its own child component in the `components` folder.
   - Main `index.tsx` orchestrates navigation and renders the current step.
   - Include any necessary TypeScript interfaces for props and state.

Provide all necessary imports and export a default `BuilderWizard` component. No external styles or assets beyond Tailwind.

——

Respond ONLY with the React + TypeScript code. Do not include any explanation or commentary. Do not stop until you are done.
