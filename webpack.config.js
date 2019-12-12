const { resolve } = require("path")

module.exports = env => ({
    entry: {
        main: resolve("./src/index.ts"),
    },

    devtool: "inline-source-map",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: ["ts-loader"],
                exclude: [/node_modules/],
            },
        ],
    },

    mode: env.NODE_ENV || "development",

    resolve: {
        extensions: [".ts"],
    },
})
