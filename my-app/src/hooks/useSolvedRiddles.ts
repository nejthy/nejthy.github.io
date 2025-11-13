import { useState, useEffect } from "react";

export const useSolvedRiddles = () => {
  const [solvedRiddles, setSolvedRiddles] = useState<number[]>(() => {
    const saved = localStorage.getItem("solvedRiddles");
    return saved ? JSON.parse(saved) : [];
  });

  // Sleduj změny v localStorage pro vyřešené hádanky
  useEffect(() => {
    const checkSolved = () => {
      const saved = localStorage.getItem("solvedRiddles");
      if (saved) {
        setSolvedRiddles(JSON.parse(saved));
      }
    };

    // Zkontroluj při načtení
    checkSolved();

    // Sleduj změny v localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "solvedRiddles") {
        checkSolved();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Pro změny v aktuálním okně použij interval (storage event nefunguje ve stejném okně)
    const interval = setInterval(checkSolved, 300);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Funkce pro kontrolu, zda je hádanka vyřešena
  const isRiddleSolved = (day: number) => {
    return solvedRiddles.includes(day);
  };

  return {
    solvedRiddles,
    isRiddleSolved,
  };
};

