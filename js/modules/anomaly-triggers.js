// anomaly-triggers.js
import { logEvent } from './utils.js';

export const setupAnomalyTriggers = () => {
    // Триггер по таймеру
    let anomalyTimer = setTimeout(() => triggerAnomalyEvent(), 30000);
    
    // Триггер по движению мыши в углах экрана
    document.addEventListener('mousemove', (e) => {
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
            anomalyTimer = setTimeout(() => triggerAnomalyEvent(), 60000);
        });
    });
    
    // Триггер по вводу секретных комбинаций
    let keySequence = [];
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        if (keySequence.length > 10) keySequence.shift();
        
        const sequences = [
            'scp', 'keter', 'contain', 'breach', 'xray',
            '7355608', '055', '173', '049', '096', '106', '682'
        ];
        
        const currentSequence = keySequence.join('');
        if (sequences.some(seq => currentSequence.includes(seq))) {
            triggerAnomalyEvent();
            keySequence = [];
        }
    });
};

export const triggerAnomalyEvent = (intensity = 0.3) => {
    if (window.isLightweightMode) {
        logEvent("ПРЕДУПРЕЖДЕНИЕ: АНОМАЛЬНЫЕ ЭФФЕКТЫ ОТКЛЮЧЕНЫ В ОБЛЕГЧЕННОМ РЕЖИМЕ");
        return;
    }
    
    if (!window.anomaly) return;
    
    window.anomaly.infectionLevel += intensity;
    logEvent(`АНОМАЛЬНАЯ АКТИВНОСТЬ: УРОВЕНЬ ${(intensity * 100).toFixed(0)}%`);
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