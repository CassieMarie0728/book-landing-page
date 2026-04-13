# HOLY SH*T, THEY'RE GONE - Book Landing Page PRD

## Problem Statement
Create a book landing page for "HOLY SH*T, THEY'RE GONE: Navigating the F*cking Aftermath of Loss Without the Bullsh*t" by Cassandra Crossno, matching the dark grunge aesthetic of cassandracrossno.com and nobullshitgrief.com.

## Architecture
- **Frontend**: React 18 + Tailwind CSS (dark grunge/brutalist theme)
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (newsletter subscriber collection)
- **Email**: Resend (transactional welcome emails with Grief Survival Cheat Sheet)
- **Fonts**: Special Elite (headings/titles/links/quotes), Courier New (body text)
- **Color Palette**: #0A0A0A (background), #D42A2A (blood red accent), #E0E0E0 (bone white text)

## User Personas
- **Primary**: People experiencing grief who need raw, unfiltered support
- **Secondary**: Book browsers looking for unconventional grief resources

## Core Requirements
- Hero section with book cover and bold CTAs
- About the Book section with key theme cards
- Purchase links (Amazon, B&N, BAM, Kobo, Smashwords)
- About the Author bio section
- Functional newsletter signup (MongoDB-backed + Resend email)
- SEO meta tags (Open Graph + Twitter Cards)
- Responsive design (desktop + mobile)
- Footer with external links and crisis resources

## What's Been Implemented

### Iteration 1 (Jan 2026)
- [x] Full landing page with all 7 sections
- [x] Book cover image displayed prominently in hero
- [x] 5 purchase links + audiobook "coming soon" placeholder
- [x] Newsletter email signup with MongoDB storage
- [x] Duplicate email handling
- [x] Mobile responsive layout with hamburger menu
- [x] Sticky header with scroll detection
- [x] Dark grunge aesthetic matching brand identity

### Iteration 2 (Jan 2026)
- [x] Changed fonts: Special Elite (headers), Courier New (body)
- [x] Added SEO meta tags (Open Graph + Twitter Cards with book cover image)
- [x] Connected Resend email service for auto-sending welcome email with Grief Survival Cheat Sheet
- [x] Replaced author photo with non-person whiskey glass placeholder
- [x] 100% test pass rate both iterations

## Resend Email Notes
- API key configured in backend/.env
- Testing mode: emails only deliver to verified address (cmcrossno@gmail.com)
- To enable for all recipients: verify a domain at resend.com/domains
- Welcome email contains the full "20 Things" Grief Survival Cheat Sheet inline

## Prioritized Backlog
### P0 (Done)
- All core features implemented and tested

### P1 (Next)
- Verify Resend domain for production email delivery
- Replace author placeholder with real photo
- Analytics integration

### P2 (Future)
- Book excerpt/preview section
- Reader testimonials section (when available)
- Blog/podcast integration from nobullshitgrief.com
