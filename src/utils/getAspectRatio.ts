type GetAspectRatioDimParamsBase = {
	origWidth: number;
	origHeight: number;
}

type GetAspectRatioDimParamsWidth = {
	base: "width";
	width: number;
} & GetAspectRatioDimParamsBase;

type GetAspectRatioDimParamsHeight = {
	base: "height";
	height: number;
} & GetAspectRatioDimParamsBase;

type GetAspectRatioDimParams =
	GetAspectRatioDimParamsWidth |
	GetAspectRatioDimParamsHeight;

type GetAspectRatioDimReturn = {
	aspectRatio: number;
	width: number;
	height: number;
}

function _compHeight(origWidth: number, origHeight: number, width: number): number {
	return (origHeight / origWidth) * width;
}

function _compWidth(origWidth: number, origHeight: number, height: number): number {
	return height / (origHeight / origWidth);
}

export function getAspectRatioRect(params: GetAspectRatioDimParams): GetAspectRatioDimReturn {
	const {
		base,
		origHeight,
		origWidth
	} = params;

	const aspectRatio = origHeight / origWidth;

	switch ( base ) {
		case "height":
			return {
				aspectRatio,
				width: _compWidth(origWidth, origHeight, params.height),
				height: params.height
			};
		case "width":
			return {
				aspectRatio,
				width: params.width,
				height: _compHeight(origWidth, origHeight, params.width)
			};
		default:
			throw new Error("Base must to be specified!");
	}
}
