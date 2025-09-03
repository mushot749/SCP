import { logEvent } from './utils.js';

// Навигация и управление доступом
export const setupNavigationAccess = () => {
    const navLinks = document.querySelectorAll(".scp-header nav a");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const accessLevel = parseInt(link.getAttribute("data-access"));
            const userAccess = 2; // Текущий уровень доступа пользователя
            
            if (accessLevel > userAccess) {
                e.preventDefault();
                logEvent(`ОТКАЗАНО В ДОСТУПЕ: Требуется уровень ${accessLevel}`);
                
                // Эффект отказа в доступе
                link.classList.add("restricted");
                setTimeout(() => {
                    link.classList.remove("restricted");
                }, 1000);
            }
        });
    });
    
    // Симуляция загрузки контента в зависимости от уровня доступа
    simulateContentLoading();
};

const simulateContentLoading = () => {
    setTimeout(() => {
        logEvent("ЗАГРУЗКА ДАННЫХ ОБЪЕКТА ФОНДА...");
        setTimeout(() => {
            logEvent("ДОСТУП К ОТЧЁТУ 001-Ω: ТРЕБУЕТСЯ УРОВЕНЬ 3");
            setTimeout(() => {
                logEvent("ПРОТОКОЛЫ ДОСТУПНЫ ДЛЯ УРОВНЯ 2+");
                setTimeout(() => {
                    logEvent("БАЗА ДАННЫХ ПЕРСОНАЛА: ЗАГРУЗКА...");
                }, 1500);
            }, 1500);
        }, 1500);
    }, 3000);
};