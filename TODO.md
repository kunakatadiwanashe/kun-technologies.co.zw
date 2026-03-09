# TODO - Fix Invalid Hook Call Error

## Status: ✅ COMPLETED

### Issue
Error: "Invalid hook call. Hooks can only be called inside of the body of a function component."

### Root Cause
The file `src/hooks/use-auth.ts` contained an invalid line that called a React hook at the module level (outside any function component):
```typescript
export const { signUp } = useAuthContext() || {};
```

This violated React's Rules of Hooks - hooks can only be called inside React function components or custom hooks.

### Fix Applied
Removed the invalid line from `src/hooks/use-auth.ts`. The `useAuth()` custom hook already returns `signUp` (and other auth methods) from the context, so the redundant export was unnecessary and harmful.

### Files Modified
- `src/hooks/use-auth.ts` - Removed invalid module-level hook call

### Verification
- Restart the development server to ensure the fix takes effect
- The error should no longer appear

