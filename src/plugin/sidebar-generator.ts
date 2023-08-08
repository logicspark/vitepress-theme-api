import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, extname } from "path";
import matter from "gray-matter";

declare interface Options {
  sidebars: Sidebar;
  excludeFiles?: string[];
}

declare interface SidebarListItem {
  [key: string]: any;
}

export type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
};

export interface SidebarMulti {
  [path: string]: SidebarItem[];
}

export type Sidebar = SidebarItem[] | SidebarMulti;

export default class SidebarGenerator {
  static generateSidebar(options: Options) {
    const isMultipleSidebar = !Array.isArray(options.sidebars);

    const sidebar: Sidebar = {};

    if (isMultipleSidebar) {
      Object.keys(options.sidebars).forEach((item) => {
        const currentDirName = "." + item;
        const sidebarItems = SidebarGenerator._generateSidebarItem(
          currentDirName,
          options
        ).map(SidebarGenerator._setupSidebar(item, options, isMultipleSidebar));

        Object.assign(sidebar, { [item]: sidebarItems });
      });

      return sidebar;
    }

    (options.sidebars as SidebarItem[]).forEach((ele) => {
      const currentDir = ele.link?.replace("/", "");
      if (!currentDir) {
        return;
      }
      const sidebarItems = SidebarGenerator._generateSidebarItem(
        "./",
        options
      ).map(SidebarGenerator._setupSidebar("", options, isMultipleSidebar));

      Object.assign(sidebar, sidebarItems);
    });

    return Object.values(sidebar);
  }

  static _setupSidebar(
    file: string,
    options: Options,
    isMultipleSidebar: boolean
  ) {
    return (sidebar: SidebarItem | undefined | null) => {
      let customSidebar: SidebarItem | undefined = {};

      if (isMultipleSidebar) {
        customSidebar = (options.sidebars as SidebarMulti)[
          file as keyof SidebarMulti
        ].find((customSidebar: SidebarItem) => {
          return customSidebar.link === sidebar?.link;
        });
      } else {
        customSidebar = (options.sidebars as SidebarItem[]).find(
          (customSidebar) => {
            return customSidebar.link === sidebar?.link;
          }
        );
      }

      if (!sidebar) {
        return;
      }

      if (!customSidebar) {
        return sidebar;
      }

      sidebar!.text = customSidebar.text;

      return {
        ...sidebar,
        collapsed: customSidebar.collapsed,
      };
    };
  }

  static _generateSidebarItem(currentDir: string, options: Options) {
    let directoryFiles: string[] = readdirSync(currentDir);

    const exceptDotFiles = [".json", ".yaml", ".lock"];

    return directoryFiles
      .map((file) => {
        const childItemPath = resolve(currentDir, file);

        const childItemPathDisplay = `${currentDir.replace(".", "")}${file}`
          .replace(/\/{2}/, "/")
          .replace(/\.md$/, "");

        const checkDotVitePressFile = /\.vitepress/;

        const checkExceptDotFilesResult = exceptDotFiles.includes(
          extname(file)
        );

        const isDirectory = statSync(childItemPath).isDirectory();

        if (options.excludeFiles?.includes(file)) {
          return null;
        }

        if (checkDotVitePressFile.test(file)) {
          return null;
        }

        if (checkExceptDotFilesResult) {
          return null;
        }

        if (file === "index.md") {
          return null;
        }

        if (file === "node_modules") {
          return null;
        }

        if (isDirectory) {
          return null;
        }

        if (extname(file) === ".md") {
          let childItemText;
          const fileData = readFileSync(childItemPath, "utf-8");
          const linkText = file.replace(/\.md$/, "");
          childItemText = SidebarGenerator._getTitleFromFileName(file);
          const { content } = matter(fileData);

          const h2Tags = content
            .split("\n")
            .filter((item) => item.startsWith("## "))
            .map((item) => {
              const slicedText = item.slice(3);

              // const decodeText = slicedText.replace(" ", "-").toLowerCase();

              return {
                text: slicedText,
                // link: `${currentDir.replace(".", "")}${linkText}#${decodeText}`,
              };
            });

          if (h2Tags!.length) {
            return {
              text: childItemText as string,
              link: childItemPathDisplay,
              items: h2Tags,
            };
          }

          return {
            text: childItemText as string,
            link: childItemPathDisplay,
          };
        }

        return null;
      })
      .filter((result) => result !== null);
  }

  static _getTitleFromFileName(fileName: string, isDirectory = false) {
    let result = fileName;

    if (isDirectory) {
      result = result.replace(/-/g, " ").replace(/_/g, " ");
      return result;
    }
    result = result.replace(/-/g, " ").replace(/_/g, " ").replace(/\.md$/, "");
    return result;
  }
}

export { SidebarGenerator };

export const { generateSidebar } = SidebarGenerator;
