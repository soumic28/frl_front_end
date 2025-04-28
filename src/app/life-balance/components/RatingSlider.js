// Responsive SVG slider component for rating questions
import { useState, useRef, useEffect } from "react";

const RatingSlider = ({ initialValue = 5, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [svgWidth, setSvgWidth] = useState(454);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  const containerRef = useRef(null);

  // SVG viewport constants
  const viewBoxWidth = 454;
  const viewBoxHeight = 74;
  const sliderTrackWidth = 390; // Width of the slider track in SVG coordinates
  const minValue = 1;
  const maxValue = 10;
  const leftOffset = 25; // Left edge position in SVG coordinates

  // Resize handler for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setSvgWidth(Math.min(454, containerWidth)); // Cap at original SVG width
      }
    };

    // Initial sizing
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate thumb position based on current value
  const getThumbPosition = (val) => {
    const percentage = (val - minValue) / (maxValue - minValue);
    return leftOffset + percentage * sliderTrackWidth;
  };

  // Calculate value from position (mouse or touch)
  const getValueFromPosition = (posX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    // Calculate effective width (excluding padding)
    const effectiveWidth = rect.width * (sliderTrackWidth / viewBoxWidth);
    const effectiveLeft = rect.left + rect.width * (leftOffset / viewBoxWidth);

    // Calculate percentage position along the slider
    const percentage = Math.max(
      0,
      Math.min(1, (posX - effectiveLeft) / effectiveWidth)
    );

    // Convert to value range
    const rawValue = minValue + percentage * (maxValue - minValue);
    return Math.min(Math.max(Math.round(rawValue), minValue), maxValue);
  };

  // Handle mouse events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValueFromEvent(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateValueFromEvent(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Handle touch events for mobile devices
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateValueFromEvent(e.touches[0]);
    e.preventDefault(); // Prevent scrolling when interacting with the slider
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      updateValueFromEvent(e.touches[0]);
      e.preventDefault(); // Prevent scrolling when dragging
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle click directly on the slider track
  const handleSliderClick = (e) => {
    // Only process direct clicks, not drag end events
    if (!isDragging) {
      updateValueFromEvent(e);
    }
  };

  const updateValueFromEvent = (e) => {
    const newValue = getValueFromPosition(e.clientX);
    setValue(newValue);
    if (onChange) {
      onChange({ target: { value: newValue } });
    }
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="mt-4 flex flex-col w-full max-w-full sm:max-w-[320px] md:max-w-[350px] px-2"
    >
      <div
        className="cursor-pointer w-full"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onClick={handleSliderClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          width="100%"
          height="auto"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* This is an invisible rectangle covering the track area for better click detection */}
          <rect
            x="25"
            y="25"
            width="390"
            height="30"
            fill="transparent"
            style={{ pointerEvents: "all" }}
          />

          {/* Number labels for 1 and 10 */}
          <text x="1" y="65" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">1</text>
          <text x="443" y="65" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">10</text>

          {/* Line with tick marks */}
          <path
            d="M25.9863 59.994L416.192 59.994L416.192 57.994L25.9863 57.994L25.9863 59.994Z"
            fill="#A3C2CA"
          />

          {/* Tick marks - we'll selectively show these based on screen size using CSS classes */}
          <g className="tick-marks">
            <path
              d="M26 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M65 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M104 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M143 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M182 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M221 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M260 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M299 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M338 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M377 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
          </g>

          {/* Left triangle */}
          <path
            d="M26.9863 57.994L16.9863 53.2205L16.9863 64.7675L26.9863 59.994L26.9863 57.994Z"
            fill="#A3C2CA"
          />

          {/* The thumb circle that will move */}
          <g
            ref={thumbRef}
            transform={`translate(${getThumbPosition(value)}, 58.6346)`}
            style={{ cursor: "grab" }}
            className="thumb-group"
          >
            <circle r="15.0574" fill="white" className="thumb-outer" />
            <circle r="10.0382" fill="#A3C2CA" className="thumb-inner" />

            {/* Number label - we'll adjust size based on screen size */}
            <g transform="translate(-6, -55)" className="value-bubble ">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-8 0C-11.4033 0 -14.1622 2.75893 -14.1622 6.16223V26.8426C-14.1622 30.2459 -11.4033 33.0048 -8 33.0048H-0.0718L4.24545 38.613L8.56271 33.0048H16.4942C19.8975 33.0048 22.6564 30.2459 22.6564 26.8426V6.16223C22.6564 2.75893 19.8975 0 16.4942 0H-8Z"
                fill="white"
                className="bubble-bg"
              />
              <text
                x="4"
                y="22"
                textAnchor="middle"
                fill="#19667A"
                fontSize="16"
                fontWeight="bold"
                className="value-text"
              >
                {value}
              </text>
            </g>
          </g>

          {/* Right circle */}
          <circle cx="416.192" cy="58.994" r="10.0382" fill="#A3C2CA" />
        </svg>
      </div>
      <div className="flex justify-between text-white text-xs sm:text-sm mt-2">
        <span>Low</span>
        <span>High</span>
      </div>

      {/* Inline CSS for responsive adjustments */}
      <style jsx>{`
        @media (max-width: 360px) {
          .value-bubble {
            transform: translate(-8, -25) scale(0.85);
          }
          .thumb-outer {
            r: 12;
          }
          .thumb-inner {
            r: 8;
          }
          text {
            font-size: 10px;
          }
        }

        @media (max-width: 280px) {
          .value-bubble {
            transform: translate(-8, -22) scale(0.75);
          }
          .thumb-outer {
            r: 10;
          }
          .thumb-inner {
            r: 7;
          }
          text {
            font-size: 8px;
          }
          text:nth-child(even) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RatingSlider;
