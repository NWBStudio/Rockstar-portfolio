import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./pug/pages/index.pug");
  require("file-loader!./pug/pages/login.pug");
}

import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/parallax-rockfest";
import "./scripts/parallax-rockmus";
import "./scripts/works-widget.js";
import "./scripts/validation.js";