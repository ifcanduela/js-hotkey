# Hotkey

A simple JavaScript hotkey helper.

Attach a hotkey like this:

```js
hotkey('body', 'ctrl+shift+p', function (event) {
    console.log(this.tagName); // 'BODY'
});
```
