/**
 * THEFREZ ENGINE 3.5
 * Features: Magnetic Physics, Dynamic Glow, Real-time Dublin Clock
 */

document.addEventListener('DOMContentLoaded', () => {
    const glow = document.getElementById('cursorGlow');
    const timeEl = document.getElementById('localTime');
    const magneticItems = document.querySelectorAll('.js-magnetic');

    // --- 1. ТРЕКИНГ МЫШИ (GLOW И МАГНИТ) ---
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        // Плавное следование свечения за курсором
        if (glow) {
            glow.style.left = `${clientX}px`;
            glow.style.top = `${clientY}px`;
        }

        // Логика магнитного притяжения для кнопок
        magneticItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            const distance = Math.hypot(deltaX, deltaY);

            // Радиус срабатывания магнита (120px)
            if (distance < 120) {
                // Плавное смещение (коэффициент 0.15 для мягкости)
                item.style.transform = `translate(${deltaX * 0.15}px, ${deltaY * 0.15}px)`;
            } else {
                // Возврат в исходное положение
                item.style.transform = `translate(0, 0)`;
            }
        });
    });

    // --- 2. ЧАСЫ (ДУБЛИН, ИРЛАНДИЯ) ---
    function updateLocalTime() {
        const now = new Date();
        const options = { 
            timeZone: 'Europe/Dublin', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        };
        
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('en-GB', options);
        }
    }

    // Запуск часов
    setInterval(updateLocalTime, 1000);
    updateLocalTime();

    // --- 3. FIX: ПРЕДОТВРАЩЕНИЕ ГЛИТЧЕЙ АНИМАЦИИ ---
    // Если по какой-то причине CSS анимация не сработала, принудительно показываем контент
    setTimeout(() => {
        document.querySelectorAll('.animate-item').forEach(el => {
            el.style.opacity = "1";
        });
    }, 2000);
});