# Code Fixes TODO

## Issues Found and Fixes Applied

### 1. Images using `src` instead of Next.js `Image` component
- **Files affected**: page.tsx, blog/page.tsx, blog/[slug]/page.tsx, portfolio/page.tsx
- **Status**: Not fixed (low priority - requires more work for external images)

### 2. Navbar theme toggle doesn't work properly
- **File**: src/components/Navbar.tsx
- **Fix**: Use next-themes useTheme hook instead of direct DOM manipulation
- **Status**: ✅ FIXED

### 3. Missing typography plugin configuration
- **File**: tailwind.config.ts
- **Fix**: Add @tailwindcss/typography to plugins array
- **Status**: ✅ FIXED

### 4. Blog post page has unnecessary `typeof window` checks
- **File**: src/app/blog/[slug]/page.tsx
- **Fix**: Use useParams hook with proper hydration handling
- **Status**: ✅ FIXED

### 5. Contact page uses raw HTML select
- **File**: src/app/contact/page.tsx
- **Status**: Not fixed (low priority - works but not consistent with UI)

### 6. Potential hydration issues in Navbar
- **File**: src/components/Navbar.tsx
- **Fix**: Properly handle theme state with useTheme hook
- **Status**: ✅ FIXED

### 7. PostCSS config using ESM syntax
- **File**: postcss.config.js
- **Fix**: Changed from ESM export to CommonJS module.exports
- **Status**: ✅ FIXED

### 8. Leftover Vite/React Router component
- **File**: src/components/NavLink.tsx
- **Fix**: Deleted unused file (was using react-router-dom which isn't installed)
- **Status**: ✅ FIXED

## Build Status
✅ Build successful - All pages compiling without errors

