const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === "production";
  const publicPath = '';

  const pcss = {
    test: /\.(p|post|)css$/,
    use: [
      //Передача данных по цепочке читается СНИЗУ-ВВЕРХ

      isProductionBuild ? MiniCssExtractPlugin.loader : "vue-style-loader",
      /* В случае если это сборка для прода,то CSS извлекается в отдельный файл, 
      если dev, то подключается в тег style*/

      "css-loader", //превращает переданный по цепочке css код в строку и подключает импорты
      "postcss-loader"//превращает код postcss в обычный css
    ]
  };

  const vue = {
    /** Работает со всеми встреченными 
     * импортами vue файла (с тегами template,
     * style, etc.)
     */
    test: /\.vue$/, 
    loader: "vue-loader"
  };

  const js = {
    test: /\.js$/,
    loader: "babel-loader", //поддерживаемые версии браузеров указываются в package.json
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env'],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    }
  };

  const files = {
    test: /\.(png|jpe?g|gif|woff2?)$/i,
    loader: "file-loader", //перемещает файлы в папку dist
    options: {
      name: "[hash].[ext]"
    }
  };

  const svg = {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader", //собирает спрайт и прописывает svg/use
        options: {
          extract: true,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
        }
      },
      "svg-transform-loader", 
      {
        loader: "svgo-loader", //удаляет всё лишнее из svg файлов
        options: {
          plugins: [
            { removeTitle: true },
            {
              removeAttrs: { //удаляет указанные атрибуты из кода svg
                attrs: "(fill|stroke)"
              }
            }
          ]
        }
      }
    ]
  };

  const pug = {
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ["pug-plain-loader"] //для работы с Vue файлами
      },
      {
        use: ["pug-loader"] //для работы с обычными файлами
      }
    ]
  };

  const config = {
    entry: { //точки входа в которых подключаются зависимости 
      main: "./src/main.js",
      admin: "./src/admin/main.js",
      login: "./src/main.js"
    },
    output: {//правила формирования выходных файлов и каталога в который их складывать
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[hash].build.js",
      publicPath: isProductionBuild ? publicPath : "",
      chunkFilename: "[chunkhash].js"
    },
    module: {//правила обработки зависимостей
      rules: [pcss, vue, js, files, svg, pug]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        images: path.resolve(__dirname, "src/images")
      },
      extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
      historyApiFallback: true, //нужен для SPA
      noInfo: false, //Включает логирование в консоль
      overlay: true //Отображение ошибок оверлеем на страничке
    },
    performance: {
      hints: false //отключает подсказки webpack
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/pug/pages/index.pug",
        chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
        template: "src/admin/index.pug",
        filename: "admin/index.html",
        chunks: ["admin"]
      }),
      new HtmlWebpackPlugin({
        template: "src/pug/pages/login.pug",
        filename: "login/index.html",
        chunks: ["login"]
      }),
      new SpriteLoaderPlugin({ plainSprite: true }), /*собирает файл со спрайтом
      если использовать только loader, то спрайт подключается целиком на страницу*/

      new VueLoaderPlugin() //требуется для vue-loader
    ],
    devtool: "#eval-source-map"
  };

  if (isProductionBuild) { //доп-действия для прода
    config.devtool = "none";
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"'
          /*Передаём в плагины и зависимости 
          переменную окружения*/  
        }
      }),
      new MiniCssExtractPlugin({ //экспорт стилей в отдельные файлы
        filename: "[name].[contenthash].css",
        chunkFilename: "[contenthash].css"
      })
    ]);

    config.optimization = {};

    config.optimization.minimizer = [
      new TerserPlugin({ //сжимает JS код
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({}) //сжимает CSS в файлах
    ];
  }

  return config;
};
