## CJSON - comments enabled json loader (Commented Javascript Object Notation)

JSON has a good spec, is implemented in every language, has easy to read syntax and is much more powerfull then ini files.

JSON is perfect for writing config files, except of one problem - there is no comments, but sometimes config files get large and need to be commented.

Well, you could just evaluate json file as a javascript using one-liner, right?

The purpose of this module is to avoid dirty js configs and to enable clear, consistent, secure, portable, JSON valid and shiny notation :)

CJSON supports javascript type of comments, singleline "//" and  multiline "/**/". It takes care about comments inside of json strings.

Example of such shiny config file:
	
	/*
	 * This is my app configuration file.
	 * 
	 */
	{
		"host": "localhost",
		// app is listening on this port
		"port": 8888
	}


## API

### load the module
	var cjson = require('cjson');

### cjson.load(path, [options]);

Load config file from given path, array of paths or directory. Second parameter is optional and can be a boolean or object. 

`options` defaults:
	{
		merge: false,
		replace: null
	}

If you pass `true` as second param, its the same like `{merge: true}`, so it is a shortcut for merge = true and will merge all configs together.
`replace` key in options triggers using micro template engine. Its value should be a hash, see `cjson.replace`.
 
Examples:
	
	// just one config 
	var conf = cjson.load('/path/to/your/config.json');

	// array of configs 
	var conf = cjson.load(['/path/to/your/config1.json', '/path/to/your/config2.json']);
	
	//output
	{
		config1: {key1: 'value1'}
		config2: {key2: 'value2'}
	}
	
	
	// use optional merge parameter
	// array of configs 
	var conf = cjson.load(['/path/to/your/config1.json', '/path/to/your/config2.json'], true);
	
	// output
	{
		key1: 'value1',
		key2: 'value2'
	}
	
	
	// load all config files from a directory
	var conf = cjson.load('/path/to/your/configs');
	
	// overwriting dev config with production
	var paths = ['/path/to/conf.json'];
	if (process.env.NODE_ENV ==='production') {
		paths.push('/path/to/conf-prod.json');
	}
	var conf = cjson.load(paths, true);

### cjson.extend([deep], target, object1, [objectN])

Merge the contents of two or more objects together into the first object. 

- `deep` If true, the merge becomes recursive.
- `target` The object to extend. It will receive the new properties.
- `object1` An object containing additional properties to merge in.
- `objectN` Additional objects containing properties to merge in.

Example:

	var object = $.extend({}, object1, object2);

### cjson.decomment(str)

Remove comments. It supports javascript style comments, singleline - '//' and multiline - '/* */'. It takes care about comments inside of key and value strings.


### cjson.replace(str, obj)

Micro template engine. Replace all strings {{key}} contained in obj.

Example:
	var str = '{"path": "{{root}}/src"}';
	cjson.replace(str, {root: '/usr'}); // '{"path": "/usr/src"}'  
	
## Installation

	npm install cjson