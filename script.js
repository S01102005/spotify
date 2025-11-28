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
const recentlyPlayedContainer = document.getElementById('recentlyPlayedCards');
let searchResultsContainer = null;
let browseCardsContainer = null;

// State
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;
let volume = 50;
let currentTrackIndex = 0;
let isDragging = false;
let recentlyPlayed = [];
let likedTracks = new Set(); // Track which songs are liked by their index
let playlists = []; // Store all playlists
let currentView = 'home'; // Track current view: 'home', 'search', 'playlist', 'podcasts'
let userProfile = null; // Store user profile {firstName, middleName, lastName, fullName}
let currentPage = 0; // Track current page for navigation
let navigationHistory = []; // Track navigation history
let historyIndex = -1; // Current position in history
let isNavigatingHistory = false; // Flag to prevent adding to history when navigating

// Sample tracks - Replace these with your actual audio file paths
const tracks = [
    {
        title: "Mere Paas Tum Ho",
        artist: "Rahat Fateh Ali Khan",
        image: "card3img.jpeg",
        audio: "Mere Pass Tum Ho(KoshalWorld.Com).mp3"
    },
    {
        title: "Sathie Pauti Bhogaru Tumara",
        artist: "Bhikari Bal",
        image: "bhikari bal.jpg",
        audio: "Sathie Pauti Bhogaru Tumara(KoshalWorld.Com).mp3"
    },
    {
        title: "AZUL",
        artist: "Guru Randhawa",
        image: "azul.jpg",
        audio: "AZUL(KoshalWorld.Com).mp3"
    },
    {
        title: "Mu Ta Bada Deulara Parare",
        artist: "Humane Sagar",
        image: "jaga.jpg",
        audio: "Mu Ta Bada Deulara Parare(KoshalWorld.Com).mp3"
    },
    {
        title: "Yeh Raaten Yeh Mausam",
        artist: "Sanam ft. Simran",
        image: "yeh raten yeh mausam.jpg",
        audio: "Yeh Raaten Yeh Mausam Sanam ft Simran Sehgal(KoshalWorld.Com).mp3"
    },
    {
        title: "O Haseena Zulfonwali",
        artist: "Mohammed Rafi & Asha Bhosle",
        image: "zulfo.jpeg",
        audio: "O_Haseena_Zulfonwali.mp3"
    },
    {
        title: "Ranga Saari",
        artist: "Kanishk & Kavita Seth",
        image: "rangi.jpg",
        audio: "Rangi Saari (PenduJatt.Com.Se).mp3"
    },
    {
        title: "Janiye",
        artist: "Vishal Mishra & Papon",
        image: "janiye.jpg",
        audio: "Janiye(KoshalWorld.Com).mp3"
    },
    {
        title: "Tujhe Kitna Chahne Lage",
        artist: "Arijit Singh",
        image: "tujhe kitna chahne.jpg",
        audio: "Tujhe Kitna Chahne Lage Kabir Singh 128 Kbps.mp3"
    },
    {
        title: "Raabta",
        artist: "Arijit Singh",
        image: "Raabta.jpeg",
        audio: "Raabta(KoshalWorld.Com).mp3"
    },
    {
        title: "Sundari",
        artist: "Unknown",
        image: "sundari.jpg",
        audio: "Sundari(KoshalWorld.Com).mp3"
    },
    {
        title: "Barso Re",
        artist: "Shreya Ghoshal",
        image: "barso re.jpg",
        audio: "Barso Re(KoshalWorld.Com).mp3"
    },
    {
        title: "Suit Suit",
        artist: "Guru Randhawa",
        image: "suit suit.jpeg",
        audio: "Suit_Suit.mp3"
    },
    {
        title: "Naah",
        artist: "Harrdy Sandhu",
        image: "naah.jpeg",
        audio: "Naah_1.mp3"
    },
    {
        title: "Lahore",
        artist: "Guru Randhawa",
        image: "Lahore_Cover_Art.jpeg",
        audio: "Lahore_1.mp3"
    },
    {
        title: "Pachtaoge",
        artist: "Arijit Singh",
        image: "pachtaoge.jpg",
        audio: "Pachtaoge(KoshalWorld.Com).mp3"
    },
    {
        title: "Bekhayali",
        artist: "Arijit Singh",
        image: "bekhayali.jpg",
        audio: "Bekhayali (Arijit Singh Version)(KoshalWorld.Com).mp3"
    },
    {
        title: "Bol Na Halke Halke",
        artist: "Rahat Fateh Ali Khan & Mahalakshmi Iyer",
        image: "bol na halke halke.jpg",
        audio: "Bol Na Halke Halke(KoshalWorld.Com).mp3"
    },
    {
        title: "Sajda",
        artist: "Rahat Fateh Ali Khan & Shankar Mahadevan",
        image: "sajdaa.jpg",
        audio: "sajdaa (slowed + reverb)rahat fateh ali khan(KoshalWorld.Com).mp3"
    },
    {
        title: "Enna Sona",
        artist: "Arijit Singh",
        image: "ok jaanu.jpeg",
        audio: "Enna Sona(KoshalWorld.Com).mp3"
    },
    {
        title: "Wavy",
        artist: "Karan Aujla",
        image: "wavy.jpg",
        audio: "Wavy - Karan Aujla.mp3"
    },
    {
        title: "Whoopty",
        artist: "CJ",
        image: "whoopty.jpeg",
        audio: "CJ_-_Whoopty_CeeNaija.com_.mp3"
    },
    {
        title: "Illegal Weapon 2.0",
        artist: "Jasmine Sandlas & Garry Sandhu",
        image: "illegal weapon 2.O.jpg",
        audio: "Illegal Weapon 2.0 Street Dancer 3d 128 Kbps.mp3"
    },
    {
        title: "Kar Har Maidan Fateh",
        artist: "Sukhwinder Singh & Shreya Ghoshal",
        image: "kar har maidan.jpeg",
        audio: "Kar Har Maidaan Fateh Sanju 128 Kbps.mp3"
    },
    {
        title: "Jee Karda",
        artist: "Divya Kumar",
        image: "jee karde.jpeg",
        audio: "Jee Karda (Badlapur) - Divya Kumar.mp3"
    },
    {
        title: "Bolo Har Har",
        artist: "Mithoon, Sukhwinder Singh & Badshah",
        image: "bolo har har har.jpg",
        audio: "Bolo Har Har Har Shivaay 128 Kbps.mp3"
    },
    {
        title: "Yalgar",
        artist: "CarryMinati",
        image: "yalgaar.jpg",
        audio: "Yalgaar_1.mp3"
    },
    {
        title: "3:59 A.M",
        artist: "DIVINE",
        image: "am.jpg",
        audio: "DIVINE - 3_59 AM(KoshalWorld.Com).mp3"
    },
    {
        title: "Shiva Tandava",
        artist: "Shiv Tandav Stotram",
        image: "shiva.jpeg",
        audio: "Shiv Tandav Stotram in Female Voice-(Mr-Jat.in).mp3"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSplashScreen();
    initializePlayer();
    initializeNavigation();
    initializeCards();
    initializeResponsive();
    initializePlaylists();
    initializePodcasts();
    initializeProfile();
    initializeLibraryNavigation();
    initializeQuickSearch();
    updateGreeting();
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
            updateVolumeBarColor();
        });
        
        volumeBar.addEventListener('mouseenter', updateVolumeBarColor);
        volumeBar.addEventListener('mousemove', updateVolumeBarColor);
    }

    if (volumeBtn) {
        volumeBtn.addEventListener('click', toggleMute);
    }

    // Heart Icon
    if (heartIcon) {
        heartIcon.addEventListener('click', () => {
            // Toggle liked state for current track
            if (likedTracks.has(currentTrackIndex)) {
                // Unlike current track
                likedTracks.delete(currentTrackIndex);
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
            } else {
                // Like current track
                likedTracks.add(currentTrackIndex);
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
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
    addRecentlyPlayed(tracks[currentTrackIndex]);
    renderRecentlyPlayed();
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });

    // Load first track
    loadTrack(currentTrackIndex);
    
    // Initialize volume bar color
    updateVolumeBarColor();
    
    // Apply saved audio quality setting on load
    const savedQuality = localStorage.getItem('audioQuality') || 'normal';
    if (typeof applyAudioQuality === 'function') {
        applyAudioQuality(savedQuality);
    }
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
    
    // Update heart icon based on whether this track is liked
    updateHeartIcon();
}

function updateHeartIcon() {
    if (!heartIcon) return;
    
    // Check if current track is liked
    if (likedTracks.has(currentTrackIndex)) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
    } else {
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
    }
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
    const progressValue = isNaN(progress) ? 0 : progress;
    progressBar.value = progressValue;
    
    // Update CSS variable for blue color fill
    progressBar.style.setProperty('--progress', progressValue + '%');
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

function updateVolumeBarColor() {
    if (!volumeBar) return;
    
    // Remove all volume classes
    volumeBar.classList.remove('volume-0', 'volume-50', 'volume-100', 'volume-over-50', 'volume-under-50');
    
    // Update CSS variable
    volumeBar.style.setProperty('--volume', volume + '%');
    
    // Calculate smooth color transition from blue to green for volumes above 50%
    if (volume > 50) {
        // Calculate the transition factor: 0 at 50%, 1 at 100%
        const transitionFactor = (volume - 50) / 50;
        
        // Interpolate between blue (#0066ff) and green (#1db954)
        const blue = { r: 0, g: 102, b: 255 };
        const green = { r: 29, g: 185, b: 84 };
        
        const r = Math.round(blue.r + (green.r - blue.r) * transitionFactor);
        const g = Math.round(blue.g + (green.g - blue.g) * transitionFactor);
        const b = Math.round(blue.b + (green.b - blue.b) * transitionFactor);
        
        const color = `rgb(${r}, ${g}, ${b})`;
        volumeBar.style.setProperty('--volume-color', color);
        volumeBar.classList.add('volume-over-50');
    } else {
        // Remove the color variable for volumes 50% and below
        volumeBar.style.removeProperty('--volume-color');
    }
    
    // Add appropriate class based on volume level
    if (volume == 0) {
        volumeBar.classList.add('volume-0');
    } else if (volume == 50) {
        volumeBar.classList.add('volume-50');
    } else if (volume == 100) {
        volumeBar.classList.add('volume-100');
    } else if (volume < 50) {
        volumeBar.classList.add('volume-under-50');
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
    
    // Hide playlist content if it exists
    const playlistContent = mainContent.querySelector('.playlist-content');
    if (playlistContent) {
        playlistContent.style.display = 'none';
    }
    
    // Hide podcasts content if it exists
    const podcastsContent = mainContent.querySelector('.podcasts-content');
    if (podcastsContent) {
        podcastsContent.style.display = 'none';
    }
    
    // Hide settings content if it exists
    const settingsContent = mainContent.querySelector('.settings-content');
    if (settingsContent) {
        settingsContent.style.display = 'none';
    }
    
    // Scroll to top
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    
    currentView = 'home';
    
    // Add to history only if not already navigating through history
    if (!isNavigatingHistory && (navigationHistory.length === 0 || navigationHistory[historyIndex]?.type !== 'home')) {
        addToHistory({ type: 'home', data: null });
    }
    
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
                
                <div class="search-results" id="searchResults"></div>
                <h2 class="section-title" style="margin-top: 2rem;">Browse all</h2>
                <div class="search-categories" id="browseCards"></div>
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
    
    // Hide other content
    const playlistContent = mainContent.querySelector('.playlist-content');
    if (playlistContent) {
        playlistContent.style.display = 'none';
    }
    
    const podcastsContent = mainContent.querySelector('.podcasts-content');
    if (podcastsContent) {
        podcastsContent.style.display = 'none';
    }
    
    browseCardsContainer = document.getElementById('browseCards');
    searchResultsContainer = document.getElementById('searchResults');
    renderBrowseCards();
    renderSearchResults([], '');
    
    // Initialize interactive cards
    initializeInteractiveCards();
    
    currentView = 'search';
    
    // Add to history only if not already navigating through history
    if (!isNavigatingHistory && (navigationHistory.length === 0 || navigationHistory[historyIndex]?.type !== 'search')) {
        addToHistory({ type: 'search', data: null });
    }
}

// Initialize Interactive Cards
function initializeInteractiveCards() {
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('click', handleInteractiveCardClick);
        
        // Add close button handler
        const closeBtn = card.querySelector('.interactive-card-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeInteractiveCard(card);
            });
        }
    });
}

// Close Interactive Card
function closeInteractiveCard(card) {
    const expandedContent = card.querySelector('.interactive-card-expanded');
    card.classList.remove('expanded');
    const closeBtn = card.querySelector('.interactive-card-close');
    if (closeBtn) {
        closeBtn.style.display = 'none';
    }
    if (expandedContent) {
        setTimeout(() => {
            expandedContent.style.display = 'none';
            card.classList.remove('popped');
        }, 300);
    }
}

// Handle Interactive Card Click
function handleInteractiveCardClick(e) {
    // Don't trigger if clicking on play button or song item
    if (e.target.closest('.song-item-play-btn') || e.target.closest('.interactive-card-song-item')) {
        return;
    }
    
    const card = e.currentTarget;
    const expandedContent = card.querySelector('.interactive-card-expanded');
    
    // Check if card is already expanded
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards first
    document.querySelectorAll('.interactive-card').forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded', 'popped');
            const otherExpanded = otherCard.querySelector('.interactive-card-expanded');
            if (otherExpanded) {
                otherExpanded.style.display = 'none';
            }
        }
    });
    
    // Close if clicking on close button (::after pseudo-element area)
    if (isExpanded && e.offsetX > card.offsetWidth - 50 && e.offsetY < 50) {
        card.classList.remove('expanded');
        if (expandedContent) {
            setTimeout(() => {
                expandedContent.style.display = 'none';
                card.classList.remove('popped');
            }, 300);
        }
        return;
    }
    
    if (!isExpanded) {
        // Pop out animation
        card.classList.add('popped');
        const closeBtn = card.querySelector('.interactive-card-close');
        if (closeBtn) {
            closeBtn.style.display = 'flex';
        }
        
        // Add overlay click handler to close
        setTimeout(() => {
            // Expand animation
            card.classList.add('expanded');
            if (expandedContent) {
                expandedContent.style.display = 'block';
            }
            
            // Load songs for this category
            loadCategorySongs(card);
            
            // Add click handler to close when clicking outside
            const overlayClickHandler = (e) => {
                if (!card.contains(e.target) && card.classList.contains('expanded')) {
                    closeInteractiveCard(card);
                    document.removeEventListener('click', overlayClickHandler);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', overlayClickHandler);
            }, 100);
        }, 200);
    } else {
        // Collapse animation
        closeInteractiveCard(card);
    }
}

// Load songs for category
function loadCategorySongs(card) {
    const songsContainer = card.querySelector('.interactive-card-songs');
    if (!songsContainer || songsContainer.children.length > 0) return;
    
    // Get category title to filter songs
    const categoryTitle = card.querySelector('.interactive-card-title').textContent;
    
    // Define song mappings for each category
    const categorySongs = {
        'Bhakti': [
            'Sathie Pauti Bhogaru Tumara',
            'Mu Ta Bada Deulara Parare'
        ],
        'The 60s:Where Rock and Roll Met Rebellion and Soul': [
            'Yeh Raaten Yeh Mausam',
            'O_Haseena_Zulfowali'
        ],
        'Fall in Love with This Romantic Playlist': [
            'Mere Paas Tum Ho',
            'Ranga Saari',
            'Janiye',
            'Tujhe Kitna Chahne Lage',
            'Raabta',
            'Sundari',
            'Barso Re'
        ],
        'Punjabi': [
            'AZUL',
            'Suit Suit',
            'Naah',
            'Lahore'
        ],
        'Emotional': [
            'Pachtaoge',
            'Bekhayali',
            'Bol Na Halke Halke',
            'Sajda',
            'Enna Sona'
        ],
        'The Ultimate Gym Playlist:Pump Up Your Workout': [
            'Wavy',
            'Whoopty',
            'Illegal Weapon 2.0',
            'Kar Har Maidan Fateh',
            'Jee Karda',
            'Bolo Har Har',
            'Yalgar',
            '3:59 A.M',
            'Shiva Tandava'
        ]
    };
    
    // Get songs for this category
    const songTitles = categorySongs[categoryTitle] || [];
    
    // Find matching tracks
    const filteredTracks = [];
    songTitles.forEach(songTitle => {
        const track = tracks.find(t => {
            // Match by title (case insensitive, handle variations)
            let trackTitleLower = t.title.toLowerCase().trim();
            let songTitleLower = songTitle.toLowerCase().trim();
            
            // Normalize titles (remove special characters, extra spaces)
            trackTitleLower = trackTitleLower.replace(/[_\-\s]+/g, ' ').trim();
            songTitleLower = songTitleLower.replace(/[_\-\s]+/g, ' ').trim();
            
            // Handle specific variations
            const variations = {
                'o haseena zulfowali': ['o haseena zulfonwali', 'o_haseena_zulfonwali'],
                'ranga saari': ['rangi saari'],
                'bekhayali': ['bekhayali (arijit singh version)'],
                '3:59 a.m': ['3:59 am', 'divine - 3_59 am', '3 59 am'],
                'shiva tandava': ['shiv tandav stotram', 'shiva tandav']
            };
            
            // Check exact match
            if (trackTitleLower === songTitleLower) {
                return true;
            }
            
            // Check if track title contains song title or vice versa
            if (trackTitleLower.includes(songTitleLower) || songTitleLower.includes(trackTitleLower)) {
                return true;
            }
            
            // Check variations
            if (variations[songTitleLower]) {
                return variations[songTitleLower].some(variation => 
                    trackTitleLower.includes(variation) || variation.includes(trackTitleLower)
                );
            }
            
            return false;
        });
        
        if (track) {
            filteredTracks.push(track);
        }
    });
    
    // Create song list
    filteredTracks.forEach((track, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'interactive-card-song-item';
        songItem.innerHTML = `
            <div class="song-item-number">${index + 1}</div>
            <div class="song-item-info">
                <div class="song-item-title">${track.title}</div>
                <div class="song-item-artist">${track.artist}</div>
            </div>
            <button class="song-item-play-btn" data-track-index="${tracks.findIndex(t => t.audio === track.audio)}">
                <i class="fa-solid fa-play"></i>
            </button>
        `;
        
        // Add click handler to play song
        const playBtn = songItem.querySelector('.song-item-play-btn');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackIndex = parseInt(playBtn.dataset.trackIndex);
            if (trackIndex >= 0 && trackIndex < tracks.length) {
                playTrackByIndex(trackIndex);
            }
        });
        
        // Also make the whole item clickable
        songItem.addEventListener('click', (e) => {
            if (!e.target.closest('.song-item-play-btn')) {
                const trackIndex = parseInt(playBtn.dataset.trackIndex);
                if (trackIndex >= 0 && trackIndex < tracks.length) {
                    playTrackByIndex(trackIndex);
                }
            }
        });
        
        songsContainer.appendChild(songItem);
    });
}

// Handle search input
function handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (!searchTerm) {
        renderSearchResults([], '');
        return;
    }
    const matchedTracks = tracks.filter(track => {
        const title = track.title.toLowerCase();
        const artist = track.artist.toLowerCase();
        return title.includes(searchTerm) || artist.includes(searchTerm);
    });
    renderSearchResults(matchedTracks, searchTerm);
}

// Card Interactions
function initializeCards() {
    cards.forEach((card, index) => {
        const playButton = card.querySelector('.play-button-overlay');
        const cardTitle = card.querySelector('.card-title');
        const cardImage = card.querySelector('img');
        
        // Check if card has a data-track attribute (trending cards)
        const trackName = card.dataset.track;
        let trackIndex = index < tracks.length ? index : 0;
        
        if (trackName) {
            // Find track by name for trending cards
            const foundTrack = tracks.find(t => t.title === trackName);
            if (foundTrack) {
                trackIndex = tracks.findIndex(t => t.audio === foundTrack.audio);
            }
        }
        
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                loadTrack(trackIndex);
                audioPlayer.play().catch(err => {
                    console.error('Error playing audio:', err);
                    alert('Audio file not found. Please add audio files to the audio folder.');
                });
            });
        }

        card.addEventListener('click', () => {
            playTrackByIndex(trackIndex);
        });
    });
}

function playTrack(track) {
    const trackIndex = tracks.findIndex(t => t.audio === track.audio);
    if (trackIndex !== -1) {
        playTrackByIndex(trackIndex);
    }
}

function playTrackByIndex(index) {
    if (index < 0 || index >= tracks.length) return;
    loadTrack(index);
    audioPlayer.play().catch(err => {
        console.error('Error playing audio:', err);
        alert('Audio file not found. Please add audio files to the project directory.');
    });
}

function addRecentlyPlayed(track) {
    if (!track) return;
    const existingIndex = recentlyPlayed.findIndex(item => item.audio === track.audio);
    if (existingIndex !== -1) {
        recentlyPlayed.splice(existingIndex, 1);
    }
    recentlyPlayed.unshift(track);
    if (recentlyPlayed.length > 8) {
        recentlyPlayed.pop();
    }
}

function renderRecentlyPlayed() {
    if (!recentlyPlayedContainer) return;
    recentlyPlayedContainer.innerHTML = '';
    recentlyPlayed.forEach((track, index) => {
        const card = createTrackCard(track, { badgeText: 'Recent' });
        recentlyPlayedContainer.appendChild(card);
    });
}

function createTrackCard(track, { badgeText = 'Play', cardClass = '' } = {}) {
    const card = document.createElement('div');
    card.className = 'card';
    if (cardClass) card.classList.add(cardClass);
    card.innerHTML = `
        <div class="card-image-wrapper">
            <img src="${track.image}" alt="${track.title}">
            <div class="play-button-overlay">
                <i class="fa-solid fa-play"></i>
            </div>
            <button class="badge card-badge">${badgeText}</button>
        </div>
        <p class="card-title">${track.title}</p>
        <p class="card-info">${track.artist}</p>
    `;
    const playButton = card.querySelector('.play-button-overlay');
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        playTrack(track);
    });
    card.addEventListener('click', () => playTrack(track));
    return card;
}

function renderBrowseCards() {
    if (!browseCardsContainer) return;
    browseCardsContainer.innerHTML = '';
    
    // Create the 6 specific interactive cards
    const cardData = [
        { title: "Bhakti", gradient: "linear-gradient(135deg, #450af5 0%, #c4efd9 100%)" },
        { title: "The 60s:Where Rock and Roll Met Rebellion and Soul", gradient: "linear-gradient(135deg, #e13300 0%, #f06200 100%)" },
        { title: "Fall in Love with This Romantic Playlist", gradient: "linear-gradient(135deg, #1e3264 0%, #a567d4 100%)" },
        { title: "Punjabi", gradient: "linear-gradient(135deg, #e8115b 0%, #006450 100%)" },
        { title: "Emotional", gradient: "linear-gradient(135deg, #8400e7 0%, #2d00f5 100%)" },
        { title: "The Ultimate Gym Playlist:Pump Up Your Workout", gradient: "linear-gradient(135deg, #1e3264 0%, #009cbf 100%)" }
    ];
    
    cardData.forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'interactive-card';
        card.dataset.cardIndex = index;
        card.style.background = data.gradient;
        card.innerHTML = `
            <button class="interactive-card-close" style="display: none;" aria-label="Close">
                <i class="fa-solid fa-times"></i>
            </button>
            <div class="interactive-card-content">
                <h3 class="interactive-card-title">${data.title}</h3>
                <div class="interactive-card-expanded" style="display: none;">
                    <p class="interactive-card-description">Explore this curated collection of songs</p>
                    <div class="interactive-card-songs"></div>
                </div>
            </div>
        `;
        browseCardsContainer.appendChild(card);
    });
}

function renderSearchResults(results, searchTerm = '') {
    if (!searchResultsContainer) return;
    searchResultsContainer.innerHTML = '';
    if (!searchTerm) {
        searchResultsContainer.innerHTML = '<p class="search-hint">Type the name of a song or artist to start searching.</p>';
        return;
    }
    if (results.length === 0) {
        searchResultsContainer.innerHTML = `<p class="search-hint">No results found for "${searchTerm}".</p>`;
        return;
    }
    const resultsList = document.createElement('div');
    resultsList.className = 'search-results-list';
    results.forEach(track => {
        const card = createTrackCard(track, { badgeText: 'Match' });
        resultsList.appendChild(card);
    });
    searchResultsContainer.appendChild(resultsList);
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

// ==================== PLAYLIST FUNCTIONALITY ====================

function initializePlaylists() {
    const createPlaylistBtn = document.getElementById('createPlaylistBtn');
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', createPlaylist);
    }
    
    // Add click handler for "Your Library" link
    const libraryLink = document.querySelector('.lib-option a');
    if (libraryLink) {
        libraryLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLibrary();
        });
    }
    
    // Render playlists in library on initialization
    renderPlaylistsInLibrary();
}

function createPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName && playlistName.trim() !== '') {
        const newPlaylist = {
            id: Date.now(),
            name: playlistName.trim(),
            songs: []
        };
        playlists.push(newPlaylist);
        renderPlaylistsInLibrary();
        // Scroll to show the new playlist
        const library = document.querySelector('.library');
        if (library) {
            library.scrollTop = library.scrollHeight;
        }
        showPlaylistPage(newPlaylist.id);
    }
}

function renderPlaylistsInLibrary() {
    const libBox = document.querySelector('.lib-box');
    if (!libBox) return;
    
    // Find the create playlist box (first box)
    const createPlaylistBox = libBox.querySelector('.box:first-child');
    const podcastsBox = libBox.querySelector('.box:last-child');
    
    // Remove existing playlist list if it exists
    const existingPlaylistList = libBox.querySelector('.playlists-list');
    if (existingPlaylistList) {
        existingPlaylistList.remove();
    }
    
    // Only show create playlist box if no playlists exist
    if (playlists.length === 0) {
        if (createPlaylistBox) createPlaylistBox.style.display = 'block';
    } else {
        if (createPlaylistBox) createPlaylistBox.style.display = 'none';
        
        // Create playlists list container
        const playlistsList = document.createElement('div');
        playlistsList.className = 'playlists-list';
        
        playlists.forEach(playlist => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.innerHTML = `
                <div class="playlist-item-content" data-playlist-id="${playlist.id}">
                    <div class="playlist-item-icon">
                        <i class="fa-solid fa-music"></i>
                    </div>
                    <div class="playlist-item-info">
                        <p class="playlist-item-name">${playlist.name}</p>
                        <p class="playlist-item-count">${playlist.songs.length} songs</p>
                    </div>
                </div>
                <button class="delete-playlist-btn" data-playlist-id="${playlist.id}" aria-label="Delete playlist">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            
            // Add click handler to open playlist
            const content = playlistItem.querySelector('.playlist-item-content');
            content.addEventListener('click', () => {
                showPlaylistPage(playlist.id);
            });
            
            // Add delete handler
            const deleteBtn = playlistItem.querySelector('.delete-playlist-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deletePlaylist(playlist.id);
            });
            
            playlistsList.appendChild(playlistItem);
        });
        
        // Insert playlists list before podcasts box
        if (podcastsBox && podcastsBox.parentNode) {
            libBox.insertBefore(playlistsList, podcastsBox);
        } else {
            libBox.appendChild(playlistsList);
        }
    }
}

function deletePlaylist(playlistId) {
    if (confirm('Are you sure you want to delete this playlist?')) {
        const index = playlists.findIndex(p => p.id === playlistId);
        if (index !== -1) {
            playlists.splice(index, 1);
            renderPlaylistsInLibrary();
            
            // If the deleted playlist was being viewed, go back to library
            const playlistContent = document.querySelector('.playlist-content');
            if (playlistContent && playlistContent.style.display !== 'none') {
                showLibrary();
            }
        }
    }
}

function showPlaylistPage(playlistId) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    currentView = 'playlist';
    
    // Hide home sections
    const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer, .search-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Hide podcasts content
    const podcastsContent = mainContent.querySelector('.podcasts-content');
    if (podcastsContent) {
        podcastsContent.style.display = 'none';
    }
    
    // Check if playlist content already exists
    let playlistContent = mainContent.querySelector('.playlist-content');
    
    if (!playlistContent) {
        playlistContent = document.createElement('div');
        playlistContent.className = 'playlist-content';
        mainContent.appendChild(playlistContent);
    }
    
    playlistContent.style.display = 'block';
    playlistContent.innerHTML = `
        <div class="playlist-header">
            <button class="back-to-library-btn" id="backToLibraryBtn">
                <i class="fa-solid fa-chevron-left"></i> Your Library
            </button>
            <div class="playlist-info">
                <div class="playlist-image">
                    <i class="fa-solid fa-music"></i>
                </div>
                <div class="playlist-details">
                    <p class="playlist-type">Playlist</p>
                    <h1 class="playlist-title">${playlist.name}</h1>
                    <p class="playlist-meta">${playlist.songs.length} songs</p>
                </div>
            </div>
        </div>
        <div class="playlist-actions">
            <button class="playlist-play-btn" id="playPlaylistBtn">
                <i class="fa-solid fa-play"></i>
            </button>
            <button class="add-songs-btn" id="addSongsBtn">
                <i class="fa-solid fa-plus"></i> Add Songs
            </button>
        </div>
        <div class="playlist-songs-container" id="playlistSongsContainer">
            ${playlist.songs.length === 0 ? 
                '<div class="empty-playlist"><p>No songs in this playlist yet. Click "Add Songs" to get started!</p></div>' :
                renderPlaylistSongs(playlist.songs)
            }
        </div>
    `;
    
    // Add event listeners
    const backToLibraryBtn = playlistContent.querySelector('#backToLibraryBtn');
    if (backToLibraryBtn) {
        backToLibraryBtn.addEventListener('click', showLibrary);
    }
    
    const addSongsBtn = playlistContent.querySelector('#addSongsBtn');
    if (addSongsBtn) {
        addSongsBtn.addEventListener('click', () => showAddSongsModal(playlistId));
    }
    
    const playPlaylistBtn = playlistContent.querySelector('#playPlaylistBtn');
    if (playPlaylistBtn && playlist.songs.length > 0) {
        playPlaylistBtn.addEventListener('click', () => {
            if (playlist.songs.length > 0) {
                const firstTrackIndex = tracks.findIndex(t => t.audio === playlist.songs[0].audio);
                if (firstTrackIndex >= 0) {
                    playTrackByIndex(firstTrackIndex);
                }
            }
        });
    }
    
    // Initialize playlist song clicks
    initializePlaylistSongClicks(playlistId);
    
    // Add to history only if not already navigating through history
    if (!isNavigatingHistory && (navigationHistory.length === 0 || navigationHistory[historyIndex]?.type !== 'playlist' || navigationHistory[historyIndex]?.data !== playlistId)) {
        addToHistory({ type: 'playlist', data: playlistId });
    }
}

function renderPlaylistSongs(songs) {
    return songs.map((song, index) => {
        const track = tracks.find(t => t.audio === song.audio);
        if (!track) return '';
        return `
            <div class="playlist-song-item" data-track-index="${tracks.findIndex(t => t.audio === track.audio)}">
                <div class="song-number">${index + 1}</div>
                <div class="song-info">
                    <div class="song-title">${track.title}</div>
                    <div class="song-artist">${track.artist}</div>
                </div>
                <div class="song-duration">-</div>
                <button class="remove-song-btn" data-song-index="${index}">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
}

function initializePlaylistSongClicks(playlistId) {
    const songItems = document.querySelectorAll('.playlist-song-item');
    songItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-song-btn')) {
                const trackIndex = parseInt(item.dataset.trackIndex);
                if (trackIndex >= 0 && trackIndex < tracks.length) {
                    playTrackByIndex(trackIndex);
                }
            }
        });
    });
    
    const removeBtns = document.querySelectorAll('.remove-song-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const songIndex = parseInt(btn.dataset.songIndex);
            const playlist = playlists.find(p => p.id === playlistId);
            if (playlist && playlist.songs[songIndex]) {
                playlist.songs.splice(songIndex, 1);
                // Update playlist count in library
                renderPlaylistsInLibrary();
                showPlaylistPage(playlistId);
            }
        });
    });
}

function showAddSongsModal(playlistId) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Track selected songs (songs that were clicked but not yet added)
    const selectedSongs = new Set();
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'add-songs-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h2>Add Songs to Playlist</h2>
                    <span class="selected-count" style="display: none; font-size: 0.875rem; color: #1db954; margin-top: 0.25rem;">0 selected</span>
                </div>
                <button class="modal-close-btn" id="closeModalBtn">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="modal-search">
                <input type="text" class="modal-search-input" id="modalSearchInput" placeholder="Search for songs...">
            </div>
            <div class="modal-songs-list" id="modalSongsList">
                ${renderAllSongsForModal(playlistId, selectedSongs)}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Function to update selected count
    const updateSelectedCount = () => {
        const countEl = modal.querySelector('.selected-count');
        if (countEl) {
            const count = selectedSongs.size;
            if (count > 0) {
                countEl.textContent = `${count} selected`;
                countEl.style.display = 'block';
            } else {
                countEl.style.display = 'none';
            }
        }
    };
    
    // Initial count update
    updateSelectedCount();
    
    // Function to add selected songs to playlist
    const addSelectedSongsToPlaylist = () => {
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist) return;
        
        let songsAdded = 0;
        selectedSongs.forEach(trackIndex => {
            if (trackIndex >= 0 && trackIndex < tracks.length) {
                const track = tracks[trackIndex];
                if (!playlist.songs.find(s => s.audio === track.audio)) {
                    playlist.songs.push(track);
                    songsAdded++;
                }
            }
        });
        
        if (songsAdded > 0) {
            // Update playlist page if it's open
            const playlistContent = document.querySelector('.playlist-content');
            if (playlistContent && playlistContent.style.display !== 'none') {
                showPlaylistPage(playlistId);
            }
            // Update library playlist count
            renderPlaylistsInLibrary();
        }
    };
    
    // Close modal handlers - add selected songs when closing
    const closeModal = () => {
        addSelectedSongsToPlaylist();
        modal.remove();
    };
    
    const closeBtn = modal.querySelector('#closeModalBtn');
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Search functionality
    const searchInput = modal.querySelector('#modalSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const songsList = modal.querySelector('#modalSongsList');
            const allSongs = renderAllSongsForModal(playlistId, selectedSongs);
            if (searchTerm === '') {
                songsList.innerHTML = allSongs;
            } else {
                const filtered = tracks.filter(track => 
                    track.title.toLowerCase().includes(searchTerm) ||
                    track.artist.toLowerCase().includes(searchTerm)
                );
                songsList.innerHTML = renderFilteredSongsForModal(filtered, playlistId, selectedSongs);
            }
            attachAddSongListeners(playlistId, modal, selectedSongs, updateSelectedCount);
        });
    }
    
    attachAddSongListeners(playlistId, modal, selectedSongs, updateSelectedCount);
}

function renderAllSongsForModal(playlistId, selectedSongs = new Set()) {
    const playlist = playlists.find(p => p.id === playlistId);
    const playlistAudioFiles = playlist ? playlist.songs.map(s => s.audio) : [];
    
    return tracks.map(track => {
        const trackIndex = tracks.findIndex(t => t.audio === track.audio);
        const isInPlaylist = playlistAudioFiles.includes(track.audio);
        const isSelected = selectedSongs.has(trackIndex);
        return `
            <div class="modal-song-item ${isInPlaylist ? 'in-playlist' : ''} ${isSelected ? 'selected' : ''}" data-track-index="${trackIndex}">
                <img src="${track.image}" alt="${track.title}" class="modal-song-image">
                <div class="modal-song-info">
                    <div class="modal-song-title">${track.title}</div>
                    <div class="modal-song-artist">${track.artist}</div>
                </div>
                <button class="add-to-playlist-btn" ${isInPlaylist ? 'disabled' : ''}>
                    <i class="fa-solid ${isInPlaylist ? 'fa-check' : isSelected ? 'fa-check' : 'fa-plus'}"></i>
                </button>
            </div>
        `;
    }).join('');
}

function renderFilteredSongsForModal(filteredTracks, playlistId, selectedSongs = new Set()) {
    const playlist = playlists.find(p => p.id === playlistId);
    const playlistAudioFiles = playlist ? playlist.songs.map(s => s.audio) : [];
    
    return filteredTracks.map(track => {
        const trackIndex = tracks.findIndex(t => t.audio === track.audio);
        const isInPlaylist = playlistAudioFiles.includes(track.audio);
        const isSelected = selectedSongs.has(trackIndex);
        return `
            <div class="modal-song-item ${isInPlaylist ? 'in-playlist' : ''} ${isSelected ? 'selected' : ''}" data-track-index="${trackIndex}">
                <img src="${track.image}" alt="${track.title}" class="modal-song-image">
                <div class="modal-song-info">
                    <div class="modal-song-title">${track.title}</div>
                    <div class="modal-song-artist">${track.artist}</div>
                </div>
                <button class="add-to-playlist-btn" ${isInPlaylist ? 'disabled' : ''}>
                    <i class="fa-solid ${isInPlaylist ? 'fa-check' : isSelected ? 'fa-check' : 'fa-plus'}"></i>
                </button>
            </div>
        `;
    }).join('');
}

function attachAddSongListeners(playlistId, modal, selectedSongs = new Set(), updateSelectedCount = null) {
    const addBtns = modal.querySelectorAll('.add-to-playlist-btn:not([disabled])');
    
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const songItem = btn.closest('.modal-song-item');
            const trackIndex = parseInt(songItem.dataset.trackIndex);
            
            if (trackIndex >= 0 && trackIndex < tracks.length) {
                // Toggle selection state
                if (selectedSongs.has(trackIndex)) {
                    selectedSongs.delete(trackIndex);
                    songItem.classList.remove('selected');
                    btn.querySelector('i').classList.remove('fa-check');
                    btn.querySelector('i').classList.add('fa-plus');
                } else {
                    selectedSongs.add(trackIndex);
                    songItem.classList.add('selected');
                    btn.querySelector('i').classList.remove('fa-plus');
                    btn.querySelector('i').classList.add('fa-check');
                }
                if (updateSelectedCount) {
                    updateSelectedCount();
                }
            }
        });
    });
}

function showLibrary() {
    currentView = 'home';
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Show home sections
    const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer');
    sections.forEach(section => {
        section.style.display = '';
    });
    
    // Hide playlist content
    const playlistContent = mainContent.querySelector('.playlist-content');
    if (playlistContent) {
        playlistContent.style.display = 'none';
    }
    
    // Hide search content
    const searchContent = mainContent.querySelector('.search-content');
    if (searchContent) {
        searchContent.style.display = 'none';
    }
    
    // Hide podcasts content
    const podcastsContent = mainContent.querySelector('.podcasts-content');
    if (podcastsContent) {
        podcastsContent.style.display = 'none';
    }
    
    // Add to history only if not already navigating through history
    if (!isNavigatingHistory && (navigationHistory.length === 0 || navigationHistory[historyIndex]?.type !== 'library')) {
        addToHistory({ type: 'library', data: null });
    }
}

// ==================== PODCAST FUNCTIONALITY ====================

function initializePodcasts() {
    const browsePodcastsBtn = document.getElementById('browsePodcastsBtn');
    if (browsePodcastsBtn) {
        browsePodcastsBtn.addEventListener('click', showPodcastsPage);
    }
}

function showPodcastsPage() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    currentView = 'podcasts';
    
    // Hide home sections
    const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer, .search-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Hide playlist content
    const playlistContent = mainContent.querySelector('.playlist-content');
    if (playlistContent) {
        playlistContent.style.display = 'none';
    }
    
    // Check if podcasts content already exists
    let podcastsContent = mainContent.querySelector('.podcasts-content');
    
    if (!podcastsContent) {
        podcastsContent = document.createElement('div');
        podcastsContent.className = 'podcasts-content';
        mainContent.appendChild(podcastsContent);
    }
    
    podcastsContent.style.display = 'block';
    
    // Podcast data from the Spotify link
    const podcastData = {
        title: "The Cold Footsteps ☠️ l Scary Horror Story",
        type: "Horror Podcast Hindi",
        date: "Nov 22",
        duration: "33 min",
        description: "Hindi horror story - Indian horror podcast - true horror story Hindi - scary story in Hindi - paranormal Hindi podcast - Praveen Horror Podcast",
        episodeLink: "https://open.spotify.com/episode/3S6PmJcqt95qu7RyXkNmAV?si=14ed_n_RS7KnrgBhnHuB3A",
        showLink: "https://open.spotify.com/show/4bP1dFt8ZMzCuO2eAZBbCy?si=3ea942f008c64016",
        otherShowLink: "https://open.spotify.com/show/1u1LNBjAd1LLRW8GXML1er?si=8b5542600a9445d2",
        contact: {
            instagram: "Praveenstory",
            email: "praveen.rags3@gmail.com"
        }
    };
    
    podcastsContent.innerHTML = `
        <div class="podcasts-header">
            <button class="back-to-library-btn" id="backToLibraryFromPodcastsBtn">
                <i class="fa-solid fa-chevron-left"></i> Your Library
            </button>
            <h1 class="podcasts-page-title">Browse Podcasts</h1>
        </div>
        <div class="podcast-card">
            <div class="podcast-image">
                <i class="fa-solid fa-podcast"></i>
            </div>
            <div class="podcast-info">
                <p class="podcast-type">${podcastData.type}</p>
                <h2 class="podcast-title">${podcastData.title}</h2>
                <p class="podcast-meta">
                    <span class="podcast-date">${podcastData.date}</span>
                    <span class="podcast-duration">${podcastData.duration}</span>
                </p>
                <p class="podcast-description">${podcastData.description}</p>
                <div class="podcast-actions">
                    <button class="podcast-play-btn" id="podcastPlayBtn">
                        <i class="fa-solid fa-play"></i> Play Episode
                    </button>
                    <a href="${podcastData.episodeLink}" target="_blank" class="podcast-link-btn">
                        <i class="fa-brands fa-spotify"></i> Open in Spotify
                    </a>
                </div>
                <div class="podcast-shows">
                    <h3>More Podcasts:</h3>
                    <a href="${podcastData.showLink}" target="_blank" class="show-link">
                        Darawani Daastanien
                    </a>
                    <a href="${podcastData.otherShowLink}" target="_blank" class="show-link">
                        Scary Horror Stories Hindi
                    </a>
                </div>
                <div class="podcast-contact">
                    <h3>Connect:</h3>
                    <p><i class="fa-brands fa-instagram"></i> Instagram: ${podcastData.contact.instagram}</p>
                    <p><i class="fa-solid fa-envelope"></i> Email: ${podcastData.contact.email}</p>
                </div>
            </div>
        </div>
        <div class="podcast-episodes">
            <h2 class="section-title">More Episodes Like This</h2>
            <div class="episode-list">
                <div class="episode-item">
                    <div class="episode-image">
                        <i class="fa-solid fa-podcast"></i>
                    </div>
                    <div class="episode-info">
                        <h3>The BASEMENT l Terrifying Horror Encounter</h3>
                        <p class="episode-meta">Horror Podcast Hindi</p>
                    </div>
                </div>
                <div class="episode-item">
                    <div class="episode-image">
                        <i class="fa-solid fa-podcast"></i>
                    </div>
                    <div class="episode-info">
                        <h3>CHAWL - Terrifying Horror Story</h3>
                        <p class="episode-meta">Horror Podcast Hindi</p>
                    </div>
                </div>
                <div class="episode-item">
                    <div class="episode-image">
                        <i class="fa-solid fa-podcast"></i>
                    </div>
                    <div class="episode-info">
                        <h3>Haunted mill | चुड़ैल का घर | a story by horror Hindi podcast</h3>
                        <p class="episode-meta">Horror Podcast Hindi</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const backBtn = podcastsContent.querySelector('#backToLibraryFromPodcastsBtn');
    if (backBtn) {
        backBtn.addEventListener('click', showLibrary);
    }
    
    const playBtn = podcastsContent.querySelector('#podcastPlayBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            alert('Podcast playback requires Spotify integration. Click "Open in Spotify" to listen.');
        });
    }
    
    // Add to history only if not already navigating through history
    if (!isNavigatingHistory && (navigationHistory.length === 0 || navigationHistory[historyIndex]?.type !== 'podcasts')) {
        addToHistory({ type: 'podcasts', data: null });
    }
}

// ==================== PROFILE FUNCTIONALITY ====================

function initializeProfile() {
    const userProfileBtn = document.getElementById('userProfileBtn');
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSettingsMenu();
        });
    }
    
    // Load saved profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        updateGreeting();
    }
    
    // Initialize dropdown menu items
    const accountLink = document.getElementById('accountLink');
    const settingsLink = document.getElementById('settingsLink');
    const themeToggleLink = document.getElementById('themeToggleLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (accountLink) {
        accountLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSettingsMenu();
            showProfileModal(); // Show account/profile modal
        });
    }
    
    if (settingsLink) {
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSettingsMenu();
            openSettingsPage();
        });
    }
    
    if (themeToggleLink) {
        themeToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSettingsMenu();
            toggleTheme();
        });
    }
    
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSettingsMenu();
            if (userProfile && confirm('Are you sure you want to logout?')) {
                userProfile = null;
                localStorage.removeItem('userProfile');
                updateGreeting();
            } else if (!userProfile) {
                alert('You are not logged in.');
            }
        });
    }
    
    // Initialize theme on load
    initializeTheme();
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('settingsDropdown');
        const container = document.querySelector('.profile-dropdown-container');
        if (dropdown && container && !container.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function toggleSettingsMenu() {
    const dropdown = document.getElementById('settingsDropdown');
    if (dropdown) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
        }
    }
}

function showProfileModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="profile-modal-content">
            <div class="profile-modal-header">
                <h2>Create Profile</h2>
                <button class="modal-close-btn" id="closeProfileModalBtn">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="profile-modal-body">
                <form id="profileForm">
                    <div class="form-group">
                        <label for="firstName">First Name <span class="required">*</span></label>
                        <input type="text" id="firstName" name="firstName" required value="${userProfile ? userProfile.firstName : ''}">
                    </div>
                    <div class="form-group">
                        <label for="middleName">Middle Name <span class="optional">(Optional)</span></label>
                        <input type="text" id="middleName" name="middleName" value="${userProfile ? userProfile.middleName || '' : ''}">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name <span class="required">*</span></label>
                        <input type="text" id="lastName" name="lastName" required value="${userProfile ? userProfile.lastName : ''}">
                    </div>
                    <div class="profile-modal-actions">
                        <button type="submit" class="submit-profile-btn">Submit</button>
                        ${userProfile ? '<button type="button" class="logout-btn" id="logoutBtn">Logout</button>' : ''}
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    const closeBtn = modal.querySelector('#closeProfileModalBtn');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Form submission
    const form = modal.querySelector('#profileForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = form.querySelector('#firstName').value.trim();
        const middleName = form.querySelector('#middleName').value.trim();
        const lastName = form.querySelector('#lastName').value.trim();
        
        if (!firstName || !lastName) {
            alert('First name and last name are required!');
            return;
        }
        
        // Build full name
        let fullName = firstName;
        if (middleName) {
            fullName += ' ' + middleName;
        }
        fullName += ' ' + lastName;
        
        // Save profile
        userProfile = {
            firstName,
            middleName: middleName || null,
            lastName,
            fullName
        };
        
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        updateGreeting();
        modal.remove();
    });
    
    // Logout button
    if (userProfile) {
        const logoutBtn = modal.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout?')) {
                    userProfile = null;
                    localStorage.removeItem('userProfile');
                    updateGreeting();
                    modal.remove();
                }
            });
        }
    }
}

function updateGreeting() {
    const greetingMessage = document.getElementById('greetingMessage');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (userProfile && greetingMessage && userDisplayName) {
        userDisplayName.textContent = userProfile.fullName;
        greetingMessage.style.display = 'block';
    } else if (greetingMessage) {
        greetingMessage.style.display = 'none';
    }
}

// ==================== LIBRARY NAVIGATION ====================

function initializeLibraryNavigation() {
    const createPlaylistIcon = document.getElementById('createPlaylistIcon');
    const nextPageIcon = document.getElementById('nextPageIcon');
    const prevPageIcon = document.getElementById('prevPageIcon');
    
    if (createPlaylistIcon) {
        createPlaylistIcon.addEventListener('click', createPlaylist);
    }
    
    if (nextPageIcon) {
        nextPageIcon.addEventListener('click', navigateNext);
    }
    
    if (prevPageIcon) {
        prevPageIcon.addEventListener('click', navigatePrevious);
    }
    
    // Initialize with home page
    addToHistory({ type: 'home', data: null });
    updateNavigationButtons();
}

function addToHistory(pageInfo) {
    // Remove any forward history if we're not at the end
    if (historyIndex < navigationHistory.length - 1) {
        navigationHistory = navigationHistory.slice(0, historyIndex + 1);
    }
    
    // Add new page to history
    navigationHistory.push(pageInfo);
    historyIndex = navigationHistory.length - 1;
    
    // Limit history size to prevent memory issues
    if (navigationHistory.length > 50) {
        navigationHistory.shift();
        historyIndex--;
    }
    
    updateNavigationButtons();
}

function navigateNext() {
    if (historyIndex < navigationHistory.length - 1) {
        historyIndex++;
        const pageInfo = navigationHistory[historyIndex];
        isNavigatingHistory = true;
        navigateToPage(pageInfo);
        isNavigatingHistory = false;
        updateNavigationButtons();
    }
}

function navigatePrevious() {
    if (historyIndex > 0) {
        historyIndex--;
        const pageInfo = navigationHistory[historyIndex];
        isNavigatingHistory = true;
        navigateToPage(pageInfo);
        isNavigatingHistory = false;
        updateNavigationButtons();
    }
}

function navigateToPage(pageInfo) {
    switch (pageInfo.type) {
        case 'home':
            showHomePage();
            break;
        case 'search':
            showSearchPage();
            break;
        case 'playlist':
            if (pageInfo.data) {
                showPlaylistPage(pageInfo.data);
            }
            break;
        case 'podcasts':
            showPodcastsPage();
            break;
        case 'library':
            showLibrary();
            break;
        case 'settings':
            openSettingsPage();
            break;
    }
}

function updateNavigationButtons() {
    const prevPageIcon = document.getElementById('prevPageIcon');
    const nextPageIcon = document.getElementById('nextPageIcon');
    
    if (prevPageIcon) {
        if (historyIndex > 0) {
            prevPageIcon.classList.remove('hide');
        } else {
            prevPageIcon.classList.add('hide');
        }
    }
    
    if (nextPageIcon) {
        if (historyIndex < navigationHistory.length - 1) {
            nextPageIcon.classList.remove('hide');
        } else {
            nextPageIcon.classList.add('hide');
        }
    }
}

function navigateLibraryPages() {
    const prevPageIcon = document.getElementById('prevPageIcon');
    const nextPageIcon = document.getElementById('nextPageIcon');
    const playlistsList = document.querySelector('.playlists-list');
    
    if (!playlistsList) return;
    
    const itemsPerPage = 5;
    const totalPages = Math.ceil(playlists.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Show/hide prev button
    if (prevPageIcon) {
        if (currentPage > 0) {
            prevPageIcon.classList.remove('hide');
        } else {
            prevPageIcon.classList.add('hide');
        }
    }
    
    // Show/hide next button
    if (nextPageIcon) {
        if (currentPage < totalPages - 1) {
            nextPageIcon.classList.remove('hide');
        } else {
            nextPageIcon.classList.add('hide');
        }
    }
    
    // Show only items for current page
    const playlistItems = playlistsList.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Wrap renderPlaylistsInLibrary to add pagination support
const originalRenderPlaylistsInLibrary = renderPlaylistsInLibrary;
renderPlaylistsInLibrary = function() {
    originalRenderPlaylistsInLibrary();
    // Reset to first page when playlists change
    if (playlists.length > 0) {
        currentPage = 0;
        setTimeout(() => {
            navigateLibraryPages();
        }, 100);
    }
};

// ==================== QUICK SEARCH FUNCTIONALITY ====================

function initializeQuickSearch() {
    const quickSearchBar = document.getElementById('quickSearchBar');
    if (quickSearchBar) {
        // Store original title and content
        const mainTitle = document.getElementById('main-title');
        const contentContainer = document.getElementById('content-container');
        let originalTitle = mainTitle ? mainTitle.textContent : '';
        let originalContent = contentContainer ? contentContainer.innerHTML : '';
        
        quickSearchBar.addEventListener('keyup', (e) => {
            // Check if Enter key is pressed
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                
                // Get the search query
                const query = quickSearchBar.value.trim();
                
                if (query) {
                    // Display search results
                    displaySearchResults(query, originalTitle, originalContent);
                    
                    // Clear the search bar
                    quickSearchBar.value = '';
                }
            }
        });
        
        // Add focus effect
        quickSearchBar.addEventListener('focus', () => {
            quickSearchBar.classList.add('focused');
        });
        
        quickSearchBar.addEventListener('blur', () => {
            quickSearchBar.classList.remove('focused');
        });
    }
}

function displaySearchResults(query, originalTitle, originalContent) {
    const mainTitle = document.getElementById('main-title');
    const contentContainer = document.getElementById('content-container');
    
    if (!mainTitle || !contentContainer) return;
    
    // Update the main title
    mainTitle.textContent = `Search Results for: "${query}"`;
    
    // Clear existing content and add search results
    contentContainer.innerHTML = `
        <div class="search-result-card" style="
            background-color: #181818;
            border-radius: 0.5rem;
            padding: 2rem;
            margin: 1rem 0;
            text-align: center;
        ">
            <div style="
                font-size: 1.25rem;
                font-weight: 600;
                color: white;
                margin-bottom: 0.5rem;
            ">Showing results for "${query}"</div>
            <div style="
                font-size: 0.875rem;
                color: #b3b3b3;
                margin-bottom: 1.5rem;
            ">Found matching songs in your library</div>
            <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: center;
            ">
                ${getSearchResultCards(query)}
            </div>
        </div>
    `;
    
    // Initialize click handlers for search results
    setTimeout(() => {
        initializeSearchResultHandlers();
    }, 100);
}

function getSearchResultCards(query) {
    // Search for matching tracks
    const matchingTracks = tracks.filter(track => {
        const title = track.title.toLowerCase();
        const artist = track.artist.toLowerCase();
        const searchTerm = query.toLowerCase();
        return title.includes(searchTerm) || artist.includes(searchTerm);
    });
    
    if (matchingTracks.length === 0) {
        return '<p style="color: #b3b3b3; width: 100%;">No results found.</p>';
    }
    
    // Return up to 6 matching tracks as clickable song-result elements
    return matchingTracks.slice(0, 6).map(track => {
        const trackIndex = tracks.findIndex(t => t.audio === track.audio);
        return `
            <div class="song-result card" 
                 data-audio-src="${track.audio}" 
                 data-song-title="${track.title}"
                 data-track-index="${trackIndex}"
                 style="width: 180px; cursor: pointer;">
                <div class="card-image-wrapper">
                    <img src="${track.image}" alt="${track.title}" style="width: 100%; border-radius: 0.5rem;">
                    <div class="play-button-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <p class="card-title">${track.title}</p>
                <p class="card-info">${track.artist}</p>
            </div>
        `;
    }).join('');
}

// Initialize search result click handlers
function initializeSearchResultHandlers() {
    const songResults = document.querySelectorAll('.song-result');
    songResults.forEach(songResult => {
        // Remove existing listeners to prevent duplicates
        const newSongResult = songResult.cloneNode(true);
        songResult.parentNode.replaceChild(newSongResult, songResult);
        
        // Add click handler
        newSongResult.addEventListener('click', () => {
            const audioSrc = newSongResult.getAttribute('data-audio-src');
            const songTitle = newSongResult.getAttribute('data-song-title');
            const trackIndex = parseInt(newSongResult.getAttribute('data-track-index'));
            
            if (audioSrc && !isNaN(trackIndex)) {
                playSearchResult(audioSrc, songTitle, trackIndex);
            }
        });
        
        // Add play button handler
        const playButton = newSongResult.querySelector('.play-button-overlay');
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const audioSrc = newSongResult.getAttribute('data-audio-src');
                const songTitle = newSongResult.getAttribute('data-song-title');
                const trackIndex = parseInt(newSongResult.getAttribute('data-track-index'));
                
                if (audioSrc && !isNaN(trackIndex)) {
                    playSearchResult(audioSrc, songTitle, trackIndex);
                }
            });
        }
    });
}

function playSearchResult(audioSrc, songTitle, trackIndex) {
    if (!audioPlayer) {
        console.error('Audio player not found');
        return;
    }
    
    // Load and play the audio
    audioPlayer.src = audioSrc;
    audioPlayer.load();
    
    // Update the UI with track info
    if (trackIndex >= 0 && trackIndex < tracks.length) {
        loadTrack(trackIndex);
    }
    
    audioPlayer.play().catch(err => {
        console.error('Error playing audio:', err);
        alert(`Error playing: ${songTitle}\n\nPlease make sure the audio file exists.`);
    });
}

// ==================== SETTINGS PAGE ====================

function openSettingsPage() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    currentView = 'settings';
    
    // Hide all other content
    const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer, .search-content, .playlist-content, .podcasts-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Check if settings content already exists
    let settingsContent = mainContent.querySelector('.settings-content');
    
    if (!settingsContent) {
        settingsContent = document.createElement('div');
        settingsContent.className = 'settings-content';
        settingsContent.id = 'settings-page';
        mainContent.appendChild(settingsContent);
    }
    
    settingsContent.style.display = 'block';
    settingsContent.innerHTML = getSettingsContent();
    
    // Add event handlers for interactive controls
    initializeSettingsControls();
    
    // Add back button handler
    const backBtn = settingsContent.querySelector('#back-to-home-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            goToHome();
        });
    }
    
    // Add to history
    if (!isNavigatingHistory) {
        addToHistory({ type: 'settings', data: null });
    }
}

// Function to go back to home from settings
function goToHome() {
    const settingsPage = document.getElementById('settings-page');
    const mainContentView = document.getElementById('main-content-view');
    
    // Hide settings page
    if (settingsPage) {
        settingsPage.style.display = 'none';
    }
    
    // Show main content view
    if (mainContentView) {
        // Set display to block or flex depending on original layout
        mainContentView.style.display = 'block';
        
        // Show all sections within main content view
        const sections = mainContentView.querySelectorAll('.section-title, .cards-container, .footer');
        sections.forEach(section => {
            section.style.display = '';
        });
    }
    
    // Also ensure all main content sections are visible
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const sections = mainContent.querySelectorAll('.section-title, .cards-container, .footer');
        sections.forEach(section => {
            if (!section.closest('.settings-content')) {
                section.style.display = '';
            }
        });
    }
    
    // Call showHomePage to ensure everything is properly displayed
    showHomePage();
}

function getSettingsContent() {
    return `
        <div class="settings-header">
            <h1 class="settings-title">Settings</h1>
        </div>
        <div class="settings-sections">
            <div class="settings-section">
                <h2 class="settings-section-title">
                    <i class="fa-solid fa-volume-high"></i> Audio Quality
                </h2>
                <div class="settings-options">
                    <div class="settings-option">
                        <label for="audio-quality">Select Audio Quality:</label>
                        <select id="audio-quality" class="settings-select">
                            <option value="high">High</option>
                            <option value="normal" selected>Normal</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <h2 class="settings-section-title">
                    <i class="fa-solid fa-shield-halved"></i> Privacy
                </h2>
                <div class="settings-options">
                    <div class="settings-option">
                        <label class="toggle-switch">
                            <input type="checkbox" id="private-session-toggle">
                            <span class="slider"></span>
                            <span class="toggle-label">Private Session</span>
                        </label>
                    </div>
                    <div class="settings-option">
                        <label class="toggle-switch">
                            <input type="checkbox" id="show-activity-toggle" checked>
                            <span class="slider"></span>
                            <span class="toggle-label">Show activity on profile</span>
                        </label>
                    </div>
                    <div class="settings-option">
                        <label class="toggle-switch">
                            <input type="checkbox" id="playlists-public-toggle">
                            <span class="slider"></span>
                            <span class="toggle-label">Make playlists public</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <h2 class="settings-section-title">
                    <i class="fa-solid fa-hard-drive"></i> Storage
                </h2>
                <div class="settings-options">
                    <div class="settings-option">
                        <label class="toggle-switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                            <span class="toggle-label">Download audio files</span>
                        </label>
                    </div>
                    <div class="settings-option">
                        <label class="toggle-switch">
                            <input type="checkbox">
                            <span class="slider"></span>
                            <span class="toggle-label">Cache songs for offline playback</span>
                        </label>
                    </div>
                    <div class="settings-option">
                        <button id="clear-cache-btn" class="clear-cache-btn">
                            <i class="fa-solid fa-trash"></i> Clear Cache
                        </button>
                    </div>
                    <div class="settings-option">
                        <p class="settings-info">Storage used: 2.4 GB / 10 GB</p>
                        <div class="storage-bar">
                            <div class="storage-fill" style="width: 24%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings-footer">
            <button class="back-to-home-btn" id="back-to-home-btn">
                <i class="fa-solid fa-chevron-left"></i> Back to Home
            </button>
        </div>
    `;
}

function initializeSettingsControls() {
    // Load saved audio quality setting
    const savedQuality = localStorage.getItem('audioQuality') || 'normal';
    
    // Audio Quality Dropdown Handler
    const audioQualitySelect = document.getElementById('audio-quality');
    if (audioQualitySelect) {
        // Set saved value
        audioQualitySelect.value = savedQuality;
        applyAudioQuality(savedQuality);
        
        audioQualitySelect.addEventListener('change', (e) => {
            const selectedQuality = e.target.value;
            console.log(`Audio quality changed to: ${selectedQuality}`);
            applyAudioQuality(selectedQuality);
            showFeedbackMessage(`Audio quality set to ${selectedQuality.toUpperCase()} (Volume: ${selectedQuality === 'high' ? '100%' : selectedQuality === 'normal' ? '50%' : '20%'})`);
        });
    }
    
    // Load saved private session setting
    const savedPrivateSession = localStorage.getItem('privateSession') === 'true';
    
    // Private Session Toggle Handler
    const privateSessionToggle = document.getElementById('private-session-toggle');
    if (privateSessionToggle) {
        privateSessionToggle.checked = savedPrivateSession;
        
        privateSessionToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            const status = isEnabled ? 'ON' : 'OFF';
            console.log(`Private Session is now: ${status}`);
            localStorage.setItem('privateSession', isEnabled.toString());
            showFeedbackMessage(`Private Session is now ${status}`);
        });
    }
    
    // Show Activity Toggle Handler
    const showActivityToggle = document.getElementById('show-activity-toggle');
    if (showActivityToggle) {
        const savedShowActivity = localStorage.getItem('showActivity') === 'true';
        showActivityToggle.checked = savedShowActivity;
        
        showActivityToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            const status = isEnabled ? 'ON' : 'OFF';
            console.log(`Show activity on profile is now: ${status}`);
            localStorage.setItem('showActivity', isEnabled.toString());
            showFeedbackMessage(`Show activity on profile is now ${status}`);
        });
    }
    
    // Playlists Public Toggle Handler
    const playlistsPublicToggle = document.getElementById('playlists-public-toggle');
    if (playlistsPublicToggle) {
        const savedPlaylistsPublic = localStorage.getItem('playlistsPublic') === 'true';
        playlistsPublicToggle.checked = savedPlaylistsPublic;
        
        playlistsPublicToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            const status = isEnabled ? 'ON' : 'OFF';
            console.log(`Make playlists public is now: ${status}`);
            localStorage.setItem('playlistsPublic', isEnabled.toString());
            showFeedbackMessage(`Make playlists public is now ${status}`);
        });
    }
    
    // Clear Cache Button Handler
    const clearCacheBtn = document.getElementById('clear-cache-btn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the cache? This will remove all downloaded files.')) {
                console.log('Cache cleared successfully!');
                showFeedbackMessage('Cache cleared successfully!');
            }
        });
    }
}

// Function to show temporary feedback messages
function showFeedbackMessage(message) {
    // Remove existing feedback message if any
    const existingFeedback = document.querySelector('.settings-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback message element
    const feedback = document.createElement('div');
    feedback.className = 'settings-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--color-accent);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.9375rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// Theme Toggle Functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showFeedbackMessage(`Theme changed to ${newTheme} mode`);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }
    
    if (themeText) {
        themeText.textContent = theme === 'light' ? 'Dark Theme' : 'Light Theme';
    }
}

// Splash Screen Functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    const splashText = document.getElementById('splash-text');
    
    if (!splashScreen) return;
    
    // Step 1: Background Fade-in (after 200ms delay)
    setTimeout(() => {
        splashScreen.classList.add('visible');
    }, 200);
    
    // Step 2: Logo Fade-in (2-3 seconds after background starts = ~2.2-3.2 seconds from page load)
    setTimeout(() => {
        if (splashLogo) {
            splashLogo.classList.add('visible');
        }
    }, 2200);
    
    // Step 3: Text Fade-in (5-6 seconds after start = ~5.2-6.2 seconds from page load)
    setTimeout(() => {
        if (splashText) {
            splashText.classList.add('visible');
        }
    }, 5200);
    
    // Step 4: Full Splash Screen Fade-out (after 7-8 seconds total = ~7.2-8.2 seconds)
    setTimeout(() => {
        splashScreen.classList.remove('visible');
        splashScreen.classList.add('fade-out');
        if (splashLogo) {
            splashLogo.classList.remove('visible');
        }
        if (splashText) {
            splashText.classList.remove('visible');
        }
    }, 7200);
    
    // Step 5: Remove Splash Screen from DOM (after fade-out completes = ~9 seconds total)
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 9200);
}

