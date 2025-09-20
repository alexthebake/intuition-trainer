import { useState } from "react";

import { styled } from "@/styles/jsx";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";
import { Link } from "@/ui/Link";

const LINKS = {
  meaningInAbsurdity:
    "https://www.amazon.com/Meaning-Absurdity-bizarre-phenomena-reality-ebook/dp/B00770LCLW",
  espTrainer: "https://apps.apple.com/us/app/esp-trainer/id336882103",
  russelTarg: "https://en.wikipedia.org/wiki/Russell_Targ",
  github: "https://github.com/alexthebake/intuition-trainer",
};

export const Why: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <styled.div
        mt="16"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          Why?
        </Button>
      </styled.div>
      <WhyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

type WhyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WhyModal: React.FC<WhyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <styled.div display="flex" flexDirection="column" gap="4">
        <styled.h2 fontSize="xl" fontWeight="bold">
          Why?
        </styled.h2>
        <styled.p>
          In 2019 I became very interested in consciousness and the nature of
          reality. I now believe that{" "}
          <Link href={LINKS.meaningInAbsurdity}>
            consciousness is the fundamental building block of reality.
          </Link>
        </styled.p>
        <styled.p>
          Around that same time I discovered the{" "}
          <Link href={LINKS.espTrainer}>ESP Trainer app</Link>, developed by{" "}
          <Link href={LINKS.russelTarg}>Russel Targ</Link>, who, according to
          his Wikipedia, is{" "}
          <em>
            "an American physicist, parapsychologist, and author who is best
            known for his work on remote viewing."
          </em>
        </styled.p>
        <styled.p>
          I downloaded the app and thought it was pretty interesting!
        </styled.p>
        <styled.div>
          <styled.p mb="1">
            After using it for a while, I started to wonder:
          </styled.p>
          <styled.ul
            display="flex"
            flexDirection="column"
            paddingLeft="4"
            listStyleType="disc"
          >
            <styled.li>How does the app work? Is it truly random?</styled.li>
            <styled.li>Was I doing better than random chance?</styled.li>
            <styled.li>
              Was I consistently getting higher scores, or improving over time?
            </styled.li>
            <styled.li>
              Was I doing better when I took my time with each turn, or when I
              sped through it and let my "intuition" guide me?
            </styled.li>
          </styled.ul>
        </styled.div>

        <styled.p>As a result, I decided to make this!</styled.p>
        <styled.p>
          The code is <Link href={LINKS.github}>open source</Link>, so anyone
          can see how it works and/or contribute (:
        </styled.p>

        <styled.div>
          <styled.p>This version of the app comes with a few changes:</styled.p>
          <styled.ul
            display="flex"
            flexDirection="column"
            paddingLeft="4"
            listStyleType="disc"
          >
            <styled.li>
              The buttons are rotated 45° to make keyboard controls more
              intuitive
            </styled.li>
            <styled.li>
              Some simple statistics are displayed to help you assess your
              abilities
            </styled.li>
            <styled.li>
              You can export your game history as a JSON file if you want to
              analyze it in more detail
            </styled.li>
          </styled.ul>
        </styled.div>
      </styled.div>
    </Modal>
  );
};
