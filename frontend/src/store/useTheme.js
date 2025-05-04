import { create } from "zustand";

export const useThemeStore = create((set) => {
    let initialTheme = "light";

  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("chat-theme");
    if (storedTheme) initialTheme = storedTheme;
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("chat-theme", theme);
      }
      set({ theme });
    },
  };
});
