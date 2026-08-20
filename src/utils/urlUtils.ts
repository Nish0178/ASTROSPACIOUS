export function getMediaUrl(path: string | undefined): string {
  if (!path) return "";
  
  let baseUrl = import.meta.env.VITE_BACKEND_URL;
  if (!baseUrl) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
    baseUrl = apiUrl.replace(/\/api\/v1\/?$/, "");
  }

  // If path already starts with the correct baseUrl, return it
  if (path.startsWith(baseUrl)) return path;

  // Fix dev URLs leaked into production database
  if (path.startsWith("http://localhost:5000")) {
    path = path.replace("http://localhost:5000", "");
  } else if (path.startsWith("http://127.0.0.1:5000")) {
    path = path.replace("http://127.0.0.1:5000", "");
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  if (baseUrl.endsWith("/") && path.startsWith("/")) {
    return `${baseUrl}${path.substring(1)}`;
  } else if (!baseUrl.endsWith("/") && !path.startsWith("/")) {
    return `${baseUrl}/${path}`;
  }
  return `${baseUrl}${path}`;
}

