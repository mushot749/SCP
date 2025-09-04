// constants.js
export const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// SCP-themed video sources
export const videoSources = [
    "https://mattcannon.games/codepen/glitches/cam1.mp4",
    "https://mattcannon.games/codepen/glitches/cam2.mp4",
    "https://mattcannon.games/codepen/glitches/cam3.mp4",
    "https://mattcannon.games/codepen/glitches/cam4.mp4",
    "https://mattcannon.games/codepen/glitches/cam5.mp4",
    "https://mattcannon.games/codepen/glitches/cam6.mp4"
];

export const fallbackVideo = "https://assets.codepen.io/000000/scp-static.mp4";

// SCP-related log messages
export const scpLogMessages = [
    "Обнаружена аномальная активность",
    "Нарушение протокола содержания",
    "Активированы протоколы безопасности",
    "Сканирование аномалий...",
    "Проверка целостности содержания",
    "Мониторинг активности объекта",
    "Обновление протоколов наблюдения",
    "Проверка систем сдерживания"
];

export const scpWarningMessages = [
    "ПРЕДУПРЕЖДЕНИЕ: Нарушение содержания",
    "ОПАСНОСТЬ: Аномальная активность",
    "ТРЕВОГА: Объект проявляет активность",
    "УГРОЗА: Нарушение протокола",
    "КРИТИЧЕСКИЙ УРОВЕНЬ: Активность объекта",
    "АВАРИЯ: Системы сдерживания под угрозой"
];

// DOM elements
export const getDOMElements = () => ({
    timeDisplay: document.getElementById("time-display"),
    uptimeDisplay: document.getElementById("uptime-display"),
    securityDisplay: document.getElementById("security-display"),
    logContent: document.getElementById("log-content"),
    toggleGridBtn: document.getElementById("toggle-grid"),
    resetSystemBtn: document.getElementById("reset-system"),
    triggerGlitchBtn: document.getElementById("trigger-glitch"),
    toggleFilterBtn: document.getElementById("toggle-filter"),
    toggleSafeModeBtn: document.getElementById("toggle-safe-mode"),
    cameraFeeds: document.querySelectorAll(".camera-feed"),
    cameraGrid: document.querySelector(".camera-grid"),
    videoElements: document.querySelectorAll(".camera-video"),
    scanLines: document.querySelectorAll(".scan-line"),
    cameraPlaceholder: document.querySelector(".camera-placeholder"),
    navLinks: document.querySelectorAll("nav a[data-access]")
});