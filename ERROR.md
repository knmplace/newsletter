# Newsletter Application - Error Tracking & Remedies

**Purpose:** Track all errors encountered during development and their solutions to avoid redundant troubleshooting.

**Last Updated:** 2026-01-29

---

## Table of Contents

1. [Database Errors](#database-errors)
2. [Authentication Errors](#authentication-errors)
3. [n8n Workflow Errors](#n8n-workflow-errors)
4. [Email/SMTP Errors](#emailsmtp-errors)
5. [Build/Deployment Errors](#builddeployment-errors)
6. [API Errors](#api-errors)

---

## Database Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| *No errors logged yet* | - | - | - |

---

## Authentication Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| *No errors logged yet* | - | - | - |

---

## n8n Workflow Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| `Missing required field "conditions.options.version"` | n8n If node v2.2 requires `version: 2` in conditions.options | Add `"version": 2` to conditions.options object | 2026-01-29 |
| `Unary operator requires "singleValue: true"` | Boolean operators like `notExists` don't use rightValue | Add `"singleValue": true` and remove rightValue for unary operators | 2026-01-29 |
| Webhook missing header auth credential | Created webhook with headerAuth but didn't assign credential | Create "Header Auth" credential in n8n UI, then assign to webhook node | 2026-01-29 |

---

## Email/SMTP Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| *No errors logged yet* | - | - | - |

---

## Build/Deployment Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| MCP tools not available | Claude Code started from parent directory `/home/apps/` instead of project root | Start Claude Code from `/home/apps/newsletter/` - MCP discovers `.mcp.json` at project root only | 2026-01-29 |

---

## API Errors

| Error | Cause | Remedy | Date |
|-------|-------|--------|------|
| *No errors logged yet* | - | - | - |

---

## Error Template

When adding new errors, use this format:

```markdown
| `Error message or code` | Brief description of what caused it | Step-by-step fix | YYYY-MM-DD |
```

### Detailed Error Entry Template

For complex errors, add a detailed section:

```markdown
### ERROR-001: Descriptive Title

**Date:** YYYY-MM-DD
**Category:** Database/Auth/n8n/Email/Build/API

**Error Message:**
```
Full error message here
```

**Context:**
What were you doing when this error occurred?

**Root Cause:**
Why did this error happen?

**Solution:**
1. Step one
2. Step two
3. Step three

**Prevention:**
How to avoid this error in the future.

**Related Files:**
- `/path/to/file1.ts`
- `/path/to/file2.ts`
```

---

## Detailed Error Entries

*Detailed entries will be added below as complex errors are encountered.*

---

**END OF ERROR TRACKING FILE**
