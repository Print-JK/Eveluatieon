console.log("Background started");

browser.runtime.onMessage.addListener(async (message) => {

    if (message.action !== "scanPage") {
        return;
    }

    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    const activeTab = tabs[0];

    const pageInfo = await browser.tabs.sendMessage(
        activeTab.id,
        {
            action: "collectPageInfo"
        }
    );

    return pageInfo;

});