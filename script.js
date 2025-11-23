// Spotify Clone - JavaScript for Responsiveness and Interactivity

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const volumeBtn = document.getElementById('volumeBtn');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const heartIcon = document.querySelector('.album .fa-heart');
const cards = document.querySelectorAll('.card');
const navOptions = document.querySelectorAll('.nav-option');
const currTimeEl = document.querySelector('.curr-time');
const totTimeEl = document.querySelector('.tot-time');
const albumTitle = document.querySelector('.high');
const albumArtist = document.querySelector('.high1');
const albumImage = document.querySelector('.album img');

// State
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;
let volume = 50;
let currentTrackIndex = 0;
let isDragging = false;

// Sample tracks - Replace these with your actual audio file paths
const tracks = [
    {
        title: "Mere Paas Tum Ho",
        artist: "Kishore Kumar",
        image: "card3img.jpeg",
        audio: "Mere Pass Tum Ho(KoshalWorld.Com).mp3" // Audio file for Mere Pass Tum Ho
    },
    {
        title: "Sathie Pauti Bhogaru Tumara",
        artist: "Various Artists",
        image: "card1img.jpeg",
        audio: "Sathie Pauti Bhogaru Tumara(KoshalWorld.Com).mp3" // Audio file for Sathie Pauti Bhogaru Tumara
    },
    {
        title: "Top 50 - Global",
        artist: "Various Artists",
        image: "card2img.jpeg",
        audio: "audio/sample3.mp3" // Replace with your audio file path
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePlayer();
    initializeNavigation();
    initializeCards();
    initializeResponsive();
});

// Player Controls
function initializePlayer() {
    if (!audioPlayer) {
        console.error('Audio player element not found');
        return;
    }

    // Set initial volume
    audioPlayer.volume = volume / 100;

    // Play/Pause Button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Previous/Next Buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousTrack);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextTrack);
    }

    // Shuffle Button
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            isShuffled = !isShuffled;
            shuffleBtn.style.color = isShuffled ? '#1db954' : '#b3b3b3';
        });
    }

    // Repeat Button
    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            isRepeated = !isRepeated;
            repeatBtn.style.color = isRepeated ? '#1db954' : '#b3b3b3';
            if (isRepeated) {
                repeatBtn.querySelector('i').classList.add('fa-repeat-1');
            } else {
                repeatBtn.querySelector('i').classList.remove('fa-repeat-1');
            }
        });
    }

    // Progress Bar
    if (progressBar) {
        progressBar.addEventListener('input', (e) => {
            if (audioPlayer && audioPlayer.duration) {
                const seekTime = (e.target.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = seekTime;
                updateTimeDisplay();
            }
        });

        progressBar.addEventListener('mousedown', () => {
            isDragging = true;
        });

        progressBar.addEventListener('mouseup', () => {
            isDragging = false;
        });

        progressBar.addEventListener('change', (e) => {
            if (audioPlayer && audioPlayer.duration) {
                const seekTime = (e.target.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = seekTime;
                updateTimeDisplay();
            }
        });
    }

    // Volume Control
    if (volumeBar) {
        volumeBar.addEventListener('input', (e) => {
            volume = e.target.value;
            audioPlayer.volume = volume / 100;
            updateVolumeIcon();
        });
    }

    if (volumeBtn) {
        volumeBtn.addEventListener('click', toggleMute);
    }

    // Heart Icon
    if (heartIcon) {
        heartIcon.addEventListener('click', () => {
            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
            }
        });
    }

    // Audio event listeners
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (totTimeEl) {
            totTimeEl.textContent = formatTime(audioPlayer.duration);
        }
        if (progressBar) {
            progressBar.max = 100;
        }
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (!isDragging) {
            updateProgress();
            updateTimeDisplay();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (isRepeated) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNextTrack();
        }
    });

    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });

    // Load first track
    loadTrack(currentTrackIndex);
}

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    if (audioPlayer) {
        audioPlayer.src = track.audio;
        audioPlayer.load();
    }
    
    // Update UI
    if (albumTitle) albumTitle.textContent = track.title;
    if (albumArtist) albumArtist.textContent = track.artist;
    if (albumImage) albumImage.src = track.image;
}

function togglePlayPause() {
    if (!audioPlayer) return;
    
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        // If audio source is not set, load the current track first
        if (!audioPlayer.src || audioPlayer.src === window.location.href) {
            loadTrack(currentTrackIndex);
        }
        
        audioPlayer.play().catch(err => {
            console.error('Error playing audio:', err);
            // If audio file doesn't exist, show a message
            alert('Audio file not found: ' + tracks[currentTrackIndex].audio + '\n\nPlease make sure the file exists in the same directory as your HTML file.');
        });
    }
}

function updatePlayPauseButton() {
    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
}

function updateProgress() {
    if (!audioPlayer || !progressBar) return;
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = isNaN(progress) ? 0 : progress;
}

function updateTimeDisplay() {
    if (!audioPlayer) return;
    if (currTimeEl) {
        currTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function playNextTrack() {
    if (isShuffled) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function playPreviousTrack() {
    if (isShuffled) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function toggleMute() {
    if (!audioPlayer || !volumeBar) return;
    
    if (volume > 0) {
        volumeBar.value = 0;
        volume = 0;
        audioPlayer.volume = 0;
    } else {
        volumeBar.value = 50;
        volume = 50;
        audioPlayer.volume = 0.5;
    }
    updateVolumeIcon();
}

function updateVolumeIcon() {
    if (volumeBtn && volumeBar) {
        const icon = volumeBtn.querySelector('i');
        if (volume === 0) {
            icon.classList.remove('fa-volume-high', 'fa-volume-low');
            icon.classList.add('fa-volume-x');
        } else if (volume < 50) {
            icon.classList.remove('fa-volume-high', 'fa-volume-x');
            icon.classList.add('fa-volume-low');
        } else {
            icon.classList.remove('fa-volume-low', 'fa-volume-x');
            icon.classList.add('fa-volume-high');
        }
    }
}

// Navigation
function initializeNavigation() {
    // Back/Forward buttons
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                backBtn.disabled = true;
            }
        });
    }

    if (forwardBtn) {
        forwardBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.forward();
            } else {
                forwardBtn.disabled = true;
            }
        });
    }

    // Navigation Options - Home and Search
    navOptions.forEach(option => {
        const link = option.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all options
                navOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Get the link text to determine which page to show
                const linkText = link.textContent.trim();
                
                if (linkText === 'Home') {
                    showHomePage();
                } else if (linkText === 'Search') {
                    showSearchPage();
                }
            });
        }
    });
}

// Show Home Page
function showHomePage() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Show all home content sections
    const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer');
    sections.forEach(section => {
        section.style.display = '';
    });
    
    // Hide search content if it exists
    const searchContent = mainContent.querySelector('.search-content');
    if (searchContent) {
        searchContent.style.display = 'none';
    }
    
    // Scroll to top
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Home page displayed');
}

// Show Search Page
function showSearchPage() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Check if search content already exists
    let searchContent = mainContent.querySelector('.search-content');
    
    if (!searchContent) {
        // Create search content
        searchContent = document.createElement('div');
        searchContent.className = 'search-content';
        searchContent.innerHTML = `
            <div class="search-container">
                <div class="search-box-wrapper">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" class="search-input" id="searchInput" placeholder="What do you want to listen to?" autocomplete="off">
                </div>
                
                <h2 class="section-title" style="margin-top: 2rem;">Browse all</h2>
                <div class="search-categories">
                    <div class="category-card" style="background: linear-gradient(135deg, #450af5 0%, #c4efd9 100%);">
                        <h3>Podcasts</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #e13300 0%, #f06200 100%);">
                        <h3>New Releases</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #1e3264 0%, #a567d4 100%);">
                        <h3>Charts</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #e8115b 0%, #006450 100%);">
                        <h3>Made for You</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #8400e7 0%, #2d00f5 100%);">
                        <h3>At Home</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #1e3264 0%, #009cbf 100%);">
                        <h3>Pop</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #dc148c 0%, #8400e7 100%);">
                        <h3>Hip-Hop</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #e13300 0%, #7358ff 100%);">
                        <h3>Rock</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #006450 0%, #1e3264 100%);">
                        <h3>Jazz</h3>
                    </div>
                    <div class="category-card" style="background: linear-gradient(135deg, #8400e7 0%, #e13300 100%);">
                        <h3>Classical</h3>
                    </div>
                </div>
            </div>
        `;
        
        // Insert search content after sticky-nav
        const stickyNav = mainContent.querySelector('.sticky-nav');
        if (stickyNav && stickyNav.nextSibling) {
            mainContent.insertBefore(searchContent, stickyNav.nextSibling);
        } else {
            mainContent.appendChild(searchContent);
        }
        
        // Hide all home sections
        const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer');
        sections.forEach(section => {
            if (!section.closest('.search-content')) {
                section.style.display = 'none';
            }
        });
        
        // Add search functionality
        const searchInput = searchContent.querySelector('#searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch(e);
                }
            });
        }
    } else {
        // Show search content
        searchContent.style.display = '';
        
        // Hide home sections
        const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer');
        sections.forEach(section => {
            if (!section.closest('.search-content')) {
                section.style.display = 'none';
            }
        });
    }
    
    // Focus on search input
    const searchInput = searchContent.querySelector('#searchInput');
    if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
    }
    
    // Scroll to top
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Search page displayed');
}

// Handle search input
function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    console.log('Searching for:', searchTerm);
    
    // You can add actual search functionality here
    // For now, just log the search term
    if (searchTerm.length > 0) {
        // Filter cards or perform search
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const info = card.querySelector('.card-info')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || info.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        // Show all cards if search is empty
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = '';
        });
    }
}

// Card Interactions
function initializeCards() {
    cards.forEach((card, index) => {
        const playButton = card.querySelector('.play-button-overlay');
        const cardTitle = card.querySelector('.card-title');
        const cardImage = card.querySelector('img');
        
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // Find track index or use card index
                const trackIndex = index < tracks.length ? index : 0;
                loadTrack(trackIndex);
                audioPlayer.play().catch(err => {
                    console.error('Error playing audio:', err);
                    alert('Audio file not found. Please add audio files to the audio folder.');
                });
            });
        }

        card.addEventListener('click', () => {
            const trackIndex = index < tracks.length ? index : 0;
            loadTrack(trackIndex);
            audioPlayer.play().catch(err => {
                console.error('Error playing audio:', err);
                alert('Audio file not found. Please add audio files to the audio folder.');
            });
        });
    });
}

// Responsive Behavior
function initializeResponsive() {
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveLayout();
        }, 250);
    });

    // Initial check
    handleResponsiveLayout();
}

function handleResponsiveLayout() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const musicPlayer = document.querySelector('.music-player');

    // Adjust layout for mobile
    if (width <= 768) {
        // Mobile optimizations
        if (sidebar) {
            sidebar.style.maxHeight = '200px';
        }
    } else {
        // Desktop layout
        if (sidebar) {
            sidebar.style.maxHeight = 'none';
        }
    }

    // Adjust music player height based on viewport
    if (musicPlayer && width <= 480) {
        musicPlayer.style.height = '70px';
    } else if (musicPlayer) {
        musicPlayer.style.height = '90px';
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Spacebar to play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
    }

    // Arrow keys for volume
    if (e.code === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        volume = Math.min(100, volume + 5);
        if (volumeBar) volumeBar.value = volume;
        updateVolumeIcon();
    }

    if (e.code === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        volume = Math.max(0, volume - 5);
        if (volumeBar) volumeBar.value = volume;
        updateVolumeIcon();
    }

    // Left/Right arrows for seeking
    if (e.code === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        if (audioPlayer) {
            audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
            updateTimeDisplay();
            updateProgress();
        }
    }

    if (e.code === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        if (audioPlayer) {
            audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
            updateTimeDisplay();
            updateProgress();
        }
    }
});

// Smooth scrolling for main content
const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.style.scrollBehavior = 'smooth';
}

// Prevent default drag behavior on images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Add loading state simulation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s';
        document.body.style.opacity = '1';
    }, 100);
});

