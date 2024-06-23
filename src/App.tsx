import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./App.css";

const superheroes = [
  {
    id: 1,
    name: "Superman",
    abilities: "Super strength, flight, invulnerability, heat vision",
  },
  {
    id: 2,
    name: "Batman",
    abilities:
      "Peak human physical and mental conditioning, expert martial artist, detective skills",
  },
  {
    id: 3,
    name: "Wonder Woman",
    abilities:
      "Super strength, speed, durability, flight, expert hand-to-hand combatant",
  },
  {
    id: 4,
    name: "Flash",
    abilities: "Super speed, time travel, intangibility, accelerated healing",
  },
  {
    id: 5,
    name: "Green Lantern",
    abilities:
      "Power ring that grants flight, hard-light constructs, and various other abilities",
  },
  {
    id: 6,
    name: "Aquaman",
    abilities: "Super strength, aquatic telepathy, enhanced swimming abilities",
  },
  {
    id: 7,
    name: "Cyborg",
    abilities: "Technopathy, super strength, advanced weaponry",
  },
  {
    id: 8,
    name: "Spider-Man",
    abilities: "Wall-crawling, enhanced strength and agility, spider-sense",
  },
  {
    id: 9,
    name: "Iron Man",
    abilities:
      "Powered armor suit granting superhuman strength, flight, and an array of weapons",
  },
  {
    id: 10,
    name: "Thor",
    abilities:
      "God-like strength, control over lightning, flight using Mjolnir",
  },
  {
    id: 11,
    name: "Hulk",
    abilities: "Unlimited strength increase with rage, invulnerability",
  },
  {
    id: 12,
    name: "Black Widow",
    abilities: "Expert martial artist, peak human conditioning, espionage",
  },
  {
    id: 13,
    name: "Hawkeye",
    abilities: "Master archer, expert tactician, peak human conditioning",
  },
  {
    id: 14,
    name: "Doctor Strange",
    abilities: "Mastery of magic, interdimensional travel, time manipulation",
  },
  {
    id: 15,
    name: "Black Panther",
    abilities: "Enhanced strength, speed, agility, senses, and durability",
  },
  {
    id: 16,
    name: "Scarlet Witch",
    abilities: "Reality warping, telekinesis, telepathy",
  },
  {
    id: 17,
    name: "Vision",
    abilities:
      "Density manipulation, flight, super strength, energy projection",
  },
  {
    id: 18,
    name: "Ant-Man",
    abilities: "Size manipulation, enhanced strength at smaller size",
  },
  {
    id: 19,
    name: "Wasp",
    abilities: "Size manipulation, flight, bio-electric energy blasts",
  },
  {
    id: 20,
    name: "Captain Marvel",
    abilities: "Super strength, flight, energy projection",
  },
  {
    id: 21,
    name: "Star-Lord",
    abilities:
      "Expert marksman, skilled hand-to-hand combatant, flight via jet boots",
  },
  {
    id: 22,
    name: "Gamora",
    abilities:
      "Superhuman strength and agility, skilled assassin and hand-to-hand combatant",
  },
  {
    id: 23,
    name: "Drax",
    abilities: "Super strength and durability, expert combatant",
  },
  {
    id: 24,
    name: "Rocket Raccoon",
    abilities:
      "Expert marksman and tactician, advanced technology and weaponry",
  },
  {
    id: 25,
    name: "Groot",
    abilities: "Regeneration, control over plant life, super strength",
  },
  {
    id: 26,
    name: "Daredevil",
    abilities: "Enhanced senses, expert martial artist, acrobat",
  },
  {
    id: 27,
    name: "Jessica Jones",
    abilities: "Super strength, durability, skilled investigator",
  },
  { id: 28, name: "Luke Cage", abilities: "Super strength, unbreakable skin" },
  {
    id: 29,
    name: "Iron Fist",
    abilities: "Master martial artist, chi-based abilities",
  },
  {
    id: 30,
    name: "Punisher",
    abilities: "Expert marksman, hand-to-hand combatant, tactician",
  },
  {
    id: 31,
    name: "Ghost Rider",
    abilities: "Hellfire manipulation, super strength, invulnerability",
  },
  {
    id: 32,
    name: "Blade",
    abilities:
      "Vampire physiology granting enhanced strength, speed, and healing",
  },
  {
    id: 33,
    name: "Nick Fury",
    abilities:
      "Expert tactician and hand-to-hand combatant, peak human conditioning",
  },
  {
    id: 34,
    name: "Captain America",
    abilities:
      "Enhanced strength, agility, endurance, skilled tactician and hand-to-hand combatant",
  },
  {
    id: 35,
    name: "Winter Soldier",
    abilities: "Enhanced strength, expert marksman and hand-to-hand combatant",
  },
  {
    id: 36,
    name: "Falcon",
    abilities: "Expert hand-to-hand combatant, flight via mechanical wings",
  },
  {
    id: 37,
    name: "War Machine",
    abilities:
      "Powered armor suit granting superhuman strength, flight, and an array of weapons",
  },
  { id: 38, name: "Quicksilver", abilities: "Super speed" },
  {
    id: 39,
    name: "Wolverine",
    abilities: "Enhanced strength, senses, healing factor, retractable claws",
  },
  {
    id: 40,
    name: "Deadpool",
    abilities:
      "Regenerative healing factor, skilled marksman and hand-to-hand combatant",
  },
];

function App() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const contentCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isContentCompleted, setIsContentCompleted] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHeaderCompleted, setIsHeaderCompleted] = useState(false);

  const footerRef = useRef<HTMLDivElement | null>(null);
  const footerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFooterCompleted, setIsFooterCompleted] = useState(false);

  const windowWidth = 1500;

  const printDocument = () => {
    setIsContentCompleted(false);
    setIsHeaderCompleted(false);
    setIsFooterCompleted(false);
    if (pageRef?.current) {
      html2canvas(pageRef.current, {
        windowWidth,
      }).then((canvas: HTMLCanvasElement) => {
        contentCanvasRef.current = canvas;
        setIsContentCompleted(true);
      });
    }
    if (headerRef?.current) {
      html2canvas(headerRef.current, {
        windowWidth,
      }).then((canvas: HTMLCanvasElement) => {
        headerCanvasRef.current = canvas;
        setIsHeaderCompleted(true);
      });
    }
    if (footerRef?.current) {
      html2canvas(footerRef.current, {
        windowWidth,
      }).then((canvas: HTMLCanvasElement) => {
        footerCanvasRef.current = canvas;
        setIsFooterCompleted(true);
      });
    }
  };

  useEffect(() => {
    if (isContentCompleted && isHeaderCompleted && isFooterCompleted) {
      if (
        contentCanvasRef.current &&
        headerCanvasRef.current &&
        footerCanvasRef.current
      ) {
        const imageData = {
          header: {
            image: headerCanvasRef.current.toDataURL("image/png"),
            width: headerCanvasRef.current.attributes?.width?.value || 0,
            height: headerCanvasRef.current.attributes?.height?.value || 0,
          },
          footer: {
            image: footerCanvasRef.current.toDataURL("image/png"),
            width: footerCanvasRef.current.attributes?.width?.value || 0,
            height: footerCanvasRef.current.attributes?.height?.value || 0,
          },
          content: {
            image: contentCanvasRef.current.toDataURL("image/png"),
            width: contentCanvasRef.current.attributes?.width?.value || 0,
            height: contentCanvasRef.current.attributes?.height?.value || 0,
          },
        };

        const pdf = new jsPDF();
        const headerHeight =
          (210 * imageData.header.height) / imageData.header.width;
        const contentHeight =
          (210 * imageData.content.height) / imageData.content.width;
        const footerHeight =
          (210 * imageData.footer.height) / imageData.footer.width;
        pdf.addImage(imageData.header.image, "JPEG", 0, 0, 210, headerHeight);
        pdf.addImage(
          imageData.content.image,
          "JPEG",
          0,
          headerHeight,
          210,
          contentHeight
        );
        pdf.addImage(
          imageData.footer.image,
          "JPEG",
          0,
          297 - footerHeight,
          210,
          footerHeight
        );
        // pdf.addImage(
        //   imageData.content.image,
        //   "JPEG",
        //   0,
        //   0,
        //   595,
        //   (595 * imageData.content.height) / imageData.content.width
        // );
        // pdf.autoPrint({ variant: "non-conform" });
        pdf.save("download.pdf");
        setIsContentCompleted(false);
        setIsHeaderCompleted(false);
        setIsFooterCompleted(false);
      }
    }
  }, [isContentCompleted, isHeaderCompleted, isFooterCompleted]);

  return (
    <>
      <div
        ref={headerRef}
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "black",
          fontSize: "26px",
          fontWeight: "700",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        HEADER
      </div>
      <div ref={pageRef} id="test">
        {superheroes.map((superhero) => (
          <div key={superhero.id} className="card">
            <div className="name">{superhero.name}</div>
            <div className="abilities">{superhero.abilities}</div>
          </div>
        ))}
      </div>
      <div
        ref={footerRef}
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "black",
          fontSize: "26px",
          fontWeight: "700",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Footer
      </div>
      <div className="print" onClick={printDocument}>
        PRINT
      </div>
    </>
  );
}

export default App;
