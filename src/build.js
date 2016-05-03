import path from "path";
import React from "react"
import { renderToString } from "react-dom/server";
import Styleguide from "./styleguide/components/styleguide";
import fs from "fs";
import sass from "node-sass";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as props from "./styleguide/data";

const store = createStore(() => ({ styleguide: props }));

const rendered = renderToString(
  <Provider store={store}>
    <Styleguide />
  </Provider>
);

const rizzoPath = path.join(__dirname, "../node_modules/rizzo-next/dist");
const header = fs.readFileSync(path.join(rizzoPath, "header.html"));
const footer = fs.readFileSync(path.join(rizzoPath, "footer.html"));

const markup = `
<!DOCTYPE html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/codemirror.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/theme/monokai.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/codemirror.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/javascript/javascript.js"></script>
  <script>
    window.__initialState = { styleguide: ${JSON.stringify(props)} };
  </script>
</head>
<body>
${header}
<div id="app">
  ${rendered}
</div>
${footer}
<script src="styleguide.js"></script>
</body>
`;

fs.writeFileSync(__dirname + "/../dist/index.html", markup);
