function runFormScanner() {

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

    let findings = [];

    if (passwordFields > 0)
        findings.push(`${passwordFields} password field(s) found.`);

    if (emailFields > 0)
        findings.push(`${emailFields} email field(s) found.`);

    if (insecureLoginForms > 0)
        findings.push(`${insecureLoginForms} insecure HTTP form(s).`);

    if (autocompleteOff > 0)
        findings.push(`${autocompleteOff} field(s) disable autocomplete.`);

    return {

        category: "Forms",

        status:
            insecureLoginForms > 0
                ? "WARNING"
                : "PASS",

        score:
            insecureLoginForms > 0
                ? 10
                : 20,

        findings,

        details: {

            forms: forms.length,

            passwordFields,

            emailFields,

            insecureLoginForms,

            autocompleteOff

        }

    };

}