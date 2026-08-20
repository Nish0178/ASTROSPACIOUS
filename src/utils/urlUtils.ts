export function getMediaUrl(path: string | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // Try to use VITE_BACKEND_URL if available, otherwise derive from VITE_API_URL, or default to localhost:5000
  let baseUrl = import.meta.env.VITE_BACKEND_URL;
  if (!baseUrl) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
    // Usually API_URL ends with /api/v1, so we strip it to get the base URL
    baseUrl = apiUrl.replace(/\/api\/v1\/?$/, "");
  }
  
  // Ensure we don't have double slashes
  if (baseUrl.endsWith("/") && path.startsWith("/")) {
    return `${baseUrl}${path.substring(1)}`;
  } else if (!baseUrl.endsWith("/") && !path.startsWith("/")) {
    return `${baseUrl}/${path}`;
  }
  return `${baseUrl}${path}`;
}
