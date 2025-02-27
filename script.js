document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuBtn = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const workItems = document.querySelectorAll('.work-item');
    const processSteps = document.querySelectorAll('.process-step');
    const contactForm = document.getElementById('contact-form');

    // Navigation Functions
    function setActiveSection(sectionId) {
        // Remove active class from all sections and links
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current section and link
        const currentSection = document.getElementById(sectionId);
        const currentLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (currentSection) currentSection.classList.add('active');
        if (currentLink) currentLink.classList.add('active');
    }

    // Event Listeners
    // Menu Toggle
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBtn.textContent = mainNav.classList.contains('active') ? 'Close' : 'Menu';
        });
    }

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            setActiveSection(sectionId);

            // Close menu on mobile
            if (mainNav) {
                mainNav.classList.remove('active');
                menuBtn.textContent = 'Menu';
            }

            // Smooth scroll to section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Skills Animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const parentBar = progressBar.parentElement;
                if (parentBar && parentBar.hasAttribute('data-progress')) {
                    progressBar.style.width = parentBar.getAttribute('data-progress') + '%';
                }
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Process Steps Animation
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        processObserver.observe(step);
    });

    // Work Items Hover Effect
    workItems.forEach(item => {
        const overlay = item.querySelector('.work-overlay');
        if (overlay) {
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Set initial active section
    setActiveSection('about');
});
