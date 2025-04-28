"use client";
import { useEffect, useState, useRef } from "react";
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

  const { cx, cy, payload, index } = props;
  
  // Additional safety check for NaN values
  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) {
    return null;
  }

  // Use smaller radius on mobile - check if window is defined (client-side only)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 15 : 20;
  const fontSize = isMobile ? 9 : 10;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="#866948"
        stroke="white"
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
        {payload.value}/10
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#866948] text-white p-3 rounded shadow-lg">
        <p className="font-bold">{payload[0].payload.subject}</p>
        <p>Score: {payload[0].payload.value}/10</p>
      </div>
    );
  }
  return null;
};

// Custom angle axis tick to position labels along the circumference
const CustomAngleTick = (props) => {
  const { x, y, cx, cy, payload, index } = props;

  // Safety check - if any required values are undefined or NaN, return null
  if (!payload || x === undefined || y === undefined || 
      cx === undefined || cy === undefined ||
      isNaN(x) || isNaN(y) || isNaN(cx) || isNaN(cy)) {
    return null;
  }

  // Generate a unique ID for this path
  const pathId = `curve${index}`;

  // Calculate angle in radians
  const angleRad = (-payload.angle * Math.PI) / 180;

  // Calculate the radius - larger than the chart to position text outside
  const radius = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) * 1.2;

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
        fontWeight="bold"
        className="text-[12px] md:text-[16px]"
        transform={`rotate(${rotation}, ${textX}, ${textY})`}
      >
        {payload.value}
      </text>
    </g>
  );
};

const BalanceWheel = ({ formData, onDownload, graphRef }) => {
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const chartRef = useRef(null);

  // Safety check for formData
  useEffect(() => {
    if (!formData) return;

    setData([
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
    ]);

    setMounted(true);
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

    // Set explicit background to white for the capture
    const originalStyle = chartRef.current.getAttribute("style") || "";
    chartRef.current.setAttribute(
      "style",
      `${originalStyle}; background-color: #FFFFFF !important;`
    );

    // Set background to white for the capture
    html2canvas(chartRef.current, {
      backgroundColor: "#FFFFFF",
      useCORS: true,
      scale: 2, // Higher resolution
      removeContainer: true,
      onclone: (clonedDoc, element) => {
        // Any additional modifications to the cloned document if needed
        element.style.backgroundColor = "#FFFFFF";
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

  // Create an array of ticks from 1 to 10
  const ticks = Array.from({ length: 10 }, (_, i) => i + 1);

  // If not mounted or no formData, show a loading placeholder
  if (!mounted || !formData) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-black rounded-full">
        <p>Loading balance wheel...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="absolute w-[480px] h-[480px] md:w-[600px] md:h-[600px] rounded-full overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/roundtext.svg"
          width={300}
          height={300}
          className="w-[280px] h-[280px] md:w-[600px] md:h-[550px] object-contain"
          alt="wheel background"
        />
      </div>
      <div
        ref={graphRef}
        className="relative w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-white rounded-full overflow-hidden"
        style={{ aspectRatio: "1/1" }}
      >
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="95%"
            startAngle={90}
            endAngle={-270}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <circle cx="50%" cy="50%" r="85%" fill="white" />
            <PolarGrid
              gridType="circle"
              stroke="#D6CDB2"
              radialLines={true}
              gridCount={5}
              radialLineProps={{
                stroke: "#D6CDB2",
                strokeWidth: 1,
                strokeOpacity: 1,
              }}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={<CustomAngleTick />}
              tickLine={false}
              stroke="#D6CDB2"
              axisLineType="circle"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={({ payload, x, y, cx, cy, index, tickFormatter }) => {
                const value = payload.value;
                if (value === 0) return null;
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    fill="#666666"
                    fontSize={10}
                  >{`${value}/10`}</text>
                );
              }}
              tickCount={5}
              ticks={[2, 4, 6, 8, 10]}
              stroke="#D6CDB2"
              axisLine={false}
            />
            <Radar
              name="Life Balance"
              dataKey="value"
              stroke="#866948"
              fill="#866948"
              fillOpacity={0.1}
              strokeWidth={2}
              dot={<CustomDot />}
              data={data}
              isAnimationActive={true}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceWheel;
