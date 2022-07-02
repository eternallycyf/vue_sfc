const refTemplate = /\<template\>(.+?)\<\/template\>/;
const regScript = /\<script\>(.+?)\<\/script\>/;
const refFirstSign = /({)/;

module.exports = function (source) {
  const _source = source.replace(/[\r\n]/g, '');
  const template = _source.match(refTemplate)[1];
  const script = _source.match(regScript)[1];

  const finalScript = script.replace(
    refFirstSign,
    '$1 template:' + '`' + template + '`' + ',',
  );
  return finalScript;
};
