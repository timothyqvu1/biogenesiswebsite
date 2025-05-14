document.addEventListener('DOMContentLoaded', function() {
    // Current Year in Footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMobile = document.querySelector('.nav-mobile');

    mobileMenuBtn.addEventListener('click', function() {
        navMobile.classList.toggle('active');

        // Change menu icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Mobile Navigation Close on Link Click
    const mobileNavLinks = document.querySelectorAll('.nav-mobile a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            // Validate form fields
            let isValid = true;

            if (!firstName) {
                document.getElementById('firstNameError').textContent = 'First name is required';
                isValid = false;
            }

            if (!lastName) {
                document.getElementById('lastNameError').textContent = 'Last name is required';
                isValid = false;
            }

            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }

            if (!message) {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            }

            if (isValid) {
                // Form data
                const formData = {
                    firstName,
                    lastName,
                    email,
                    company,
                    service,
                    message
                };

                // Simulate form submission
                submitContactForm(formData);
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Contact form submission handler
    function submitContactForm(formData) {
        // In a real application, you would send this data to a server
        // Here we'll simulate a successful submission

        // Show loading state on button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Show success message
            showToast('Message sent', 'Thank you for your message! We will get back to you soon.');
        }, 1500);
    }

    // Toast notification function
    function showToast(title, message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');

        // Set content
        toastTitle.textContent = title;
        toastMessage.textContent = message;

        // Set toast type styling
        toast.className = 'toast';
        if (type === 'error') {
            toast.classList.add('toast-error');
        } else if (type === 'success') {
            toast.classList.add('toast-success');
        }

        // Show toast
        toast.hidden = false;
        toast.classList.add('show');

        // Auto-hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.hidden = true;
            }, 300);
        }, 5000);
    }
});