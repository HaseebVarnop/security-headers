"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const toCamelCase = require(`change-case`).camel;
var key = '';
module.exports = (osmosis, url, followRedirects = true, hide = false, results = [], score) => new Promise((resolve, reject) => {
  osmosis(`https://securityheaders.io/`, _extends({
    q: url
  }, followRedirects ? { followRedirects: `on` } : {}, hide ? { hide: `on` } : {})).config(`user_agent`, `https://www.npmjs.com/package/security-headers`).set(`score`, `.score`).data(data => {

  score = data.score;
  }).find(`.reportSection`).set(`section`, `.reportTitle`).select(`.reportTable tr`).set({
    key: `.tableLabel`,
    value: `.tableCell`
  }).data(data => results.push(data)).done(() => resolve(results.reduce((all, data) => {
 
    const section = toCamelCase(data.section);
   
     console.log(data.key)
     if(data.key !=  undefined)
  {    key = [data.key].map(key =>key[key.length - 1] === `:` ? key.slice(0, key.length - 1) : key);
  }  else{
      console.log('lol')
    }
    const value = data.value;

    return _extends({}, all, {
      [section]: _extends({}, all.hasOwnProperty(section) ? all[section] : {}, {
        [section === `securityReportSummary` ? toCamelCase(key) : key]: value
      })
    });
  }, { score }))).error(error => reject(error));
});