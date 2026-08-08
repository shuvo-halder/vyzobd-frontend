# Development Protocol & Operating Standard

This protocol defines the strict standard operating procedure (SOP) that must be followed when integrating new backend API routes, implementing Customer Panel features, or refactoring code in this repository.

---

## 📋 Feature Implementation Workflow

Whenever a new backend API endpoint or customer feature request is introduced, follow this 13-step sequence:

```text
┌────────────────────────────────────────────────────────┐
│ STEP 1: Understand Requirement                        │
│ Read request details, scope boundaries, & user intent. │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 2: Inspect Existing Codebase                      │
│ Check existing services, hooks, components, & layouts. │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 3: Verify Backend API                             │
│ Confirm HTTP method, path, headers, payload, & auth.   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 4: Validate Payload Schema                        │
│ Determine request body/query & response structure.    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 5: Identify Reusable Code                         │
│ Reuse existing UI cards, tables, forms, or context.    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 6: Implement Service Function                     │
│ Add endpoint handler in src/services/<service>.js.     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 7: Build / Update UI Component                    │
│ Create clean React component adhering to Tailwind v4.  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 8: Implement Loading States                       │
│ Add skeleton loaders, spinners, or pending states.     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 9: Implement Error Handling                       │
│ Catch errors gracefully & display toast/banner alerts. │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 10: Implement Empty States                        │
│ Render friendly fallback visuals when data is empty.   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 11: Enforce Route & Auth Guards                  │
│ Validate user session & permissions before rendering.  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 12: Verify Build & Lint                           │
│ Run compile_applet and lint_applet to confirm code.    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ STEP 13: Update Documentation                          │
│ Register endpoint in docs/api/ and update route maps.  │
└────────────────────────────────────────────────────────┘
```

---

## 🔒 Incremental Backend API Integration Rules
1. **Never Invent Endpoints**: Only write service functions for API routes explicitly confirmed by the backend team or present in the source code.
2. **Preserve Working Interfaces**: Do not rename existing service functions or parameters unless necessary.
3. **Keep Axios Instance Centralized**: Always import `api` from `@/lib/axios`. Do not instantiate separate Axios instances.
4. **Decouple UI Navigation**: Navigation data models (e.g. `src/config/navigation.js`) act as single sources of truth consumed by UI components until dedicated backend navigation endpoints are integrated.
5. **Document Modifications**: Immediately update `/docs/api/api-inventory.md` whenever an endpoint status changes from `UNKNOWN` to `Existing`.
