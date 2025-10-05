import { useState } from "react";
import { Grid, GridItem, Button } from "@chakra-ui/react";

interface Gift {
  day: number;
  content: string;
}

const gifts: Gift[] = Array.from({ length: 24 }, (_, i) => ({
  day: i + 1,
  content: `🎁 Dárek číslo ${i + 1}`,
}));

const Calendar = () => {
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
      <Grid templateColumns="repeat(6, 1fr)" gap={4} mt={8}>
        {gifts.map((gift) => (
          <GridItem key={gift.day}>
            <Button
              w="100%"
              h="80px"
              bg={opened.includes(gift.day) ? "pink.200" : "gray.100"}
              onClick={() => openDay(gift.day)}
            >
              {opened.includes(gift.day) ? gift.content : gift.day}
            </Button>
          </GridItem>
        ))}
      </Grid>

      <Button
        colorScheme="red"
        mt={4}
        onClick={() => {
          setOpened([]);
          localStorage.removeItem("openedDays");
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default Calendar;
