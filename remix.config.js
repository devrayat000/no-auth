/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  publicPath: "/build/",
  // async routes(defineRoutes) {
  //   return defineRoutes((route) => {
  //     route("/@me", "routes/me.tsx");
  //   });
  // },
};
