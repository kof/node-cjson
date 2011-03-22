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

### cjson.load(path, [merge]);

Load config file from given path, array of paths or directory. Optionaly pass `true` as second param and configs will be merged together.
	
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


	
## Installation

	npm install cjson