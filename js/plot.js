document.addEventListener('DOMContentLoaded', function() {
    // Функция для обработки кликов по кнопкам спойлеров
    function setupSpoilerButtons() {
        const spoilerButtons = document.querySelectorAll('.spoiler-toggle');
        
        spoilerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const spoilerContent = this.nextElementSibling;
                
                if (spoilerContent && spoilerContent.classList.contains('spoiler-content')) {
                    const isHidden = spoilerContent.hidden;
                    spoilerContent.hidden = !isHidden;
                    
                    if (isHidden) {
                        this.querySelector('span').textContent = 'ЗАБЛОКИРОВАТЬ ДОСТУП';
                    } else {
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

    // Функция для аномального поведения шрифта Tataric внутри параграфов
    function setupTataricAnomaly() {
        const diaryContent = document.querySelector('.diary-content');
        if (!diaryContent) return;

        // Получаем все параграфы внутри diary-content
        const paragraphs = diaryContent.querySelectorAll('p');
        if (paragraphs.length === 0) return;

        // Функция для применения аномалии к случайным частям текста
        function applyTataricAnomaly() {
            paragraphs.forEach(paragraph => {
                // 30% шанс что параграф будет затронут аномалией
                if (Math.random() < 0.3) {
                    const text = paragraph.textContent;
                    const words = text.split(' ');
                    
                    // Выбираем случайные слова для изменения (1-3 слова)
                    const wordsToChange = Math.floor(Math.random() * 3) + 1;
                    const changedIndices = new Set();
                    
                    while (changedIndices.size < wordsToChange && changedIndices.size < words.length) {
                        changedIndices.add(Math.floor(Math.random() * words.length));
                    }
                    
                    // Создаем новый HTML с измененными словами
                    let newHTML = '';
                    words.forEach((word, index) => {
                        if (changedIndices.has(index)) {
                            newHTML += `<span class="tataric-anomaly" style="
                                font-family: 'Tataric', serif;
                                color: #8B0000;
                                text-shadow: 0 0 5px rgba(139, 0, 0, 0.4);
                                font-weight: bold;
                                letter-spacing: 1px;
                                transition: all 0.5s ease;
                            ">${word}</span> `;
                        } else {
                            newHTML += word + ' ';
                        }
                    });
                    
                    paragraph.innerHTML = newHTML;
                    
                    // Автоматическое восстановление через случайное время
                    setTimeout(() => {
                        paragraph.textContent = text;
                    }, Math.random() * 5000 + 2000); // 2-7 секунд
                }
            });
        }

        // Функция для аномалии при наведении
        function setupHoverAnomaly() {
            paragraphs.forEach(paragraph => {
                paragraph.addEventListener('mouseover', function(e) {
                    if (e.target.tagName === 'SPAN' && e.target.classList.contains('tataric-anomaly')) return;
                    
                    // 20% шанс при наведении
                    if (Math.random() < 0.2) {
                        const rect = paragraph.getBoundingClientRect();
                        const mouseX = e.clientX - rect.left;
                        const mouseY = e.clientY - rect.top;
                        
                        // Находим ближайшее слово к курсору
                        const text = paragraph.textContent;
                        const words = text.split(' ');
                        const charPosition = Math.floor((mouseX / rect.width) * text.length);
                        
                        let currentPos = 0;
                        let targetWordIndex = -1;
                        
                        for (let i = 0; i < words.length; i++) {
                            currentPos += words[i].length + 1;
                            if (currentPos > charPosition) {
                                targetWordIndex = i;
                                break;
                            }
                        }
                        
                        if (targetWordIndex !== -1) {
                            const newWords = [...words];
                            newWords[targetWordIndex] = `<span class="tataric-anomaly" style="
                                font-family: 'Tataric', serif;
                                color: #8B0000;
                                text-shadow: 0 0 5px rgba(139, 0, 0, 0.4);
                                font-weight: bold;
                                letter-spacing: 1px;
                            ">${words[targetWordIndex]}</span>`;
                            
                            paragraph.innerHTML = newWords.join(' ');
                            
                            // Восстановление через 2 секунды
                            setTimeout(() => {
                                paragraph.textContent = text;
                            }, 2000);
                        }
                    }
                });
            });
        }

        // Запускаем аномалию периодически
        setInterval(applyTataricAnomaly, 10000); // Каждые 10 секунд
        
        // Настраиваем аномалию при наведении
        setupHoverAnomaly();
        
        // Первая аномалия при загрузке
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
