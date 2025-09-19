/**
 * AI LEAD - Contact Page JavaScript
 * Handles form submissions and notifications
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded - initializing features...');
    
    // Initialize contact and career forms
    initializeContactForm();
    initializeCareerForm();
    
    console.log('Contact page initialization complete');
});

/**
 * Initialize Contact Form
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.warn('Contact form not found');
        return;
    }
    
    console.log('Initializing contact form...');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(form);
    });
}

/**
 * Handle Contact Form Submission
 */
function handleContactFormSubmission(form) {
    try {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!validateContactForm(data)) {
            return;
        }
        
        // Create email content
        const emailContent = createContactEmailContent(data);
        
        // Create mailto link
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:info@ailead.tech?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showSuccessMessage('Thank you! Your message has been prepared. Please send the email from your email client.');
        
        // Reset form
        form.reset();
        
        console.log('Contact form submitted successfully');
        
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showErrorMessage('An error occurred while preparing your message. Please try again.');
    }
}

/**
 * Validate Contact Form
 */
function validateContactForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Create Contact Email Content
 */
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

/**
 * Initialize Career Form
 */
function initializeCareerForm() {
    const form = document.getElementById('career-form');
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

/**
 * Handle Career Form Submission
 */
function handleCareerFormSubmission(form) {
    try {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields and file
        if (!validateCareerForm(formData, data)) {
            return;
        }
        
        // Create email content
        const emailContent = createCareerEmailContent(data);
        
        // Create mailto link
        const subject = encodeURIComponent(`Career Application: ${data.firstName} ${data.lastName}`);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:info@ailead.tech?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showSuccessMessage('Thank you for your application! Please attach your CV to the email that opens and send it.');
        
        // Reset form
        form.reset();
        
        console.log('Career form submitted successfully');
        
    } catch (error) {
        console.error('Error submitting career form:', error);
        showErrorMessage('An error occurred while preparing your application. Please try again.');
    }
}

/**
 * Validate Career Form
 */
function validateCareerForm(formData, data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    
    // Check required text fields
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    // Check CV file
    const cvFile = formData.get('cv');
    if (!cvFile || cvFile.size === 0) {
        showErrorMessage('Please upload your CV/Resume.');
        return false;
    }
    
    // Check file size (5MB limit)
    if (cvFile.size > 5 * 1024 * 1024) {
        showErrorMessage('CV file size must be less than 5MB.');
        return false;
    }
    
    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileName = cvFile.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
        showErrorMessage('Please upload a PDF, DOC, or DOCX file.');
        return false;
    }
    
    return true;
}

/**
 * Create Career Email Content
 */
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

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

/**
 * Create notification element
 */
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

/**
 * Remove notification with animation
 */
function removeNotification(notification) {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

/**
 * Utility function to format phone numbers
 */
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format based on length
    if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11) {
        return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    return phone; // Return original if no formatting rule applies
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}