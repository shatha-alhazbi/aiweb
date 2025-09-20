// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded - initializing features...');
    
    initializeContactForm();
    initializeCareerForm();
    
    console.log('Contact page initialization complete');
});

// ===== FORM CONFIGURATIONS =====
const FORM_CONFIG = {
    contact: {
        id: 'contact-form',
        requiredFields: ['firstName', 'lastName', 'email', 'subject', 'message'],
        emailSubject: 'Contact Form',
        successMessage: 'Thank you! Your message has been prepared. Please send the email from your email client.',
        buttonColor: 'cyan'
    },
    career: {
        id: 'career-form',
        requiredFields: ['firstName', 'lastName', 'email', 'phone'],
        emailSubject: 'Career Application',
        successMessage: 'Thank you for your application! Please attach your CV to the email that opens and send it.',
        buttonColor: 'fuchsia'
    }
};

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    const form = document.getElementById(FORM_CONFIG.contact.id);
    if (!form) {
        console.warn('Contact form not found');
        return;
    }
    
    console.log('Initializing contact form...');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form, FORM_CONFIG.contact, createContactEmailContent);
    });
}

function createContactEmailContent(data) {
    return `
Contact Form Submission - AI LEAD Website

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent via the AI LEAD website contact form.
Sent on: ${new Date().toLocaleString()}
    `.trim();
}

// ===== CAREER FORM HANDLING =====
function initializeCareerForm() {
    const form = document.getElementById(FORM_CONFIG.career.id);
    if (!form) {
        console.warn('Career form not found');
        return;
    }
    
    console.log('Initializing career form...');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleCareerFormSubmission(form);
    });
}

function handleCareerFormSubmission(form) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!validateCareerForm(formData, data)) {
            return;
        }
        
        const emailContent = createCareerEmailContent(data);
        const subject = encodeURIComponent(`${FORM_CONFIG.career.emailSubject}: ${data.firstName} ${data.lastName}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:info@ailead.tech?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        showSuccessMessage(FORM_CONFIG.career.successMessage);
        form.reset();
        
        console.log('Career form submitted successfully');
        
    } catch (error) {
        console.error('Error submitting career form:', error);
        showErrorMessage('An error occurred while preparing your application. Please try again.');
    }
}

function createCareerEmailContent(data) {
    return `
Career Application - AI LEAD Website

Personal Information:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Position of Interest: ${data.position || 'Not specified'}

Cover Letter:
${data.coverLetter || 'No cover letter provided'}

---
IMPORTANT: Please attach the CV/Resume file to this email before sending.

This application was submitted via the AI LEAD website career form.
Submitted on: ${new Date().toLocaleString()}
    `.trim();
}

// ===== GENERIC FORM HANDLING =====
function handleFormSubmission(form, config, contentCreator) {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        if (!validateForm(data, config.requiredFields)) {
            return;
        }
        
        const emailContent = contentCreator(data);
        const subject = encodeURIComponent(`${config.emailSubject}: ${data.subject || data.firstName + ' ' + data.lastName}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:info@ailead.tech?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        showSuccessMessage(config.successMessage);
        form.reset();
        
        console.log(`${config.emailSubject} submitted successfully`);
        
    } catch (error) {
        console.error(`Error submitting ${config.emailSubject.toLowerCase()}:`, error);
        showErrorMessage('An error occurred while preparing your message. Please try again.');
    }
}

// ===== VALIDATION FUNCTIONS =====
function validateForm(data, requiredFields) {
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Please fill in the ${formatFieldName(field)} field.`);
            return false;
        }
    }
    
    if (data.email && !isValidEmail(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function validateCareerForm(formData, data) {
    if (!validateForm(data, FORM_CONFIG.career.requiredFields)) {
        return false;
    }
    
    const cvFile = formData.get('cv');
    if (!cvFile || cvFile.size === 0) {
        showErrorMessage('Please upload your CV/Resume.');
        return false;
    }
    
    if (cvFile.size > 5 * 1024 * 1024) {
        showErrorMessage('CV file size must be less than 5MB.');
        return false;
    }
    
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileName = cvFile.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
        showErrorMessage('Please upload a PDF, DOC, or DOCX file.');
        return false;
    }
    
    return true;
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatFieldName(fieldName) {
    return fieldName.replace(/([A-Z])/g, ' $1').toLowerCase();
}

function formatPhoneNumber(phone) {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11) {
        return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    return phone;
}

// ===== NOTIFICATION SYSTEM =====
function showSuccessMessage(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function showErrorMessage(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const icon = type === 'success' ? '✓' : '✕';
    
    notification.className = `fixed top-20 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 max-w-md transform translate-x-full`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">${icon}</span>
            <p class="font-inter text-sm">${message}</p>
            <button class="ml-auto text-white/80 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    return notification;
}

function removeNotification(notification) {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}