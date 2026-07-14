const scanBtn = document.getElementById("scanBtn");
const status = document.getElementById("status");

scanBtn.addEventListener("click", async () => {

    status.textContent = "Scanning...";

    const result = await browser.runtime.sendMessage({
        action: "scanPage"
    });

    let output = "";

    output += "====================================\n";
    output += "Eveluatieon Security Report\n";
    output += "====================================\n\n";

    output += `Page\n`;
    output += `${result.page.title}\n`;
    output += `${result.page.url}\n\n`;

    for (const scan of result.scans) {

        output += "------------------------------------\n";
        output += `${scan.category}\n`;
        output += `Score: ${scan.score}/${scan.maxScore}\n\n`;

        output += "Observations\n";

        if (scan.observations.length === 0) {

            output += "- None\n";

        } else {

            scan.observations.forEach(item => {
                output += `- ${item}\n`;
            });

        }

        output += "\nRisks\n";

        if (scan.risks.length === 0) {

            output += "- None\n";

        } else {

            scan.risks.forEach(item => {
                output += `- ${item}\n`;
            });

        }

        output += "\nRecommendations\n";

        if (scan.recommendations.length === 0) {

            output += "- None\n";

        } else {

            scan.recommendations.forEach(item => {
                output += `- ${item}\n`;
            });

        }

        output += "\n";

    }

    status.textContent = output;

});