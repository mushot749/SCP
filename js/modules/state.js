// Глобальное состояние приложения
export let gridState = "three-per-row";
export let isColorMode = true;
export let systemUptime = 0;

export const setGridState = (state) => {
    gridState = state;
};

export const setIsColorMode = (mode) => {
    isColorMode = mode;
};

export const incrementUptime = () => {
    systemUptime++;
};

export const getUptime = () => {
    const hours = Math.floor(systemUptime / 3600);
    const minutes = Math.floor((systemUptime % 3600) / 60);
    const seconds = systemUptime % 60;
    
    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
};