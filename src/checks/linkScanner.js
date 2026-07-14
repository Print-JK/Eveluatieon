function runLinkScanner() {

    const result = createScanResult(
        "links",
        "Links"
    );

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

    result.details = {

        totalLinks,
        externalLinks,
        insecureLinks,
        javascriptLinks,
        emptyLinks

    };

    result.observations.push(
        `${totalLinks} hyperlink(s) detected.`
    );

    if (externalLinks > 0)
        result.observations.push(
            `${externalLinks} external link(s).`
        );

    if (javascriptLinks > 0)
        result.observations.push(
            `${javascriptLinks} javascript: link(s).`
        );

    if (emptyLinks > 0)
        result.observations.push(
            `${emptyLinks} placeholder (#) link(s).`
        );

    if (insecureLinks > 0) {

        result.score -= 5;

        result.risks.push(
            "Some links point to HTTP resources."
        );

        result.recommendations.push(
            "Prefer HTTPS links whenever available."
        );

    }

    return result;

}