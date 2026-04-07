import { DateTime } from "luxon"
import path from "path"
import fs from "node:fs"
import Image from "@11ty/eleventy-img"

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (date) => {
		const dateObj = new Date(date)
		return dateObj.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	})

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
	})

	eleventyConfig.addFilter("fsExists", function (filename) {
		return fs.existsSync(filename)
	})

    // Returns Tags list
	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
            (tag) => ["all", "nav", "post", "pages", "featured", "series", "serieslist, blogpost"].indexOf(tag) === -1,
    )
  })

	async function getOGImageURL(src) {
		const inputDir = path.dirname(this.page.inputPath)
		const imagePath = path.resolve(inputDir, src)
		const outputDir = path.dirname(this.page.outputPath)
		const urlPath = this.page.url

		const stats = await Image(imagePath, {
			widths: [1400], // Width for Open Graph image
			formats: ["jpg"],
			outputDir: outputDir, // Output directory
			urlPath: urlPath, // Public URL path
			filenameFormat: function (hash, src, width, format) {
				return `${hash}-${width}.${format}`
			},
		})

		return stats.jpeg[0].url // Return the URL of the processed image
	}

	eleventyConfig.addFilter("getOGImageURL", getOGImageURL)

	async function getPhotoInfos(post, request) {
		const inputDir = path.dirname(post.inputPath)
		const imagePath = path.resolve(inputDir, post.data.photo)
		const outputDir = path.dirname(post.outputPath)
		const urlPath = post.url

		const stats = await Image(imagePath, {
			widths: [812], // Width
			formats: ["jpg"],
			outputDir: outputDir, // Output directory
			urlPath: urlPath, // Public URL path
			filenameFormat: function (hash, width, format) {
				return `${hash}-${width}.${format}`
			},
		})

		return stats.jpeg[0][request] // Returns requested information
	}

	eleventyConfig.addAsyncFilter("getPhotoInfos", getPhotoInfos)

  eleventyConfig.addFilter("findByFileSlug", (collection = [], slug = "") => {
    return collection.find((post) => post.fileSlug === slug)
  })

  eleventyConfig.addFilter("filterBySeries", (collection = [], series) => {
    return collection.filter((post) => post.data.series === series)
  })

  eleventyConfig.addFilter("filterByCategory", (collection = [], category) => {
    return collection.filter((post) => post.data.tags.includes(category))
  })

}
