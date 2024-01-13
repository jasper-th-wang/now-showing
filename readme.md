<div align="center">
<h1 align="center">
<br>NOW SHOWING!</h1>
<h3>◦ What's playing in the theatre??</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS" />
</p>
<img src="https://img.shields.io/github/license/jasper-th-wang/now-showing?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/jasper-th-wang/now-showing?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/jasper-th-wang/now-showing?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/jasper-th-wang/now-showing?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📂 repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running now-showing](#-running-now-showing)

---

## 📍 Overview

Now Showing is a simple responsive web application that presents a user-friendly interface for browsing movie listings, sourced from the YTS API.

It features an engaging design with movie cards that display images, titles, genres, and ratings. The site comes with navigation controls, including pagination buttons, to effortlessly browse through different pages of movies.

A loading animation ensures a smooth user experience while movie data is being fetched. Adding to its usability, the site is styled for various screen sizes, providing an accessible and visually appealing platform for movie enthusiasts to discover new films.

---

## 🎈 Demo

Here is the link to the live demo of this app:

https://serene-choux-3c9353.netlify.app

---

## 📂 Repository Structure

```sh
└── now-showing/
    ├── index.html
    ├── script.js
    └── style.css

```

---

## ⚙️ Modules

| File                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.html](https://github.com/jasper-th-wang/now-showing/blob/main/index.html) | The `index.html` establishes the structure for a webpage titled Now Showing with responsive design features that include a loading animation (`loader-container`), pagination controls (`pagination`), and content areas for movies and images (`container`). It references external styling (`style.css`) and font resources, and defers loading of a JavaScript file (`script.js`).                                                                                                                                                                                                                                                                                                                                                    |
| [script.js](https://github.com/jasper-th-wang/now-showing/blob/main/script.js)   | The JavaScript code manages the presentation of a paginated movie listing using data from the YTS API. It renders movies and pagination controls on a web page and handles user interactions with these controls:1. It fetches movie data for a given page and displays a loading screen until the data is loaded.2. Movies are displayed in cards with an image, title, genre, and rating.3. Pagination controls with buttons for navigation (e.g., previous, next, first, last) are rendered for easy page switching.4. An event listener responds to button clicks, updating the movie display and active pagination button.The code also handles errors such as failed data fetching and initializes the interface upon page load.   |
| [style.css](https://github.com/jasper-th-wang/now-showing/blob/main/style.css)   | The `style.css` file provides styling for a responsive movie display web application featuring a grid of movie cards. It globally removes margins and padding and sets border-box model. The HTML root size is scaled down for responsive font sizing. The body has a system font with a light background and full viewport height. Flexbox is used for layout structure with responsive grid displaying movie cards, which reveal ratings on hover and apply a blur effect to the images. Additionally, there are styles for a loading animation, which uses CSS masks and keyframes, and a pagination system with buttons that change color to indicate the current page. The media query optimizes the grid layout for wider screens. |

</details>

---

## 🚀 Getting Started

**_Dependencies_**

Please ensure you have the following dependencies installed on your system:

`- ℹ️ Dependency: live-server`

### 🔧 Installation

1. Clone the now-showing repository:

```sh
git clone https://github.com/jasper-th-wang/now-showing
```

2. Change to the project directory:

```sh
cd now-showing
```

### 🤖 Running now-showing

```sh
live-server .
```
