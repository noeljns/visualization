const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = ({ mode }) => {
    return {
        mode,
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: "node_modules/@webcomponents/webcomponentsjs",
                        from: "**/*.js",
                        to: "webcomponents",
                    },
                ],
            }),
        ],
        devtool: mode === "source-map",
    };
};
