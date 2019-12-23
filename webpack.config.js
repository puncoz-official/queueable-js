const { resolve, join } = require("path")

const ROOT = __dirname
const DESTINATION = join(ROOT, "/dist")

module.exports = env => ({
    mode: env.NODE_ENV || "development",

    devtool: env.NODE_ENV === "production" ? false : "inline-source-map",

    entry: {
        main: resolve(ROOT + "/src/index.ts"),
    },

    output: {
        filename: "index.js",
        libraryTarget: "umd",
        library: "queueable-js",
        path: DESTINATION,
    },

    context: ROOT,

    resolve: {
        extensions: [".ts"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: ["ts-loader"],
                exclude: [/node_modules/],
            },
        ],
    },
})
