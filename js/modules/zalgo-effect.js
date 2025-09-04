// zalgo-effect.js
import { logEvent } from './utils.js';

class ZalgoText {
    constructor() {
        this.isActive = false;
        this.infectionLevel = 0;
        this.infectionTimer = null;
        this.maxInfectionLevel = 0;
        
        // Zalgo characters for different directions
        this.zalgoUp = [
            '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
            '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
            '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
            '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d',
            '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
            '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b',
            '\u0346', '\u031a'
        ];
        
        this.zalgoDown = [
            '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
            '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
            '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
            '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d',
            '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'
        ];
        
        this.zalgoMid = [
            '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
            '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e',
            '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489'
        ];
        
        this.init();
    }

    init() {
        this.isActive = true;
        logEvent("МОДУЛЬ ZALGO: ИНИЦИАЛИЗИРОВАН");
    }

    startSlowInfection() {
        if (!this.isActive) return;
        
        logEvent("ZALGO: НАЧАТО МЕДЛЕННОЕ ЗАРАЖЕНИЕ ТЕКСТА");
        
        this.infectionTimer = setInterval(() => {
            this.infectRandomText();
            this.checkInfectionLevel();
            
            // Автоматически останавливаемся при достижении максимума
            if (this.infectionLevel >= 0.9) {
                this.stopPropagation();
            }
        }, 3000); // Каждые 3 секунды
    }

    startRapidInfection() {
        if (!this.isActive) return;
        
        logEvent("ZALGO: НАЧАТО БЫСТРОЕ ЗАРАЖЕНИЕ ТЕКСТА");
        clearInterval(this.infectionTimer);
        
        this.infectionTimer = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                this.infectRandomText();
            }
            this.checkInfectionLevel();
        }, 1000); // Каждую секунду
    }

    infectRandomText() {
        if (!this.isActive) return;

        // Выбираем все текстовые элементы, кроме тех, что уже заражены
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, a, button:not(.zalgo-infected):not(.control-btn)');
        
        if (textElements.length === 0) return;

        // Выбираем случайный элемент
        const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
        
        // Сохраняем оригинальный текст, если еще не сохранен
        if (!randomElement.hasAttribute('data-original-text')) {
            randomElement.setAttribute('data-original-text', randomElement.textContent);
        }

        // Применяем Zalgo эффект
        this.applyZalgoEffect(randomElement);
        
        // Добавляем класс заражения
        randomElement.classList.add('zalgo-infected');
    }

    applyZalgoEffect(element) {
        const originalText = element.getAttribute('data-original-text') || element.textContent;
        let infectedText = '';

        for (let i = 0; i < originalText.length; i++) {
            let char = originalText[i];
            
            // Пропускаем пробелы и специальные символы
            if (char === ' ' || char === '\n' || char === '\t') {
                infectedText += char;
                continue;
            }

            // Добавляем Zalgo символы с разной интенсивностью в зависимости от уровня заражения
            const intensity = Math.min(1, this.infectionLevel * 2); // Увеличиваем интенсивность с уровнем
            
            infectedText += char;
            
            // Добавляем верхние символы
            if (Math.random() < intensity * 0.6) {
                const upCount = Math.floor(Math.random() * 3 * intensity);
                for (let j = 0; j < upCount; j++) {
                    infectedText += this.zalgoUp[Math.floor(Math.random() * this.zalgoUp.length)];
                }
            }
            
            // Добавляем средние символы
            if (Math.random() < intensity * 0.4) {
                const midCount = Math.floor(Math.random() * 2 * intensity);
                for (let j = 0; j < midCount; j++) {
                    infectedText += this.zalgoMid[Math.floor(Math.random() * this.zalgoMid.length)];
                }
            }
            
            // Добавляем нижние символы
            if (Math.random() < intensity * 0.5) {
                const downCount = Math.floor(Math.random() * 3 * intensity);
                for (let j = 0; j < downCount; j++) {
                    infectedText += this.zalgoDown[Math.floor(Math.random() * this.zalgoDown.length)];
                }
            }
        }

        element.textContent = infectedText;
    }

    checkInfectionLevel() {
        const infectedElements = document.querySelectorAll('.zalgo-infected');
        const totalElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, li, a, button:not(.control-btn)').length;
        
        if (totalElements === 0) {
            this.infectionLevel = 0;
            return 0;
        }

        this.infectionLevel = infectedElements.length / totalElements;
        this.maxInfectionLevel = Math.max(this.maxInfectionLevel, this.infectionLevel);

        // Генерируем события при разных уровнях заражения
        if (this.infectionLevel >= 0.3 && this.infectionLevel < 0.5) {
            document.dispatchEvent(new CustomEvent('zalgoWarningLevel', {
                detail: { level: this.infectionLevel }
            }));
        }
        else if (this.infectionLevel >= 0.5 && this.infectionLevel < 0.8) {
            document.dispatchEvent(new CustomEvent('zalgoDangerLevel', {
                detail: { level: this.infectionLevel }
            }));
        }
        else if (this.infectionLevel >= 0.8) {
            document.dispatchEvent(new CustomEvent('zalgoCriticalLevel', {
                detail: { level: this.infectionLevel }
            }));
            
            // Автоматически переходим на быстрое заражение при критическом уровне
            if (this.infectionTimer) {
                clearInterval(this.infectionTimer);
                this.startRapidInfection();
            }
        }

        // Обновляем атрибут на body для CSS
        document.body.setAttribute('data-zalgo-level', this.infectionLevel.toFixed(2));

        return this.infectionLevel;
    }

    stopPropagation() {
        this.isActive = false;
        clearInterval(this.infectionTimer);
        this.infectionTimer = null;
        
        logEvent("ZALGO: РАСПРОСТРАНЕНИЕ ОСТАНОВЛЕНО");
        
        document.dispatchEvent(new CustomEvent('zalgoContained', {
            detail: { finalLevel: this.infectionLevel }
        }));
    }

    resetInfection() {
        this.stopPropagation();
        this.infectionLevel = 0;
        this.maxInfectionLevel = 0;
        
        // Восстанавливаем весь текст
        const infectedElements = document.querySelectorAll('[data-original-text]');
        infectedElements.forEach(el => {
            el.textContent = el.getAttribute('data-original-text');
            el.removeAttribute('data-original-text');
            el.classList.remove('zalgo-infected');
        });
        
        document.body.removeAttribute('data-zalgo-level');
        logEvent("ZALGO: ВСЕ ТЕКСТЫ ВОССТАНОВЛЕНЫ");
    }

    // Метод для принудительного заражения конкретного элемента
    infectElement(element, intensity = 0.5) {
        if (!this.isActive) return;
        
        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent);
        }
        
        const savedLevel = this.infectionLevel;
        this.infectionLevel = intensity;
        this.applyZalgoEffect(element);
        this.infectionLevel = savedLevel;
        
        element.classList.add('zalgo-infected');
        this.checkInfectionLevel();
    }

    // Метод для получения текущего статуса
    getStatus() {
        return {
            isActive: this.isActive,
            infectionLevel: this.infectionLevel,
            maxInfectionLevel: this.maxInfectionLevel,
            infectedElements: document.querySelectorAll('.zalgo-infected').length
        };
    }
}

export { ZalgoText };