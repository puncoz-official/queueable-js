const { resolve } = require("path")

const config = {
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

    mode: process.env.NODE_ENV || "development",

    resolve: {
        extensions: [".ts"],
    },
}

module.exports = config
