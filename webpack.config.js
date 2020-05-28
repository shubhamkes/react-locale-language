
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    // output: {
    //     path: path.resolve(__dirname, 'build'),
    //     filename: 'index.ts',
    //     libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    // },
    // output: {
    //     path: path.join(__dirname, "dist"),
    //     filename: "[name].[contenthash:8].ts",
    //     // filename: "[name].bundle.ts",
    //     chunkFilename: "[name].chunk.ts",
    //     libraryTarget: 'commonjs2'
    // },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
        library: ["react-locale-language", "[name]"],
        libraryTarget: "commonjs2",
    },
    // devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build|dist)/,
                use: {
                    loader: 'babel-loader',

                }
            }
        ]
    },
    externals: {
        'react': 'commonjs react', // this line is just to use the React dependency of our parent-platform-project instead of using our own React.
        '@types/react': 'commonjs @types/react'
    }
};

