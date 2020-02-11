import "./styles/main.pcss";

if (process.env.NODE_ENV === "development") {
  /* Здесь указываются файлы, за которыми в dev
  режиме нужно следить и при их изменении перезагружать 
  страничку */
  require("file-loader!./pug/pages/index.pug");
  require("file-loader!./pug/pages/login.pug");
}

import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/parallax-rockfest";
import "./scripts/parallax-rockmus";
import "./scripts/works-widget.js";
import "./scripts/validation.js";