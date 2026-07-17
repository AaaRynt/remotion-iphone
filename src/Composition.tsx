import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {AudioTrack} from "./components/AudioTrack";
import {HomeScreen} from "./components/HomeScreen";
import {LockSequence, MagSafeCharging} from "./components/LockSequence";
import {QAAApp} from "./components/QAAApp";
import {IOS_FONT} from "./components/SystemUI";
import {TIMELINE} from "./timeline";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const IPhone26NightSequence = () => {
  const frame = useCurrentFrame();
  const lockProgress = interpolate(
    frame,
    [TIMELINE.autoLockStart, TIMELINE.finalBlackStart],
    [0, 1],
    {
      ...clamp,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  );

  return (
    <AbsoluteFill
      className="overflow-hidden bg-black"
      style={{fontFamily: IOS_FONT, color: "white"}}
    >
      <AbsoluteFill
        style={{
          opacity: interpolate(lockProgress, [0, 0.72, 1], [1, 0.72, 0], clamp),
          scale: interpolate(lockProgress, [0, 1], [1, 0.84], clamp),
          translate: `0 ${interpolate(lockProgress, [0, 1], [0, -36], clamp)}px`,
          transformOrigin: "50% 4%",
          filter: `brightness(${interpolate(lockProgress, [0, 1], [1, 0.08], clamp)}) saturate(${interpolate(lockProgress, [0, 1], [1, 0.15], clamp)}) blur(${interpolate(lockProgress, [0, 1], [0, 6], clamp)}px)`,
        }}
      >
        <Sequence
          from={TIMELINE.chargingStart}
          durationInFrames={TIMELINE.lockScreenStart - TIMELINE.chargingStart}
        >
          <MagSafeCharging />
        </Sequence>

        <Sequence
          from={TIMELINE.homePremountStart}
          durationInFrames={TIMELINE.splashStart - TIMELINE.homePremountStart}
        >
          <HomeScreen globalFrame={frame} />
        </Sequence>

        <Sequence
          from={TIMELINE.lockScreenStart}
          durationInFrames={TIMELINE.homeStart - TIMELINE.lockScreenStart}
        >
          <LockSequence />
        </Sequence>

        <Sequence
          from={TIMELINE.appOpenStart}
          durationInFrames={TIMELINE.finalBlackStart - TIMELINE.appOpenStart}
        >
          <QAAApp globalFrame={frame} />
        </Sequence>
      </AbsoluteFill>

      <AbsoluteFill
        className="bg-black"
        style={{
          opacity: interpolate(lockProgress, [0, 0.6, 1], [0, 0.15, 1], clamp),
        }}
      />
      <AudioTrack />
    </AbsoluteFill>
  );
};
