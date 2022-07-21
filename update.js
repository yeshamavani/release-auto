const sourceloop = require("./versions.json");

const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { type } = require("os");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

function updateDeps(path) {
  try {
    const package = JSON.parse(readFileSync(join(path, "package.json")));
    Object.keys(sourceloop.sourceloop ?? {}).forEach((dep) => {
      if (package.dependencies && package.dependencies[dep]) {
        package.dependencies[dep] = sourceloop.sourceloop[dep];
      }
      if (package.devDependencies && package.devDependencies[dep]) {
        package.devDependencies[dep] = sourceloop.sourceloop[dep];
      }
      if (package.peerDependencies && package.peerDependencies[dep]) {
        package.peerDependencies[dep] = sourceloop.sourceloop[dep];
      }
    });
    Object.keys(sourceloop.loopback ?? {}).forEach((dep) => {
      if (package.dependencies && package.dependencies[dep]) {
        package.dependencies[dep] = sourceloop.loopback[dep];
      }
      if (package.devDependencies && package.devDependencies[dep]) {
        package.devDependencies[dep] = sourceloop.loopback[dep];
      }
      if (package.peerDependencies && package.peerDependencies[dep]) {
        package.peerDependencies[dep] = sourceloop.loopback[dep];
      }
    });
    writeFileSync(
      join(path, "package.json"),
      JSON.stringify(package, null, 2) + "\n"
    );
    console.log(`updated ${package.name}`);
  } catch (e) {
    console.log(`skipping ${path}: ${e}`);
  }
}

const projects = getDirectories("./projects");

const types = ["projects"];

types.forEach((type) => {
  const folders = getDirectories(join(".", type));
  folders.forEach((folder) => {
    if (!sourceloop.filter.includes(folder)) {
      updateDeps(join(".", type, folder));
    }
  });
});
