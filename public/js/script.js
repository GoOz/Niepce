// Set the DOM as ready for JS
document.body.classList.add("js")

// Vars
let isNarrow = false

// Elements
const menuButton = document.querySelector(".menu")
const slideshowButton = document.querySelector(".playpause")
const nav = document.querySelector(".nav")
const slides = document.querySelectorAll(".slideshow > li")
const prevPost = document.querySelector(".footer-nav-prev a")
const nextPost = document.querySelector(".footer-nav-next a")

// Events
menuButton.addEventListener("click", () => {
	nav.classList.toggle("open")
})
if (slideshowButton) {
	slideshowButton.addEventListener("click", (e) => {
		const isPaused = slideshowButton.getAttribute("data-paused") === "true"
		const newLabel = isPaused ? "Pause" : "Play"

		document
			.querySelector(".slideshow > li:first-of-type")
			.classList.toggle("paused")

		slideshowButton.setAttribute("aria-label", newLabel)
		slideshowButton.setAttribute("data-paused", !isPaused + "")
	})
}

if (nextPost || prevPost) {
	document.addEventListener("keyup", (e) => {
		if (prevPost && e.key === "ArrowLeft") prevPost.click()
		if (nextPost && e.key === "ArrowRight") nextPost.click()
	})
}

// Utils
function checkMedia(size) {
	isNarrow = window.matchMedia(`(max-width:${size}px)`).matches
}

// Grids
// --- Justified grid ---
const justifiedGrid = document.querySelector(".justified")

function updateJustified() {
	checkMedia(460)
	const items = document.querySelectorAll(".post")

	if (isNarrow) {
		items.forEach((item) => {
			let image = item.querySelector("img")
			item.removeAttribute("style")
		})
	} else {
		const rowRatio = Number(
			getComputedStyle(justifiedGrid).getPropertyValue("--justified-row-ratio"),
		)
		const rowHeight = screen.height * rowRatio

		items.forEach((item) => {
			let image = item.querySelector("img")

			let ratio = image.getAttribute("width") / image.getAttribute("height")
			item.style.width = rowHeight * ratio + "px"
			item.style.flexGrow = ratio
		})
	}
}

if (justifiedGrid) {
	updateJustified()
	window.addEventListener("resize", updateJustified)
}

// --- Masonry grid ---
const masonryGrid = document.querySelector(".masonry")

if (masonryGrid) {
	let magicGrid = new MagicGrid({
		container: ".masonry",
		static: true,
		gutter: 8,
	})
	magicGrid.listen()
}

// --- Splash slideshow ---
window.addEventListener("DOMContentLoaded", (e) => {
	if (!slides) return

	slides.forEach((current) => {
		current.addEventListener("animationend", (e) => {
			e.target.parentNode.appendChild(e.target)
		})
	})
})
