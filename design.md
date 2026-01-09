# GPU Rental Business - Design Style Guide

## Design Philosophy

### Color Palette
- **Primary**: Deep Space Black (#0A0A0A) - Professional, tech-focused backdrop
- **Secondary**: Electric Blue (#00D4FF) - Modern, high-tech accent color
- **Accent**: Neon Cyan (#00FFFF) - Energy, innovation highlights
- **Neutral**: Steel Gray (#2A2A2A) - Supporting elements, cards
- **Text**: Pure White (#FFFFFF) - High contrast, accessibility compliant

### Typography
- **Display Font**: "Orbitron" - Futuristic, tech-inspired for headings
- **Body Font**: "Inter" - Clean, modern sans-serif for readability
- **Code Font**: "JetBrains Mono" - Technical specifications and data

### Visual Language
- **Aesthetic**: Cyberpunk meets enterprise - professional yet cutting-edge
- **Mood**: High-tech, trustworthy, innovative
- **Inspiration**: NVIDIA's design language, sci-fi interfaces, data centers

## Visual Effects & Animations

### Background Effects
1. **Animated Circuit Pattern**: Subtle moving circuit board patterns using CSS animations
2. **Particle System**: Floating particles representing data flow using p5.js
3. **Gradient Flow**: Animated gradients in hero section using CSS keyframes

### Interactive Elements
1. **GPU Card Hover**: 3D tilt effect with glowing borders
2. **Button Animations**: Neon glow on hover with smooth transitions
3. **Form Fields**: Animated underlines and focus states
4. **Comparison Table**: Highlight rows on hover with smooth color transitions

### Text Effects
1. **Hero Headline**: Typewriter animation with gradient text
2. **Section Headers**: Split-by-letter stagger animation on scroll
3. **Pricing Numbers**: Count-up animation when visible
4. **Specifications**: Highlight important metrics with color pulse

### Scroll Motion
1. **Reveal Animations**: Elements fade in from bottom with 20px translation
2. **Parallax**: Subtle background movement (max 5% translation)
3. **Progress Indicators**: Animated progress bars for multi-step forms
4. **Sticky Navigation**: Smooth transition with backdrop blur

### Data Visualization
1. **Performance Charts**: Animated bar charts using ECharts.js
2. **Pricing Comparison**: Interactive radar charts
3. **GPU Specs**: Animated gauge charts for key metrics
4. **Market Trends**: Line charts with smooth transitions

## Layout & Structure

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters  
- **Mobile**: 4-column grid with 16px gutters

### Spacing Scale
- **XS**: 8px - Element spacing
- **SM**: 16px - Component spacing
- **MD**: 32px - Section spacing
- **LG**: 64px - Major section breaks
- **XL**: 128px - Page section dividers

### Component Styling
- **Cards**: Dark background with subtle border, hover glow effect
- **Buttons**: Gradient backgrounds with neon accents
- **Forms**: Dark inputs with blue focus states
- **Tables**: Alternating row colors with hover highlights

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Mobile Optimizations
- **Touch Targets**: Minimum 44px for all interactive elements
- **Typography**: Larger base font size (18px vs 16px)
- **Spacing**: Increased padding for better readability
- **Navigation**: Hamburger menu with slide-out panel

## Accessibility

### Color Contrast
- **Text on Black**: 21:1 ratio (AAA compliant)
- **Blue on Black**: 8.5:1 ratio (AAA compliant)
- **Cyan on Black**: 10.2:1 ratio (AAA compliant)

### Interactive Elements
- **Focus States**: Clear blue outline for keyboard navigation
- **Hover States**: Consistent glow effect across all elements
- **Loading States**: Skeleton screens and progress indicators
- **Error States**: Red accents with clear messaging

## Technical Implementation

### CSS Framework
- **Base**: Tailwind CSS for utility-first styling
- **Custom**: CSS variables for theme consistency
- **Animations**: CSS keyframes and transitions
- **Responsive**: Mobile-first approach

### JavaScript Libraries
- **Anime.js**: Smooth animations and transitions
- **p5.js**: Particle systems and creative coding
- **ECharts.js**: Data visualization and charts
- **Splitting.js**: Text animation effects

### Performance Optimizations
- **Critical CSS**: Inline critical styles for fast rendering
- **Lazy Loading**: Images and non-critical animations
- **Reduced Motion**: Respect user preferences
- **GPU Acceleration**: Use transform3d for smooth animations