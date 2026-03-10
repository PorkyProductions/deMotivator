---
title: 'Web app'
description: 'Architecture and operations notes for the demotivator web app.'
---

# Web app docs

The web app is a Svelte 5 multi-page app in `apps/web` deployed to Firebase Hosting.

## Core stack

- Svelte 5 + TypeScript + Vite
- Bootstrap + Tailwind styling
- Firebase hosting and Firestore integration

## Entry points

HTML page entries live in `apps/web/*.html` and map to TypeScript bootstrap code in `apps/web/src`.
