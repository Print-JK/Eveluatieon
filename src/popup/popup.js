const scanBtn = document.getElementById("scanBtn");
const status = document.getElementById("status");

scanBtn.addEventListener("click", async () => {

    status.textContent = "Scanning...";

    const result = await browser.runtime.sendMessage({

        action: "scanPage"

    });

    let output = "";

    output += `Page\n`;
    output += `${result.page.title}\n\n`;

    output += `${result.page.url}\n\n`;

    result.scans.forEach(scan => {

        output += `==========\n`;

        output += `${scan.category}\n`;

        output += `Status : ${scan.status}\n`;

        output += `Score  : ${scan.score}/20\n`;

        output += `${scan.findings.join("\n")}\n\n`;

    });

    status.textContent = output;

});