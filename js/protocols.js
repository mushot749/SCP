// protocols.js - Скрипты для страницы протоколов SCP Foundation

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация функционала
    initSmoothScroll();
    initScrollHighlight();
    initBackToTop();
    initAdditionalFeatures();
});

// Плавная прокрутка к разделам
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.scp-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Подсветка текущего раздела при скролле
function initScrollHighlight() {
    const sections = document.querySelectorAll('.rule-section');
    const navLinks = document.querySelectorAll('.scp-header nav a');

    function setActiveSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.scp-header nav a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    sections.forEach((section, index) => {
        section.id = `section-${index + 1}`;
    });

    window.addEventListener('scroll', setActiveSection);
    setActiveSection();
}

// Кнопка "Наверх"
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '▲';
    backToTopButton.setAttribute('aria-label', 'Вернуться к началу');
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
}

// Быстрая навигация по разделам с аккордеоном
function initAdditionalFeatures() {
    const quickNav = document.createElement('div');
    quickNav.classList.add('quick-nav');

    const sections = document.querySelectorAll('.rule-section');
    let navHTML = `
        <button class="quick-nav-toggle" aria-expanded="true">
            <span>БЫСТРАЯ НАВИГАЦИЯ</span>
            <span class="toggle-icon">▼</span>
        </button>
        <ul class="quick-nav-list open">
    `;

    sections.forEach((section, index) => {
        const title = section.querySelector('h2').textContent;
        navHTML += `<li><a href="#section-${index + 1}">${title}</a></li>`;
    });

    navHTML += '</ul>';
    quickNav.innerHTML = navHTML;

    const titleContainer = document.querySelector('.title-container');
    if (titleContainer) {
        titleContainer.parentNode.insertBefore(quickNav, titleContainer.nextSibling);
    }

    // Добавляем обработчик клика для аккордеона
    const toggleButton = quickNav.querySelector('.quick-nav-toggle');
    const navList = quickNav.querySelector('.quick-nav-list');

    toggleButton.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('open');

        // Поворачиваем иконку
        const icon = this.querySelector('.toggle-icon');
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Закрываем аккордеон при клике на ссылку (на мобильных)
    navList.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            navList.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.querySelector('.toggle-icon').style.transform = 'rotate(0deg)';
        }
    });

    // === КНОПКА "НАВЕРХ" ===
    initBackToTop();

    // === ФУНКЦИЯ КНОПКИ "НАВЕРХ" ===
    function initBackToTop() {
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '▲';
        backToTopButton.setAttribute('aria-label', 'Вернуться к началу');
        backToTopButton.classList.add('back-to-top');
        document.body.appendChild(backToTopButton);

        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();
    }
}