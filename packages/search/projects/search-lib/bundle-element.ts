import {ensureDir, readFileSync, writeFileSync, copySync} from 'fs-extra';
import {copyFile, rm} from 'fs/promises';
const concat = require('concat');

async function elementsBundler() {
  const space = 2;
  const files = [
    './dist/search-element/runtime.js',
    './dist/search-element/polyfills.js',
    './dist/search-element/main.js',
  ];
  // await ensureDir('./dist/element');
  // await concat(files, './dist/element/search-element.js');
  // await copyFile(
  //   './dist/search-element/styles.css',
  //   './dist/element/styles.css',
  // );
  // await rm('./dist/search-element', {recursive: true});
  // copySync('./dist/element', '../search-element/element');

  await ensureDir('../search-element/element');
  await concat(files, '../search-element/element/search-element.js');
  await copyFile(
    './dist/search-element/styles.css',
    '../search-element/element/styles.css',
  );
  await rm('./dist/search-element', {recursive: true});

  //copy the package.json and change the name to
  //so that element can be released separately with different name
  //the versions will be same
  // const packageJsonPath = './package.json';
  // const jsonObj = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  // jsonObj.name = 'search-element-dont-use';
  // delete jsonObj.peerDependencies;
  // writeFileSync(
  //   './dist/element/package.json',
  //   JSON.stringify(jsonObj, null, space),
  // );

  /// copy the entire element to another folder
  // as we cannot release it from same dist folder
}

elementsBundler();
