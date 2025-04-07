document.addEventListener("DOMContentLoaded", function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger) {
        hamburger.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            // Toggle hamburger icon
            const icon = hamburger.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.replace("fa-bars", "fa-times");
            } else {
                icon.classList.replace("fa-times", "fa-bars");
            }
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navItems = document.querySelectorAll(".nav-links li a");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission with EmailJS
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            formStatus.textContent = "Enviando...";
            
            // Replace these with your actual EmailJS service ID, template ID, and user ID
            const serviceID = "YOUR_SERVICE_ID";
            const templateID = "YOUR_TEMPLATE_ID";
            const userID = "YOUR_USER_ID";
            
            emailjs.init(userID);
            
            const formData = {
                name: contactForm.querySelector("#name").value,
                email: contactForm.querySelector("#email").value,
                subject: contactForm.querySelector("#subject").value,
                message: contactForm.querySelector("#message").value
            };
            
            emailjs.send(serviceID, templateID, formData)
                .then(() => {
                    formStatus.textContent = "Mensagem enviada com sucesso!";
                    formStatus.style.color = "green";
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);
                })
                .catch((error) => {
                    console.error("Erro de email:", error);
                    formStatus.textContent = "Falha ao enviar mensagem. Por favor, tente novamente.";
                    formStatus.style.color = "red";
                    
                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);
                });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = this.querySelector("input").value;
            
            // Here you would typically send this to your backend
            alert("Obrigado por se inscrever na newsletter da Ong 4 Patas com: " + email);
            this.reset();
        });
    }

    // Função para copiar a chave PIX
    window.copyPixKey = function() {
        const pixKey = "contato@ong4patas.com";
        navigator.clipboard.writeText(pixKey).then(() => {
            const button = document.querySelector('.copy-pix');
            const originalText = button.innerHTML;
            button.innerHTML = 'Copiado! <i class="fas fa-check"></i>';
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Não foi possível copiar a chave PIX. Por favor, copie manualmente.');
        });
    };

    // Cookie Consent Management
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    // Verifica se já existe uma preferência salva
    if (!localStorage.getItem('cookiePreference')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000); // Mostra o banner após 2 segundos
    }

    // Função para salvar a preferência e esconder o banner
    function setCookiePreference(accepted) {
        localStorage.setItem('cookiePreference', accepted);
        localStorage.setItem('cookieTimestamp', new Date().getTime());
        cookieConsent.classList.remove('show');

        // Se aceito, você pode inicializar aqui seus scripts de analytics
        if (accepted === 'true') {
            // Exemplo: initializeAnalytics();
        }
    }

    // Event listeners para os botões
    acceptButton.addEventListener('click', () => setCookiePreference('true'));
    rejectButton.addEventListener('click', () => setCookiePreference('false'));

    // Verificar e renovar o consentimento após 6 meses
    const checkCookieExpiration = () => {
        const timestamp = localStorage.getItem('cookieTimestamp');
        if (timestamp) {
            const sixMonths = 180 * 24 * 60 * 60 * 1000; // 180 dias em milissegundos
            if (new Date().getTime() - parseInt(timestamp) > sixMonths) {
                localStorage.removeItem('cookiePreference');
                localStorage.removeItem('cookieTimestamp');
                cookieConsent.classList.add('show');
            }
        }
    };

    // Verificar expiração do consentimento
    checkCookieExpiration();
});