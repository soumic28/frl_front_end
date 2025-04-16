"use client"
import { useEffect, useState, useRef } from 'react';
import {
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarRadiusAxis,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import html2canvas from 'html2canvas';
import Image from 'next/image';
// Custom ticks for the radius axis to ensure we show all numbers 1-10
const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }) => {
  return (
    <g className="recharts-polar-radius-axis-tick">
     
    </g>
  );
};

// Custom dot renderer that displays the value inside the dot
const CustomDot = (props) => {
  // Check if props or payload is undefined
  if (!props || !props.payload) {
    return null;
  }
  
  const { cx, cy, payload, index } = props;
  
  // Use smaller radius on mobile
  const radius = window?.innerWidth < 768 ? 6 : 10;
  const fontSize = window?.innerWidth < 768 ? 8 : 10;
  
  return (
    <g>
      <circle 
        cx={cx} 
        cy={cy} 
        r={radius}
        fill="#19667a" 
        stroke="white"
        strokeWidth={1.5}
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
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#19667a] text-white p-3 rounded shadow-lg">
        <p className="font-bold">{payload[0].payload.subject}</p>
        <p>Score: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Custom angle axis tick to position labels along the circumference
const CustomAngleTick = (props) => {
  const { x, y, cx, cy, payload, index } = props;
  
  // Generate a unique ID for this path
  const pathId = `curve${index}`;
  
  // Calculate angle in radians
  const angleRad = (-payload.angle * Math.PI) / 180;
  
  // Calculate the radius - slightly larger than the chart to position text outside
  const radius = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  
  // Create path data for an arc centered on this specific angle
  const startAngle = angleRad - Math.PI / 12; // 15 degrees before
  const endAngle = angleRad + Math.PI / 12;   // 15 degrees after
  
  const startX = cx + radius * Math.cos(startAngle);
  const startY = cy + radius * Math.sin(startAngle);
  const endX = cx + radius * Math.cos(endAngle);
  const endY = cy + radius * Math.sin(endAngle);
  
  const largeArcFlag = 0; // We're using small arcs (less than 180 degrees)
  const sweepFlag = 1;    // Clockwise
  
  const pathData = `M ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},${sweepFlag} ${endX},${endY}`;
  
  // Determine if text should be reversed based on position
  const shouldReverse = angleRad > -Math.PI/2 && angleRad < Math.PI/2;
  
  let textProps = {};
  
  if (shouldReverse) {
    textProps.startOffset = "50%";
    textProps.textAnchor = "middle";
  } else {
    textProps.startOffset = "50%";
    textProps.textAnchor = "middle";
  }

  return (
    <g>
      <defs>
        <path id={pathId} d={pathData} />
      </defs>
      <text
        dy={shouldReverse ? "-8" : "12"}
        fill="#333"
        fontSize={8}
        className="text-[8px] md:text-[11px]"
        fontWeight="bold"
      >
        <textPath xlinkHref={`#${pathId}`} {...textProps}>
          {payload.value}
        </textPath>
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
      { subject: 'HEALTH', value: formData.health || 5, fullMark: 10 },
      { subject: 'RECREATION & FUN', value: formData.recreation || 5, fullMark: 10 },
      { subject: 'FRIENDS & FAMILY', value: formData.relationships || 5, fullMark: 10 },
      { subject: 'ROMANCE', value: formData.romance || 5, fullMark: 10 },
      { subject: 'FINANCES', value: formData.finance || 5, fullMark: 10 },
      { subject: 'PHYSICAL ENVIRONMENT', value: formData.environment || 5, fullMark: 10 },
      { subject: 'WORK / CAREER', value: formData.career || 5, fullMark: 10 },
      { subject: 'SPIRITUAL & EMOTION', value: formData.spiritual || 5, fullMark: 10 }
    ]);
    
    setMounted(true);
  }, [formData]);

  // Function to download chart as image
  const downloadChart = () => {
    if (!chartRef.current) return;
    
    // Remove any TailwindCSS classes that use oklch colors before capture
    const elements = chartRef.current.querySelectorAll('[class*="bg-"]');
    const originalClasses = new Map();
    
    elements.forEach(el => {
      originalClasses.set(el, el.getAttribute('class'));
      
      // Replace any Tailwind classes that might use oklch with basic colors
      const classList = el.getAttribute('class').split(' ');
      const filteredClasses = classList.filter(cls => 
        !cls.includes('oklch') && !cls.includes('bg-gradient')
      );
      
      el.setAttribute('class', filteredClasses.join(' '));
    });
    
    // Set explicit background to white for the capture
    const originalStyle = chartRef.current.getAttribute('style') || '';
    chartRef.current.setAttribute('style', `${originalStyle}; background-color: #FFFFFF !important;`);
    
    // Set background to white for the capture
    html2canvas(chartRef.current, {
      backgroundColor: '#FFFFFF',
      useCORS: true,
      scale: 2, // Higher resolution
      removeContainer: true,
      onclone: (clonedDoc, element) => {
        // Any additional modifications to the cloned document if needed
        element.style.backgroundColor = '#FFFFFF';
      }
    }).then(canvas => {
      // Convert to JPEG
      const imageData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'balance-wheel.jpg';
      link.href = imageData;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restore original classes
      elements.forEach(el => {
        el.setAttribute('class', originalClasses.get(el));
      });
      
      // Restore original style
      chartRef.current.setAttribute('style', originalStyle);
    });
  };

  // Effect to expose the download function to parent components
  useEffect(() => {
    if (typeof onDownload === 'function') {
      onDownload(downloadChart);
    }
    
    // Expose the download function globally for the download button
    if (typeof window !== 'undefined') {
      window.downloadBalanceWheel = downloadChart;
    }
    
    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        window.downloadBalanceWheel = null;
      }
    };
  }, [onDownload]);

  // Create an array of ticks from 1 to 10
  const ticks = Array.from({ length: 10 }, (_, i) => i + 1);

  // If not mounted or no formData, show a loading placeholder
  if (!mounted || !formData) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-white rounded-full">
        <p>Loading balance wheel...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full overflow-hidden flex items-center justify-center">
        <Image
          src="/assets/roundtext.svg"
          width={280}
          height={280}
          className="md:w-[560px] md:h-[560px] object-cover"
          alt="wheel background"
        />
      </div>
      <div ref={graphRef} className="relative w-full h-[280px] md:h-[400px] max-w-[280px] md:max-w-[600px] bg-white rounded-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid 
              gridType="circle"
              stroke="rgba(0, 0, 0, 0.15)" 
              radialLines={true}
              gridCount={10}  // Exactly 10 rings
              radialLineProps={{
                strokeDasharray: "3 3",
                strokeOpacity: 0.75
              }}
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={<CustomAngleTick />}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 10]} 
              tick={<CustomTick />}
              tickCount={10}
              ticks={ticks}
              stroke="rgba(0, 0, 0, 0.1)"
              axisLine={false}
            />
            <Radar 
              name="Life Balance" 
              dataKey="value" 
              stroke="#19667a"         
              fill="#19667a"           
              fillOpacity={0.3}        
              dot={<CustomDot />}      
              data={data}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceWheel;