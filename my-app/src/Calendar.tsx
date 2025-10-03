import { useState } from "react";

interface Gift {
  day: number;
  content: string;
}

const gifts: Gift[] = Array.from({ length: 24 }, (_, i) => ({
  day: i + 1,
  content: `🎁 Dárek číslo ${i + 1}`,
}));

const Calendar = () => {
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  const today = new Date().getDate();
  const [opened, setOpened] = useState<number[]>(() => {
    const saved = localStorage.getItem("openedDays");
    return saved ? JSON.parse(saved) : [];
  });

  const openDay = (day: number) => {
    if (!opened.includes(day) && day <= today) {
      const newOpened = [...opened, day];
      setOpened(newOpened);
      localStorage.setItem("openedDays", JSON.stringify(newOpened));
    } else if (day > today) {
      alert("Toto okénko ještě nemůžeš otevřít!");
    }
  };

  return (
    <div>
      <div>
        {gifts.map((gift) => (
          <button key={gift.day} onClick={() => openDay(gift.day)}>
            {opened.includes(gift.day) ? gift.content : gift.day}
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            setOpened([]);
            localStorage.removeItem("openedDays");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Calendar;
