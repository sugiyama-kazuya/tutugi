window.onload = function () {
  // バーガーメニュー
  document
    .getElementById("js-burger-btn")
    .addEventListener("click", function () {
      const burgerBtn = document.getElementById("js-burger-btn");
      const navMenu = document.getElementById("js-sp-nav-menu");
      const body = document.body;
      const header = document.getElementById("js-header");

      // 画面をスクロールをさせるかさせないか
      const isScroll = function (event) {
        if (burgerBtn.classList.contains("-active")) {
          event.preventDefault();
        } else {
          event.stopPropagation();
        }
      };

      if (burgerBtn.classList.contains("-active")) {
        burgerBtn.classList.remove("-active");
        navMenu.classList.remove("-active");
        body.classList.remove("-sp-nav-menu-active");
        header.classList.remove("-sp-nav-menu-actice");
        document.removeEventListener("mousewheel", isScroll, {
          passive: false,
        });
      } else {
        burgerBtn.classList.add("-active");
        navMenu.classList.add("-active");
        body.classList.add("-sp-nav-menu-active");
        header.classList.add("-sp-nav-menu-actice");
        document.addEventListener("mousewheel", isScroll, {
          passive: false,
        });
      }
    });

  // sidetagとheaderの固定アニメーション
  document.addEventListener("scroll", function () {
    const sideTag = document.getElementById("js-side-tag");
    const kv = document.getElementById("js-kv");
    const target = kv.offsetTop + kv.clientHeight * 0.8;
    const header = document.getElementById("js-header");

    if (window.pageYOffset > target) {
      sideTag.classList.add("-active");
      header.classList.add("start-fixed");
      header.classList.remove("end-fixed");
    } else if (window.pageYOffset < header.clientHeight) {
      header.classList.remove("end-fixed");
    } else {
      if (header.classList.contains("start-fixed")) {
        header.classList.add("end-fixed");
        header.classList.remove("start-fixed");
      }
      sideTag.classList.remove("-active");
    }
  });

  // sp-nav-menuスクロールアニメーション
  const smoothAction = function () {
    const smoothScrollTriger = document.querySelectorAll("#js-nav-menu-target");

    const onScroll = function (event) {
      event.stopPropagation();
    };

    for (let i = 0; i < smoothScrollTriger.length; i++) {
      smoothScrollTriger[i].addEventListener("click", function () {
        const burgerBtn = document.getElementById("js-burger-btn");
        const navMenu = document.getElementById("js-sp-nav-menu");
        const body = document.body;
        const header = document.getElementById("js-header");

        if (navMenu.classList.contains("-active")) {
          burgerBtn.classList.remove("-active");
          navMenu.classList.remove("-active");
          body.classList.remove("-sp-nav-menu-active");
          header.classList.remove("-sp-nav-menu-actice");
          document.removeEventListener("mousewheel", onScroll, {
            passive: false,
          });
        }

        const scroll = new SmoothScroll('a[href*="#"]', {
          behavior: "smooth",
          speed: 300,
          easing: "Linear",
        });
      });
    }
  };
  smoothAction();
};
