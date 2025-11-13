import { Button, Input, VStack, Text, Heading } from "@chakra-ui/react";
import { toaster } from "./toaster";
import { useState, useEffect } from "react";
import { riddles } from "./AllRiddles";

interface RiddlesProps {
  day: number;
}

export const Riddles = ({ day }: RiddlesProps) => {
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);

  // Najdi hádanku pro daný den
  const riddle = riddles.find((r) => r.day === day);

  // Reset při změně dne
  useEffect(() => {
    setAnswer("");
    setSolved(false);
    // Zkontroluj, zda je hádanka už vyřešena v localStorage
    const solvedRiddles = JSON.parse(
      localStorage.getItem("solvedRiddles") || "[]"
    );
    if (solvedRiddles.includes(day)) {
      setSolved(true);
    }
  }, [day]);

  // Pokud není hádanka pro daný den, zobraz zprávu
  if (!riddle) {
    return (
      <VStack gap={4} p={4}>
        <Text>Pro tento den není žádná hádanka.</Text>
      </VStack>
    );
  }

  const checkAnswer = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = riddle.correctAnswer.toLowerCase();

    if (userAnswer === correctAnswer) {
      toaster.create({
        title: "Správně! 🎉",
        description: "Odpověď je správná!",
      });
      setSolved(true);
      // Ulož do localStorage
      const solvedRiddles = JSON.parse(
        localStorage.getItem("solvedRiddles") || "[]"
      );
      if (!solvedRiddles.includes(day)) {
        solvedRiddles.push(day);
        localStorage.setItem("solvedRiddles", JSON.stringify(solvedRiddles));
      }
    } else {
      toaster.create({
        title: "Špatně! ❌",
        description: "Zkus to znovu!",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !solved) {
      checkAnswer();
    }
  };

  return (
    <VStack gap={4} p={4} align="stretch">
      <Heading size="md">🎯 Hádanka číslo {day}</Heading>
      <Text fontSize="lg" fontWeight="medium">
        {riddle.riddle}
      </Text>
      {solved ? (
        <VStack gap={2} align="stretch">
          <Text color="green.500" fontWeight="bold">
            ✅ Správná odpověď: {riddle.correctAnswer}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Tato hádanka je už vyřešena!
          </Text>
        </VStack>
      ) : (
        <VStack gap={2} align="stretch">
          <Input
            type="text"
            placeholder="Zadej svou odpověď..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={solved}
          />
          <Button
            onClick={checkAnswer}
            colorScheme="blue"
            disabled={!answer.trim() || solved}
          >
            Ověřit odpověď
          </Button>
        </VStack>
      )}
    </VStack>
  );
};
