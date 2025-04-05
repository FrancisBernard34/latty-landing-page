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
});