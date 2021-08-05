const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: "0.0.0.0",
        port: "3001",
    },
    output: {
        publicPath: "auto",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app2",
            remotes: {
                app1: "app1@http://localhost:3000/app1.bundle.js",
            },
            shared: {
                "react": { singleton: true, requiredVersion: deps["react"] },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            },
        }),
        new HtmlWebpackPlugin({
            template: "template.html",
            excludeChunks: ["app2"],
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
