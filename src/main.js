import '@babel/polyfill';
import "./styles/main.pcss";
import "./scripts/hero";
import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/parallax-rockfest";
import "./scripts/parallax-rockmus";
import "./scripts/works-widget";
import "./scripts/validation";

if (process.env.NODE_ENV === "development") {
  /* Здесь указываются файлы, за которыми в dev
  режиме нужно следить и при их изменении перезагружать 
  страничку */

  // eslint-disable-next-line
  require("file-loader!./pug/pages/index.pug");
}

