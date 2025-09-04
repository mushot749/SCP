// emergency-mode.js
import { getDOMElements } from './constants.js';
import { logEvent } from './utils.js';

class EmergencyMode {
    constructor() {
        this.isActive = false;
        this.emergencyButton = null;
        this.navEmergencyButton = null;
        this.overlay = null;
        this.alertBar = null;
        this.init();
    }

    init() {
        this.createEmergencyButton();
        this.setupNavEmergencyButton();
        this.setupEventListeners();
    }

    createEmergencyButton() {
        const { controls } = getDOMElements();
        if (!controls) return;

        this.emergencyButton = document.createElement('button');
        this.emergencyButton.id = 'emergency-protocol';
        this.emergencyButton.className = 'control-btn emergency-button';
        this.emergencyButton.textContent = 'ПРОТОКОЛ 7-Δ';
        this.emergencyButton.title = 'Активировать аварийный режим защиты от аномалий';

        controls.appendChild(this.emergencyButton);
    }

    setupNavEmergencyButton() {
        this.navEmergencyButton = document.getElementById('nav-emergency-protocol');
        if (this.navEmergencyButton) {
            this.navEmergencyButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleEmergencyMode();
            });
        }
    }

    setupEventListeners() {
        if (this.emergencyButton) {
            this.emergencyButton.addEventListener('click', () => {
                this.toggleEmergencyMode();
            });
        }

        // Автоматическая активация при сильном заражении Zalgo
        document.addEventListener('zalgoCriticalLevel', (event) => {
            if (event.detail.level >= 0.8 && !this.isActive) {
                this.activateEmergencyMode();
                logEvent("АВАРИЙНЫЙ РЕЖИМ: АВТОМАТИЧЕСКАЯ АКТИВАЦИЯ ПРОТОКОЛА 7-Δ");
            }
        });
    }

    activateEmergencyMode() {
        if (this.isActive) return;

        this.isActive = true;
        document.documentElement.setAttribute('data-emergency-mode', 'true');

        // Обновляем кнопку в навигации
        if (this.navEmergencyButton) {
            this.navEmergencyButton.classList.add('active');
            this.navEmergencyButton.textContent = '🚨 АКТИВЕН';
            this.navEmergencyButton.title = 'Аварийный режим активен';
        }

        // Создаем элементы аварийного режима
        this.createEmergencyOverlay();
        this.createEmergencyAlertBar();

        // Останавливаем распространение аномалии
        this.containAnomaly();

        logEvent("АВАРИЙНЫЙ РЕЖИМ: ПРОТОКОЛ 7-Δ АКТИВИРОВАН");
        logEvent("СИСТЕМА ЗАЩИТЫ ОТ АНОМАЛИЙ ЗАПУЩЕНА");
        logEvent("РЕАЛЬНОСТЬ СТАБИЛИЗИРУЕТСЯ...");

        // Генерируем событие для других модулей
        document.dispatchEvent(new CustomEvent('emergencyModeActivated'));
    }

    deactivateEmergencyMode() {
        if (!this.isActive) return;

        this.isActive = false;
        document.documentElement.removeAttribute('data-emergency-mode');

        // Обновляем кнопку в навигации
        if (this.navEmergencyButton) {
            this.navEmergencyButton.classList.remove('active');
            this.navEmergencyButton.textContent = '🚨 ПРОТОКОЛ 7-Δ';
            this.navEmergencyButton.title = 'Активировать аварийный режим защиты от аномалий';
        }

        // Удаляем элементы аварийного режима
        this.removeEmergencyElements();

        logEvent("АВАРИЙНЫЙ РЕЖИМ: ПРОТОКОЛ 7-Δ ДЕАКТИВИРОВАН");
        logEvent("СИСТЕМА ВОЗВРАЩАЕТСЯ К СТАНДАРТНОЙ РАБОТЕ");
    }

    toggleEmergencyMode() {
        if (this.isActive) {
            this.deactivateEmergencyMode();
        } else {
            this.activateEmergencyMode();
        }
    }

    createEmergencyOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'emergency-mode-active';
        document.body.appendChild(this.overlay);
    }

    createEmergencyAlertBar() {
        this.alertBar = document.createElement('div');
        this.alertBar.className = 'emergency-alert-bar';
        this.alertBar.textContent = '⚠️ АВАРИЙНЫЙ РЕЖИМ: ПРОТОКОЛ 7-Δ АКТИВИРОВАН ⚠️';
        document.body.appendChild(this.alertBar);
    }

    removeEmergencyElements() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        if (this.alertBar) {
            this.alertBar.remove();
            this.alertBar = null;
        }
    }

    containAnomaly() {
        // Останавливаем распространение Zalgo эффекта
        if (window.zalgoEffect) {
            window.zalgoEffect.stopPropagation();
        }

        // Сбрасываем другие аномалии
        document.querySelectorAll('.zalgo-infected, .reality-glitch').forEach(el => {
            el.classList.remove('zalgo-infected', 'reality-glitch');
        });

        // Восстанавливаем нормальный текст
        setTimeout(() => {
            const infectedElements = document.querySelectorAll('[data-original-text]');
            infectedElements.forEach(el => {
                el.textContent = el.getAttribute('data-original-text');
                el.removeAttribute('data-original-text');
            });
        }, 1000);
    }

    // Метод для автоматической активации из других модулей
    static triggerEmergencyProtocol() {
        if (!window.emergencyMode) {
            window.emergencyMode = new EmergencyMode();
        }
        window.emergencyMode.activateEmergencyMode();
    }
}

export { EmergencyMode };