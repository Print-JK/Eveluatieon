const scanBtn = document.getElementById("scanBtn");
const scanSubtitle = document.getElementById("scanSubtitle");
const statusDiv = document.getElementById("status");
const pageDomainEl = document.getElementById("pageDomain");

scanBtn.addEventListener("click", async () => {

    scanSubtitle.textContent = "Scanning...";
    scanBtn.disabled = true; // Temporary disable to prevent double clicking
    statusDiv.replaceChildren();

    const loading = document.createElement("div");
    loading.className = "placeholder-text";
    loading.textContent = "Analyzing resources...";

    statusDiv.appendChild(loading);
    
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

            const title = document.createElement("span");
            title.className = "category-title";
            title.textContent = scan.category;

            const badge = document.createElement("span");
            badge.className = "score-badge";
            badge.textContent = `${scan.score}/${scan.maxScore}`;

            const arrow = document.createElement("span");
            arrow.className = "arrow-icon";
            arrow.textContent = "▼";

            header.appendChild(title);
            header.appendChild(badge);
            header.appendChild(arrow);


            const content = document.createElement("div");
            content.className = "accordion-content";


            const detailsSection = document.createElement("div");
            detailsSection.className = "scan-details-section";


        function buildList(title, items) {

            const section = document.createElement("div");

            const heading = document.createElement("h4");
            heading.textContent = title;

            section.appendChild(heading);

            const list = document.createElement("ul");

            if (!items || items.length === 0) {

                const li = document.createElement("li");
                li.textContent = "None";
                list.appendChild(li);

            } else {

                items.forEach(item => {

                    const li = document.createElement("li");
                    li.textContent = item;
                    list.appendChild(li);

                });

            }

            section.appendChild(list);

            return section;

        }


            detailsSection.appendChild(
                buildList("Observations", scan.observations)
            );

            detailsSection.appendChild(
                buildList("Risks", scan.risks)
            );

            detailsSection.appendChild(
                buildList("Recommendations", scan.recommendations)
            );

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
    
    statusDiv.replaceChildren();

    const errorMsg = document.createElement("div");
    errorMsg.className = "placeholder-text";
    errorMsg.style.color = "#ff6b6b";
    errorMsg.textContent =
    "Error scanning page. Make sure the background script is running.";

statusDiv.appendChild(errorMsg);    


    } finally {
        scanSubtitle.textContent = "Scan Current Page";
        scanBtn.disabled = false;
    }
});