console.log("Content script loaded:", window.location.href);

browser.runtime.onMessage.addListener((message) => {

    if (message.action !== "collectPageInfo") {
        return;
    }

    return Promise.resolve({

        title: document.title,

        url: window.location.href,

        formCount: document.forms.length

    });

});