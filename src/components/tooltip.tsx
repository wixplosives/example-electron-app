import { memo } from "react";

export namespace Tooltip {
  export interface Props {
    text: string;
  }
}

export const Tooltip = memo(function Tooltip({ text }: Tooltip.Props) {
  return (
    <div
      className="absolute left-full ml-3 bg-gray-900 text-white px-4 py-2 rounded-md text-base font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 pointer-events-none transition-all duration-200 delay-700 shadow-lg z-50"
      role="tooltip"
      aria-hidden={true}
      aria-live="polite"
    >
      {text}
    </div>
  );
});
