function runLinkScanner() {

    const links = document.links;

    let totalLinks = links.length;
    let externalLinks = 0;
    let insecureLinks = 0;
    let javascriptLinks = 0;
    let emptyLinks = 0;

    const currentHost = window.location.hostname;

    for (const link of links) {

        const href = link.getAttribute("href") || "";

        if (href.startsWith("javascript:")) {
            javascriptLinks++;
        }

        if (href === "#" || href === "") {
            emptyLinks++;
        }

        try {

            const url = new URL(link.href);

            if (url.hostname !== currentHost) {
                externalLinks++;
            }

            if (url.protocol === "http:") {
                insecureLinks++;
            }

        }
        catch {

            // Ignore invalid URLs

        }

    }

    const findings = [];

    if (externalLinks > 0)
        findings.push(`${externalLinks} external link(s).`);

    if (insecureLinks > 0)
        findings.push(`${insecureLinks} insecure HTTP link(s).`);

    if (javascriptLinks > 0)
        findings.push(`${javascriptLinks} javascript: link(s).`);

    if (emptyLinks > 0)
        findings.push(`${emptyLinks} placeholder link(s).`);

    let score = 20;

    if (insecureLinks > 0)
        score -= 8;

    if (javascriptLinks > 0)
        score -= 6;

    if (score < 0)
        score = 0;

    return {

        category: "Links",

        status: score >= 18 ? "PASS" :
                score >= 10 ? "WARNING" :
                "FAIL",

        score,

        findings,

        details: {

            totalLinks,
            externalLinks,
            insecureLinks,
            javascriptLinks,
            emptyLinks

        }

    };

}