const envBackendUrl = import.meta.env.VITE_backend_url?.replace(/\/$/, "");

if (!envBackendUrl) {
	throw new Error("Missing VITE_backend_url. Set it in your frontend .env file.");
}

export const backendUrl = envBackendUrl;

export const getBackendUrl = () => backendUrl;

export const resolveBackendAssetUrl = (assetPath) => {
	if (!assetPath) return "";

	if (/^(?:https?:)?\/\//i.test(assetPath) || assetPath.startsWith("data:") || assetPath.startsWith("blob:")) {
		return assetPath;
	}

	const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
	return new URL(normalizedPath, `${backendUrl}/`).toString();
};
