# Eveluatieon
A Firefox extension that evaluates the security posture of webpages using client-side analysis, simplifies and presents the results

in progress...

---

## Overview

Eveluatieon aims to make web security easier to understand by translating technical security findings into actionable explanations.

Many browser security tools are designed for security professionals and often provide raw security information without context. Eveluatieon bridges this gap by helping everyday users understand what security issues mean and why they matter.

---

## Current Architecture

Popup UI
    ↓
Background Script
    ↓
Content Script
    ↓
Scanner Registry
    ↓
Independent Security Scanners

---

## Implemented Scanners

- HTTPS Scanner
- Form Scanner
- Link Scanner
- Script Scanner
- Phishing Indicator Scanner
- Cookie Scanner

---

## Features

### Current Security Checks

- HTTPS evaluation
- Form analysis
- Hyperlink analysis
- Script analysis
- Basic phishing indicators
- Cookie visibility analysis

### HTTPS Evaluation

Current implementation:

- Detects whether the current page is served over HTTPS.
- Explains the security implications of HTTP connections.

Planned:

- Mixed content detection.
- Redirect chain analysis.

### Form Security Analysis

- Detects forms
- Detects password fields
- Detects email fields
- Detects insecure HTTP form submissions
- Detects autocomplete configuration

### Planned Features

- update HTTPS Evaluation(Mixed content detection, Redirect chain analysis)
- wepage preview sandbox
- Security Header Analysis
- Content Security Policy inspection
- HSTS detection
- Cookie attribute analysis
- VirusTotal lookup
- SSL Labs integration
- OWASP references
- Export report


### Simplified evaluation of websites

Instead of:

> Missing CSP

It will display:

> This website does not define a Content Security Policy. If an attacker successfully injects malicious JavaScript, the browser has fewer restrictions preventing the code from executing.

---

## Current Limitations

The current version performs client-side analysis from a browser content script.

Because of browser security restrictions, it cannot currently inspect:

- HTTP response headers
- HttpOnly cookies
- TLS certificate details
- Server-side security configuration

These capabilities are planned for future releases using browser APIs and background network inspection.