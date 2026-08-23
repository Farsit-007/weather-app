# SkyWise — Build a Real React App From Scratch

**Course format:** 3 modules · 10 videos per module · 30 videos total
**Estimated runtime:** ~7 hours of video (avg. 13–15 min per video)
**Final project:** SkyWise — a weather app that finds any city (or your GPS position), shows the live conditions, and gives one smart suggestion for the day.

---

## Course Overview

Everything in this course is written from an empty folder. No starter template, no copy-paste boilerplate, no UI library. By the end the student has built:

- a full Vite + React 19 project configured by hand
- a custom Tailwind design system (colors, fonts, shadows, gradients, component classes)
- a modal and a **form built completely from scratch** — controlled inputs, submit handling, validation, error and loading states
- **multi-page routing with React Router DOM v7** — `createBrowserRouter`, `Link`, `useNavigate`, `useLocation`, and passing data between routes
- a **service layer** that talks to a real public API with `fetch` and `async/await`
- the browser **Geolocation API**
- real app logic: WMO weather-code decoding and a rule-based recommendation engine
- a production build deployed live

### Prerequisites

- HTML, CSS, and JavaScript fundamentals (variables, functions, arrays, objects, arrow functions)
- Basic ES6+: destructuring, spread, template literals, promises
- **No React experience required.** No Tailwind experience required.

### Tech Stack

| Tool | Role in the course |
| --- | --- |
| React 19 | Components, props, `useState`, `useEffect` |
| Vite 8 | Dev server, HMR, production build |
| React Router DOM 7 | Two pages + navigation state |
| Tailwind CSS 3 | The entire design system |
| lucide-react | Weather and UI icons |
| Open-Meteo API | Free weather data — no API key, no signup |

### Module Map

| Module | Title | Focus | Videos |
| --- | --- | --- | --- |
| 1 | React & Tailwind Foundations — Building the Interface | Setup, components, props, design system | 10 |
| 2 | Interactivity: Forms From Scratch & React Router DOM | State, modals, forms, validation, routing | 10 |
| 3 | Real Data: APIs, App Logic & Deployment | fetch, async/await, `useEffect`, logic, deploy | 10 |

---

# Module 1 — React & Tailwind Foundations: Building the Interface

> **Goal of the module:** go from an empty folder to a complete, responsive, pixel-polished landing page — understanding every line and every config file along the way.
> **Module runtime:** ~2 hours 10 min

### 1.1 — Course Introduction: What We're Building and Why
*≈ 10 min*
- Live demo of the finished SkyWise app: search a city, use GPS, read the suggestion
- Tour of the final file structure and why it is organised that way (`pages`, `components`, `services`, `utils`)
- What "from scratch" means in this course — no templates, no shortcuts
- How to follow along, prerequisites, and where the source code lives

### 1.2 — Environment Setup: Node, VS Code, and Creating the Project with Vite
*≈ 14 min*
- Installing Node.js 18+ and verifying with `node -v` / `npm -v`
- VS Code extensions worth having (ESLint, Tailwind IntelliSense, Prettier)
- `npm create vite@latest` — choosing React + JavaScript
- `npm install`, `npm run dev`, and what each `package.json` script actually does
- Cleaning out the default Vite boilerplate to get a truly blank canvas
- **Files:** `package.json`, `vite.config.js`, `index.html`

### 1.3 — How React Renders: `main.jsx`, `App.jsx`, and the Rules of JSX
*≈ 15 min*
- The path from `index.html` → `#root` → `createRoot().render()`
- What `StrictMode` is and why it double-renders in development
- JSX rules: one root element, `className`, `{}` expressions, self-closing tags
- Writing your first component and exporting it
- **Files:** `src/main.jsx`, `src/App.jsx`

### 1.4 — Installing and Wiring Up Tailwind CSS
*≈ 13 min*
- Installing `tailwindcss`, `postcss`, `autoprefixer` and initialising the config
- The `content` array: how Tailwind finds your class names, and why a wrong path breaks everything
- `@tailwind base / components / utilities` and what each layer produces
- Utility-first vs. writing CSS files — the mental shift
- **Files:** `tailwind.config.js`, `postcss.config.js`, `src/index.css`

### 1.5 — Building a Design System: Custom Colors, Fonts, Shadows and Gradients
*≈ 17 min*
- Extending the theme instead of overriding it (`theme.extend`)
- Adding the brand palette: `navy`, `sky`, `orange`, `slate`, `line`, `danger`
- `DEFAULT` keys — how `sky` and `sky-deep` can both exist
- Importing Google Fonts (Sora + Inter) and registering them as `font-display` / `font-sans`
- Custom `boxShadow`, `backgroundImage` gradients and `letterSpacing` tokens
- **Files:** `tailwind.config.js`, `src/index.css`

### 1.6 — Reusable Component Classes with `@layer` and `@apply`
*≈ 14 min*
- When repeating utilities becomes a problem — and when it doesn't
- Building `.btn-primary`, `.btn-secondary` and `.panel` inside `@layer components`
- Styling `:hover` and `:disabled` states in the same place
- Adding a custom utility: `.text-gradient-hero` with `background-clip: text`
- Global `body` styling: the layered radial-gradient background
- **Files:** `src/index.css`

### 1.7 — Your First Real Component: The Hero Section
*≈ 15 min*
- Creating `src/pages/Home.jsx` and rendering it from `App.jsx`
- Fluid typography with `clamp()` inside Tailwind's arbitrary values: `text-[clamp(...)]`
- The badge, headline, gradient word, subheading and description
- Arbitrary values explained: when to use `text-[15px]` vs. a theme token
- **Files:** `src/pages/Home.jsx`

### 1.8 — Props and Reusability: The Feature Card Component
*≈ 14 min*
- What props are and how data flows down (one direction only)
- Building a `Feature` component that takes `icon`, `title`, `text`
- **Passing a component as a prop** — the `{ icon: Icon }` renaming trick
- Rendering three cards from one component, and why that beats copy-paste
- Flexbox layout with Tailwind: `flex`, `gap`, `items-center`, `flex-wrap`
- **Files:** `src/pages/Home.jsx`

### 1.9 — Working with Icons: lucide-react and the `WeatherIcon` Component
*≈ 13 min*
- Installing `lucide-react` and importing individual icons
- Why a lookup object beats a chain of `if` statements
- Building `WeatherIcon` with an `ICONS` map and a safe fallback
- Default props, conditional `strokeWidth`, and merging an incoming `className`
- Placing the decorative background icons with `fixed`, `-z-10` and `aria-hidden`
- **Files:** `src/components/WeatherIcon.jsx`, `src/pages/Home.jsx`

### 1.10 — Responsive Design: Making It Work on Every Screen
*≈ 15 min*
- Mobile-first thinking, and how Tailwind breakpoints actually work
- `max-sm:`, `min-[481px]:` and arbitrary breakpoints like `max-[640px]:hidden`
- Stacking the feature cards on narrow phones
- Testing with the Chrome DevTools device toolbar
- **Module 1 wrap-up:** a finished, responsive landing page — and the one thing it still can't do (the button does nothing yet)
- **Files:** `src/pages/Home.jsx`

---

# Module 2 — Interactivity: Forms From Scratch & React Router DOM

> **Goal of the module:** make the app *do* something. State, a modal built by hand, a fully validated form with zero libraries, and real multi-page navigation that carries data between routes.
> **Module runtime:** ~2 hours 25 min

### 2.1 — State in React: `useState` Explained Properly
*≈ 15 min*
- Why a normal variable can't update the UI — the re-render model
- The `const [value, setValue] = useState(initial)` pattern, destructured
- State is a snapshot: what happens between renders
- Adding `modalOpen` to `Home` and toggling it from the button's `onClick`
- Common beginner mistakes: mutating state, calling the setter during render
- **Files:** `src/pages/Home.jsx`

### 2.2 — Conditional Rendering: Showing and Hiding the Modal
*≈ 12 min*
- `&&`, ternaries, and early returns — which to use when
- `{modalOpen && <LocationModal />}` — mounting vs. hiding with CSS, and why mounting is better here
- Passing a function down as the `onClose` prop (child → parent communication)
- **Files:** `src/pages/Home.jsx`, `src/components/LocationModal.jsx`

### 2.3 — Building a Modal From Scratch: Overlay, Dialog and Close Button
*≈ 16 min*
- The full-screen overlay: `fixed inset-0`, a translucent background, and `z-50`
- Centering the dialog box with flexbox
- The rounded white card, the gradient icon badge, heading and description
- The absolutely-positioned close button
- Accessibility basics: `role="dialog"`, `aria-modal`, `aria-label` on icon-only buttons
- **Files:** `src/components/LocationModal.jsx`

### 2.4 — Event Bubbling and `stopPropagation`: Closing the Modal Correctly
*≈ 11 min*
- How a click event travels up the DOM tree
- Why clicking inside the white box was closing the modal
- Fixing it with `onClick={(event) => event.stopPropagation()}`
- A quick look at React's synthetic event system
- **Files:** `src/components/LocationModal.jsx`

### 2.5 — Forms in React: Controlled Inputs From Scratch
*≈ 16 min*
- Uncontrolled vs. controlled inputs — the core difference
- The `value` + `onChange` loop, and `event.target.value`
- Wiring the city input to a `city` state variable
- Pairing `<label htmlFor>` with an input `id` for accessibility
- Styling focus states: `outline-none`, `focus:border-sky`, `focus:shadow-focus-sky`
- **Files:** `src/components/LocationModal.jsx`

### 2.6 — Handling Form Submission: `onSubmit` and `preventDefault`
*≈ 13 min*
- Why the page reloads by default, and what `event.preventDefault()` stops
- `onSubmit` on the `<form>` vs. `onClick` on the button — why the form wins (Enter key support)
- Writing an `async` submit handler
- Trimming and normalising the user's input before doing anything with it
- **Files:** `src/components/LocationModal.jsx`

### 2.7 — Form Validation and Error Messages Without a Library
*≈ 15 min*
- Designing an error state: one `error` string where `""` means "no error"
- Empty-input validation, and clearing stale errors before each attempt
- Building the red error panel and rendering it conditionally
- Why we're not reaching for Formik / React Hook Form yet — understand the problem first
- **Files:** `src/components/LocationModal.jsx`

### 2.8 — Loading States and Disabled Buttons
*≈ 12 min*
- Adding a `loading` boolean, and the three states every async UI has
- Disabling the input and both buttons while a request is in flight
- Swapping button text to "Getting your weather…"
- The `.btn-primary:disabled` styling from Module 1 finally paying off
- Preventing double submissions
- **Files:** `src/components/LocationModal.jsx`, `src/index.css`

### 2.9 — React Router DOM: Installing It and Defining Your Routes
*≈ 16 min*
- Why a single-page app needs a router at all
- Installing `react-router-dom` v7
- `createBrowserRouter` + `RouterProvider` — the modern data-router setup
- Defining `/` → `Home` and `/weather` → `Weather`
- Creating the second page and confirming both URLs render
- `Link` vs. `<a href>`: why one reloads your whole app and the other doesn't
- **Files:** `src/App.jsx`, `src/pages/Weather.jsx`

### 2.10 — Navigating in Code and Passing Data Between Routes
*≈ 15 min*
- `useNavigate()` — navigating from inside an event handler instead of from a link click
- Sending data with the navigation: `navigate("/weather", { state: { location } })`
- Reading it back on the other side with `useLocation()`
- Optional chaining (`state?.location`) and handling the user who lands on `/weather` directly
- Router state vs. URL params vs. global state — when each is the right tool
- **Module 2 wrap-up:** the app now navigates and carries data — it just doesn't have any *real* data yet
- **Files:** `src/components/LocationModal.jsx`, `src/pages/Weather.jsx`

---

# Module 3 — Real Data: APIs, App Logic & Deployment

> **Goal of the module:** connect the app to the real world. A clean service layer, `fetch` with `async/await`, the Geolocation API, every loading and failure state handled, real business logic, and a live deployment.
> **Module runtime:** ~2 hours 30 min

### 3.1 — How Web APIs Work: Exploring Open-Meteo in the Browser
*≈ 14 min*
- What an API endpoint, a query string and a JSON response actually are
- Why Open-Meteo: free, no API key, no signup, plain JSON
- Hitting the geocoding and forecast URLs straight from the browser address bar
- Reading the response shape and deciding which fields the app needs
- Reading API documentation without getting lost
- **Files:** none — browser and docs only

### 3.2 — The Service Layer: `fetch`, `async/await` and Clean Error Handling
*≈ 16 min*
- Why all network code belongs in one file, away from your components
- Promises recap, then `async` / `await` in practice
- Checking `response.ok` and throwing a meaningful `Error`
- `response.json()` and the two separate failure modes (network vs. bad data)
- Creating and exporting from `src/services/weatherService.js`
- **Files:** `src/services/weatherService.js`

### 3.3 — Geocoding: Turning a City Name Into Coordinates
*≈ 14 min*
- Building the geocoding URL, and why `encodeURIComponent()` is not optional
- Query parameters: `name`, `count=1`, `language`, `format`
- Handling "no results" — Open-Meteo omits `results` entirely, so we return `null`
- Reshaping the raw response into a tidy `{ name, country, lat, lon }`
- Calling it from the form and navigating on success
- **Files:** `src/services/weatherService.js`, `src/components/LocationModal.jsx`

### 3.4 — The Browser Geolocation API: "Use My Location"
*≈ 15 min*
- Feature-detecting with `if (!navigator.geolocation)`
- `getCurrentPosition(success, error, options)` — a callback API, not a promise
- Reading `position.coords.latitude` / `longitude`
- Handling permission denial gracefully, plus the `timeout` option
- Why HTTPS (or localhost) is required for geolocation
- Skipping the geocoding step entirely when we already have coordinates
- **Files:** `src/components/LocationModal.jsx`

### 3.5 — Fetching the Forecast and Shaping the Response
*≈ 15 min*
- The forecast endpoint: `latitude`, `longitude`, `timezone=auto`
- Requesting exactly the `current=` fields we need and nothing more
- Rounding and formatting inside the service so components only print values
- Returning one flat, component-friendly object
- **Files:** `src/services/weatherService.js`

### 3.6 — Decoding WMO Weather Codes into Labels and Icons
*≈ 15 min*
- Why the API sends `weather_code: 61` instead of `"rain"`
- Building the `WMO_CODES` lookup table: `condition`, `description`, `label`, `icon`
- Grouping codes so several map to the same user-facing label
- A safe `UNKNOWN_WEATHER` fallback so an unexpected code never breaks the UI
- Day vs. night: swapping the sun for a moon using `is_day`
- **Files:** `src/services/weatherService.js`

### 3.7 — `useEffect`: Fetching Data When a Page Loads
*≈ 17 min*
- What a side effect is, and why fetching can't happen during render
- `useEffect(fn, deps)` — the dependency array explained without hand-waving
- Triggering the weather request on the Weather page
- The cleanup function and the `let cancelled = false` guard against setting state after unmount
- Why StrictMode fires effects twice in development, and why that's a good thing
- **Files:** `src/pages/Weather.jsx`

### 3.8 — Loading, Error and Empty States
*≈ 14 min*
- The three states every real screen must handle — plus "user arrived with no data"
- A pure-CSS spinner with Tailwind: `animate-spin`, `rounded-full`, `border-t-sky`
- Distinguishing `"no_location"` from `"api"` failures, and writing helpful copy for each
- Reusing the `.panel` class and giving every dead end a way back with `Link`
- **Files:** `src/pages/Weather.jsx`

### 3.9 — The `WeatherCard`: Displaying Data with Dynamic Styling
*≈ 16 min*
- Composing a card from the location name, icon, temperature and condition
- Driving gradients and icon colors from the data with a `CARD_STYLES` lookup
- Inline `style` for dynamic gradients — the one place Tailwind can't help, and why
- A local `Stat` sub-component reused for feels-like, humidity and wind
- Responsive layout: rows on phones, columns from 481px up, with border tricks (`first:border-l-0`)
- **Files:** `src/components/WeatherCard.jsx`, `src/pages/Weather.jsx`

### 3.10 — The Recommendation Engine, Final Polish, and Going Live
*≈ 18 min*
- Writing pure business logic in `src/utils/` — no React, no fetch, easy to reason about
- Ordering the rules so the most useful advice wins (snow → rain → fog → temperature → sky)
- Grouping wet conditions into one array and matching with `.includes()`
- Building `RecommendationCard` with a gradient chosen from the recommendation `type`
- Final pass: linting with `oxlint`, then `npm run build` and `npm run preview`
- Deploying to Netlify or Vercel — **and the SPA redirect rule React Router needs so `/weather` doesn't 404 on refresh**
- Where to go next: 5-day forecast, saved favourite cities, °C/°F switching, dark mode
- **Files:** `src/utils/weatherRecommendation.js`, `src/components/RecommendationCard.jsx`, `netlify.toml` / `vercel.json`

---

## Final Project Structure

```
Map/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                        # 1.3
    ├── App.jsx                         # 1.3, 2.9  — router setup
    ├── index.css                       # 1.4–1.6   — theme + component classes
    ├── pages/
    │   ├── Home.jsx                    # 1.7–1.10, 2.1–2.2
    │   └── Weather.jsx                 # 2.9–2.10, 3.7–3.8
    ├── components/
    │   ├── LocationModal.jsx           # 2.3–2.8, 3.3–3.4
    │   ├── WeatherIcon.jsx             # 1.9
    │   ├── WeatherCard.jsx             # 3.9
    │   └── RecommendationCard.jsx      # 3.10
    ├── services/
    │   └── weatherService.js           # 3.2–3.6
    └── utils/
        └── weatherRecommendation.js    # 3.10
```

## Skill Checklist by Module

| Skill | Module |
| --- | --- |
| Vite project setup, JSX, components, props | 1 |
| Tailwind config, `@layer`, `@apply`, responsive design | 1 |
| `useState`, conditional rendering, event handling | 2 |
| Controlled inputs, form submission, validation, loading/disabled states | 2 |
| React Router DOM: routes, `Link`, `useNavigate`, `useLocation`, route state | 2 |
| `fetch`, `async/await`, service-layer architecture, error handling | 3 |
| Browser Geolocation API | 3 |
| `useEffect`, dependency arrays, cleanup functions | 3 |
| Lookup tables, pure logic modules, defensive fallbacks | 3 |
| Production build, linting, SPA deployment | 3 |

## Production Notes for Recording

- **Code state per video:** tag a git commit at the end of every video (e.g. `v1.7-hero-section`) so students can jump in anywhere.
- **Pacing:** type the code live; never paste a finished file. Paste only long static data (the `WMO_CODES` table in 3.6) and read through it instead.
- **Deliberate bugs:** 2.4 (modal closing on an inner click) and 2.6 (page reloading on submit) land best if the bug is shown first, then diagnosed on camera.
- **Per-video assets:** starter/end code links, plus a saved JSON response for Module 3 so recording still works offline.
