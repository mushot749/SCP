// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Функция для обработки кликов по кнопкам спойлеров
    function setupSpoilerButtons() {
        // Находим все кнопки с классом spoiler-toggle
        const spoilerButtons = document.querySelectorAll('.spoiler-toggle');
        
        // Добавляем обработчик для каждой кнопки
        spoilerButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Находим следующий элемент с классом spoiler-content
                const spoilerContent = this.nextElementSibling;
                
                // Проверяем, является ли следующий элемент спойлером
                if (spoilerContent && spoilerContent.classList.contains('spoiler-content')) {
                    // Переключаем видимость спойлера
                    const isHidden = spoilerContent.hidden;
                    spoilerContent.hidden = !isHidden;
                    
                    // Обновляем текст кнопки
                    if (isHidden) {
                        this.querySelector('span').textContent = 'ЗАБЛОКИРОВАТЬ ДОСТУП';
                    } else {
                        // Восстанавливаем оригинальный текст в зависимости от класса кнопки
                        if (this.classList.contains('main-spoiler')) {
                            this.querySelector('span').textContent = 'РАЗБЛОКИРОВАТЬ ДОСТУП К ОТЧЁТУ 001-Ω';
                        } else {
                            this.querySelector('span').textContent = 'ПРИЛОЖЕНИЕ SCP-█████.1: ОБНАРУЖЕННЫЙ ДНЕВНИК (РАЗБЛОКИРОВАТЬ?)';
                        }
                    }
                }
            });
        });
    }

    // Функция для аномального поведения шрифта Tataric
    function setupTataricAnomaly() {
        const diaryContent = document.querySelector('.diary-content');
        if (!diaryContent) return;

        // Элементы, к которым будет применяться аномалия
        const dateElements = diaryContent.querySelectorAll('span[class^="date-"]');
        if (dateElements.length === 0) return;

        // Переменная для отслеживания активности аномалии
        let anomalyActive = false;
        
        // Функция для случайного применения шрифта Tataric
        function applyTataricAnomaly() {
            if (anomalyActive) return;
            anomalyActive = true;

            // Случайный шанс 20% для активации аномалии
            if (Math.random() < 0.2) {
                // Выбираем случайный элемент
                const randomElement = dateElements[Math.floor(Math.random() * dateElements.length)];
                
                // Сохраняем оригинальные стили
                const originalStyles = {
                    fontFamily: randomElement.style.fontFamily,
                    textTransform: randomElement.style.textTransform,
                    color: randomElement.style.color,
                    textShadow: randomElement.style.textShadow,
                    fontWeight: randomElement.style.fontWeight
                };

                // Применяем Tataric шрифт с аномальными эффектами
                randomElement.style.fontFamily = 'Tataric, serif';
                randomElement.style.textTransform = 'uppercase';
                randomElement.style.color = '#8B0000';
                randomElement.style.textShadow = '0 0 8px rgba(139, 0, 0, 0.6)';
                randomElement.style.fontWeight = 'bold';
                randomElement.style.letterSpacing = '2px';
                
                // Добавляем класс для визуальных эффектов
                randomElement.classList.add('anomaly-active');

                // Создаем эффект мерцания
                let flickerCount = 0;
                const flickerInterval = setInterval(() => {
                    if (flickerCount < 5) {
                        randomElement.style.opacity = Math.random() > 0.5 ? '1' : '0.7';
                        flickerCount++;
                    } else {
                        clearInterval(flickerInterval);
                        randomElement.style.opacity = '1';
                    }
                }, 100);

                // Восстанавливаем через случайное время
                setTimeout(() => {
                    // Плавное восстановление
                    randomElement.style.transition = 'all 1s ease';
                    randomElement.style.fontFamily = originalStyles.fontFamily || '';
                    randomElement.style.textTransform = originalStyles.textTransform || '';
                    randomElement.style.color = originalStyles.color || '';
                    randomElement.style.textShadow = originalStyles.textShadow || '';
                    randomElement.style.fontWeight = originalStyles.fontWeight || '';
                    randomElement.style.letterSpacing = '';
                    randomElement.classList.remove('anomaly-active');

                    // Убираем transition после восстановления
                    setTimeout(() => {
                        randomElement.style.transition = '';
                        anomalyActive = false;
                    }, 1000);
                }, Math.random() * 4000 + 2000); // 2-6 секунд
            } else {
                anomalyActive = false;
            }
        }

        // Запускаем аномалию периодически
        setInterval(applyTataricAnomaly, 8000); // Каждые 8 секунд

        // Также запускаем при наведении на элементы
        dateElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                // 30% шанс при наведении
                if (Math.random() < 0.3 && !this.classList.contains('anomaly-active')) {
                    const originalColor = this.style.color;
                    
                    this.style.fontFamily = 'Tataric, serif';
                    this.style.textTransform = 'uppercase';
                    this.style.color = '#8B0000';
                    this.style.textShadow = '0 0 5px rgba(139, 0, 0, 0.4)';
                    this.classList.add('anomaly-active');

                    // Восстанавливаем при уходе мыши
                    this.addEventListener('mouseleave', function restoreOnLeave() {
                        this.style.fontFamily = '';
                        this.style.textTransform = '';
                        this.style.color = originalColor;
                        this.style.textShadow = '';
                        this.classList.remove('anomaly-active');
                        this.removeEventListener('mouseleave', restoreOnLeave);
                    }, { once: true });
                }
            });
        });

        // Аномалия при загрузке страницы
        setTimeout(applyTataricAnomaly, 3000);
    }

    // Функция для добавления случайных glitch эффектов
    function setupGlitchEffects() {
        const headers = document.querySelectorAll('h2, h3, .main-title');
        
        headers.forEach(header => {
            header.addEventListener('mouseenter', function() {
                // 10% шанс glitch эффекта
                if (Math.random() < 0.1) {
                    const originalText = this.textContent;
                    const glitchText = originalText.split('').map(char => 
                        Math.random() > 0.8 ? '█' : char
                    ).join('');
                    
                    this.textContent = glitchText;
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 200);
                }
            });
        });
    }

    // Инициализируем все функции
    function init() {
        setupSpoilerButtons();
        setupTataricAnomaly();
        setupGlitchEffects();
    }

    // Запускаем инициализацию
    init();
});