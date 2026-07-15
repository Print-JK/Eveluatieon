const scanBtn = document.getElementById("scanBtn");
const scanSubtitle = document.getElementById("scanSubtitle");
const statusDiv = document.getElementById("status");
const pageDomainEl = document.getElementById("pageDomain");

scanBtn.addEventListener("click", async () => {

    scanSubtitle.textContent = "Scanning...";
    scanBtn.disabled = true; // Temporary disable to prevent double clicking
    statusDiv.innerHTML = `<div class="placeholder-text">Analyzing resources...</div>`;

    try {

        const result = await browser.runtime.sendMessage({
            action: "scanPage"
        });


        if (result.page && result.page.url) {
            try {
                const urlObj = new URL(result.page.url);
                pageDomainEl.textContent = urlObj.hostname;
            } catch (e) {
                pageDomainEl.textContent = result.page.title || "Target Site";
            }
        }


        statusDiv.innerHTML = "";


        result.scans.forEach((scan) => {
            const accordionItem = document.createElement("div");
            accordionItem.className = "accordion-item";


            const header = document.createElement("div");
            header.className = "accordion-header";
            header.innerHTML = `
                <span class="category-title">${scan.category}</span>
                <span class="score-badge">${scan.score}/${scan.maxScore}</span>
                <span class="arrow-icon">▼</span>
            `;


            const content = document.createElement("div");
            content.className = "accordion-content";


            const detailsSection = document.createElement("div");
            detailsSection.className = "scan-details-section";


            const buildListHtml = (title, items) => {
                let html = `<h4>${title}</h4><ul>`;
                if (!items || items.length === 0) {
                    html += `<li>None</li>`;
                } else {
                    items.forEach(item => {
                        html += `<li>${escapeHtml(item)}</li>`;
                    });
                }
                html += `</ul>`;
                return html;
            };


            detailsSection.innerHTML += buildListHtml("Observations", scan.observations);
            detailsSection.innerHTML += buildListHtml("Risks", scan.risks);
            detailsSection.innerHTML += buildListHtml("Recommendations", scan.recommendations);

            content.appendChild(detailsSection);
            accordionItem.appendChild(header);
            accordionItem.appendChild(content);
            statusDiv.appendChild(accordionItem);


            header.addEventListener("click", () => {
                const isActive = accordionItem.classList.contains("active");
                

                document.querySelectorAll(".accordion-item").forEach(item => {
                    item.classList.remove("active");
                });

                if (!isActive) {
                    accordionItem.classList.add("active");
                }
            });
        });

    } catch (error) {
        statusDiv.innerHTML = `<div class="placeholder-text" style="color:#ff6b6b;">Error scanning page. Make sure the background script is running.</div>`;
    } finally {
        scanSubtitle.textContent = "Scan Current Page";
        scanBtn.disabled = false;
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}