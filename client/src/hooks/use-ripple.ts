import { useCallback, useRef } from "react";

interface RippleStyle {
  left: number;
  top: number;
  width: string;
  height: string;
}

export function useRipple() {
  const rippleContainerRef = useRef<HTMLSpanElement>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rippleContainer = rippleContainerRef.current;

    if (!rippleContainer) return;

    // Remove existing ripples
    const existingRipples = rippleContainer.getElementsByClassName("ripple");
    for (let i = 0; i < existingRipples.length; i++) {
      const ripple = existingRipples[i];
      if (ripple.parentNode === rippleContainer) {
        rippleContainer.removeChild(ripple);
      }
    }

    // Create new ripple
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    const rippleStyle: RippleStyle = {
      left: event.clientX - rect.left - radius,
      top: event.clientY - rect.top - radius,
      width: `${diameter}px`,
      height: `${diameter}px`,
    };

    circle.style.width = rippleStyle.width;
    circle.style.height = rippleStyle.height;
    circle.style.left = `${rippleStyle.left}px`;
    circle.style.top = `${rippleStyle.top}px`;

    circle.classList.add("ripple");
    rippleContainer.appendChild(circle);

    // Remove ripple after animation
    setTimeout(() => {
      if (circle.parentNode === rippleContainer) {
        rippleContainer.removeChild(circle);
      }
    }, 600);
  }, []);

  return { rippleContainerRef, createRipple };
}
