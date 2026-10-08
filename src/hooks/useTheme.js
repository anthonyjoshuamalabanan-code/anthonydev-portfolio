import { useCallback, useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch {
      // localStorage unavailable
    }

    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Add/remove the dark class
    root.classList.toggle('dark', theme === 'dark');

    // Tell the browser which color scheme we're using
    root.style.colorScheme = theme;

    // Change browser/mobile address-bar color
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        theme === 'dark' ? '#1E1F22' : '#F7F9FD'
      );

    // Remember the user's choice
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage unavailable: theme still works for this session
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark'
    );
  }, []);

  return { theme, toggle };
}