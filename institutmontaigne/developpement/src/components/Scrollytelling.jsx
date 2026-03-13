import { createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ScrollSceneContext = createContext({
    screen: 0,
    screens: 1,
});

function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
}

function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function parseAnchor(anchor = '50 50') {
    const [xRaw, yRaw] = String(anchor).trim().split(/\s+/);
    return {
        x: clamp(toNumber(xRaw, 50), 0, 100),
        y: clamp(toNumber(yRaw, 50), 0, 100),
    };
}

function resolvePosition(position) {
    const presets = {
        'top-left': { top: '10%', left: '8%', textAlign: 'left' },
        'top-center': { top: '10%', left: '50%', textAlign: 'center', transform: 'translateX(-50%)' },
        'top-right': { top: '10%', right: '8%', textAlign: 'right' },
        'center-left': { top: '50%', left: '8%', textAlign: 'left', transform: 'translateY(-50%)' },
        center: { top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)' },
        'center-right': { top: '50%', right: '8%', textAlign: 'right', transform: 'translateY(-50%)' },
        'bottom-left': { bottom: '10%', left: '8%', textAlign: 'left' },
        'bottom-center': { bottom: '10%', left: '50%', textAlign: 'center', transform: 'translateX(-50%)' },
        'bottom-right': { bottom: '10%', right: '8%', textAlign: 'right' },
    };

    if (typeof position === 'string' && presets[position]) {
        return presets[position];
    }

    if (position && typeof position === 'object') {
        return position;
    }

    return presets.center;
}

function computeEnterTransform(enter, amount) {
    const shift = (1 - amount) * 38;
    switch (enter) {
        case 'fade-left':
            return `translate3d(${shift}px,0,0)`;
        case 'fade-right':
            return `translate3d(${-shift}px,0,0)`;
        case 'fade-down':
            return `translate3d(0,${-shift}px,0)`;
        case 'zoom-in':
            return `scale(${0.92 + amount * 0.08})`;
        case 'fade-up':
        default:
            return `translate3d(0,${shift}px,0)`;
    }
}

function normalizeAnimation(animation) {
    if (isValidElement(animation)) {
        const type = animation.type;
        if (type === AnimZoom) {
            return { kind: 'zoom', ...animation.props };
        }
        if (type === AnimOut) {
            return { kind: 'out', ...animation.props };
        }
        if (type === AnimPan) {
            return { kind: 'pan', ...animation.props };
        }
    }

    if (animation && typeof animation === 'object') {
        return animation;
    }

    return null;
}

function evaluateTimeline(animations, screen) {
    const entries = Object.entries(animations ?? {})
        .map(([k, v]) => ({ at: toNumber(k, 0), def: normalizeAnimation(v) }))
        .filter((entry) => !!entry.def)
        .sort((a, b) => a.at - b.at);

    if (entries.length === 0) {
        return { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' };
    }

    let opacity = 1;
    let tx = 0;
    let ty = 0;
    let scale = 1;
    let origin = '50% 50%';

    entries.forEach((entry, index) => {
        if (screen < entry.at) {
            return;
        }

        const def = entry.def;
        const nextAt = entries[index + 1]?.at ?? entry.at + toNumber(def.duration, 0.6);
        const progress = clamp((screen - entry.at) / Math.max(0.001, nextAt - entry.at));

        if (def.kind === 'zoom') {
            const from = toNumber(def.from, 1);
            const to = toNumber(def.to, 1.14);
            scale = from + (to - from) * progress;
            const anchor = parseAnchor(def.anchor);
            origin = `${anchor.x}% ${anchor.y}%`;
        }

        if (def.kind === 'out') {
            opacity = 1 - progress;
        }

        if (def.kind === 'pan') {
            const fromX = toNumber(def.fromX, 0);
            const toX = toNumber(def.toX, 0);
            const fromY = toNumber(def.fromY, 0);
            const toY = toNumber(def.toY, 0);
            tx = fromX + (toX - fromX) * progress;
            ty = fromY + (toY - fromY) * progress;
        }
    });

    return {
        opacity: clamp(opacity),
        transform: `translate3d(${tx}%, ${ty}%, 0) scale(${scale})`,
        transformOrigin: origin,
    };
}

export function AnimZoom() {
    return null;
}

export function AnimOut() {
    return null;
}

export function AnimPan() {
    return null;
}

export function SceneS({ screens = 3, className = '', children }) {
    const ref = useRef(null);
    const [screen, setScreen] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            if (!ref.current) {
                return;
            }

            const rect = ref.current.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const local = clamp((-rect.top) / vh, 0, screens);
            setScreen(local);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [screens]);

    const ctx = useMemo(() => ({ screen, screens }), [screen, screens]);

    return (
        <ScrollSceneContext.Provider value={ctx}>
            <section ref={ref} className={className} style={{ minHeight: `${screens * 100}vh` }}>
                <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
            </section>
        </ScrollSceneContext.Provider>
    );
}

export function ImageS({ src, animations = {}, className = '', children }) {
    const { screen } = useContext(ScrollSceneContext);
    const timelineStyle = evaluateTimeline(animations, screen);

    return (
        <div className="absolute inset-0">
            <div
                className={`absolute inset-0 bg-cover bg-center ${className}`.trim()}
                style={{
                    backgroundImage: `url(${src ?? FALLBACK_IMAGE})`,
                    ...timelineStyle,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/45 via-navy/25 to-navy/55" />
            <div className="absolute inset-0">{children}</div>
        </div>
    );
}

export function TexteS({
    enterAt = 0,
    enterDuration = 0.4,
    exitAt = null,
    exitDuration = 0.35,
    enter = 'fade-up',
    position = 'center',
    width = '42%',
    className = '',
    style = {},
    children,
}) {
    const { screen } = useContext(ScrollSceneContext);
    const posStyle = resolvePosition(position);
    const enterProgress = clamp((screen - enterAt) / Math.max(0.001, enterDuration));
    const exitProgress = exitAt === null ? 0 : clamp((screen - exitAt) / Math.max(0.001, exitDuration));
    const opacity = clamp(enterProgress * (1 - exitProgress));
    const transformFromEnter = computeEnterTransform(enter, enterProgress);

    return (
        <div
            style={{
                position: 'absolute',
                width,
                opacity,
                pointerEvents: 'none',
                willChange: 'opacity, transform',
                ...posStyle,
                transform: [posStyle.transform, transformFromEnter].filter(Boolean).join(' '),
                ...style,
            }}
        >
            <div className={className}>{children}</div>
        </div>
    );
}

export function SpriteS({ src, alt = '', className = '', ...textProps }) {
    return (
        <TexteS {...textProps}>
            <img src={src} alt={alt} className={className} />
        </TexteS>
    );
}

export default function Scrollytelling() {
    return (
        <div className="bg-[#0c1323]">
            <SceneS screens={3}>
                <ImageS
                    src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80"
                    animations={{
                        '0': <AnimZoom duration={1.7} from={1} to={1.12} anchor="30 70" />,
                        '2.5': <AnimOut duration={0.5} />,
                    }}
                >
                    <TexteS
                        position="top-left"
                        enterAt={0.08}
                        enterDuration={0.35}
                        exitAt={1.2}
                        exitDuration={0.35}
                        enter="fade-right"
                        className="text-[1.55rem] font-black uppercase leading-[1.02] text-white md:text-[2.35rem]"
                    >
                        LE SCRUTIN PROPORTIONNEL
                    </TexteS>

                    <TexteS
                        position="top-left"
                        enterAt={0.7}
                        enterDuration={0.35}
                        exitAt={1.9}
                        exitDuration={0.3}
                        width="54%"
                        className="text-[1rem] font-semibold leading-[1.24] text-white md:text-[1.45rem]"
                        style={{ top: '30%' }}
                    >
                        Entre stabilite gouvernementale et representativite, le modele electoral decide aussi la forme du debat.
                    </TexteS>

                    <TexteS
                        position="bottom-left"
                        enterAt={1.5}
                        enterDuration={0.45}
                        exitAt={2.6}
                        exitDuration={0.25}
                        enter="fade-up"
                        className="text-[1.1rem] font-bold leading-[1.15] text-white md:text-[1.6rem]"
                    >
                        UN REMEDE A LA CRISE DEMOCRATIQUE ?
                    </TexteS>
                </ImageS>
            </SceneS>

            <SceneS screens={3}>
                <ImageS
                    src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=1600&q=80"
                    animations={{
                        '0': <AnimPan duration={1.6} fromX={0} toX={-4} fromY={0} toY={-2} />,
                        '2.4': <AnimOut duration={0.45} />,
                    }}
                >
                    <TexteS
                        position="top-center"
                        enterAt={0.15}
                        enterDuration={0.35}
                        exitAt={1.5}
                        exitDuration={0.3}
                        width="62%"
                        className="text-[1rem] font-semibold leading-[1.25] text-white md:text-[1.5rem]"
                    >
                        Le debat sur la reforme du mode de scrutin revient a chaque crise politique.
                    </TexteS>

                    <TexteS
                        position="bottom-right"
                        enterAt={1}
                        enterDuration={0.4}
                        exitAt={2.3}
                        exitDuration={0.35}
                        enter="fade-left"
                        className="text-[0.95rem] font-medium leading-[1.23] text-white md:text-[1.35rem]"
                    >
                        mais il est plus brulant aujourd’hui, apres la dissolution de l’Assemblee nationale.
                    </TexteS>

                    <SpriteS
                        src="/img/BB.png"
                        alt=""
                        position="center-left"
                        enterAt={1.35}
                        enterDuration={0.45}
                        exitAt={2.35}
                        exitDuration={0.28}
                        width="26%"
                        className="w-full object-contain"
                        style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.35))' }}
                    />
                </ImageS>
            </SceneS>
        </div>
    );
}