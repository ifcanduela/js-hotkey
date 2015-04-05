/**
 * Attaches a hotkey listener to an element.
 *
 * A very simple wrapper to attach callback functions to key combinations.
 *
 * Trigger keys can be specified together with with `ctrl`, `shift` or `alt`, 
 * using the plus sign (`+`) as a separator, like this:
 *
 *     hotkey('body', 'ctrl + alt + h', function (ev) {
 *     	   alert("You pressed Ctrl, Alt and H in your keyboard");
 *     });
 * 
 * The signature for the callback is this:
 *
 *     function (event);
 *
 * Within the callback, the element that receives the event can be accessed
 * via `this` or with `event.target`.
 * 
 * @param  {string}   selector         A selector string to be used with document.querySelectorAll()
 * @param  {string}   keyCombination   A string of keys, like "shit+alt+p"
 * @param  {Function} callbackFunction The callback function
 * @return {boolean}                   False if a key is not provided
 */
function hotkey(selector, keyCombination, callbackFunction) {
	var checkCtrlKey = false,
		checkAltKey = false,
		checkShiftKey = false,
		key = false;

	// split the key combination into individual keys
	var keyList = keyCombination.split(/\s*\+\s*/);

	for (var k in keyList) {
		// combo requires CTRL key
		if (keyList[k] === 'ctrl') {
			checkCtrlKey = true;
			continue;
		}

		// combo requires ALT key
		if (keyList[k] === 'alt') {
			checkAltKey = true;
			continue;
		}

		// combo requires SHIFT key
		if (keyList[k] === 'shift') {
			checkShiftKey = true;
			continue;
		}

		// only one trigger key is allowed per hotkey, so it will be overwritten
		// if more than one is specified
		key = keyList[k];
	}

	if (!key) {
		return false;
	}

	// select all elements that match the selector and loop through them
	[].forEach.call(document.querySelectorAll(selector), function (el) {
		// add a KEYPRESS event listener to each element
		el.addEventListener('keypress', function (ev) {
			// exit early if the specified modifier key were not used
			if (checkCtrlKey && !ev.ctrlKey) return;
			if (checkAltKey && !ev.altKey) return;
			if (checkShiftKey && !ev.shiftKey) return;

			// call the callback function if the key matches
			if (ev.key === key) {
				return callbackFunction.call(ev.target, ev);
			}
	  	}, false);
	});

	return true;
};
