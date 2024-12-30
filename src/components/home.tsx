import { ChartBarIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, FolderIcon } from "@heroicons/react/24/outline";
import { version as reactVersion } from "react/package.json";
import { version as electronVersion } from "electron/package.json";
import { version as typescriptVersion } from "typescript/package.json";
import { version as tailwindVersion } from "tailwindcss/package.json";
import { memo } from "react";

export const Home: React.FC = () => {
  return (
    <div>
      <div className="pb-10">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">Example Electron Application</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300">A boilerplate to get started.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
        <TechCard
          title="Electron"
          description="Built on Electron framework, enabling cross-platform desktop applications using web technologies."
          icon="⚛️"
          version={electronVersion}
        />
        <TechCard
          title="TypeScript"
          description="Strongly-typed programming with TypeScript for better development experience and fewer runtime errors."
          icon="📘"
          version={typescriptVersion}
        />
        <TechCard
          title="React"
          description="Modern UI development with React, featuring component-based architecture and hooks."
          icon="⚛️"
          version={reactVersion}
        />
        <TechCard
          title="Tailwind CSS"
          description="Utility-first CSS framework for rapid UI development with beautiful, responsive designs."
          icon="🎨"
          version={tailwindVersion}
        />
      </div>

      <div className="mt-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Getting Started</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Explore the application using the sidebar navigation. You&apos;ll find:
        </p>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300">
            <FolderIcon className="w-6 h-6 text-blue-500" />
            <span>Project management tools</span>
          </li>
          <li className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300">
            <ChartBarIcon className="w-6 h-6 text-blue-500" />
            <span>Analytics dashboard</span>
          </li>
          <li className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500" />
            <span>Messaging system</span>
          </li>
          <li className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300">
            <Cog6ToothIcon className="w-6 h-6 text-blue-500" />
            <span>Application settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const TechCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  version: string;
}> = memo(function TechCard({ title, description, icon, version }) {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title} <span className="text-sm font-normal text-gray-500">v{version}</span>
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
});
