import path from "path"
import fs from "node:fs"

import {
	InputPathToUrlTransformPlugin,
	HtmlBasePlugin,
	EleventyRenderPlugin,
} from "@11ty/eleventy"
import pluginRss from "@11ty/eleventy-plugin-rss"
import pluginNavigation from "@11ty/eleventy-navigation"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"

import pluginFilters from "./_config/filters.js"

import svgSprite from "eleventy-plugin-svg-sprite"
import ExifReader from "exifreader"
import svgContents from "eleventy-plugin-svg-contents"

export default async function (eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false
		}
	})
	// PassThroughCopy
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"node_modules/magic-grid/dist/magic-grid.min.js": "js/magic-grid.min.js",
	})
	eleventyConfig.addPassthroughCopy("./content/**/photo.jpg")

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}")

	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	})

	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	})

	// Official plugins
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(HtmlBasePlugin)
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
	eleventyConfig.addPlugin(EleventyRenderPlugin)

	eleventyConfig.addPlugin(pluginRss)

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["auto"],
		widths: [320, 812, 1400, "auto"],
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				sizes: "(min-width: 50em) 90vw, 100vw",
				loading: "lazy",
				decoding: "async",
			},
		},
		sharpOptions: {
			animated: true,
		},
	})

	// EXIF Data
	eleventyConfig.addNunjucksAsyncFilter(
		"getExifData",
		async function (image, callback) {
			const inputDir = path.dirname(this.page.inputPath)
			const imagePath = path.resolve(inputDir, image)
			const exifData = await ExifReader.load(imagePath)
			const extractedValues = {
				cameraBrand: exifData.Model?.description.includes(
					exifData.Make?.description,
				)
					? ""
					: exifData.Make?.description,
				cameraModel: exifData.Model?.description || undefined,
				shutterSpeed: exifData.ExposureTime?.description || undefined,
				FocalLength: exifData.FocalLength?.description || undefined,
				fStop: exifData.FNumber?.description.replace("f", "ƒ") || undefined,
				ISO: exifData.ISOSpeedRatings?.description || undefined,
				Date:
					exifData.DateTime?.description
						.replace(":", "-")
						.replace(":", "-")
						.replace(" ", "T") || undefined,
			}
			callback(null, extractedValues)
		},
	)

	eleventyConfig.addPlugin(svgContents)

	// Filters
	eleventyConfig.addPlugin(pluginFilters)

	// Community plugins
	eleventyConfig.addPlugin(svgSprite, {
		path: "./public/img/sprite",
	})

	// Return all the featured posts
	eleventyConfig.addCollection("featured", (collection) => {
		return collection.getAll().filter((post) => post.data.featured)
	})

	eleventyConfig.addFilter("fsExists", function (filename) {
		return fs.existsSync(filename)
	})
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

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

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	pathPrefix: "/",
}
