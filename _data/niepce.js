// Niepce's config file
// Read the wiki https://github.com/GoOz/Niepce/Wiki for more informations
module.exports = {
	splash: "true", // Enable splash screen instead of homepage : "true" | "false"
	splash_link: "Browse", // Label of the link to enter your website
	splash_line: "Take a look at my work…", // Short welcome sentence. Leave empty if you don't want it to appear.
	grid: "masonry", // Grid of choice for the homepage: "justified" | "instagrid" | "masonry" | "monocolumn"
	grid_tags: "justified", // If specified, override the grid option for the tags pages (categories & series), same options as `grid`
	theme: "auto", // Theme of choice: "light" | "dark" | "auto"
	logo: "", // Path to your logo, if there is none, it will be replace by the title of the site. If it's a SVG and you want it inlined, add a suffix "-inline" to its filename (e.g. logo-inline.svg)
	banner: "", // Path to the banner image for OpenGraph sharing card (relative to site's url)
	exif: true, // Will show exif metadata if they are available: boolean
	tags: true, // Will show tags on posts: boolean
	socials: {
		// Fill those with your social profile urls if you have accounts there
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
		// Add external links in your navigation
		{
			label: "Blog",
			url: "https://blog.foojin.com",
		},
	],
	series: ["colorful"], // Add names of your series. e.g. ["foo", "bar"]
}
