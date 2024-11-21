import * as theme from "../dist/index.js";
import fs from "fs";

/**
 * @description camelCase를 kebab-case로 변경하는 함수
 * @param str
 */
const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

/**
 * @description  css 변수를 자동으로 생성하는 함수
 * theme.css
 * :root {
 * --gray-900: #171923
 * --gray-800: #2d303e
 * }
 */
const generateThemeCssVariables = () => {
  const cssString = [];

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          const selector = ":root";

          const cssVariables = Object.entries(colorValue)
            .map(([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(
                  ([subKey, subValue]) =>
                    `--${toCssCasting(mainKey)}-${toCssCasting(
                      subKey
                    )}: ${subValue};`
                )
                .join("\n")
            )
            .join("\n");

          return cssString.push(`${selector} {\n${cssVariables}\n}`);
        }

        if (colorKey === "dark") {
          const selector = ":root .theme-dark";

          const cssVariables = Object.entries(colorValue)
            .map(([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(
                  ([subKey, subValue]) =>
                    `--${toCssCasting(mainKey)}-${toCssCasting(
                      subKey
                    )}: ${subValue};`
                )
                .join("\n")
            )
            .join("\n");

          return cssString.push(`${selector} {\n${cssVariables}\n}`);
        }
      });

      return;
    }

    const selector = ":root";

    const cssVariables = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(
            ([subKey, subValue]) =>
              `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`
          )
          .join("\n")
      )
      .join("\n");

    return cssString.push(`${selector} {\n${cssVariables}\n}`);
  });
  return cssString;
};

// .headingxl {
//   font-size: 3rem;
//   font-weight: 700;
//   line-height: 100%;
// }
1;
/**
 * @description 클래스변수를 css파일을 자동으로 생성하는 함수
 * @returns
 */
const generateThemeCssClasses = () => {
  const cssString = [];

  Object.entries(theme.classes).forEach(([, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            const className = `.${toCssCasting(mainKey)}${toCssCasting(
              subKey
            )}`;

            const styleProperties = Object.entries(subValue)
              .map(
                ([styleKey, styleValue]) =>
                  `${toCssCasting(styleKey)}: ${styleValue};`
              )
              .join("\n");

            return `${className} {\n${styleProperties}\n}`;
          })
          .join("\n")
      )
      .join("\n");

    cssString.push(cssClasses);
  });

  return cssString;
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();
  const classes = generateThemeCssClasses();

  fs.writeFileSync("dist/themes.css", [...variables, ...classes].join("\n"));
};

generateThemeCss();
