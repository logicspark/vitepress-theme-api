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

## Built with

1. [![Typescript][typescript]][typescript-url]
2. [![Vue][vue]][vue-url]
3. [![HTML][html]][html-url]
4. [![CSS][css]][css-url]
5. [![Vitest][vitest]][vitest-url]

<p align="right">(<a href="#readme-top">back to top</a>)

## Getting Started

Learn what is required before using Vitepress api document theme and how to install it quickly. Let's get started!

### Prerequisite

This is created base on Vite + Vue3 + TypeScript so you will need to install this lib inside Vitepress project.

### Installation

#### Other options

## Usage

ในไฟล์ .md สามารถ import theme มาใช้ได้เลย

ใส่ tag template เพื่อใส่ข้อมูล ใน ฝั่งซ้าย และ ขวา (left,right)

สามารถใส่ได้ทั้ง html และ markdown

```javascript
<script>
   import {PageDivision} from 'vitepress-api-document-theme'
</script>

<PageDivision>

<template #left>

  // สามารถใส่ได้ทั้ง html และ markdown

</template>

<template #right>

 // สามารถใส่ได้ทั้ง html และ markdown

</template>
</PageDivision>
```

_Note_: ควรเว้นวรรค ตามในตัวอย่างเพื่อให้เขียน markdown แล้ว ไม่กลายเป็น text ไป

### Component Attribute

| Prop | Type   | Required | Description                             |
| ---- | ------ | -------- | --------------------------------------- |
| top  | number | Optional | เซต position แนวตั้ง ของ elementฝั่งขวา |

[Vitepress-url]: https://vitepress.dev/
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[Html]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://www.w3schools.com/html/
[Css]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://www.w3schools.com/css/
[Vue]: https://img.shields.io/badge/vue.js-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white
[Vue-url]: https://vuejs.org/
[Vitest]: https://img.shields.io/badge/vitest-edd532?style=for-the-badge&logo=vitest&logoColor=black
[vitest-url]: https://vitest.dev/
[package-url]: https://www.npmjs.com/package/awesome-social-button
