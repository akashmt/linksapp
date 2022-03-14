const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],
//       },
//       // ...
//     ],
//   },
// };

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.module.rules.forEach((r) => {
    if (r.oneOf) {
      r.oneOf.forEach((o) => {
        if (o.use && o.use.loader && o.use.loader.includes("babel-loader")) {
          o.include = [
            path.resolve("."),
            path.resolve("node_modules/@kaloraat/react-native-text"),
          ];
        }
      });
    }
  });
  return config;
};
