# HOLY SH*T, THEY'RE GONE - Book Landing Page PRD

## Problem Statement
Create a book landing page for "HOLY SH*T, THEY'RE GONE: Navigating the F*cking Aftermath of Loss Without the Bullsh*t" by Cassandra Crossno, matching the dark grunge aesthetic of cassandracrossno.com and nobullshitgrief.com.

## Architecture
- **Frontend**: React 18 + Tailwind CSS (dark grunge/brutalist theme)
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (newsletter subscriber collection)
- **Fonts**: Anton (headings), Permanent Marker (accents), IBM Plex Sans (body)
- **Color Palette**: #0A0A0A (background), #D42A2A (blood red accent), #E0E0E0 (bone white text)

## User Personas
- **Primary**: People experiencing grief who need raw, unfiltered support
- **Secondary**: Book browsers looking for unconventional grief resources

## Core Requirements
- Hero section with book cover and bold CTAs
- About the Book section with key theme cards
- Purchase links (Amazon, B&N, BAM, Kobo, Smashwords)
- About the Author bio section
- Functional newsletter signup (MongoDB-backed)
- Responsive design (desktop + mobile)
- Footer with external links and crisis resources

## What's Been Implemented (Jan 2026)
- [x] Full landing page with all 7 sections
- [x] Book cover image displayed prominently in hero
- [x] 5 purchase links + audiobook "coming soon" placeholder
- [x] Newsletter email signup with MongoDB storage
- [x] Duplicate email handling
- [x] Mobile responsive layout with hamburger menu
- [x] Sticky header with scroll detection
- [x] Dark grunge aesthetic matching brand identity
- [x] 100% test pass rate (backend + frontend)

## Prioritized Backlog
### P0 (Done)
- All core features implemented and tested

### P1 (Next)
- SEO meta tags (Open Graph, Twitter cards)
- Analytics integration
- Custom author photo replacement

### P2 (Future)
- Book excerpt/preview section
- Reader testimonials section (when available)
- Blog/podcast integration from nobullshitgrief.com
- Email service integration (SendGrid/Resend) for auto-responder
