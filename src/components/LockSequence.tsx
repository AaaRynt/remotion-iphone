import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PASSCODE_EVENTS, TIMELINE, formatVirtualTime } from "../timeline";
import { DynamicIsland, HomeIndicator, IOS_FONT, IonIcon, LiquidGlassSurface, StatusBar, SystemRoundButton, Wallpaper } from "./SystemUI";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const MagSafeCharging = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrival = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 115, mass: 0.9 },
    durationInFrames: 52,
  });
  const exit = interpolate(frame, [122, 149], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const glow = interpolate(frame, [0, 28, 68, 120], [0, 0.72, 0.48, 0.34], {
    ...clamp,
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill className="items-center justify-center overflow-hidden bg-black" style={{ fontFamily: IOS_FONT, opacity: exit }}>
      <div
        className="absolute rounded-full"
        style={{
          width: 650,
          height: 650,
          opacity: glow,
          scale: 0.92 + arrival * 0.08,
          background: "radial-gradient(circle, rgba(75,255,139,0.22) 0%, rgba(47,210,112,0.08) 43%, transparent 72%)",
          filter: `blur(${interpolate(frame, [0, 36], [34, 9], clamp)}px)`,
        }}
      />
      <div
        className="relative grid place-items-center rounded-full"
        style={{
          width: 470,
          height: 470,
          opacity: interpolate(arrival, [0, 1], [0, 1], clamp),
          scale: interpolate(arrival, [0, 1], [0.78, 1], clamp),
          filter: `blur(${interpolate(arrival, [0, 1], [14, 0], clamp)}px)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            rotate: `${interpolate(frame, [0, 150], [-18, 22], clamp)}deg`,
            background: "conic-gradient(from 214deg, rgba(55,220,116,0.10), rgba(76,239,137,0.96) 28%, rgba(118,255,170,0.36) 56%, rgba(46,185,98,0.08) 84%, rgba(55,220,116,0.10))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 19px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 20px), #000 calc(100% - 19px))",
            boxShadow: "inset 0 0 20px rgba(152,255,193,0.16), 0 0 44px rgba(67,228,128,0.16)",
          }}
        />
        <LiquidGlassSurface className="grid place-items-center rounded-full text-center" style={{ width: 378, height: 378, background: "rgba(10,15,13,0.72)" }}>
          <div className="flex flex-col items-center">
            <div className="mb-8 flex items-center gap-4 text-[#67e68f]">
              <div className="relative rounded-[13px] border-[5px] border-current" style={{ width: 74, height: 38 }}>
                <div
                  className="absolute top-[4px] bottom-[4px] left-[4px] rounded-[5px] bg-current"
                  style={{
                    width: interpolate(frame, [12, 68], [20, 52], clamp),
                  }}
                />
                <div className="absolute top-[9px] -right-[10px] h-[12px] w-[6px] rounded-r bg-current opacity-70" />
              </div>
              <span className="text-[42px] leading-none">⚡</span>
            </div>
            <div className="text-[96px] font-semibold tracking-[-0.06em] text-white">
              72<span className="ml-1 text-[46px] font-medium text-white/75">%</span>
            </div>
            <div className="mt-4 text-[25px] font-medium tracking-[0.08em] text-white/48">CHARGING</div>
          </div>
        </LiquidGlassSurface>
      </div>
    </AbsoluteFill>
  );
};

const LockIcon = () => (
  <div className="relative h-[38px] w-[32px]">
    <div className="absolute top-0 left-[5px] h-[23px] w-[22px] rounded-t-full border-[5px] border-white/90" />
    <div className="absolute bottom-0 left-0 h-[23px] w-[32px] rounded-[7px] bg-white/90" />
  </div>
);

const LockScreenContent = ({ localFrame }: { readonly localFrame: number }) => {
  const globalFrame = TIMELINE.lockScreenStart + localFrame;
  const reveal = interpolate(localFrame, [0, 24], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const swipe = interpolate(localFrame, [180, 240], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: reveal * (1 - swipe),
        scale: interpolate(swipe, [0, 1], [1, 0.965], clamp),
        translate: `0 ${interpolate(swipe, [0, 1], [0, -330], clamp)}px`,
        filter: `blur(${interpolate(swipe, [0, 1], [0, 13], clamp)}px)`,
      }}
    >
      <StatusBar globalFrame={globalFrame} />
      <div className="absolute top-[230px] right-0 left-0 flex flex-col items-center text-white">
        <div className="mb-6 flex items-center gap-4 text-[34px] font-medium tracking-[-0.02em] text-white/88">
          <span>Friday, July 17</span>
          <span className="text-white/38">·</span>
          <IonIcon name="partly-sunny-outline" size={38} opacity={0.86} />
          <span>Clear 24°</span>
        </div>
        <div className="leading-[0.88] font-light text-white" style={{ fontSize: 282, letterSpacing: "-0.075em" }}>
          {formatVirtualTime(globalFrame)}
        </div>
        <div className="mt-12 flex items-center gap-3 text-[28px] font-medium text-white/62">
          <IonIcon name="moon-outline" size={32} opacity={0.72} />
          <span>Low 21°</span>
          <span className="mx-2 text-white/30">•</span>
          <span>Quiet night</span>
        </div>
      </div>
      <div className="absolute right-[105px] bottom-[128px] left-[105px] flex items-center justify-between">
        <SystemRoundButton ariaLabel="Flashlight" size="large">
          <IonIcon name="flashlight" size={70} />
        </SystemRoundButton>
        <SystemRoundButton ariaLabel="Camera" size="large">
          <IonIcon name="camera" size={72} />
        </SystemRoundButton>
      </div>
      <HomeIndicator />
    </AbsoluteFill>
  );
};

const keypad = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
  ["0", ""],
] as const;

const PasscodeKey = ({ digit, letters, globalFrame }: { readonly digit: string; readonly letters: string; readonly globalFrame: number }) => {
  const pressFrame = PASSCODE_EVENTS.find((event) => event.key === digit)?.frame;
  const press = pressFrame === undefined ? 0 : interpolate(globalFrame, [pressFrame, pressFrame + 3, pressFrame + 10], [0, 1, 0], clamp);

  return (
    <LiquidGlassSurface
      className="rounded-full"
      style={{
        width: 210,
        height: 210,
        scale: 1 - press * 0.065,
        translate: `0 ${press * 8}px`,
        background: `rgba(126,127,158,${0.24 + press * 0.2})`,
        borderColor: `rgba(255,255,255,${0.18 + press * 0.22})`,
        boxShadow: press > 0.01 ? "inset 0 2px 14px rgba(255,255,255,0.2), 0 5px 18px rgba(0,0,0,0.12)" : "inset 0 1px 4px rgba(255,255,255,0.1), 0 14px 32px rgba(0,0,0,0.14)",
      }}
    >
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <div className="text-[88px] leading-[0.84] font-light tracking-[-0.04em] text-white">{digit}</div>
        {letters ? <div className="mt-4 text-[24px] font-semibold tracking-[0.28em] text-white/88">{letters}</div> : null}
      </div>
    </LiquidGlassSurface>
  );
};

const PasscodeScreenContent = ({ localFrame }: { readonly localFrame: number }) => {
  const globalFrame = TIMELINE.lockScreenStart + localFrame;
  const appearance = interpolate(localFrame, [180, 230], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const unlock = interpolate(localFrame, [414, 450], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  });
  const filledDots = PASSCODE_EVENTS.filter((event) => globalFrame >= event.frame + 3).length;

  return (
    <AbsoluteFill
      style={{
        opacity: appearance * (1 - unlock),
        scale: interpolate(unlock, [0, 1], [1, 1.105], clamp),
        translate: `0 ${interpolate(unlock, [0, 1], [0, -70], clamp)}px`,
        filter: `blur(${interpolate(unlock, [0, 1], [0, 14], clamp)}px)`,
      }}
    >
      <div className="absolute inset-0 bg-[rgba(3,4,16,0.34)]" />
      <div className="absolute top-[34px] right-0 left-0 flex justify-center" style={{ translate: `0 ${interpolate(appearance, [0, 1], [22, 0], clamp)}px` }}>
        <DynamicIsland>
          <LockIcon />
        </DynamicIsland>
      </div>
      <div className="absolute top-[410px] right-0 left-0 flex flex-col items-center text-center text-white" style={{ translate: `0 ${interpolate(appearance, [0, 1], [64, 0], clamp)}px` }}>
        <div className="text-[58px] font-medium tracking-[-0.035em]">Enter Passcode</div>
        <div className="mt-5 max-w-[560px] text-[32px] leading-[1.25] font-normal text-white/72">
          Your passcode is required
          <br />
          to enable Face ID
        </div>
        <div className="mt-14 flex gap-[68px]">
          {PASSCODE_EVENTS.map((event, index) => {
            const filled = index < filledDots;
            return (
              <div
                key={event.frame}
                className="h-[25px] w-[25px] rounded-full border-[3px] border-white/90"
                style={{
                  backgroundColor: filled ? "rgba(255,255,255,0.96)" : "transparent",
                  scale: globalFrame >= event.frame && globalFrame <= event.frame + 9 ? interpolate(globalFrame, [event.frame, event.frame + 4, event.frame + 9], [0.7, 1.22, 1], clamp) : 1,
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute top-[910px] right-[159px] left-[159px] grid grid-cols-3 justify-items-center gap-x-[100px] gap-y-[75px]" style={{ translate: `0 ${interpolate(appearance, [0, 1], [110, 0], clamp)}px` }}>
        {keypad.slice(0, 9).map(([digit, letters]) => (
          <PasscodeKey key={digit} digit={digit} letters={letters} globalFrame={globalFrame} />
        ))}
        <div />
        <PasscodeKey digit={keypad[9][0]} letters={keypad[9][1]} globalFrame={globalFrame} />
        <div />
      </div>
      <div className="absolute right-[118px] bottom-[165px] left-[118px] flex justify-between text-[34px] font-medium text-white/92">
        <span>Emergency</span>
        <span>Cancel</span>
      </div>
      <HomeIndicator />
    </AbsoluteFill>
  );
};

export const LockSequence = () => {
  const localFrame = useCurrentFrame();
  const wallpaperDrift = interpolate(localFrame, [0, 450], [-4, 4], clamp);
  const unlockDarken = interpolate(localFrame, [414, 450], [0, 0.16], clamp);
  const appearance = interpolate(localFrame, [0, 18], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const unlockExit = interpolate(localFrame, [414, 450], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      className="overflow-hidden bg-black"
      style={{
        filter: `blur(${interpolate(unlockExit, [0, 1], [0, 11], clamp)}px)`,
        fontFamily: IOS_FONT,
        opacity: appearance * (1 - unlockExit),
        scale: interpolate(unlockExit, [0, 1], [1, 0.968], clamp),
        transformOrigin: "50% 17%",
      }}
    >
      <Wallpaper
        kind="lock"
        style={{
          scale: 1.012,
          translate: `${wallpaperDrift}px ${-wallpaperDrift * 0.45}px`,
          filter: `brightness(${0.74 - unlockDarken}) saturate(0.92)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      <LockScreenContent localFrame={localFrame} />
      <PasscodeScreenContent localFrame={localFrame} />
    </AbsoluteFill>
  );
};
