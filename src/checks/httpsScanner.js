function runHTTPSScanner() {

    const isHTTPS = window.location.protocol === "https:";

    return {

        category: "HTTPS",

        status: isHTTPS ? "PASS" : "FAIL",

        score: isHTTPS ? 20 : 0,

        findings: isHTTPS
            ? ["Connection is encrypted with HTTPS."]
            : ["This page is using HTTP."],

        details: {
            protocol: window.location.protocol
        }

    };

}