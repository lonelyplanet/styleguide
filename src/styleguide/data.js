import fs from "fs";
import path from "path";
import React from "react";
import { parse, resolver } from "react-docgen";
import pkg from "../../package.json";
import componentsJson from "../../components.json";
import glob from "glob";

// Obviously don't do this eventually...
const basePath = "/Users/jonathanc/LonelyPlanet/repos/guidebook-react/src/";
const examples = {};

const allComponents = glob.sync(`${basePath}/components/**/*.jsx`)
  .map((p) => {
    const relative = path.relative(basePath, p);

    let name = relative.match(/([\w]+)\/index.jsx$/);

    if (!name) {
      name = relative.match(/\/([\w]+).jsx$/)
    }

    if (!name) {
      return null;
    }

    return {
      name: name[1],
      path: relative,
    };
  });

const components = allComponents
  .map((c) => {
    const componentPath = c.path;
    const name = c.name;

    const componentJson = Object.keys(componentsJson).reduce((memo, n) => {
      const obj = componentsJson[n];

      if (obj.component === c.name) {
        memo.push({
          displayName: n,
          component: obj,
        });
      }

      return memo;
    }, [])[0];

    if (!componentJson) {
      console.log(`No docs found for ${c.name}`);
      return false;
    }

    const raw = fs.readFileSync(`${basePath}${componentPath}`, "utf8");
    const requirePath = componentPath.replace(/.jsx$/, ".js");
    let Component;

    try {
      Component = require(`guidebook-react/dist/${requirePath}`).default;
    } catch (e) {
      console.log(e);
      return false;
    }

    let docs;
    try {
      docs = parse(raw, resolver.findAllComponentDefinitions);
    } catch (e) {
      return false;
    }

    Component.displayName = name;

    const example = examples[name] || null;

    const info = Object.assign({
      name,
      path: requirePath,
      displayName: componentJson.displayName,
      Component,
      lpProps: componentJson.component.props,
      example,
      raw,
    }, docs[0]);

    return info;
  })
  .filter(c => c);

const ga = "(function(i,s,o,g,r,a,m){i[\"GoogleAnalyticsObject\"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\"script\",\"//www.google-analytics.com/analytics.js\",\"ga\");ga(\"create\", \"UA-4603832-6\", \"auto\");ga(\"send\", \"pageview\");";

const styleguide = Object.assign({
  components,
  examples,
  ga,
}, pkg);

module.exports = styleguide;
