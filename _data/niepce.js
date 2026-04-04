// Niepce's configuration
// Read the wiki https://github.com/GoOz/Niepce/Wiki for more informations

export default {
	// WEBSITE INFORMATIONS
	title: "Niepce",
	url: "https://portfolio.niepce.tld",
	language: "en",
	locale: "en_US",
	description: "Niepce's personal portfolio",
	author: {
		name: "Nicéphore Niépce",
		email: "nicephore@niepce.tld",
		url: "https://www.niepce.tld"
	},

	// SPLASH SCREEN
	splash: "false",
	splash_link: "Browse",
	splash_line: "Take a look at my work…",

	// THEME
	theme: "niepce",
	theme_variant: "auto", // "light" | "dark" | "auto"
	grid: "masonry", // "justified" | "instagrid" | "masonry" | "monocolumn"

	// THEME OPTIONS
  optional_pages: {
    categories: true,
    serieslist: true,
    archives: true
  },
	animations: true,
	logo: "",
  categories_nav: true,
	exif: true,
	tags: true,
	shop_link: "Buy a print",

	// SOCIAL NETWORKS
	social_banner: "",
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

	// EXTRA NAVIGATION
	links: [
		{
			label: "Blog",
			url: "https://blog.foojin.com",
		},
	],
}
