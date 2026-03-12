import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

// ─── Palette ──────────────────────────────────────────────────────────────────
const CHIP_PALETTE = [
  { bg: "#9DB4D8", text: "#fff" },
  { bg: "#E8622A", text: "#fff" },
  { bg: "#6B2D3E", text: "#fff" },
  { bg: "#4A7C6F", text: "#fff" },
  { bg: "#D4A837", text: "#1f2937" },
  { bg: "#5C4B8A", text: "#fff" },
];

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

// ─── Registry des dropzones ───────────────────────────────────────────────────
const dropZoneRegistry = new Map();
let dropZoneIdCounter = 0;

function isPointInElement(x, y, el) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

// ─── DropZone ─────────────────────────────────────────────────────────────────
export function DropZone({ correctAnswer, placeholder = "···" }) {
  const [dropped, setDropped] = useState(null);
  const [droppedColor, setDroppedColor] = useState(null);
  const [status, setStatus] = useState("idle");
  const ref = useRef(null);
  const shakeControls = useAnimation();

  useEffect(() => {
    const id = dropZoneIdCounter++;
    dropZoneRegistry.set(id, {
      ref,
      onDrop: (value, color) => {
        if (value === correctAnswer) {
          setDropped(value);
          setDroppedColor(color);
          setStatus("correct");
          return true;
        }
        setStatus("wrong");
        shakeControls.start({ x: [0, -8, 8, -5, 5, -2, 2, 0], transition: { duration: 0.4 } });
        setTimeout(() => setStatus("idle"), 500);
        return false;
      },
      setHover: (v) => setStatus((s) => s === "correct" ? "correct" : v ? "hover" : "idle"),
    });
    return () => dropZoneRegistry.delete(id);
  }, [correctAnswer]);

  const border =
    status === "correct" ? "2px dashed #34d399" :
    status === "wrong"   ? "2px dashed #f87171" :
    status === "hover"   ? "2px dashed #818cf8" :
                           "2px dashed #d1d5db";
  const bg =
    status === "correct" ? "#ecfdf5" :
    status === "wrong"   ? "#fef2f2" :
    status === "hover"   ? "#eef2ff" : "#fff";

  return (
    <motion.span
      ref={ref}
      animate={shakeControls}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        verticalAlign: "middle", minWidth: 84, height: 36, padding: "0 12px",
        margin: "0 6px", borderRadius: 8, border, background: bg,
        transition: "background 0.15s, border 0.15s",
        fontFamily: "inherit", cursor: "default", userSelect: "none",
      }}
    >
      <AnimatePresence mode="wait">
        {dropped ? (
          <motion.span key="filled"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 18 } }}
            style={{ fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: droppedColor }}
          >{dropped}</motion.span>
        ) : (
          <motion.span key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            style={{ fontSize: "0.72rem", color: "#9ca3af", letterSpacing: "0.05em" }}
          >{placeholder}</motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

// ─── Ghost animé ──────────────────────────────────────────────────────────────
// Rendu dans un portal. Quand `returning` est true, il s'anime vers `originPos`
// puis appelle `onDone` à la fin.
function DragGhost({ pos, originPos, bg, text, value, returning, onDone }) {
  return createPortal(
    <motion.div
      initial={false}
      animate={returning ? {
        left: originPos.x,
        top: originPos.y,
        scale: 1,
        opacity: 1,
      } : {
        left: pos.x,
        top: pos.y,
        scale: 1.12,
        opacity: 1,
      }}
      transition={returning
        ? { type: "spring", stiffness: 280, damping: 26 }
        : { duration: 0 }
      }
      onAnimationComplete={() => { if (returning) onDone(); }}
      style={{
        position: "fixed",
        width: 96,
        height: 52,
        clipPath: HEX_CLIP,
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        filter: returning ? "none" : "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
      }}
    >
      <ChipLabel text={value} color={text} />
    </motion.div>,
    document.body
  );
}

// ─── AnswerChip ───────────────────────────────────────────────────────────────
function AnswerChip({ value, index, accepted, onAccepted }) {
  const { bg, text } = CHIP_PALETTE[index % CHIP_PALETTE.length];
  const chipRef = useRef(null);

  // ghost state
  const [ghostState, setGhostState] = useState(null);
  // ghostState = null | { pos: {x,y}, originPos: {x,y}, returning: bool }

  const currentHoveredZone = useRef(null);

  const handlePointerDown = useCallback((e) => {
    if (accepted || ghostState?.returning) return;
    e.preventDefault();

    const rect = chipRef.current.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    // position d'origine du chip dans le viewport (coin haut-gauche)
    const originPos = { x: rect.left, y: rect.top };

    const toGhostPos = (clientX, clientY) => ({
      x: clientX - W / 2,
      y: clientY - H / 2,
    });

    setGhostState({ pos: toGhostPos(e.clientX, e.clientY), originPos, returning: false });

    const onMove = (ev) => {
      setGhostState((g) => g && !g.returning
        ? { ...g, pos: toGhostPos(ev.clientX, ev.clientY) }
        : g
      );

      // hover detection
      let hovered = null;
      for (const [id, zone] of dropZoneRegistry.entries()) {
        if (isPointInElement(ev.clientX, ev.clientY, zone.ref.current)) {
          hovered = { id, zone };
          break;
        }
      }
      if (currentHoveredZone.current?.id !== hovered?.id) {
        currentHoveredZone.current?.zone.setHover(false);
        hovered?.zone.setHover(true);
        currentHoveredZone.current = hovered;
      }
    };

    const onUp = (ev) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);

      currentHoveredZone.current?.zone.setHover(false);
      currentHoveredZone.current = null;

      // Tester le drop sur une zone
      let wasAccepted = false;
      for (const [, zone] of dropZoneRegistry.entries()) {
        if (isPointInElement(ev.clientX, ev.clientY, zone.ref.current)) {
          const ok = zone.onDrop(value, bg);
          if (ok) {
            onAccepted();
            wasAccepted = true;
            // Ghost disparaît immédiatement (la DropZone prend le relai)
            setGhostState(null);
          }
          break;
        }
      }

      if (!wasAccepted) {
        // Déclencher l'animation de retour : on passe returning=true
        // Le ghost reste visible et s'anime vers originPos
        setGhostState((g) => g ? { ...g, returning: true } : null);
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [accepted, value, bg, onAccepted, ghostState]);

  if (accepted) return <div style={{ width: 96, height: 52 }} />;

  const isDragging = ghostState !== null && !ghostState.returning;

  return (
    <>
      <motion.div
        ref={chipRef}
        onPointerDown={handlePointerDown}
        whileHover={!isDragging ? { scale: 1.08 } : {}}
        style={{
          clipPath: HEX_CLIP,
          backgroundColor: bg,
          cursor: isDragging ? "grabbing" : "grab",
          width: 96,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          // Pendant le drag et le retour, on estompe le chip original
          opacity: ghostState ? 0.2 : 1,
          touchAction: "none",
          transition: "opacity 0.15s",
        }}
      >
        <ChipLabel text={value} color={text} />
      </motion.div>

      {ghostState && (
        <DragGhost
          pos={ghostState.pos}
          originPos={ghostState.originPos}
          bg={bg}
          text={text}
          value={value}
          returning={ghostState.returning}
          onDone={() => setGhostState(null)}  // supprime le ghost après l'animation
        />
      )}
    </>
  );
}

function ChipLabel({ text, color }) {
  return (
    <span style={{
      color, fontWeight: 900, fontSize: "0.75rem",
      letterSpacing: "0.12em", textTransform: "uppercase",
      fontFamily: "Georgia, serif", pointerEvents: "none",
    }}>{text}</span>
  );
}

// ─── AnswerBank ───────────────────────────────────────────────────────────────
export function AnswerBank({ answers }) {
  const [acceptedSet, setAcceptedSet] = useState(new Set());
  const handleAccepted = useCallback((value) => {
    setAcceptedSet((prev) => new Set([...prev, value]));
  }, []);

  return (
    <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
      {answers.map((value, i) => (
        <motion.div key={value}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 18 }}
        >
          <AnswerChip
            value={value} index={i}
            accepted={acceptedSet.has(value)}
            onAccepted={() => handleAccepted(value)}
          />
        </motion.div>
      ))}
    </div>
  );
}