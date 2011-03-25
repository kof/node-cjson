var a = require('assert');
var cjson = require('../lib/cjson');
var fixtures = __dirname + '/fixtures';

var data = {
    conf1: {key: 'value'},
    conf2: {key: 'value'},
    conf3: {key: 'value'},
    conf4: {
        "//key" : "value",
        "key": "//value",
        "/*key": "value",
        "key": "/*value*/"
    },
    conf5: {"'key/*test*/'": "'value//test'"},
    conf6: {"key\"/*test*/": "value\"//test"},
    conf7: {"key": "{{root}}/src"}

};


a.doesNotThrow(function() {
    cjson.load(fixtures + '/conf1.json');
}, 'valid config loaded');


a.deepEqual(cjson.load(fixtures + '/conf1.json'), data.conf1, 'data is correct');

a.deepEqual(cjson.load(fixtures + '/conf2.json'), data.conf2, 'singleline comment');

a.deepEqual(cjson.load(fixtures + '/conf3.json'), data.conf3, 'multiline comment');

a.deepEqual(cjson.load(fixtures + '/conf4.json'), data.conf4, 'comments inside of a string');

a.deepEqual(cjson.load(fixtures + '/conf5.json'), data.conf5, 'single and double quotes mix');

a.deepEqual(cjson.load(fixtures + '/conf6.json'), data.conf6, 'escaped double quote inside of a string');

a.deepEqual(cjson.load(fixtures + '/conf7.json', {replace: {root: '/usr'}}), {"key": "/usr/src"}, 'tmpl replacement');

var data1 = {
    conf1: {key: 'value'},
    conf6: data.conf6
};

a.deepEqual(cjson.load([fixtures + '/conf1.json', fixtures + '/conf6.json']), data1, 'load array of jsons');


var data2 = {
    key: 'value',
    "key\"/*test*/": "value\"//test"
};

a.deepEqual(cjson.load([fixtures + '/conf1.json', fixtures + '/conf6.json'], true), data2, 'load array of jsons and merge them');

a.deepEqual(cjson.load(fixtures), data, 'load all and merge them');


console.log('All tests passed.');

