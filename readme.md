## CJSON - comments enabled json loader (Commented Javascript Object Notation)

JSON has a good spec, is implemented in every language, has easy to read syntax and is much more powerfull then ini files.

JSON is perfect for writing config files, except of one problem - there is no comments, but sometimes config files get large and need to be commented.

Well, you could just evaluate json file as a javascript using one-liner, right?

The purpose of this module is to avoid dirty js configs and to enable clear, consistent, secure and shiny notation :)

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
	
## Installation

	npm install cjson