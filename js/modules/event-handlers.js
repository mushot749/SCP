import { getDOMElements } from './constants.js';
import { gridState, setGridState, isColorMode, setIsColorMode } from './state.js';
import { logEvent, randomizeScanLines } from './utils.js';
import { setColorMode, restartVideos } from './video-manager.js';
import { setupGlitchEffects, applySCPGlitch } from './glitch-effects.js';
import { prefersReducedMotion } from './constants.js';

// Новые функции для аномалий
const setupAnomalyTriggers = () => {
    // Триггер по таймеру
    let anomalyTimer = setTimeout(triggerAnomalyEvent, 30000); // 30 секунд
    
    // Триггер по движению мыши в определенных зонах
    document.addEventListener('mousemove', (e) => {
        // Провоцировать аномалию при движении в углах экрана
        const inCorner = e.clientX < 50 || e.clientX > window.innerWidth - 50 ||
                         e.clientY < 50 || e.clientY > window.innerHeight - 50;
        
        if (inCorner && Math.random() > 0.95) {
            triggerAnomalyEvent();
        }
    });
    
    // Триггер по клику на определенные элементы
    const triggerElements = document.querySelectorAll('[data-anomaly-trigger]');
    triggerElements.forEach(el => {
        el.addEventListener('click', () => {
            triggerAnomalyEvent();
            clearTimeout(anomalyTimer);
            anomalyTimer = setTimeout(triggerAnomalyEvent, 60000); // Перезапуск таймера
        });
    });
    
    // Триггер по вводу секретных комбинаций
    let keySequence = [];
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        if (keySequence.length > 10) keySequence.shift();
        
        // Секретные комбинации
        const sequences = [
            'scp', 'keter', 'contain', 'breach', 'xray',
            '7355608', // код из SCP
            '055', '173', '049', '096', '106', '682' // номера SCP
        ];
        
        const currentSequence = keySequence.join('');
        if (sequences.some(seq => currentSequence.includes(seq))) {
            triggerAnomalyEvent();
            keySequence = []; // Сброс последовательности
        }
    });
};

export const triggerAnomalyEvent = (intensity = 0.3) => {
    if (!window.anomaly) return;
    
    // Увеличиваем уровень заражения
    window.anomaly.infectionLevel += intensity;
    
    // Логируем событие
    logEvent(`АНОМАЛЬНАЯ АКТИВНОСТЬ: УРОВЕНЬ ${(intensity * 100).toFixed(0)}%`);
    
    // Визуальные эффекты
    createAnomalyFlash(intensity);
};

const createAnomalyFlash = (intensity) => {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 0, 0, ${intensity * 0.2});
        z-index: 9999;
        pointer-events: none;
        opacity: 1;
        transition: opacity 1s ease-out;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 1000);
    }, 100);
};

// Обработчики событий
export const setupEventHandlers = () => {
    const { 
        cameraFeeds, 
        toggleGridBtn, 
        resetSystemBtn, 
        triggerGlitchBtn, 
        toggleFilterBtn, 
        videoElements 
    } = getDOMElements();

    // Toggle fullscreen for SCP camera when clicked
    cameraFeeds.forEach((feed) => {
        feed.addEventListener("click", () => {
            if (feed.classList.contains("fullscreen")) {
                feed.classList.remove("fullscreen");
                document.body.style.overflow = "auto";
            } else {
                document.querySelectorAll(".camera-feed.fullscreen").forEach((f) => {
                    f.classList.remove("fullscreen");
                });

                feed.classList.add("fullscreen");
                document.body.style.overflow = "hidden";

                const cameraId = feed.querySelector(".camera-id").textContent;
                logEvent(`РЕЖИМ НАБЛЮДЕНИЯ: ${cameraId}`);
            }
        });
    });

    // Toggle grid layout
    toggleGridBtn.addEventListener("click", () => {
        const { cameraGrid } = getDOMElements();
        
        switch (gridState) {
            case "three-per-row":
                cameraGrid.classList.remove("three-per-row");
                cameraGrid.classList.add("two-per-row");
                setGridState("two-per-row");
                toggleGridBtn.textContent = "2x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 2x3");
                break;
            case "two-per-row":
                cameraGrid.classList.remove("two-per-row");
                cameraGrid.classList.add("single-column");
                setGridState("single-column");
                toggleGridBtn.textContent = "1x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ ОДИН СТОЛБЕЦ");
                break;
            case "single-column":
                cameraGrid.classList.remove("single-column");
                cameraGrid.classList.add("three-per-row");
                setGridState("three-per-row");
                toggleGridBtn.textContent = "3x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 3x2");
                break;
        }
    });

    // Toggle color/BW filter
    toggleFilterBtn.addEventListener("click", () => {
        const newColorMode = !isColorMode;
        setIsColorMode(newColorMode);

        setColorMode(videoElements, newColorMode);
        
        toggleFilterBtn.textContent = newColorMode ? "ЧЕРНО-БЕЛЫЙ" : "ЦВЕТНОЙ";
        logEvent(`ПЕРЕКЛЮЧЕНИЕ В ${newColorMode ? "ЦВЕТНОЙ" : "ЧЕРНО-БЕЛЫЙ"} РЕЖИМ`);
    });

    // Reset system button
    resetSystemBtn.addEventListener("click", () => {
        document.querySelector(".status-alert").textContent = "ПЕРЕЗАГРУЗКА";
        logEvent("ИНИЦИИРОВАНА ПЕРЕЗАГРУЗКА СИСТЕМЫ");

        // Apply visual reboot effect
        document.querySelectorAll(".camera-content").forEach((content) => {
            content.style.opacity = 0.3;
        });

        // Simulate SCP system reboot
        setTimeout(() => {
            logEvent("ОЧИСТКА БУФЕРА ПАМЯТИ...");
            setTimeout(() => {
                logEvent("ПЕРЕЗАПУСК МОДУЛЕЙ НАБЛЮДЕНИЯ...");
                setTimeout(() => {
                    // Restore camera feeds
                    document.querySelectorAll(".camera-content").forEach((content) => {
                        content.style.opacity = 1;
                    });

                    // Reset videos
                    restartVideos(videoElements);

                    // Randomize scanlines again
                    randomizeScanLines();

                    // Update system status
                    document.querySelector(".status-alert").textContent = "АКТИВНА";
                    logEvent("СИСТЕМА УСПЕШНО ПЕРЕЗАГРУЖЕНА");

                    // Trigger random glitches
                    setTimeout(() => {
                        if (!prefersReducedMotion) {
                            cameraFeeds.forEach((feed) => {
                                const glitchOverlay = feed.querySelector(".glitch-overlay");
                                const colorDistortion = feed.querySelector(".color-distortion");
                                const video = feed.querySelector(".camera-video");

                                setTimeout(() => {
                                    applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                                }, Math.random() * 2000);
                            });
                        }
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    });

    // Force glitch button - now "System Test"
    triggerGlitchBtn.addEventListener("click", () => {
        logEvent("ЗАПУСК ТЕСТА СИСТЕМЫ...");

        // Apply test glitches to all cameras
        cameraFeeds.forEach((feed) => {
            const glitchOverlay = feed.querySelector(".glitch-overlay");
            const colorDistortion = feed.querySelector(".color-distortion");
            const video = feed.querySelector(".camera-video");

            // Test effects
            video.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
            feed.querySelector(".noise-overlay").style.opacity = 0.1;

            // Reset after short delay
            setTimeout(() => {
                video.style.transform = "none";
                feed.querySelector(".noise-overlay").style.opacity = 0.03;

                // Secondary test effect
                if (Math.random() < 0.5) {
                    setTimeout(() => {
                        applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                    }, Math.random() * 1000 + 500);
                }
            }, 600);
        });

        // System response
        setTimeout(() => {
            logEvent("ТЕСТ СИСТЕМЫ ЗАВЕРШЕН");
            logEvent("ВСЕ СИСТЕМЫ ФУНКЦИОНИРУЮТ НОРМАЛЬНО");
        }, 1200);
    });

    // Handle escape key to exit fullscreen
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const fullscreenCamera = document.querySelector(".camera-feed.fullscreen");
            if (fullscreenCamera) {
                fullscreenCamera.classList.remove("fullscreen");
                document.body.style.overflow = "auto";
            }
        }
    });
    
    // Новые обработчики для провокации аномалии
    setupAnomalyTriggers();
};