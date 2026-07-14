function runFormScanner() {

    const result = createScanResult(
        "forms",
        "Forms"
    );

    const forms = document.forms;

    const passwordFields =
        document.querySelectorAll("input[type='password']").length;

    const emailFields =
        document.querySelectorAll("input[type='email']").length;

    let insecureLoginForms = 0;

    for (const form of forms) {

        if (
            form.action &&
            form.action.startsWith("http://")
        ) {
            insecureLoginForms++;
        }

    }

    const autocompleteOff =
        document.querySelectorAll("[autocomplete='off']").length;

    result.details = {

        forms: forms.length,

        passwordFields,

        emailFields,

        insecureLoginForms,

        autocompleteOff

    };

    result.observations.push(
        `${forms.length} form(s) detected.`
    );

    if (passwordFields > 0) {

        result.observations.push(
            `${passwordFields} password field(s) detected.`
        );

    }

    if (emailFields > 0) {

        result.observations.push(
            `${emailFields} email field(s) detected.`
        );

    }

    if (autocompleteOff > 0) {

        result.observations.push(
            `${autocompleteOff} field(s) disable autocomplete.`
        );

    }

    if (insecureLoginForms > 0) {

        result.score -= 10;

        result.risks.push(
            "Credentials submitted over HTTP can be intercepted."
        );

        result.recommendations.push(
            "Submit authentication forms over HTTPS."
        );

    }

    return result;

}