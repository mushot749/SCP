import { getDOMElements } from './constants.js';
import { updateTime, logEvent, randomizeScanLines } from './utils.js';
import { initializeVideos } from './video-manager.js';
import { setupGlitchEffects } from './glitch-effects.js';
import { setupNavigationAccess } from './navigation.js';
import { setupEventHandlers } from './event-handlers.js';
import { setColorMode } from './video-manager.js';
import { prefersReducedMotion } from './constants.js';
import { incrementUptime, getUptime } from './state.js';

// Инициализация системы
export const initializeSystem = () => {
    const { 
        timeDisplay, 
        uptimeDisplay, 
        videoElements, 
        toggleFilterBtn 
    } = getDOMElements();

    // Set current time
    updateTime();
    setInterval(updateTime, 1000);
    
    // Update uptime
    setInterval(() => {
        incrementUptime();
        if (uptimeDisplay) {
            const { hours, minutes, seconds } = getUptime();
            uptimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }, 1000);

    // Randomize scan line speeds
    randomizeScanLines();

    // Load videos with SCP-themed content
    initializeVideos(videoElements);

    // Set videos to color mode by default
    setColorMode(videoElements, true);

    // Set button text to match initial state
    if (toggleFilterBtn) {
        toggleFilterBtn.textContent = "ЧЕРНО-БЕЛЫЙ";
    }

    // Initialize glitch effects
    const { cameraFeeds } = getDOMElements();
    if (!prefersReducedMotion) {
        setupGlitchEffects(cameraFeeds);
    }

    // Log initialization
    logEvent("СИСТЕМА МОНИТОРИНГА SCP ИНИЦИАЛИЗИРОВАНА");
    logEvent("ЗАГРУЗКА МОДУЛЕЙ НАБЛЮДЕНИЯ...");

    // Simulate SCP system initialization
    setTimeout(() => {
        logEvent("ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ ФОНДА");
        setTimeout(() => {
            logEvent("ПРОВЕРКА СИСТЕМ СОДЕРЖАНИЯ...");
            setTimeout(() => {
                logEvent("МОНИТОРИНГ АКТИВНЫХ ОБЪЕКТОВ");
                setTimeout(() => {
                    logEvent("СИСТЕМА ГОТОВА К РАБОТЕ");
                    logEvent("СТАТУС: ВСЕ ОБЪЕКТЫ ПОД КОНТРОЛЕМ");
                }, 2000);
            }, 1500);
        }, 1000);
    }, 800);

    // Обработка уровней доступа в навигации
    setupNavigationAccess();

    // Настройка обработчиков событий
    setupEventHandlers();
};