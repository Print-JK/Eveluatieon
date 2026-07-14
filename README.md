# Eveluatieon
Firefox extension for website security auditing, analyzing headers, cookies, HTTPS configuration, and phishing indicators with human-readable security insights...in progress...

---

## Overview

Eveluatieon aims to make web security easier to understand by translating technical security findings into actionable explanations.

Many browser security tools are designed for security professionals and often provide raw security information without context. Eveluatieon bridges this gap by helping everyday users understand what security issues mean and why they matter.

## Features

### Security Header Analysis

Detects and evaluates common security headers:

- Content-Security-Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- X-Content-Type-Options

### HTTPS Evaluation

Checks for:

- HTTPS usage
- Mixed content
- Redirect-related risks
- Transport security concerns

### Form Security Analysis

Inspects web forms for:

- Password fields
- Insecure login forms
- Autocomplete configuration
- Password manager compatibility

### Human-Readable Explanations

Instead of:

> Missing CSP

It will display:

> This website does not define a Content Security Policy. If an attacker successfully injects malicious JavaScript, the browser has fewer restrictions preventing the code from executing.
