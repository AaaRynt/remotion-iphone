import type { CSSProperties, ReactNode } from "react";
import { Img, interpolate, staticFile } from "remotion";
import { DURATION_IN_FRAMES, formatVirtualTime } from "../timeline";

export const IOS_FONT = '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

export type IonIconName = "add" | "add-outline" | "apps" | "apps-outline" | "arrow-up" | "arrow-up-outline" | "backspace" | "backspace-outline" | "bookmark" | "bookmark-outline" | "bulb" | "bulb-outline" | "calendar" | "calendar-outline" | "camera" | "camera-outline" | "chatbubble" | "chatbubble-ellipses" | "chatbubble-ellipses-outline" | "chatbubble-outline" | "checkmark" | "checkmark-circle" | "checkmark-circle-outline" | "checkmark-outline" | "chevron-back" | "chevron-forward" | "close" | "close-outline" | "compass" | "compass-outline" | "ellipsis-horizontal" | "flashlight" | "flashlight-outline" | "grid" | "grid-outline" | "heart" | "heart-outline" | "help-circle-outline" | "home" | "home-outline" | "mail" | "mail-outline" | "moon-outline" | "notifications" | "notifications-outline" | "partly-sunny-outline" | "person" | "person-outline" | "search" | "search-outline" | "send" | "send-outline" | "settings" | "settings-outline" | "share" | "share-outline" | "sparkles" | "thumbs-up" | "thumbs-up-outline";

type IconTone = "dark" | "light" | "muted";

const ICON_TONE_CLASSES: Record<IconTone, string> = {
  dark: "opacity-90 [filter:brightness(0)]",
  light: "opacity-100 [filter:brightness(0)_invert(1)]",
  muted: "opacity-70 [filter:brightness(0)_invert(1)]",
};

export type IonIconProps = {
  readonly name: IonIconName;
  readonly className?: string;
  readonly label?: string;
  readonly opacity?: number;
  readonly size?: number;
  readonly style?: CSSProperties;
  readonly tone?: IconTone;
};

export const IonIcon = ({ name, className = "h-[48px] w-[48px]", label, opacity, size, style, tone = "light" }: IonIconProps) => {
  return (
    <Img
      alt={label ?? ""}
      aria-hidden={label === undefined}
      className={`block shrink-0 object-contain ${ICON_TONE_CLASSES[tone]} ${className}`}
      src={staticFile(`ionicons.designerpack/${name}.svg`)}
      style={{
        ...(size === undefined ? {} : { height: size, width: size }),
        ...(opacity === undefined ? {} : { opacity }),
        ...style,
      }}
    />
  );
};

type GlassWeight = "heavy" | "regular" | "thin";
type GlassShape = "circle" | "none" | "pill" | "rounded";

const GLASS_WEIGHT_CLASSES: Record<GlassWeight, string> = {
  heavy: "border-white/[0.16] bg-[rgba(15,16,21,0.78)] shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.035)] backdrop-blur-[48px] backdrop-saturate-[1.4]",
  regular: "border-white/[0.18] bg-[rgba(27,28,34,0.59)] shadow-[0_18px_54px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.17),inset_0_-1px_0_rgba(255,255,255,0.045)] backdrop-blur-[36px] backdrop-saturate-[1.5]",
  thin: "border-white/[0.2] bg-white/[0.105] shadow-[0_13px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.19),inset_0_-1px_0_rgba(255,255,255,0.055)] backdrop-blur-[27px] backdrop-saturate-[1.55]",
};

const GLASS_SHAPE_CLASSES: Record<GlassShape, string> = {
  circle: "aspect-square rounded-full",
  none: "",
  pill: "rounded-full",
  rounded: "rounded-[42px]",
};

export type LiquidGlassSurfaceProps = {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly materialProgress?: number;
  readonly shape?: GlassShape;
  readonly style?: CSSProperties;
  readonly weight?: GlassWeight;
};

const clampUnit = (value: number) => Math.min(1, Math.max(0, value));

export const LiquidGlassSurface = ({ children, className = "", materialProgress = 1, shape = "rounded", style, weight = "regular" }: LiquidGlassSurfaceProps) => {
  const progress = clampUnit(materialProgress);
  const hasPositioningClass = className.split(/\s+/).some((token) => ["absolute", "fixed", "relative", "sticky"].indexOf(token) !== -1);

  return (
    <div
      className={`${hasPositioningClass ? "" : "relative"} isolate overflow-hidden border ${GLASS_WEIGHT_CLASSES[weight]} ${GLASS_SHAPE_CLASSES[shape]} ${className}`}
      style={{
        filter: `blur(${interpolate(progress, [0, 1], [7, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}px)`,
        opacity: interpolate(progress, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(progress, [0, 1], [0.975, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        ...style,
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.025)_31%,rgba(255,255,255,0)_67%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  );
};

export type WallpaperKind = "home" | "lock";

const WALLPAPER_FILES: Record<WallpaperKind, string> = {
  home: "images/wallpaper/Home Screen.jpg",
  lock: "images/wallpaper/Lock Screen.jpg",
};

const WALLPAPER_IMAGE_CLASSES: Record<WallpaperKind, string> = {
  home: "brightness-[0.76] saturate-[0.96]",
  lock: "brightness-[0.8] saturate-[0.9]",
};

const WALLPAPER_TINT_CLASSES: Record<WallpaperKind, string> = {
  home: "bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(2,4,10,0.02)_37%,rgba(0,0,0,0.18)_100%)]",
  lock: "bg-[linear-gradient(180deg,rgba(0,0,0,0.29)_0%,rgba(4,6,12,0.015)_42%,rgba(0,0,0,0.27)_100%)]",
};

export type WallpaperLayerProps = {
  readonly className?: string;
  readonly globalFrame?: number;
  readonly kind: WallpaperKind;
  readonly style?: CSSProperties;
};

export const WallpaperLayer = ({ className = "", globalFrame = 0, kind, style }: WallpaperLayerProps) => {
  const driftX = interpolate(globalFrame, [0, DURATION_IN_FRAMES / 2, DURATION_IN_FRAMES], [-2.5, 2.25, -0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const driftY = interpolate(globalFrame, [0, DURATION_IN_FRAMES / 2, DURATION_IN_FRAMES], [1.5, -2, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <Img
        className={`absolute inset-0 h-full w-full object-cover ${WALLPAPER_IMAGE_CLASSES[kind]}`}
        src={staticFile(WALLPAPER_FILES[kind])}
        style={{
          scale: interpolate(globalFrame, [0, DURATION_IN_FRAMES], [1.012, 1.016], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: `${driftX}px ${driftY}px`,
          ...style,
        }}
      />
      <div className={`pointer-events-none absolute inset-0 ${WALLPAPER_TINT_CLASSES[kind]}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_43%,rgba(0,0,0,0.16)_100%)]" />
    </div>
  );
};

export const Wallpaper = WallpaperLayer;

export type DynamicIslandProps = {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly expanded?: boolean;
  readonly style?: CSSProperties;
};

export const DynamicIsland = ({ children, className = "", expanded = children !== undefined, style }: DynamicIslandProps) => {
  return (
    <div className={`absolute top-[26px] left-1/2 z-[80] -translate-x-1/2 overflow-hidden rounded-full border border-white/[0.045] bg-black shadow-[0_2px_9px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.035)] ${expanded ? "h-[108px] w-[520px]" : "h-[92px] w-[350px]"} ${className}`} style={style}>
      <div aria-hidden="true" className="absolute inset-x-[16px] top-[4px] h-[2px] rounded-full bg-white/[0.035]" />
      {children === undefined ? <div aria-hidden="true" className="absolute top-1/2 right-[28px] h-[27px] w-[27px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_35%,rgba(73,91,133,0.43)_0%,rgba(19,28,49,0.72)_24%,rgba(3,5,9,0.98)_64%)] shadow-[inset_0_0_0_2px_rgba(32,49,79,0.18)]" /> : <div className="flex h-full w-full items-center justify-center px-[26px]">{children}</div>}
    </div>
  );
};

type IndicatorProps = {
  readonly className?: string;
};

export const CellularSignal = ({ className = "" }: IndicatorProps) => {
  return (
    <div aria-label="Cellular signal" className={`flex h-[31px] w-[43px] items-end gap-[4px] ${className}`} role="img">
      <div className="h-[10px] w-[7px] rounded-[2px] bg-white" />
      <div className="h-[16px] w-[7px] rounded-[2px] bg-white" />
      <div className="h-[23px] w-[7px] rounded-[2px] bg-white" />
      <div className="h-[30px] w-[7px] rounded-[2px] bg-white" />
    </div>
  );
};

export const WifiIndicator = ({ className = "" }: IndicatorProps) => {
  return (
    <div aria-label="Wi-Fi" className={`relative h-[31px] w-[43px] ${className}`} role="img">
      <div className="absolute top-[1px] left-1/2 h-[26px] w-[42px] -translate-x-1/2 rounded-[50%] border-t-[5px] border-white" />
      <div className="absolute top-[10px] left-1/2 h-[19px] w-[28px] -translate-x-1/2 rounded-[50%] border-t-[5px] border-white" />
      <div className="absolute bottom-[1px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-white" />
    </div>
  );
};

export type BatteryIndicatorProps = IndicatorProps & {
  readonly level?: number;
};

export const BatteryIndicator = ({ className = "", level = 0.82 }: BatteryIndicatorProps) => {
  const safeLevel = Math.min(1, Math.max(0.08, level));

  return (
    <div aria-label={`${Math.round(safeLevel * 100)} percent battery`} className={`relative h-[29px] w-[53px] ${className}`} role="img">
      <div className="absolute inset-y-[1px] right-[5px] left-0 rounded-[8px] border-[3px] border-white/85 p-[3px]">
        <div className="h-full rounded-[3px] bg-white" style={{ width: `${safeLevel * 100}%` }} />
      </div>
      <div className="absolute top-1/2 right-0 h-[11px] w-[4px] -translate-y-1/2 rounded-r-[3px] bg-white/65" />
    </div>
  );
};

export type StatusBarProps = {
  readonly globalFrame: number;
  readonly islandContent?: ReactNode;
};

export const StatusBar = ({ globalFrame, islandContent }: StatusBarProps) => {
  return (
    <div aria-label="Status bar" className="pointer-events-none absolute inset-x-0 top-0 z-[70] h-[154px] text-white select-none" style={{ fontFamily: IOS_FONT }}>
      <div className="absolute top-[51px] left-[73px] min-w-[144px] text-center text-[40px] leading-none font-semibold tracking-[-0.02em] text-white tabular-nums [text-shadow:0_1px_7px_rgba(0,0,0,0.44)]">{formatVirtualTime(globalFrame)}</div>
      <DynamicIsland expanded={islandContent !== undefined}>{islandContent}</DynamicIsland>
      <div className="absolute top-[50px] right-[67px] flex h-[34px] items-center gap-[18px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
        <CellularSignal />
        <WifiIndicator />
        <BatteryIndicator />
      </div>
    </div>
  );
};

export type HomeIndicatorProps = {
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly tone?: "dark" | "light";
};

export const HomeIndicator = ({ className = "", style, tone = "light" }: HomeIndicatorProps) => {
  return <div aria-hidden="true" className={`pointer-events-none absolute bottom-[21px] left-1/2 z-[100] h-[16px] w-[420px] -translate-x-1/2 rounded-full ${tone === "light" ? "bg-white/95 shadow-[0_1px_8px_rgba(0,0,0,0.2)]" : "bg-black/90 shadow-[0_1px_6px_rgba(255,255,255,0.1)]"} ${className}`} style={style} />;
};

type SystemRoundButtonSize = "large" | "medium" | "small";

const ROUND_BUTTON_SIZE_CLASSES: Record<SystemRoundButtonSize, string> = {
  large: "h-[152px] w-[152px]",
  medium: "h-[132px] w-[132px]",
  small: "h-[108px] w-[108px]",
};

const ROUND_BUTTON_ICON_CLASSES: Record<SystemRoundButtonSize, string> = {
  large: "h-[64px] w-[64px]",
  medium: "h-[56px] w-[56px]",
  small: "h-[46px] w-[46px]",
};

export type SystemRoundButtonProps = {
  readonly active?: boolean;
  readonly ariaLabel?: string;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly icon?: IonIconName;
  readonly iconClassName?: string;
  readonly label?: string;
  readonly pressProgress?: number;
  readonly size?: SystemRoundButtonSize;
  readonly style?: CSSProperties;
};

export const SystemRoundButton = ({ active = false, ariaLabel, children, className = "", icon, iconClassName, label, pressProgress = 0, size = "medium", style }: SystemRoundButtonProps) => {
  const pressed = clampUnit(pressProgress);

  return (
    <LiquidGlassSurface
      className={`flex items-center justify-center ${ROUND_BUTTON_SIZE_CLASSES[size]} ${active ? "bg-white/[0.22]" : ""} ${className}`}
      shape="circle"
      style={{
        filter: `brightness(${interpolate(pressed, [0, 1], [1, 1.22], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })})`,
        scale: interpolate(pressed, [0, 1], [1, 0.92], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        ...style,
      }}
      weight="thin"
    >
      <div aria-label={ariaLabel ?? label ?? "System control"} className="flex h-full w-full items-center justify-center" role="img">
        {children ?? (icon === undefined ? null : <IonIcon className={iconClassName ?? ROUND_BUTTON_ICON_CLASSES[size]} name={icon} />)}
      </div>
    </LiquidGlassSurface>
  );
};
