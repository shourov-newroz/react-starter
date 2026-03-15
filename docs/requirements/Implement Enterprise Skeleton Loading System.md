# Implement Enterprise Skeleton Loading System

Act as a **Staff Frontend Architect responsible for UI consistency, performance optimization, and architecture governance**.

Your task is to design and implement a **global skeleton loading system** across the entire React project.

The skeleton system must ensure:

- **zero layout shift (CLS)**
- **perfect structural parity between skeleton and real UI**
- **no scrolling during skeleton loading**
- **size-based skeleton variants for all atomic components**

This implementation must become a **permanent architecture standard** enforced via:

- AI rule files
- architecture rules
- component rules
- project documentation

All work must follow:

- `@/docs/ARCHITECTURE.md`
- `@/docs/CONTRIBUTING.md`
- `.kilocode/rules/*`
- the existing modular architecture

---

# 🎯 Core Objectives

The system must guarantee:

1. Every screen shows skeleton loading during async operations
2. Skeleton layout exactly matches the real UI layout
3. No layout shift occurs when content loads
4. Skeleton variants exist for **all atomic components**
5. Skeleton variants follow **size variants only (not color variants)**
6. Skeleton layouts and page skeletons **must not be scrollable**

---

# 🧩 Existing Skeleton Primitive

Use the existing skeleton primitive:

```
@/src/components/ui/skeleton.tsx
```

All skeleton components must **compose this primitive**.

Do NOT introduce new skeleton libraries.

---

# 🧱 Step 1 — Skeleton Variants for UI Components

All components inside:

```
@/src/components/ui
```

must include skeleton variants.

Examples:

```
Button → ButtonSkeleton
Input → InputSkeleton
Card → CardSkeleton
Avatar → AvatarSkeleton
Badge → BadgeSkeleton
Table → TableRowSkeleton
```

Skeletons must match the **structural layout** of the component.

---

# ⚠ Skeleton Variants Must Follow SIZE Variants Only

Skeleton variants must correspond to **size variants**, not color variants.

Example component:

```
Button sizes:
sm
md
lg
xl
```

Skeleton implementation:

```
<ButtonSkeleton size="sm" />
<ButtonSkeleton size="md" />
<ButtonSkeleton size="lg" />
<ButtonSkeleton size="xl" />
```

Color variants such as:

```
primary
secondary
outline
ghost
```

must **not create separate skeleton variants**, because they share identical structure.

AI must enforce this rule.

---

# ⚠ Mandatory Rule for Atomic Components

When a **new atomic component is created**, the following must happen:

1. Skeleton variant must be implemented in the **same commit**
2. Skeleton must support **all size variants**
3. Skeleton must preserve layout structure
4. Skeleton must use the base `Skeleton` primitive

AI must **refuse generating atomic components without skeleton support**.

---

# 🎨 Typography Skeleton Support

Typography components must follow:

[https://ui.shadcn.com/docs/components/radix/typography](https://ui.shadcn.com/docs/components/radix/typography)

Create skeleton variants for:

```
Heading
Paragraph
Text
Label
```

Examples:

```
HeadingSkeleton
ParagraphSkeleton
TextSkeleton
LabelSkeleton
```

Typography skeleton must preserve:

- line height
- spacing
- content width
- layout flow

---

# 🚫 Strict Zero Layout Shift Policy

Skeleton layouts must match real UI layouts exactly.

Preserve:

- height
- width
- padding
- margins
- grid structure
- responsive breakpoints

Skeleton → real UI transitions must produce **no visual movement**.

---

# 🚫 Skeleton Layouts Must NOT Be Scrollable

All skeleton layouts must **fit within the viewport height**.

Rules:

- Skeleton pages must use `min-h-screen`
- Skeleton containers must **avoid overflow scrolling**
- Skeleton layouts must mimic real layout height constraints
- Skeleton should represent **visible viewport content only**

Example rule:

```
Skeleton pages must NOT introduce vertical scrolling
Skeleton layouts must mirror the real layout viewport structure
```

---

# 🧠 Step 2 — Layout-Level Skeletons

Each layout must include skeleton versions.

Examples:

```
MainLayoutSkeleton
DashboardLayoutSkeleton
AuthLayoutSkeleton
```

Layout skeletons must replicate:

- header
- sidebar
- navigation
- grid layout

Layouts must remain **non-scrollable during skeleton loading**.

---

# ⚡ Step 3 — Route-Level Skeleton Fallback

Routes must support skeleton fallback.

Route type:

```
@/src/types/route.types.ts
```

```
type BaseRoute = {
  element?: React.ComponentType | React.LazyExoticComponent<React.ComponentType<unknown>>;
  name?: string;
  children?: RouteConfig[];
  auth: AuthRequirement;
  fallback: React.ComponentType;
};
```

Routes defined in:

```
@/src/app
```

Example:

```
{
  element: DashboardPage,
  fallback: DashboardPageSkeleton,
  auth: "protected"
}
```

---

# 🧩 Step 4 — Page-Level Skeletons

Every page must have a skeleton equivalent.

Examples:

```
DashboardPage → DashboardPageSkeleton
UserListPage → UserListPageSkeleton
TransactionPage → TransactionPageSkeleton
```

Page skeletons must mirror:

- layout grid
- cards
- lists
- charts
- sections

Page skeleton must **not allow scroll**.

---

# ⚡ Step 5 — Suspense Skeleton Handling

Async components must use skeleton fallbacks.

Example:

```
<Suspense fallback={<ComponentSkeleton />}>
```

Skeletons must render immediately.

---

# 🧪 Step 6 — Testing Skeleton Behavior

Tests must verify:

- skeleton appears during loading
- skeleton disappears after content loads
- layout size remains identical
- skeleton pages are not scrollable

Test scenarios:

```
slow API
lazy route loading
component suspense fallback
```

---

# 📜 Step 7 — Create New AI Rule

Create rule file:

```
.kilocode/rules/skeleton-loading-rules.md
```

Rules must enforce:

- skeleton required for async UI
- skeleton required for pages
- skeleton required for layouts
- skeleton required for atomic components
- skeleton must support size variants
- skeleton layouts must not scroll

---

# 🔄 Step 8 — Update Existing AI Rules

Update these files:

```
.kilocode/rules/ai-enforcement-rules.md
.kilocode/rules/architecture-rules.md
.kilocode/rules/component-architecture.md
.kilocode/rules/folder-structure-rules.md
.kilocode/rules/performance-rules.md
```

Also review **all other relevant rules**.

Add enforcement rules such as:

```
All async UI must provide skeleton loading
All pages must include page skeletons
All routes must define skeleton fallback
All atomic components must include skeleton variants
Skeleton variants must follow size variants only
Skeleton layouts must not be scrollable
```

---

# 📘 Step 9 — Update Project Documentation

Update:

```
@/docs/ARCHITECTURE.md
@/docs/CONTRIBUTING.md
```

Add documentation explaining:

### Skeleton Architecture

- global skeleton design system
- atomic skeleton components
- layout and page skeleton patterns

### Developer Rules

- skeleton required for async UI
- skeleton required for atomic components
- skeleton variants must match size variants
- skeleton layouts must not scroll

---

# 🚫 Anti-Patterns (Strictly Forbidden)

Do NOT allow:

- spinners replacing skeletons
- skeleton layouts different from UI layout
- skeleton pages with scrolling
- atomic components without skeleton variants
- skeleton variants for color themes

---

# 📦 Final Deliverables

Provide:

1. Skeleton variants for all UI components
2. Typography skeleton components
3. Layout skeletons
4. Page skeletons
5. Route fallback integration
6. `skeleton-loading-rules.md` rule file
7. Updated AI rule files
8. Updated architecture documentation
9. Updated contributor documentation
10. Tests verifying skeleton behavior

---

# 🎯 Final Outcome

The result must be a **fully standardized enterprise skeleton loading system** where:

- every screen shows skeleton loading
- skeletons match real layouts exactly
- skeleton pages do not scroll
- atomic components always include skeleton variants
- AI rules automatically enforce skeleton implementation
