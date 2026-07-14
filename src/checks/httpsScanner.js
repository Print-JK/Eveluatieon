function runHTTPSScanner() {

    const isHTTPS = window.location.protocol === "https:";

    const result = createScanResult(
        "https",
        "HTTPS"
    );

    result.score = isHTTPS ? 20 : 0;

    result.details = {
        protocol: window.location.protocol
    };

    result.observations.push(
        isHTTPS
            ? "Page is served over HTTPS."
            : "Page is served over HTTP."
    );

    if (!isHTTPS) {

        result.risks.push(
            "Traffic is not encrypted and could be intercepted."
        );

        result.recommendations.push(
            "Redirect all traffic to HTTPS."
        );

    }

    return result;

}