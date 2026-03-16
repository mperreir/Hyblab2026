import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Robot.module.css';

import robot1Head from '../assets/robot/robot1-head.png';
import robot1Body from '../assets/robot/robot1-body.png';
import robot1Wheel from '../assets/robot/robot1-wheel.png';

import robot2Head from '../assets/robot/robot2-head.png';
import robot2UpperBody from '../assets/robot/robot2-upper-body.png';
import robot2LowerBody from '../assets/robot/robot2-lower-body.png';
import robot2ArmBack from '../assets/robot/robot2-arm-back.png';
import robot2ArmFront from '../assets/robot/robot2-arm-front.png';

import robot3Head from '../assets/robot/robot3-head.png';
import robot3Body from '../assets/robot/robot3-body.png';
import robot3ArmBackA from '../assets/robot/robot3-arm-back.png';
import robot3ArmBackB from '../assets/robot/robot3-arm-back(1).png';
import robot3LegBackA from '../assets/robot/robot3-leg1-back.png';
import robot3LegBackB from '../assets/robot/robot3-leg2-back.png';
import robot3LegFront from '../assets/robot/robot3-leg-front.png';

const DEFAULT_RANGES = {
  general: { start: 1130, end: 1820, center: 1475 },
  journalistique: { start: 1880, end: 2760, center: 2320 },
  expert: { start: 2870, end: 3370, center: 3120 },
};

const ROBOT_SIZE = { width: 206, height: 252 };
const ROBOT_STAGES = ['robot1', 'robot2', 'robot3'];
const INTRO_IDLE_DELAY_MS = 6000;
const INTRO_IDLE_MESSAGE = 'Dive deeper to explore the iceberg.';
const RESOURCE_IDLE_DELAY_MS = 5000;
const LEVEL_ENTRY_MESSAGE_MS = 5600;
const ROBOT_LEVEL_TRIGGER_RATIO = 1.4;
const ROBOT_POSITION_CONFIG = {
  robot1: {
    horizontalAnchor: 'right',
    xOffset: 200,
    verticalAnchor: 'bottom',
    yOffset: 250,
  },
  robot2: {
    horizontalAnchor: 'left',
    xOffset: 100,
    verticalAnchor: 'bottom',
    yOffset: 250,
  },
  robot3: {
    horizontalAnchor: 'right',
    xOffset: 200,
    verticalAnchor: 'bottom',
    yOffset: 250,
  },
};
const LEVEL_ENTRY_MESSAGES = {
  general: "A la surface de l'iceberg : parfait pour se mettre dans le bain.",
  journalistique: "Sous la surface, les pistes se croisent et la curiosite s'active.",
  expert: "En eaux profondes, on entre dans les nuances et le coeur du sujet.",
};

function lerp(start, end, t) {
  return start + ((end - start) * t);
}

function getViewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function resolveRobotPosition(viewport, config) {
  const sideInset = Math.max(1, viewport.width * 0.008);
  const leftBaseX = sideInset;
  const rightBaseX = viewport.width - ROBOT_SIZE.width - sideInset;
  const topBaseY = 0;
  const bottomBaseY = viewport.height - ROBOT_SIZE.height;

  const xBase = config.horizontalAnchor === 'left' ? leftBaseX : rightBaseX;
  const yBase = config.verticalAnchor === 'top' ? topBaseY : bottomBaseY;

  return {
    x: xBase + config.xOffset,
    y: Math.max(0, yBase + config.yOffset),
  };
}

function getAnchorPoints(viewport) {
  const robot1Position = resolveRobotPosition(viewport, ROBOT_POSITION_CONFIG.robot1);
  const robot2Position = resolveRobotPosition(viewport, ROBOT_POSITION_CONFIG.robot2);
  const robot3Position = resolveRobotPosition(viewport, ROBOT_POSITION_CONFIG.robot3);

  return {
    intro: robot1Position,
    general: robot1Position,
    journalistique: robot2Position,
    expert: robot3Position,
  };
}

function getLevelFromScroll(scrollProbeY, ranges) {
  if (scrollProbeY < ranges.general.start) {
    return 'intro';
  }

  if (scrollProbeY < ranges.journalistique.start) {
    return 'general';
  }

  if (scrollProbeY < ranges.expert.start) {
    return 'journalistique';
  }

  return 'expert';
}

function getStageForLevel(level) {
  if (level === 'intro' || level === 'general') {
    return 0;
  }

  if (level === 'journalistique') {
    return 1;
  }

  return 2;
}

function getPositionForLevel(level, viewport) {
  const anchors = getAnchorPoints(viewport);

  if (level === 'intro' || level === 'general') {
    return anchors.intro;
  }

  return anchors[level];
}

function getPathControlPoints(fromLevel, toLevel, viewport) {
  const anchors = getAnchorPoints(viewport);

  if (fromLevel === 'intro' && toLevel === 'general') {
    return [];
  }

  if (fromLevel === 'general' && toLevel === 'journalistique') {
    return [
      { x: anchors.general.x - 280, y: anchors.general.y - 120 },
      { x: anchors.journalistique.x + 280, y: anchors.journalistique.y - 120 },
    ];
  }

  if (fromLevel === 'journalistique' && toLevel === 'expert') {
    return [
      { x: anchors.journalistique.x + 280, y: anchors.journalistique.y - 120 },
      { x: anchors.expert.x - 280, y: anchors.expert.y - 120 },
    ];
  }

  if (fromLevel === 'general' && toLevel === 'intro') {
    return [];
  }

  if (fromLevel === 'journalistique' && toLevel === 'general') {
    return [
      { x: anchors.journalistique.x + 280, y: anchors.journalistique.y - 120 },
      { x: anchors.general.x - 280, y: anchors.general.y - 120 },
    ];
  }

  if (fromLevel === 'expert' && toLevel === 'journalistique') {
    return [
      { x: anchors.expert.x - 280, y: anchors.expert.y - 120 },
      { x: anchors.journalistique.x + 280, y: anchors.journalistique.y - 120 },
    ];
  }

  return [];
}

function getFormWeights(level) {
  if (level === 'intro' || level === 'general') {
    return { robot1: 1, robot2: 0, robot3: 0 };
  }

  if (level === 'journalistique') {
    return { robot1: 0, robot2: 1, robot3: 0 };
  }

  return { robot1: 0, robot2: 0, robot3: 1 };
}

function getFormTransitionState(variant, visible) {
  if (visible) {
    return {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    };
  }

  if (variant === 'robot2') {
    return {
      autoAlpha: 0,
      scale: 0.9,
      x: -80,
      y: 6,
      rotate: -10,
    };
  }

  if (variant === 'robot3') {
    return {
      autoAlpha: 0,
      scale: 0.92,
      x: 0,
      y: 96,
      rotate: 0,
    };
  }

  return {
    autoAlpha: 0,
    scale: 0.96,
    x: 0,
    y: 10,
    rotate: 0,
  };
}

function getFormTransitionOptions(variant, visible) {
  if (visible && variant === 'robot2') {
    return { duration: 0.5, ease: 'back.out(1.4)' };
  }

  if (visible && variant === 'robot3') {
    return { duration: 0.62, ease: 'power3.out' };
  }

  if (visible) {
    return { duration: 0.35, ease: 'power2.out' };
  }

  return { duration: 0.28, ease: 'power2.in' };
}

export default function Robot({
  levelRanges = DEFAULT_RANGES,
  resourcePromptByLevel = {},
  resourceInteractionTick = 0,
  pauseResourcePrompt = false,
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [activeLevel, setActiveLevel] = useState('intro');
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);
  const [showLevelEntryPrompt, setShowLevelEntryPrompt] = useState(false);
  const [showResourcePrompt, setShowResourcePrompt] = useState(false);
  const currentLevelRef = useRef('intro');
  const introPromptEnabledRef = useRef(true);
  const moveTimelineRef = useRef(null);

  const rootRef = useRef(null);
  const shadowRef = useRef(null);
  const motionRef = useRef(null);

  const robot1LayerRef = useRef(null);
  const robot1FormRef = useRef(null);
  const robot1HeadRef = useRef(null);
  const robot1BodyRef = useRef(null);
  const robot1WheelRef = useRef(null);

  const robot2LayerRef = useRef(null);
  const robot2FormRef = useRef(null);
  const robot2HeadRef = useRef(null);
  const robot2BodyRef = useRef(null);
  const robot2ArmBackRef = useRef(null);
  const robot2ArmFrontRef = useRef(null);

  const robot3LayerRef = useRef(null);
  const robot3FormRef = useRef(null);
  const robot3HeadRef = useRef(null);
  const robot3BodyRef = useRef(null);
  const robot3ArmBackARef = useRef(null);
  const robot3ArmBackBRef = useRef(null);
  const robot3LegBackRef = useRef(null);
  const robot3LegFrontRef = useRef(null);

  useLayoutEffect(() => {
    const shadow = shadowRef.current;
    const motion = motionRef.current;

    if (!shadow || !motion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const formLayers = {
        robot1: robot1LayerRef.current,
        robot2: robot2LayerRef.current,
        robot3: robot3LayerRef.current,
      };

      ROBOT_STAGES.forEach((variant) => {
        const layer = formLayers[variant];
        if (!layer) {
          return;
        }

        gsap.set(layer, getFormTransitionState(variant, variant === 'robot1'));
      });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(motion, { y: -8, duration: 2.8 })
        .to(motion, { y: 3, duration: 2.8 });

      gsap.to(shadow, {
        scaleX: 0.84,
        opacity: 0.18,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot1HeadRef.current, { transformOrigin: '50% 84%' });
      gsap.set(robot1BodyRef.current, { transformOrigin: '50% 54%' });
      gsap.set(robot1WheelRef.current, { transformOrigin: '50% 50%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot1FormRef.current, { y: -8, rotate: 2.2, duration: 1.35 })
        .to(robot1FormRef.current, { y: 6, rotate: -1.9, duration: 1.35 });

      gsap.to(robot1HeadRef.current, {
        rotate: 9,
        y: -10,
        x: 3,
        duration: 0.95,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot1BodyRef.current, {
        scaleY: 1.03,
        scaleX: 0.985,
        duration: 1.35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot1WheelRef.current, {
        rotate: 16,
        y: 3,
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot2HeadRef.current, { transformOrigin: '43% 19%' });
      gsap.set(robot2ArmBackRef.current, { transformOrigin: '58% 31%' });
      gsap.set(robot2ArmFrontRef.current, { transformOrigin: '48% 41%' });
      gsap.set(robot2BodyRef.current, { transformOrigin: '50% 55%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot2FormRef.current, { y: -10, rotate: 1.1, duration: 2.15 })
        .to(robot2FormRef.current, { y: 4, rotate: -0.9, duration: 2.15 });

      gsap.to(robot2HeadRef.current, {
        rotate: -4,
        y: -6,
        x: -1,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2ArmBackRef.current, {
        rotate: 2.5,
        x: -2,
        y: 2,
        duration: 1.95,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2ArmFrontRef.current, {
        rotate: 3.5,
        x: 3,
        y: -1,
        duration: 1.65,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot2BodyRef.current, {
        scaleY: 1.014,
        scaleX: 0.992,
        duration: 2.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(robot3HeadRef.current, { transformOrigin: '50% 78%' });
      gsap.set(robot3BodyRef.current, { transformOrigin: '50% 52%' });
      gsap.set(robot3ArmBackARef.current, { transformOrigin: '72% 24%' });
      gsap.set(robot3ArmBackBRef.current, { transformOrigin: '69% 36%' });
      gsap.set(robot3LegBackRef.current, { transformOrigin: '41% 21%' });
      gsap.set(robot3LegFrontRef.current, { transformOrigin: '26% 26%' });

      gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })
        .to(robot3FormRef.current, { y: -6, rotate: 0.55, duration: 3.1 })
        .to(robot3FormRef.current, { y: 2, rotate: -0.45, duration: 3.1 });

      gsap.to(robot3HeadRef.current, {
        rotate: -2,
        y: -4,
        duration: 2.25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3BodyRef.current, {
        scaleY: 1.01,
        scaleX: 0.996,
        duration: 3.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3ArmBackARef.current, {
        rotate: -3,
        x: -2,
        duration: 2.35,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3ArmBackBRef.current, {
        rotate: 2.4,
        x: 2,
        duration: 2.65,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3LegBackRef.current, {
        rotate: 3.5,
        y: 2,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(robot3LegFrontRef.current, {
        rotate: -2.5,
        x: 2,
        y: 1,
        duration: 2.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introPromptEnabledRef.current || activeLevel !== 'intro') {
      setShowIntroPrompt(false);
      return undefined;
    }

    let timeoutId;

    function restartIdleTimer() {
      window.clearTimeout(timeoutId);
      setShowIntroPrompt(false);
      timeoutId = window.setTimeout(() => {
        if (currentLevelRef.current === 'intro') {
          setShowIntroPrompt(true);
        }
      }, INTRO_IDLE_DELAY_MS);
    }

    restartIdleTimer();

    const activityEvents = ['scroll', 'wheel', 'pointerdown', 'touchstart', 'keydown'];
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, restartIdleTimer);
    });

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, restartIdleTimer);
      });
    };
  }, [activeLevel]);

  useEffect(() => {
    const levelEntryMessage = LEVEL_ENTRY_MESSAGES[activeLevel];

    if (!levelEntryMessage || pauseResourcePrompt) {
      setShowLevelEntryPrompt(false);
      return undefined;
    }

    setShowLevelEntryPrompt(true);

    const timeoutId = window.setTimeout(() => {
      if (currentLevelRef.current === activeLevel) {
        setShowLevelEntryPrompt(false);
      }
    }, LEVEL_ENTRY_MESSAGE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeLevel, pauseResourcePrompt]);

  useEffect(() => {
    const resourcePromptMessage = resourcePromptByLevel[activeLevel];

    if (
      activeLevel === 'intro'
      || !resourcePromptMessage
      || pauseResourcePrompt
      || showLevelEntryPrompt
    ) {
      setShowResourcePrompt(false);
      return undefined;
    }

    let timeoutId;

    function restartIdleTimer() {
      window.clearTimeout(timeoutId);
      setShowResourcePrompt(false);
      timeoutId = window.setTimeout(() => {
        if (currentLevelRef.current === activeLevel) {
          setShowResourcePrompt(true);
        }
      }, RESOURCE_IDLE_DELAY_MS);
    }

    restartIdleTimer();

    const activityEvents = ['scroll', 'wheel', 'pointerdown', 'touchstart', 'keydown'];
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, restartIdleTimer, { passive: true });
    });

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, restartIdleTimer);
      });
    };
  }, [activeLevel, pauseResourcePrompt, resourceInteractionTick, resourcePromptByLevel, showLevelEntryPrompt]);

  useEffect(() => {
    const root = rootRef.current;
    const formLayerRefs = {
      robot1: robot1LayerRef.current,
      robot2: robot2LayerRef.current,
      robot3: robot3LayerRef.current,
    };

    if (!root) {
      return undefined;
    }

    function applyForms(level, animate = false) {
      const weights = getFormWeights(level);

      ROBOT_STAGES.forEach((variant) => {
        const layer = formLayerRefs[variant];
        if (!layer) {
          return;
        }

        const visible = weights[variant] > 0.5;
        const vars = getFormTransitionState(variant, visible);

        if (animate) {
          gsap.to(layer, {
            ...vars,
            ...getFormTransitionOptions(variant, visible),
            overwrite: 'auto',
          });
          return;
        }

        gsap.set(layer, vars);
      });
    }

    function moveToLevel(level) {
      const viewport = getViewport();
      const target = getPositionForLevel(level, viewport);

      if (moveTimelineRef.current) {
        moveTimelineRef.current.kill();
        moveTimelineRef.current = null;
      }

      if (level !== 'intro') {
        introPromptEnabledRef.current = false;
        setShowIntroPrompt(false);
      }

      setStageIndex(getStageForLevel(level));
      setActiveLevel(level);

      gsap.set(root, { x: target.x, y: target.y });
      applyForms(level, false);
      currentLevelRef.current = level;
    }

    function syncRobotWithScroll() {
      const probeY = window.scrollY + (window.innerHeight * ROBOT_LEVEL_TRIGGER_RATIO);
      const level = getLevelFromScroll(probeY, { ...DEFAULT_RANGES, ...levelRanges });
      moveToLevel(level);
    }

    function handleResize() {
      syncRobotWithScroll();
    }

    syncRobotWithScroll();
    window.addEventListener('scroll', syncRobotWithScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (moveTimelineRef.current) {
        moveTimelineRef.current.kill();
      }

      window.removeEventListener('scroll', syncRobotWithScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [levelRanges]);

  return (
    <div
      ref={rootRef}
      className="fixed left-0 top-0 pointer-events-none z-40"
      style={{ width: ROBOT_SIZE.width, height: ROBOT_SIZE.height }}
    >
      {showLevelEntryPrompt || showResourcePrompt || showIntroPrompt ? (
        <div
          className={[
            styles.robotSpeech,
            stageIndex === 1 ? styles.robotSpeechMirrored : '',
          ].filter(Boolean).join(' ')}
          role="status"
          aria-live="polite"
        >
          {showLevelEntryPrompt
            ? LEVEL_ENTRY_MESSAGES[activeLevel]
            : showResourcePrompt
              ? resourcePromptByLevel[activeLevel]
              : INTRO_IDLE_MESSAGE}
        </div>
      ) : null}

      <div
        className={[
          styles.robotShell,
          styles[`robotShellStage${stageIndex}`] ?? '',
        ].filter(Boolean).join(' ')}
      >
        <div ref={shadowRef} className={styles.robotShellShadow} />
        <div className={styles.robotShellHalo} />
        <div className={`${styles.robotShellRing} ${styles.robotShellRingInner}`} />
        <div className={`${styles.robotShellRing} ${styles.robotShellRingOuter}`} />

        <div ref={motionRef} className={styles.robotShellMotion}>
          <div ref={robot1LayerRef} className={styles.robotShellForm}>
            <div ref={robot1FormRef} className={styles.robotShellFormInner}>
              <div className={styles.robotShellMirror}>
                <img ref={robot1BodyRef} src={robot1Body} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot1WheelRef} src={robot1Wheel} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot1HeadRef} src={robot1Head} alt="Robot 1" className={styles.robotShellPart} />
              </div>
            </div>
          </div>

          <div ref={robot2LayerRef} className={styles.robotShellForm}>
            <div ref={robot2FormRef} className={styles.robotShellFormInner}>
              <img ref={robot2ArmBackRef} src={robot2ArmBack} alt="" aria-hidden className={styles.robotShellPart} />
              <img ref={robot2BodyRef} src={robot2LowerBody} alt="" aria-hidden className={styles.robotShellPart} />
              <img src={robot2UpperBody} alt="" aria-hidden className={styles.robotShellPart} />
              <img ref={robot2ArmFrontRef} src={robot2ArmFront} alt="" aria-hidden className={styles.robotShellPart} />
              <img ref={robot2HeadRef} src={robot2Head} alt="Robot 2" className={styles.robotShellPart} />
            </div>
          </div>

          <div ref={robot3LayerRef} className={styles.robotShellForm}>
            <div ref={robot3FormRef} className={styles.robotShellFormInner}>
              <div className={styles.robotShellMirror}>
                <img ref={robot3ArmBackARef} src={robot3ArmBackA} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot3ArmBackBRef} src={robot3ArmBackB} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot3LegBackRef} src={robot3LegBackB} alt="" aria-hidden className={styles.robotShellPart} />
                <img src={robot3LegBackA} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot3BodyRef} src={robot3Body} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot3LegFrontRef} src={robot3LegFront} alt="" aria-hidden className={styles.robotShellPart} />
                <img ref={robot3HeadRef} src={robot3Head} alt="Robot 3" className={styles.robotShellPart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
