// anomaly-core.js
import { ZalgoText } from './zalgo-effect.js';
import { logEvent } from './utils.js';

class AnomalyInfection {
    constructor() {
        this.infectionLevel = 0;
        this.maxInfection = 100;
        this.effects = [];
        this.interval = null;
        this.activeEffects = new Set();
        this.isActive = false;
        
        this.init();
    }

    init() {
        this.startInfectionProgress();
        this.initEffects();
        this.addEventListeners();
        this.isActive = true;
        
        logEvent("МОДУЛЬ МОНИТОРИНГА АНОМАЛИЙ АКТИВИРОВАН");
        logEvent("ОБНАРУЖЕНА АНОМАЛЬНАЯ АКТИВНОСТЬ В СИСТЕМЕ");
    }

    startInfectionProgress() {
        this.interval = setInterval(() => {
            if (this.infectionLevel < this.maxInfection) {
                this.infectionLevel += 0.1;
                this.applyEffectsBasedOnLevel();
            }
        }, 1000);
    }

    initEffects() {
        this.zalgoEffect = new ZalgoText();
        
        this.effects = [
            { level: 5, apply: this.applyZalgoEffect.bind(this) },
            { level: 10, apply: this.applyFlickerEffects.bind(this) },
            { level: 20, apply: this.applyGlitchEffects.bind(this) },
            { level: 30, apply: this.applyTextEffects.bind(this) },
            { level: 40, apply: this.applyCursorEffects.bind(this) },
            { level: 50, apply: this.applyScanLineEffect.bind(this) },
            { level: 60, apply: this.applyBackgroundEffects.bind(this) },
            { level: 70, apply: this.applyAudioEffects.bind(this) },
            { level: 80, apply: this.applyARGElements.bind(this) },
            { level: 90, apply: this.applyExtremeEffects.bind(this) }
        ];
    }

    applyEffectsBasedOnLevel() {
        this.effects.forEach(effect => {
            if (this.infectionLevel >= effect.level && 
                this.infectionLevel < effect.level + 10 &&
                !this.activeEffects.has(effect.level)) {
                effect.apply();
                this.activeEffects.add(effect.level);
                
                logEvent(`УРОВЕНЬ ЗАРАЖЕНИЯ: ${Math.floor(this.infectionLevel)}% - АКТИВИРОВАН ЭФФЕКТ УРОВНЯ ${effect.level}`);
            }
        });
    }

    applyZalgoEffect() {
        this.zalgoEffect.start();
        document.body.classList.add('zalgo-active');
    }

    applyFlickerEffects() {
        const flickerInterval = setInterval(() => {
            const elements = document.querySelectorAll('h1, h2, h3, p, span');
            elements.forEach(el => {
                if (Math.random() > 0.8 && !el.closest('.no-flicker')) {
                    el.classList.add('flicker-effect');
                    setTimeout(() => {
                        el.classList.remove('flicker-effect');
                    }, 2000);
                }
            });
        }, 5000);

        this.activeEffects.add('flicker');
    }

    applyGlitchEffects() {
        const glitchInterval = setInterval(() => {
            const elements = document.querySelectorAll('h1, h2, .camera-id');
            elements.forEach(el => {
                if (Math.random() > 0.6) {
                    el.classList.add('glitch-effect');
                    setTimeout(() => {
                        el.classList.remove('glitch-effect');
                    }, 1000);
                }
            });
        }, 3000);

        this.activeEffects.add('glitch');
    }

    applyTextEffects() {
        document.querySelectorAll('.status-value, .camera-status').forEach(el => {
            el.classList.add('text-shadow-effect');
        });
    }

    applyCursorEffects() {
        document.body.classList.add('cursor-distortion');
    }

    applyScanLineEffect() {
        if (!document.querySelector('.global-scan-line')) {
            const scanLine = document.createElement('div');
            scanLine.classList.add('global-scan-line');
            document.body.appendChild(scanLine);
        }
    }

    applyBackgroundEffects() {
        document.body.classList.add('reality-shift');
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            body.reality-shift {
                background: linear-gradient(45deg, #000000, #110000, #220000, #000000);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }
        `;
        document.head.appendChild(style);
    }

    applyAudioEffects() {
        if (!window.AudioContext) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.oscillator = this.audioContext.createOscillator();
            this.gainNode = this.audioContext.createGain();
            
            this.oscillator.type = 'sawtooth';
            this.oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
            this.gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
            
            this.oscillator.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
            
            this.oscillator.start();
            
            setInterval(() => {
                this.oscillator.frequency.setValueAtTime(
                    80 + Math.random() * 300, 
                    this.audioContext.currentTime
                );
            }, 5000);
            
            this.activeEffects.add('audio');
        } catch (error) {
            console.warn('Audio effects not supported:', error);
        }
    }

    applyARGElements() {
        this.addHiddenMessages();
        this.addEasterEggs();
        this.addCorruptedElements();
    }

    applyExtremeEffects() {
        document.body.classList.add('shake-effect', 'reality-tremor');
        
        setInterval(() => {
            const elements = document.querySelectorAll('.camera-feed, .terminal-content');
            elements.forEach(el => {
                if (Math.random() > 0.9) {
                    el.style.filter = 'invert(1) hue-rotate(' + Math.random() * 360 + 'deg)';
                    setTimeout(() => {
                        el.style.filter = 'none';
                    }, 1500);
                }
            });
        }, 3000);
    }

    addHiddenMessages() {
        const messages = [
            "ОНИ ВИДЯТ ТЕБЯ",
            "НЕ ДОВЕРЯЙ ФОНДУ",
            "ОБЪЕКТ 049 НА СВОБОДЕ",
            "ЭТО НЕ СИМУЛЯЦИЯ",
            "ПРОСНИСЬ",
            "ОНИ ЛГУТ ТЕБЕ",
            "НАСТОЯЩАЯ РЕАЛЬНОСТЬ СЛОМАНА",
            "СМОТРИ НА КОД СТРАНИЦЫ"
        ];
        
        const hiddenMessage = document.createElement('div');
        hiddenMessage.className = 'hidden-message';
        hiddenMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        document.body.appendChild(hiddenMessage);
        
        document.body.addEventListener('mousemove', (e) => {
            if (e.clientX > window.innerWidth - 150 && e.clientY > window.innerHeight - 150) {
                hiddenMessage.style.opacity = '1';
            } else {
                hiddenMessage.style.opacity = '0';
            }
        });
    }

    addEasterEggs() {
        let keySequence = [];
        
        document.addEventListener('keydown', (e) => {
            keySequence.push(e.key.toLowerCase());
            if (keySequence.length > 10) keySequence.shift();
            
            const sequences = [
                'contain',
                'breach',
                'scp',
                'keter',
                'help',
                'reality',
                'broken'
            ];
            
            const currentSequence = keySequence.join('');
            if (sequences.some(seq => currentSequence.includes(seq))) {
                this.triggerSpecialEvent(seq);
                keySequence = [];
            }
        });
    }

    addCorruptedElements() {
        // Добавляем скрытые ARG элементы в DOM
        const argElements = [
            this.createHiddenCode('/* SCP-████ - УРОВЕНЬ РЕАЛЬНОСТИ: 0.' + Math.floor(Math.random() * 9) + ' */'),
            this.createHiddenCode('// СЕКРЕТНЫЙ КЛЮЧ: ' + Math.random().toString(36).substr(2, 8).toUpperCase()),
            this.createHiddenCode('<!-- СВЯЗЬ С ОБЪЕКТОМ-Ω УСТАНОВЛЕНА -->')
        ];
        
        argElements.forEach(el => {
            document.body.appendChild(el);
        });
    }

    createHiddenCode(content) {
        const element = document.createElement('div');
        element.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0.01;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 1px;
            pointer-events: none;
            z-index: -1;
        `;
        element.textContent = content;
        return element;
    }

    triggerSpecialEvent(type) {
        switch(type) {
            case 'contain':
                this.triggerContainmentBreach();
                break;
            case 'help':
                this.showHelpMessage();
                break;
            default:
                this.triggerRealityShift();
        }
    }

    triggerContainmentBreach() {
        const breach = document.createElement('div');
        breach.className = 'containment-breach-effect';
        breach.innerHTML = `
            <div class="breach-message">
                <h2>НАРУШЕНИЕ СОДЕРЖАНИЯ УРОВНЯ 5</h2>
                <p>ВСЕ СИСТЕМЫ В АВАРИЙНОМ РЕЖИМЕ</p>
            </div>
        `;
        
        document.body.appendChild(breach);
        
        setTimeout(() => {
            document.body.removeChild(breach);
        }, 5000);
        
        logEvent("КРИТИЧЕСКОЕ НАРУШЕНИЕ СОДЕРЖАНИЯ!");
    }

    addEventListeners() {
        document.addEventListener('click', () => {
            this.infectionLevel += 0.5;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.995) {
                this.infectionLevel += 0.2;
                
                // Создаем частицы безумия при движении мыши
                if (this.infectionLevel > 30) {
                    this.createMadnessParticle(e.clientX, e.clientY);
                }
            }
        });
    }

    createMadnessParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'madness-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 2000);
    }

    startBasicEffects() {
        document.body.classList.add('reality-shift');
        this.applyFlickerEffects();
        this.applyGlitchEffects();
        this.zalgoEffect.start();
    }
}

export { AnomalyInfection };