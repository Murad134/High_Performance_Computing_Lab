const fallbackBackendUrl = "http://localhost:2500";

export const backendUrl =
	import.meta.env.VITE_backend_url?.replace(/\/$/, "") || fallbackBackendUrl;

export const getBackendUrl = () => backendUrl;

export const resolveBackendAssetUrl = (assetPath) => {
	if (!assetPath) return "";

	if (/^(?:https?:)?\/\//i.test(assetPath) || assetPath.startsWith("data:") || assetPath.startsWith("blob:")) {
		return assetPath;
	}

	const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
	return new URL(normalizedPath, `${backendUrl}/`).toString();
};
