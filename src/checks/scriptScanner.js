function runScriptScanner() {

    const result = createScanResult(
        "scripts",
        "Scripts"
    );

    const scripts = document.scripts;

    let totalScripts = scripts.length;
    let inlineScripts = 0;
    let externalScripts = 0;
    let thirdPartyScripts = 0;

    const currentHost = window.location.hostname;

    for (const script of scripts) {

        if (!script.src) {

            inlineScripts++;
            continue;

        }

        externalScripts++;

        try {

            const url = new URL(script.src);

            if (url.hostname !== currentHost) {

                thirdPartyScripts++;

            }

        }
        catch {}

    }

    result.details = {

        totalScripts,
        inlineScripts,
        externalScripts,
        thirdPartyScripts

    };

    result.observations.push(
        `${totalScripts} script(s) detected.`
    );

    if (inlineScripts > 0)
        result.observations.push(
            `${inlineScripts} inline script(s).`
        );

    if (externalScripts > 0)
        result.observations.push(
            `${externalScripts} external script(s).`
        );

    if (thirdPartyScripts > 0)
        result.observations.push(
            `${thirdPartyScripts} third-party script(s).`
        );

    if (inlineScripts > 0) {

        result.risks.push(
            "Inline scripts may reduce the effectiveness of a strict Content Security Policy if 'unsafe-inline' is allowed."
        );

        result.recommendations.push(
            "Move inline JavaScript into external files where practical."
        );

        result.recommendations.push(
            "Adopt a strict Content Security Policy."
        );

    }

    return result;

}