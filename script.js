document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. STICKY HEADER GLASSMORPHISM & SHADOW --- */
    const header = document.getElementById('header');

    const handleScrollHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScrollHeader);


    /* --- 2. MOBILE MENU HAMBURGER INTERACTION --- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    /* --- 3. SCROLL REVEAL (INTERSECTION OBSERVER) --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Efek animasi berulang saat di-scroll naik/turun
                entry.target.classList.remove('active');
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));


    /* --- 4. ANIMASI PROGRESS BAR PORTOFOLIO --- */
    const progressBars = document.querySelectorAll('.progress');

    const progressObserverOptions = {
        threshold: 0.3
    };

    const animateProgress = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-target');
                entry.target.style.width = targetWidth + '%';
            } else {
                // Mereset progress bar ke 0% saat keluar dari layar
                entry.target.style.width = '0%';
            }
        });
    }, progressObserverOptions);

    progressBars.forEach(bar => animateProgress.observe(bar));


    /* --- 5. RIPPLE EFFECT PADA TOMBOL --- */
    const rippleButtons = document.querySelectorAll('.ripple-btn');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            const rect = this.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(circle);
        });
    });

});
