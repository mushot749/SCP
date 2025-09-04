// navigation.js
import { getDOMElements } from './constants.js';
import { logEvent } from './utils.js';

export const setupNavigationAccess = () => {
    const { navLinks } = getDOMElements();
    
    if (!navLinks) return;

    // Обработка обычных навигационных ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const accessLevel = parseInt(link.getAttribute('data-access') || '1');
            const userAccess = getUserAccessLevel(); // Получаем уровень доступа пользователя
            
            if (accessLevel > userAccess) {
                logEvent(`ОШИБКА ДОСТУПА: ТРЕБУЕТСЯ УРОВЕНЬ ${accessLevel}`);
                showAccessDenied(accessLevel);
            } else {
                // Здесь можно добавить логику перехода по ссылкам
                logEvent(`ДОСТУП РАЗРЕШЕН: ${link.textContent}`);
                handleNavigation(link);
            }
        });
    });

    // Обработка кнопки аварийного режима в навигации
    const emergencyBtn = document.getElementById('nav-emergency-protocol');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const accessLevel = parseInt(emergencyBtn.getAttribute('data-access') || '4');
            const userAccess = getUserAccessLevel();
            
            if (accessLevel > userAccess) {
                logEvent(`ОШИБКА ДОСТУПА: ДЛЯ АВАРИЙНОГО ПРОТОКОЛА ТРЕБУЕТСЯ УРОВЕНЬ ${accessLevel}`);
                showAccessDenied(accessLevel);
                return;
            }
            
            // Если доступ есть, активируем аварийный режим
            if (window.emergencyMode) {
                window.emergencyMode.toggleEmergencyMode();
            } else {
                logEvent("ОШИБКА: СИСТЕМА АВАРИЙНОГО РЕЖИМА НЕ ЗАГРУЖЕНА");
            }
        });
    }

    // Обновляем отображение уровня доступа в панели
    updateAccessPanel();
};

// Функция для получения уровня доступа пользователя
const getUserAccessLevel = () => {
    // Можно сделать динамическим, например из localStorage или сервера
    // По умолчанию уровень 2 для обычных сотрудников
    return parseInt(localStorage.getItem('userAccessLevel') || '2');
};

// Функция для обработки навигации
const handleNavigation = (link) => {
    const linkId = link.textContent.trim();
    
    switch(linkId) {
        case 'SCP-█████':
            logEvent("ЗАГРУЗКА ДОСЬЕ SCP-█████...");
            simulateLoading('SCP_DOSSIER');
            break;
            
        case 'ОТЧЁТ 001-Ω':
            logEvent("ДОСТУП К ЗАСЕКРЕЧЕННЫМ ОТЧЕТАМ...");
            simulateLoading('CLASSIFIED_REPORTS');
            break;
            
        case 'ПРОТОКОЛЫ':
            logEvent("ПРОСМОТР ПРОТОКОЛОВ СОДЕРЖАНИЯ...");
            simulateLoading('CONTAINMENT_PROTOCOLS');
            break;
            
        case 'АРХИВ Ω':
            logEvent("ДОСТУП К АРХИВАМ УРОВНЯ Ω...");
            simulateLoading('OMEGA_ARCHIVES');
            break;
            
        case 'ИНСТРУКТАЖ':
            logEvent("ЗАГРУЗКА ПРОЦЕДУР БЕЗОПАСНОСТИ...");
            simulateLoading('SAFETY_BRIEFING');
            break;
            
        default:
            logEvent(`НАВИГАЦИЯ: ${linkId}`);
    }
};

// Функция для симуляции загрузки контента
const simulateLoading = (contentType) => {
    const loadingMessages = {
        'SCP_DOSSIER': [
            "ДЕШИФРОВКА ДАННЫХ SCP...",
            "ЗАГРУЗКА МЕДИЦИНСКИХ ОТЧЕТОВ...",
            "АНАЛИЗ ИНЦИДЕНТОВ СОДЕРЖАНИЯ..."
        ],
        'CLASSIFIED_REPORTS': [
            "ПРОВЕРКА УРОВНЯ ДОСТУПА...",
            "ДЕШИФРОВКА ЗАЩИЩЕННЫХ ФАЙЛОВ...",
            "ЗАГРУЗКА ОТЧЕТОВ УРОВНЯ Ω..."
        ],
        'CONTAINMENT_PROTOCOLS': [
            "ОБНОВЛЕНИЕ БАЗЫ ПРОТОКОЛОВ...",
            "ПРОВЕРКА АКТУАЛЬНОСТИ ПРОЦЕДУР...",
            "ЗАГРУЗКА ЭКСТРЕННЫХ ПРОТОКОЛОВ..."
        ],
        'OMEGA_ARCHIVES': [
            "ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ АРХИВА...",
            "ПРОВЕРКА ЦЕЛОСТНОСТИ ДАННЫХ...",
            "ЗАГРУЗКА ИСТОРИЧЕСКИХ ЗАПИСЕЙ..."
        ],
        'SAFETY_BRIEFING': [
            "ОБНОВЛЕНИЕ ПРОЦЕДУР БЕЗОПАСНОСТИ...",
            "ЗАГРУЗКА ВИДЕОИНСТРУКТАЖЕЙ...",
            "ПОДГОТОВКА ТЕСТОВЫХ СЦЕНАРИЕВ..."
        ]
    };

    const messages = loadingMessages[contentType] || [
        "ОБРАБОТКА ЗАПРОСА...",
        "ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ...",
        "ЗАГРУЗКА КОНТЕНТА..."
    ];

    // Симуляция процесса загрузки
    messages.forEach((message, index) => {
        setTimeout(() => {
            logEvent(message);
            
            // Последнее сообщение с завершением
            if (index === messages.length - 1) {
                setTimeout(() => {
                    logEvent(`${contentType.replace('_', ' ')}: ЗАГРУЗКА ЗАВЕРШЕНА`);
                    showAccessGranted();
                }, 500);
            }
        }, index * 800);
    });
};

// Функция для отображения отказа в доступе
const showAccessDenied = (requiredLevel) => {
    const denied = document.createElement('div');
    denied.className = 'access-denied-overlay';
    denied.innerHTML = `
        <div class="access-denied-modal">
            <div class="access-denied-header">
                <span class="access-icon">🔒</span>
                <span class="access-title">ДОСТУП ЗАПРЕЩЕН</span>
            </div>
            <div class="access-denied-content">
                <p>ТРЕБУЕТСЯ УРОВЕНЬ ДОСТУПА: ${requiredLevel}</p>
                <p>ВАШ УРОВЕНЬ: ${getUserAccessLevel()}</p>
                <p class="access-warning">НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП БУДЕТ ЗАФИКСИРОВАН</p>
            </div>
            <div class="access-denied-footer">
                <span class="security-notice">SCP SECURITY SYSTEM</span>
            </div>
        </div>
    `;
    
    denied.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Share Tech Mono', monospace;
    `;
    
    document.body.appendChild(denied);
    
    // Добавляем стили для модального окна
    const style = document.createElement('style');
    style.textContent = `
        .access-denied-modal {
            background: linear-gradient(135deg, #2a0000 0%, #1a0000 100%);
            border: 3px solid #ff0000;
            padding: 30px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
            animation: accessDeniedPulse 2s infinite;
        }
        
        .access-denied-header {
            margin-bottom: 20px;
        }
        
        .access-icon {
            font-size: 48px;
            display: block;
            margin-bottom: 10px;
        }
        
        .access-title {
            font-size: 28px;
            color: #ff0000;
            text-transform: uppercase;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
        }
        
        .access-denied-content {
            margin-bottom: 20px;
        }
        
        .access-denied-content p {
            margin: 10px 0;
            color: #fff;
            font-size: 18px;
        }
        
        .access-warning {
            color: #ff6b6b !important;
            font-size: 14px !important;
            margin-top: 20px !important;
        }
        
        .access-denied-footer {
            border-top: 1px solid #ff0000;
            padding-top: 15px;
        }
        
        .security-notice {
            color: #ff6b6b;
            font-size: 12px;
        }
        
        @keyframes accessDeniedPulse {
            0%, 100% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.5); }
            50% { box-shadow: 0 0 50px rgba(255, 0, 0, 0.8); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        denied.remove();
        style.remove();
    }, 3000);
};

// Функция для отображения успешного доступа
const showAccessGranted = () => {
    const granted = document.createElement('div');
    granted.className = 'access-granted-overlay';
    granted.textContent = 'ДОСТУП РАЗРЕШЕН';
    granted.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 0, 0.9);
        color: #000;
        padding: 20px 40px;
        border: 3px solid #00ff00;
        z-index: 10000;
        font-family: 'Share Tech Mono', monospace;
        font-size: 24px;
        font-weight: bold;
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        animation: accessGrantedPulse 1s infinite;
    `;
    
    document.body.appendChild(granted);
    
    setTimeout(() => {
        granted.remove();
    }, 1500);
};

// Функция для обновления панели доступа
const updateAccessPanel = () => {
    const accessLevelSpan = document.querySelector('.access-level');
    const userIdSpan = document.querySelector('.user-id');
    const userAccess = getUserAccessLevel();
    
    if (accessLevelSpan) {
        // Маскируем уровень доступа в зависимости от самого уровня
        const maskedLevel = userAccess >= 3 ? '██' : `УРОВЕНЬ ${userAccess}`;
        accessLevelSpan.textContent = `Уровень доступа: ${maskedLevel}`;
    }
    
    if (userIdSpan) {
        // Случайный ID субъекта
        const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        userIdSpan.textContent = `Субъект ${randomId}`;
    }
};

// Функция для установки уровня доступа (для тестирования)
export const setUserAccessLevel = (level) => {
    localStorage.setItem('userAccessLevel', level.toString());
    updateAccessPanel();
    logEvent(`УРОВЕНЬ ДОСТУПА ИЗМЕНЕН: ${level}`);
};

// Функция для получения текущего уровня доступа
export const getCurrentAccessLevel = () => {
    return getUserAccessLevel();
};