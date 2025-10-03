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
  const [opened, setOpened] = useState<number[]>([]);

  const openDay = (day: number) => {
    if (!opened.includes(day)) setOpened([...opened, day]);
  };

  return (
    <div>
      {gifts.map((gift) => (
        <button key={gift.day} onClick={() => openDay(gift.day)}>
          {opened.includes(gift.day) ? gift.content : gift.day}
        </button>
      ))}
    </div>
  );
};

export default Calendar;
