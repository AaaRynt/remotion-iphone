import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile } from "remotion";
import { FINAL_SEARCH_VALUE, FPS, KEYBOARD_EVENTS, TIMELINE, WECOM_MESSAGE, WECOM_SENDER, framesAt60, getTypedValue } from "../timeline";
import { HomeIndicator, IOS_FONT, IonIcon, LiquidGlassSurface, StatusBar } from "./SystemUI";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const FEED_ROWS = [
  {
    accent: "#79a8ff",
    answerCount: "128 answers",
    title: "-------------------------",
    summary: ["--------------------------------", "----------------------"],
    votes: "2.4k",
  },
  {
    accent: "#a18bff",
    answerCount: "64 answers",
    title: "--------------------",
    summary: ["------------------------------", "-------------------------"],
    votes: "986",
  },
  {
    accent: "#65d3bd",
    answerCount: "31 answers",
    title: "---------------------------",
    summary: ["--------------------------", "------------------"],
    votes: "742",
  },
  {
    accent: "#ef8e7d",
    answerCount: "47 answers",
    title: "----------------------",
    summary: ["-----------------------------", "---------------------"],
    votes: "615",
  },
  {
    accent: "#d69af4",
    answerCount: "22 answers",
    title: "----------------------------",
    summary: ["------------------------", "---------------------------"],
    votes: "438",
  },
  {
    accent: "#e1b46b",
    answerCount: "19 answers",
    title: "------------------------",
    summary: ["-----------------------------", "------------------"],
    votes: "327",
  },
] as const;

const SEARCH_SUGGESTIONS = ["chatgpt solutions", "chatgpt solid", "chatgpt solar"] as const;

const NAV_ITEMS = [
  { icon: "home", label: "Home", selected: true },
  { icon: "compass-outline", label: "Explore", selected: false },
  { icon: "add", label: "Ask", selected: false },
  { icon: "notifications-outline", label: "Inbox", selected: false, unread: true },
  { icon: "person-outline", label: "Profile", selected: false },
] as const;

const keyPressAmount = (globalFrame: number, key: string) => {
  return KEYBOARD_EVENTS.reduce((amount, event) => {
    if (event.key !== key) {
      return amount;
    }

    return Math.max(amount, interpolate(globalFrame, [event.frame, event.frame + framesAt60(3), event.frame + framesAt60(9)], [0, 1, 0], clamp));
  }, 0);
};

const ShiftGlyph = () => (
  <svg aria-hidden="true" height="58" viewBox="0 0 64 64" width="58">
    <path d="M8 31.5 32 8l24 23.5H43V54H21V31.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="5" />
  </svg>
);

const DeleteGlyph = () => (
  <svg aria-hidden="true" height="58" viewBox="0 0 72 56" width="68">
    <path d="m25 4-20 24 20 24h37a6 6 0 0 0 6-6V10a6 6 0 0 0-6-6Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="5" />
    <path d="m39 18 16 20M55 18 39 38" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
  </svg>
);

const GlobeGlyph = () => (
  <svg aria-hidden="true" height="82" viewBox="0 0 80 80" width="82">
    <circle cx="40" cy="40" fill="none" r="33" stroke="currentColor" strokeWidth="4" />
    <path d="M7 40h66M13 22h54M13 58h54M40 7c12 11 18 22 18 33S52 62 40 73C28 62 22 51 22 40S28 18 40 7Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
  </svg>
);

const MicrophoneGlyph = () => (
  <svg aria-hidden="true" height="88" viewBox="0 0 64 88" width="64">
    <rect fill="none" height="54" rx="16" stroke="currentColor" strokeWidth="5" width="28" x="18" y="4" />
    <path d="M8 42v3c0 14 10 24 24 24s24-10 24-24v-3M32 69v13M20 82h24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
  </svg>
);

export const KeyboardKey = ({ ariaLabel, children, left, popupLabel, pressed, style, top, variant = "letter", width = 102 }: { readonly ariaLabel: string; readonly children: ReactNode; readonly left: number; readonly popupLabel?: string; readonly pressed: number; readonly style?: CSSProperties; readonly top: number; readonly variant?: "letter" | "modifier" | "action"; readonly width?: number }) => {
  const background = variant === "action" ? "#3478f6" : variant === "modifier" ? "#4b4b4d" : "#6f6f71";

  return (
    <div
      aria-label={ariaLabel}
      className="absolute grid place-items-center rounded-[16px] text-white"
      role="img"
      style={{
        left,
        top,
        width,
        height: 129,
        background,
        boxShadow: pressed > 0.02 ? "inset 0 2px 5px rgba(255,255,255,0.12), 0 2px 0 rgba(14,14,16,0.9)" : "inset 0 1px 1px rgba(255,255,255,0.08), 0 5px 0 rgba(24,24,26,0.92)",
        scale: 1 - pressed * 0.052,
        translate: `0 ${pressed * 5}px`,
        filter: `brightness(${1 + pressed * 0.18})`,
        ...style,
      }}
    >
      {popupLabel && pressed > 0.02 ? (
        <div
          className="absolute bottom-[113px] left-1/2 z-20 grid h-[148px] w-[118px] place-items-center rounded-[20px] bg-[#8a8a8c] text-[72px] font-normal shadow-[0_8px_24px_rgba(0,0,0,0.34)]"
          style={{
            opacity: interpolate(pressed, [0, 0.25, 1], [0, 1, 1], clamp),
            scale: interpolate(pressed, [0, 1], [0.92, 1], clamp),
            translate: "-50% 0",
          }}
        >
          {popupLabel}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export const IOSKeyboard = ({ globalFrame }: { readonly globalFrame: number }) => {
  const keyboardArrival = spring({
    frame: globalFrame - TIMELINE.searchStart,
    fps: FPS,
    config: { damping: 24, stiffness: 170, mass: 1 },
    durationInFrames: framesAt60(42),
  });
  const value = getTypedValue(globalFrame);
  const predictions = value === FINAL_SEARCH_VALUE ? SEARCH_SUGGESTIONS : value.length > 0 ? ([value, "solutions", "answers"] as const) : (["questions", "answers", "topics"] as const);
  const letterRows = [
    { letters: "qwertyuiop", left: 12, top: 107 },
    { letters: "asdfghjkl", left: 72, top: 269 },
    { letters: "zxcvbnm", left: 192, top: 431 },
  ] as const;

  return (
    <div
      className="absolute right-0 bottom-0 left-0 z-30 overflow-visible bg-[#313133]"
      style={{
        height: 956,
        translate: `0 ${interpolate(keyboardArrival, [0, 1], [956, 0], clamp)}px`,
        boxShadow: "0 -1px 0 rgba(255,255,255,0.08), 0 -24px 50px rgba(0,0,0,0.22)",
      }}
    >
      <div className="absolute top-0 right-0 left-0 flex h-[86px] items-center border-b border-white/[0.07] bg-[#29292b]/95 px-6">
        {predictions.map((prediction, index) => (
          <div key={`${prediction}-${index}`} className="flex h-[54px] flex-1 items-center justify-center border-white/10 px-3 text-center text-[29px] font-medium tracking-[-0.015em] text-white/86" style={{ borderLeftWidth: index === 0 ? 0 : 1 }}>
            {prediction}
          </div>
        ))}
      </div>

      {letterRows.map((row) =>
        [...row.letters].map((letter, index) => {
          const pressed = keyPressAmount(globalFrame, letter);
          return (
            <KeyboardKey key={letter} ariaLabel={letter} left={row.left + index * 120} popupLabel={letter} pressed={pressed} top={row.top}>
              <span className="text-[62px] leading-none font-normal">{letter}</span>
            </KeyboardKey>
          );
        }),
      )}

      <KeyboardKey ariaLabel="Shift" left={12} pressed={0} top={431} variant="modifier" width={138}>
        <ShiftGlyph />
      </KeyboardKey>
      <KeyboardKey ariaLabel="Delete" left={1056} pressed={keyPressAmount(globalFrame, "delete")} top={431} variant="modifier" width={138}>
        <DeleteGlyph />
      </KeyboardKey>
      <KeyboardKey ariaLabel="Numbers" left={12} pressed={0} top={593} variant="modifier" width={132}>
        <span className="text-[48px] leading-none font-normal">123</span>
      </KeyboardKey>
      <KeyboardKey ariaLabel="Emoji" left={162} pressed={0} top={593} variant="modifier" width={132}>
        <span className="text-[56px] leading-none font-normal">☺</span>
      </KeyboardKey>
      <KeyboardKey ariaLabel="Space" left={312} pressed={keyPressAmount(globalFrame, "space")} top={593} width={582}>
        <span className="text-[46px] leading-none font-normal">space</span>
      </KeyboardKey>
      <KeyboardKey ariaLabel="Search" left={912} pressed={0} top={593} variant="action" width={282}>
        <span className="text-[45px] leading-none font-medium">search</span>
      </KeyboardKey>

      <div className="absolute top-[795px] left-[84px] text-white/94">
        <GlobeGlyph />
      </div>
      <div className="absolute top-[790px] right-[96px] text-white/94">
        <MicrophoneGlyph />
      </div>
    </div>
  );
};

export const SearchField = ({ globalFrame }: { readonly globalFrame: number }) => {
  const focus = interpolate(globalFrame, [TIMELINE.searchStart, TIMELINE.searchStart + framesAt60(24)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const value = getTypedValue(globalFrame);
  const cursorOpacity = focus === 0 ? 0 : Math.floor((globalFrame - TIMELINE.searchStart) / framesAt60(28)) % 2 === 0 ? 1 : 0.28;

  return (
    <div className="absolute top-[186px] right-[52px] left-[52px] z-20 flex h-[94px] items-center">
      <LiquidGlassSurface
        className="h-[88px] rounded-[30px]"
        style={{
          width: interpolate(focus, [0, 1], [1102, 946], clamp),
          background: `rgba(26,29,38,${0.84 + focus * 0.1})`,
          borderColor: `rgba(255,255,255,${0.1 + focus * 0.08})`,
          boxShadow: focus > 0.01 ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 2px rgba(104,148,255,0.14), 0 12px 36px rgba(0,0,0,0.22)" : "inset 0 1px 0 rgba(255,255,255,0.09), 0 10px 28px rgba(0,0,0,0.16)",
        }}
      >
        <div className="flex h-full w-full items-center px-[28px]">
          <IonIcon name="search-outline" size={42} opacity={0.7} />
          <div className="ml-5 flex min-w-0 flex-1 items-center overflow-hidden text-[36px] tracking-[-0.018em] whitespace-nowrap">
            {value ? <span className="font-medium text-white">{value}</span> : <span className="font-normal text-white/42">{focus > 0.5 ? "Search" : "Search questions and answers"}</span>}
            {focus > 0.5 ? <span className="ml-[4px] h-[43px] w-[3px] rounded-full bg-[#7aa8ff]" style={{ opacity: cursorOpacity }} /> : null}
          </div>
          {focus < 0.5 ? <IonIcon name="sparkles" size={36} opacity={0.42} /> : null}
        </div>
      </LiquidGlassSurface>
      <div className="ml-6 text-[34px] font-medium whitespace-nowrap text-[#8cb4ff]" style={{ opacity: focus, translate: `${interpolate(focus, [0, 1], [18, 0], clamp)}px 0` }}>
        Cancel
      </div>
    </div>
  );
};

export const SearchSuggestions = ({ globalFrame }: { readonly globalFrame: number }) => {
  const focus = interpolate(globalFrame, [TIMELINE.searchStart + framesAt60(10), TIMELINE.searchStart + framesAt60(32)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const revealExact = interpolate(globalFrame, [framesAt60(1681), framesAt60(1698)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      className="absolute top-[330px] right-[52px] left-[52px] z-10"
      style={{
        opacity: focus,
        translate: `0 ${interpolate(focus, [0, 1], [24, 0], clamp)}px`,
      }}
    >
      <div className="mb-4 px-2 text-[27px] font-semibold tracking-[0.08em] text-white/34 uppercase">Suggestions</div>
      {SEARCH_SUGGESTIONS.map((suggestion, index) => (
        <div
          key={suggestion}
          className="flex h-[118px] items-center border-b border-white/[0.075] px-2"
          style={{
            opacity: interpolate(revealExact, [0, 1], [0.42, 1], clamp),
            translate: `${interpolate(revealExact, [0, 1], [12 + index * 4, 0], clamp)}px 0`,
          }}
        >
          <div className="mr-6 grid h-[62px] w-[62px] place-items-center rounded-full bg-white/[0.055] text-white/72">
            <IonIcon name="search-outline" size={31} opacity={0.8} />
          </div>
          <div className="flex min-w-0 flex-1 items-center text-[36px] tracking-[-0.018em]">
            <span className="font-medium text-white" style={{ opacity: revealExact }}>
              {suggestion}
            </span>
            <span className="font-medium text-white/30" style={{ opacity: 1 - revealExact }}>
              {index === 0 ? "-----------" : index === 1 ? "--------" : "------"}
            </span>
          </div>
          <IonIcon name="arrow-up-outline" size={30} opacity={0.36} />
        </div>
      ))}
    </div>
  );
};

const FeedRow = ({ accent, answerCount, summary, title, votes }: (typeof FEED_ROWS)[number]) => (
  <div className="border-b border-white/[0.075] px-[54px] py-[36px]">
    <div className="mb-6 flex items-center gap-4">
      <div
        className="h-[54px] w-[54px] rounded-full"
        style={{
          background: `linear-gradient(145deg, ${accent}, rgba(255,255,255,0.14))`,
          boxShadow: `0 0 24px ${accent}24`,
        }}
      />
      <div>
        <div className="text-[27px] font-semibold tracking-[0.05em] text-white/72">----------</div>
        <div className="mt-1 text-[22px] text-white/34">-------- · 2h</div>
      </div>
      <div className="ml-auto">
        <IonIcon name="ellipsis-horizontal" size={34} opacity={0.42} />
      </div>
    </div>
    <div className="text-[43px] leading-[1.15] font-semibold tracking-[-0.027em] text-white/94">{title}</div>
    <div className="mt-5 space-y-2 text-[29px] leading-[1.35] tracking-[0.02em] text-white/46">
      {summary.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
    <div className="mt-7 flex items-center gap-9 text-[25px] font-medium text-white/48">
      <div className="flex items-center gap-3">
        <IonIcon name="chatbubble-outline" size={31} opacity={0.68} />
        <span>{answerCount}</span>
      </div>
      <div className="flex items-center gap-3">
        <IonIcon name="thumbs-up-outline" size={31} opacity={0.68} />
        <span>{votes}</span>
      </div>
      <div className="ml-auto">
        <IonIcon name="bookmark-outline" size={32} opacity={0.56} />
      </div>
    </div>
  </div>
);

const BottomTabBar = ({ opacity }: { readonly opacity: number }) => (
  <LiquidGlassSurface
    className="absolute right-0 bottom-0 left-0 z-10 h-[178px] rounded-t-[44px] border-x-0 border-b-0"
    style={{
      opacity,
      background: "rgba(13,15,21,0.88)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.11), 0 -18px 42px rgba(0,0,0,0.18)",
    }}
  >
    <div className="grid h-[132px] grid-cols-5 items-center px-[28px]">
      {NAV_ITEMS.map((item) => (
        <div key={item.label} className="relative flex flex-col items-center gap-2">
          <div className="relative grid h-[58px] w-[84px] place-items-center rounded-[24px]" style={{ background: item.selected ? "rgba(102,146,255,0.18)" : "transparent" }}>
            <IonIcon name={item.icon} size={36} opacity={item.selected ? 1 : 0.5} />
            {"unread" in item && item.unread ? <div className="absolute top-[4px] right-[9px] grid h-[25px] min-w-[25px] place-items-center rounded-full bg-[#ff453a] px-1 text-[16px] font-bold text-white">3</div> : null}
          </div>
          <span className="text-[21px] font-medium" style={{ color: item.selected ? "#8eb5ff" : "rgba(255,255,255,0.4)" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </LiquidGlassSurface>
);

export const QAFeed = ({ globalFrame }: { readonly globalFrame: number }) => {
  const focus = interpolate(globalFrame, [TIMELINE.searchStart, TIMELINE.searchStart + framesAt60(28)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#07090f] text-white">
      <div className="absolute inset-x-0 top-0 h-[430px] bg-[radial-gradient(circle_at_18%_0%,rgba(55,86,153,0.18),transparent_55%)]" />
      <SearchField globalFrame={globalFrame} />
      <div className="absolute top-[322px] right-[54px] left-[54px] flex items-center gap-9 border-b border-white/[0.08] pb-[24px]" style={{ opacity: 1 - focus, translate: `0 ${interpolate(focus, [0, 1], [0, -18], clamp)}px` }}>
        <span className="text-[34px] font-semibold text-white">For You</span>
        <span className="text-[34px] font-medium text-white/38">Following</span>
        <span className="text-[34px] font-medium text-white/38">Topics</span>
        <div className="ml-auto flex items-center gap-3 text-[24px] text-white/34">
          <IonIcon name="sparkles" size={29} opacity={0.55} />
          <span>Curated</span>
        </div>
        <div className="absolute -bottom-[2px] left-0 h-[4px] w-[108px] rounded-full bg-[#79a8ff]" />
      </div>
      <div
        className="absolute top-[386px] right-0 bottom-0 left-0 overflow-hidden pb-[220px]"
        style={{
          opacity: 1 - focus,
          translate: `0 ${interpolate(focus, [0, 1], [0, -36], clamp)}px`,
          filter: `blur(${focus * 3}px)`,
        }}
      >
        {FEED_ROWS.map((row) => (
          <FeedRow key={row.answerCount} {...row} />
        ))}
      </div>
      <SearchSuggestions globalFrame={globalFrame} />
      <BottomTabBar opacity={1 - focus} />
      <IOSKeyboard globalFrame={globalFrame} />
    </AbsoluteFill>
  );
};

const SplashAd = ({ globalFrame }: { readonly globalFrame: number }) => {
  const countdown = globalFrame < TIMELINE.splashStart + FPS ? 2 : 1;
  const settle = interpolate(globalFrame, [TIMELINE.splashStart, TIMELINE.splashStart + framesAt60(30)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const pillSettle = interpolate(globalFrame, [TIMELINE.splashStart, TIMELINE.splashStart + framesAt60(10)], [0.42, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill className="overflow-hidden bg-[#03050a]">
      <div
        className="absolute rounded-full bg-[#244a9c]/30"
        style={{
          width: 940,
          height: 940,
          left: -360,
          top: 430,
          opacity: 0.5 * settle,
          scale: interpolate(settle, [0, 1], [0.88, 1], clamp),
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute rounded-full bg-[#4b2f85]/24"
        style={{
          width: 820,
          height: 1120,
          right: -350,
          top: 980,
          opacity: 0.58 * settle,
          rotate: "-18deg",
          filter: "blur(130px)",
        }}
      />
      <div
        className="absolute top-[760px] left-[110px] h-[820px] w-[986px] rounded-[48%] border border-white/[0.055]"
        style={{
          opacity: interpolate(settle, [0, 1], [0, 0.66], clamp),
          rotate: "-23deg",
          background: "linear-gradient(145deg, rgba(84,124,211,0.07), rgba(8,10,19,0.02))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      />
      <LiquidGlassSurface
        className="absolute top-[180px] right-[56px] h-[68px] w-[98px] rounded-[28px]"
        style={{
          background: "rgba(18,21,29,0.76)",
          opacity: pillSettle,
          scale: interpolate(pillSettle, [0.42, 1], [0.95, 1], clamp),
        }}
      >
        <div className="grid h-full w-full place-items-center">
          <span className="text-[33px] font-semibold text-white/86 tabular-nums">{countdown}</span>
        </div>
      </LiquidGlassSurface>
    </AbsoluteFill>
  );
};

export const SystemNotification = ({ globalFrame }: { readonly globalFrame: number }) => {
  if (globalFrame < TIMELINE.notificationStart || globalFrame > TIMELINE.notificationEnd) {
    return null;
  }

  const entry = spring({
    frame: globalFrame - TIMELINE.notificationStart,
    fps: FPS,
    config: { damping: 23, stiffness: 185, mass: 0.92 },
    durationInFrames: framesAt60(36),
  });
  const exit = interpolate(globalFrame, [TIMELINE.notificationExitStart, TIMELINE.notificationEnd], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const pathPosition = entry * (1 - exit);

  return (
    <div
      className="absolute top-[132px] right-[34px] left-[34px] z-[70]"
      style={{
        opacity: entry * interpolate(exit, [0, 0.72, 1], [1, 1, 0], clamp),
        scale: interpolate(pathPosition, [0, 1], [0.96, 1], clamp),
        translate: `0 ${interpolate(pathPosition, [0, 1], [-276, 0], clamp)}px`,
        filter: `blur(${interpolate(pathPosition, [0, 1], [12, 0], clamp)}px)`,
      }}
    >
      <LiquidGlassSurface
        className="h-[214px] overflow-hidden rounded-[52px]"
        style={{
          background: "rgba(24,27,34,0.88)",
          borderColor: "rgba(255,255,255,0.15)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 34px rgba(0,0,0,0.22)",
        }}
      >
        <div className="flex h-full w-full items-center px-[26px]">
          <Img src={staticFile("images/wecom.png")} className="h-[104px] w-[104px] shrink-0 rounded-[25px] object-cover" />
          <div className="ml-[24px] min-w-0 flex-1">
            <div className="mb-[10px] flex items-baseline gap-4">
              <div className="min-w-0 flex-1 truncate text-[35px] font-semibold tracking-[-0.018em] text-white">{WECOM_SENDER}</div>
              <div className="text-[25px] font-medium text-white/38">now</div>
            </div>
            <div
              className="overflow-hidden text-[30px] leading-[1.35] font-normal tracking-[-0.012em] whitespace-nowrap text-white/82"
              style={{
                WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 76%, transparent 100%)",
                maskImage: "linear-gradient(90deg, #000 0%, #000 76%, transparent 100%)",
              }}
            >
              {WECOM_MESSAGE}
            </div>
          </div>
        </div>
      </LiquidGlassSurface>
    </div>
  );
};

export const QAAApp = ({ globalFrame }: { readonly globalFrame: number }) => {
  const opening = interpolate(globalFrame, [TIMELINE.appOpenStart, TIMELINE.splashStart], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  });
  const splashOpacity = interpolate(globalFrame, [framesAt60(1158), TIMELINE.feedStart], [1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const feedOpacity = interpolate(globalFrame, [framesAt60(1162), TIMELINE.feedStart + framesAt60(12)], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const insetTop = interpolate(opening, [0, 1], [243, 0], clamp);
  const insetRight = interpolate(opening, [0, 1], [668, 0], clamp);
  const insetBottom = interpolate(opening, [0, 1], [2233, 0], clamp);
  const insetLeft = interpolate(opening, [0, 1], [392, 0], clamp);
  const cornerRadius = interpolate(opening, [0, 1], [35, 0], clamp);
  const systemOpacity = interpolate(opening, [0.86, 1], [0, 1], clamp);
  const sourceIconOpacity = interpolate(globalFrame, [TIMELINE.appOpenStart, TIMELINE.appOpenStart + framesAt60(4), TIMELINE.appOpenStart + framesAt60(12)], [1, 1, 0], clamp);

  return (
    <AbsoluteFill
      className="overflow-hidden bg-transparent"
      style={{
        fontFamily: IOS_FONT,
        opacity: globalFrame < TIMELINE.appOpenStart ? 0 : 1,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden bg-[#03050a]"
        style={{
          clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round ${cornerRadius}px)`,
          transformOrigin: "465px 316px",
          scale: interpolate(opening, [0, 1], [0.98, 1], clamp),
          filter: `blur(${interpolate(opening, [0, 1], [5, 0], clamp)}px)`,
        }}
      >
        <div className="absolute inset-0" style={{ opacity: splashOpacity }}>
          <SplashAd globalFrame={globalFrame} />
        </div>
        <div className="absolute inset-0" style={{ opacity: feedOpacity }}>
          <QAFeed globalFrame={globalFrame} />
        </div>
        <div
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(145deg, #2479ff 0%, #0c3da7 52%, #071e5f 100%)",
            opacity: sourceIconOpacity,
          }}
        >
          <div
            className="absolute grid h-[146px] w-[146px] place-items-center"
            style={{
              left: 392,
              scale: interpolate(opening, [0, 0.34], [1, 1.42], clamp),
              top: 243,
            }}
          >
            <IonIcon name="chatbubble" size={72} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-50" style={{ opacity: systemOpacity }}>
        <StatusBar globalFrame={globalFrame} />
        <HomeIndicator />
      </div>
      <SystemNotification globalFrame={globalFrame} />
    </AbsoluteFill>
  );
};
