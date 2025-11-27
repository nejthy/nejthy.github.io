import { Button, Dialog, Portal } from "@chakra-ui/react";
import { type ComponentType, type ReactNode } from "react";
import { Riddles } from "./Riddles";
import { useSolvedRiddles } from "./hooks/useSolvedRiddles";

// TypeScript workaround pro Chakra UI Dialog komponenty
const DialogRoot = Dialog.Root as unknown as ComponentType<any>;
const DialogBackdrop = Dialog.Backdrop as unknown as ComponentType<any>;
const DialogPositioner = Dialog.Positioner as unknown as ComponentType<any>;
const DialogContent = Dialog.Content as unknown as ComponentType<any>;
const DialogHeader = Dialog.Header as unknown as ComponentType<any>;
const DialogTitle = Dialog.Title as unknown as ComponentType<any>;
const DialogBody = Dialog.Body as unknown as ComponentType<any>;
const DialogFooter = Dialog.Footer as unknown as ComponentType<any>;
const DialogCloseTrigger = Dialog.CloseTrigger as unknown as ComponentType<any>;

interface GiftModalProps {
  open: boolean;
  onClose: () => void;
  day: number | null;
  content: ReactNode | null;
}

export const GiftModal = ({ open, onClose, day, content }: GiftModalProps) => {
  const { isRiddleSolved } = useSolvedRiddles();

  const isRiddleSolvedForDay = day ? isRiddleSolved(day) : false;

  const handleOpenChange = (e: { open: boolean }) => {
    if (!e.open) {
      onClose();
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={handleOpenChange}>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent
            maxW="550px"
            w={{ base: "90%", md: "550px" }}
            maxH="85vh"
            minW="320px"
          >
            <DialogHeader>
              <DialogTitle>🎁 Dárek číslo {day}</DialogTitle>
            </DialogHeader>
            <DialogBody
              display="flex"
              flexDirection="column"
              gap={4}
              maxH="65vh"
              overflowY="auto"
              px={4}
            >
              {/* Hádanka - zobrazí se pouze pokud není vyřešena */}
              {day && !isRiddleSolvedForDay && <Riddles day={day} />}

              {/* Obrázek - zobrazí se až po vyřešení hádanky */}
              {content && isRiddleSolvedForDay && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1rem auto",
                    padding: "1rem",
                    borderTop: "2px solid #e2e8f0",
                  }}
                >
                  {content}
                </div>
              )}

              {/* Zpráva, pokud hádanka není vyřešena */}
              {content && !isRiddleSolvedForDay && (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#718096",
                    fontStyle: "italic",
                    borderTop: "2px solid #e2e8f0",
                    marginTop: "1rem",
                  }}
                >
                  💡 Vyřeš hádanku, aby ses mohl podívat na obrázek!
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="solid">Zavřít</Button>
              </DialogCloseTrigger>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};
