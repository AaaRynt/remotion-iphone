You are working inside an existing Remotion project. All required npm dependencies have already been installed with pnpm.

Implement the complete video directly in the current repository. Do not scaffold a new project, replace the existing project, or install unnecessary dependencies. Inspect the existing project structure and `package.json` before making changes.

## Read the Local Instructions First

Before writing code, read these files carefully:

- `/Users/rynt/Desktop/Code/remotion-iphone/.codex/skills/remotion-best-practices/SKILL.md`
- `/Users/rynt/Desktop/Code/remotion-iphone/.codex/skills/Apple Design.md`
- `/Users/rynt/Desktop/Code/remotion-iphone/.codex/skills/Ionicons Usage Guide.md`

Also inspect any other relevant files under:

```text
/Users/rynt/Desktop/Code/remotion-iphone/.codex/skills/
```

Follow the Remotion best practices in those files, especially the rules about deterministic frame-based animation, asset loading, sequencing, audio, and avoiding CSS animations.

## Goal

Create a polished portrait Remotion video that simulates an iPhone 17 running iOS 26 at night.

The result should feel like an authentic iOS 26 screen recording, with system-level motion, dark mode, Dynamic Island, status bar, Lock Screen, passcode screen, Home Screen, an English Q&A application, an iOS keyboard, a system notification banner, and an automatic screen lock.

The visual target is:

- iPhone 17 standard model
- iOS 26 system UI
- iOS 26 Liquid Glass
- dark mode
- nighttime appearance
- subtle, restrained, physical Apple-style motion
- full-screen phone display, not a phone mockup inside a desktop scene

This must look like an iOS system experience.

It must not look like:

- Apple.com
- an Apple marketing landing page
- a product advertisement website
- a SaaS dashboard
- a desktop website
- a generic glassmorphism UI
- an Android interface
- a collection of floating web cards
- a presentation or slideshow

Do not use Apple website conventions such as giant marketing headlines, large white page sections, product tiles, blue CTA buttons, or product photography.

## Composition

Create one primary Remotion composition with the following settings:

```text
Width: 1206
Height: 2622
FPS: 60
Orientation: portrait
```

Use a descriptive composition ID such as:

```text
IPhone26NightSequence
```

The full video should be approximately 36–38 seconds long.

Render only the iPhone display area. Do not draw an external phone chassis, desk, hands, browser window, or surrounding environment.

## Core Technical Requirements

Use:

- Remotion
- React
- TypeScript
- Tailwind CSS
- the locally downloaded Ionicons Designer Pack
- local assets from `public/`

Do not install Ionic Framework.

Do not install `react-icons`.

Do not load Ionicons from a CDN.

Do not use `<ion-icon>` Web Components unless the existing project already has a working local implementation and it is clearly superior. Prefer loading the actual local SVG files from the Designer Pack.

Inspect the real directory structure and filenames inside:

```text
public/ionicons.designerpack/
```

Do not invent SVG filenames. Use only files that actually exist.

Create a small reusable `IonIcon` wrapper using Remotion’s `staticFile()` and `Img`, or convert only the small number of SVGs actually needed into local React components.

Do not convert the entire icon pack into React components.

Prefer:

- outline icons for inactive controls
- filled icons for selected or active controls
- consistent icon size and optical weight
- white or light-gray monochrome icons in dark mode

Use CSS or small inline SVG components for system elements that should not look like generic application icons, including:

- cellular signal
- battery
- Dynamic Island
- Home Indicator
- passcode dots
- page indicator dots
- keyboard keys

Use `staticFile()` for all public assets.

Use Remotion’s `Img` component for images.

Use `Audio` from `@remotion/media` for sound effects.

All animation must be deterministic and based on:

- `useCurrentFrame()`
- `useVideoConfig()`
- `interpolate()`
- `spring()`
- `Sequence`
- `AbsoluteFill`

Do not use:

- CSS transitions
- CSS keyframe animations
- Tailwind animation utility classes
- `setTimeout`
- `setInterval`
- `Date.now()`
- browser event-driven animation
- nondeterministic random values

If visual randomness is needed, use fixed seeded data or hard-coded values.

Use `interpolate()` for controlled transitions and `spring()` only where physical iOS-style motion is appropriate, such as:

- button presses
- unlocking
- Home Screen page movement
- opening the app
- notification banner entry and retraction
- screen locking

Clamp interpolation outside its input ranges.

## Visual Direction

The entire experience uses dark mode and a nighttime visual treatment.

Use:

- near-black and charcoal system surfaces
- white primary text
- muted gray secondary text
- dark translucent keyboard surfaces
- dark translucent notification surfaces
- subtle edge highlights
- restrained blur
- subtle saturation
- very soft shadows
- realistic visual hierarchy

Liquid Glass must behave like a functional material layer, not generic web glassmorphism.

Use Liquid Glass mainly for:

- the charging indicator
- Lock Screen controls
- passcode buttons
- widgets
- Dock
- search field
- bottom tab bar
- notification banner
- countdown pill

Liquid Glass surfaces should combine:

- dark translucent fill
- controlled backdrop blur
- mild saturation
- a thin light-catching edge
- subtle inner highlight
- soft depth shadow
- gentle scale and blur changes during appearance and disappearance

Do not stack too many translucent layers on top of each other.

Do not apply blur to every panel.

Do not make every item an independent floating rounded card.

Maintain clear separation between content and system chrome.

## Typography and Placeholder Content

Use the system font stack already available on macOS:

```css
font-family:
  "SF Pro Text",
  "SF Pro Display",
  -apple-system,
  BlinkMacSystemFont,
  system-ui,
  sans-serif;
```

Do not download or add another font dependency.

Most non-essential interface text must be represented by literal dashed placeholders such as:

```text
-----------
--------
------
```

The purpose is to avoid filling the fictional interface with large amounts of readable content.

Use dashed placeholder strings or simple placeholder bars for:

- generic application content
- schedule descriptions
- Todo descriptions
- user names in the fictional Q&A feed
- question summaries
- metadata
- secondary labels
- unimportant application names

However, the following content must remain readable:

- status-bar time
- Lock Screen date
- concise weather information
- passcode interaction
- keyboard letters
- the typed search query
- search suggestions
- splash-screen countdown
- essential tab labels when necessary
- the exact WeCom notification text

All visible interface language should be English except for the WeCom notification.

## Dynamic Time

The initial visible system time is:

```text
19:42
```

Create one deterministic virtual clock shared by:

- Lock Screen
- status bar
- any later locked-screen state

Start the virtual clock at approximately:

```text
19:42:35
```

Advance it according to the Remotion frame number so that the displayed minute naturally changes from `19:42` to `19:43` during the video.

Do not independently hard-code different times in different components.

## Asset Rules

The current public asset structure includes:

```text
public/
├── images/
│   ├── screenshot/
│   │   ├── keyboard.png
│   │   ├── lock.PNG
│   │   └── password.PNG
│   ├── wallpaper/
│   │   ├── Home Screen.jpg
│   │   └── Lock Screen.jpg
│   └── wecom.png
├── ionicons.designerpack/
└── sfx/
    ├── charging.aiff
    ├── keyboard-tap.aiff
    ├── notification.aiff
    └── passcode-tap.aiff
```

Preserve the exact capitalization, spaces, and file extensions in these filenames.

Use these files directly as visual assets:

```text
public/images/wallpaper/Lock Screen.jpg
public/images/wallpaper/Home Screen.jpg
public/images/wecom.png
```

Use these screenshots only as visual references:

```text
public/images/screenshot/lock.PNG
public/images/screenshot/password.PNG
public/images/screenshot/keyboard.png
```

Do not embed the reference screenshots into the final video.

Reconstruct the Lock Screen, passcode screen, and keyboard using React, CSS, SVG, local Ionicons, and Remotion animation.

The screenshots are references for:

- proportions
- margins
- spacing
- system-control placement
- keyboard geometry
- passcode-button geometry
- Lock Screen clock scale
- Lock Screen date placement
- status-bar placement
- Dynamic Island placement

The written requirements take priority over the screenshots if they conflict.

Do not reproduce any personal data visible in a screenshot.

Do not use network images, remote APIs, external fonts, or CDN assets.

## Audio

Use the existing local sound effects:

```text
public/sfx/charging.aiff
public/sfx/keyboard-tap.aiff
public/sfx/notification.aiff
public/sfx/passcode-tap.aiff
```

Suggested mapping:

- `charging.aiff`: MagSafe charging animation
- `passcode-tap.aiff`: each passcode digit press
- `keyboard-tap.aiff`: each keyboard character and delete press
- `notification.aiff`: WeCom notification appearance

Sound and visual feedback must start on the same frame.

Keep UI sounds restrained and lower than full volume.

Avoid playing identical keyboard sounds so rapidly that they clip or become excessively loud.

If `.aiff` playback is unsupported in the current Remotion/Chromium environment, convert the existing files locally to `.wav` using `ffmpeg` and reference the converted local files. Do not download replacement sounds.

## Exact Scene Timeline

Use the following timeline as the primary structure. Small frame-level adjustments are allowed for smoother transitions, but preserve the ordering, requested holds, and approximate total duration.

### Scene 1 — Black Screen

```text
00:00.0–00:02.0
```

Display a completely black screen.

The status bar and Dynamic Island should not be visible.

No fade-in is required at the beginning.

### Scene 2 — MagSafe Charging

```text
00:02.0–00:04.5
```

Keep the background black.

Create an iOS-style MagSafe charging animation centered on the screen.

The animation should include:

- a softly materializing circular charging ring
- restrained green energy illumination
- a central battery percentage or charging indicator
- a dark Liquid Glass surface
- subtle radial glow
- gentle scale-in
- mild blur-to-sharp transition
- no excessive neon effect
- no sci-fi HUD appearance

Play `charging.aiff` exactly when the charging animation appears.

The animation should briefly settle before transitioning to the Lock Screen.

### Scene 3 — Lock Screen

```text
00:04.5–00:07.5
```

Reveal the iOS 26 Lock Screen using:

```text
public/images/wallpaper/Lock Screen.jpg
```

Reconstruct the interface using the Lock Screen reference screenshot.

Show:

- Dynamic Island
- status-bar indicators
- large iOS 26-style Lock Screen clock
- English date
- concise English weather information
- bottom Lock Screen controls
- Home Indicator where appropriate

The clock should initially display `19:42`.

The wallpaper should have subtle depth and a very small positional drift or parallax-like offset.

Do not make the wallpaper visibly pan across the screen.

Hold the settled Lock Screen for approximately three seconds.

### Scene 4 — Swipe Up to Passcode

```text
00:07.5–00:09.2
```

Simulate an upward swipe without displaying a finger or cursor.

The Lock Screen content should:

- move upward
- slightly scale
- blur or fade naturally
- preserve spatial continuity

Transition into the dark iOS passcode screen.

Use `password.PNG` only as a reference.

After the passcode screen becomes visible, hold for approximately one second before entering digits.

### Scene 5 — Enter Passcode and Unlock

```text
00:09.2–00:12.0
```

Enter this custom numeric passcode:

```text
16384
```

For every digit:

- press the correct circular number button
- animate the button downward or inward
- briefly change its glass material or opacity
- fill one passcode dot
- play `passcode-tap.aiff`
- release the button naturally

Do not show the passcode digits as text.

Use realistic spacing between key presses.

After the fifth digit:

- pause briefly
- unlock the phone
- transition from the passcode screen into the Home Screen
- use an iOS-style depth and scale transition
- do not use a hard cut

### Scene 6 — First Home Screen Page

```text
00:12.0–00:15.5
```

Use:

```text
public/images/wallpaper/Home Screen.jpg
```

Create an iOS 26 dark-mode Home Screen with:

- Dynamic Island
- status bar
- page indicator
- translucent Dock
- an iOS icon grid
- one weekly schedule widget
- one Todo List widget

The widgets should use dark Liquid Glass surfaces.

The schedule widget should visually suggest the current week through:

- small day labels
- subtle progress or selected-day state
- dashed placeholder event text

The Todo widget should contain several compact rows with:

- circular completion indicators
- dashed placeholder text
- one or two completed rows
- one active or highlighted task

Below the widgets, display fictional app icons.

Most app icons may be simple solid-color or gradient rounded squares.

They do not need to reproduce real commercial application branding.

Use a restrained iOS icon grid with realistic spacing, labels, and Dock proportions.

### Scene 7 — Move to the Second Home Screen Page and Open the App

```text
00:15.5–00:17.5
```

Swipe left to move from the first Home Screen page to the second page.

The finger is conceptually moving left, and the Home Screen content moves left to reveal the page on the right.

Do not accidentally swipe right into the widget view.

Use:

- continuous horizontal movement
- slight depth
- subtle wallpaper response
- proper page-indicator movement
- no hard cut

Pause briefly after the second page settles.

The fictional Q&A application icon should be visible on this page.

Its icon should be:

- a deep-blue gradient
- an iOS rounded square
- minimal and abstract
- visually distinct
- not the real Zhihu logo
- optionally use a simple white local Ionicon

Press the app icon with a small downscale response.

Open the application using an iOS-style icon-origin expansion. The transition should feel spatially anchored to the icon’s position.

### Scene 8 — Splash Advertisement

```text
00:17.5–00:19.5
```

Display a two-second dark splash advertisement.

Do not use a real image or real brand.

The splash screen may use:

- a near-black background
- subtle dark-blue gradient illumination
- blurred abstract shapes
- very restrained Liquid Glass treatment

The only required readable element is a countdown pill in the upper-right corner.

The countdown should visibly progress from:

```text
2
```

to:

```text
1
```

Do not add a large headline, CTA button, product photograph, or Apple.com-style marketing layout.

### Scene 9 — Fictional Q&A Home Feed

```text
00:19.5–00:22.5
```

Enter the home page of a fictional English Q&A application inspired by the information architecture of Zhihu, but do not copy the Zhihu logo, exact layout, brand colors, or Chinese content.

Use a fictional application name or no prominent app name.

Build a complete mobile interface with:

- dark navigation surface
- search field
- content feed
- question cards or feed rows
- local Ionicons
- answer-count indicators
- vote or like indicators
- bookmark controls
- unread-message badge
- bottom tab bar

Use dark mode throughout.

Do not use images in the feed.

Use dashed placeholder text for most feed content.

A small number of short English labels may be visible where necessary for understanding the GUI.

Hold the home feed long enough for the interface to be readable.

### Scene 10 — Focus Search and Type with the iOS Keyboard

```text
00:22.5–00:28.8
```

Tap the search field.

Animate the search field into focus.

Bring up a reconstructed iOS-style dark English keyboard from the bottom of the screen.

Use:

```text
public/images/screenshot/keyboard.png
```

only as a visual reference.

Do not use a real operating-system keyboard or real IME.

The keyboard must include:

- dark keyboard background
- dark-gray keycaps
- white letters
- realistic key spacing
- Shift
- Delete
- Space
- Return or Search key
- candidate or suggestion row
- Home Indicator
- key-press feedback
- optional character popups for letter keys

Animate this exact typing and correction sequence:

```text
1. Type: caht
2. Delete: aht
3. The field should now contain: c
4. Type: hatgpt sol
5. Final field value: chatgpt sol
```

The final search-field value must be exactly:

```text
chatgpt sol
```

Each typed character must appear only after the corresponding key is visibly pressed.

Each deletion must:

- press the Delete key
- remove one character
- play the keyboard sound

Play `keyboard-tap.aiff` for every keyboard key press.

Do not submit the search.

Do not navigate to a result page.

After typing, show several English suggestions such as:

```text
chatgpt solutions
chatgpt solid
chatgpt solar
```

The suggestions may appear in a dark suggestion row or lightweight list.

### Scene 11 — WeCom System Notification

```text
Approximately 00:28.8
```

While the search field and dark keyboard remain visible, show a system-level iOS notification banner from WeCom.

This must be an iOS system notification, not:

- an in-app toast
- a modal
- an application card
- a desktop notification
- a browser notification

Use this local image on the left:

```text
public/images/wecom.png
```

Display this exact Chinese sender name:

```text
MR通知群
```

Display this exact Chinese message:

```text
✅ 已自动发送报价 [laynes@mail.com] 主题:Quote Request OUR REF 客户:layne
```

The notification should have:

- a dark iOS 26 Liquid Glass surface
- rounded system-banner geometry
- a subtle top edge highlight
- strong readability
- a compact WeCom image on the left
- sender name on the first line
- message preview on the second line
- optional small `now` indicator
- no excessive shadow
- no generic web card appearance

The second line does not need to display the complete message.

Keep the beginning readable, but fade the text toward the right edge using a CSS mask or gradient fade.

Do not use a simple ellipsis as the only truncation method.

Play `notification.aiff` exactly when the banner appears.

Animate the banner from above using a restrained spring-like motion.

### Scene 12 — Notification Retraction and Automatic Lock

```text
00:28.8–00:36.5 approximately
```

Keep the notification banner visible for approximately three seconds.

Then retract it upward into the top system area.

The retraction should be smooth, spatially consistent, and follow the same path used for entry.

After the banner is fully gone:

- keep the search page and keyboard visible for approximately two seconds
- do not type anything else
- do not submit the search

Then automatically lock the iPhone.

The automatic lock should not be a hard cut.

Use a brief iOS-style screen-off transition:

- reduce brightness
- subtly compress or pull the visible interface toward the center or Dynamic Island
- reduce saturation
- fade into black
- keep the transition restrained and fast

The screen must become completely black.

Remain on the black screen for approximately two seconds.

Then end the video.

## Motion Principles

Motion should feel like iOS rather than a presentation.

Use these principles:

- immediate visual response on press
- spatial continuity
- source-anchored transitions
- matching entry and exit paths
- restrained springs
- minimal overshoot
- no decorative bounce unless motion momentum justifies it
- subtle scaling on touch-down
- smooth settling
- consistent visual hierarchy
- no arbitrary fades between unrelated screens
- no slide-deck-style scene changes

App opening must originate from the app icon.

Notification entry and exit must use the same spatial path.

The Lock Screen swipe must transition continuously into the passcode screen.

Unlocking must transition continuously into the Home Screen.

## Component Structure

Keep the implementation maintainable.

Create reusable components such as:

```text
StatusBar
DynamicIsland
BatteryIndicator
CellularSignal
WifiIndicator
HomeIndicator
LiquidGlassSurface
LockScreen
MagSafeCharging
PasscodeScreen
PasscodeKey
HomeScreen
HomeScreenPage
HomeWidget
AppIcon
Dock
PageIndicator
QAAApp
SplashAd
QAFeed
SearchField
IOSKeyboard
KeyboardKey
SearchSuggestions
SystemNotification
IonIcon
```

Use a centralized timeline or scene constants so scene boundaries are easy to adjust.

Use a shared virtual-time function.

Keep mock UI data in arrays instead of duplicating markup.

Do not over-engineer the application with state management, routing, server APIs, or interactive browser behavior. This is a deterministic video composition.

## Quality Requirements

Before finishing:

1. Inspect all referenced asset paths.
2. Confirm every referenced Ionicon SVG exists.
3. Confirm the project type-checks.
4. Confirm the Remotion composition is registered.
5. Confirm the composition has `1206 × 2622` resolution at `60fps`.
6. Confirm no CSS animations or CSS transitions are used.
7. Confirm no remote assets or network requests are used.
8. Confirm the screenshots are not embedded in the final composition.
9. Confirm the wallpapers are loaded through `staticFile()`.
10. Confirm the sound effects are synchronized to their visual events.
11. Confirm the time changes consistently from `19:42` to `19:43`.
12. Confirm the final search value is exactly `chatgpt sol`.
13. Confirm the WeCom notification preserves the exact Chinese text.
14. Confirm the final two seconds are completely black.
15. Confirm the visual result resembles iOS 26 dark mode rather than Apple.com or a web dashboard.

Run the appropriate existing pnpm scripts for type-checking, linting, and Remotion preview or rendering.

If the repository does not already define suitable scripts, use the installed Remotion CLI through pnpm without globally installing anything.

Render or prepare a final preview of the primary composition.

Work autonomously. Do not stop after creating only a partial mockup. Implement the complete sequence from the opening black screen through the final locked black screen.
