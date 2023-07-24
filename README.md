<a id="readme-top"></a>

<div align="center">
  <h1>Vitepress API Document Theme</h1>

[![VueJS](https://img.shields.io/badge/VueJS-3.0.x-%2341B883)][vue-url]
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/logicspark/awesome-social-button/blob/main/LICENSE)

</div>
<br/>
<div align="center">
  <a href="#sunglasses-screenshots">Screenshots</a> - 
  <a href="#building_construction-built-with">Built With</a> - 
  <a href="#rocket-getting-started">Getting Started</a> - 
  <a href="#fire-usage">Usage</a> -
  <a href="#books-license">License</a> -
  <a href="#pray-acknowledgement">Acknowledgement</a>
</div>

<br/>

## :sunglasses: Screenshots

DividePage Component Demo

https://github.com/logicspark/vitepress-api-document-theme/assets/135820109/28cb15be-2771-4683-a033-2efa704787ac

Here is the link to the live [demo](https://github.com/logicspark/vitepress-api-document-theme/tree/main/example/default-theme-and-custom). Have fun exploring!

## :building_construction: Built With

1. [![Typescript][typescript]][typescript-url]
2. [![Vue][vue]][vue-url]
3. [![HTML][html]][html-url]
4. [![CSS][css]][css-url]
5. [![Vite][vite]][vite-url]

## :rocket: Getting Started

Learn what is required before using Vitepress API Document theme and how to install it quickly. Let's get started!

### Prerequisite

This library is created with Vite + Vue3 + TypeScript. To start using this library, please make sure to install the following external libraries first:

- [Node.js](https://nodejs.org/en)
- [Vitepress](https://vitepress.dev/)

_Support Node.js 18.12.0 (LTS) and above_

### Installation

There are a few ways you can install Vitepress API Document theme, namely npm, yarn and pnpm. If you install via npm, here is a a single cmd to install this library

```sh
  npm install vitepress-api-document-theme
```

#### Other options

- yarn

```sh
  yarn add vitepress-api-document-theme
```

- pnpm

```sh
  pnpm add vitepress-api-document-theme
```

## :fire: Usage

You will need to import component tags and css. Without the css import, the API Document theme will not display correctly.

### Import Component from Theme

You will need to import `DividePage` component to divide the main content into left and right so that API document theme can be rendered.

```js
<script setup>import {DividePage} from 'vitepress-api-document-theme'</script>
```

<p align="right">(<a href="#readme-top">back to top</a>)

### Import CSS from Theme

Per Vitepress's [Setup Wizard](https://vitepress.dev/guide/getting-started#setup-wizard), there are three options

1. Default Theme
2. Default Theme + Customization
3. Custom Theme

#### Option 1: Default Theme

You can import the file within `<style>` of each .md file that you plan to use the imported component.

```js
<style>
  @import './node_module/vitepress-api-document-theme/dist/style.css'
</style>
```

_Note_: Do not add `scoped` in `<style>` because the css will not work.

<div align="right">

[See example](https://github.com/logicspark/vitepress-api-document-theme/blob/main/example/default-theme/index.md?plain=1)

</div>

#### Option2: Default Theme + Customization

You must import style in the css file in the theme directory.

```css
@import "../../node_module/vitepress-api-document-theme/theme/style.css";
```

<div align="right">

[See example](https://github.com/logicspark/vitepress-api-document-theme/blob/main/example/default-theme-and-custom/.vitepress/theme/style.css)

</div>

#### Option 3: Custom Theme

Please follow Option 2's instruction

<div align="right">

[See example](https://github.com/logicspark/vitepress-api-document-theme/blob/main/example/custom-theme/.vitepress/theme/style.css)

</div>

### Implementation of Tags

There are two tags, namely:

- `<template #left>` - For the left side of the main content, you can write api descriptions like query parameters or return properties.
- `<template #right>` - For the right side of the main content, you can add sample codes like api request and response.

```js
<DividePage>

<template #left>

 // Add content here. Both html and markdown are supported.

</template>

<template #right>

 // Add content here. Both html and markdown are supported.

</template>
</DividePage>
```

_Note_: When writing markdown, please leave a line so that it displays a markdown instead of text like the example above.

<p align="right">(<a href="#readme-top">back to top</a>)

### Component Attribute

| Prop      | Type     | Required | Description                                                 |
| --------- | -------- | -------- | ----------------------------------------------------------- |
| **`top`** | `number` | Optional | Set vertical position of `<template #right>` Default is `0` |

For the full sample .md file in accordance to the live demo, please see our [example](https://github.com/logicspark/vitepress-api-document-theme/tree/main/example/default-theme-and-custom) directory.

<p align="right">(<a href="#readme-top">back to top</a>)

## :books: License

Distributed under the MIT License. See [`LICENSE`](https://github.com/logicspark/vitepress-api-document-theme/blob/main/LICENSE) for more information.

Vitepress is licenses under MIT License. Click [here](https://github.com/vuejs/vitepress/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)

## :pray: Acknowledgement

- [Vitepress](https://vitepress.dev/)
- [Img Shields](https://shields.io)

[Vitepress-url]: https://vitepress.dev/
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[Html]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://www.w3schools.com/html/
[Css]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://www.w3schools.com/css/
[Vue]: https://img.shields.io/badge/vue.js-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white
[Vue-url]: https://vuejs.org/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[package-url]: https://www.npmjs.com/package/awesome-social-button

<p align="right">(<a href="#readme-top">back to top</a>)
