console.log("Popup loaded");

const scanBtn = document.getElementById("scanBtn");
const status = document.getElementById("status");

scanBtn.addEventListener("click", async () => {

    status.textContent = "Scanning...";

    const result = await browser.runtime.sendMessage({

        action: "scanPage"

    });

    status.textContent =
`Title: ${result.title}

URL: ${result.url}

Forms: ${result.formCount}`;

});