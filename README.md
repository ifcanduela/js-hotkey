# Hotkey

A simple JavaScript hotkey helper.

Attach a hotkey like this:

```js

hotkey('input#username', 'ctrl+shift+p', function (event) {
    console.log(this.tagName); // 'INPUT'
});
```

If you ommit the selector, the hotkey will be attached to the 
`<body>` element:

```js
hotkey('alt+a', function (event) {
    console.log(this.tagName); // 'BODY'
});

```
