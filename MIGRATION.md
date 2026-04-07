# Migration guide

## From any previous version to `1.0.0`

> [!CAUTION]
> **This major version is breaking a lot of things but your posts should be safe.**

If you did some custom changes on your side, note them or backup the files even because it's most likely that you won't able to add them back easily.

### Step 1: Backup your content and settings
So backup your `content` folder first!  
Then it is also strongly suggested to backup as well your `_data/` folder. You won't use as is but it will be convenient to keep your previous config files somewhere. Just in case.

### Step 2: Install the new version
Now the most straightforward way would be to install everything as a new instance and then apply your content so do that.  
So do that and get rid of everything there was before.

### Step 3: Re-apply your previous content
#### Configuration file
Next you'll notice that before we had two files in the `_data` folder: `metadata.json` and `niepce.js`, now both have been merged into one which is named cleverly named `niepce.js`.  

Open the file and re-apply what was in your previous files that you just backed up.  
Fair warning, you will find some new keys and others renamed, moved or even removed. Do your best.

#### Content
Then, for the content, if you look at the new architecture you'll see something like that:

```
content/
├─ pages/
├─ posts/
├─ blogposts/
```
The `pages` folder is for independant pages (like text only pages or list pages)  
The `posts` folder is for picture posts  
The `blogposts` folder is for… well blog posts which is one of the new features (so you shouldn't have anything to do there)  

Dispatch the content you backed up in those folder, where it belongs.

> [!CAUTION]
> Don't forget to empty the `posts` folder **except** the `posts.11tydata.js`, it needs to stay there, and as for the `pages` folder it would be best if you don't removed any files there but you should take a look at the [wiki](https://github.com/GoOz/Niepce/wiki) for more informations.

If all went well you should be able to run the server and see the changes before your eyes.  
You'll see in the terminal any quirks that may happen and you'll know what to fix (hopefully).

Good luck ☜(ﾟヮﾟ☜)

