/*
 * CJSON - comments enabled json reader(Commented Javascript Object Notation)
 *
 * @author Oleg Slobodskoi
 */

var fs = require('fs'),
    Path = require('path');

/**
 * Remove single and multilie comments. Make sure to
 * leave them inside of strings.
 *
 * @param {string} str json file contents.
 * @return {string} newStr cleaned json.
 */
exports.decomment = function(str) {
    var i,
        curChar, nextChar, quote,
        newStr = '',
        comment;

    for (i = 0; i < str.length; ++i) {
        curChar = str.charAt(i);
        nextChar = str.charAt(i + 1);

        // it's either closing or opening quote and it is not escaped
        if (curChar === '"' && str.charAt(i - 1) !== '\\') {
            quote = curChar === quote ? null : curChar;
        }

        // we are not inside of a string
        if (!quote) {
            // singleline comment start
            if (curChar + nextChar === '//') {
                comment = 1;
            // singleline comment end
            } else if (comment === 1 && curChar === '\n') {
                comment = false;
                curChar = '';
            // multiline comment start
            } else if (curChar + nextChar === '/*') {
                comment = 2;
                ++i;
            // multiline comment end
            } else if (comment === 2 && curChar + nextChar === '*/') {
                comment = false;
                curChar = '';
                ++i;
            }

            if (comment) {
                curChar = '';
                ++i;
            }

        }

        newStr += curChar;
    }

    return newStr;
};


/**
 * Merge objects to the first one
 * @param {boolean|Object} deep if set true, deep merge will be done.
 * @param {Object} obj1 any object.
 * @param {Object} obj2 any object.
 * @return {Object} target merged object.
 */
exports.extend = (function() {

    var toString = Object.prototype.toString,
        obj = '[object Object]';

    return function extend(deep, obj1, obj2 /*, obj1, obj2, obj3 */) {
        // take first argument, if its not a boolean
        var args = arguments,
            i = deep === true ? 1 : 0,
            key,
            target = args[i];

        for (++i; i < args.length; ++i) {
            for (key in args[i]) {
                if (deep === true &&
                    target[key] &&
                    // if not doing this check you may end in
                    // endless loop if using deep option
                    toString.call(args[i][key]) === obj &&
                    toString.call(target[key]) === obj) {

                    extend(deep, target[key], args[i][key]);
                } else {
                    target[key] = args[i][key];
                }
            }
        }

        return target;
    };
}());


/**
 * Load and parse a config file/files.
 * @param {string|Array} path absolute path/paths to the file/files or dir.
 * @param {boolean=} merge if true, extend all jsons to the first one.
 * @return {Object} conf parsed json object.
 */
exports.load = function load(path, merge) {
    var data, paths, conf;

    if (Array.isArray(path)) {
        conf = {};
        path.forEach(function(path) {
            var data = load(path),
                filename;

            if (merge) {
                exports.extend(true, conf, data);
            } else {
                filename = Path.basename(path, '.json');
                conf[filename] = data;
            }
        });

        return conf;
    } else if (fs.statSync(path).isDirectory()) {
        paths = [];
        fs.readdirSync(path).forEach(function(filename) {
            if (/\.json$/.test(filename)) {
                paths.push(path + '/' + filename);
            }
        });

        return load(paths, merge);
    }

    data = fs.readFileSync(path, 'utf8');

    data = exports.decomment(data);

    return JSON.parse(data);
};
