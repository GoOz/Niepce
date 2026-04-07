export default {
    tags: ["blogpost"],
    layout: "layouts/blogpost.njk",
    permalink: function ({ title }) {
        return `/${this.slugify(title)}/`
    },
}
