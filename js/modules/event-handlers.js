// event-handlers.js
import { getDOMElements } from './constants.js';
import { setupAnomalyTriggers } from './anomaly-triggers.js';
import { setupCameraHandlers } from './camera-handlers.js';
import { setupSystemHandlers } from './system-handlers.js';
import { toggleSafeMode } from './init.js';

export const setupEventHandlers = () => {
    const { 
        cameraFeeds, 
        toggleGridBtn, 
        resetSystemBtn, 
        triggerGlitchBtn, 
        toggleFilterBtn, 
        toggleSafeModeBtn,
        videoElements 
    } = getDOMElements();

    // Обработчик для кнопки переключения режима
    if (toggleSafeModeBtn) {
        toggleSafeModeBtn.addEventListener('click', toggleSafeMode);
    }

    // Обработчики для камер
    setupCameraHandlers(cameraFeeds);

    // Обработчики системных кнопок
    setupSystemHandlers(toggleGridBtn, toggleFilterBtn, resetSystemBtn, triggerGlitchBtn, videoElements, cameraFeeds);

    // Обработчик клавиши Escape для выхода из полноэкранного режима
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const fullscreenCamera = document.querySelector(".camera-feed.fullscreen");
            if (fullscreenCamera) {
                fullscreenCamera.classList.remove("fullscreen");
                document.body.style.overflow = "auto";
            }
        }
    });
    
    // Триггеры аномалий (только в полном режиме)
    if (!window.isLightweightMode) {
        setupAnomalyTriggers();
    }
};