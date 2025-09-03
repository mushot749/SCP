import { getDOMElements } from './constants.js';

// Утилиты и вспомогательные функции
export const updateTime = () => {
    const { timeDisplay } = getDOMElements();
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    
    if (timeDisplay) {
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    return `${hours}:${minutes}:${seconds}`;
};

export const logEvent = (message) => {
    const { logContent, timeDisplay } = getDOMElements();
    const timestamp = timeDisplay ? timeDisplay.textContent : updateTime();
    
    if (logContent) {
        logContent.innerHTML = `> [${timestamp}] ${message}<br>` + logContent.innerHTML;
        
        // Limit log length
        if (logContent.children.length > 50) {
            logContent.removeChild(logContent.lastChild);
        }
        
        logContent.scrollTop = 0;
    }
};

export const randomizeScanLines = () => {
    const { scanLines } = getDOMElements();
    
    scanLines.forEach((scanLine) => {
        const duration = 4 + Math.random() * 8;
        scanLine.style.animationDuration = `${duration}s`;

        const density = 2 + Math.random() * 6;
        scanLine.style.backgroundSize = `100% ${density}px`;

        scanLine.style.animationDelay = `-${Math.random() * 10}s`;
    });
};