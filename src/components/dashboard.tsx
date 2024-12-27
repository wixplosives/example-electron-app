import { useEffect, useState } from "react";
import * as icons from "@heroicons/react/24/outline";
import { Sidebar } from "./sidebar";

const menuItems: Sidebar.MenuItem[] = [
  { icon: icons.HomeIcon, name: "Home" },
  { icon: icons.FolderIcon, name: "Projects" },
  { icon: icons.ChartBarIcon, name: "Analytics" },
  { icon: icons.ChatBubbleLeftIcon, name: "Messages" },
  { icon: icons.CogIcon, name: "Settings", sticky: true },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Home";
  });
  const [isExpanded, setIsExpanded] = useState(() => {
    return localStorage.getItem("sidebarExpanded") !== "false";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", String(isExpanded));
  }, [isExpanded]);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        menuItems={menuItems}
      />
      <main
        className={`flex-1 p-6 overflow-auto transition-[margin-left] duration-300
        ${isExpanded ? "ml-64" : "ml-16"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">{activeTab}</h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-300">Content for {activeTab} panel goes here</p>
          </div>
        </div>
      </main>
    </div>
  );
}
