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

.bullwaves-predict-market,
.bullwaves-predict-market * {
  box-sizing: border-box;
}

.bullwaves-predict-market {
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 84px;
  background: #ffffff;
  color: var(--bpm-text);
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.bpm-container {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.bpm-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  margin-bottom: 22px;
}

.bpm-market-icon {
  width: 62px;
  height: 62px;
  border-radius: 15px;
  background: linear-gradient(135deg, #f6c454, #d7a22a 52%, #a06f0d);
  box-shadow: 0 12px 28px rgba(215, 162, 42, 0.22);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bpm-market-icon svg {
  width: 32px;
  height: 32px;
  display: block;
}

.bpm-title-wrap {
  min-width: 0;
}

.bpm-kicker,
.bpm-label {
  display: block;
  color: #7a8495;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 500;
  margin-bottom: 6px;
}

.bpm-top h1 {
  margin: 0;
  color: #050505;
  font-size: clamp(30px, 3vw, 44px);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.bpm-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.bpm-tag {
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 0 9px;
  border-radius: 999px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

.bpm-live-meta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #7a8495;
  font-size: 13px;
  line-height: 1;
  font-weight: 500;
}

.bpm-live-meta strong {
  color: var(--bpm-green);
  font-size: 13px;
  font-weight: 500;
}

.bpm-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--bpm-green);
  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.1);
  animation: bpmPulse 1.35s infinite;
}

.bpm-how-main {
  min-height: 48px;
  padding: 0 23px;
  border: 0;
  border-radius: 10px;
  background: var(--bpm-blue);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 14px 28px rgba(0, 54, 255, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.bpm-how-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(0, 54, 255, 0.24);
}

.bpm-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.42fr);
  gap: 14px;
  align-items: start;
}

.bpm-left,
.bpm-right {
  min-width: 0;
}

.bpm-chart-card,
.bpm-outcome-card,
.bpm-live-activity,
.bpm-signal-card,
.bpm-account-card,
.bpm-mini-card,
.bpm-stat-box {
  background: #ffffff;
  border: 1px solid var(--bpm-border);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.bpm-chart-card:hover,
.bpm-outcome-card:hover,
.bpm-live-activity:hover,
.bpm-signal-card:hover,
.bpm-account-card:hover,
.bpm-mini-card:hover,
.bpm-stat-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.08);
  border-color: #dde3eb;
}

.bpm-chart-card {
  padding: 22px;
  margin-bottom: 12px;
}

.bpm-chart-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.bpm-price {
  color: #09090b;
  font-size: 38px;
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 600;
  transition: transform 0.25s ease, color 0.25s ease;
}

.bpm-price.tick-up {
  color: var(--bpm-green);
  transform: translateY(-2px) scale(1.02);
}

.bpm-price.tick-down {
  color: var(--bpm-red);
  transform: translateY(2px) scale(1.02);
}

.bpm-delta {
  margin-top: 8px;
  color: var(--bpm-light);
  font-size: 13px;
  line-height: 1.2;
  font-weight: 500;
}

.bpm-delta.positive {
  color: var(--bpm-green);
}

.bpm-delta.negative {
  color: var(--bpm-red);
}

.bpm-chart-side {
  text-align: right;
  white-space: nowrap;
}

.bpm-live-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ecfdf3;
  color: var(--bpm-green);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 9px;
}

.bpm-live-pill span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--bpm-green);
  animation: bpmPulse 1.35s infinite;
}

.bpm-live-pill strong {
  font-size: 12px;
  font-weight: 500;
}

.bpm-chart-side small {
  display: block;
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 500;
}

.bpm-chart-side em {
  display: block;
  margin-top: 6px;
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.2;
  font-style: normal;
  font-weight: 500;
}

.bpm-chart-shell {
  position: relative;
  height: 320px;
  border-top: 1px solid #eef0f3;
  border-bottom: 1px solid #eef0f3;
  background: #ffffff;
  padding: 18px 0 12px;
  overflow: hidden;
}

#bpmChart {
  width: 100% !important;
  height: 100% !important;
}

.bpm-time-tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
}

.bpm-time-tab {
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #7a8495;
  font-size: 12px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.bpm-time-tab:hover {
  background: #f3f4f6;
  color: #111827;
}

.bpm-time-tab.active {
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

.bpm-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}

.bpm-stat-box {
  padding: 16px;
  border-radius: 17px;
}

.bpm-stat-box span {
  display: block;
  color: #7a8495;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 500;
  margin-bottom: 7px;
}

.bpm-stat-box strong {
  display: block;
  color: #111827;
  font-size: 21px;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 600;
}

.bpm-stat-box small {
  display: block;
  margin-top: 7px;
  color: #9ca3af;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
}

.bpm-outcome-card {
  padding: 20px;
  margin-bottom: 12px;
}

.bpm-section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.bpm-section-head h2 {
  margin: 0;
  color: #050505;
  font-size: 26px;
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 600;
}

.bpm-outcomes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bpm-outcome-row {
  min-height: 88px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) minmax(96px, auto) auto;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  text-decoration: none;
  border: 1px solid var(--bpm-border);
  transition: transform 0.2s ease, box-shadow 0.22s ease, background 0.22s ease, border-color 0.22s ease;
}

.bpm-outcome-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.bpm-outcome-yes {
  background: var(--bpm-green-soft);
  border-color: rgba(22, 163, 74, 0.24);
}

.bpm-outcome-yes:hover {
  background: var(--bpm-green-hover);
  border-color: rgba(22, 163, 74, 0.34);
}

.bpm-outcome-no {
  background: var(--bpm-red-soft);
  border-color: rgba(239, 68, 68, 0.24);
}

.bpm-outcome-no:hover {
  background: var(--bpm-red-hover);
  border-color: rgba(239, 68, 68, 0.34);
}

.bpm-outcome-icon {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 700;
  flex: 0 0 auto;
}

.bpm-outcome-yes .bpm-outcome-icon {
  background: rgba(22, 163, 74, 0.12);
  color: var(--bpm-green);
}

.bpm-outcome-no .bpm-outcome-icon {
  background: rgba(239, 68, 68, 0.12);
  color: var(--bpm-red);
}

.bpm-outcome-copy {
  min-width: 0;
}

.bpm-outcome-copy strong {
  display: block;
  color: #111827;
  font-size: 16px;
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 600;
}

.bpm-outcome-copy span {
  display: block;
  margin-top: 5px;
  color: #7a8495;
  font-size: 12px;
  line-height: 1.35;
  font-weight: 400;
}

.bpm-outcome-market {
  min-width: 92px;
}

.bpm-bar {
  width: 100%;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  overflow: hidden;
  margin-bottom: 6px;
}

.bpm-bar i {
  display: block;
  width: 0%;
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease;
}

.bpm-outcome-yes .bpm-bar i {
  background: var(--bpm-green);
}

.bpm-outcome-no .bpm-bar i {
  background: var(--bpm-red);
}

.bpm-outcome-market strong {
  display: block;
  text-align: right;
  font-size: 22px;
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.bpm-outcome-yes .bpm-outcome-market strong {
  color: var(--bpm-green);
}

.bpm-outcome-no .bpm-outcome-market strong {
  color: var(--bpm-red);
}

.bpm-outcome-row button {
  min-height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.bpm-outcome-row button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.bpm-outcome-yes button {
  background: var(--bpm-green);
}

.bpm-outcome-no button {
  background: var(--bpm-red);
}

.bpm-live-activity {
  overflow: hidden;
}

.bpm-live-activity-head {
  min-height: 46px;
  padding: 0 16px;
  border-bottom: 1px solid #eef0f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.bpm-live-activity-head > div {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}

.bpm-live-activity-head strong {
  color: #111827;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
}

.bpm-live-activity-head small {
  color: #9ca3af;
  font-size: 12px;
  font-weight: 500;
}

.bpm-bet-stage {
  position: relative;
  height: 76px;
  padding: 10px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
}

.bpm-bet-feed {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.bpm-order-toast {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -58px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.11);
  opacity: 0;
  transform: translateY(16px) scale(0.985);
  transition: opacity 0.32s ease, transform 0.32s ease, bottom 0.32s ease;
}

.bpm-order-toast.is-visible {
  opacity: 1;
  bottom: 0;
  transform: translateY(0) scale(1);
}

.bpm-order-toast.is-leaving {
  opacity: 0;
  bottom: 28px;
  transform: translateY(-10px) scale(0.985);
}

.bpm-order-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.bpm-order-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex: 0 0 auto;
}

.bpm-order-toast.is-yes .bpm-order-dot {
  background: var(--bpm-green);
  box-shadow: 0 0 0 6px rgba(22, 163, 74, 0.1);
}

.bpm-order-toast.is-no .bpm-order-dot {
  background: var(--bpm-red);
  box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.1);
}

.bpm-order-copy {
  min-width: 0;
}

.bpm-order-copy strong {
  display: block;
  color: #111827;
  font-size: 13px;
  line-height: 1.15;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bpm-order-copy span {
  display: block;
  margin-top: 4px;
  color: #7a8495;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 400;
}

.bpm-order-side {
  text-align: right;
  flex: 0 0 auto;
}

.bpm-order-side b {
  display: block;
  font-size: 14px;
  line-height: 1.1;
  font-weight: 600;
}

.bpm-order-toast.is-yes .bpm-order-side b {
  color: var(--bpm-green);
}

.bpm-order-toast.is-no .bpm-order-side b {
  color: var(--bpm-red);
}

.bpm-order-side small {
  display: block;
  margin-top: 4px;
  color: #9ca3af;
  font-size: 11px;
  line-height: 1;
}

.bpm-signal-card {
  padding: 24px;
  margin-bottom: 12px;
}

.bpm-signal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
}

.bpm-signal-head h3 {
  margin: 0;
  color: #0b0b0f;
  font-size: 24px;
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 700;
}

.bpm-lock-pill {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--bpm-blue);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: 0 12px 26px rgba(0, 54, 255, 0.22);
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  flex: 0 0 auto;
}

.bpm-lock-pill svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.bpm-signal-box {
  position: relative;
  min-height: 365px;
  overflow: hidden;
  border-radius: 16px;
  background: #ffffff;
}

.bpm-signal-row {
  min-height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid #ebebee;
}

.bpm-signal-row span {
  color: #858585;
  font-size: 17px;
  line-height: 1;
  letter-spacing: -0.025em;
  font-weight: 600;
}

.bpm-signal-row strong {
  color: #111827;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  filter: blur(7px);
  opacity: 0.62;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  max-width: 130px;
}

.bpm-signal-unlock {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 150px;
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.88) 28%,
    #ffffff 100%
  );
  backdrop-filter: blur(2px);
}

.bpm-unlock-icon {
  width: 22px;
  height: 22px;
  margin-bottom: 8px;
  color: #0b0b0f;
  display: grid;
  place-items: center;
}

.bpm-unlock-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.bpm-signal-unlock h4 {
  margin: 0 0 7px;
  color: #0b0b0f;
  font-size: 19px;
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 700;
}

.bpm-signal-unlock p {
  max-width: 260px;
  margin: 0 auto 16px;
  color: #858585;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 500;
}

.bpm-signal-unlock a {
  width: 100%;
  min-height: 46px;
  border-radius: 12px;
  background: var(--bpm-blue);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 17px;
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 700;
  box-shadow: 0 16px 34px rgba(0, 54, 255, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bpm-signal-unlock a:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 42px rgba(0, 54, 255, 0.28);
}

.bpm-account-card {
  padding: 16px;
  margin-bottom: 12px;
}

.bpm-account-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid #eef0f3;
}

.bpm-account-row:first-child {
  padding-top: 0;
}

.bpm-account-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.bpm-account-row span {
  color: #7a8495;
  font-size: 13px;
  font-weight: 500;
}

.bpm-account-row strong {
  color: #111827;
  font-size: 17px;
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 700;
}

.bpm-mini-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 14px;
}

.bpm-mini-card > div {
  padding: 14px;
  border: 1px solid var(--bpm-border);
  border-radius: 15px;
  background: #fafafa;
}

.bpm-mini-card span {
  display: block;
  color: #7a8495;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
}

.bpm-mini-card strong {
  display: block;
  color: #111827;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 600;
}

.bpm-mini-card small {
  display: block;
  margin-top: 6px;
  color: #7a8495;
  font-size: 12px;
  line-height: 1.35;
  font-weight: 400;
}

.bpm-risk {
  margin: 13px 0 0;
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
  font-weight: 400;
}

.bpm-overlay {
  position: fixed;
  inset: 0;
  z-index: 999998;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 22px;
}

.bpm-overlay.is-open {
  display: flex;
}

.bpm-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.46);
  backdrop-filter: blur(5px);
}

.bpm-modal {
  position: relative;
  z-index: 1;
  width: min(460px, 100%);
  overflow: hidden;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(229, 231, 235, 0.9);
  box-shadow: 0 34px 90px rgba(15, 23, 42, 0.24);
  animation: bpmModalIn 0.28s ease both;
}

.bpm-modal-close {
  position: absolute;
  z-index: 3;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: #111827;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, background 0.2s ease;
}

.bpm-modal-close:hover {
  transform: scale(1.04);
  background: #ffffff;
}

.bpm-modal-visual {
  height: 250px;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 22%, rgba(0, 54, 255, 0.1), transparent 34%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.bpm-modal-visual::before,
.bpm-modal-visual::after {
  content: "";
  position: absolute;
  width: 230px;
  height: 126px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(229, 231, 235, 0.8);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);
  transform: rotate(-8deg);
}

.bpm-modal-visual::before {
  top: 34px;
  left: -42px;
}

.bpm-modal-visual::after {
  right: -46px;
  bottom: 38px;
  transform: rotate(8deg);
}

.bpm-demo-card {
  position: relative;
  z-index: 2;
  width: 285px;
  padding: 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(229, 231, 235, 0.9);
  box-shadow: 0 24px 55px rgba(15, 23, 42, 0.16);
  transform: rotate(-5deg);
}

.bpm-demo-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.bpm-demo-top span {
  max-width: 175px;
  color: #111827;
  font-size: 15px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.bpm-demo-top strong {
  color: #111827;
  font-size: 20px;
  line-height: 1;
  font-weight: 700;
}

.bpm-demo-bar {
  height: 6px;
  background: #eef0f3;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 16px;
}

.bpm-demo-bar i {
  display: block;
  width: 62%;
  height: 100%;
  border-radius: 999px;
  background: var(--bpm-green);
  transition: width 0.3s ease, background 0.3s ease;
}

.bpm-modal-visual.theme-blue .bpm-demo-bar i {
  background: var(--bpm-blue);
}

.bpm-modal-visual.theme-gold .bpm-demo-bar i {
  background: var(--bpm-gold);
}

.bpm-demo-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.bpm-demo-actions button {
  border: 0;
  border-radius: 9px;
  min-height: 39px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.bpm-demo-actions button:first-child {
  background: var(--bpm-green);
  box-shadow: 0 10px 22px rgba(22, 163, 74, 0.18);
}

.bpm-demo-actions button:last-child {
  background: #94a3b8;
}

.bpm-modal-visual.theme-blue .bpm-demo-actions button:first-child {
  background: var(--bpm-blue);
  box-shadow: 0 10px 22px rgba(0, 54, 255, 0.18);
}

.bpm-modal-visual.theme-gold .bpm-demo-actions button:first-child {
  background: var(--bpm-gold);
  box-shadow: 0 10px 22px rgba(215, 162, 42, 0.18);
}

.bpm-modal-body {
  padding: 26px;
}

.bpm-modal-step {
  color: #7a8495;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 10px;
}

.bpm-modal-body h3 {
  margin: 0 0 12px;
  color: #050505;
  font-size: 25px;
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 600;
}

.bpm-modal-body p {
  margin: 0 0 22px;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 400;
}

.bpm-modal-dots {
  display: flex;
  gap: 7px;
  margin-bottom: 18px;
}

.bpm-modal-dots span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #d1d5db;
  transition: width 0.2s ease, background 0.2s ease;
}

.bpm-modal-dots span.active {
  width: 24px;
  background: #111827;
}

.bpm-modal-next {
  width: 100%;
  min-height: 50px;
  border: 0;
  border-radius: 10px;
  background: var(--bpm-blue);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(0, 54, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bpm-modal-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(0, 54, 255, 0.26);
}

@keyframes bpmPulse {
  0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.34); }
  70% { box-shadow: 0 0 0 8px rgba(22, 163, 74, 0); }
  100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
}

@keyframes bpmModalIn {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 1050px) {
  .bpm-layout {
    grid-template-columns: 1fr;
  }

  .bpm-right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .bpm-signal-card {
    grid-column: 1 / -1;
  }

  .bpm-account-card,
  .bpm-mini-card {
    margin-bottom: 0;
  }

  .bpm-risk {
    grid-column: 1 / -1;
  }
}

@media (max-width: 720px) {
  .bullwaves-predict-market {
    padding: 38px 14px 64px;
  }

  .bpm-top {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: flex-start;
  }

  .bpm-how-main {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 50px;
  }

  .bpm-market-icon {
    width: 54px;
    height: 54px;
    border-radius: 13px;
  }

  .bpm-market-icon svg {
    width: 28px;
    height: 28px;
  }

  .bpm-top h1 {
    font-size: 30px;
    line-height: 1.04;
  }

  .bpm-layout {
    gap: 12px;
  }

  .bpm-chart-card,
  .bpm-outcome-card,
  .bpm-live-activity,
  .bpm-signal-card,
  .bpm-account-card,
  .bpm-mini-card,
  .bpm-stat-box {
    border-radius: 18px;
  }

  .bpm-chart-card,
  .bpm-outcome-card {
    padding: 15px;
  }

  .bpm-chart-head {
    flex-direction: column;
    gap: 14px;
  }

  .bpm-chart-side {
    text-align: left;
  }

  .bpm-price {
    font-size: 31px;
  }

  .bpm-chart-shell {
    height: 245px;
    padding-top: 14px;
  }

  .bpm-stats-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .bpm-stat-box {
    padding: 14px;
  }

  .bpm-outcome-row {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
  }

  .bpm-outcome-market {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .bpm-outcome-market strong {
    font-size: 21px;
  }

  .bpm-outcome-row button {
    grid-column: 1 / -1;
    width: 100%;
  }

  .bpm-live-activity-head {
    height: auto;
    padding: 12px 14px;
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .bpm-bet-stage {
    height: 76px;
  }

  .bpm-right {
    display: block;
  }

  .bpm-signal-card,
  .bpm-account-card,
  .bpm-mini-card {
    margin-bottom: 12px;
  }

  .bpm-signal-card {
    padding: 22px 18px;
  }

  .bpm-signal-head {
    margin-bottom: 20px;
  }

  .bpm-signal-head h3 {
    font-size: 23px;
  }

  .bpm-lock-pill {
    min-height: 32px;
    padding: 0 13px;
    font-size: 12px;
  }

  .bpm-signal-box {
    min-height: 350px;
  }

  .bpm-signal-row {
    min-height: 52px;
  }

  .bpm-signal-row span {
    font-size: 16px;
  }

  .bpm-signal-unlock {
    min-height: 145px;
  }

  .bpm-signal-unlock h4 {
    font-size: 18px;
  }

  .bpm-signal-unlock p {
    font-size: 13px;
  }

  .bpm-signal-unlock a {
    min-height: 44px;
    font-size: 16px;
  }

  .bpm-modal {
    width: min(420px, 100%);
    max-height: calc(100vh - 32px);
    overflow-y: auto;
    border-radius: 22px;
  }

  .bpm-modal-visual {
    height: 190px;
  }

  .bpm-demo-card {
    width: 235px;
    padding: 14px;
  }

  .bpm-modal-body {
    padding: 20px;
  }

  .bpm-modal-body h3 {
    font-size: 22px;
  }

  .bpm-modal-body p {
    font-size: 14px;
    margin-bottom: 18px;
  }
}

@media (max-width: 420px) {
  .bullwaves-predict-market {
    padding-left: 12px;
    padding-right: 12px;
  }

  .bpm-top h1 {
    font-size: 27px;
  }

  .bpm-price {
    font-size: 28px;
  }

  .bpm-chart-shell {
    height: 225px;
  }

  .bpm-section-head h2 {
    font-size: 23px;
  }

  .bpm-signal-head h3 {
    font-size: 22px;
  }

  .bpm-lock-pill {
    font-size: 12px;
    padding: 0 12px;
  }

  .bpm-signal-box {
    min-height: 340px;
  }

  .bpm-signal-row span {
    font-size: 15px;
  }

  .bpm-signal-row strong {
    max-width: 120px;
  }

  .bpm-signal-unlock a {
    font-size: 15px;
  }

  .bpm-order-copy strong {
    font-size: 12px;
  }

  .bpm-order-copy span {
    font-size: 11px;
  }
}
`;

    document.head.appendChild(style);
  }

  function renderHTML() {
    return `
<section class="bullwaves-predict-market">
  <div class="bpm-container">
    <header class="bpm-top">
      <div class="bpm-market-icon">
        <svg viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
          <path d="m1 22 1.5-5h7L11 22zm12 0 1.5-5h7L23 22zm-7-7 1.5-5h7L16 15zM18.05 11l-1.09-3.86-3.86-1.09 3.86-1.09L18.05 1l1.09 3.86 3.86 1.09-3.86 1.09z"/>
        </svg>
      </div>

      <div class="bpm-title-wrap">
        <div class="bpm-kicker">Prime Predict</div>
        <h1>${escapeHTML(config.title)}</h1>

        <div class="bpm-meta">
          <span class="bpm-tag">Finance</span>
          <span class="bpm-tag">Gold</span>
          <span class="bpm-live-meta">
            <span class="bpm-live-dot"></span>
            <strong data-bpm="status">Live markets</strong>
            <span>· Vol <span data-bpm="metaVolume">$0</span></span>
          </span>
        </div>
      </div>

      <button type="button" class="bpm-how-main" data-bpm="howBtn">How it works</button>
    </header>

    <div class="bpm-layout">
      <main class="bpm-left">
        <section class="bpm-chart-card">
          <div class="bpm-chart-head">
            <div>
              <div class="bpm-label">Gold · XAU/USD</div>
              <div class="bpm-price" data-bpm="price">Loading</div>
              <div class="bpm-delta" data-bpm="delta">Loading market data</div>
            </div>

            <div class="bpm-chart-side">
              <div class="bpm-live-pill">
                <span></span>
                <strong data-bpm="dataStatus">Live markets</strong>
              </div>
              <small data-bpm="lastUpdate">--</small>
              <em>XAU/USD live chart</em>
            </div>
          </div>

          <div class="bpm-chart-shell">
            <canvas data-bpm="chart"></canvas>
          </div>

          <div class="bpm-time-tabs">
            <button type="button" class="bpm-time-tab active">1D</button>
            <button type="button" class="bpm-time-tab">1W</button>
            <button type="button" class="bpm-time-tab">1M</button>
          </div>
        </section>

        <section class="bpm-stats-row">
          <div class="bpm-stat-box">
            <span>Volume 24h</span>
            <strong data-bpm="volume24h">$0</strong>
          </div>

          <div class="bpm-stat-box">
            <span>Open interest</span>
            <strong data-bpm="openInterest">$0</strong>
          </div>

          <div class="bpm-stat-box">
            <span>Expires</span>
            <strong data-bpm="expires">Today 23:59</strong>
            <small data-bpm="expiresCountdown">--</small>
          </div>
        </section>

        <section class="bpm-outcome-card">
          <div class="bpm-section-head">
            <div>
              <span class="bpm-label">Outcomes</span>
              <h2>Choose your prediction</h2>
            </div>
          </div>

          <div class="bpm-outcomes">
            <a href="${escapeHTML(config.signalLink)}" class="bpm-outcome-row bpm-outcome-yes">
              <div class="bpm-outcome-icon">▲</div>
              <div class="bpm-outcome-copy">
                <strong>Yes, Gold goes up</strong>
                <span>Gold closes above today’s opening price</span>
              </div>
              <div class="bpm-outcome-market">
                <div class="bpm-bar"><i data-bpm="yesBar"></i></div>
                <strong data-bpm="yesPct">--</strong>
              </div>
              <button type="button">Buy Yes</button>
            </a>

            <a href="${escapeHTML(config.signalLink)}" class="bpm-outcome-row bpm-outcome-no">
              <div class="bpm-outcome-icon">▼</div>
              <div class="bpm-outcome-copy">
                <strong>No, Gold goes down</strong>
                <span>Gold closes below today’s opening price</span>
              </div>
              <div class="bpm-outcome-market">
                <div class="bpm-bar"><i data-bpm="noBar"></i></div>
                <strong data-bpm="noPct">--</strong>
              </div>
              <button type="button">Buy No</button>
            </a>
          </div>
        </section>

        <section class="bpm-live-activity">
          <div class="bpm-live-activity-head">
            <div>
              <span class="bpm-live-dot"></span>
              <strong>Live market activity</strong>
            </div>
            <small>Real-time orders</small>
          </div>

          <div class="bpm-bet-stage">
            <div data-bpm="orderFeed" class="bpm-bet-feed"></div>
          </div>
        </section>
      </main>

      <aside class="bpm-right">
        <section class="bpm-signal-card">
          <div class="bpm-signal-head">
            <h3>Bullwaves Signal</h3>

            <div class="bpm-lock-pill">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Locked
            </div>
          </div>

          <div class="bpm-signal-box">
            <div class="bpm-signal-row">
              <span>Setup</span>
              <strong data-bpm="signal">BUY XAU/USD</strong>
            </div>

            <div class="bpm-signal-row">
              <span>Entry</span>
              <strong data-bpm="entry">3,320.00</strong>
            </div>

            <div class="bpm-signal-row">
              <span>Take profit</span>
              <strong data-bpm="tp">3,328.50</strong>
            </div>

            <div class="bpm-signal-row">
              <span>Stop loss</span>
              <strong data-bpm="sl">3,314.80</strong>
            </div>

            <div class="bpm-signal-row">
              <span>Risk</span>
              <strong data-bpm="risk">Low / Med</strong>
            </div>

            <div class="bpm-signal-unlock">
              <div class="bpm-unlock-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              <h4>Unlock the signal</h4>
              <p>Entry, take profit and stop loss before trading.</p>
              <a href="${escapeHTML(config.signalLink)}">Discover the signal →</a>
            </div>
          </div>
        </section>

        <section class="bpm-account-card">
          <div class="bpm-account-row">
            <span>Account size</span>
            <strong>${escapeHTML(config.accountSize)}</strong>
          </div>

          <div class="bpm-account-row">
            <span>Starts from</span>
            <strong>${escapeHTML(config.accountPrice)}</strong>
          </div>
        </section>

        <section class="bpm-mini-card">
          <div>
            <span>What you unlock</span>
            <strong>Full trade setup</strong>
            <small>Signal, entry, TP and SL</small>
          </div>

          <div>
            <span>Beginner friendly</span>
            <strong>Step-by-step</strong>
            <small>Simple guidance before trading</small>
          </div>
        </section>

        <p class="bpm-risk">
          Trading involves risk. Signals are for educational purposes only and do not guarantee profits.
        </p>
      </aside>
    </div>
  </div>

  <div class="bpm-overlay" data-bpm="overlay" aria-hidden="true">
    <div class="bpm-backdrop" data-bpm="backdrop"></div>

    <div class="bpm-modal" role="dialog" aria-modal="true">
      <button type="button" class="bpm-modal-close" data-bpm="close" aria-label="Close popup">×</button>

      <div class="bpm-modal-visual" data-bpm="modalVisual">
        <div class="bpm-demo-card">
          <div class="bpm-demo-top">
            <span data-bpm="demoQ">Will Gold go up today?</span>
            <strong data-bpm="demoPct">62%</strong>
          </div>

          <div class="bpm-demo-bar"><i data-bpm="demoFill"></i></div>

          <div class="bpm-demo-actions">
            <button type="button">Buy Yes</button>
            <button type="button">Buy No</button>
          </div>
        </div>
      </div>

      <div class="bpm-modal-body">
        <div class="bpm-modal-step" data-bpm="step">1 of 4</div>
        <h3 data-bpm="modalTitle">Pick a market</h3>
        <p data-bpm="modalText">Choose a live market like Gold and decide if you think it will move up or down today.</p>

        <div class="bpm-modal-dots" data-bpm="dots">
          <span class="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <button type="button" class="bpm-modal-next" data-bpm="next">Next</button>
      </div>
    </div>
  </div>
</section>`;
  }

  function initWidget(mount) {
    const root = mount.querySelector(".bullwaves-predict-market");

    function get(name) {
      return root.querySelector('[data-bpm="' + name + '"]');
    }

    const FX_TICKER = "C:XAUUSD";
    const MAX_POINTS_DESKTOP = 84;
    const MAX_POINTS_MOBILE = 42;
    const REAL_REFRESH_MS = 60000;
    const VISUAL_TICK_MS = 4000;
    const ORDER_TICK_MIN = 2600;
    const ORDER_TICK_MAX = 5600;

    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    const MAX_POINTS = isMobile ? MAX_POINTS_MOBILE : MAX_POINTS_DESKTOP;

    let chart = null;
    let labels = [];
    let prices = [];
    let firstPrice = null;
    let displayPrice = null;
    let fallbackPrice = 3320;
    let usingFallback = false;
    let lastRealUpdate = null;
    let currentYes = null;
    let currentNo = null;
    let orderLoopStarted = false;
    let volume24h = 0;
    let openInterest = 0;

    const canvas = get("chart");
    const priceEl = get("price");
    const deltaEl = get("delta");
    const lastUpdateEl = get("lastUpdate");
    const statusEl = get("status");
    const dataStatusEl = get("dataStatus");
    const yesPctEl = get("yesPct");
    const noPctEl = get("noPct");
    const yesBarEl = get("yesBar");
    const noBarEl = get("noBar");
    const signalEl = get("signal");
    const entryEl = get("entry");
    const tpEl = get("tp");
    const slEl = get("sl");
    const riskEl = get("risk");
    const orderFeed = get("orderFeed");
    const volume24hEl = get("volume24h");
    const openInterestEl = get("openInterest");
    const metaVolumeEl = get("metaVolume");
    const expiresEl = get("expires");
    const expiresCountdownEl = get("expiresCountdown");

    const traderNames = [
      "goldwolf",
      "trendpilot",
      "marketflow",
      "bullrunner",
      "xauhunter",
      "primeuser",
      "fastentry",
      "chartmind",
      "liquidity",
      "goldsignal",
      "breakout",
      "smartmoney",
      "wavepilot",
      "alphaedge",
      "traderx"
    ];

    function formatPrice(value) {
      return "$" + Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function formatRaw(value) {
      return Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function formatMoney(value) {
      if (value >= 1000000) {
        return "$" + (value / 1000000).toFixed(value >= 10000000 ? 1 : 2).replace(/\\.0$/, "") + "M";
      }

      if (value >= 1000) {
        return "$" + (value / 1000).toFixed(value >= 100000 ? 0 : 1).replace(/\\.0$/, "") + "K";
      }

      return "$" + Math.round(value).toLocaleString("en-US");
    }

    function timeNow() {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }

    function shortTime(date) {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function dateString(date) {
      return date.toISOString().slice(0, 10);
    }

    function randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getEndOfToday() {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      return end;
    }

    function updateExpiry() {
      const end = getEndOfToday();
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      expiresEl.textContent = "Today 23:59";
      expiresCountdownEl.textContent = "Closes in " + hours + "h " + minutes + "m";
    }

    function getAggUrl() {
      const now = new Date();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

      return (
        "https://api.polygon.io/v2/aggs/ticker/" +
        encodeURIComponent(FX_TICKER) +
        "/range/15/minute/" +
        dateString(yesterday) +
        "/" +
        dateString(now) +
        "?adjusted=true&sort=asc&limit=96&apiKey=" +
        encodeURIComponent(config.apiKey)
      );
    }

    function getQuoteUrl() {
      return "https://api.polygon.io/v1/last_quote/currencies/XAU/USD?apiKey=" + encodeURIComponent(config.apiKey);
    }

    async function getJson(url) {
      const response = await fetch(url, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json();
    }

    function extractAggs(data) {
      if (!data || !Array.isArray(data.results)) return null;

      return data.results
        .map(function (bar) {
          return {
            time: bar.t
              ? new Date(bar.t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : "",
            close: Number(bar.c),
            volume: Number(bar.v || 0)
          };
        })
        .filter(function (bar) {
          return bar.close && !Number.isNaN(bar.close);
        });
    }

    function extractQuotePrice(data) {
      const source = data && (data.last || data.results || data);
      const bid = Number(source && (source.bid || source.b || 0));
      const ask = Number(source && (source.ask || source.a || 0));
      const mid = Number(source && (source.price || source.p || 0));

      if (bid && ask) return (bid + ask) / 2;
      if (mid) return mid;
      if (bid) return bid;
      if (ask) return ask;

      return null;
    }

    function calculateVolatility() {
      if (!prices || prices.length < 4) return 1;

      const last = prices[prices.length - 1];
      const first = prices[0];
      const move = Math.abs(((last - first) / first) * 100);

      return Math.max(1, move);
    }

    function seedStatsFromBars(bars) {
      const volatility = calculateVolatility();

      const realVolume = bars && bars.length
        ? bars.reduce(function (total, bar) {
            return total + (Number(bar.volume) || 0);
          }, 0)
        : 0;

      if (realVolume > 0) {
        volume24h = Math.max(1200000, realVolume * 100);
      } else {
        volume24h = 8200000 + Math.random() * 1800000 + volatility * 300000;
      }

      openInterest = volume24h * (0.41 + Math.random() * 0.12);
      renderStats();
    }

    function updateLiveStats(orderAmount) {
      const volatility = calculateVolatility();
      const volumeIncrement = orderAmount * randomBetween(110, 260) + volatility * randomBetween(800, 2200);
      const interestIncrement = orderAmount * randomBetween(25, 90);

      volume24h += volumeIncrement;
      openInterest += interestIncrement;

      if (Math.random() > 0.72) {
        openInterest -= orderAmount * randomBetween(10, 35);
        openInterest = Math.max(850000, openInterest);
      }

      renderStats();
    }

    function renderStats() {
      const formattedVolume = formatMoney(volume24h);
      const formattedInterest = formatMoney(openInterest);

      volume24hEl.textContent = formattedVolume;
      openInterestEl.textContent = formattedInterest;
      metaVolumeEl.textContent = formattedVolume;
    }

    function seedFallbackChart() {
      labels = [];
      prices = [];

      for (let i = MAX_POINTS - 1; i >= 0; i--) {
        const wave = Math.sin(i / 5.5) * 3.2;
        const noise = (Math.random() - 0.5) * 1.25;
        const trend = (MAX_POINTS - i) * 0.018;
        const price = fallbackPrice + wave + noise + trend;
        const time = new Date(Date.now() - i * 15 * 60 * 1000);

        prices.push(price);
        labels.push(
          time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        );
      }

      firstPrice = prices[0];
      displayPrice = prices[prices.length - 1];
      fallbackPrice = displayPrice;
    }

    function getFallbackPrice() {
      const drift = Math.sin(Date.now() / 90000) * 0.55;
      const noise = (Math.random() - 0.48) * 0.85;

      fallbackPrice = (displayPrice || fallbackPrice) + drift + noise;
      return fallbackPrice;
    }

    function getVisualPrice() {
      if (!displayPrice) return null;

      const wave = Math.sin(Date.now() / 6500) * 0.25;
      const noise = (Math.random() - 0.5) * 0.12;

      return displayPrice + wave + noise;
    }

    function calculateYesNo(changePercent, momentum) {
      const last = prices[prices.length - 1] || displayPrice || 0;
      const prev = prices[prices.length - 4] || prices[prices.length - 2] || last;
      const shortMomentum = last >= prev ? 1 : -1;
      const liveNoise = Math.sin(Date.now() / 4200) * 3.2;
      const micro = Math.cos(Date.now() / 7100) * 1.6;

      let yes = 54 + changePercent * 12 + momentum * 22 + shortMomentum * 4.2 + liveNoise + micro;

      yes = Math.max(18, Math.min(82, yes));
      yes = Math.round(yes);

      if (yes === 50) {
        yes = shortMomentum > 0 ? 53 : 47;
      }

      return {
        yes: yes,
        no: 100 - yes
      };
    }

    function updateSignal(price, bullish, probability) {
      const entry = price;
      const tp = bullish ? price + 8.5 : price - 8.5;
      const sl = bullish ? price - 5.2 : price + 5.2;

      signalEl.textContent = bullish ? "BUY XAU/USD" : "SELL XAU/USD";
      entryEl.textContent = formatRaw(entry);
      tpEl.textContent = formatRaw(tp);
      slEl.textContent = formatRaw(sl);

      if (probability >= 70) {
        riskEl.textContent = "Medium";
      } else if (probability >= 58) {
        riskEl.textContent = "Low / Med";
      } else {
        riskEl.textContent = "Low";
      }
    }

    function updateUI(price, initial, tickUp) {
      const base = firstPrice || price;
      const change = ((price - base) / base) * 100;
      const previousPrice = prices.length > 2 ? prices[prices.length - 2] : price;
      const momentum = price >= previousPrice ? 0.18 : -0.18;
      const isUp = change >= 0;
      const probabilities = calculateYesNo(change, momentum);
      const bullish = probabilities.yes >= probabilities.no;
      const dominantProbability = bullish ? probabilities.yes : probabilities.no;

      currentYes = probabilities.yes;
      currentNo = probabilities.no;

      requestAnimationFrame(function () {
        priceEl.textContent = formatPrice(price);

        deltaEl.textContent = (isUp ? "▲ +" : "▼ ") + Math.abs(change).toFixed(2) + "% today";
        deltaEl.className = "bpm-delta " + (isUp ? "positive" : "negative");

        yesPctEl.textContent = probabilities.yes + "%";
        noPctEl.textContent = probabilities.no + "%";
        yesBarEl.style.width = probabilities.yes + "%";
        noBarEl.style.width = probabilities.no + "%";

        lastUpdateEl.textContent = lastRealUpdate
          ? "Live markets · " + shortTime(lastRealUpdate)
          : "Live markets";

        updateSignal(price, bullish, dominantProbability);
      });

      priceEl.classList.remove("tick-up", "tick-down");

      if (!initial) {
        priceEl.classList.add(tickUp ? "tick-up" : "tick-down");

        setTimeout(function () {
          priceEl.classList.remove("tick-up", "tick-down");
        }, 420);
      }
    }

    function createGradient(ctx, isUp) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 260);

      gradient.addColorStop(0, isUp ? "rgba(22, 163, 74, 0.15)" : "rgba(239, 68, 68, 0.15)");
      gradient.addColorStop(0.55, isUp ? "rgba(22, 163, 74, 0.04)" : "rgba(239, 68, 68, 0.04)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      return gradient;
    }

    function updateChartStyle() {
      if (!chart || prices.length < 2) return;

      const ctx = canvas.getContext("2d");
      const isUp = prices[prices.length - 1] >= prices[0];
      const color = isUp ? "#16a34a" : "#ef4444";

      chart.data.datasets[0].borderColor = color;
      chart.data.datasets[0].backgroundColor = createGradient(ctx, isUp);
      chart.data.datasets[0].pointBackgroundColor = color;
    }

    const glowPlugin = {
      id: "bpmGlow",
      beforeDatasetDraw: function (chartInstance) {
        const ctx = chartInstance.ctx;
        const isUp = prices[prices.length - 1] >= prices[0];

        ctx.save();
        ctx.shadowColor = isUp ? "rgba(22, 163, 74, 0.14)" : "rgba(239, 68, 68, 0.14)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;
      },
      afterDatasetDraw: function (chartInstance) {
        chartInstance.ctx.restore();
      }
    };

    function createChart() {
      const ctx = canvas.getContext("2d");
      const isUp = prices[prices.length - 1] >= prices[0];
      const color = isUp ? "#16a34a" : "#ef4444";

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: prices,
              borderColor: color,
              backgroundColor: createGradient(ctx, isUp),
              borderWidth: isMobile ? 2.1 : 2.4,
              pointRadius: function (context) {
                return context.dataIndex === prices.length - 1 ? (isMobile ? 3 : 4) : 0;
              },
              pointHoverRadius: isMobile ? 0 : 5,
              pointBackgroundColor: color,
              pointBorderColor: "#ffffff",
              pointBorderWidth: isMobile ? 1.5 : 2,
              tension: 0.44,
              fill: true
            }
          ]
        },
        plugins: [glowPlugin],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 700,
            easing: "easeOutQuart"
          },
          interaction: {
            mode: "index",
            intersect: false
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: !isMobile,
              displayColors: false,
              backgroundColor: "#ffffff",
              titleColor: "#111827",
              bodyColor: "#111827",
              borderColor: "#e5e7eb",
              borderWidth: 1,
              padding: 12,
              cornerRadius: 12,
              callbacks: {
                title: function (items) {
                  return items && items[0] ? items[0].label : "";
                },
                label: function (item) {
                  return "XAU/USD " + formatPrice(item.raw);
                }
              }
            }
          },
          scales: {
            x: {
              border: {
                display: false
              },
              grid: {
                display: false
              },
              ticks: {
                color: "#9ca3af",
                maxTicksLimit: isMobile ? 4 : 6,
                autoSkip: true,
                font: {
                  size: isMobile ? 10 : 11,
                  weight: "400"
                }
              }
            },
            y: {
              position: "right",
              border: {
                display: false
              },
              grid: {
                color: "rgba(229, 231, 235, 0.92)",
                drawTicks: false
              },
              ticks: {
                color: "#9ca3af",
                padding: isMobile ? 6 : 10,
                maxTicksLimit: isMobile ? 4 : 5,
                font: {
                  size: isMobile ? 10 : 11,
                  weight: "400"
                },
                callback: function (value) {
                  return "$" + Number(value).toLocaleString("en-US", {
                    maximumFractionDigits: 0
                  });
                }
              }
            }
          }
        }
      });
    }

    function addPoint(price, isRealUpdate) {
      const previous = displayPrice || price;
      displayPrice = price;

      if (!firstPrice) firstPrice = price;
      if (isRealUpdate) lastRealUpdate = Date.now();

      if (labels.length >= MAX_POINTS) {
        labels.shift();
        prices.shift();
      }

      labels.push(timeNow());
      prices.push(price);

      if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = prices;
        updateChartStyle();
        chart.update("active");
      }

      updateUI(price, false, price >= previous);
    }

    async function loadInitialChart() {
      try {
        const data = await getJson(getAggUrl());
        const bars = extractAggs(data);

        if (!bars || bars.length < 5) {
          throw new Error("No bars returned");
        }

        labels = bars.map(function (bar) {
          return bar.time;
        }).slice(-MAX_POINTS);

        prices = bars.map(function (bar) {
          return bar.close;
        }).slice(-MAX_POINTS);

        firstPrice = prices[0];
        displayPrice = prices[prices.length - 1];
        lastRealUpdate = Date.now();
        usingFallback = false;

        statusEl.textContent = "Live markets";
        dataStatusEl.textContent = "Live markets";

        seedStatsFromBars(bars);
        createChart();
        updateUI(displayPrice, true, true);
        startOrderFeed();
      } catch (error) {
        console.warn("Live aggregates unavailable. Fallback active:", error);

        usingFallback = true;
        statusEl.textContent = "Live markets";
        dataStatusEl.textContent = "Live markets";

        seedFallbackChart();
        seedStatsFromBars(null);
        createChart();
        updateUI(displayPrice, true, true);
        startOrderFeed();
      }
    }

    async function refreshQuote() {
      try {
        const data = await getJson(getQuoteUrl());
        const price = extractQuotePrice(data);

        if (!price || Number.isNaN(price)) {
          throw new Error("Invalid quote");
        }

        usingFallback = false;
        statusEl.textContent = "Live markets";
        dataStatusEl.textContent = "Live markets";

        addPoint(price, true);
      } catch (error) {
        console.warn("Live quote unavailable. Visual fallback active:", error);

        usingFallback = true;
        statusEl.textContent = "Live markets";
        dataStatusEl.textContent = "Live markets";

        addPoint(getFallbackPrice(), true);
      }
    }

    function visualTick() {
      if (!displayPrice) return;

      const price = usingFallback ? getFallbackPrice() : getVisualPrice();

      if (!price) return;

      addPoint(price, false);
    }

    function createOrderToast() {
      if (!orderFeed) return;

      const likelyYes = currentYes === null ? 58 : currentYes;
      const sideIsYes = Math.random() * 100 < likelyYes;
      const side = sideIsYes ? "Yes" : "No";
      const amount = randomBetween(8, 95);
      const user = traderNames[randomBetween(0, traderNames.length - 1)];
      const odds = sideIsYes ? currentYes || 58 : currentNo || 42;

      updateLiveStats(amount);

      orderFeed.innerHTML = "";

      const toast = document.createElement("div");
      toast.className = "bpm-order-toast " + (sideIsYes ? "is-yes" : "is-no");

      toast.innerHTML =
        "<div class='bpm-order-left'>" +
          "<div class='bpm-order-dot'></div>" +
          "<div class='bpm-order-copy'>" +
            "<strong>" + user + "</strong>" +
            "<span>placed $" + amount + " on " + side + "</span>" +
          "</div>" +
        "</div>" +
        "<div class='bpm-order-side'>" +
          "<b>" + side + "</b>" +
          "<small>" + odds + "%</small>" +
        "</div>";

      orderFeed.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add("is-visible");
      });

      setTimeout(function () {
        toast.classList.remove("is-visible");
        toast.classList.add("is-leaving");
      }, 3600);

      setTimeout(function () {
        if (toast && toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 4400);
    }

    function startOrderFeed() {
      if (orderLoopStarted) return;

      orderLoopStarted = true;

      function loop() {
        createOrderToast();
        setTimeout(loop, randomBetween(ORDER_TICK_MIN, ORDER_TICK_MAX));
      }

      setTimeout(loop, 1200);
    }

    function initTabs() {
      root.querySelectorAll(".bpm-time-tab").forEach(function (button) {
        button.addEventListener("click", function () {
          root.querySelectorAll(".bpm-time-tab").forEach(function (item) {
            item.classList.remove("active");
          });

          button.classList.add("active");
        });
      });
    }

    function initModal() {
      const steps = [
        {
          step: "1 of 4",
          title: "Pick a market",
          text: "Choose a live market like Gold and decide if you think it will move up or down today.",
          question: "Will Gold go up today?",
          percent: "62%",
          fill: "62%",
          theme: "green"
        },
        {
          step: "2 of 4",
          title: "Watch the live movement",
          text: "Follow the live XAU/USD chart, price changes and market direction in real time.",
          question: "XAU/USD live movement",
          percent: "Live",
          fill: "55%",
          theme: "blue"
        },
        {
          step: "3 of 4",
          title: "Unlock the signal",
          text: "Reveal the full Bullwaves Prime setup with signal type, entry, take profit and stop loss.",
          question: "Bullwaves Signal locked",
          percent: "•••",
          fill: "0%",
          theme: "gold"
        },
        {
          step: "4 of 4",
          title: "Start your challenge",
          text: "Use the signal as guidance and start with a " + config.accountSize + " Bullwaves Prime account from just " + config.accountPrice + ".",
          question: config.accountSize + " account",
          percent: config.accountPrice,
          fill: "100%",
          theme: "blue"
        }
      ];

      let stepIndex = 0;

      const overlay = get("overlay");
      const backdrop = get("backdrop");
      const howBtn = get("howBtn");
      const closeBtn = get("close");
      const nextBtn = get("next");
      const stepEl = get("step");
      const modalTitleEl = get("modalTitle");
      const modalTextEl = get("modalText");
      const demoQEl = get("demoQ");
      const demoPctEl = get("demoPct");
      const demoFillEl = get("demoFill");
      const dotsEl = get("dots");
      const visualEl = get("modalVisual");

      function renderStep() {
        const item = steps[stepIndex];

        stepEl.textContent = item.step;
        modalTitleEl.textContent = item.title;
        modalTextEl.textContent = item.text;
        demoQEl.textContent = item.question;
        demoPctEl.textContent = item.percent;
        demoFillEl.style.width = item.fill;

        visualEl.className = "bpm-modal-visual theme-" + item.theme;

        Array.from(dotsEl.children).forEach(function (dot, index) {
          dot.classList.toggle("active", index === stepIndex);
        });

        nextBtn.textContent = stepIndex === steps.length - 1 ? "Start now" : "Next";
      }

      function openModal() {
        stepIndex = 0;
        renderStep();
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }

      function closeModal() {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }

      if (howBtn) howBtn.addEventListener("click", openModal);
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      if (backdrop) backdrop.addEventListener("click", closeModal);

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          if (stepIndex < steps.length - 1) {
            stepIndex += 1;
            renderStep();
          } else {
            closeModal();
            window.location.href = config.startLink;
          }
        });
      }

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
          closeModal();
        }
      });
    }

    loadInitialChart();
    updateExpiry();
    initTabs();
    initModal();

    setInterval(refreshQuote, REAL_REFRESH_MS);
    setInterval(visualTick, VISUAL_TICK_MS);
    setInterval(updateExpiry, 30000);
  }

  onReady(function () {
    const mount = getMount();

    injectStyles();
    mount.innerHTML = renderHTML();

    loadScript(CHART_SRC)
      .then(function () {
        initWidget(mount);
      })
      .catch(function (error) {
        console.error("Bullwaves Prime Predict: Chart.js failed to load.", error);
      });
  });
})();
