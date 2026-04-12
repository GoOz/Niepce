export default {
    tags: ["post"],
    layout: "layouts/post.njk",
    permalink: function ({ title }) {
        return `/${this.slugify(title)}/`
    },
}
