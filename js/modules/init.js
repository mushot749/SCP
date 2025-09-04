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
import { EmergencyPerformanceMode } from './emergency-performance-mode.js';
import { setupAnomalyTriggers } from './anomaly-triggers.js';

// Глобальная переменная для отслеживания режима
window.isLightweightMode = true;

// Инициализация системы
export const initializeSystem = () => {
    const { 
        timeDisplay, 
        uptimeDisplay, 
        toggleSafeModeBtn
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

    // Инициализируем объединенный менеджер режимов
    window.emergencyPerformanceMode = new EmergencyPerformanceMode();

    // Log initialization
    logEvent("СИСТЕМА МОНИТОРИНГА SCP ИНИЦИАЛИЗИРОВАНА");
    logEvent("РЕЖИМ: ОБЛЕГЧЕННЫЙ (БЕЗОПАСНЫЙ)");
    logEvent("ВИДЕОНАБЛЮДЕНИЕ: ОТКЛЮЧЕНО");
    logEvent("АНОМАЛЬНЫЕ ЭФФЕКТЫ: ЗАБЛОКИРОВАНЫ");

    // Обработка уровней доступа в навигации
    setupNavigationAccess();

    // Настройка обработчиков событий
    setupEventHandlers();
    
    // Добавляем скрытые ARG элементы
    addHiddenARGElements();

    // Настройка обработчика для кнопки переключения режима
    if (toggleSafeModeBtn) {
        toggleSafeModeBtn.addEventListener('click', toggleSafeMode);
    }
};

// Функция переключения безопасного режима
export const toggleSafeMode = () => {
    const { 
        cameraGrid, 
        toggleSafeModeBtn,
        videoElements,
        cameraFeeds,
        cameraPlaceholder
    } = getDOMElements();

    window.isLightweightMode = !window.isLightweightMode;

    if (!window.isLightweightMode) {
        // Включаем полный режим
        document.body.classList.remove('lightweight-mode');
        
        // Показываем камеры, скрываем плейсхолдер
        if (cameraGrid) cameraGrid.style.display = 'grid';
        if (cameraPlaceholder) cameraPlaceholder.style.display = 'none';
        
        // Меняем текст кнопки
        if (toggleSafeModeBtn) {
            toggleSafeModeBtn.textContent = "🔒 ВКЛЮЧИТЬ БЕЗОПАСНЫЙ РЕЖИМ";
            toggleSafeModeBtn.classList.add('active');
        }

        // Инициализируем видео
        initializeVideos(videoElements);
        setColorMode(videoElements, true);

        // Включаем эффекты
        randomizeScanLines();
        
        if (!prefersReducedMotion && cameraFeeds) {
            setupGlitchEffects(cameraFeeds);
        }

        // Активируем кнопки управления
        document.querySelectorAll('.control-btn').forEach(btn => {
            if (!btn.id.includes('toggle-safe-mode')) {
                btn.disabled = false;
            }
        });

        // Логируем активацию
        logEvent("БЕЗОПАСНЫЙ РЕЖИМ ОТКЛЮЧЕН");
        logEvent("ВИДЕОНАБЛЮДЕНИЕ: АКТИВИРОВАНО");
        logEvent("АНОМАЛЬНЫЕ ЭФФЕКТЫ: РАЗБЛОКИРОВАНЫ");
        logEvent("ПРЕДУПРЕЖДЕНИЕ: СИСТЕМА УЯЗВИМА К ВОЗДЕЙСТВИЮ АНОМАЛИЙ");

        // Запускаем медленное заражение через 5 секунд
        setTimeout(() => {
            if (!window.emergencyPerformanceMode.isAnyModeActive()) {
                loadAnomalyModules();
            }
        }, 5000);

    } else {
        // Включаем безопасный режим
        document.body.classList.add('lightweight-mode');
        
        // Скрываем камеры, показываем плейсхолдер
        if (cameraGrid) cameraGrid.style.display = 'none';
        if (cameraPlaceholder) cameraPlaceholder.style.display = 'block';
        
        // Меняем текст кнопки
        if (toggleSafeModeBtn) {
            toggleSafeModeBtn.textContent = "🔓 ВЫКЛЮЧИТЬ БЕЗОПАСНЫЙ РЕЖИМ";
            toggleSafeModeBtn.classList.remove('active');
        }

        // Деактивируем кнопки управления
        document.querySelectorAll('.control-btn').forEach(btn => {
            if (!btn.id.includes('toggle-safe-mode') && !btn.id.includes('reset-system')) {
                btn.disabled = true;
            }
        });

        // Останавливаем все аномалии
        stopAllAnomalies();

        // Логируем деактивацию
        logEvent("БЕЗОПАСНЫЙ РЕЖИМ АКТИВИРОВАН");
        logEvent("ВИДЕОНАБЛЮДЕНИЕ: ОТКЛЮЧЕНО");
        logEvent("АНОМАЛЬНЫЕ ЭФФЕКТЫ: ЗАБЛОКИРОВАНЫ");
        logEvent("СИСТЕМА ЗАЩИЩЕНА ОТ ВОЗДЕЙСТВИЯ АНОМАЛИЙ");
    }
};

// Функция для загрузки модулей аномалий
async function loadAnomalyModules() {
    try {
        const [{ ZalgoText }, { AnomalyInfection }, { EmergencyMode }] = await Promise.all([
            import('./zalgo-effect.js'),
            import('./anomaly-core.js'),
            import('./emergency-mode.js')
        ]);
        
        window.zalgoEffect = new ZalgoText();
        window.anomaly = new AnomalyInfection();
        window.emergencyMode = new EmergencyMode();
        
        logEvent("МОДУЛЬ МОНИТОРИНГА АНОМАЛИЙ АКТИВИРОВАН");
        logEvent("СИСТЕМА АВАРИЙНОГО РЕАГИРОВАНИЯ ГОТОВА");
        
        setTimeout(() => {
            if (window.zalgoEffect && typeof window.zalgoEffect.startSlowInfection === 'function') {
                window.zalgoEffect.startSlowInfection();
                logEvent("АНАЛИЗ: ОБНАРУЖЕНА СЛАБАЯ АНОМАЛЬНАЯ АКТИВНОСТЬ");
                
                // Добавляем триггеры аномалий после успешной инициализации
                setupAnomalyTriggers();
            }
        }, 10000);
    } catch (error) {
        console.error("Ошибка инициализации аномалии:", error);
        logEvent("ОШИБКА: МОДУЛЬ АНОМАЛИЙ НЕ ЗАГРУЖЕН");
    }
}

// Функция для остановки всех аномалий
function stopAllAnomalies() {
    if (window.zalgoEffect && typeof window.zalgoEffect.stopPropagation === 'function') {
        window.zalgoEffect.stopPropagation();
    }
    if (window.anomaly && typeof window.anomaly.stop === 'function') {
        window.anomaly.stop();
    }
}

// Функция для добавления скрытых ARG элементов
function addHiddenARGElements() {
    // Скрытый div с кодом для исследователей
    const hiddenCode = document.createElement('div');
    hiddenCode.className = 'hidden-arg-code';
    hiddenCode.innerHTML = `<!-- SCP FOUNDATION INTERNAL MEMO -->`;
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
export { addHiddenARGElements, toggleSafeMode };