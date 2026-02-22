// Initialize Lucide icons
lucide.createIcons();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('show');
}

// Scroll to form
function scrollToForm() {
    document.getElementById('intake-form').scrollIntoView({ behavior: 'smooth' });
}

// AI Tabs
document.querySelectorAll('.ai-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.ai-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.ai-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Style presets
document.querySelectorAll('.style-preset').forEach(preset => {
    preset.addEventListener('click', () => {
        document.querySelectorAll('.style-preset').forEach(p => p.classList.remove('active'));
        preset.classList.add('active');
    });
});

// Generate Rendering
function generateRendering() {
    const description = document.getElementById('renderDescription').value;
    const style = document.querySelector('.style-preset.active').dataset.style;
    const btn = document.querySelector('#renderer .ai-btn');
    
    if (!description) {
        alert('Please enter a description for your building');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="loading-spinner"></span> Generating...';
    
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="sparkles"></i> Generate Rendering';
        document.getElementById('renderResult').classList.add('show');
        lucide.createIcons();
    }, 2000);
}

// Calculate Cost
function calculateCost() {
    const sqft = parseInt(document.getElementById('squareFootage').value) || 0;
    const bedrooms = parseInt(document.getElementById('bedrooms').value) || 0;
    const bathrooms = parseInt(document.getElementById('bathrooms').value) || 0;
    const projectType = document.getElementById('projectType').value;

    if (sqft === 0) {
        alert('Please enter square footage');
        return;
    }

    const baseRate = projectType === 'commercial' ? 200 : 
                    projectType === 'renovation' ? 150 : 175;
    
    const foundation = Math.round(sqft * baseRate * 0.25);
    const exterior = Math.round(sqft * baseRate * 0.20);
    const interior = Math.round(sqft * baseRate * 0.30);
    const mechanical = Math.round(sqft * baseRate * 0.15);
    const permits = Math.round((foundation + exterior + interior + mechanical) * 0.10);
    const total = foundation + exterior + interior + mechanical + permits;

    document.getElementById('foundationCost').textContent = '$' + foundation.toLocaleString();
    document.getElementById('exteriorCost').textContent = '$' + exterior.toLocaleString();
    document.getElementById('interiorCost').textContent = '$' + interior.toLocaleString();
    document.getElementById('mechanicalCost').textContent = '$' + mechanical.toLocaleString();
    document.getElementById('permitsCost').textContent = '$' + permits.toLocaleString();
    document.getElementById('totalCost').textContent = '$' + total.toLocaleString();

    document.getElementById('costResult').classList.add('show');
}

// Chat functionality
function handleChatKeypress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

function sendQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    const messagesContainer = document.getElementById('chatMessages');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);

    input.value = '';

    // Show typing indicator
    document.getElementById('chatTyping').classList.add('show');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        document.getElementById('chatTyping').classList.remove('show');
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message ai';
        aiMessage.textContent = getAIResponse(message);
        messagesContainer.appendChild(aiMessage);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}

function getAIResponse(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('timeline')) {
        return "The timeline for a custom home project typically ranges from 8-14 months, depending on size and complexity. This includes 2-3 months for design and planning, 1-2 months for permits, and 6-10 months for construction. Our AI can provide a more accurate timeline once we have your specific project details.";
    } else if (lower.includes('rendering') || lower.includes('ai')) {
        return "Our AI rendering engine uses advanced machine learning to generate photorealistic building visualizations from your descriptions. You can choose from various architectural styles and make iterative changes. The rendering helps you visualize the final result before construction begins.";
    } else if (lower.includes('cost') || lower.includes('estimate') || lower.includes('budget')) {
        return "Our AI cost estimator provides detailed breakdowns including foundation, framing, exterior, interior finishes, and mechanical systems. We also factor in permits and a 10% contingency. The estimate is based on current market rates and your specific project requirements.";
    } else if (lower.includes('financing')) {
        return "We work with several financing partners who offer construction loans and mortgages specifically for custom homes. We can connect you with our preferred lenders who offer competitive rates and flexible payment schedules tied to construction milestones.";
    } else {
        return "Thank you for your question! I'm here to help with any aspect of your construction project. Feel free to ask about our services, the design process, cost estimates, or timeline. You can also start a formal project inquiry using our intake form.";
    }
}

// Form Wizard
let currentStep = 1;
const totalSteps = 5;
let uploadedFiles = [];

function updateProgress() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });

    document.getElementById('btnBack').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    
    if (currentStep === totalSteps) {
        document.getElementById('btnNext').style.display = 'none';
    } else {
        document.getElementById('btnNext').style.display = 'flex';
    }
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    updateProgress();
    
    if (step === 5) {
        updateReview();
    }
}

function validateStep(step) {
    let valid = true;
    
    if (step === 1) {
        const name = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        if (!name.value.trim()) {
            name.classList.add('error');
            valid = false;
        } else {
            name.classList.remove('error');
        }
        
        if (!email.value.trim() || !email.value.includes('@')) {
            email.classList.add('error');
            valid = false;
        } else {
            email.classList.remove('error');
        }
        
        if (!phone.value.trim()) {
            phone.classList.add('error');
            valid = false;
        } else {
            phone.classList.remove('error');
        }
    }
    
    if (step === 2) {
        const projectType = document.getElementById('projectTypeSelect');
        if (!projectType.value) {
            projectType.classList.add('error');
            valid = false;
        } else {
            projectType.classList.remove('error');
        }
    }

    return valid;
}

function nextStep() {
    if (!validateStep(currentStep)) return;
    
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function goToStep(step) {
    currentStep = step;
    showStep(currentStep);
}

function updateReview() {
    document.getElementById('reviewName').textContent = document.getElementById('fullName').value;
    document.getElementById('reviewEmail').textContent = document.getElementById('email').value;
    document.getElementById('reviewPhone').textContent = document.getElementById('phone').value;
    
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
    document.getElementById('reviewContact').textContent = contactMethod ? contactMethod.value : '-';
    
    const projectType = document.getElementById('projectTypeSelect');
    document.getElementById('reviewProjectType').textContent = projectType.options[projectType.selectedIndex].text || '-';
    document.getElementById('reviewAddress').textContent = document.getElementById('propertyAddress').value || 'Not specified';
    
    const timeline = document.getElementById('timeline');
    document.getElementById('reviewTimeline').textContent = timeline.options[timeline.selectedIndex].text || '-';
    
    const budget = document.getElementById('budget');
    document.getElementById('reviewBudget').textContent = budget.options[budget.selectedIndex].text || '-';
    
    document.getElementById('reviewSize').textContent = document.getElementById('sqft').value ? document.getElementById('sqft').value + ' sq ft' : '-';
    document.getElementById('reviewBedrooms').textContent = document.getElementById('bedroomCount').value || '-';
    document.getElementById('reviewBathrooms').textContent = document.getElementById('bathroomCount').value || '-';
    
    const styles = [];
    document.querySelectorAll('input[name="style"]:checked').forEach(cb => {
        styles.push(cb.value);
    });
    document.getElementById('reviewFeatures').textContent = styles.length > 0 ? styles.join(', ') : document.getElementById('mustHave').value || 'None specified';
}

// File Upload
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');

uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
            alert('File too large. Maximum size is 10MB.');
            return;
        }
        
        uploadedFiles.push(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'upload-preview-item';
            div.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-btn" onclick="removeFile(this, ${uploadedFiles.length - 1})">
                    <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                </button>
            `;
            uploadPreview.appendChild(div);
            lucide.createIcons();
        };
        reader.readAsDataURL(file);
    });
}

function removeFile(btn, index) {
    uploadedFiles.splice(index, 1);
    btn.parentElement.remove();
}

// Form submission
document.getElementById('btnNext').addEventListener('click', function() {
    if (currentStep === totalSteps) {
        // Submit form
        this.textContent = 'Submitting...';
        this.disabled = true;
        
        setTimeout(() => {
            document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
            document.getElementById('formNav').style.display = 'none';
            document.getElementById('successMessage').classList.add('show');
            
            // Save to localStorage
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                projectType: document.getElementById('projectTypeSelect').value,
                submittedAt: new Date().toISOString()
            };
            localStorage.setItem('buildvision_form', JSON.stringify(formData));
        }, 1500);
    }
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.status === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Modal
function openProjectModal(title, status, progress, description) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalStatus').textContent = status;
    document.getElementById('modalProgress').textContent = progress + '%';
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('projectModal').classList.add('show');
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('show');
}

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('projectModal')) {
        closeProjectModal();
    }
});

// Testimonials
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function goToTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.testimonial-dot').forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    document.querySelectorAll('.testimonial-dot')[index].classList.add('active');
    currentTestimonial = index;
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(currentTestimonial);
}, 5000);

// Contact Form
function submitContactForm() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
