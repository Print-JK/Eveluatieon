function runPhishingScanner() {

    const result = createScanResult(
        "phishing",
        "Phishing Indicators"
    );

    const url = new URL(window.location.href);

    const hostname = url.hostname;
    const pathname = url.pathname;

    const suspiciousTLDs = [
        "zip",
        "click",
        "top",
        "xyz",
        "gq",
        "tk",
        "ml",
        "cf"
    ];

    // IP Address instead of domain
    const ipRegex = /^\d{1,3}(\.\d{1,3}){3}$/;

    if (ipRegex.test(hostname)) {

        result.score -= 5;

        result.observations.push(
            "The page is using an IP address instead of a domain name."
        );

        result.risks.push(
            "Phishing websites sometimes use raw IP addresses to avoid registering domains."
        );

        result.recommendations.push(
            "Be cautious when entering sensitive information."
        );

    }

    // Long URL

    if (window.location.href.length > 100) {

        result.score -= 2;

        result.observations.push(
            "URL is unusually long."
        );

        result.risks.push(
            "Long URLs can hide deceptive paths or parameters."
        );

    }

    // Excessive subdomains

    const subdomains = hostname.split(".");

    if (subdomains.length > 4) {

        result.score -= 3;

        result.observations.push(
            "Domain contains many subdomains."
        );

        result.risks.push(
            "Attackers sometimes imitate legitimate domains using multiple subdomains."
        );

    }

    // Punycode

    if (hostname.includes("xn--")) {

        result.score -= 5;

        result.observations.push(
            "Internationalized (punycode) domain detected."
        );

        result.risks.push(
            "Some phishing attacks use visually similar internationalized domains."
        );

    }

    // Suspicious TLD

    const tld = hostname.split(".").pop();

    if (suspiciousTLDs.includes(tld)) {

        result.score -= 3;

        result.observations.push(
            `Top-level domain .${tld} is commonly abused.`
        );

        result.risks.push(
            "Some low-cost TLDs appear more frequently in phishing campaigns."
        );

    }

    if (result.risks.length === 0) {

        result.observations.push(
            "No common phishing indicators detected."
        );

    }

    return result;

}