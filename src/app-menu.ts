import { shell } from "electron/common";
import { app, dialog, Menu } from "electron/main";

export const setApplicationMenu = () => {
  // based on: https://github.com/electron/electron/blob/main/lib/browser/default-menu.ts
  const githubURL = "https://github.com/wixplosives/example-electron-app";
  const isMac = process.platform === "darwin";
  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac ? ([{ role: "appMenu" }] as const) : []),
    { role: "fileMenu" },
    { role: "editMenu" },
    { role: "viewMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "GitHub",
          click: () => {
            shell.openExternal(githubURL).catch(console.error);
          },
        },
        {
          label: "About",
          click: (_menuItem, window) => {
            if (window) {
              dialog
                .showMessageBox(window, {
                  title: "About",
                  message: `${app.getName()} v${app.getVersion()}`,
                  detail: `by Wix.com`,
                  type: "info",
                  buttons: ["Close"],
                })
                .catch(console.error);
            }
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
