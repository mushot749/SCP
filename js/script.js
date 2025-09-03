document.addEventListener("DOMContentLoaded", () => {
    // Инициализация системы
    import('./modules/init.js')
        .then(module => {
            module.initializeSystem();
        })
        .catch(error => {
            console.error("Ошибка загрузки модулей:", error);
            
            // Резервная инициализация при ошибке загрузки модулей
            setTimeout(() => {
                import('./modules/anomaly-core.js')
                    .then(anomalyModule => {
                        const anomaly = new anomalyModule.AnomalyInfection();
                        anomaly.startBasicEffects();
                    });
            }, 1000);
        });
});