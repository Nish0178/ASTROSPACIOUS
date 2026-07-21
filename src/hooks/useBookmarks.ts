import { useEffect, useState } from "react";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");

    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarks)
    );
  }, [bookmarks]);

  const toggleBookmark = (id: number) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(x => x !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return {
    bookmarks,
    toggleBookmark,
  };
}