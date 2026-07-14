console.log("Content coordinator loaded.");

browser.runtime.onMessage.addListener((message) => {

    if (message.action !== "collectPageInfo") {
        return;
    }

    const results = [];
    for (const scanner of scanners) {
    results.push(scanner());}

    return Promise.resolve({

    page: {

        title: document.title,

        url: window.location.href

    },

    scans: results

});


});