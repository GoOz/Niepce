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
    url: "https://www.niepce.tld",
  },

  // SPLASH SCREEN
  splash: {
    enabled: true,
    link: "Browse",
    line: "Take a look at my work…",
  },

  // THEME
  theme: "niepce",
  theme_variant: "auto", // "light" | "dark" | "auto"
  grid: "monocolumn", // "justified" | "instagrid" | "masonry" | "monocolumn"

  // THEME OPTIONS
  ignored_pages: {
    archives: false,
    contact: false,
    blogposts: false,
  },
  home: {
    last_items: {
      enabled: true,
      nb_items: 8,
    },
    categories: true,
    series: true,
    blogposts: {
      enabled: true,
      nb_items: 3
    }
  },
  animations: true,
  logo: "",
  exif: true,
  shop_link: "Buy a print",
  form_url: "",
  form_sent_page: "/thank-you/",

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
}
