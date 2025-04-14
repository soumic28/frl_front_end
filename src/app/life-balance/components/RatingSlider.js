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
          {/* Static elements */}
          <path
            d="M7.47346 51.0891V65.6346H4.83851V53.653H4.75328L1.3513 55.8263V53.4116L4.96635 51.0891H7.47346Z"
            fill="white"
          />
          <path
            d="M433.355 51.0891V65.6346H430.72V53.653H430.635L427.233 55.8263V53.4116L430.848 51.0891H433.355ZM441.925 65.9116C440.755 65.9116 439.752 65.6156 438.914 65.0238C438.08 64.4272 437.439 63.5678 436.989 62.4457C436.544 61.3188 436.321 59.9622 436.321 58.3761C436.326 56.7899 436.551 55.4405 436.996 54.3278C437.446 53.2103 438.087 52.3581 438.921 51.7709C439.759 51.1838 440.76 50.8903 441.925 50.8903C443.09 50.8903 444.091 51.1838 444.929 51.7709C445.767 52.3581 446.409 53.2103 446.854 54.3278C447.304 55.4452 447.529 56.7946 447.529 58.3761C447.529 59.967 447.304 61.3259 446.854 62.4528C446.409 63.5749 445.767 64.4319 444.929 65.0238C444.096 65.6156 443.094 65.9116 441.925 65.9116ZM441.925 63.6886C442.834 63.6886 443.551 63.2411 444.077 62.3462C444.607 61.4466 444.872 60.1232 444.872 58.3761C444.872 57.2208 444.752 56.2501 444.51 55.4641C444.269 54.6781 443.928 54.0863 443.487 53.6886C443.047 53.2861 442.526 53.0849 441.925 53.0849C441.021 53.0849 440.306 53.5347 439.78 54.4343C439.254 55.3292 438.989 56.6431 438.985 58.3761C438.98 59.5361 439.096 60.5115 439.333 61.3022C439.574 62.0929 439.915 62.6895 440.355 63.092C440.796 63.4897 441.319 63.6886 441.925 63.6886Z"
            fill="white"
          />

          {/* This is an invisible rectangle covering the track area for better click detection */}
          <rect
            x="25"
            y="52"
            width="392"
            height="16"
            fill="transparent"
            style={{ pointerEvents: "all" }}
          />

          {/* Line with tick marks */}
          <path
            d="M25.9863 59.994L416.192 59.994L416.192 57.994L25.9863 57.994L25.9863 59.994Z"
            fill="#A3C2CA"
          />

          {/* Tick marks - we'll selectively show these based on screen size using CSS classes */}
          <g className="tick-marks">
            <path
              d="M372.336 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M328.481 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M284.627 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M240.772 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M196.918 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
            />
            <path
              d="M153.062 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick sm-tick"
            />
            <path
              d="M65.3535 55.118V62.87"
              stroke="#A3C2CA"
              strokeLinecap="round"
              className="tick md-tick"
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
          .tick.sm-tick {
            display: none;
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
          .tick.md-tick {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RatingSlider;
