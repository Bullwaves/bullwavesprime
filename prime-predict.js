/*!
 * Bullwaves Prime Predict Widget
 * Webflow usage:
 *
 * <div id="bullwaves-prime-predict"></div>
 * <script src="https://cdn.jsdelivr.net/gh/USERNAME/REPO/bullwaves-prime-predict.js" defer></script>
 *
 * Optional:
 * <script
 *   src="https://cdn.jsdelivr.net/gh/USERNAME/REPO/bullwaves-prime-predict.js"
 *   data-target="#bullwaves-prime-predict"
 *   data-signal-link="https://prime.bullwaves.com"
 *   data-start-link="https://prime.bullwaves.com"
 *   data-account-size="$5,000"
 *   data-account-price="$29"
 *   defer>
 * </script>
 */

(function () {
  "use strict";

  const WIDGET_ID = "bullwaves-prime-predict";
  const STYLE_ID = "bullwaves-prime-predict-style";
  const CHART_SRC = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";

  const currentScript = document.currentScript || document.querySelector('script[src*="bullwaves-prime-predict"]');

  const config = {
    apiKey: currentScript?.dataset?.apiKey || "kewr2QFtJuJYuGNtDpMjR81Ecp15OzQ3",
    target: currentScript?.dataset?.target || "#" + WIDGET_ID,
    signalLink: currentScript?.dataset?.signalLink || "#signal-link",
    startLink: currentScript?.dataset?.startLink || "#start-link",
    accountSize: currentScript?.dataset?.accountSize || "$5,000",
    accountPrice: currentScript?.dataset?.accountPrice || "$29",
    title: currentScript?.dataset?.title || "Will Gold (XAU/USD) go up today?"
  };

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (window.Chart) {
        resolve();
        return;
      }

      const existing = document.querySelector('script[src="' + src + '"]');

      if (existing) {
        existing.addEventListener("load", resolve);
        existing.addEventListener("error", reject);
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getMount() {
    let mount = document.querySelector(config.target);

    if (!mount) {
      mount = document.createElement("div");
      mount.id = WIDGET_ID;

      if (currentScript && currentScript.parentNode) {
        currentScript.parentNode.insertBefore(mount, currentScript);
      } else {
        document.body.appendChild(mount);
      }
    }

    return mount;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

:root {
  --bpm-blue: #0036ff;
  --bpm-text: #09090b;
  --bpm-muted: #6b7280;
  --bpm-light: #9ca3af;
  --bpm-border: #e5e7eb;
  --bpm-green: #16a34a;
  --bpm-green-soft: #eafaf1;
  --bpm-green-hover: #dcf7e8;
  --bpm-red: #ef4444;
  --bpm-red-soft: #fff0f0;
  --bpm-red-hover: #ffe4e4;
  --bpm-gold: #d7a22a;
}
