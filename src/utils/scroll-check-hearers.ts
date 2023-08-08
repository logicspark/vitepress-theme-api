let timer: ReturnType<typeof setTimeout>;

declare interface Options {
  idName?: string;
  adjustCalHeaderNum?: number;
  highLightColor: string;
}

function setHeadersStyle(index: number, options: Options) {
  const headers = document.querySelectorAll(".VPSidebarItem .level-1");
  const color = `color:${options.highLightColor}`;
  headers.forEach((_item, idx) => {
    if (idx === index) {
      headers[idx].querySelector("p")?.setAttribute("style", color);
    } else {
      headers[idx].querySelector("p")?.removeAttribute("style");
    }
  });
}

function checkPositionH2byScroll(options: Options) {
  let scrollYHeight: number;
  const headHeight = options?.adjustCalHeaderNum || 0;
  const { scrollY } = window;

  scrollYHeight = scrollY;

  if (options?.idName) {
    const content = document.getElementById(`#${options.idName}`);
    scrollYHeight = content?.scrollTop!;
  }

  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    if (scrollYHeight <= 5) {
      setHeadersStyle(0, options);
      return;
    }
    const selectedIndex: number[] = [];
    const filteredHeaders: HTMLElement[] = [];
    document.querySelectorAll("h2").forEach((item) => {
      if (!item.id) {
        return;
      }

      filteredHeaders.push(item);
    });

    filteredHeaders.forEach((item, index) => {
      const header = item.offsetTop - headHeight;
      if (scrollYHeight >= header) {
        selectedIndex.push(index);
      }
    });

    setHeadersStyle(selectedIndex[selectedIndex.length - 1], options);
  }, 100);
}

export default { checkPositionH2byScroll };
