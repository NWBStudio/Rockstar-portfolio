const fs = require("fs");

module.exports = {
  syntax: "postcss-scss",
  parser: 'postcss-scss',
  plugins: [
    require("postcss-easy-import")({
      extensions: ".pcss"
      /* Плагин позволяющий осуществлять удобный 
      импорт вида "blocks/*.pcss" */
    }),
    require("autoprefixer")({
      cascade: false
    }),
    require("postcss-advanced-variables")({
      /* Плагин резолвящий переменные
      из JSON файла в pcss файлах */
      variables: JSON.parse(
        fs.readFileSync("./src/styles/variables.json", "utf-8")
      )
    }),
    require("postcss-nested"), //для использования вложенностей через & как в SASS
    require("postcss-rgb"), //позволят писать rgba(#000, 0.5), можно и переменной
    require("postcss-inline-svg")({
      // Плагин конструкции svg-load для bg 
      removeFill: true,
      path: "./src/images/icons"
    }),
    require("cssnano"),//сжатие css
    require("postcss-pxtorem")({ //перевод из px в rem
      rootValue: 16, 
      propList: ["*", "!*border*"], //указание свойств обрабатываемых плагином
      selectorBlackList: [/^html$/] //исключение элементов из обработки по селекторам
    })
  ]
};
