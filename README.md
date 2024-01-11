# Example Electron Application

An example to showcase a typescript-based electron application.

Uses native esm everywhere possible (`main`, `renderer`, and `worker`), as electron 28 now supports it. `preload` bundle is still commonjs to allow sandbox.

Showcases creation of a direct communication channel between the renderer and a worker thread started by main. Revives itself upon window reload.

## Scripts

`npm run build` - bundles `src` into `dist` in **production** mode. No source-maps.

`npm run build:watch` - bundles `src` into `dist` in **development** mode and watches. Source-maps are generated.

`npm start` - runs `dist` using electron. If `dist` was built in development mode, `main` and `worker` are debuggable using VSCode's JavaScript Debug Terminal.

`npm run package` - builds `dist` into `out/<arch>-unpacked` containing a self contained electron application.

`npm run make` - same as `npm run package`, but also builds `deb`, `rpm`, `snap`, and `zip` packages into `out`.

`npm run build:full` - runs `npm run build` and `npm run make`.

`npm run typecheck` - checks sources using typescript.

## Prerequisites for `build:full`

On a freshly installed Fedora 39, with all updates:

To build `.deb`:
`sudo dnf install dpkg fakeroot`

To build `.rpm`:
`sudo dnf install rpm-build`

## License

MIT
