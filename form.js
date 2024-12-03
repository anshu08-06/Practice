// Get DOM elements
const form = document.getElementById('signup-form');
const rocket = document.getElementById('rocket');
const successMessage = document.getElementById('success-message');

// Form submission event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    // Simulate a successful sign-up after 1 second
    setTimeout(() => {
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Activate rocket launch animation
        rocket.classList.add('active');
    }, 1000);
});
