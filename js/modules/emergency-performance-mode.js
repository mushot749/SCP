// emergency-performance-mode.js
export class EmergencyPerformanceMode {
    constructor() {
        this.isEmergencyMode = false;
        this.isLightweightMode = false;
        this.toggleButton = document.getElementById('emergency-performance-btn');
        this.lightweightStyles = null;
        this.cameraGrid = document.querySelector('.camera-grid');
        this.cameraPlaceholder = document.querySelector('.camera-placeholder');
        this.controlPanel = document.querySelector('.control-panel');
        this.anomaly = null;
        this.zalgoEffect = null;
        
        this.init();
    }

    init() {
        // Проверяем сохраненные настройки
        const savedMode = localStorage.getItem('scp-emergency-mode');
        if (savedMode === 'emergency') {
            this.activateEmergencyMode();
        } else if (savedMode === 'lightweight') {
            this.activateLightweightMode();
        }

        // Добавляем обработчик клика
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleMode();
            });
        }
    }

    toggleMode() {
        if (this.isEmergencyMode) {
            this.deactivateAllModes();
        } else if (this.isLightweightMode) {
            this.activateEmergencyMode();
        } else {
            this.activateLightweightMode();
        }
    }

    activateEmergencyMode() {
        // Активируем облегченный режим как основу
        this.activateLightweightMode();
        
        // Дополнительные действия для аварийного режима
        this.isEmergencyMode = true;
        localStorage.setItem('scp-emergency-mode', 'emergency');
        
        // Останавливаем все аномалии
        this.stopAllAnomalies();
        
        // Применяем дополнительные визуальные эффекты аварийного режима
        this.applyEmergencyEffects();
        
        this.updateButtonText();
        this.logModeChange('АВАРИЙНЫЙ ПРОТОКОЛ 7-Δ АКТИВИРОВАН - ВСЕ СИСТЕМЫ ОЧИЩЕНЫ');
    }

    activateLightweightMode() {
        if (!this.lightweightStyles) {
            this.lightweightStyles = document.createElement('link');
            this.lightweightStyles.rel = 'stylesheet';
            this.lightweightStyles.href = 'css/modes/lightweight-mode.css';
            document.head.appendChild(this.lightweightStyles);
        }

        // Скрываем видео и показываем placeholder
        if (this.cameraGrid) this.cameraGrid.style.display = 'none';
        if (this.cameraPlaceholder) this.cameraPlaceholder.style.display = 'block';
        if (this.controlPanel) this.controlPanel.style.display = 'none';

        // Останавливаем аномалии
        this.stopAllAnomalies();

        document.body.classList.add('lightweight-mode');
        this.isLightweightMode = true;
        this.isEmergencyMode = false;
        localStorage.setItem('scp-emergency-mode', 'lightweight');
        
        this.updateButtonText();
        this.logModeChange('ОБЛЕГЧЕННЫЙ РЕЖИМ АКТИВИРОВАН - ВИДЕОНАБЛЮДЕНИЕ ОТКЛЮЧЕНО');
    }

    deactivateAllModes() {
        if (this.lightweightStyles) {
            this.lightweightStyles.remove();
            this.lightweightStyles = null;
        }

        // Показываем видео и скрываем placeholder
        if (this.cameraGrid) this.cameraGrid.style.display = 'grid';
        if (this.cameraPlaceholder) this.cameraPlaceholder.style.display = 'none';
        if (this.controlPanel) this.controlPanel.style.display = 'flex';

        // Убираем все эффекты
        this.removeEmergencyEffects();

        document.body.classList.remove('lightweight-mode');
        this.isLightweightMode = false;
        this.isEmergencyMode = false;
        localStorage.setItem('scp-emergency-mode', 'normal');
        
        this.updateButtonText();
        this.logModeChange('НОРМАЛЬНЫЙ РЕЖИМ АКТИВИРОВАН - ВСЕ СИСТЕМЫ ВОССТАНОВЛЕНЫ');
    }

    stopAllAnomalies() {
        // Останавливаем Zalgo эффект
        if (window.zalgoEffect && typeof window.zalgoEffect.stop === 'function') {
            window.zalgoEffect.stop();
        }
        
        // Останавливаем аномалии
        if (window.anomaly && typeof window.anomaly.stop === 'function') {
            window.anomaly.stop();
        }
        
        // Останавливаем аварийный режим
        if (window.emergencyMode && typeof window.emergencyMode.deactivate === 'function') {
            window.emergencyMode.deactivate();
        }
        
        // Очищаем все визуальные искажения
        this.cleanVisualEffects();
    }

    cleanVisualEffects() {
        // Убираем все глитч-эффекты
        const glitchElements = document.querySelectorAll('.glitch-overlay, .color-distortion, .noise-overlay');
        glitchElements.forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
        });
        
        // Восстанавливаем нормальное состояние текста
        const textElements = document.querySelectorAll('.glitch-text, [data-zalgo]');
        textElements.forEach(el => {
            el.classList.remove('glitch-text');
            el.removeAttribute('data-zalgo');
            el.style.transform = 'none';
            el.style.opacity = '1';
        });
        
        // Убираем аварийные вспышки
        const flashes = document.querySelectorAll('[class*="flash"], [class*="emergency"]');
        flashes.forEach(el => el.remove());
    }

    applyEmergencyEffects() {
        // Добавляем визуальные индикаторы аварийного режима
        const emergencyIndicator = document.createElement('div');
        emergencyIndicator.className = 'emergency-indicator';
        emergencyIndicator.innerHTML = '🚨 АВАРИЙНЫЙ РЕЖИМ АКТИВЕН 🚨';
        emergencyIndicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 14px;
            z-index: 10000;
            border: 2px solid #ff4444;
        `;
        document.body.appendChild(emergencyIndicator);
        
        // Мигающий эффект для акцента
        document.body.style.animation = 'emergencyPulse 2s infinite';
    }

    removeEmergencyEffects() {
        // Убираем индикаторы аварийного режима
        const indicators = document.querySelectorAll('.emergency-indicator');
        indicators.forEach(el => el.remove());
        
        // Убираем анимацию пульсации
        document.body.style.animation = 'none';
    }

    updateButtonText() {
        if (this.toggleButton) {
            if (this.isEmergencyMode) {
                this.toggleButton.textContent = '✅ ПРОТОКОЛ 7-Δ: ДЕАКТИВИРОВАТЬ';
            } else if (this.isLightweightMode) {
                this.toggleButton.textContent = '🚀 ПРОТОКОЛ 7-Δ: АВАРИЙНЫЙ РЕЖИМ';
            } else {
                this.toggleButton.textContent = '🚨 ПРОТОКОЛ 7-Δ: АКТИВИРОВАТЬ';
            }
        }
    }

    logModeChange(message) {
        if (typeof window.logEvent === 'function') {
            window.logEvent(message);
        } else {
            console.log('SYSTEM LOG:', message);
        }
    }

    // Методы для внешнего доступа
    isAnyModeActive() {
        return this.isEmergencyMode || this.isLightweightMode;
    }

    getCurrentMode() {
        if (this.isEmergencyMode) return 'emergency';
        if (this.isLightweightMode) return 'lightweight';
        return 'normal';
    }
}