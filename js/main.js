// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        const isClickInsideNav = navLinks.contains(e.target) || (mobileMenuBtn && mobileMenuBtn.contains(e.target));
        if (!isClickInsideNav) {
            navLinks.classList.remove('active');
        }
    }
});

// ==============================
// Form Submission with Inline Messages
// ==============================

function setupForm(formId, messageElementId) {
    const form = document.getElementById(formId);
    const messageEl = document.getElementById(messageElementId);

    if (!form || !messageEl) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset previous messages
        messageEl.className = 'form-message';
        messageEl.style.display = 'none';

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                messageEl.textContent = 'Thank you! Your submission was successful.';
                messageEl.className = 'form-message success';
                form.reset();
            } else {
                messageEl.textContent = 'Something went wrong. Please try again.';
                messageEl.className = 'form-message error';
            }
        } catch (error) {
            messageEl.textContent = 'Failed to connect. Please check your internet.';
            messageEl.className = 'form-message error';
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            messageEl.style.display = 'block';
        }
    });
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupForm('contactForm', 'contactMessage');
    setupForm('registerForm', 'registerMessage');
});


// // Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
        
//         // Close mobile menu if open
//         const navLinks = document.querySelector('.nav-links');
//         if (navLinks.classList.contains('active')) {
//             navLinks.classList.remove('active');
//         }
        
//         const targetId = this.getAttribute('href');
//         const targetElement = document.querySelector(targetId);
        
//         if (targetElement) {
//             window.scrollTo({
//                 top: targetElement.offsetTop - 80,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });

// // Mobile menu toggle
// const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
// const navLinks = document.querySelector('.nav-links');

// if (mobileMenuBtn) {
//     mobileMenuBtn.addEventListener('click', () => {
//         navLinks.classList.toggle('active');
//     });
// }

// // Form submission handling
// const contactForm = document.getElementById('contactForm');
// const registerForm = document.getElementById('registerForm');

// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert('Thank you for your message! We will contact you shortly.');
//         contactForm.reset();
//     });
// }

// if (registerForm) {
//     registerForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert('Thank you for your application! We will review your details and contact you soon.');
//         registerForm.reset();
//     });
// }

// // Close mobile menu when clicking outside
// document.addEventListener('click', (e) => {
//     if (navLinks.classList.contains('active')) {
//         const isClickInsideNav = navLinks.contains(e.target) || mobileMenuBtn.contains(e.target);
//         if (!isClickInsideNav) {
//             navLinks.classList.remove('active');
//         }
//     }
// });