// The base URL should be configured via Vite env vars, falling back to localhost for dev
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface NewsletterResponse {
  success: boolean;
  message: string;
  data: any;
}

export const newsletterApi = {
  /**
   * Subscribes an email to the newsletter.
   * @param email The user's email address
   * @returns NewsletterResponse containing success status and message
   * @throws Error if the network fails or backend returns an error payload
   */
  subscribe: async (email: string): Promise<NewsletterResponse> => {
    try {
      const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to subscribe to the newsletter.");
      }

      return data;
    } catch (error: any) {
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error("Unable to connect to the server. Please check your internet connection.");
      }
      throw error;
    }
  }
};
