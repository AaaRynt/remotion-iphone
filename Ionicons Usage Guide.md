---
title: "Ionicons Usage Guide: Tips for installing and using the Ionicons free icon library"
source: "https://ionic.io/ionicons/usage"
---

# Ionicons

## Usage

Ionicons is a completely open-source icon set with 1,300 icons crafted for web, iOS, Android, and desktop apps. Ionicons was made for [Ionic Framework](https://ionicframework.com/), a cross-platform hybrid and Progressive Web App framework.

## Using the Web Component

The Ionicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.

Also note that only visible icons are loaded, and icons which are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.

### Installation

If you're using Ionic Framework, Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following `<script>` near the end of your page, right before the closing `</body>` tag, to enable them.

```
<script type="module" src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.js"></script>
```

### Basic usage

To use a built-in icon from the Ionicons package, populate the `name` attribute on the `ion-icon` component:

```
<ion-icon name="heart"></ion-icon>
```

### Custom icons

To use a custom SVG, provide its url in the `src` attribute to request the external SVG file. The `src` attribute works the same as `<img src="...">` in that the url must be accessible from the webpage that's making a request for the image. Additionally, the external file can only be a valid `svg` and does not allow scripts or events within the `svg` element.

```
<ion-icon src="/path/to/external/file.svg"></ion-icon>
```

## Variants

Each app icon in Ionicons has a `filled`, `outline` and `sharp` variant. These different variants are provided to make your app feel native to a variety of platforms. The filled variant uses the default name without a suffix. Note: Logo icons do not have outline or sharp variants.

```
<ion-icon name="heart"></ion-icon> <!--filled-->
<ion-icon name="heart-outline"></ion-icon> <!--outline-->
<ion-icon name="heart-sharp"></ion-icon> <!--sharp-->
```

### Platform specificity

When using icons in Ionic Framework you can specify different icons per platform. Use the `md` and `ios` attributes and provide the platform specific icon/variant name.

```
<ion-icon ios="heart-outline" md="heart-sharp"></ion-icon>
```

## Size

To specify the icon size, you can use the `size` attribute for our pre-defined font sizes.

```
<ion-icon size="small"></ion-icon>
<ion-icon size="large"></ion-icon>
```

Or you can set a specific size by applying the `font-size` CSS property on the `ion-icon` component. It's recommended to use pixel sizes that are a multiple of 8 (8, 16, 32, 64, etc.)

```
ion-icon {
  font-size: 64px;
}
```

## Color

Specify the icon color by applying the `color` CSS property on the `ion-icon` component.

```
ion-icon {
  color: blue;
}
```

## Stroke width

When using an `outline` icon variant it is possible to adjust the stroke width, for improved visual balance relative to the icon's size or relative to the width of adjacent text. You can set a specific size by applying the `--ionicon-stroke-width` CSS custom property to the `ion-icon` component. The default value is `32px`.

```
<ion-icon name="heart-outline"></ion-icon>
```

```
ion-icon {
  --ionicon-stroke-width: 16px;
}
```

## Accessibility

Icons that are purely decorative content should have `aria-hidden="true"`. This will not visually hide the icon, but it will hide the element from assistive technology.

```
<ion-icon name="heart" aria-hidden="true"></ion-icon>
```

If the icon is interactive, it should have alternate text defined by adding an `aria-label`.

```
<ion-icon name="heart" aria-label="Favorite"></ion-icon>
```

Alternatively, if the icon is inside of another element that it is describing, that element should have the `aria-label` added to it, and the icon should be hidden using `aria-hidden`.

```
<ion-button aria-label="Favorite">
  <ion-icon name="heart" aria-hidden="true"></ion-icon>
</ion-button>
```

## Browser support

Report problems with this compatibility data on [GitHub](https://github.com/ionic-team/ionicons/issues).

| Browser     | Version       |
| ----------- | ------------- |
| **Chrome**  | 79+           |
| **Safari**  | 14+           |
| **Edge**    | 79+           |
| **Firefox** | 70+           |
| **IE 11**   | Not supported |

## Migrating from v4

See the [5.0 release notes](https://github.com/ionic-team/ionicons/releases/tag/5.0.0) for a list of icon deletions/renames. You can find an archived version of the v4 site [here](https://ionic.io/ionicons/v4).
