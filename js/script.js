// script.js
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add('lightweight-mode');
    window.isLightweightMode = true;
    
    // Загружаем основные модули
    import('./modules/init.js')
        .then(module => {
            module.initializeSystem();
        })
        .catch(error => {
            console.error("Ошибка загрузки модулей:", error);
            
            // Резервная инициализация
            const logContent = document.getElementById('log-content');
            if (logContent) {
                logContent.innerHTML += '> [ERROR] МОДУЛИ НЕ ЗАГРУЖЕНЫ<br>';
                logContent.innerHTML += '> [WARNING] АКТИВИРОВАН РЕЗЕРВНЫЙ РЕЖИМ<br>';
            }
        });
});