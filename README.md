# Niepce

An Eleventy Starter kit for a portfolio site.

## What is Niepce?

It's a starter kit to help you build you own static portfolio/art gallery website without having to do everything from scratch yourself.

It's ready to be build as it is but you'll have to set some things up to make it your own.

## Demo

Currently used on my own [portfolio](https://gooz.photography/) but this tool comes with several example pages so you can quickly serve locally and see it in action if you want to start playing with it immediately.

_NB: Note that most of example pictures are from Unsplash.com and are credited in their own page._

## What kind of features to expect

### Dark and light theme

You'll be able to choose between a dark theme, a light theme or let it be automatic and let the user's preferences choose for you.

#### Dark theme

![dark theme](readme_assets/dark-theme.png)

#### Light theme

![light theme](readme_assets/light-theme.png)

#### Splash screen

![Splash screen](readme_assets/splash-screen.png)

You can choose to have a splash screen with a smooth slideshow of pictures of your choice.

### Choose your grid

There's 4 types of grid for your home or your tag pages and it doesn't have to be the same for both.

#### Justified

Like Flickr or 500px.

![justified grid](readme_assets/justified.png)

#### Masonry

Like Pinterest.

![masonry grid](readme_assets/masonry.png)

#### Instagrid

Like Instagram.

![insta grid](readme_assets/instagrid.png)

#### Monocolumn

No grid, just pictures after pictures.

![monocolumn](readme_assets/monocolumn.png)

### Display EXIF metadata

You can choose to display the EXIF metadata or not.

The metadata displayed (if available) are:

- camera's brand and model
- shutter speed
- focal length
- aperture
- ISO
- date of when the picture was taken

### Display tags

Display tags or not on post pages.

If you tag your photo with only one tag it may be not relevant to show it on the post page, in that case you can choose to hide it.

### Selling prints

Whether you have your own selling platform or you prefer to deal with it yourself by hand, you can add a link to buy a print of a picture and maintain your available stock.

### External links

You have the ability to add any external links in the menu and even more, if you have social networks accounts, you'll be able to easily add your links.

## How to setup your portfolio

First things first, clone or download this repository. Once you have it on your computer it's time to start coding.

### Configuration

This starter kit being an eleventy project has to be setup like an eleventy project.

First, edit the file `_data/metadata.json` file.
You'll want to edit it all with your own information.

```json
{
	"title": "Niepce",
	"url": "https://portfolio.niepce.tld",
	"language": "en",
	"locale": "en_US",
	"description": "Niepce's personal portfolio",
	"author": {
		"name": "Nicéphore Niépce",
		"email": "nicephore@niepce.tld",
		"url": "https://www.niepce.tld"
	}
}
```

Then it's time to choose your theme preferences, to do so open the `_data/niepce.js` file and edit it as you see fit.

```js
module.exports = {
	splash: "true",
	splash_link: "Browse",
	splash_line: "Take a look at my work…",
	grid: "masonry",
	grid_tags: "justified",
	theme: "auto",
	animations: "true",
	logo: "",
	banner: "",
	exif: true,
	tags: true,
	shop_link: "Buy a print",
	socials: {
		"500px": "",
		behance: "",
		deviantart: "",
		flickr: "",
		glass: "https://glass.photo/gooz",
		instagram: "https://www.instagram.com/gooz/",
		notos: "",
		pixelfed: "https://pixelfed.social/i/web/profile/422334934806983747",
		tumblr: "",
	},
	links: [
		{
			label: "Blog",
			url: "https://blog.foojin.com",
		},
	],
	series: ["Scotland", "Iceland"],
}
```

**Key** `splash`\
**Value** `true | false`\
_Choose to have a splash screen as your homepage. If `false`, the homepage will be the most recent posts page, otherwise the link on the splash screen will lead to the most recent posts page and it will appear in the navigation._\
_Pictures in the slideshow will be the ones with the `featured: true` metadata._

**Key** `splash_link`\
**Value** `String`\
_Label for the link on the splash screen. This link will lead to the most recent posts page._

**Key** `splash_line`\
**Value** `String`\
_Welcome sentence to appear above the link to the most recent page. Leave it empty if you don't want to display any welcome sentence._

**Key** `grid`\
**Value** `masonry | justified | instagrid | monocolumn`\
_It's your grid choice for your home and tag pages._

**Key** `grid_tags`\
**Value** `masonry | justified | instagrid | monocolumn`\
_Grid of choice for your tag pages (categories & series). If undefined, the tag pages will display the same grid as the home page._

**Key** `theme`\
**Value** `light | dark | auto`\
_Choosing a specific theme will enforce it for everyone but choosing `auto` will display one or the other depending on the user preferences._

**Key** `animations`\
**Value** `true | false`\
_Displays small and smooth animations on images when pages load._

**Key** `logo`\
**Value** `String`

- _If you want to use a binary file then set the path to your logo (any image format that can be displayed in a HTML `img` tag). It can be anywhere in the `public` folder or even remote._
- _If it's a SVG and you want it inlined in the DOM so its color can change with the theme, add a suffix "-inline" to its filename (e.g. logo-inline.svg), store it anywhere in the `public` folder and make sure the SVG doesn't have colors set on paths and that there's no conflicting `fill="none"` attributes._
- _If there's no logo provided then the title you set in the `metadata.json` will be displayed instead._

**Key** `banner`\
**Value** `String`\
_Path to your site banner (any image format that can be displayed in a HTML `img` tag). It can be anywhere in the `public` folder or even remote. This image will only be used in [OpenGraph](https://ogp.me/) tags unless you decide to use it somewhere else._

**Key** `exif`\
**Value** `boolean`\
_Display or not the exif metadata of your pictures on the post page. If `true` and some exif metadata are not available, only those that are available will be displayed._

**Key** `tags`\
**Value** `boolean`\
_Display or not the tags of the picture on the post page._

**Key** `shop_link`\
**Value** `String`\
_Label of the link to buy prints._

**Key** `social`\
**Value** `Key (String): Value (String)`\
_Only the social networks with links provided will be displayed._\
_Note that if needed you can add an unlisted social network but if you want to do so you will need to add its own SVG icon in the `public/img/sprite` folder and name it exactly as the **key** used here._

**Key** `links`\
**Value** `Key (String): Value (String)`\
_If you want to add external links in your menu that's the way to go, provide a new object in the array with a label and an URL._

**Key** `series`\
**Value** `Array`\
_If you have collections of pictures on specific topics and you want them to have their own page, then apply to those pictures a specific tag and add that tag in the Array so it can be filtered from the generic tags and get a page in the series section._

There you go, you're ready to build your portfolio.

### Environment setup

_Prerequisites:_
You'll need [NPM](https://www.npmjs.com/) installed on your computer

Now, in your terminal, go into the repository and type…

```shell
npm install
```

It will install all the needed dependencies to run and build your portfolio. Now let's start a server to see how it looks like…

```shell
npm run start
```

This command will build the portfolio and run a local web server to test the website.

Once the server tells you…

```shell
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

It means you can open the http://localhost:8080/ URL in your browser.

_N.B.: the first time you run the command it will take some time, this is normal. There's a few post examples with pictures already and the build needs to process those._

### Creating your own posts and pages

Now that your website is up and running you can add your own content.\
Any content you want to add needs to be in the `content` folder, if you take a look, there's already some stuff in it.

The folders inside are posts examples and the `about.md` a standalone page example.\
Feel free to trash those (except maybe `feeds` & `sitemap` unless you know what you're doing) when you familiarized yourself with how to create posts and pages **but you should not delete the other files** (again, unless you know what you're doing).

The only specific thing to know about post and pages are the data you set in the _frontmatter_, the data at the top of the markdown files, like so:

```
---
title: Title of the post
date: 2023-09-20
photo: photo.jpg
photo_alt: Portrait
tags: [portrait, mary]
featured: true
print_max: 30
print_current: 12
print_show_max: true
print_link: "../shop/"
---
```

In details:

**Key** `title`\
**Value** `String`\
_The title of the post. It can be the title of your picture or something else._

**Key** `date`\
**Value** `String` (date in ISO date format: YEAR-MONTH-DAY)\
_Publishing date of the post (not the capture date of the picture which should appear in the EXIF metadata)._

**Key** `photo`\
**Value** `String`\
_Path and filename of your picture, relative to the markdown file of the post._

**Key** `photo_alt`\
**Value** `String`\
_Alternative text of your picture, used for screenreader users and in case the picture doesn't load for some reason._

**Key** `tags`\
**Value** `String or Array`\
_Categories where your picture should be filed. If you only have one you can just write it `tags: portrait` but if you have more then you'll need to write an array like so `tags: [portrait, mary]`._

**Key** `featured`\
**Value** `boolean`\
_Pin your picture as featured, it will appear in the splash screen's slideshow if you enabled it. If not, it will do nothing._

**Key** `print_max`\
**Value** `Number`\
_Maximum number of limited edition prints you would sell of that picture. Depending on the country you live in it can vary. For example, it's 30 in France._

**Key** `print_current`\
**Value** `Number`\
_Current number of prints sold. You'll need to update this number everytime you sell a print._

**Key** `print_show_max`\
**Value** `boolean`\
_Displays the maximum number of prints you can make. Hidden by default._

**Key** `print_link`\
**Value** `String`\
_URL to the page where the user can buy the print or to a page on your website explaining how to buy one. An exemple page (`shop.md`) exists to help you, remove it if you don't need it._

And that's about it.

### Customizing category pages

By default category pages are just displaying every pictures tagged with those categories but you can add some kind of context or description.\
To do so, you need to create a markdown file in the `_includes/tags/` folder and name it as the category
name. For example, for a "Landscape" category, you'll need to create a `landscape.md` file.

Now write, in markdown, whatever you need to write in that file.

There is an example already in this starter kit, don't forget to remove it if you don't plan on using it.

### Deployment

By now you should have a running portfolio with your own content… but it's only local, on your computer.

You need to find yourself a hosting provider who serves static files (which should be every provider actually) and have **NodeJS (>=18)** installed as well. Upload everything there.

Once this is done, you need to run `npm i && npm run build` to install the dependencies and build your site, then point the Apache config to the folder `_site`, this is where your portfolio is generated and what should be served by the webserver. Everything else is just there to generate this folder.

## Final words

For those of you wondering, the name **Niepce** comes from [Nicéphore Niépce](https://en.wikipedia.org/wiki/Nic%C3%A9phore_Ni%C3%A9pce), one of the earliest pioneers of photography.

If you face any problem of have any question, feel free to drop an [issue](https://github.com/GoOz/Niepce/issues).

Credits to the photography in the social media preview goes to [Zalfa Imani](https://unsplash.com/fr/@zalfaimani).
