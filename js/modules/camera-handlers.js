// camera-handlers.js
import { logEvent } from './utils.js';
import { applySCPGlitch } from './glitch-effects.js';

export const setupCameraHandlers = (cameraFeeds) => {
    if (!cameraFeeds || cameraFeeds.length === 0) return;
    
    cameraFeeds.forEach((feed) => {
        feed.addEventListener("click", () => {
            handleCameraClick(feed);
        });
    });
};

const handleCameraClick = (feed) => {
    if (window.isLightweightMode) {
        handleLightweightCameraClick(feed);
    } else {
        handleFullModeCameraClick(feed);
    }
};

const handleLightweightCameraClick = (feed) => {
    if (feed.classList.contains("fullscreen")) {
        feed.classList.remove("fullscreen");
        document.body.style.overflow = "auto";
    } else {
        document.querySelectorAll(".camera-feed.fullscreen").forEach((f) => {
            f.classList.remove("fullscreen");
        });
        feed.classList.add("fullscreen");
        document.body.style.overflow = "hidden";
        
        const cameraIdElement = feed.querySelector(".camera-id");
        const cameraId = cameraIdElement ? cameraIdElement.textContent : 'UNKNOWN';
        logEvent(`РЕЖИМ НАБЛЮДЕНИЯ: ${cameraId} (ОБЛЕГЧЕННЫЙ)`);
    }
};

const handleFullModeCameraClick = (feed) => {
    if (feed.classList.contains("fullscreen")) {
        feed.classList.remove("fullscreen");
        document.body.style.overflow = "auto";
    } else {
        document.querySelectorAll(".camera-feed.fullscreen").forEach((f) => {
            f.classList.remove("fullscreen");
        });
        feed.classList.add("fullscreen");
        document.body.style.overflow = "hidden";
        
        const cameraIdElement = feed.querySelector(".camera-id");
        const cameraId = cameraIdElement ? cameraIdElement.textContent : 'UNKNOWN';
        logEvent(`РЕЖИМ НАБЛЮДЕНИЯ: ${cameraId}`);
    }
};

export const handleSystemTest = (cameraFeeds) => {
    if (window.isLightweightMode) {
        logEvent("ТЕСТ СИСТЕМЫ (ОБЛЕГЧЕННЫЙ РЕЖИМ)...");
        
        document.body.style.opacity = '0.9';
        setTimeout(() => {
            document.body.style.opacity = '1';
            logEvent("ТЕСТ СИСТЕМЫ ЗАВерШЕН");
            logEvent("ОСНОВНЫЕ СИСТЕМЫ ФУНКЦИОНИРУЮТ НОРМАЛЬНО");
        }, 600);
        return;
    }

    logEvent("ЗАПУСК ТЕСТА СИСТЕМЫ...");

    if (cameraFeeds) {
        cameraFeeds.forEach((feed) => {
            const glitchOverlay = feed.querySelector(".glitch-overlay");
            const colorDistortion = feed.querySelector(".color-distortion");
            const video = feed.querySelector(".camera-video");
            const noiseOverlay = feed.querySelector(".noise-overlay");

            if (video) video.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
            if (noiseOverlay) noiseOverlay.style.opacity = 0.1;

            setTimeout(() => {
                if (video) video.style.transform = "none";
                if (noiseOverlay) noiseOverlay.style.opacity = 0.03;

                if (Math.random() < 0.5 && glitchOverlay && colorDistortion && video) {
                    setTimeout(() => {
                        applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                    }, Math.random() * 1000 + 500);
                }
            }, 600);
        });
    }

    setTimeout(() => {
        logEvent("ТЕСТ СИСТЕМЫ ЗАВЕРШЕН");
        logEvent("ВСЕ СИСТЕМЫ ФУНКЦИОНИРУЮТ НОРМАЛЬНО");
    }, 1200);
};