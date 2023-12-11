function eleventyComputedPermalink() {
	return (data) => {
		if (data.draft) {
			if (process.env.BUILD_DRAFTS) {
				return data.permalink
			}

			return false
		}

		return data.permalink
	}
}

function eleventyComputedExcludeFromCollections() {
	return (data) => {
		if (data.draft) {
			if (process.env.BUILD_DRAFTS) {
				return data.eleventyExcludeFromCollections
			}

			return true
		}

		return data.eleventyExcludeFromCollections
	}
}

module.exports.eleventyComputedPermalink = eleventyComputedPermalink
module.exports.eleventyComputedExcludeFromCollections =
	eleventyComputedExcludeFromCollections

module.exports = (eleventyConfig) => {
	eleventyConfig.addGlobalData(
		"eleventyComputed.permalink",
		eleventyComputedPermalink,
	)
	eleventyConfig.addGlobalData(
		"eleventyComputed.eleventyExcludeFromCollections",
		eleventyComputedExcludeFromCollections,
	)

	let logged = false
	eleventyConfig.on("eleventy.before", ({ runMode }) => {
		let text = "Excluding"
		if (runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true
			text = "Including"
		}

		if (!logged) {
			console.log(`[11ty/Niepce] ${text} drafts.`)
		}

		logged = true
	})
}
