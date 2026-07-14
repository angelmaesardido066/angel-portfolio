document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Typing Animation ---
    const words = ["Administrative Assistant", "Tech-Savvy Student", "Fast Learner", "Problem Solver"];
    let i = 0;
    let timer;
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newWordDelay = 2000;
    const targetSpan = document.querySelector(".typing-text");

    function type() {
        // Clear word interval and start character-by-character animation
        let word = words[i];
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < word.length) {
                targetSpan.textContent += word.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                setTimeout(erase, newWordDelay);
            }
        }
        typeChar();
    }

    function erase() {
        let word = words[i];
        let charIndex = word.length;
        
        function eraseChar() {
            if (charIndex > 0) {
                targetSpan.textContent = word.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseChar, erasingSpeed);
            } else {
                i = (i + 1) % words.length;
                setTimeout(type, 300);
            }
        }
        eraseChar();
    }

    // Start type animation
    if (targetSpan) {
        setTimeout(type, 1000);
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-icon');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            // Update menu icon attribute
            if (isOpen) {
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // re-render icon
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll-to-Section Click Handler & Active State Link Updater ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll configuration with offsets
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Special case for triggering progress bars in active sections
                if (entry.target.classList.contains('profile-section')) {
                    entry.target.classList.add('active');
                }
            }
        });
    }, scrollObserverOptions);

    animatedElements.forEach(el => sectionObserver.observe(el));
    // Also observe profile-section for triggering progress animations
    const profileSec = document.querySelector('.profile-section');
    if (profileSec) sectionObserver.observe(profileSec);

    // --- Active Nav Link tracking on scroll ---
    const activeLinkObserverOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
    };

    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, activeLinkObserverOptions);

    sections.forEach(section => activeLinkObserver.observe(section));
});
