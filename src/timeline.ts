export const FPS = 60;
export const WIDTH = 1206;
export const HEIGHT = 2622;
export const DURATION_IN_FRAMES = 2190;

export const TIMELINE = {
  chargingStart: 120,
  lockScreenStart: 270,
  lockSwipeStart: 450,
  passcodeStart: 552,
  homePremountStart: 684,
  homeStart: 720,
  homeSwipeStart: 930,
  homeSwipeEnd: 990,
  appPressStart: 1014,
  appOpenStart: 1020,
  splashStart: 1050,
  feedStart: 1170,
  searchStart: 1350,
  notificationStart: 1728,
  notificationExitStart: 1884,
  notificationEnd: 1908,
  autoLockStart: 2028,
  finalBlackStart: 2070,
  end: DURATION_IN_FRAMES,
} as const;

export const PASSCODE = "16384";

export const PASSCODE_EVENTS = [
  {frame: 570, key: "1"},
  {frame: 594, key: "6"},
  {frame: 618, key: "3"},
  {frame: 642, key: "8"},
  {frame: 666, key: "4"},
] as const;

export type KeyboardEvent = {
  readonly frame: number;
  readonly key: string;
  readonly kind: "type" | "delete" | "space";
  readonly valueAfter: string;
};

export const KEYBOARD_EVENTS: readonly KeyboardEvent[] = [
  {frame: 1422, key: "c", kind: "type", valueAfter: "c"},
  {frame: 1438, key: "a", kind: "type", valueAfter: "ca"},
  {frame: 1454, key: "h", kind: "type", valueAfter: "cah"},
  {frame: 1470, key: "t", kind: "type", valueAfter: "caht"},
  {frame: 1486, key: "delete", kind: "delete", valueAfter: "cah"},
  {frame: 1502, key: "delete", kind: "delete", valueAfter: "ca"},
  {frame: 1518, key: "delete", kind: "delete", valueAfter: "c"},
  {frame: 1534, key: "h", kind: "type", valueAfter: "ch"},
  {frame: 1550, key: "a", kind: "type", valueAfter: "cha"},
  {frame: 1566, key: "t", kind: "type", valueAfter: "chat"},
  {frame: 1582, key: "g", kind: "type", valueAfter: "chatg"},
  {frame: 1598, key: "p", kind: "type", valueAfter: "chatgp"},
  {frame: 1614, key: "t", kind: "type", valueAfter: "chatgpt"},
  {frame: 1630, key: "space", kind: "space", valueAfter: "chatgpt "},
  {frame: 1646, key: "s", kind: "type", valueAfter: "chatgpt s"},
  {frame: 1662, key: "o", kind: "type", valueAfter: "chatgpt so"},
  {frame: 1678, key: "l", kind: "type", valueAfter: "chatgpt sol"},
] as const;

export const FINAL_SEARCH_VALUE = "chatgpt sol";

export const WECOM_SENDER = "MR通知群";
export const WECOM_MESSAGE =
  "✅ 已自动发送报价 [laynes@mail.com] 主题:Quote Request OUR REF 客户:layne";

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
    if (frame >= event.frame + 3) {
      value = event.valueAfter;
    }
  }

  return value;
};
