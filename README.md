# Example Electron Application

An example to showcase a typescript-based electron application.

Uses native esm everywhere possible (`main`, `renderer`, and `worker`), as electron 28 now supports it. `preload` bundle is still commonjs to allow sandbox.

Showcases creation of a direct communication channel between the renderer and a worker thread started by main. Revives itself upon window reload.

Filters file list in `forge.config.cjs`. Currently filters out `/node_modules`, but specific paths could be added upon need.

## Scripts

`npm run build` - bundles `src` into `dist` in **production** mode. No source-maps. Takes less than 200ms.

`npm run build:watch` - bundles `src` into `dist` in **development** mode and watches. Source-maps are generated.

`npm start` - runs `dist` using electron. If `dist` was built in development mode, `main` and `worker` are debuggable using VSCode's JavaScript Debug Terminal.

`npm run package` - builds `dist` into `out/example-electron-app-<arch>` containing a self contained electron application. Takes less than 2s.

`npm run make` - same as `npm run package`, but also builds `deb`, `rpm`, and `zip` packages into `out/make/<format>` folders.

`npm run build:full` - runs `npm run build` and `npm run make`.

`npm run typecheck` - checks sources using typescript.

## License

MIT
