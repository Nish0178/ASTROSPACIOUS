import { useState, useCallback } from 'react';
import { newsletterApi } from '../services/api/newsletterApi';

export type NewsletterStatus = "idle" | "loading" | "error" | "success" | "exists" | "empty";

export const useNewsletter = () => {
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const subscribe = useCallback(async (email: string) => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setStatus("empty");
      setErrorMessage("Please enter an email address.");
      return false;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    try {
      setStatus("loading");
      await newsletterApi.subscribe(trimmedEmail);
      
      setStatus("success");
      setErrorMessage("");
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
      
      return true;
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred.";
      
      // Map specific backend errors to UI states
      if (msg.toLowerCase().includes("already subscribed")) {
        setStatus("exists");
        setErrorMessage("This email is already subscribed!");
      } else {
        setStatus("error");
        setErrorMessage(msg);
      }
      
      return false;
    }
  }, []);

  const resetStatus = useCallback(() => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [status]);

  return { 
    subscribe, 
    status, 
    errorMessage, 
    resetStatus 
  };
};
