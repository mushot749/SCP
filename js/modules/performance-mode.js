// performance-mode.js
export class PerformanceMode {
    constructor() {
        this.isLightweightMode = false;
        this.toggleButton = document.getElementById('toggle-performance-mode');
        this.lightweightStyles = null;
        this.cameraGrid = document.querySelector('.camera-grid');
        this.cameraPlaceholder = document.querySelector('.camera-placeholder');
        this.controlPanel = document.querySelector('.control-panel');
        
        this.init();
    }

    init() {
        // Проверяем сохраненные настройки
        const savedMode = localStorage.getItem('scp-performance-mode');
        if (savedMode === 'lightweight') {
            this.enableLightweightMode();
        }

        // Добавляем обработчик клика
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleMode();
            });
        }

        // Автоматически включаем облегченный режим на мобильных устройствах
        if (this.isMobileDevice() && savedMode === null) {
            this.enableLightweightMode();
        }
    }

    toggleMode() {
        if (this.isLightweightMode) {
            this.disableLightweightMode();
        } else {
            this.enableLightweightMode();
        }
    }

    enableLightweightMode() {
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

        document.body.classList.add('lightweight-mode');
        this.isLightweightMode = true;
        localStorage.setItem('scp-performance-mode', 'lightweight');
        
        this.updateButtonText();
        this.logModeChange('ОБЛЕГЧЕННЫЙ РЕЖИМ АКТИВИРОВАН - ВИДЕОНАБЛЮДЕНИЕ ОТКЛЮЧЕНО');
    }

    disableLightweightMode() {
        if (this.lightweightStyles) {
            this.lightweightStyles.remove();
            this.lightweightStyles = null;
        }

        // Показываем видео и скрываем placeholder
        if (this.cameraGrid) this.cameraGrid.style.display = 'grid';
        if (this.cameraPlaceholder) this.cameraPlaceholder.style.display = 'none';
        if (this.controlPanel) this.controlPanel.style.display = 'flex';

        document.body.classList.remove('lightweight-mode');
        this.isLightweightMode = false;
        localStorage.setItem('scp-performance-mode', 'full');
        
        this.updateButtonText();
        this.logModeChange('ПОЛНЫЙ РЕЖИМ АКТИВИРОВАН - ВИДЕОНАБЛЮДЕНИЕ ВКЛЮЧЕНО');
    }

    updateButtonText() {
        if (this.toggleButton) {
            this.toggleButton.textContent = this.isLightweightMode ? 
                '🎮 ПОЛНЫЙ РЕЖИМ' : 
                '🚀 ОБЛЕГЧЕННЫЙ РЕЖИМ';
        }
    }

    logModeChange(message) {
        if (typeof window.logEvent === 'function') {
            window.logEvent(message);
        } else {
            console.log('SYSTEM LOG:', message);
        }
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }

    getCurrentMode() {
        return this.isLightweightMode ? 'lightweight' : 'full';
    }
}