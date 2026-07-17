import {Audio} from "@remotion/media";
import {Sequence, staticFile} from "remotion";
import {KEYBOARD_EVENTS, PASSCODE_EVENTS, TIMELINE} from "../timeline";

export const AudioTrack = () => {
  return (
    <>
      <Sequence
        from={TIMELINE.chargingStart}
        durationInFrames={90}
        layout="none"
      >
        <Audio src={staticFile("sfx/charging.wav")} volume={0.2} />
      </Sequence>

      {PASSCODE_EVENTS.map((event, index) => (
        <Sequence
          key={`passcode-${event.frame}`}
          from={event.frame}
          durationInFrames={18}
          layout="none"
        >
          <Audio
            src={staticFile("sfx/passcode-tap.wav")}
            volume={() => [0.15, 0.14, 0.16, 0.145, 0.155][index]}
          />
        </Sequence>
      ))}

      {KEYBOARD_EVENTS.map((event, index) => (
        <Sequence
          key={`keyboard-${event.frame}`}
          from={event.frame}
          durationInFrames={10}
          layout="none"
        >
          <Audio
            src={staticFile("sfx/keyboard-tap.wav")}
            volume={() => [0.055, 0.06, 0.052, 0.058][index % 4]}
          />
        </Sequence>
      ))}

      <Sequence
        from={TIMELINE.notificationStart}
        durationInFrames={99}
        layout="none"
      >
        <Audio src={staticFile("sfx/notification.wav")} volume={0.18} />
      </Sequence>
    </>
  );
};
