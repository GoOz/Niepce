// Set the DOM as ready for JS
document.body.classList.add("js")

// Vars
let isNarrow = false

// Elements
const menuButton = document.querySelector(".menu")
const nav = document.querySelector(".nav")

// Events
menuButton.addEventListener("click", () => {
	nav.classList.toggle("open")
})

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
