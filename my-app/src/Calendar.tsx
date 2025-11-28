import { useState } from "react";
import { Grid, GridItem, Button, VStack, Heading, Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { toaster } from "./toaster";
import { GiftModal } from "./modal";
import { useSolvedRiddles } from "./hooks/useSolvedRiddles";

interface Gift {
  day: number;
  content: ReactNode;
}

const gifts: Gift[] = Array.from({ length: 24 }, (_, i) => ({
  day: i + 1,
  content: (
    <img
      src={`/images/day${i + 1}.jpeg`}
      alt={`Dárek číslo ${i + 1}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "6px",
        display: "block",
      }}
    />
  ),
}));

const Calendar = () => {
  const today = new Date().getDate();
  const [opened, setOpened] = useState<number[]>(() => {
    const saved = localStorage.getItem("openedDays");
    return saved ? JSON.parse(saved) : [];
  });
  const { isRiddleSolved } = useSolvedRiddles();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDay = (day: number) => {
    if (!opened.includes(day) && day <= today) {
      const newOpened = [...opened, day];
      setOpened(newOpened);
      localStorage.setItem("openedDays", JSON.stringify(newOpened));
      // Otevři modal s obsahem tohoto dne
      setSelectedDay(day);
      setIsModalOpen(true);
    } else if (opened.includes(day) && day <= today) {
      // Pokud je den už otevřený, zobraz modal s obsahem
      setSelectedDay(day);
      setIsModalOpen(true);
    } else if (day > today) {
      toaster.create({
        title: "Ještě nemůžeš!",
        description: "Toto okénko se otevře později 🎅",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const resetCalendar = () => {
    setOpened([]);
    localStorage.removeItem("openedDays");
    localStorage.removeItem("solvedRiddles");
    toaster.create({
      title: "Kalendář resetován",
      description: "Všechna okénka byla zavřena 🎁",
    });
  };

  // Funkce pro kontrolu, zda se má zobrazit obrázek
  const shouldShowImage = (day: number) => {
    return opened.includes(day) && isRiddleSolved(day);
  };

  const selectedGift = selectedDay
    ? gifts.find((g) => g.day === selectedDay)
    : null;

  return (
    <>
      <Box
        minH="100vh"
        position="relative"
        backgroundImage="url('/images/vanoce.jpeg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "rgba(255, 255, 255, 0.1)",
          zIndex: 0,
        }}
      >
        <VStack gap={6} p={6} position="relative" zIndex={1}>
          <Heading size="lg">🎄 Adventní kalendář pro Ádika🎁</Heading>
          <Grid templateColumns="repeat(6, 160px)" gap={5}>
            {gifts.map((gift) => (
              <GridItem key={gift.day}>
                <Button
                  w="100%"
                  h="160px"
                  borderRadius="md"
                  bg={shouldShowImage(gift.day) ? "pink.200" : "gray.100"}
                  color={shouldShowImage(gift.day) ? "gray.700" : "black"}
                  fontSize="xl"
                  fontWeight="bold"
                  boxShadow="md"
                  p={0}
                  overflow="hidden"
                  position="relative"
                  _hover={{
                    transform: "scale(1.05)",
                    bg: shouldShowImage(gift.day) ? "pink.300" : "gray.200",
                  }}
                  transition="all 0.15s ease"
                  onClick={() => openDay(gift.day)}
                >
                  {shouldShowImage(gift.day) ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {gift.content}
                    </div>
                  ) : (
                    gift.day
                  )}
                </Button>
              </GridItem>
            ))}
          </Grid>

          <Button colorScheme="red" onClick={resetCalendar}>
            Resetovat kalendář
          </Button>
        </VStack>
      </Box>

      {/* Modal s obrázkem - obrázek se zobrazí pouze po vyřešení hádanky */}
      <GiftModal
        open={isModalOpen}
        onClose={closeModal}
        day={selectedDay}
        content={
          selectedDay && isRiddleSolved(selectedDay) && selectedGift
            ? selectedGift.content
            : null
        }
      />
    </>
  );
};

export default Calendar;
