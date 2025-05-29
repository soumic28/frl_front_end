"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import html2canvas from "html2canvas";
import Image from "next/image";

// SVG Loader component to prevent placeholder image
const SVGLoader = ({ className }) => {
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
    // Fetch the SVG content directly
    fetch('/assets/roundtext.svg')
      .then(response => response.text())
      .then(svgText => {
        // Modify the SVG to make it fully responsive
        const modifiedSvg = svgText
          .replace('<svg', '<svg preserveAspectRatio="xMidYMid meet"')
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"');
        setSvgContent(modifiedSvg);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, []);
  
  if (!svgContent) {
    return null;
  }
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// Custom ticks for the radius axis to ensure we show all numbers 1-10
const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
  return <g className="recharts-polar-radius-axis-tick"></g>;
};

// Custom dot renderer that displays the value inside the dot
const CustomDot = (props) => {
  // Check if props or payload is undefined
  if (!props || !props.payload) {
    return null;
  }

  const { cx, cy, payload } = props;
  
  // Additional safety check for NaN values
  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) {
    return null;
  }

  // Use smaller radius on mobile - check if window is defined (client-side only)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 6 : 8;
  const fontSize = isMobile ? 10 : 12;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="#78DDE8"
        stroke="#78DDE8"
        strokeWidth={2}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={fontSize}
        fontWeight="bold"
      >
        {/* {payload.value} */}
      </text>
    </g>
  );
};

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

// Custom angle axis tick to position labels along the circumference
const CustomAngleTick = (props) => {
  const { x, y, cx, cy, payload } = props;

  // Safety check - if any required values are undefined or NaN, return null
  if (!payload || x === undefined || y === undefined || 
      cx === undefined || cy === undefined ||
      isNaN(x) || isNaN(y) || isNaN(cx) || isNaN(cy)) {
    return null;
  }

  // Calculate angle in radians
  const angleRad = (-payload.angle * Math.PI) / 180;

  // Calculate the radius - larger than the chart to position text outside
  const radius = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) * 1.15;

  // Determine position and rotation based on the angle
  let textAnchor = "middle";
  let textX = cx + radius * Math.cos(angleRad);
  let textY = cy + radius * Math.sin(angleRad);
  let rotation = (payload.angle - 90) % 360;

  // Adjust rotation to keep text readable
  if (rotation > 90 && rotation < 270) {
    rotation = rotation + 180;
  }

  return (
    <g>
      <text
        x={textX}
        y={textY}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill="white"
        fontSize="14"
        fontWeight="600"
        className="text-[11px] md:text-[14px]"
        transform={`rotate(${rotation}, ${textX}, ${textY})`}
      >
        {payload.value}
      </text>
    </g>
  );
};

// Define a custom shape for the radar polygon with curved lines
const CustomRadarShape = (props) => {
  const { cx, cy, points } = props;
  
  if (!points || points.length < 3) return null;
  
  // Create a path with cubic Bezier curves
  let pathData = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const prev = points[(i - 1 + points.length) % points.length];
    
    // Calculate control points for smoother cubic Bezier curve
    // Move control points 1/3 of the way from current to adjacent points
    const cp1X = current.x + (next.x - prev.x) / 6;
    const cp1Y = current.y + (next.y - prev.y) / 6;
    
    const cp2X = next.x - (next.x - current.x) / 3;
    const cp2Y = next.y - (next.y - current.y) / 3;
    
    // Add cubic Bezier curve segment
    pathData += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
  }
  
  pathData += ' Z'; // Close the path
  
  return (
    <path
      d={pathData}
      stroke={props.stroke}
      fill={props.fill}
      fillOpacity={props.fillOpacity}
      strokeWidth={props.strokeWidth}
    />
  );
};

// Component for RadarChart to keep BalanceWheel component cleaner
const BalanceRadarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%" aspect={1}>
    <RadarChart
      cx="50%"
      cy="50%"
      outerRadius="100%"
      startAngle={90}
      endAngle={-270}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      {/* Dark background circle */}
      <circle cx="50%" cy="50%" r="85%" fill="#1F4B5A" />
      
      <PolarGrid
        gridType="polygon"
        stroke="white"
        radialLines={true}
        gridCount={5}
        radialLineProps={{
          stroke: "white",
          strokeWidth: 1,
          strokeOpacity: 0.3,
        }}
      />
      <PolarAngleAxis
        dataKey="subject"
        tick={<CustomAngleTick />}
        tickLine={false}
        stroke="white"
        axisLineType="polygon"
      />
      <PolarRadiusAxis
        angle={90}
        domain={[0, 10]}
        tick={({ payload, x, y, cx, cy }) => {
          const value = payload.value;
          if (value === 0) return null;
          return (
            <text
              x={x}
              y={y}
              textAnchor={x > cx ? "start" : "end"}
              fill="white"
              fontSize={10}
              fontWeight="500"
            >{`${value * 10}%`}</text>
          );
        }}
        tickCount={5}
        ticks={[2, 4, 6, 8, 10]}
        stroke="white"
        axisLine={false}
      />
      <Radar
        name="Life Balance"
        dataKey="value"
        stroke="#78DDE8"
        fill="#78DDE8"
        fillOpacity={0.2}
        strokeWidth={3}
        dot={<CustomDot />}
        data={data}
        isAnimationActive={true}
        shape={<CustomRadarShape />}
      />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);

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
      {/* Main container with fixed proportions */}
      <div className="relative w-[265px] h-[265px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] lg:w-[510px] lg:h-[510px]">
        {/* SVG Text Circle - positioned absolutely to surround the inner wheel */}
        <div className="absolute top-0 left-0 w-full h-full scale-[1.2] sm:scale-[1.15] md:scale-[1.1] lg:scale-[1.08]" data-outer-wheel="true">
          <SVGLoader />
        </div>
        
        {/* Inner circle with radar chart */}
        <div
          ref={graphRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[470px] md:h-[470px] lg:w-[520px] lg:h-[520px] bg-[#1A4A5C] rounded-full overflow-hidden"
          style={{ boxShadow: 'none' }}
          data-inner-wheel="true"
        >
          <BalanceRadarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default BalanceWheel;