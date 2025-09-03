document.addEventListener("DOMContentLoaded", () => {
    // Инициализация системы
    import('./modules/init.js')
        .then(module => {
            module.initializeSystem();
        })
        .catch(error => {
            console.error("Ошибка загрузки модулей:", error);
        });
});