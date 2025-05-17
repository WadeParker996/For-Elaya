// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Create floating hearts background
    createFloatingHearts();

    // Initialize note cards
    initNoteCards();

    // Initialize quiz
    initQuiz();

    // Initialize love button
    document.getElementById('love-button').addEventListener('click', function() {
        const loveModal = new bootstrap.Modal(document.getElementById('loveModal'));
        loveModal.show();
        
        // Create heart explosion effect
        createHeartExplosion();
    });
});

// Function to create floating hearts in the background
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartColors = ['#ff85a2', '#ffc0cb', '#e5446d', '#ff5c8a'];
    const heartSizes = ['0.5rem', '0.8rem', '1rem', '1.2rem', '1.5rem'];
    
    // Create 30 floating hearts
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'floating-heart');
        
        // Random position
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 20;
        
        // Random size and color
        heart.style.left = `${left}%`;
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.fontSize = heartSizes[Math.floor(Math.random() * heartSizes.length)];
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        container.appendChild(heart);
    }
}

// Function to initialize the flippable note cards
function initNoteCards() {
    const noteCards = document.querySelectorAll('.note-card');
    
    noteCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Quiz functionality
function initQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    const options = document.querySelectorAll('.quiz-option');
    
    let currentQuestion = 1;
    const totalQuestions = 3;
    
    // Sample questions - you should customize these with real details about your relationship
    const questions = [
        {
            question: "When tayo mag ddate?",
            options: ["After my board exam", "Pag naubos na trial mo", "Pag naka move on na ako", "Bukas agad"]
        },
        {
            question: "Tropa mo lang ba talaga ako?",
            options: ["No", "No, crush na kita e", "No", "Mahal na kita para maging tropa lang"]
        },
        {
            question: "What do I always say to you before going to sleep?",
            options: ["Sweet dreams", "I love you hehehhe xd", "Ewa ko kupal kaba", "Good night elaya ko"]
        }
    ];
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Handle next question button
    nextButton.addEventListener('click', function() {
        if (currentQuestion < totalQuestions) {
            // Update to next question
            currentQuestion++;
            updateQuestion();
        } else {
            // Show result
            quizContent.style.display = 'none';
            quizResult.style.display = 'block';
            
            // Trigger confetti effect
            createConfetti();
        }
    });
    
    // Function to update question content
    function updateQuestion() {
        const questionContainer = document.querySelector('.question-container');
        const questionData = questions[currentQuestion - 1];
        
        // Update question text
        questionContainer.querySelector('h3').textContent = `Question ${currentQuestion}: ${questionData.question}`;
        
        // Update options
        const optionButtons = questionContainer.querySelectorAll('.quiz-option');
        optionButtons.forEach((btn, index) => {
            btn.textContent = questionData.options[index];
            btn.classList.remove('selected');
        });
        
        // Update button text for last question
        if (currentQuestion === totalQuestions) {
            nextButton.textContent = 'Finish Quiz';
        }
    }
}

// Function to create heart explosion effect
function createHeartExplosion() {
    const container = document.querySelector('.modal-body');
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'explosion-heart');
        
        // Random position, size, and animation
        const size = Math.random() * 1.5 + 0.5;
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 360;
        
        heart.style.position = 'absolute';
        heart.style.fontSize = `${size}rem`;
        heart.style.color = '#ff85a2';
        heart.style.opacity = '0';
        heart.style.top = '50%';
        heart.style.left = '50%';
        
        container.appendChild(heart);
        
        // Animate the heart
        gsap.to(heart, {
            x: x,
            y: y,
            rotation: rotation,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: function() {
                gsap.to(heart, {
                    opacity: 0,
                    delay: 1,
                    duration: 0.3,
                    onComplete: function() {
                        heart.remove();
                    }
                });
            }
        });
    }
}

// Function to create confetti effect
function createConfetti() {
    const container = document.querySelector('.celebration-animation');
    const colors = ['#ff85a2', '#ffc0cb', '#e5446d', '#ff5c8a', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        confetti.style.position = 'absolute';
        confetti.style.top = '0';
         confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() + 0.5;
        
        container.appendChild(confetti);
        
        // Animate the confetti
        const animationDuration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        gsap.to(confetti, {
            y: '300px',
            x: xMovement,
            rotation: Math.random() * 360,
            duration: animationDuration,
            ease: 'power1.out',
            onComplete: function() {
                confetti.remove();
            }
        });
    }
}

// Add GSAP animation for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 50
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// Add typing effect for the love letter
document.addEventListener('DOMContentLoaded', function() {
    const loveLetter = document.querySelector('.hero-section .love-letter');
    const originalText = loveLetter.textContent;
    
    // Clear the text initially
    loveLetter.textContent = '';
    
    // Create typing effect
    let i = 0;
    const typingSpeed = 30; // milliseconds per character
    
    function typeText() {
        if (i < originalText.length) {
            loveLetter.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing when the element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeText, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(loveLetter);
});

// Add parallax effect to the hero image
window.addEventListener('scroll', function() {
    const polaroidFrame = document.querySelector('.polaroid-frame');
    const scrollPosition = window.scrollY;
    
    if (polaroidFrame) {
        const moveY = scrollPosition * 0.05;
        polaroidFrame.style.transform = `rotate(-3deg) translateY(${moveY}px)`;
    }
});

// Add hover effects for memory cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            duration: 0.3
        });
    });
});

// Add a special surprise on double click
document.addEventListener('dblclick', function(e) {
    createHeartAt(e.clientX, e.clientY);
});

function createHeartAt(x, y) {
    const heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart');
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = '#ff85a2';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(heart);
    
    gsap.to(heart, {
        y: -100,
        opacity: 0,
        scale: 1.5,
        duration: 1,
        ease: 'power2.out',
        onComplete: function() {
            heart.remove();
        }
    });
}

// Add music player functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create a hidden audio element
    const audioElement = document.createElement('audio');
    audioElement.id = 'background-music';
    audioElement.loop = true;
    audioElement.volume = 0.5;
    

    audioElement.src = 'https://www.youtube.com/watch?v=MInZBSVBEFU';
    
    document.body.appendChild(audioElement);
    
    // Create music control button
    const musicButton = document.createElement('button');
    musicButton.classList.add('music-control');
    musicButton.innerHTML = '<i class="fas fa-music"></i>';
    musicButton.title = 'Play/Pause Music';
    
    // Style the button
    musicButton.style.position = 'fixed';
    musicButton.style.bottom = '20px';
    musicButton.style.right = '20px';
    musicButton.style.width = '50px';
    musicButton.style.height = '50px';
    musicButton.style.borderRadius = '50%';
    musicButton.style.backgroundColor = 'var(--primary-pink)';
    musicButton.style.color = 'white';
    musicButton.style.border = 'none';
    musicButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    musicButton.style.cursor = 'pointer';
    musicButton.style.zIndex = '1000';
    musicButton.style.display = 'flex';
    musicButton.style.justifyContent = 'center';
    musicButton.style.alignItems = 'center';
    
    document.body.appendChild(musicButton);
    
    // Toggle music on button click
    let isPlaying = false;
    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            audioElement.pause();
            musicButton.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audioElement.play().catch(e => {
                console.log('Auto-play prevented. User interaction required.');
            });
            musicButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
});

// Add interactive elements to the special message section
document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.querySelector('.message-container');
    
    if (messageContainer) {
        // Add sparkle effect on hover
        messageContainer.addEventListener('mouseenter', function() {
            addSparkles(this);
        });
        
        messageContainer.addEventListener('mouseleave', function() {
            removeSparkles();
        });
    }
});

function addSparkles(element) {
    const sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position within the element
        const top = Math.random() * element.offsetHeight;
        const left = Math.random() * element.offsetWidth;
        
        sparkle.style.position = 'absolute';
        sparkle.style.top = `${top}px`;
        sparkle.style.left = `${left}px`;
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = 'var(--primary-pink)';
        sparkle.style.opacity = '0';
        sparkle.style.zIndex = '1';
        
        element.appendChild(sparkle);
        
        // Animate the sparkle
        gsap.to(sparkle, {
            scale: 2,
            opacity: 0.8,
            duration: 0.3,
            onComplete: function() {
                gsap.to(sparkle, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    delay: 0.2,
                    onComplete: function() {
                        sparkle.remove();
                    }
                });
            }
        });
    }, 200);
    
    // Store the interval ID for cleanup
    element.sparkleInterval = sparkleInterval;
}

function removeSparkles() {
    const messageContainer = document.querySelector('.message-container');
    
    if (messageContainer && messageContainer.sparkleInterval) {
        clearInterval(messageContainer.sparkleInterval);
        
        // Remove any existing sparkles
        const sparkles = messageContainer.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            sparkle.remove();
        });
    }
}

// Add a countdown timer to a special date (e.g., anniversary)
document.addEventListener('DOMContentLoaded', function() {
    // Create countdown element
    const countdownElement = document.createElement('div');
    countdownElement.classList.add('countdown-timer');
    countdownElement.innerHTML = `
        <h3 class="dancing-font">Oh eto timestamp for Our Next Anniversary HAHAH desisyon ako baliw</h3>
        <div class="countdown-display">
            <div class="countdown-item">
                <span id="countdown-days">00</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-hours">00</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-minutes">00</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-seconds">00</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
    `;
    
    // Style the countdown
    countdownElement.style.backgroundColor = 'var(--white)';
    countdownElement.style.padding = '2rem';
    countdownElement.style.borderRadius = '15px';
    countdownElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.maxWidth = '600px';
    countdownElement.style.margin = '3rem auto';
    
    // Add styles for countdown display
    const style = document.createElement('style');
    style.textContent = `
        .countdown-display {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }
        .countdown-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .countdown-item span:first-child {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--dark-pink);
        }
        .countdown-label {
            font-size: 0.9rem;
            color: #777;
            margin-top: 0.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Insert the countdown before the footer
    const footer = document.querySelector('footer');
    document.body.insertBefore(countdownElement, footer);
    
    // Set the target date (replace with your anniversary date)
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1); // Example: 1 month from now
    
    // Update the countdown
    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        
        if (difference <= 0) {
            // Anniversary has arrived!
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
});
