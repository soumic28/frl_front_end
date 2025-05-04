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

  // Utility function to fetch and embed the SVG
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

  // Create a container element that will hold our full card for download
  const cardContainer = document.createElement("div");
  cardContainer.style.width = "800px";
  cardContainer.style.height = "1200px";
  cardContainer.style.background = "linear-gradient(180deg, #19667A 0%, #003644 100%)";
  cardContainer.style.borderRadius = "20px";
  cardContainer.style.padding = "60px";
  cardContainer.style.display = "flex";
  cardContainer.style.flexDirection = "column";
  cardContainer.style.color = "white";
  cardContainer.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, general-sans";
  cardContainer.style.boxSizing = "border-box";
  cardContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
  cardContainer.style.position = "fixed";
  cardContainer.style.zIndex = "-9999";
  cardContainer.style.top = "0";
  cardContainer.style.left = "0";
  cardContainer.style.transform = "scale(0.8)";
  cardContainer.style.transformOrigin = "top left";

  // Format date as DD/MM/YYYY to match the image
  const formattedDate = date.split("/").reverse().join("/");

  // Create the wheel container wrapper for positioning
  const wheelWrapper = document.createElement("div");
  wheelWrapper.style.position = "relative";
  wheelWrapper.style.width = "700px";
  wheelWrapper.style.height = "700px";
  wheelWrapper.style.margin = "0 auto 40px";
  cardContainer.appendChild(wheelWrapper);

  // Create SVG container
  const svgContainer = document.createElement("div");
  svgContainer.style.position = "absolute";
  svgContainer.style.top = "0";
  svgContainer.style.left = "0";
  svgContainer.style.width = "100%";
  svgContainer.style.height = "100%";
  svgContainer.style.zIndex = "1";
  wheelWrapper.appendChild(svgContainer);

  // Create a container for the actual wheel chart
  const wheelContainer = document.createElement("div");
  wheelContainer.style.position = "absolute";
  wheelContainer.style.width = "690px";
  wheelContainer.style.height = "690px";
  wheelContainer.style.top = "5px";
  wheelContainer.style.left = "5px";
  wheelContainer.style.zIndex = "2";
  wheelContainer.setAttribute("data-wheel-container", "true");
  wheelWrapper.appendChild(wheelContainer);

  // Add card title AFTER the wheel
  const titleContainer = document.createElement("div");
  titleContainer.style.marginBottom = "30px";
  cardContainer.appendChild(titleContainer);

  const title = document.createElement("h1");
  title.style.fontSize = "48px";
  title.style.fontWeight = "600";
  title.style.margin = "0";
  title.style.letterSpacing = "-0.5px";
  title.textContent = "Your Life Balance Wheel";
  titleContainer.appendChild(title);

  // Add date
  const dateDiv = document.createElement("h2");
  dateDiv.style.fontSize = "32px";
  dateDiv.style.fontWeight = "normal";
  dateDiv.style.margin = "10px 0 0 0";
  dateDiv.style.fontStyle = "italic";
  dateDiv.textContent = `On ${formattedDate}`;
  titleContainer.appendChild(dateDiv);

  // Add description
  const description = document.createElement("p");
  description.style.fontSize = "22px";
  description.style.lineHeight = "1.6";
  description.style.marginBottom = "30px";
  description.style.maxWidth = "90%";
  description.style.opacity = "0.9";
  description.textContent = "This Is How Your Life Balance Wheel Looks Like Now. Scores Will Change Weekly, Daily, Even Hourly As Circumstances Change. Do Not Look For Any Ultimate Truth, Just Check In With How You Feel In This Moment.";
  cardContainer.appendChild(description);

  // Temporarily append to document to capture, but hide it
  document.body.appendChild(cardContainer);

  // Copy the real wheel chart first
  if (wheelElement) {
    const wheelParent = wheelElement.closest('[data-wheel-container="true"]');

    if (wheelParent) {
      const wheelClone = wheelParent.cloneNode(true);
      wheelClone.style.position = "absolute";
      wheelClone.style.top = "0";
      wheelClone.style.left = "0";
      wheelClone.style.width = "100%";
      wheelClone.style.height = "100%";
      wheelContainer.appendChild(wheelClone);
    } else {
      const wheelClone = wheelElement.cloneNode(true);
      wheelClone.style.position = "absolute";
      wheelClone.style.top = "50%";
      wheelClone.style.left = "50%";
      wheelClone.style.transform = "translate(-50%, -50%)";
      wheelClone.style.width = "100%";
      wheelClone.style.height = "100%";
      wheelContainer.appendChild(wheelClone);
    }
  }

  try {
    // Fetch and embed the SVG
    const svgLoaded = await fetchAndEmbedSVG("/assets/roundtext.svg", svgContainer);
    
    if (svgLoaded) {
      // Ensure SVG elements have the right styling
      const svgElement = svgContainer.querySelector("svg");
      if (svgElement) {
        svgElement.setAttribute("width", "700");
        svgElement.setAttribute("height", "700");
        svgElement.style.width = "100%";
        svgElement.style.height = "100%";
        
        // Scale the SVG to bring text closer to center
        svgElement.style.transform = "scale(0.8)";
        svgElement.style.transformOrigin = "center";
        
        // Move the SVG text categories closer to the wheel
        const textElements = svgElement.querySelectorAll("text");
        textElements.forEach((text) => {
          text.style.fill = "white";
          text.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          text.style.fontWeight = "bold";
          
          // Check if this is a transform attribute we can modify to move text closer
          const transform = text.getAttribute("transform");
          if (transform) {
            // Move text inward by 50% to tightly enclose the wheel
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
        
        // Also adjust any paths or other elements that might form circles
        const pathElements = svgElement.querySelectorAll("path, circle");
        pathElements.forEach(element => {
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

    // Generate the image using html2canvas
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
      },
    });

    // Convert to JPEG and trigger download
    const imageData = canvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = "life-balance-wheel.jpg";
    link.href = imageData;
    link.click();
  } catch (err) {
    console.error("Error generating card image:", err);
    
    // Fallback to simpler method
    if (wheelElement) {
      toJpeg(wheelElement, { quality: 0.95 }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "balance-wheel.jpeg";
        link.href = dataUrl;
        link.click();
      });
    }
  } finally {
    // Clean up
    if (document.body.contains(cardContainer)) {
      document.body.removeChild(cardContainer);
    }
  }
}; 