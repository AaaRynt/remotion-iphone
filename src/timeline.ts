const SOURCE_FPS = 60;

export const FPS = 120;
export const WIDTH = 1206;
export const HEIGHT = 2622;

export const framesAt60 = (frameCount: number) => Math.round((frameCount * FPS) / SOURCE_FPS);

export const DURATION_IN_FRAMES = framesAt60(2190);

export const TIMELINE = {
  chargingStart: framesAt60(120),
  lockScreenStart: framesAt60(270),
  lockSwipeStart: framesAt60(450),
  passcodeStart: framesAt60(552),
  homePremountStart: framesAt60(684),
  homeStart: framesAt60(720),
  homeSwipeStart: framesAt60(930),
  homeSwipeEnd: framesAt60(990),
  appPressStart: framesAt60(1014),
  appOpenStart: framesAt60(1020),
  splashStart: framesAt60(1050),
  feedStart: framesAt60(1170),
  searchStart: framesAt60(1350),
  notificationStart: framesAt60(1728),
  notificationExitStart: framesAt60(1896),
  notificationEnd: framesAt60(1920),
  autoLockStart: framesAt60(2028),
  finalBlackStart: framesAt60(2070),
  end: DURATION_IN_FRAMES,
} as const;

export const PASSCODE = "16384";

export const PASSCODE_EVENTS = [
  { frame: framesAt60(570), key: "1" },
  { frame: framesAt60(594), key: "6" },
  { frame: framesAt60(618), key: "3" },
  { frame: framesAt60(642), key: "8" },
  { frame: framesAt60(666), key: "4" },
] as const;

export type KeyboardEvent = {
  readonly frame: number;
  readonly key: string;
  readonly kind: "type" | "delete" | "space";
  readonly valueAfter: string;
};

export const KEYBOARD_EVENTS: readonly KeyboardEvent[] = [
  { frame: framesAt60(1422), key: "c", kind: "type", valueAfter: "c" },
  { frame: framesAt60(1438), key: "a", kind: "type", valueAfter: "ca" },
  { frame: framesAt60(1454), key: "h", kind: "type", valueAfter: "cah" },
  { frame: framesAt60(1470), key: "t", kind: "type", valueAfter: "caht" },
  { frame: framesAt60(1486), key: "delete", kind: "delete", valueAfter: "cah" },
  { frame: framesAt60(1502), key: "delete", kind: "delete", valueAfter: "ca" },
  { frame: framesAt60(1518), key: "delete", kind: "delete", valueAfter: "c" },
  { frame: framesAt60(1534), key: "h", kind: "type", valueAfter: "ch" },
  { frame: framesAt60(1550), key: "a", kind: "type", valueAfter: "cha" },
  { frame: framesAt60(1566), key: "t", kind: "type", valueAfter: "chat" },
  { frame: framesAt60(1582), key: "g", kind: "type", valueAfter: "chatg" },
  { frame: framesAt60(1598), key: "p", kind: "type", valueAfter: "chatgp" },
  { frame: framesAt60(1614), key: "t", kind: "type", valueAfter: "chatgpt" },
  { frame: framesAt60(1630), key: "space", kind: "space", valueAfter: "chatgpt " },
  { frame: framesAt60(1646), key: "s", kind: "type", valueAfter: "chatgpt s" },
  { frame: framesAt60(1662), key: "o", kind: "type", valueAfter: "chatgpt so" },
  { frame: framesAt60(1678), key: "l", kind: "type", valueAfter: "chatgpt sol" },
] as const;

export const FINAL_SEARCH_VALUE = "chatgpt sol";

export const WECOM_SENDER = "MR通知群";
export const WECOM_MESSAGE = "✅ 已自动发送报价 [laynes@mail.com] 主题:Quote Request OUR REF 客户:layne";

const VIRTUAL_START_SECONDS = 19 * 60 * 60 + 42 * 60 + 35;

export const formatVirtualTime = (frame: number, fps = FPS) => {
  const elapsedSeconds = Math.floor(frame / fps);
  const totalSeconds = VIRTUAL_START_SECONDS + elapsedSeconds;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;

  const formattedHours = hours < 10 ? `0${hours}` : String(hours);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${formattedHours}:${formattedMinutes}`;
};

export const getTypedValue = (frame: number) => {
  let value = "";

  for (const event of KEYBOARD_EVENTS) {
    if (frame >= event.frame + framesAt60(3)) {
      value = event.valueAfter;
    }
  }

  return value;
};
