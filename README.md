<a id="readme-top"></a>

<div align="center">
  <h1>Vitepress API Document Theme</h1>

[![VueJS](https://img.shields.io/badge/VueJS-3.0.x-%2341B883)][vue-url]
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/logicspark/awesome-social-button/blob/main/LICENSE)

</div>
<br/>
<div align="center">
<a href="#built-with">Built With</a> -
<a href="#getting-started">Getting Started</a> -
<a href="#fire-usage">Usage</a> -
<a href="#books-license">License</a> -
<a href="#pray-acknowledgement">Acknowledgement</a>
</div>

<br/>

## :sunglasses: Screenshots

Here is the link to the live [demo](). Have fun exploring!

## Built with

1. [![Typescript][typescript]][typescript-url]
2. [![Vue][vue]][vue-url]
3. [![HTML][html]][html-url]
4. [![CSS][css]][css-url]
5. [![Vite][vite]][vite-url]

<p align="right">(<a href="#readme-top">back to top</a>)

## Getting Started

Learn what is required before using Vitepress api document theme and how to install it quickly. Let's get started!

### Prerequisite

This is created base on Vite + Vue3 + TypeScript so you will need to install this lib inside Vitepress project.

Before installing the theme, please install the most recent `Node.js` version

- npm

```sh
  npm install npm@latest -g
```

_Support Node.js 14.21.0 and above_

### Installation

There are a few ways you can install Awesome Social Button, namely npm, yarn and pnpm. If you install via npm, here is a a single cmd to install this libarary

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

## Usage

You can simply import the theme to the .md file to start using. You can also customize the theme further with an external css file.

### Using basic theme

There are basically two tags

- `<template #left>` - For the left side of the main content, you can write api descriptions like query parameters or return properties.
- `<template #right>` - For the right side of the main content, you can add sample codes like api request and response.

```javascript
<script setup>
   import {PageDivision} from 'vitepress-api-document-theme'
</script>

<PageDivision>

<template #left>

 // Add content here. Both html and markdown are supported.

</template>

<template #right>

 // Add content here. Both html and markdown are supported.

</template>
</PageDivision>
```

_Note_: When writing markdown, please leave a line so that it displays a markdown instead of text like the example above.

### Using theme with additional css styling

2. import style ของ lib ในไฟล์ css ของ Vitepress project ด้วย

- กรณีที่เลือก แบบ Custom และ ผสม Custom ให้ import style ที่ css ที่เป็น theme ของ project

```css
@import "../../node_module/vitepress-api-document-theme/dist/style.css";
```

- กรณีที่เลือกใช้ default theme ของ vitepress ให้ import style ใน tag style ในไฟล์ .md ทุกอันที่ import component ไปใช้

```md
<style>
  @import './node_module/vitepress-api-document-theme/dist/style.css'
</style>
```

_Note_: ถ้าใส่ scoped ใน tag style style ที่ import มาจะไม่ติด

### Component Attribute

| Prop      | Type     | Required | Description                                                 |
| --------- | -------- | -------- | ----------------------------------------------------------- |
| **`top`** | `number` | Optional | เซต position แนวตั้ง ของ elementฝั่งขวา ค่าเริ่มต้นเป็น `0` |

For more details, please see our [example]() folder. It's a sample file that you can readily replace in your Vitepress project.

## :books: License

Distributed under the MIT License. See [`LICENSE`](https://github.com/logicspark/vitepress-api-document-theme/blob/main/LICENSE) for more information.

Vitepress is licenses under MIT License. Click [here](https://github.com/vuejs/vitepress/blob/main/LICENSE) for more information.

## :pray: Acknowledgement

- [Vitepress](https://vitepress.dev/)
- [Img Shields](https://shields.io)

[Vitepress-url]: https://vitepress.dev/
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[Html]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://www.w3schools.com/html/
[Css]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://www.w3schools.com/css/
[Vue]: https://img.shields.io/badge/vue.js-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white
[Vue-url]: https://vuejs.org/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[package-url]: https://www.npmjs.com/package/awesome-social-button
