import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import * as icons from "@heroicons/react/24/outline";
import { Tooltip } from "./tooltip";

export namespace Sidebar {
  export interface MenuItem {
    icon: React.ElementType;
    name: string;
    sticky?: boolean;
  }

  export interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    menuItems: MenuItem[];
  }
}

export const Sidebar = memo(function Sidebar({
  activeTab,
  setActiveTab,
  isExpanded,
  setIsExpanded,
  menuItems,
}: Sidebar.Props) {
  const [activeTooltip, setActiveTooltip] = useState<string | undefined>(undefined);
  const showTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const clearTooltip = () => {
    clearTimeout(showTooltipTimeoutRef.current);
    showTooltipTimeoutRef.current = undefined;
    setActiveTooltip(undefined);
  };

  const toggleSidebar = useCallback(() => {
    clearTooltip();
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(showTooltipTimeoutRef.current);
    };
  }, [toggleSidebar]);

  const handleTooltipEnter = (name: string) => {
    clearTimeout(showTooltipTimeoutRef.current);

    if (activeTooltip) {
      setActiveTooltip(name);
    } else {
      showTooltipTimeoutRef.current = setTimeout(() => {
        setActiveTooltip(name);
      }, 700);
    }
  };

  const { regularItems, stickyItems } = useMemo(
    () => ({
      regularItems: menuItems.filter((item) => !item.sticky),
      stickyItems: menuItems.filter((item) => item.sticky),
    }),
    [menuItems],
  );

  return (
    <div
      className={`h-screen fixed flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white
                    transition-[width] duration-300 ease-in-out
                    ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div
          className={`transition-opacity duration-150 ${
            isExpanded ? "opacity-100 visible w-full" : "opacity-0 invisible w-0 absolute"
          }`}
        >
          <h1 className="text-xl font-bold">Example</h1>
        </div>
        {isExpanded ? (
          <button
            onClick={toggleSidebar}
            className="group relative p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-opacity duration-150"
            onMouseEnter={() => handleTooltipEnter("minimize")}
            onMouseLeave={clearTooltip}
          >
            <icons.XMarkIcon className="h-5 w-5" />
            {activeTooltip === "minimize" && <Tooltip text="Minimize Sidebar" />}
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="group relative p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded flex items-center justify-center"
            onMouseEnter={() => handleTooltipEnter("expand")}
            onMouseLeave={clearTooltip}
          >
            <icons.ChevronRightIcon className="h-5 w-5" />
            {activeTooltip === "expand" && <Tooltip text="Expand Sidebar" />}
          </button>
        )}
      </div>
      <nav className="flex-1">
        {regularItems.map(({ icon: Icon, name }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            onMouseEnter={() => !isExpanded && handleTooltipEnter(name)}
            onMouseLeave={clearTooltip}
            className={`group relative w-full flex items-center px-5 py-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200
                      ${activeTab === name ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          >
            <Icon className="h-6 w-6 min-w-[24px]" />
            <span
              className={`ml-4 whitespace-nowrap transition-opacity duration-150 ${
                isExpanded ? "opacity-100 visible relative" : "opacity-0 invisible absolute"
              }`}
            >
              {name}
            </span>
            {!isExpanded && activeTooltip === name && <Tooltip text={name} />}
          </button>
        ))}
      </nav>
      {stickyItems.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          {stickyItems.map(({ icon: Icon, name }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              onMouseEnter={() => !isExpanded && handleTooltipEnter(name)}
              onMouseLeave={clearTooltip}
              className={`group relative w-full flex items-center px-5 py-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200
                         ${activeTab === name ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            >
              <Icon className="h-6 w-6 min-w-[24px]" />
              <span
                className={`ml-4 whitespace-nowrap transition-opacity duration-150 ${
                  isExpanded ? "opacity-100 visible relative" : "opacity-0 invisible absolute"
                }`}
              >
                {name}
              </span>
              {!isExpanded && activeTooltip === name && <Tooltip text={name} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
