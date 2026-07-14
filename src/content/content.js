console.log("Content coordinator loaded.");

browser.runtime.onMessage.addListener((message) => {

    if (message.action !== "collectPageInfo") {
        return;
    }

    const httpsResult = runHTTPSScanner();

    return Promise.resolve({

        page: {

            title: document.title,

            url: window.location.href

        },

        scans: [

            httpsResult

        ]

    });

});