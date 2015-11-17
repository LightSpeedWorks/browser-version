(function (global) {
	'use strict';

	function writeObject(name, obj) {
		var result = '';
		for (var i in obj) {
			if (i.slice(0, 1) === '_') continue;
			var elem = obj[i];
			if (typeof elem === 'boolean') continue;
			if (elem === null) continue;
			if (elem === undefined) continue;
			if (elem === 1 || elem === 0) continue;
			try {
				var str = JSON.stringify(elem, null, '  ') + '';
			} catch (e) {
				continue; // var str = e + '';
			}
			if (str.length > 300) continue; // str = '...';
			if (str !== 'undefined' && str !== 'null' &&
					str !== '{}' && str !== '[]' && str !== '""' && str !== '"0"')
				result += name + '.' + i + ' = ' + str + '\n';
		}
		return result;
	}

	if (typeof module !== 'undefined')
		module.exports = writeObject;
	else
		global.writeObject = writeObject;
})(Function('return this')());
