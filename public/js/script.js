document.addEventListener("DOMContentLoaded", function () {
	// Set the DOM as ready for JS
	document.body.classList.add("js");

	// Vars
	let isNarrow = false;

	// Elements
	const menuButton = document.querySelector(".menu");
	const nav = document.querySelector(".nav");

	// Events
	menuButton.addEventListener("click", () => {
		nav.classList.toggle("open");
	});

	// Utils
	function checkMedia() {
		isNarrow = window.matchMedia("(max-width:460px)").matches;
	}

	// Grids
	// --- Justified grid ---
	const justifiedGrid = document.querySelector(".justified");

	function updateJustified() {
		checkMedia();
		const items = document.querySelectorAll(".post");

		if (!isNarrow) {
			const rowRatio = Number(
				getComputedStyle(justifiedGrid).getPropertyValue(
					"--justified-row-ratio"
				)
			);
			const justifyScale = screen.height * rowRatio;

			items.forEach((item) => {
				let image = item.querySelector("img");

				let ratio = image.getAttribute("width") / image.getAttribute("height");
				item.style.width = justifyScale * ratio + "px";
				item.style.flexGrow = ratio;
			});
		} else {
			items.forEach((item) => {
				let image = item.querySelector("img");

				item.style.width = "auto";
				item.style.flexGrow = "1";
			});
		}
	}

	if (justifiedGrid) {
		updateJustified();
		window.addEventListener("resize", updateJustified, false);
	}

	// --- Masonry grid ---
	const masonryGrid = document.querySelector(".masonry");

	if (masonryGrid) {
		let magicGrid = new MagicGrid({
			container: ".masonry",
			static: true,
			animate: true,
			gutter: 8,
		});
		magicGrid.listen();
	}
});
