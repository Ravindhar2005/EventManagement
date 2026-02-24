document.addEventListener('DOMContentLoaded', () => {
    function animateHero() {
        const hero = document.querySelector('.hero');
        const heroP = document.querySelector('.hero p');

        // Initial state
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(50px)';
        heroP.style.opacity = '0';
        heroP.style.transform = 'translateY(50px)';

        // Animate after a short delay
        setTimeout(() => {
            hero.style.transition = 'opacity 2s ease-in, transform 2s ease-in';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';

            setTimeout(() => {
                heroP.style.transition = 'opacity 2s ease-in, transform 2s ease-in';
                heroP.style.opacity = '1';
                heroP.style.transform = 'translateY(0)';
            }, 500);
        }, 100);
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            animateHero();
        }
    });

    // Also trigger on initial load if visible
    if (!document.hidden) {
        animateHero();
    }

     // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

    const bookingForm = document.getElementById('bookingFormElement');
    const successMessage = document.getElementById('success-message');

    if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const booking = {
            id: Date.now(),
            eventType: document.getElementById('event-type').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value,
            submittedAt: new Date().toLocaleString()
        };

        fetch("http://localhost:5000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            alert("Booking saved successfully!");
            bookingForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Error saving booking");
        });
    });
}
    // Handle "Send us a Message" contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const message = {
                id: Date.now(),
                name: contactForm.querySelector('input[placeholder="Your Name"]').value,
                email: contactForm.querySelector('input[placeholder="Your Email"]').value,
                phone: contactForm.querySelector('input[placeholder="Your Phone"]').value || 'N/A',
                messageText: contactForm.querySelector('textarea[placeholder="Your Message"]').value,
                submittedAt: new Date().toLocaleString()
            };

            // Get existing messages from localStorage
            let messages = JSON.parse(localStorage.getItem('messages')) || [];

            // Add new message
            messages.push(message);

            // Save back to localStorage
            localStorage.setItem('messages', JSON.stringify(messages));

            // Show success message
            alert('✓ Message submitted successfully!');

            // Reset form
            contactForm.reset();
        });
    }
});

