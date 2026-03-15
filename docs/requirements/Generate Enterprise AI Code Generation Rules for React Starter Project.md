Act as a **Principal Software Architect and AI Code Governance Specialist**.

Your task is to **analyze the entire existing React starter project codebase** and generate **comprehensive AI Code Generation Rules** that an AI Code Assistant must strictly follow when generating, modifying, or reviewing code.

These rules will be used as **persistent workspace-level AI rules** so that **every AI interaction automatically follows the same architecture, conventions, and engineering standards**.

The generated rules must ensure that **all AI-generated code integrates seamlessly with the existing codebase** and preserves its architectural integrity.

Reference the customization documentation for rule formatting:

[https://kilo.ai/docs/customize/custom-rules](https://kilo.ai/docs/customize/custom-rules)

---

# 🎯 Objective

Create a **complete AI rule system** that guarantees:

- Consistent naming conventions
- Strict architectural compliance
- Modular code structure
- Reliable state management implementation
- Safe API communication patterns
- Comprehensive test coverage
- Production-grade error handling
- Documentation consistency
- Predictable file organization

The rules must ensure that **AI-generated code always follows the patterns already established in the codebase**.

---

# 🔍 Step 1 — Codebase Analysis (Mandatory)

Before generating rules, perform a **deep structural analysis** of the repository:

Analyze and extract patterns for:

### Architecture

- folder structure
- feature modularization
- shared component usage
- separation of concerns

### Code Conventions

- naming conventions
- file naming
- component structure
- hook usage patterns

### State Management

- store structure
- action patterns
- selector usage
- persistence strategy

### API Layer

- API client setup
- request abstraction
- authentication handling
- error normalization

### Testing Strategy

- test file placement
- naming conventions
- testing frameworks
- mocking patterns

### Styling Strategy

- design system usage
- utility patterns
- global styles

### Import Conventions

- path alias usage
- import ordering
- dependency boundaries

---

# 📂 Step 2 — Generate Multi-File Custom AI Rules

Split the generated rules into **multiple rule files** for maintainability.

Follow the **Kilo AI custom rules format**.

Create the following files:

```
.ai-rules/
│
├── architecture-rules.md
├── naming-conventions.md
├── component-architecture.md
├── state-management-rules.md
├── api-calling-rules.md
├── error-handling-rules.md
├── testing-rules.md
├── documentation-rules.md
├── import-structure-rules.md
├── folder-structure-rules.md
├── ai-enforcement-rules.md
├── performance-rules.md
```

Each rule file must be **complete and production-ready**.

---

# 🏗 Rules to Include

## 1️⃣ Naming Conventions (MANDATORY)

Define strict naming conventions for:

Variables
Functions
React Components
Hooks
Files
Directories
Constants
Types / Interfaces
Environment variables

Example rules:

```
React components → PascalCase
Hooks → useCamelCase
Variables → camelCase
Constants → UPPER_SNAKE_CASE
Files → kebab-case
Folders → kebab-case
Types → PascalCase
Interfaces → PascalCase
```

Ensure rules prevent:

- inconsistent casing
- ambiguous naming
- abbreviations

---

# 🧩 Component Architecture Rules

Define how components must be built:

- atomic design hierarchy
- container vs presentational separation
- feature isolation
- reusability standards

Include rules for:

Component responsibilities
Props typing
Component file layout
Composition patterns

---

# 🧠 State Management Rules

Define comprehensive state management practices.

Include rules for:

### State Initialization

- default state structure
- immutability rules
- typing requirements

### State Updates

- predictable state transitions
- reducer/action patterns
- atomic updates

### Side Effects

- async handling
- effect isolation
- cancellation rules

### Persistence

- localStorage/sessionStorage patterns
- hydration logic
- version migration strategy

### Store Organization

- feature-based stores
- selector usage
- derived state rules

---

# 🌐 API Calling Rules

Define strict API communication standards.

Include rules for:

### Request Formatting

- base API client usage
- typed request payloads
- URL construction rules

### Authentication

- token injection strategy
- refresh token handling
- secure header injection

### Response Handling

- response normalization
- data transformation rules

### Error Handling

- standardized error shape
- retry logic
- timeout configuration
- fallback UI patterns

### Network Reliability

Define rules for:

- exponential retry
- request cancellation
- offline handling

---

# ⚠ Error Handling Rules

Define how errors must be handled across the system.

Include:

- global error boundaries
- API error normalization
- logging rules
- user-facing error messages

---

# 🧪 Testing Rules

Define **AI automatic test coverage requirements**.

AI must automatically generate tests for:

- components
- hooks
- services
- utilities
- state stores

Testing requirements:

```
unit tests
integration tests
edge cases
error states
loading states
```

Include:

- test naming conventions
- mock strategies
- test file placement
- coverage expectations

---

# 🧾 Documentation Rules

Define rules for documentation.

Include:

- README standards
- component documentation
- public API docs
- architecture notes

Also enforce:

- JSDoc usage
- inline documentation rules

---

# 📦 Import Structure Rules

Define:

- import ordering
- path alias usage
- dependency boundaries

Example ordering:

```
1 external libraries
2 shared utilities
3 components
4 hooks
5 types
6 styles
```

---

# 📁 Folder Structure Rules

Define how files must be organized:

Feature-based architecture:

```
src/
  features/
  components/
  hooks/
  services/
  stores/
  utils/
  types/
```

Prevent:

- cross-feature coupling
- circular dependencies
- misplaced utilities

---

# 🤖 AI Architecture Enforcement Rules

Create rules that force the AI to:

- validate architecture before generating code
- refuse architecture violations
- enforce modular boundaries
- avoid duplicating logic
- reuse existing utilities

AI must always:

1. Analyze project structure
2. Reuse existing patterns
3. Follow established abstractions

---

# 🧪 AI Automatic Test Coverage Rules

AI must automatically:

- create tests for every new module
- test edge cases
- test failure paths
- test async behavior
- test state transitions

No feature should be created **without tests**.

---

# 📊 Performance Rules

Include rules for:

- avoiding unnecessary re-renders
- memoization strategies
- lazy loading
- bundle size control

---

# 🔒 Non-Negotiable Rules

AI must NEVER:

- introduce architectural drift
- ignore naming conventions
- bypass API abstraction layer
- create untested logic
- duplicate existing functionality

---

# 📘 Output Requirements

The output must contain:

1. Complete AI rule system
2. Multi-file rule organization
3. Proper Kilo AI rule formatting
4. Production-ready rule definitions
5. Clear enforcement statements

---

# ▶ Final Instruction

Generate a **complete enterprise-grade AI rule system** for this React starter project that ensures **all AI-generated code remains consistent with the existing architecture, patterns, and conventions**.

The rules must be **strict, scalable, and suitable for long-term enterprise development**.

---
