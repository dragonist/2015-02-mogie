module.exports = {
    entry: "./components/index.jsx",
    output: {
        path: "./src/",
        filename: "bundle.js"
    },
    module:{
		loaders:[{
			test:/\.jsx$/,
			loader: 'jsx-loader?insertPragma=React.DOM&harmony'
		}]
	},
	externals:{
		'react':'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};