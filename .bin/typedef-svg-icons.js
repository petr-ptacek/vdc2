import chokidar               from "chokidar";
import chalk                  from "chalk";
import { fileURLToPath, URL } from "node:url";
import { writeFile, readdir } from "node:fs/promises";
import { Command }            from "commander";
import config                 from "../appIcon.config.js";

const program = new Command("typedef-svg-icons");

program.option("-w, --watch", "run in watch mode", false);
program.parse();

const PATH_TO_ASSETS = config.source;
const PATH_TO_DESTINATION = getFilePath("typed-svg-icons.d.ts");
console.log(import.meta.url);
// console.log(PATH_TO_DESTINATION);

/**
 * @param {string} input
 * @returns {string}
 */
function getFilePath(input) {
	return fileURLToPath(new URL(input, new URL("..", import.meta.url)));
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isSvgFile(path) {
	return /^.+\.svg$/.test(path);
}

/**
 * @returns {Promise<string[]>}
 */
async function readAllSvgIcons() {
	const paths = await readdir(
		PATH_TO_ASSETS,
		{
			encoding: "utf-8",
			recursive: true
		}
	);

	return paths
		.filter(path => isSvgFile(path))
		.map(path => parseFileName(path))
		.filter(fileName => !!fileName);
}

/**
 * @param {string} path
 * @returns {string}
 */
function parseFileName(path) {
	// const pathChunks = path.split(sep);
	// const fileNameSuffixed = pathChunks.reverse()[0] ?? null;
	const [, fileName = ""] = /^(.+)\.svg$/.exec(path) ?? [];
	return fileName;
}

/**
 * @param {string[]} icons
 */
async function writeToFile(icons) {
	let content = `declare interface _SVGIcons_ {`;

	if ( icons.length ) {
		content += `${ icons.map(icon => `\n\t"${ icon }": "${ icon }";`).join("") }\n`;
	}

	content += "}";

	return writeFile(
		PATH_TO_DESTINATION,
		content,
		{ encoding: "utf-8", flag: "w+" }
	);
}

async function run() {
	console.log(
		chalk.bold.blue(
			`Process type definition of svg icons from ${ PATH_TO_ASSETS }`
		)
	);

	try {
		const icons = await readAllSvgIcons();
		await writeToFile(icons);
	} catch ( e ) {
		console.log(
			chalk.white.bgRed(e.message)
		);
	}

	console.log(
		chalk.bold.green(
			`Type definition were written to ${ PATH_TO_DESTINATION }`
		)
	);
}

await run();

if ( program.opts().watch ) {
	console.log(
		chalk.bold.blue(
			`Start watching from ${ PATH_TO_ASSETS }`
		)
	);

	const watcher = chokidar.watch(
		PATH_TO_ASSETS, {
			ignoreInitial: true
		});

	["change", "addDir", "add", "unlink", "unlinkDir"]
		.forEach(eventName => watcher.on(eventName, run));
} else {
	process.exitCode = 0;
	// process.exit(0);
}
