// system-handlers.js
import { gridState, setGridState, isColorMode, setIsColorMode } from './state.js';
import { logEvent, randomizeScanLines } from './utils.js';
import { setColorMode, restartVideos } from './video-manager.js';
import { applySCPGlitch } from './glitch-effects.js';
import { prefersReducedMotion } from './constants.js';
import { handleSystemTest } from './camera-handlers.js';

export const setupSystemHandlers = (toggleGridBtn, toggleFilterBtn, resetSystemBtn, triggerGlitchBtn, videoElements, cameraFeeds) => {
    if (toggleGridBtn) {
        toggleGridBtn.addEventListener("click", () => handleGridToggle(toggleGridBtn));
    }
    
    if (toggleFilterBtn) {
        toggleFilterBtn.addEventListener("click", () => handleFilterToggle(toggleFilterBtn, videoElements));
    }
    
    if (resetSystemBtn) {
        resetSystemBtn.addEventListener("click", () => handleSystemReset(resetSystemBtn, videoElements, cameraFeeds));
    }
    
    if (triggerGlitchBtn) {
        triggerGlitchBtn.addEventListener("click", () => handleSystemTest(cameraFeeds));
    }
};

const handleGridToggle = (toggleGridBtn) => {
    if (window.isLightweightMode) {
        logEvent("ОШИБКА: РЕЖИМ ПРОСМОТРА НЕДОСТУПЕН В ОБЛЕГЧЕННОМ РЕЖИМЕ");
        return;
    }

    const cameraGrid = document.querySelector(".camera-grid");
    if (!cameraGrid) return;
    
    switch (gridState) {
        case "three-per-row":
            cameraGrid.classList.remove("three-per-row");
            cameraGrid.classList.add("two-per-row");
            setGridState("two-per-row");
            if (toggleGridBtn) toggleGridBtn.textContent = "2x СЕТКА";
            logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 2x3");
            break;
        case "two-per-row":
            cameraGrid.classList.remove("two-per-row");
            cameraGrid.classList.add("single-column");
            setGridState("single-column");
            if (toggleGridBtn) toggleGridBtn.textContent = "1x СЕТКА";
            logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ ОДИН СТОЛБЕЦ");
            break;
        case "single-column":
            cameraGrid.classList.remove("single-column");
            cameraGrid.classList.add("three-per-row");
            setGridState("three-per-row");
            if (toggleGridBtn) toggleGridBtn.textContent = "3x СЕТКА";
            logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 3x2");
            break;
    }
};

const handleFilterToggle = (toggleFilterBtn, videoElements) => {
    const newColorMode = !isColorMode;
    setIsColorMode(newColorMode);

    setColorMode(videoElements, newColorMode);
    
    if (toggleFilterBtn) {
        toggleFilterBtn.textContent = newColorMode ? "ЧЕРНО-БЕЛЫЙ" : "ЦВЕТНОЙ";
    }
    logEvent(`ПЕРЕКЛЮЧЕНИЕ В ${newColorMode ? "ЦВЕТНОЙ" : "ЧЕРНО-БЕЛЫЙ"} РЕЖИМ`);
};

const handleSystemReset = (resetSystemBtn, videoElements, cameraFeeds) => {
    const statusAlert = document.querySelector(".status-alert");
    if (statusAlert) {
        statusAlert.textContent = "ПЕРЕЗАГРУЗКА";
    }
    logEvent("ИНИЦИИРОВАНА ПЕРЕЗАГРУЗКА СИСТЕМЫ");

    const cameraContents = document.querySelectorAll(".camera-content");
    cameraContents.forEach((content) => {
        content.style.opacity = 0.3;
    });

    setTimeout(() => {
        logEvent("ОЧИСТКА БУФЕРА ПАМЯТИ...");
        setTimeout(() => {
            logEvent("ПЕРЕЗАПУСК МОДУЛЕЙ НАБЛЮДЕНИЯ...");
            setTimeout(() => {
                cameraContents.forEach((content) => {
                    content.style.opacity = 1;
                });

                restartVideos(videoElements);
                randomizeScanLines();

                if (statusAlert) statusAlert.textContent = "АКТИВНА";
                logEvent("СИСТЕМА УСПЕШНО ПЕРЕЗАГРУЖЕНА");

                setTimeout(() => {
                    if (!prefersReducedMotion && !window.isLightweightMode && cameraFeeds) {
                        cameraFeeds.forEach((feed) => {
                            const glitchOverlay = feed.querySelector(".glitch-overlay");
                            const colorDistortion = feed.querySelector(".color-distortion");
                            const video = feed.querySelector(".camera-video");

                            if (glitchOverlay && colorDistortion && video) {
                                setTimeout(() => {
                                    applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                                }, Math.random() * 2000);
                            }
                        });
                    }
                }, 1000);
            }, 1500);
        }, 1000);
    }, 1000);
};