const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: "0.0.0.0",
        port: "3000",
    },
    output: {
        publicPath: "auto",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app1",
            library: { type: "var", name: "app1" },
            filename: "app1.bundle.js",
            exposes: {
                "./App": { import: "./src/App", name: "app1_app" },
            },
            shared: {
                "react": { singleton: true },
                "react-dom": { singleton: true },
            },
        }),
        new HtmlWebpackPlugin({
            template: "template.html",
            excludeChunks: ["app1"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', ["@babel/preset-react", {
                            "runtime": "automatic"
                        }]]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
