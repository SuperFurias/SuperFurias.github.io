(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const header = document.getElementById("site-header");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealElements = Array.from(document.querySelectorAll(".reveal"));
  const revealAll = () => revealElements.forEach((element) => element.classList.add("is-visible"));

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll("a")) : [];
  let closeTimer = null;
  let focusTimer = null;
  let lastFocused = null;

  const setMenuState = (open) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);

    if (open) {
      window.clearTimeout(closeTimer);
      window.clearTimeout(focusTimer);
      lastFocused = document.activeElement;
      mobileMenu.hidden = false;
      window.requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
      focusTimer = window.setTimeout(() => {
        const firstLink = mobileMenu.querySelector("a");
        if (firstLink) firstLink.focus();
      }, 120);
    } else {
      mobileMenu.classList.remove("is-open");
      window.clearTimeout(focusTimer);
      closeTimer = window.setTimeout(() => {
        mobileMenu.hidden = true;
        if (lastFocused instanceof HTMLElement) lastFocused.focus();
      }, reducedMotion.matches ? 0 : 320);
    }
  };

  const isMenuOpen = () => menuToggle?.getAttribute("aria-expanded") === "true";

  const focusableInMenu = () => {
    if (!menuToggle || !mobileMenu) return [];
    return [menuToggle, ...Array.from(mobileMenu.querySelectorAll("a, button")).filter(
      (element) => element.offsetParent !== null
    )];
  };

  const trapFocus = (event) => {
    const focusable = focusableInMenu();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (!focusable.includes(active)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      setMenuState(!isMenuOpen());
    });

    mobileMenu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        event.preventDefault();
        setMenuState(false);
        window.clearTimeout(closeTimer);
        mobileMenu.hidden = true;

        const target = document.querySelector(href);
        if (target instanceof HTMLElement) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          window.setTimeout(() => {
            target.scrollIntoView({
              behavior: reducedMotion.matches ? "auto" : "smooth",
              block: "start",
            });
          }, 10);
          window.setTimeout(() => target.removeAttribute("tabindex"), 1200);
        }
      } else {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!isMenuOpen()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setMenuState(false);
        return;
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event) => {
      if (event.matches && isMenuOpen()) {
        setMenuState(false);
      }
    };

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", closeOnDesktop);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(closeOnDesktop);
    }
  }

  const livePanel = document.querySelector(".live-panel");
  const liveToggle = document.getElementById("live-toggle");
  const liveNote = document.getElementById("live-note");
  const liveFacade = document.getElementById("live-facade");
  const liveEmbeds = document.getElementById("live-embeds");
  const liveLoading = document.getElementById("live-loading");
  const liveFallback = document.getElementById("live-fallback");
  const loadStream = document.getElementById("load-stream");

  const setLiveState = (collapsed) => {
    if (!livePanel || !liveToggle) return;

    livePanel.classList.toggle("is-collapsed", collapsed);
    liveToggle.setAttribute("aria-expanded", String(!collapsed));
    liveToggle.setAttribute("aria-label", collapsed ? "Show Twitch player" : "Hide Twitch player");

    if (liveNote) {
      liveNote.hidden = !collapsed;
    }
  };

  if (livePanel && liveToggle) {
    setLiveState(false);

    liveToggle.addEventListener("click", () => {
      setLiveState(!livePanel.classList.contains("is-collapsed"));
    });
  }

  if (loadStream && liveFacade && liveEmbeds && liveToggle) {
    loadStream.addEventListener("click", () => {
      const frames = Array.from(liveEmbeds.querySelectorAll("iframe[data-src]"));
      let remaining = frames.length;
      let settled = false;

      const finishLoading = () => {
        if (settled) return;
        settled = true;
        if (liveLoading) liveLoading.hidden = true;
      };

      frames.forEach((frame) => {
        frame.addEventListener(
          "load",
          () => {
            remaining -= 1;
            if (remaining <= 0) finishLoading();
          },
          { once: true }
        );

        if (!frame.getAttribute("src")) {
          frame.setAttribute("src", frame.getAttribute("data-src"));
        }
      });

      liveFacade.hidden = true;
      liveEmbeds.hidden = false;
      liveToggle.hidden = false;
      if (liveLoading) liveLoading.hidden = false;
      if (liveFallback) liveFallback.hidden = true;
      setLiveState(false);
      liveToggle.focus({ preventScroll: true });

      window.setTimeout(() => {
        if (settled) return;
        finishLoading();
        if (liveFallback) liveFallback.hidden = false;
      }, 9000);
    });
  }

  const canvas = document.getElementById("embers");

  if (canvas instanceof HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    let particles = [];
    let frameId = null;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let resizeTimer = null;

    const makeParticles = () => {
      const count = viewportWidth < 700 ? 10 : 18;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * viewportWidth,
        y: Math.random() * viewportHeight,
        radius: Math.random() * 1.5 + 0.4,
        speed: Math.random() * 0.12 + 0.035,
        drift: (Math.random() - 0.5) * 0.07,
        alpha: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        ember: Math.random() > 0.78,
      }));
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = Math.floor(viewportWidth * dpr);
      canvas.height = Math.floor(viewportHeight * dpr);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;

      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      makeParticles();
    };

    const stopEmbers = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const drawEmbers = (time) => {
      if (!context) return;

      context.clearRect(0, 0, viewportWidth, viewportHeight);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(time / 4200 + particle.phase) * 0.05 + particle.drift;

        if (particle.y < -12) {
          particle.y = viewportHeight + 12;
          particle.x = Math.random() * viewportWidth;
        }

        if (particle.x < -12) particle.x = viewportWidth + 12;
        if (particle.x > viewportWidth + 12) particle.x = -12;

        const flicker = 0.65 + 0.35 * Math.sin(time / 900 + particle.phase);
        const alpha = particle.alpha * flicker;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.ember
          ? `rgba(249, 115, 22, ${alpha})`
          : `rgba(239, 68, 68, ${alpha})`;
        context.shadowBlur = 7;
        context.shadowColor = particle.ember
          ? "rgba(249, 115, 22, 0.55)"
          : "rgba(239, 68, 68, 0.55)";
        context.fill();
      });

      frameId = window.requestAnimationFrame(drawEmbers);
    };

    const startEmbers = () => {
      if (reducedMotion.matches || document.hidden || frameId !== null) return;
      frameId = window.requestAnimationFrame(drawEmbers);
    };

    const clearEmbers = () => {
      if (context) {
        context.clearRect(0, 0, viewportWidth, viewportHeight);
      }
    };

    sizeCanvas();

    if (reducedMotion.matches) {
      clearEmbers();
    } else {
      startEmbers();
    }

    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          sizeCanvas();
          if (reducedMotion.matches) clearEmbers();
        }, 150);
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopEmbers();
      } else {
        startEmbers();
      }
    });

    const onMotionPreferenceChange = (event) => {
      if (event.matches) {
        stopEmbers();
        clearEmbers();
      } else {
        startEmbers();
      }
    };

    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener("change", onMotionPreferenceChange);
    } else if (reducedMotion.addListener) {
      reducedMotion.addListener(onMotionPreferenceChange);
    }

    const onMotionChange = (event) => {
      if (event.matches) {
        revealAll();
        revealElements.forEach((element) => element.classList.add("is-visible"));
      }
    };

    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener("change", onMotionChange);
    } else if (reducedMotion.addListener) {
      reducedMotion.addListener(onMotionChange);
    }
  }
})();
