# AI Code Generation Rules

This directory contains **enterprise-grade AI code generation rules** for the Travluence Project. These rules ensure that all AI-generated code integrates seamlessly with the existing codebase architecture, conventions, and standards.

## Purpose

When an AI Code Assistant (Kilo AI) generates, modifies, or reviews code in this project, it must follow the rules defined in this directory. The rules act as persistent workspace-level guardrails.

## Rule Files

| File | Description |
|---|---|
| `architecture-rules.md` | Feature-based modular architecture requirements |
| `naming-conventions.md` | Strict naming conventions for all code entities |
| `component-architecture.md` | Component hierarchy, props typing, composition patterns |
| `state-management-rules.md` | Zustand store creation, selectors, persistence patterns |
| `api-calling-rules.md` | API client usage, SWR, service layer standards |
| `error-handling-rules.md` | Error types, normalization, boundaries, logging |
| `testing-rules.md` | Test coverage requirements, frameworks, patterns |
| `documentation-rules.md` | JSDoc, README, inline documentation standards |
| `import-structure-rules.md` | Import ordering, path aliases, dependency boundaries |
| `folder-structure-rules.md` | File organization and feature module structure |
| `ai-enforcement-rules.md` | Meta-rules: pre-generation validation, violation refusal |
| `performance-rules.md` | Code splitting, memoization, bundle optimization |

## How to Modify

1. Edit the relevant `.md` file in this directory
2. Follow Markdown formatting (headers, lists, code blocks)
3. Ground every rule in actual codebase patterns
4. Submit via PR for team review

## Reference

- [Kilo AI Custom Rules Documentation](https://kilo.ai/docs/customize/custom-rules)
