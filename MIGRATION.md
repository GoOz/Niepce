# Migration guide

## From `0.3.0` to `1.0.0`

All dependencies have been upgraded to their last version with `1.0.0` and it is for the best.
But a few breaking changes have emerged.

### Migrating to ESM
Because of ECMAScript Module, JS files must be compabitle with me and…
```js
module.exports = {
[…]
}
```
must be replaced by…
```js
export default {
[…]
}
```
List of files needing change:
- `content/content.11tydata.js`
- `content/feeds/feed.11tydata.js`
- `_data/niepce.js`

### Updating YAML Parser
The new YAML parser failed to parse one file.  
In the file `content/index.njk`, you'll need to replace tabs by spaces before `key` and `order`
```yaml
---
layout: layouts/base.njk
eleventyExcludeFromCollections: true
home: true
splashscreen: true
eleventyNavigation:
  key: Home
  order: 1
---
```

### Upgrading eleventy-img
This 11ty plugins has ben upgraded and it doesn't need and support the shortcode `{% Image %}` anymore.  

Everywhere `{% image %}` is used (mostly in `_includes` and `content`) it must be replaced by a markdowm image `![alternative text](url-of-the-photo)` or a HTML img tag <img src="url-of-the-photo" alt="alternative text">

### Migration tips
Depending on the amount of changes you made on your own instance, migration could be more or less tricky but I strongly suggest to backup your instance, get the new version of **Niepce** in and apply to it the changes you made (like your content and config files mostly).

Whatever the way you choose to migrate, run locally your instance to double check everything works fine. You'll see in the terminal any quirks that may happen and you'll know what to fix (hopefully).

Good luck ☜(ﾟヮﾟ☜)

