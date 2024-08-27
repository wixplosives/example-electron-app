import { shell } from "electron/common";
import { app, dialog, Menu } from "electron/main";

export const setApplicationMenu = () => {
  // based on: https://github.com/electron/electron/blob/main/lib/browser/default-menu.ts
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
          click: () =>
            shell.openExternal(
              "https://github.com/wixplosives/example-electron-app",
            ),
        },
        {
          label: "About",
          click: (_menuItem, window) =>
            window &&
            dialog.showMessageBox(window, {
              title: "About",
              message: `${app.getName()} v${app.getVersion()}`,
              detail: `by Wix.com`,
              type: "info",
              buttons: ["Close"],
            }),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
