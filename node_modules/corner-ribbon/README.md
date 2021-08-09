# corner-ribbon

[![npm version](https://badge.fury.io/js/corner-ribbon.svg)](https://badge.fury.io/js/corner-ribbon)

Corner ribbon CSS (Sass). [Demo](http://corner-ribbon.themekit.io)

## Usage

```bash
npm install corner-ribbon
```

## HTML

```html
<div style="position: relative; overflow: hidden;">
  <span class="corner-ribbon corner-ribbon--success corner-ribbon--shadow corner-ribbon--default-left-top">Free</span>
</div>
```

## CSS

```html
<link rel="stylesheet" href="node_modules/corner-ribbon/dist/corner-ribbon.min.css">
```

## Sass

Install dependencies.

```bash
npm install sass-math
```

Load dependencies.

```sass
@import 'node_modules/sass-math/math';
```

Custom corner ribbon sizes.

```sass
// id => (width, height)
// generates .corner-ribbon--#{ $id }-[left|right]-[top|bottom] modifier classes
// i.e. .corner-ribbon--large-left-top

$corner-ribbon-sizes: (
  large: (200px, 30px)
) !default;
```

Custom corner ribbon background colors.

```sass
// id => #color
// generates .corner-ribbon--#{ $id } modifier classes
// i.e. .corner-ribbon--red

$corner-ribbon-colors: (
    red: #ff0000
) !default;
```

Import corner ribbon Sass files in your project.

```sass
@import 'node_modules/corner-ribbon/sass/variables';
@import 'node_modules/corner-ribbon/sass/corner-ribbon';
```