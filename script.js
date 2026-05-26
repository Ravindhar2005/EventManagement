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

    let heroAnimated = false;

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !heroAnimated) {
            animateHero();
            heroAnimated = true;
        }
    });
    /*document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            animateHero();
        }
    });*/

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

    function getApiBaseUrl() {
        if (window.location.protocol === 'file:') {
            return 'http://localhost:5000';
        }
        if (window.location.hostname === 'localhost' && (window.location.port === '' || window.location.port === '5000')) {
            return '';
        }
        return 'http://localhost:5000';
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const booking = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                event_type: document.getElementById('event-type').value,
                event_date: document.getElementById('date').value,
                event_time: document.getElementById('time').value,
                message: document.getElementById('message').value
            };

            const baseUrl = getApiBaseUrl();
            const url = baseUrl + '/book';
            console.log('sending booking to', url, booking);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then(data => {
                alert('Booking saved successfully!');
                bookingForm.reset();
            })
            .catch(err => {
                console.error(err);
                alert('Error saving booking: ' + err.message);
            });
        });
    }

    const contactFormElement = document.getElementById('contactFormElement');
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', function (e) {
            e.preventDefault();

            const contactData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                message: document.getElementById('contact-message').value
            };

            const baseUrl = getApiBaseUrl();
            const url = baseUrl + '/contact';
            console.log('sending contact message to', url, contactData);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then(data => {
                alert('Message sent successfully! We will contact you soon.');
                contactFormElement.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending message: ' + error.message);
            });
        });
    }

    // Gallery management (images stored in localStorage so clients/admins can add)
    const gallerySection = document.getElementById('gallery');
    const photoForm = document.getElementById('photoForm');
    if (gallerySection) {
        function renderGallery() {
            console.log('renderGallery called');
            gallerySection.innerHTML = '';
            const pics = JSON.parse(localStorage.getItem('galleryImages')) || [];
            console.log('current pics', pics);
            pics.forEach((url, idx) => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.innerHTML = `<img src="${url}" alt="event photo"><h3>Photo ${idx + 1}</h3>`;
                gallerySection.appendChild(div);
            });
        }
        renderGallery();

        if (photoForm) {
            photoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const urlInput = document.getElementById('photo-url');
                const url = urlInput.value.trim();
                console.log('adding url', url);
                if (!url) return;
                const pics = JSON.parse(localStorage.getItem('galleryImages')) || [];
                pics.push(url);
                localStorage.setItem('galleryImages', JSON.stringify(pics));
                urlInput.value = '';
                document.getElementById('upload-message').style.display = 'block';
                setTimeout(() => document.getElementById('upload-message').style.display = 'none', 2000);
                renderGallery();
            });
        }

        // Contact Form Handler
        const contactFormElement = document.getElementById('contactFormElement');
        if (contactFormElement) {
            contactFormElement.addEventListener('submit', function(e) {
                e.preventDefault();

                const contactData = {
                    name: document.getElementById('contact-name').value,
                    email: document.getElementById('contact-email').value,
                    phone: document.getElementById('contact-phone').value,
                    message: document.getElementById('contact-message').value
                };

                const baseUrl = window.location.port === '3000' ? 'http://localhost:5000' : '';
                const url = baseUrl + '/contact';
                console.log('sending contact message to', url, contactData);

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                })
                .then(async res => {
                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(text);
                    }
                    return res.json();
                })
                .then(data => {
                    alert("Message sent successfully! We will contact you soon.");
                    contactFormElement.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Error sending message: " + error.message);
                });
            });
        }
    }
});