declare module "*.svg" {
  const assetURL: string;
  export default assetURL;
}

declare module "*.png" {
  const assetURL: string;
  export default assetURL;
}

declare module "*.jpeg" {
  const assetURL: string;
  export default assetURL;
}

declare module "*.jpg" {
  const assetURL: string;
  export default assetURL;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
