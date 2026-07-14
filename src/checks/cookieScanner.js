function runCookieScanner() {

    const result = createScanResult(
        "cookies",
        "Cookies"
    );

    const cookieString = document.cookie;

    if (!cookieString) {

        result.observations.push(
            "No accessible cookies detected."
        );

        return result;

    }

    const cookies = cookieString.split(";");

    result.details = {

        accessibleCookies: cookies.length

    };

    result.observations.push(
        `${cookies.length} accessible cookie(s) detected.`
    );

    result.risks.push(
        "Only cookies accessible to JavaScript are visible. HttpOnly cookies cannot be inspected from a content script."
    );

    result.recommendations.push(
        "Review cookie attributes such as Secure, HttpOnly and SameSite using browser developer tools or server-side configuration."
    );

    return result;

}