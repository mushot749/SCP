// init.js
import { getDOMElements } from './constants.js';
import { updateTime, logEvent, randomizeScanLines } from './utils.js';
import { initializeVideos } from './video-manager.js';
import { setupGlitchEffects } from './glitch-effects.js';
import { setupNavigationAccess } from './navigation.js';
import { setupEventHandlers } from './event-handlers.js';
import { setColorMode } from './video-manager.js';
import { prefersReducedMotion } from './constants.js';
import { incrementUptime, getUptime } from './state.js';
import { ZalgoText } from './zalgo-effect.js';
import { AnomalyInfection } from './anomaly-core.js';
import { EmergencyMode } from './emergency-mode.js';
import { EmergencyPerformanceMode } from './emergency-performance-mode.js'; // Заменяем импорт

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
            uptimeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

    // Initialize glitch effects (только если не активен аварийный режим)
    const { cameraFeeds } = getDOMElements();
    if (!prefersReducedMotion) {
        setupGlitchEffects(cameraFeeds);
    }

    // Log initialization
    logEvent("СИСТЕМА МОНИТОРИНГА SCP ИНИЦИАЛИЗИРОВАНА");
    logEvent("ЗАГРУЗКА МОДУЛЕЙ НАБЛЮДЕНИЯ...");

    // Инициализируем объединенный менеджер режимов
    window.emergencyPerformanceMode = new EmergencyPerformanceMode();

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
                    
                    // Инициализация аномалии только если не активен аварийный режим
                    setTimeout(() => {
                        try {
                            if (!window.emergencyPerformanceMode.isAnyModeActive()) {
                                // Создаем экземпляры классов аномалии
                                window.zalgoEffect = new ZalgoText();
                                window.anomaly = new AnomalyInfection();
                                window.emergencyMode = new EmergencyMode();
                                
                                logEvent("МОДУЛЬ МОНИТОРИНГА АНОМАЛИЙ АКТИВИРОВАН");
                                logEvent("СИСТЕМА АВАРИЙНОГО РЕАГИРОВАНИЯ ГОТОВА");
                                
                                // Скрытое сообщение для ARG
                                setTimeout(() => {
                                    logEvent("ПРЕДУПРЕЖДЕНИЕ: ОБНАРУЖЕНА АНОМАЛЬНАЯ АКТИВНОСТЬ В СИСТЕМНОМ ЖУРНАЛЕ");
                                    
                                    // Запускаем медленное заражение через 30 секунд
                                    setTimeout(() => {
                                        if (window.zalgoEffect && !window.emergencyPerformanceMode.isAnyModeActive()) {
                                            window.zalgoEffect.startSlowInfection();
                                            logEvent("АНАЛИЗ: ОБНАРУЖЕНА СЛАБАЯ АНОМАЛЬНАЯ АКТИВНОСТЬ В ТЕКСТОВЫХ СЕГМЕНТАХ");
                                        }
                                    }, 30000);
                                }, 10000);
                            }
                        } catch (error) {
                            console.error("Ошибка инициализации аномалии:", error);
                            logEvent("ОШИБКА: МОДУЛЬ АНОМАЛИЙ НЕ ЗАГРУЖЕН");
                        }
                    }, 5000);
                    
                }, 2000);
            }, 1500);
        }, 1000);
    }, 800);

    // Обработка уровней доступа в навигации
    setupNavigationAccess();

    // Настройка обработчиков событий
    setupEventHandlers();
    
    // Добавляем скрытые ARG элементы сразу после загрузки
    addHiddenARGElements();
};

// Функция для добавления скрытых ARG элементов
function addHiddenARGElements() {
    // Скрытый div с кодом для исследователей
    const hiddenCode = document.createElement('div');
    hiddenCode.className = 'hidden-arg-code';
    hiddenCode.innerHTML = `
        <!-- 
            SCP FOUNDATION INTERNAL MEMO
            SECURITY LEVEL 4 CLEARANCE REQUIRED
            ANOMALY DETECTION SYSTEM: ACTIVE
            REALITY LEVEL: 0.7 (UNSTABLE)
            COUNTERMEASURES: [DATA EXPUNGED]
        -->
    `;
    document.body.appendChild(hiddenCode);
    
    // Добавляем скрытые данные в мета-теги
    const metaAnomaly = document.createElement('meta');
    metaAnomaly.name = 'anomaly-level';
    metaAnomaly.content = '0.1';
    document.head.appendChild(metaAnomaly);
    
    // Добавляем скрытые атрибуты для ARG
    document.body.setAttribute('data-reality-level', 'stable');
    document.body.setAttribute('data-anomaly-present', 'true');
}

// Экспортируем функции для глобального доступа
export { addHiddenARGElements };