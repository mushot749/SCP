document.addEventListener("DOMContentLoaded", () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // DOM elements
    const timeDisplay = document.getElementById("time-display");
    const uptimeDisplay = document.getElementById("uptime-display");
    const logContent = document.getElementById("log-content");
    const toggleGridBtn = document.getElementById("toggle-grid");
    const resetSystemBtn = document.getElementById("reset-system");
    const triggerGlitchBtn = document.getElementById("trigger-glitch");
    const toggleFilterBtn = document.getElementById("toggle-filter");
    const cameraFeeds = document.querySelectorAll(".camera-feed");
    const cameraGrid = document.querySelector(".camera-grid");
    const videoElements = document.querySelectorAll(".camera-video");
    const scanLines = document.querySelectorAll(".scan-line");

    // SCP-themed video sources
    const videoSources = [
        "./videos/first.mp4",
        "./videos/second.mp4",
        "https://mattcannon.games/codepen/glitches/cam3.mp4",
        "https://mattcannon.games/codepen/glitches/cam4.mp4",
        "https://mattcannon.games/codepen/glitches/cam5.mp4",
        "https://mattcannon.games/codepen/glitches/cam6.mp4"
    ];

    // Fallback to placeholder if videos not available
    const fallbackVideo = "https://assets.codepen.io/000000/scp-static.mp4";

    // SCP-related log messages
    const scpLogMessages = [
        "Обнаружена аномальная активность",
        "Нарушение протокола содержания",
        "Активированы протоколы безопасности",
        "Сканирование аномалий...",
        "Проверка целостности содержания",
        "Мониторинг активности объекта",
        "Обновление протоколов наблюдения",
        "Проверка систем сдерживания"
    ];

    const scpWarningMessages = [
        "ПРЕДУПРЕЖДЕНИЕ: Нарушение содержания",
        "ОПАСНОСТЬ: Аномальная активность",
        "ТРЕВОГА: Объект проявляет активность",
        "УГРОЗА: Нарушение протокола",
        "КРИТИЧЕСКИЙ УРОВЕНЬ: Активность объекта",
        "АВАРИЯ: Системы сдерживания под угрозой"
    ];

    // Current view state and filter state
    let gridState = "three-per-row";
    let isColorMode = true;
    let systemUptime = 0;

    // Initialize and setup SCP monitoring system
    function initializeSystem() {
        // Set current time
        updateTime();
        setInterval(updateTime, 1000);
        
        // Update uptime
        setInterval(updateUptime, 1000);

        // Randomize scan line speeds
        randomizeScanLines();

        // Load videos with SCP-themed content
        videoElements.forEach((video, index) => {
            video.src = videoSources[index % videoSources.length];
            video.loop = true;
            video.muted = true;
            
            video.addEventListener('canplaythrough', () => {
                if (video.id === "video3" || video.id === "video5") {
                    video.style.opacity = 0.5;
                    const feed = video.closest(".camera-feed");
                    const noiseOverlay = feed.querySelector(".noise-overlay");
                    noiseOverlay.style.opacity = 0.15;
                }
                
                video.play().catch((error) => {
                    console.error("Video playback error:", error);
                    logEvent(`ОШИБКА: Видеопоток камеры ${index + 1} недоступен`);
                    video.src = fallbackVideo;
                    video.play();
                });
            });
            
            video.addEventListener('error', () => {
                console.log("Video failed to load, using fallback");
                video.src = fallbackVideo;
                video.play();
            });
        });

        // Set videos to color mode by default
        videoElements.forEach((video) => {
            video.classList.add("color-mode");
        });

        // Set button text to match initial state
        toggleFilterBtn.textContent = "ЧЕРНО-БЕЛЫЙ";

        // Initialize glitch effects
        if (!prefersReducedMotion) {
            setupGlitchEffects();
        } else {
            setupReducedMotionEffects();
        }

        // Log initialization
        logEvent("СИСТЕМА МОНИТОРИНГА SCP ИНИЦИАЛИЗИРОВАНА");
        logEvent("ЗАГРУЗКА МОДУЛЕЙ НАБЛЮДЕНИЯ...");

        // Simulate SCP system initialization
        const initSteps = [
            {message: "ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ ФОНДА", delay: 800},
            {message: "ПРОВЕРКА СИСТЕМ СОДЕРЖАНИЯ...", delay: 2300},
            {message: "МОНИТОРИНГ АКТИВНЫХ ОБЪЕКТОВ", delay: 3800},
            {message: "СИСТЕМА ГОТОВА К РАБОТЕ", delay: 5800},
            {message: "СТАТУС: ВСЕ ОБЪЕКТЫ ПОД КОНТРОЛЕМ", delay: 5800}
        ];

        initSteps.forEach(step => {
            setTimeout(() => {
                logEvent(step.message);
            }, step.delay);
        });

        // Setup navigation access handling
        setupNavigationAccess();
    }

    // Setup navigation access handling
    function setupNavigationAccess() {
        const navLinks = document.querySelectorAll(".scp-header nav a");
        
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                const accessLevel = parseInt(link.getAttribute("data-access"));
                const userAccess = 2; // Текущий уровень доступа пользователя
                
                if (accessLevel > userAccess) {
                    e.preventDefault();
                    logEvent(`ОТКАЗАНО В ДОСТУПЕ: Требуется уровень ${accessLevel}`);
                }
            });
        });
        
        // Simulate content loading
        simulateContentLoading();
    }

    function simulateContentLoading() {
        const contentSteps = [
            {message: "ЗАГРУЗКА ДАННЫХ ОБЪЕКТА ФОНДА...", delay: 3000},
            {message: "ДОСТУП К ОТЧЁТУ 001-Ω: ТРЕБУЕТСЯ УРОВЕНЬ 3", delay: 4500},
            {message: "ПРОТОКОЛЫ ДОСТУПНЫ ДЛЯ УРОВНЯ 2+", delay: 6000},
            {message: "БАЗА ДАННЫХ ПЕРСОНАЛА: ЗАГРУЗКА...", delay: 7500}
        ];

        contentSteps.forEach(step => {
            setTimeout(() => {
                logEvent(step.message);
            }, step.delay);
        });
    }

    // Update system uptime
    function updateUptime() {
        systemUptime++;
        const hours = Math.floor(systemUptime / 3600);
        const minutes = Math.floor((systemUptime % 3600) / 60);
        const seconds = systemUptime % 60;
        
        uptimeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Randomize scan line speeds and densities
    function randomizeScanLines() {
        scanLines.forEach((scanLine) => {
            const duration = 4 + Math.random() * 8;
            scanLine.style.animationDuration = `${duration}s`;

            const density = 2 + Math.random() * 6;
            scanLine.style.backgroundSize = `100% ${density}px`;

            scanLine.style.animationDelay = `-${Math.random() * 10}s`;
        });
    }

    // Update time display
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Log events to terminal
    function logEvent(message) {
        const timestamp = timeDisplay.textContent;
        logContent.innerHTML =
            `> [${timestamp}] ${message}<br>` + logContent.innerHTML;
        
        // Limit log length
        if (logContent.childElementCount > 50) {
            logContent.removeChild(logContent.lastChild);
        }
        
        logContent.scrollTop = 0;
    }

    // Setup glitch effects for SCP cameras
    function setupGlitchEffects() {
        cameraFeeds.forEach((feed, index) => {
            const glitchOverlay = feed.querySelector(".glitch-overlay");
            const colorDistortion = feed.querySelector(".color-distortion");
            const video = feed.querySelector(".camera-video");

            // Trigger an immediate glitch on startup
            setTimeout(() => {
                applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
            }, Math.random() * 2000);

            // Random glitch intervals for each camera
            const minInterval = 3000 + index * 500;
            const maxInterval = 10000 + index * 1000;

            function scheduleNextGlitch() {
                const nextGlitchDelay =
                    Math.random() * (maxInterval - minInterval) + minInterval;

                setTimeout(() => {
                    if (Math.random() < 0.7) {
                        applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                    }
                    scheduleNextGlitch();
                }, nextGlitchDelay);
            }

            scheduleNextGlitch();
        });
    }

    // Apply SCP-themed glitch effect
    function applySCPGlitch(feed, video, glitchOverlay, colorDistortion) {
        const glitchDuration = Math.random() * 800 + 400;

        // Choose random SCP glitch effects
        const effects = ["anomaly", "containment", "reality", "signal"];
        const effect = effects[Math.floor(Math.random() * effects.length)];

        switch (effect) {
            case "anomaly":
                video.style.filter = "hue-rotate(180deg) contrast(2)";
                glitchOverlay.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
                
                setTimeout(() => {
                    video.style.filter = "";
                    glitchOverlay.style.backgroundColor = "transparent";
                }, glitchDuration);
                break;

            case "containment":
                video.style.transform = `scale(1.1) rotate(${Math.random() * 5 - 2.5}deg)`;
                colorDistortion.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
                colorDistortion.style.opacity = "0.6";
                
                setTimeout(() => {
                    video.style.transform = "";
                    colorDistortion.style.opacity = "0";
                }, glitchDuration);
                break;

            case "reality":
                const slices = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < slices; i++) {
                    const slice = document.createElement("div");
                    slice.style.position = "absolute";
                    slice.style.left = "0";
                    slice.style.right = "0";
                    slice.style.top = `${Math.random() * 80}%`;
                    slice.style.height = `${Math.random() * 20 + 10}px`;
                    slice.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                    slice.style.zIndex = "5";
                    
                    feed.querySelector(".camera-content").appendChild(slice);
                    
                    setTimeout(() => {
                        slice.remove();
                    }, glitchDuration - 100);
                }
                break;

            case "signal":
                feed.querySelector(".noise-overlay").style.opacity = "0.2";
                video.style.opacity = "0.7";
                
                setTimeout(() => {
                    feed.querySelector(".noise-overlay").style.opacity = "0.03";
                    video.style.opacity = "1";
                }, glitchDuration);
                break;
        }

        // Log SCP-themed messages
        if (Math.random() < 0.6) {
            const cameraId = feed.querySelector(".camera-id").textContent;
            const isWarning = Math.random() < 0.3;
            
            if (isWarning) {
                const message = scpWarningMessages[Math.floor(Math.random() * scpWarningMessages.length)];
                logEvent(`${message}: ${cameraId}`);
            } else {
                const message = scpLogMessages[Math.floor(Math.random() * scpLogMessages.length)];
                logEvent(`${message}: ${cameraId}`);
            }
        }
    }

    // Setup reduced motion alternative effects
    function setupReducedMotionEffects() {
        cameraFeeds.forEach((feed) => {
            const noiseOverlay = feed.querySelector(".noise-overlay");
            noiseOverlay.style.opacity = 0.02;
            feed.querySelector(".camera-content").style.border = "1px solid var(--border-dark)";
        });
    }

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
        switch (gridState) {
            case "three-per-row":
                cameraGrid.classList.remove("three-per-row");
                cameraGrid.classList.add("two-per-row");
                gridState = "two-per-row";
                toggleGridBtn.textContent = "2x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 2x3");
                break;
            case "two-per-row":
                cameraGrid.classList.remove("two-per-row");
                cameraGrid.classList.add("single-column");
                gridState = "single-column";
                toggleGridBtn.textContent = "1x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ ОДИН СТОЛБЕЦ");
                break;
            case "single-column":
                cameraGrid.classList.remove("single-column");
                cameraGrid.classList.add("three-per-row");
                gridState = "three-per-row";
                toggleGridBtn.textContent = "3x СЕТКА";
                logEvent("ПЕРЕКЛЮЧЕНИЕ НА РЕЖИМ 3x2");
                break;
        }
    });

    // Toggle color/BW filter
    toggleFilterBtn.addEventListener("click", () => {
        isColorMode = !isColorMode;

        videoElements.forEach((video) => {
            if (isColorMode) {
                video.classList.add("color-mode");
                toggleFilterBtn.textContent = "ЧЕРНО-БЕЛЫЙ";
            } else {
                video.classList.remove("color-mode");
                toggleFilterBtn.textContent = "ЦВЕТНОЙ";
            }
        });

        logEvent(`ПЕРЕКЛЮЧЕНИЕ В ${isColorMode ? "ЦВЕТНОЙ" : "ЧЕРНО-БЕЛЫЙ"} РЕЖИМ`);
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
                    videoElements.forEach((video) => {
                        video.currentTime = 0;
                        video.play().catch(e => console.error("Video restart error:", e));
                    });

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

        if (prefersReducedMotion) {
            document.querySelectorAll(".camera-content").forEach((content) => {
                content.style.borderColor = "var(--accent-color)";
                setTimeout(() => {
                    content.style.borderColor = "var(--border-dark)";
                }, 2000);
            });
            return;
        }

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

    // Initialize the SCP monitoring system
    initializeSystem();
});