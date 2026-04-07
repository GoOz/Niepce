import path from "path"

import {
	InputPathToUrlTransformPlugin,
	HtmlBasePlugin,
	EleventyRenderPlugin,
} from "@11ty/eleventy"
import rssPlugin from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation"
import { eleventyImageTransformPlugin, Image } from "@11ty/eleventy-img"

import pluginFilters from "./_config/filters.js"
import niepce from './_data/niepce.js'

import svgSprite from "eleventy-plugin-svg-sprite"
import svgContents from "eleventy-plugin-svg-contents"


export default async function (eleventyConfig) {
	// PassThroughCopy
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"node_modules/magic-grid/dist/magic-grid.min.js": "js/magic-grid.min.js",
	})

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}")

	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	})

	// Official plugins
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(HtmlBasePlugin)
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
	eleventyConfig.addPlugin(EleventyRenderPlugin)

	eleventyConfig.addPlugin(rssPlugin)

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["auto"],
		widths: [320, 812, 1400, "auto"],
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				sizes: "(min-width: 50em) 90vw, 100vw",
				loading: "lazy",
				decoding: "async",
			},
		},
		sharpOptions: {
			animated: true,
		},
	})

	// Filters
	eleventyConfig.addPlugin(pluginFilters)

	// Community plugins
	eleventyConfig.addPlugin(svgContents)
	eleventyConfig.addPlugin(svgSprite, {
		path: "./public/img/sprite",
	})

  // Collections
	// Return all the featured posts
	eleventyConfig.addCollection("featured", (collection) => {
		return collection.getAll().filter((post) => post.data.featured)
	})

  // Return all the pictures flagged as part of a category
	eleventyConfig.addCollection("category", (collection) => {
		return collection.getAll().filter((post) => post.data.category)
	})

  // Return all the pictures flagged as part of a series
	eleventyConfig.addCollection("series", (collection) => {
		return collection.getAll().filter((post) => post.data.series)
	})

  // Return all the categories types
	eleventyConfig.addCollection("categorylist", (collection) => {
    let results = []
    const category = collection.getAll().filter((post) => post.data.category)
    category.forEach((item) => {
        if (!results.includes(item.data.category)) {
            results.push(item.data.category);
        }
    })
    return results
	})

  // Return all the series types
	eleventyConfig.addCollection("serieslist", (collection) => {
    let results = []
    const series = collection.getAll().filter((post) => post.data.seriesName)
    series.forEach((item) => {
        if (!results.includes(item.data.seriesName)) {
          results.push(item.data.seriesName)
        }
    })
    return results
	})

  // Miscellaneous
  // Exclude ignored pages from build for better performance
  const pages = niepce.ignored_pages
  for (const page in pages) {
    if (pages[page] === true) {
      eleventyConfig.ignores.add(`content/pages/${page}.md`);
    } else {
      eleventyConfig.ignores.delete(`content/pages/${page}.md`);
    }
  }
  // Exclude includes content markdown
  eleventyConfig.ignores.add("**/include_*.md");
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: ["md", "njk", "html"],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content", // default: "."
		includes: "../_includes", // default: "_includes"
		data: "../_data", // default: "_data"
		output: "_site",
	},

	pathPrefix: "/",
}
