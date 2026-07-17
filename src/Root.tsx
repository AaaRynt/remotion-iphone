import {Composition} from "remotion";
import {IPhone26NightSequence} from "./Composition";
import {DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from "./timeline";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="IPhone26NightSequence"
      component={IPhone26NightSequence}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
