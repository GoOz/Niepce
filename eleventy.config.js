const { DateTime } = require("luxon");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function(eleventyConfig) {
	// PassThroughCopy
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"node_modules/magic-grid/dist/magic-grid.min.js": "js/magic-grid.min.js"
	});
	eleventyConfig.addPassthroughCopy("./content/**/*.jpg");

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg,jpg}");

	// App plugins
	eleventyConfig.addPlugin(require("./eleventy.config.drafts.js"));
	eleventyConfig.addPlugin(require("./eleventy.config.images.js"));

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(bundlerPlugin);

	// Community plugins
	eleventyConfig.addPlugin(svgSprite, {
		path: "./public/img/sprite",
	});

	// Filters
	eleventyConfig.addFilter("readableDate", (date) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	return {
		templateFormats: [
			"md",
			"njk",
			"html",
		],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
			output: "_site"
		},
		pathPrefix: "/",
	};
};
