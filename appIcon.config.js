import { URL, fileURLToPath } from "node:url";

export default {
	source: fileURLToPath(new URL("./src/assets/img/icons", import.meta.url))
};
