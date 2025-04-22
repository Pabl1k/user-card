import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.sass';

interface Props {
  text: string;
  children: ReactNode;
}

const Tooltip: FC<Props> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({ top: rect.bottom + 5, left: rect.left + 10 });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    setPosition(null);
  };

  return (
    <>
      <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </span>
      {isVisible &&
        position &&
        createPortal(
          <div
            ref={tooltipRef}
            className="tooltip"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
