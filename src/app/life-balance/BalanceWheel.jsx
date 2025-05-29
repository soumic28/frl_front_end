"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import html2canvas from "html2canvas";

// Custom SVG Wheel component that integrates data with the balancewheel.svg design
const CustomBalanceWheel = ({ data }) => {
  const [svgContent, setSvgContent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);
  
  useEffect(() => {
    // Fetch the SVG content and modify it to include data points
    fetch('/assets/balancewheel.svg')
      .then(response => response.text())
      .then(svgText => {
        // Parse the SVG and add data visualization
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        // Make SVG responsive
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        
        // Remove existing data visualization elements (circles, lines, polygons that look like data points)
        // Keep only the base wheel design and text labels
        const elementsToRemove = [];
        
        // Find and mark elements that appear to be data visualization (not the base design)
        const allElements = svgElement.querySelectorAll('*');
        allElements.forEach(element => {
          // Remove elements that are likely data visualization based on their attributes
          if (element.tagName === 'circle' && 
              (element.getAttribute('fill') === '#78DDE8' || 
               element.getAttribute('stroke') === '#78DDE8' ||
               element.getAttribute('fill') === 'white' && element.getAttribute('stroke'))) {
            elementsToRemove.push(element);
          }
          
          // Remove lines that connect data points (typically have specific stroke colors)
          if (element.tagName === 'line' && 
              (element.getAttribute('stroke') === '#78DDE8' || 
               element.getAttribute('stroke-opacity'))) {
            elementsToRemove.push(element);
          }
          
          // Remove polygons that represent data areas
          if (element.tagName === 'polygon' && 
              (element.getAttribute('fill') === '#78DDE8' || 
               element.getAttribute('fill-opacity'))) {
            elementsToRemove.push(element);
          }
          
          // Remove paths that might be data visualization (not the base wheel design)
          if (element.tagName === 'path' && 
              (element.getAttribute('fill') === '#78DDE8' || 
               element.getAttribute('stroke') === '#78DDE8')) {
            elementsToRemove.push(element);
          }
        });
        
        // Remove the identified elements
        elementsToRemove.forEach(element => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });
        
        // Define the center and radius for data points
        const centerX = 441;
        const centerY = 437;
        const baseRadius = 100;
        
        // Define angles for each life area (8 segments, starting from top)
        const angles = [
          { name: 'SPIRITUAL & EMOTION', angle: 0 },
          { name: 'HEALTH', angle: 45 },
          { name: 'RECREATION & FUN', angle: 90 },
          { name: 'FRIENDS & FAMILY', angle: 135 },
          { name: 'ROMANCE', angle: 180 },
          { name: 'FINANCES', angle: 225 },
          { name: 'PHYSICAL ENVIRONMENT', angle: 270 },
          { name: 'WORK / CAREER', angle: 315 }
        ];
        
        // Create data points and connecting lines
        const dataPoints = [];
        data.forEach((item, index) => {
          const angleInfo = angles.find(a => a.name === item.subject);
          if (angleInfo) {
            const angleRad = (angleInfo.angle - 90) * Math.PI / 180; // Adjust for SVG coordinate system
            const radius = baseRadius + (item.value * 30); // Scale radius based on value
            const x = centerX + radius * Math.cos(angleRad);
            const y = centerY + radius * Math.sin(angleRad);
            
            dataPoints.push({ x, y, value: item.value, subject: item.subject });
          }
        });
        
        // Create the data visualization polygon
        if (dataPoints.length > 0) {
          const pathData = dataPoints.map((point, index) => 
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
          ).join(' ') + ' Z';
          
          // Add the data polygon
          const dataPolygon = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'path');
          dataPolygon.setAttribute('d', pathData);
          dataPolygon.setAttribute('fill', '#78DDE8');
          dataPolygon.setAttribute('fill-opacity', '0.3');
          dataPolygon.setAttribute('stroke', '#78DDE8');
          dataPolygon.setAttribute('stroke-width', '3');
          svgElement.appendChild(dataPolygon);
          
          // Add data points
          dataPoints.forEach(point => {
            // Create circle for data point
            const circle = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            circle.setAttribute('r', isMobile ? '8' : '12');
            circle.setAttribute('fill', '#78DDE8');
            circle.setAttribute('stroke', '#FFFFFF');
            circle.setAttribute('stroke-width', '2');
            svgElement.appendChild(circle);
            
            // Add value text inside circle
            const text = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', point.x);
            text.setAttribute('y', point.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'central');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-size', isMobile ? '10' : '12');
            text.setAttribute('font-weight', 'bold');
            text.textContent = point.value;
            svgElement.appendChild(text);
          });
          
          // Add connecting lines from center to each data point
          dataPoints.forEach(point => {
            const line = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', centerX);
            line.setAttribute('y1', centerY);
            line.setAttribute('x2', point.x);
            line.setAttribute('y2', point.y);
            line.setAttribute('stroke', '#78DDE8');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-opacity', '0.5');
            svgElement.appendChild(line);
          });
        }
        
        // Convert back to string
        const serializer = new XMLSerializer();
        const modifiedSvg = serializer.serializeToString(svgElement);
        setSvgContent(modifiedSvg);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, [data, isMobile]);
  
  if (!svgContent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1A4A5C] rounded-full">
        <p className="text-white">Loading balance wheel...</p>
      </div>
    );
  }
  
  return (
    <div 
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A4A5C] text-white p-3 rounded shadow-lg border border-[#4DD0E1]">
        <p className="font-bold">{payload[0].payload.subject}</p>
        <p>Score: {payload[0].payload.value}/10</p>
      </div>
    );
  }
  return null;
};

// Helper function to transform form data to chart data
const transformFormDataToChartData = (formData) => {
  if (!formData) return [];
  
  return [
    {
      subject: "HEALTH",
      value: formData.health || 5,
      valuePercent: (formData.health || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "RECREATION & FUN",
      value: formData.recreation || 5,
      valuePercent: (formData.recreation || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "FRIENDS & FAMILY",
      value: formData.relationships || 5,
      valuePercent: (formData.relationships || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "ROMANCE",
      value: formData.romance || 5,
      valuePercent: (formData.romance || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "FINANCES",
      value: formData.finance || 5,
      valuePercent: (formData.finance || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "PHYSICAL ENVIRONMENT",
      value: formData.environment || 5,
      valuePercent: (formData.environment || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "WORK / CAREER",
      value: formData.career || 5,
      valuePercent: (formData.career || 5) * 10,
      fullMark: 100,
    },
    {
      subject: "SPIRITUAL & EMOTION",
      value: formData.spiritual || 5,
      valuePercent: (formData.spiritual || 5) * 10,
      fullMark: 100,
    },
  ];
};

const BalanceWheel = ({ formData, onDownload, graphRef }) => {
  const [mounted, setMounted] = useState(false);
  const chartRef = useRef(null);
  
  // Transform form data to chart data using memoization to prevent unnecessary recalculations
  const data = useMemo(() => transformFormDataToChartData(formData), [formData]);

  // Mount component after data is ready
  useEffect(() => {
    if (formData) {
      setMounted(true);
    }
  }, [formData]);

  // Function to download chart as image
  const downloadChart = () => {
    if (!chartRef.current) return;

    // Remove any TailwindCSS classes that use oklch colors before capture
    const elements = chartRef.current.querySelectorAll('[class*="bg-"]');
    const originalClasses = new Map();

    elements.forEach((el) => {
      originalClasses.set(el, el.getAttribute("class"));

      // Replace any Tailwind classes that might use oklch with basic colors
      const classList = el.getAttribute("class").split(" ");
      const filteredClasses = classList.filter(
        (cls) => !cls.includes("oklch") && !cls.includes("bg-gradient")
      );

      el.setAttribute("class", filteredClasses.join(" "));
    });

    // Set explicit background to dark teal for the capture
    const originalStyle = chartRef.current.getAttribute("style") || "";
    chartRef.current.setAttribute(
      "style",
      `${originalStyle}; background-color: #1A4A5C !important;`
    );

    // Set background to dark teal for the capture
    html2canvas(chartRef.current, {
      backgroundColor: "#1A4A5C",
      useCORS: true,
      scale: 2, // Higher resolution
      removeContainer: true,
      onclone: (clonedDoc, element) => {
        // Any additional modifications to the cloned document if needed
        element.style.backgroundColor = "#1A4A5C";
      },
    }).then((canvas) => {
      // Convert to JPEG
      const imageData = canvas.toDataURL("image/jpeg", 1.0);

      // Create download link
      const link = document.createElement("a");
      link.download = "balance-wheel.jpg";
      link.href = imageData;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore original classes
      elements.forEach((el) => {
        el.setAttribute("class", originalClasses.get(el));
      });

      // Restore original style
      chartRef.current.setAttribute("style", originalStyle);
    });
  };

  // Effect to expose the download function to parent components
  useEffect(() => {
    if (typeof onDownload === "function") {
      onDownload(downloadChart);
    }

    // Expose the download function globally for the download button
    if (typeof window !== "undefined") {
      window.downloadBalanceWheel = downloadChart;
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        window.downloadBalanceWheel = null;
      }
    };
  }, [onDownload]);

  // If not mounted or no formData, show a loading placeholder
  if (!mounted || !formData) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-[#1A4A5C] rounded-full">
        <p className="text-white">Loading balance wheel...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center" data-wheel-container="true">
      {/* Main container with the custom SVG wheel */}
      <div 
        ref={chartRef}
        className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]"
        data-balance-wheel="true"
      >
        <CustomBalanceWheel data={data} />
      </div>
    </div>
  );
};

export default BalanceWheel;