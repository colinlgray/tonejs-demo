import React, { useRef, useEffect, useState } from "react";
import Tone from "tone";
import "./styles/tailwind.css";

const notes = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4"
];
const shortcuts = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "]"];

function Key(props) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const downHandler = e => {
      if (e.key === props.shortcut) {
        props.onClick();
        setActive(true);
      }
    };
    const upHandler = e => {
      if (e.key === props.shortcut) {
        props.onRelease();
        setActive(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [props]);

  return (
    <div
      className={`${
        active ? "bg-gray-400" : "bg-white"
      } border-2 border-gray-600 m-2 w-8 h-20`}
    />
  );
}

function App() {
  const player = useRef(null);
  useEffect(() => {
    player.current = new Tone.PolySynth(6, Tone.Synth).toMaster();
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="flex flex-row">
        {notes.map((note, idx) => (
          <Key
            key={note}
            shortcut={shortcuts[idx]}
            onClick={() => {
              player.current.triggerAttack(note);
            }}
            onRelease={() => {
              player.current.triggerRelease(note);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
