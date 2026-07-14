console.log("Background started.");

browser.runtime.onMessage.addListener(async (message) => {

    if (message.action !== "scanPage") {
        return;
    }

    const [activeTab] = await browser.tabs.query({

        active: true,
        currentWindow: true

    });

    return await browser.tabs.sendMessage(

        activeTab.id,

        {

            action: "collectPageInfo"

        }

    );

});