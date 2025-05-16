import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";

/**
 * Generates and downloads a shareable image of the user's balance wheel
 *
 * @param {HTMLElement} wheelElement - Reference to the balance wheel DOM element
 * @param {string} date - The current date string to display on the image
 */
export const generateBalanceWheelImage = async (wheelElement, date) => {
  if (!wheelElement) {
    console.error("Wheel element reference is missing");
    return;
  }

  const fetchAndEmbedSVG = async (url, container) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.status}`);
      }
      const svgText = await response.text();
      container.innerHTML = svgText;
      return true;
    } catch (error) {
      console.error("Error embedding SVG:", error);
      return false;
    }
  };

  try {
    const elements = wheelElement.querySelectorAll('[class*="bg-"]');
    const originalClasses = new Map();
    elements.forEach((el) => {
      originalClasses.set(el, el.getAttribute("class"));
      const classList = el.getAttribute("class").split(" ");
      const filteredClasses = classList.filter(
        (cls) => !cls.includes("oklch") && !cls.includes("bg-gradient")
      );
      el.setAttribute("class", filteredClasses.join(" "));
    });

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const wheelSize = isMobile ? screenWidth - 40 : 740;

    const cardContainer = document.createElement("div");
    cardContainer.style.width = isMobile ? "100vw" : "800px";
    cardContainer.style.height = isMobile ? "auto" : "1200px";
    cardContainer.style.background =
      "linear-gradient(180deg, #205A6A 0%, #002A36 100%)";
    cardContainer.style.borderRadius = "20px";
    cardContainer.style.padding = isMobile ? "30px" : "60px";
    cardContainer.style.display = "flex";
    cardContainer.style.flexDirection = "column";
    cardContainer.style.color = "white";
    cardContainer.style.fontFamily =
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, general-sans";
    cardContainer.style.boxSizing = "border-box";
    cardContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    cardContainer.style.position = "fixed";
    cardContainer.style.zIndex = "-9999";
    cardContainer.style.top = "0";
    cardContainer.style.left = "0";
    cardContainer.style.transform = "scale(1)";
    cardContainer.style.transformOrigin = "top left";

    const formattedDate = date.split("/").reverse().join("/");

    const wheelWrapper = document.createElement("div");
    wheelWrapper.style.position = "relative";
    wheelWrapper.style.width = `${wheelSize}px`;
    wheelWrapper.style.height = `${wheelSize}px`;
    wheelWrapper.style.margin = "0 auto 40px";
    wheelWrapper.style.display = "flex";
    wheelWrapper.style.justifyContent = "center";
    wheelWrapper.style.alignItems = "center";
    cardContainer.appendChild(wheelWrapper);

    const svgContainer = document.createElement("div");
    svgContainer.style.position = "absolute";
    svgContainer.style.top = "0";
    svgContainer.style.left = "0";
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";
    svgContainer.style.zIndex = "1";
    svgContainer.style.display = "flex";
    svgContainer.style.justifyContent = "center";
    svgContainer.style.alignItems = "center";
    wheelWrapper.appendChild(svgContainer);

    const wheelContainer = document.createElement("div");
    wheelContainer.style.position = "absolute";
    wheelContainer.style.width = `${wheelSize}px`;
    wheelContainer.style.height = `${wheelSize}px`;
    wheelContainer.style.top = "0";
    wheelContainer.style.left = "0";
    wheelContainer.style.right = "0";
    wheelContainer.style.margin = "0 auto";
    wheelContainer.style.zIndex = "2";
    wheelContainer.setAttribute("data-wheel-container", "true");
    wheelWrapper.appendChild(wheelContainer);

    const titleContainer = document.createElement("div");
    titleContainer.style.marginBottom = "30px";
    cardContainer.appendChild(titleContainer);

    const title = document.createElement("h1");
    title.style.fontSize = isMobile ? "32px" : "48px";
    title.style.fontWeight = "600";
    title.style.margin = "0";
    title.style.letterSpacing = "-0.5px";
    title.textContent = "Your Life Balance Wheel";
    titleContainer.appendChild(title);

    const dateDiv = document.createElement("h2");
    dateDiv.style.fontSize = isMobile ? "20px" : "32px";
    dateDiv.style.fontWeight = "normal";
    dateDiv.style.margin = "10px 0 0 0";
    dateDiv.style.fontStyle = "italic";
    dateDiv.textContent = `On ${formattedDate}`;
    titleContainer.appendChild(dateDiv);

    const description = document.createElement("p");
    description.style.fontSize = isMobile ? "16px" : "22px";
    description.style.lineHeight = "1.6";
    description.style.marginBottom = "30px";
    description.style.maxWidth = "90%";
    description.style.opacity = "0.9";
    description.textContent =
      "This Is How Your Life Balance Wheel Looks Like Now. Scores Will Change Weekly, Daily, Even Hourly As Circumstances Change. Do Not Look For Any Ultimate Truth, Just Check In With How You Feel In This Moment.";
    cardContainer.appendChild(description);

    document.body.appendChild(cardContainer);

    if (wheelElement) {
      const wheelParent = wheelElement.closest('[data-wheel-container="true"]');
      const wheelClone = (wheelParent || wheelElement).cloneNode(true);
      wheelClone.style.position = "absolute";
      wheelClone.style.top = "0";
      wheelClone.style.left = "0";
      wheelClone.style.right = "0";
      wheelClone.style.margin = "0 auto";
      wheelClone.style.width = "100%";
      wheelClone.style.height = "100%";
      wheelContainer.appendChild(wheelClone);
    }

    const svgLoaded = await fetchAndEmbedSVG(
      "/assets/roundtext.svg",
      svgContainer
    );

    if (svgLoaded) {
      const svgElement = svgContainer.querySelector("svg");
      if (svgElement) {
        svgElement.setAttribute("width", `${wheelSize}`);
        svgElement.setAttribute("height", `${wheelSize}`);
        svgElement.style.width = "100%";
        svgElement.style.height = "100%";
        svgElement.style.transform = "scale(0.9)";
        svgElement.style.transformOrigin = "center";
        svgElement.style.position = "absolute";
        svgElement.style.left = "0";
        svgElement.style.right = "0";
        svgElement.style.margin = "0 auto";

        const textElements = svgElement.querySelectorAll("text");
        textElements.forEach((text) => {
          text.style.fill = "white";
          text.style.fontFamily =
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          text.style.fontWeight = "bold";

          const transform = text.getAttribute("transform");
          if (transform) {
            const newTransform = transform.replace(
              /translate\(([^,]+),\s*([^)]+)\)/,
              (match, x, y) => {
                const newX = parseFloat(x) * 0.5;
                const newY = parseFloat(y) * 0.5;
                return `translate(${newX}, ${newY})`;
              }
            );
            text.setAttribute("transform", newTransform);
          }
        });

        const pathElements = svgElement.querySelectorAll("path, circle");
        pathElements.forEach((element) => {
          const transform = element.getAttribute("transform");
          if (transform && transform.includes("translate")) {
            const newTransform = transform.replace(
              /translate\(([^,]+),\s*([^)]+)\)/,
              (match, x, y) => {
                const newX = parseFloat(x) * 0.5;
                const newY = parseFloat(y) * 0.5;
                return `translate(${newX}, ${newY})`;
              }
            );
            element.setAttribute("transform", newTransform);
          }
        });
      }
    }

    const canvas = await html2canvas(cardContainer, {
      backgroundColor: "transparent",
      useCORS: true,
      scale: 2,
      allowTaint: true,
      foreignObjectRendering: true,
      onclone: (clonedDoc, element) => {
        element.style.zIndex = "auto";
        element.style.transform = "none";
        element.style.top = "0";
        element.style.left = "0";
        element.style.position = "absolute";

        const allElements = clonedDoc.querySelectorAll("*");
        allElements.forEach((el) => {
          const computedStyle = window.getComputedStyle(el);
          const backgroundColor = computedStyle.backgroundColor;
          if (backgroundColor && backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#19667A";
          }
        });
      },
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = "life-balance-wheel.jpg";
    link.href = imageData;
    link.click();

    elements.forEach((el) => {
      if (originalClasses.has(el)) {
        el.setAttribute("class", originalClasses.get(el));
      }
    });
  } catch (err) {
    console.error("Error generating card image:", err);
    if (wheelElement) {
      toJpeg(wheelElement, { quality: 0.95 }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "balance-wheel.jpeg";
        link.href = dataUrl;
        link.click();
      });
    }
  } finally {
    const existingCard = document.querySelector("#wheel-card-container");
    if (existingCard) existingCard.remove();
  }
};
