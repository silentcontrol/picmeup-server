#! /usr/bin/env node
var shell = require("shelljs");

shell.echo("Running shell commands...");
shell.exec(
  "export GOOGLE_APPLICATION_CREDENTIALS=diesel-skyline-216917-dbe6ae2f2dc6.json && node ./bin/www"
);
