import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, spring } from "remotion";
import { FPS, TIMELINE, WIDTH, framesAt60 } from "../timeline";
import { HomeIndicator, IonIcon, type IonIconName, LiquidGlassSurface, StatusBar, WallpaperLayer } from "./SystemUI";

type AppSpec = {
  readonly glyph: IonIconName;
  readonly gradient: string;
  readonly label: string;
  readonly qa?: boolean;
};

const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const FIRST_PAGE_APPS: readonly AppSpec[] = [
  { glyph: "calendar-outline", gradient: "linear-gradient(145deg, #f7f7fa 0%, #d8dbe4 100%)", label: "------" },
  { glyph: "checkmark-circle-outline", gradient: "linear-gradient(145deg, #ffd851 0%, #e5a811 100%)", label: "-----" },
  { glyph: "search-outline", gradient: "linear-gradient(145deg, #6e8dff 0%, #3b43c7 100%)", label: "------" },
  { glyph: "compass", gradient: "linear-gradient(145deg, #50b8ff 0%, #1261d2 100%)", label: "-----" },
  { glyph: "mail-outline", gradient: "linear-gradient(145deg, #59b8ff 0%, #1467e8 100%)", label: "------" },
  { glyph: "camera", gradient: "linear-gradient(145deg, #f3f3f6 0%, #9498a6 100%)", label: "-----" },
  { glyph: "sparkles", gradient: "linear-gradient(145deg, #ff668d 0%, #b81756 100%)", label: "------" },
  { glyph: "settings", gradient: "linear-gradient(145deg, #a9afbd 0%, #4a4f5b 100%)", label: "-----" },
  { glyph: "heart", gradient: "linear-gradient(145deg, #ff6d7d 0%, #d01e3c 100%)", label: "------" },
  { glyph: "bulb-outline", gradient: "linear-gradient(145deg, #ff9c50 0%, #dd5219 100%)", label: "-----" },
  { glyph: "send-outline", gradient: "linear-gradient(145deg, #5adb72 0%, #148c3e 100%)", label: "------" },
  { glyph: "person", gradient: "linear-gradient(145deg, #b396ff 0%, #6546bd 100%)", label: "-----" },
] as const;

const SECOND_PAGE_APPS: readonly AppSpec[] = [
  { glyph: "compass-outline", gradient: "linear-gradient(145deg, #53d1c6 0%, #176e7d 100%)", label: "------" },
  {
    glyph: "chatbubble",
    gradient: "linear-gradient(145deg, #2479ff 0%, #0c3da7 52%, #071e5f 100%)",
    label: "Answers",
    qa: true,
  },
  { glyph: "sparkles", gradient: "linear-gradient(145deg, #765dff 0%, #392088 100%)", label: "-----" },
  { glyph: "camera", gradient: "linear-gradient(145deg, #ff7b86 0%, #a42752 100%)", label: "------" },
  { glyph: "bulb-outline", gradient: "linear-gradient(145deg, #f4a65e 0%, #9e4c1d 100%)", label: "-----" },
  { glyph: "compass", gradient: "linear-gradient(145deg, #54aef8 0%, #2354b2 100%)", label: "------" },
  { glyph: "calendar-outline", gradient: "linear-gradient(145deg, #f1f2f6 0%, #8f94a2 100%)", label: "-----" },
  { glyph: "checkmark-circle-outline", gradient: "linear-gradient(145deg, #42cba8 0%, #15765f 100%)", label: "------" },
  { glyph: "mail-outline", gradient: "linear-gradient(145deg, #51a9ff 0%, #1256b6 100%)", label: "-----" },
  { glyph: "heart", gradient: "linear-gradient(145deg, #ff7896 0%, #ae234c 100%)", label: "------" },
  { glyph: "sparkles", gradient: "linear-gradient(145deg, #d86bff 0%, #6d238e 100%)", label: "-----" },
  { glyph: "settings", gradient: "linear-gradient(145deg, #9ca3af 0%, #414754 100%)", label: "------" },
  { glyph: "send-outline", gradient: "linear-gradient(145deg, #50d978 0%, #168a42 100%)", label: "-----" },
  { glyph: "search-outline", gradient: "linear-gradient(145deg, #547eff 0%, #2c3b9d 100%)", label: "------" },
  { glyph: "person", gradient: "linear-gradient(145deg, #b783ff 0%, #6043aa 100%)", label: "-----" },
  { glyph: "partly-sunny-outline", gradient: "linear-gradient(145deg, #56c7e7 0%, #126780 100%)", label: "------" },
] as const;

const DOCK_APPS: readonly AppSpec[] = [
  { glyph: "send-outline", gradient: "linear-gradient(145deg, #5ce274 0%, #17923d 100%)", label: "" },
  { glyph: "mail-outline", gradient: "linear-gradient(145deg, #5bbaff 0%, #1268de 100%)", label: "" },
  { glyph: "camera", gradient: "linear-gradient(145deg, #f5f5f7 0%, #989daa 100%)", label: "" },
  { glyph: "sparkles", gradient: "linear-gradient(145deg, #ff668d 0%, #b81756 100%)", label: "" },
] as const;

const weekDays: readonly { readonly day: string; readonly date: string; readonly selected?: boolean }[] = [
  { day: "M", date: "13" },
  { day: "T", date: "14" },
  { day: "W", date: "15" },
  { day: "T", date: "16" },
  { day: "F", date: "17", selected: true },
  { day: "S", date: "18" },
  { day: "S", date: "19" },
] as const;

const todoRows: readonly { readonly text: string; readonly active?: boolean; readonly done?: boolean }[] = [{ text: "-----------", done: true }, { text: "--------", active: true }, { text: "----------", done: true }, { text: "------" }] as const;

const AppIcon = ({ app, pressed = 0, compact = false }: { app: AppSpec; pressed?: number; compact?: boolean }) => {
  const size = compact ? 150 : 156;
  const iconSize = compact ? 72 : 76;
  const iconStyle: CSSProperties = {
    alignItems: "center",
    background: app.gradient,
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: compact ? 38 : 40,
    boxShadow: app.qa ? "0 18px 42px rgba(7,40,126,0.5), inset 0 1px 1px rgba(255,255,255,0.32)" : "0 15px 34px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.24)",
    display: "flex",
    height: size,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    scale: 1 - pressed * 0.095,
    width: size,
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: compact ? 16 : 18 }}>
      <div style={iconStyle}>
        <div
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 52%)",
            inset: 0,
            opacity: 0.72 + pressed * 0.2,
            position: "absolute",
          }}
        />
        <IonIcon className="block shrink-0 object-contain" name={app.glyph} style={{ height: iconSize, opacity: 0.97, width: iconSize }} />
        {app.qa ? (
          <div
            style={{
              background: "rgba(255,255,255,0.94)",
              borderRadius: 999,
              boxShadow: "0 0 16px rgba(137,188,255,0.55)",
              height: 13,
              position: "absolute",
              right: 33,
              top: 32,
              width: 13,
            }}
          />
        ) : null}
        <div
          style={{
            background: "rgba(255,255,255,0.16)",
            inset: 0,
            opacity: pressed,
            position: "absolute",
          }}
        />
      </div>
      {app.label ? (
        <div className="font-medium text-white" style={{ fontSize: 30, letterSpacing: -0.4, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
          {app.label}
        </div>
      ) : null}
    </div>
  );
};

const WeeklyScheduleWidget = () => {
  return (
    <LiquidGlassSurface className="relative overflow-hidden text-white" style={{ borderRadius: 52, height: 610, padding: "38px 34px 32px" }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold" style={{ fontSize: 40, letterSpacing: -1.1 }}>
            This Week
          </div>
          <div className="text-white/55" style={{ fontSize: 26, marginTop: 3 }}>
            July 13–19
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ background: "rgba(105,126,255,0.22)", borderRadius: 22, height: 64, width: 64 }}>
          <IonIcon className="block shrink-0 object-contain" name="calendar-outline" style={{ height: 36, opacity: 0.95, width: 36 }} />
        </div>
      </div>

      <div className="grid grid-cols-7" style={{ gap: 5, marginTop: 29 }}>
        {weekDays.map((item, index) => (
          <div className="flex flex-col items-center" key={`${item.day}-${item.date}`} style={{ gap: 8 }}>
            <div className="font-medium text-white/55" style={{ fontSize: 20 }}>
              {item.day}
            </div>
            <div
              className="flex items-center justify-center font-semibold"
              style={{
                background: item.selected ? "rgba(111,135,255,0.88)" : "rgba(255,255,255,0.055)",
                border: item.selected ? "1px solid rgba(214,223,255,0.55)" : "1px solid rgba(255,255,255,0.045)",
                borderRadius: 999,
                boxShadow: item.selected ? "0 8px 20px rgba(42,64,181,0.35)" : undefined,
                fontSize: 22,
                height: 48,
                opacity: index > 4 ? 0.68 : 1,
                width: 48,
              }}
            >
              {item.date}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.085)", marginTop: 31, paddingTop: 22 }}>
        <div className="flex items-center" style={{ gap: 18 }}>
          <div style={{ background: "#7b91ff", borderRadius: 99, height: 42, width: 6 }} />
          <div className="flex-1">
            <div className="font-semibold text-white/90" style={{ fontSize: 27, lineHeight: 1.05 }}>
              -----------
            </div>
            <div className="text-white/46" style={{ fontSize: 22, marginTop: 8 }}>
              19:30 · ------
            </div>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 18, marginTop: 24 }}>
          <div style={{ background: "#c481ff", borderRadius: 99, height: 42, width: 6 }} />
          <div className="flex-1">
            <div className="font-semibold text-white/86" style={{ fontSize: 27, lineHeight: 1.05 }}>
              --------
            </div>
            <div className="text-white/42" style={{ fontSize: 22, marginTop: 8 }}>
              21:00 · -------
            </div>
          </div>
        </div>
      </div>
    </LiquidGlassSurface>
  );
};

const TodoWidget = () => {
  return (
    <LiquidGlassSurface className="relative overflow-hidden text-white" style={{ borderRadius: 52, height: 610, padding: "38px 30px 28px" }}>
      <div className="flex items-center justify-between" style={{ paddingInline: 4 }}>
        <div>
          <div className="font-semibold" style={{ fontSize: 40, letterSpacing: -1.1 }}>
            Todo List
          </div>
          <div className="text-white/52" style={{ fontSize: 26, marginTop: 3 }}>
            2 remaining
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ background: "rgba(116,102,231,0.2)", borderRadius: 22, height: 64, width: 64 }}>
          <IonIcon className="block shrink-0 object-contain" name="checkmark-circle-outline" style={{ height: 38, opacity: 0.95, width: 38 }} />
        </div>
      </div>

      <div style={{ marginTop: 27 }}>
        {todoRows.map((row, index) => (
          <div
            className="flex items-center"
            key={`${row.text}-${index}`}
            style={{
              background: row.active ? "rgba(91,111,232,0.16)" : "transparent",
              border: row.active ? "1px solid rgba(143,160,255,0.16)" : "1px solid transparent",
              borderRadius: 24,
              gap: 17,
              minHeight: 78,
              opacity: row.done ? 0.55 : 1,
              padding: "10px 14px",
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center font-bold"
              style={{
                background: row.done ? "rgba(125,143,255,0.78)" : "rgba(255,255,255,0.035)",
                border: row.done ? "1px solid rgba(211,218,255,0.5)" : "2px solid rgba(255,255,255,0.34)",
                borderRadius: 999,
                color: "white",
                fontSize: 19,
                height: 36,
                width: 36,
              }}
            >
              {row.done ? "✓" : ""}
            </div>
            <div
              className="font-semibold"
              style={{
                color: row.active ? "rgba(224,229,255,0.96)" : "rgba(255,255,255,0.82)",
                fontSize: 27,
                letterSpacing: 0.7,
                textDecoration: row.done ? "line-through" : "none",
              }}
            >
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </LiquidGlassSurface>
  );
};

const FirstHomePage = ({ swipeProgress }: { swipeProgress: number }) => {
  return (
    <div
      className="relative shrink-0"
      style={{
        filter: `blur(${swipeProgress * 1.6}px)`,
        height: "100%",
        opacity: 1 - swipeProgress * 0.25,
        scale: 1 - swipeProgress * 0.018,
        width: WIDTH,
      }}
    >
      <div style={{ left: 64, position: "absolute", right: 64, top: 204 }}>
        <div className="grid grid-cols-2" style={{ gap: 34 }}>
          <WeeklyScheduleWidget />
          <TodoWidget />
        </div>
        <div className="grid grid-cols-4" style={{ columnGap: 24, marginTop: 65, rowGap: 48 }}>
          {FIRST_PAGE_APPS.map((app, index) => (
            <AppIcon app={app} compact key={`${app.glyph}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SecondHomePage = ({ swipeProgress, pressProgress }: { swipeProgress: number; pressProgress: number }) => {
  return (
    <div
      className="relative shrink-0"
      style={{
        filter: `blur(${(1 - swipeProgress) * 1.2}px)`,
        height: "100%",
        opacity: 0.67 + swipeProgress * 0.33,
        scale: 0.976 + swipeProgress * 0.024,
        width: WIDTH,
      }}
    >
      <div className="grid grid-cols-4" style={{ columnGap: 24, left: 64, position: "absolute", right: 64, rowGap: 62, top: 238 }}>
        {SECOND_PAGE_APPS.map((app, index) => (
          <AppIcon app={app} key={`${app.glyph}-${index}`} pressed={app.qa ? pressProgress : 0} />
        ))}
      </div>
    </div>
  );
};

const PageIndicator = ({ swipeProgress }: { swipeProgress: number }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        backdropFilter: "blur(16px) saturate(135%)",
        background: "rgba(13,12,28,0.24)",
        border: "1px solid rgba(255,255,255,0.095)",
        borderRadius: 999,
        bottom: 358,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        height: 40,
        left: "50%",
        position: "absolute",
        translate: "-50% 0",
        width: 90,
      }}
    >
      <div style={{ background: "rgba(255,255,255,0.3)", borderRadius: 999, height: 11, left: 25, position: "absolute", width: 11 }} />
      <div style={{ background: "rgba(255,255,255,0.3)", borderRadius: 999, height: 11, left: 54, position: "absolute", width: 11 }} />
      <div
        style={{
          background: "rgba(255,255,255,0.94)",
          borderRadius: 999,
          boxShadow: "0 1px 8px rgba(255,255,255,0.24)",
          height: 15,
          left: 23,
          position: "absolute",
          translate: `${swipeProgress * 29}px 0`,
          width: 15,
        }}
      />
    </div>
  );
};

const Dock = () => {
  return (
    <LiquidGlassSurface className="overflow-hidden" style={{ borderRadius: 64, bottom: 67, height: 244, left: 54, position: "absolute", right: 54 }}>
      <div className="flex h-full w-full items-center justify-around" style={{ paddingInline: 28 }}>
        {DOCK_APPS.map((app, index) => (
          <AppIcon app={app} compact key={`${app.glyph}-${index}`} />
        ))}
      </div>
    </LiquidGlassSurface>
  );
};

export const HomeScreen = ({ globalFrame }: { globalFrame: number }) => {
  const unlockSpring = spring({
    config: { damping: 25, mass: 0.86, stiffness: 175 },
    durationInFrames: framesAt60(42),
    fps: FPS,
    frame: Math.max(0, globalFrame - TIMELINE.homePremountStart),
  });
  const unlockProgress = Math.min(1, Math.max(0, unlockSpring));

  const rawSwipe = spring({
    config: { damping: 27, mass: 0.9, stiffness: 185, overshootClamping: true },
    durationInFrames: TIMELINE.homeSwipeEnd - TIMELINE.homeSwipeStart,
    fps: FPS,
    frame: Math.max(0, globalFrame - TIMELINE.homeSwipeStart),
  });
  const swipeProgress = Math.min(1, Math.max(0, rawSwipe));

  const pressProgress = interpolate(globalFrame, [TIMELINE.appPressStart, TIMELINE.appOpenStart, TIMELINE.appOpenStart + framesAt60(12)], [0, 1, 0], CLAMP);
  const appOpenProgress = interpolate(globalFrame, [TIMELINE.appOpenStart, TIMELINE.splashStart], [0, 1], { ...CLAMP, easing: Easing.bezier(0.32, 0, 0.16, 1) });

  const unlockOpacity = interpolate(unlockProgress, [0, 0.62], [0, 1], CLAMP);
  const unlockScale = interpolate(unlockProgress, [0, 1], [1.085, 1], CLAMP);
  const unlockBlur = interpolate(unlockProgress, [0, 1], [18, 0], CLAMP);
  const appRecedeScale = interpolate(appOpenProgress, [0, 1], [1, 0.965], CLAMP);
  const appRecedeOpacity = interpolate(appOpenProgress, [0, 1], [1, 0.58], CLAMP);
  const appRecedeBlur = interpolate(appOpenProgress, [0, 1], [0, 9], CLAMP);

  const wallpaperX = interpolate(swipeProgress, [0, 1], [8, -12], CLAMP);
  const wallpaperY = interpolate(globalFrame, [TIMELINE.homePremountStart, TIMELINE.splashStart], [5, -5], CLAMP);
  const wallpaperScale = interpolate(unlockProgress, [0, 1], [1.065, 1.035], CLAMP);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#04030b",
        filter: `blur(${unlockBlur}px)`,
        opacity: unlockOpacity,
        overflow: "hidden",
        scale: unlockScale,
        transformOrigin: "38% 17%",
      }}
    >
      <AbsoluteFill
        style={{
          filter: `blur(${appRecedeBlur}px)`,
          opacity: appRecedeOpacity,
          scale: appRecedeScale,
          transformOrigin: "38% 17%",
        }}
      >
        <WallpaperLayer
          globalFrame={globalFrame}
          kind="home"
          style={{
            filter: "brightness(0.7) saturate(0.96)",
            scale: wallpaperScale,
            translate: `${wallpaperX}px ${wallpaperY}px`,
          }}
        />

        <AbsoluteFill
          style={{
            background: "linear-gradient(180deg, rgba(2,2,9,0.27) 0%, rgba(2,2,9,0.02) 24%, rgba(1,1,8,0.05) 67%, rgba(1,1,8,0.28) 100%)",
          }}
        />

        <AbsoluteFill style={{ overflow: "hidden" }}>
          <div
            className="flex"
            style={{
              height: "100%",
              translate: `${-WIDTH * swipeProgress}px 0`,
              width: WIDTH * 2,
            }}
          >
            <FirstHomePage swipeProgress={swipeProgress} />
            <SecondHomePage pressProgress={pressProgress} swipeProgress={swipeProgress} />
          </div>
        </AbsoluteFill>

        <PageIndicator swipeProgress={swipeProgress} />
        <Dock />
      </AbsoluteFill>

      <StatusBar globalFrame={globalFrame} />
      <HomeIndicator />
    </AbsoluteFill>
  );
};
