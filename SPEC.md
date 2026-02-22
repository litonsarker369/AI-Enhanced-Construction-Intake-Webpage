# AI-Enhanced Construction Company Webpage

## 1. Project Overview

**Project Name:** BuildVision AI - Custom Construction Management Platform  
**Type:** Single-page web application with multi-section functionality  
**Core Functionality:** AI-powered construction company platform for client intake, project management, building renderings, and cost estimation  
**Target Users:** Homeowners seeking custom construction, renovation clients, project managers

---

## 2. UI/UX Specification

### Layout Structure

**Navigation**
- Fixed top navbar with logo, nav links, and CTA button
- Nav links: Home, Services, Projects, AI Studio, Contact
- Mobile hamburger menu for responsive design

**Sections:**
1. **Hero Section** - Full viewport with headline, subheadline, and dual CTAs
2. **Services Section** - Grid of service cards (4 columns desktop, 2 tablet, 1 mobile)
3. **AI Studio Section** - Interactive AI features with tabs for different tools
4. **Project Intake Form** - Multi-step form wizard
5. **Projects Dashboard** - Card grid showing sample projects
6. **Testimonials** - Carousel of client reviews
7. **Contact Section** - Contact form and company info
8. **Footer** - Links, social icons, copyright

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: `#1a1a2e` (Deep Navy)
- Secondary: `#16213e` (Dark Blue)
- Accent: `#e94560` (Coral Red)
- Accent Secondary: `#0f3460` (Royal Blue)
- Light: `#f8f9fa` (Off White)
- Text Primary: `#1a1a2e`
- Text Light: `#ffffff`
- Success: `#00d9a5`
- Warning: `#ffc107`

**Typography:**
- Headings: "Clash Display", sans-serif (Google Fonts alternative: "Outfit")
- Body: "Satoshi", sans-serif (Google Fonts alternative: "DM Sans")
- Hero H1: 4rem (desktop), 2.5rem (mobile)
- Section H2: 2.5rem
- Body: 1rem
- Small: 0.875rem

**Spacing System:**
- Section padding: 100px vertical (desktop), 60px (mobile)
- Container max-width: 1200px
- Grid gap: 30px
- Card padding: 30px

**Visual Effects:**
- Glassmorphism cards with backdrop-blur
- Gradient overlays on hero
- Smooth hover transitions (0.3s ease)
- Floating animation on hero elements
- Staggered reveal animations on scroll
- Subtle box shadows: `0 20px 60px rgba(0,0,0,0.1)`

### Components

**Navigation Bar**
- Transparent on hero, solid on scroll
- Logo with icon
- Nav links with underline hover effect
- CTA button with accent color

**Hero Section**
- Background: Abstract geometric pattern with gradient overlay
- Animated particles or geometric shapes
- Main headline with gradient text
- Subheadline paragraph
- Two CTA buttons (primary filled, secondary outline)

**Service Cards**
- Icon with accent background circle
- Title, description
- Hover: lift effect with shadow

**AI Studio Panel**
- Tab navigation for different AI tools
- Interactive input areas
- Simulated AI responses with loading animation
- Result display areas

**Multi-Step Form Wizard**
- Progress indicator
- Step navigation (next/back)
- Form validation
- File upload with drag-and-drop
- Photo preview thumbnails

**Project Cards**
- Image thumbnail
- Project title, status badge
- Progress bar
- Quick action buttons

**Testimonial Carousel**
- Client photo, quote, name
- Navigation dots
- Auto-advance

---

## 3. Functionality Specification

### Core Features

**1. Intake Form (Multi-Step Wizard)**
- Step 1: Personal Information
  - Full name (required)
  - Email (required, validated)
  - Phone (required)
  - Preferred contact method (radio)
- Step 2: Project Details
  - Project type (dropdown: New Construction, Renovation, Addition, Commercial)
  - Property address
  - Estimated timeline (dropdown)
  - Budget range (dropdown)
- Step 3: Specifications
  - Square footage (number input)
  - Number of bedrooms/bathrooms
  - Style preferences (checkboxes)
  - Must-have features (textarea)
- Step 4: Site Photos
  - Drag-and-drop upload zone
  - Multiple file support
  - Image preview thumbnails
  - Remove uploaded images
- Step 5: Review & Submit
  - Summary of all inputs
  - Edit buttons per section
  - Submit button

**2. AI Studio Features**
- **Building Renderer**: Text-to-image simulation with style presets
  - Input: Description, style selection
  - Output: Simulated rendering display
- **Cost Estimator**: AI-powered cost calculation
  - Input: Square footage, project type, features
  - Output: Estimated cost breakdown
- **AI Chat Portal**: Communication interface
  - Chat interface with message history
  - Typing indicator simulation
  - Quick question suggestions

**3. Projects Dashboard**
- Display sample projects as cards
- Filter by status (Planning, In Progress, Completed)
- Project details modal
- Status badges with colors

**4. Contact Form**
- Name, email, message fields
- Form validation
- Submit simulation with success message

### User Interactions

- Smooth scroll navigation
- Form step transitions with animation
- Tab switching in AI Studio
- Chat message sending and receiving
- Image upload drag-and-drop
- Modal open/close for project details
- Carousel navigation

### Data Handling

- Form data stored in JavaScript objects
- LocalStorage for persistence simulation
- No actual backend required (frontend simulation)

### Edge Cases

- Form validation errors displayed inline
- Empty file upload prevented
- Large image files handled with size warning
- Network error simulation for AI features

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Hero section displays with animated background
- [ ] Navigation is fixed and changes on scroll
- [ ] All 4 service cards render correctly
- [ ] AI Studio tabs switch content smoothly
- [ ] Multi-step form progresses with animation
- [ ] File upload shows preview thumbnails
- [ ] Projects display as cards with status badges
- [ ] Testimonial carousel auto-advances
- [ ] Contact form validates inputs
- [ ] Footer displays with proper layout
- [ ] Responsive design works on all breakpoints

### Functional Checkpoints
- [ ] All navigation links scroll to sections
- [ ] Form wizard navigates between steps
- [ ] Form validation prevents invalid submission
- [ ] AI features display simulated responses
- [ ] Chat sends and displays messages
- [ ] Project filter works correctly
- [ ] Contact form shows success message on submit

---

## 5. Technical Implementation

**Single HTML file with embedded CSS and JavaScript**

**External Resources:**
- Google Fonts: Outfit, DM Sans
- Lucide Icons (CDN)
- No framework dependencies (vanilla JS)

**Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
