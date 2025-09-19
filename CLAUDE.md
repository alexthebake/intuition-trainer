# General Architecture

- We're using React, Typescript, and Vite
- We're styling with PandaCSS

# Code Style

## TypeScript

- Always use `type`s instead of `interface`s
  e.g.

  ```tsx
  type MyComponentProps = {};
  ```

- Prefer type unions over enums
  e.g.
  ```tsx
  type Status = "pending" | "success" | "failure";
  ```

## File Structure

- Prefer named exports to default exports
- Try to keep files and functions short and concise
- If necessary, create helper methods or components, or break things out into multiple files
- Component files should be named in PascalCase, e.g. `MyComponent.tsx`
- Hook files should be named after their hook, e.g. `useMyHook.ts`
- The folder structure is based on `features`. Each feature may have folders for `components`, `hooks`, and `lib`
- Each feature folder should have an `index.ts` file that ONLY exports the things we want to expose

## Import Rules

- When importing something from a feature folder within that _same_ feature folder, never import from the `index` file

  ```tsx
  // Inside of `src/features/my-feature/components/MyComponent.tsx`

  import { useMyHook } from "@@/my-feature/hooks/useMyHook"; // Always import using absolute path
  ```

- When importing something from a feature folder from a _different_ feature folder, always import from the `index` file

  ```tsx
  // Inside of `src/features/my-other-feature/components/MyOtherComponent.tsx`

  import { useMyHook } from "@@/my-feature";
  ```

## React Components

- Define react components with `React.FC` like so:
  ```tsx
  export const MyComponent: React.FC<MyComponentProps> = ({ propA, propB }) => {
    return (
      // ...
    )
  }
  ```
- Import named exports from react directly, i.e. `import { useEffect } from "react"` instead of `React.useEffect`
- If a function could be defined _outside_ of the component, move it outside of the component
  ```tsx
  // This function does not need to be defined inside of `MyComponent`
  const formatTimestamp = (value: string) => {
    return format(parseISO(value), "YYYY-MM-DD");
  };
  ```

### Custom Hooks

- Encapsulate logic into custom hooks where reasonable
  ```tsx
  const { values, handleSubmit, handleReset } = useMyComponentFormState();
  ```
- When creating custom hooks, try to create a custom hook _per distinct functionality_
  Example: in the `Dashboard.tsx` component, we might use multiple hooks for different pieces of functionality, like `useChartAData()`, `useChartBData()`, `useDashboardControls()`

### Styling

- Prefer components from `src/components/ui`
- Prefer `styled` components over the `css` helper

  ```tsx
  // Good
  <styled.div p={2} />

  // Less good
  <div className={css({ p: 2 })} />
  ```

- When styling gets complex, break things out using `css`, `cva`, and `cx`
- When styling, avoid PandaCSS's "patterns" e.g. `hstack`. Instead, use style props and/or `css` to accomplish the same style
