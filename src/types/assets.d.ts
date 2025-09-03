declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.sql";

declare module "*.svg?react" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}