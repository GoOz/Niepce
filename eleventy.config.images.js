const path = require("path");
const ExifReader = require("exifreader");
const eleventyImage = require("@11ty/eleventy-img");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = eleventyConfig => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode(
		"image",
		async function imageShortcode(src, alt, sizes) {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "webp", "auto"];
			let file = relativeToInputPath(this.page.inputPath, src);
			let metadata = await eleventyImage(file, {
				widths: [640, 812, 1200, 1400, "auto"],
				formats,
				sharpOptions: {
					animated: true,
				},
				outputDir: path.join(eleventyConfig.dir.output, "img"),
			});

			let imageAttributes = {
				alt,
				sizes: sizes || "100vw",
				loading: "lazy",
				decoding: "async",
			};
			return eleventyImage.generateHTML(metadata, imageAttributes);
		}
	);

	// OG Featured image
	eleventyConfig.addAsyncShortcode("ogPhoto", async function (src, baseUrl) {
		let imagedata = await eleventyImage(src, {
			widths: [600],
			formats: ["jpeg"],
			outputDir: path.join(eleventyConfig.dir.output, "img"),
		});

		let data = imagedata.jpeg[imagedata.jpeg.length - 1];
		return `<meta property="og:image" content="${baseUrl + data.url}">`;
	});

	// Feed image
	eleventyConfig.addAsyncShortcode(
		"feedPhoto",
		async function (src, alt, baseUrl) {
			let imagedata = await eleventyImage(src, {
				widths: [600],
				formats: ["jpeg"],
				outputDir: path.join(eleventyConfig.dir.output, "img"),
			});

			let data = imagedata.jpeg[imagedata.jpeg.length - 1];
			return `<img src="${baseUrl + data.url}" alt="${alt}" />`;
		}
	);

	// EXIF Data
	eleventyConfig.addNunjucksAsyncFilter(
		"getExifData",
		async function (image, callback) {
			const file = relativeToInputPath(this.page.inputPath, image);
			const exifData = await ExifReader.load(file);
			const extractedValues = {
				cameraBrand: exifData.Make?.description || "",
				cameraModel: exifData.Model?.description || undefined,
				shutterSpeed: exifData.ExposureTime?.description || undefined,
				FocalLength: exifData.FocalLength?.description || undefined,
				fStop: exifData.FNumber?.description.replace("f", "ƒ") || undefined,
				ISO: exifData.ISOSpeedRatings?.description || undefined,
				Date:
					exifData.DateTimeOriginal?.description
						.replace(":", "-")
						.replace(":", "-") || undefined,
			};
			callback(null, extractedValues);
		}
	);

	eleventyConfig.addPlugin(svgContents);
};
