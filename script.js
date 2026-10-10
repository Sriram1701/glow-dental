document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggle & Auto-Close on Nav Link Click
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active-menu');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active-menu') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Close mobile menu when clicking any nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active-menu')) {
                    navMenu.classList.remove('active-menu');
                    const icon = hamburger.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 2. Smooth Scrolling for all Internal Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 3. View All Specialized Services Dropdown Toggle
    const viewAllBtn = document.querySelector('.dropdown-trigger-btn');
    const viewAllContent = document.querySelector('.dropdown-target-grid');

    if (viewAllBtn && viewAllContent) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            viewAllContent.classList.toggle('show-dropdown');
            const icon = viewAllBtn.querySelector('i');
            if (icon) {
                icon.style.transform = viewAllContent.classList.contains('show-dropdown') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }

    // 4. Success Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const counterSection = document.querySelector('.counter-section');

    const startCounterAnimation = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 0;
            let current = 0;
            const inc = Math.max(1, Math.ceil(target / 120));

            const updateCount = () => {
                current += inc;
                if (current < target) {
                    counter.innerText = current;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    if (counterSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounterAnimation();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(counterSection);
    }

    // 5. FAQ Accordion Single-Open Logic
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if (!answer) return;
            const isOpening = !answer.style.maxHeight;

            // Close all other open FAQ answers
            document.querySelectorAll('.faq-question').forEach(otherQuestion => {
                const otherAnswer = otherQuestion.nextElementSibling;
                if (otherAnswer) otherAnswer.style.maxHeight = null;

                const otherIcon = otherQuestion.querySelector('i');
                if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
            });

            // Open clicked FAQ item if it was closed
            if (isOpening) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                const icon = question.querySelector('i');
                if (icon) icon.style.transform = "rotate(180deg)";
            }
        });
    });

    // 6. Infrastructure Image Rotator
    const imageUrls = [
        "images/gallery/gallery-1.jpeg",
        "images/gallery/gallery-2.jpeg",
        "images/gallery/gallery-3.jpeg",
        "images/gallery/gallery-4.jpeg",
        "images/gallery/gallery-5.jpeg",
        "images/gallery/gallery-6.jpeg"
    ];

    const altLabels = [
        "Gallery 1",
        "Gallery 2",
        "Gallery 3",
        "Gallery 4",
        "Gallery 5",
        "Gallery 6"
    ];

    let currentIndex = 0;
    const mainImgs = document.querySelectorAll('.main-premium-pic');
    const subImgs = document.querySelectorAll('.sub-premium-pic');

    function rotateClinicImages() {
        if (mainImgs.length === 0 && subImgs.length === 0) return;
        currentIndex = (currentIndex + 1) % imageUrls.length;

        if (mainImgs.length > 0) {
            mainImgs.forEach((img, i) => {
                let mainIndex = (currentIndex + i) % imageUrls.length;
                img.src = imageUrls[mainIndex];
                img.alt = altLabels[mainIndex];
            });
        }

        if (subImgs.length > 0) {
            subImgs.forEach((img, i) => {
                let subIndex = (currentIndex + mainImgs.length + i) % imageUrls.length;
                img.src = imageUrls[subIndex];
                img.alt = altLabels[subIndex];
            });
        }
    }

    if (mainImgs.length > 0 || subImgs.length > 0) {
        setInterval(rotateClinicImages, 3500);
    }

    // 7. Reel Video Play/Pause Control (Autoplay on load, button only visible when paused)
    const reelVideos = document.querySelectorAll('.reel-video');
    const reelTrack = document.querySelector('.video-track');
    let activeReelVideo = null;

    const setReelState = (video) => {
        const container = video.closest('.reel-box-item');
        if (!container) return;
        container.classList.toggle('is-paused', video.paused);
        container.classList.toggle('is-playing', !video.paused);
    };

    const pauseReelAutoScroll = () => {
        if (reelTrack) {
            reelTrack.classList.add('is-paused');
            reelTrack.style.animationPlayState = 'paused';
        }
    };

    const resumeReelAutoScroll = () => {
        if (reelTrack) {
            reelTrack.classList.remove('is-paused');
            reelTrack.style.animationPlayState = 'running';
        }
    };

    const pauseAllReels = () => {
        reelVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
            video.muted = true;
            setReelState(video);
        });
        activeReelVideo = null;
    };

    const stopActiveReel = () => {
        if (!activeReelVideo) {
            resumeReelAutoScroll();
            return;
        }

        activeReelVideo.pause();
        activeReelVideo.muted = true;
        setReelState(activeReelVideo);
        activeReelVideo = null;
        resumeReelAutoScroll();
    };

    const playSelectedReel = async (selectedVideo) => {
        if (!selectedVideo) return;

        reelVideos.forEach(video => {
            if (video !== selectedVideo && !video.paused) {
                video.pause();
                video.muted = true;
                setReelState(video);
            }
        });

        activeReelVideo = selectedVideo;
        selectedVideo.muted = false;
        pauseReelAutoScroll();

        try {
            await selectedVideo.play();
            setReelState(selectedVideo);
        } catch (error) {
            console.log('Reel play prevented until user interaction:', error);
            activeReelVideo = null;
            resumeReelAutoScroll();
        }
    };

    reelVideos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        setReelState(video);

        video.addEventListener('play', () => {
            setReelState(video);
            pauseReelAutoScroll();
        });

        video.addEventListener('pause', () => {
            setReelState(video);
            if (!activeReelVideo) {
                resumeReelAutoScroll();
            }
        });

        video.addEventListener('click', (event) => {
            const isPaused = video.paused;
            event.stopPropagation();

            if (isPaused) {
                playSelectedReel(video);
            } else {
                stopActiveReel();
            }
        });
    });

    document.querySelectorAll('.reel-box-item').forEach(item => {
        item.addEventListener('click', (event) => {
            const video = item.querySelector('video');
            if (!video) return;
            const isPaused = video.paused;
            event.stopPropagation();

            if (isPaused) {
                playSelectedReel(video);
            } else {
                stopActiveReel();
            }
        });
    });

    document.addEventListener('pointerdown', (event) => {
        const clickedInsideReel = event.target.closest('.reel-box-item, .reel-video');
        if (!clickedInsideReel && activeReelVideo) {
            stopActiveReel();
        }
    }, true);

    window.addEventListener('scroll', () => {
        stopActiveReel();
    }, { passive: true });

    reelVideos.forEach(video => {
        video.play().catch(() => {
            setReelState(video);
        });
    });

    // 8. Universal Image Fallback Handler (Prevents Broken Image Icons)
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            if (!this.getAttribute('data-fallback-applied')) {
                this.setAttribute('data-fallback-applied', 'true');
                if (this.classList.contains('hero-main-img') || this.classList.contains('main-premium-pic') || this.classList.contains('sub-premium-pic')) {
                    this.src = 'image/background.jpeg';
                } else {
                    this.src = 'image/logo.jpeg';
                }
            }
        });
    });

});