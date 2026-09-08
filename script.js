/**
 * KRISHNA NAND TIWARI - EXACT KROSZBORG.CO PARITY SCRIPTS
 * Features:
 * - 3D Perspective Card Tilt Physics with Dynamic Red Flare Spotlight
 * - Eyeball Pupil Tracking on Rainbow Conic Resume Button
 * - Magnetic Physics on Action Buttons
 * - Matrix Text Scramble on Hero Name
 * - Experience Accordion Toggle
 * - GitHub Activity Heatmap Generation
 * - Command Palette (Ctrl+K) Search Modal
 * - Floating AI Portfolio Assistant Chat Widget with Smart Responses
 * - Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initShaderBackground();
    initGrainOverlay();
    init3DCardTiltAndFlare();
    initEyeTracking();
    initMagneticButtons();
    initMatrixTextScramble();
    initAccordions();
    initHeatmap();
    initCommandPalette();
    initSmoothScroll();
    initScrollReveal();
    initGitaQuotes();
    initOwnerViewBadge();
    initNavbarScroll();
    initProjectLiveCards();
});

/* ==========================================================================
   1. 3D PERSPECTIVE CARD TILT (1:1 kroszborg)
   ========================================================================== */
function init3DCardTiltAndFlare() {
    const tiltWrappers = document.querySelectorAll('.tilt-wrapper');
    if (!tiltWrappers.length) return;

    tiltWrappers.forEach(wrapper => {
        const card = wrapper.querySelector('.kroszborg-card, .blog-card');
        if (!card) return;

        let isHovered = false;

        wrapper.addEventListener('mouseenter', () => {
            isHovered = true;
            card.style.transition = 'transform 0.15s ease-out, border-color 0.2s ease';
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5.0;
            const rotateY = ((x - centerX) / centerX) * 5.0;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transition = 'transform 0.35s ease-out, border-color 0.2s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

/* ==========================================================================
   1B. PROJECTS PAGE: LIVE DEMO FULL-CARD CLICK GUARANTEE
   ========================================================================== */
function initProjectLiveCards() {
    const liveCards = document.querySelectorAll('.project-live-card');
    if (!liveCards.length) return;

    liveCards.forEach(card => {
        const liveUrl = card.getAttribute('href');
        if (!liveUrl) return;

        // If any click inside the card occurs (including child elements or stack badges)
        card.addEventListener('click', (e) => {
            // Standard left click on native anchor will navigate natively.
            // If any child element or touch handler swallowed it, guarantee navigation:
            if (e.target.closest('.stack-icon-btn')) {
                e.preventDefault();
                window.open(liveUrl, '_blank', 'noopener,noreferrer');
            }
        });

        // Also make sure wrapper clicks route to the live URL
        const wrapper = card.closest('.tilt-wrapper');
        if (wrapper) {
            wrapper.style.cursor = 'pointer';
            wrapper.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.open(liveUrl, '_blank', 'noopener,noreferrer');
                }
            });
        }
    });
}

/* ==========================================================================
   2. EYEBALL PUPIL TRACKING ON RESUME BUTTON
   ========================================================================== */
function initEyeTracking() {
    const resumeBtn = document.querySelector('.btn-resume');
    const pupils = document.querySelectorAll('.eye-pupil');
    if (!resumeBtn || !pupils.length) return;

    window.addEventListener('mousemove', (e) => {
        const rect = resumeBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - btnCenterX;
        const deltaY = e.clientY - btnCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        // Distance capped at 2.6px radius within 15px socket
        const maxDist = 2.8;
        const moveX = Math.cos(angle) * maxDist;
        const moveY = Math.sin(angle) * maxDist;

        pupils.forEach(pupil => {
            pupil.style.transform = `translate(calc(-50% + ${moveX.toFixed(1)}px), calc(-50% + ${moveY.toFixed(1)}px))`;
        });
    }, { passive: true });
}

/* ==========================================================================
   3. MAGNETIC BUTTON PHYSICS
   ========================================================================== */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (!magneticBtns.length) return;

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Subtle magnetic pull
            const pullStrength = 0.22;
            btn.style.transform = `translate(${x * pullStrength}px, ${y * pullStrength}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* ==========================================================================
   4. MATRIX TEXT SCRAMBLE ON HERO NAME
   ========================================================================== */
function initMatrixTextScramble() {
    const titleEl = document.getElementById('scramble-name');
    if (!titleEl) return;

    const originalText = titleEl.dataset.original || titleEl.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let isScrambling = false;

    titleEl.addEventListener('mouseenter', () => {
        if (isScrambling) return;
        isScrambling = true;

        let iteration = 0;
        const interval = setInterval(() => {
            titleEl.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= originalText.length) {
                clearInterval(interval);
                titleEl.textContent = originalText;
                isScrambling = false;
            }

            iteration += 1 / 2;
        }, 30);
    });
}

/* ==========================================================================
   5. EXPERIENCE ACCORDIONS (1:1 kroszborg)
   ========================================================================== */
function initAccordions() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const row = card.querySelector('.experience-row-main');
        const chevronBtn = card.querySelector('.accordion-chevron-btn');
        if (!row) return;

        const toggle = () => {
            const isOpen = card.classList.contains('open');
            card.classList.toggle('open', !isOpen);
        };

        if (chevronBtn) {
            chevronBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggle();
            });
        }

        row.addEventListener('click', toggle);
    });
}

/* ==========================================================================
   6. GITHUB ACTIVITY CALENDAR (1:1 kroszborg.co Sync with @Krishnanand-10)
   ========================================================================== */
async function initHeatmap() {
    const wrap = document.getElementById('github-calendar-wrap');
    const countEl = document.getElementById('github-count-number');
    const yearCountEl = document.getElementById('github-year-count');
    if (!wrap) return;

    const USERNAME = 'Krishnanand-10';
    const API_URL = 'https://github-contributions-api.jogruber.de/v4/' + USERNAME + '?y=last';

    const blockSize = 11;
    const blockMargin = 3;
    const step = blockSize + blockMargin; // 14
    const offsetX = 26;
    const offsetY = 20;

    // Theme colors matching kroszborg.co dark theme exactly:
    const theme = [
        "rgb(22, 27, 34)",
        "rgb(14, 68, 41)",
        "rgb(0, 109, 50)",
        "rgb(38, 166, 65)",
        "rgb(57, 211, 83)"
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekdayLabels = [
        { label: 'M', y: offsetY + 1 * step + 9 },
        { label: 'W', y: offsetY + 3 * step + 9 },
        { label: 'F', y: offsetY + 5 * step + 9 }
    ];

    function buildSvg(contributions) {
        const weeks = [];
        let currentWeek = [];

        contributions.forEach((day, idx) => {
            currentWeek.push(day);
            const d = new Date(day.date + 'T00:00:00');
            if (d.getDay() === 6 || idx === contributions.length - 1) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        const svgWidth = offsetX + weeks.length * step;
        const svgHeight = offsetY + 7 * step;

        const monthPositions = [];
        let lastMonth = -1;

        weeks.forEach((week, wIdx) => {
            const firstDay = week[0];
            const d = new Date(firstDay.date + 'T00:00:00');
            const m = d.getMonth();
            if (m !== lastMonth) {
                monthPositions.push({ month: months[m], x: offsetX + wIdx * step });
                lastMonth = m;
            }
        });

        let svg = `<svg class="react-activity-calendar" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" style="color: rgb(139, 148, 158);">`;

        // Month text labels
        monthPositions.forEach(mp => {
            svg += `<text x="${mp.x}" y="12" font-size="11" fill="rgb(139, 148, 158)" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${mp.month}</text>`;
        });

        // Weekday text labels
        weekdayLabels.forEach(wl => {
            svg += `<text x="4" y="${wl.y}" font-size="11" fill="rgb(139, 148, 158)" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${wl.label}</text>`;
        });

        // Day blocks
        weeks.forEach((week, wIdx) => {
            const x = offsetX + wIdx * step;
            week.forEach(day => {
                const d = new Date(day.date + 'T00:00:00');
                const dayOfWeek = d.getDay();
                const y = offsetY + dayOfWeek * step;
                const level = Math.min(Math.max(Number(day.level) || 0, 0), 4);
                const fill = theme[level];
                const countText = day.count === 0 ? 'No contributions' : day.count === 1 ? '1 contribution' : `${day.count} contributions`;
                const dateFormatted = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
                const tooltip = `${countText} on ${dateFormatted}`;

                svg += `<rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" rx="2" ry="2" fill="${fill}" data-date="${day.date}" data-level="${level}"><title>${tooltip}</title></rect>`;
            });
        });

        svg += `</svg>`;
        return svg;
    }

    function render(data) {
        if (!data || !data.contributions || !data.contributions.length) return;
        wrap.innerHTML = buildSvg(data.contributions);

        const total = data.total?.lastYear ?? data.contributions.reduce((acc, d) => acc + (d.count || 0), 0);
        if (countEl) countEl.textContent = total.toLocaleString();
        if (yearCountEl) yearCountEl.style.display = 'block';

        // Auto-scroll to end (most recent date) like kroszborg
        wrap.scrollLeft = wrap.scrollWidth;
    }

    // Drag-to-scroll interaction (exact kroszborg grab cursor functionality)
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    wrap.addEventListener('mousedown', (e) => {
        isDown = true;
        wrap.classList.add('grabbing');
        startX = e.pageX - wrap.offsetLeft;
        scrollLeft = wrap.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        wrap.classList.remove('grabbing');
    });

    wrap.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrap.offsetLeft;
        const walk = (x - startX);
        wrap.scrollLeft = scrollLeft - walk;
    });

    // 1. Instant load from localStorage cache
    try {
        const cached = localStorage.getItem('krishna_gh_contribs_krosz');
        if (cached) {
            render(JSON.parse(cached));
        }
    } catch (e) {}

    // 2. Live fetch from GitHub API
    try {
        const res = await fetch(API_URL);
        if (res.ok) {
            const data = await res.json();
            if (data && data.contributions) {
                render(data);
                try {
                    localStorage.setItem('krishna_gh_contribs_krosz', JSON.stringify(data));
                } catch (e) {}
            }
        }
    } catch (err) {
        console.warn('GitHub activity live sync warning:', err);
    }
}

/* ==========================================================================
   7. DYNAMIC NAVBAR SCROLL ANIMATION (Exact 1:1 Kroszborg Framer Motion Spring Scroll)
   ========================================================================== */
function initNavbarScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    let targetY = window.scrollY || window.pageYOffset;
    let currentY = targetY;
    let velocity = 0;
    let rafId = null;

    // Exact Framer Motion spring parameters from krosz_layout.js:
    // { stiffness: 90, damping: 24, mass: 0.6 }
    const stiffness = 90;
    const damping = 24;
    const mass = 0.6;
    let lastTime = performance.now();

    function applyTransform(y) {
        const isDesktop = window.innerWidth >= 768;
        // Transform range [0, 280] from Kroszborg
        const progress = Math.min(1, Math.max(0, y / 280));

        // Exact Kroszborg interpolation points:
        // Desktop max-width: 1024 -> 640
        // Mobile max-width: 560 -> 380
        // Padding: 24 -> 16
        // Height: 64 -> 52
        // Border-radius: 24 -> 9999
        // Top: 24 -> 14
        const maxW = isDesktop 
            ? (1024 - (1024 - 640) * progress) 
            : (560 - (560 - 380) * progress);
        const top = 24 - (24 - 14) * progress;
        const height = 64 - (64 - 52) * progress;
        const radius = 24 + (9999 - 24) * progress;
        const pad = 24 - (24 - 16) * progress;

        nav.style.maxWidth = `${maxW.toFixed(1)}px`;
        nav.style.top = `${top.toFixed(1)}px`;
        nav.style.height = `${height.toFixed(1)}px`;
        nav.style.borderRadius = `${radius.toFixed(0)}px`;
        nav.style.paddingLeft = `${pad.toFixed(1)}px`;
        nav.style.paddingRight = `${pad.toFixed(1)}px`;

        if (progress > 0.05) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }

    function step(now) {
        const dt = Math.min((now - lastTime) * 0.001, 0.033);
        lastTime = now;

        const displacement = currentY - targetY;
        const springForce = -stiffness * displacement;
        const dampingForce = -damping * velocity;
        const acceleration = (springForce + dampingForce) / mass;

        velocity += acceleration * dt;
        currentY += velocity * dt;

        applyTransform(currentY);

        if (Math.abs(currentY - targetY) > 0.1 || Math.abs(velocity) > 0.1) {
            rafId = requestAnimationFrame(step);
        } else {
            currentY = targetY;
            velocity = 0;
            applyTransform(currentY);
            rafId = null;
        }
    }

    function onScroll() {
        targetY = window.scrollY || window.pageYOffset;
        if (!rafId) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(step);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        targetY = window.scrollY || window.pageYOffset;
        currentY = targetY;
        velocity = 0;
        applyTransform(currentY);
    }, { passive: true });

    // Initial render
    applyTransform(currentY);
}

/* ==========================================================================
   8. COMMAND PALETTE SEARCH MODAL (Ctrl + K) - Exact Kroszborg Parity
   ========================================================================== */
function initCommandPalette() {
    const modalBackdrop = document.getElementById('cmd-modal');
    const searchBtn = document.getElementById('cmd-k-btn');
    const searchInput = document.getElementById('cmd-search-input');
    const resultsContainer = document.getElementById('cmd-results-list');
    if (!modalBackdrop || !searchInput || !resultsContainer) return;

    // Detect Mac vs Windows for shortcut keys
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    document.querySelectorAll('.nav-search-kbd').forEach(el => {
        el.innerHTML = isMac ? '<span class="kbd-mod">⌘</span>K' : '<span class="kbd-mod">Ctrl +</span>K';
    });

    const searchableItems = [
        { title: 'All Projects', desc: 'Browse all featured full-stack and AI projects', category: 'Navigation', url: 'projects.html' },
        { title: 'All Blogs', desc: 'Read deep dives, engineering notes and case studies', category: 'Navigation', url: 'blog.html' },
        { title: 'RepurposeAI', desc: 'AI-powered content repurposing SaaS', category: 'Project', url: 'https://repurposeai-rp.vercel.app/' },
        { title: 'Resume Roaster', desc: 'AI resume critique & ATS optimization tool', category: 'Project', url: 'https://resume-roaster-ro.vercel.app/' },
        { title: 'Smart Learn', desc: 'AI-powered study companion with slide vector search', category: 'Project', url: 'https://smart-learn-web.vercel.app' },
        { title: 'Kinship Family Tree', desc: 'Interactive canvas family tree builder with React Flow', category: 'Project', url: 'https://familytree-livid.vercel.app' },
        { title: 'RepurposeAI Architecture', desc: 'Building multi-provider audio/video pipeline', category: 'Blog', url: 'repurpose-ai.html' },
        { title: 'Resume Roaster Fallbacks', desc: 'Zero-downtime failovers between Gemini and OpenAI', category: 'Blog', url: 'resume-roaster.html' },
        { title: 'Smart Learn Vector RAG', desc: 'Semantic search & Supabase pgvector embeddings', category: 'Blog', url: 'smart-learn.html' },
        { title: 'Kinship React Flow Canvas', desc: 'Zoomable viewports & complex node junctions', category: 'Blog', url: 'kinship.html' },
        { title: 'GitHub Profile', desc: 'View repositories and contributions', category: 'Social', url: 'https://github.com/Krishnanand-10' },
        { title: 'LinkedIn Profile', desc: 'Connect professionally', category: 'Social', url: 'https://www.linkedin.com/in/krishna-nand-tiwari-547037258/' },
        { title: 'X (Twitter)', desc: 'Follow for tech thoughts and updates', category: 'Social', url: 'https://x.com/Krishna_exe7' },
        { title: 'Send Email', desc: 'Get in touch directly', category: 'Contact', url: 'mailto:nandkrishna2320@gmail.com' }
    ];

    let selectedIndex = 0;

    function renderResults(query = '') {
        const cleanQuery = query.toLowerCase().trim();
        const filtered = searchableItems.filter(item => 
            item.title.toLowerCase().includes(cleanQuery) ||
            item.desc.toLowerCase().includes(cleanQuery) ||
            item.category.toLowerCase().includes(cleanQuery)
        );

        if (!filtered.length) {
            resultsContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--secondary); font-size: 0.9rem;">No results found for "${escapeHtml(query)}"</div>`;
            return;
        }

        selectedIndex = Math.min(selectedIndex, filtered.length - 1);

        resultsContainer.innerHTML = filtered.map((item, idx) => `
            <div class="cmd-result-item ${idx === selectedIndex ? 'selected' : ''}" data-url="${item.url}">
                <div>
                    <div class="cmd-item-title">${escapeHtml(item.title)}</div>
                    <div class="cmd-item-desc">${escapeHtml(item.desc)}</div>
                </div>
                <span class="cmd-item-cat">${escapeHtml(item.category)}</span>
            </div>
        `).join('');

        // Item click
        resultsContainer.querySelectorAll('.cmd-result-item').forEach((el, idx) => {
            el.addEventListener('click', () => {
                navigateTo(el.dataset.url);
            });
        });
    }

    function openModal() {
        modalBackdrop.classList.add('active');
        modalBackdrop.setAttribute('aria-hidden', 'false');
        searchInput.value = '';
        selectedIndex = 0;
        renderResults();
        setTimeout(() => searchInput.focus(), 50);
    }

    function closeModal() {
        modalBackdrop.classList.remove('active');
        modalBackdrop.setAttribute('aria-hidden', 'true');
    }

    function navigateTo(url) {
        closeModal();
        if (url.startsWith('http') || url.startsWith('mailto')) {
            window.open(url, '_blank');
        } else if (url.startsWith('#')) {
            const target = document.querySelector(url);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = url;
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', openModal);

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });

    searchInput.addEventListener('input', (e) => {
        selectedIndex = 0;
        renderResults(e.target.value);
    });

    window.addEventListener('keydown', (e) => {
        // Toggle on Ctrl+K / Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modalBackdrop.classList.contains('active')) {
                closeModal();
            } else {
                openModal();
            }
        }

        if (!modalBackdrop.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const items = resultsContainer.querySelectorAll('.cmd-result-item');
            if (items.length) {
                selectedIndex = (selectedIndex + 1) % items.length;
                renderResults(searchInput.value);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const items = resultsContainer.querySelectorAll('.cmd-result-item');
            if (items.length) {
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                renderResults(searchInput.value);
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const activeItem = resultsContainer.querySelector('.cmd-result-item.selected');
            if (activeItem) {
                navigateTo(activeItem.dataset.url);
            }
        }
    });
}

/* ==========================================================================
   8. FLOATING AI PORTFOLIO ASSISTANT CHAT WIDGET (1:1 kroszborg)
   ========================================================================== */
function initAIAssistantWidget() {
    const toggleBtn = document.getElementById('ai-chat-toggle-btn');
    const closeBtn = document.getElementById('ai-chat-close-btn');
    const chatWindow = document.getElementById('ai-chat-window');
    const messagesContainer = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send-btn');
    if (!toggleBtn || !chatWindow || !messagesContainer) return;

    let isOpen = false;

    function openChat() {
        isOpen = true;
        chatWindow.classList.remove('closed');
        chatWindow.setAttribute('aria-hidden', 'false');
        if (chatInput) chatInput.focus();
    }

    function closeChat() {
        isOpen = false;
        chatWindow.classList.add('closed');
        chatWindow.setAttribute('aria-hidden', 'true');
    }

    toggleBtn.addEventListener('click', () => {
        if (isOpen) closeChat();
        else openChat();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    function appendMessage(text, sender = 'assistant') {
        const bubble = document.createElement('div');
        bubble.className = `ai-chat-bubble ${sender}`;
        bubble.innerHTML = `<p>${escapeHtml(text)}</p>`;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserInput(query) {
        const text = query.trim();
        if (!text) return;

        appendMessage(text, 'user');
        if (chatInput) chatInput.value = '';

        // Simulate fast realistic response
        setTimeout(() => {
            const lower = text.toLowerCase();
            let response = '';

            if (lower.includes('tech') || lower.includes('stack') || lower.includes('work with') || lower.includes('skill')) {
                response = "Krishna specializes in React, Next.js, TypeScript, Node.js, and Supabase. He also works with Tailwind CSS, Python/Django, Gemini AI, PostgreSQL, Docker, and Three.js for 3D web experiences.";
            } else if (lower.includes('project') || lower.includes('recent') || lower.includes('built')) {
                response = "Krishna's featured projects include:\n• RepurposeAI — AI-powered content repurposing SaaS\n• Resume Roaster — AI resume analyzer with multi-provider LLMs\n• Smart Learn — Vector RAG study companion\n• Kinship — Graph tree builder built with React Flow.";
            } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('talk') || lower.includes('reach')) {
                response = "You can contact Krishna directly at nandkrishna2320@gmail.com, or connect on LinkedIn (linkedin.com/in/krishna-nand-tiwari-547037258/) or X (@Krishna_exe7).";
            } else if (lower.includes('experience') || lower.includes('intern') || lower.includes('background') || lower.includes('about')) {
                response = "Krishna is an independent full-stack developer who builds modern web applications and AI-driven products using React, Next.js, TypeScript, and Supabase. Check out his featured Projects to see his work!";
            } else {
                response = "Thanks for asking! Krishna is a full-stack developer passionate about high-performance web apps, AI orchestration, and clean UX. Feel free to check out his Projects above or reach out via email at nandkrishna2320@gmail.com!";
            }

            appendMessage(response, 'assistant');
        }, 400);
    }

    // Suggestions chips click
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.dataset.query || chip.textContent;
            handleUserInput(query);
        });
    });

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => handleUserInput(chatInput.value));
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserInput(chatInput.value);
            }
        });
    }
}

/* ==========================================================================
   9. SMOOTH SCROLL FOR NAV ANCHORS
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* ==========================================================================
   10. SCROLL REVEAL (1:1 kroszborg Framer Motion fadeInBlur)
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.feed-section, .cta-banner-card, .quote-card');
    if (!targets.length) return;

    targets.forEach(el => el.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. DYNAMIC BHAGAVAD GITA QUOTES (Changes on every visit & on click)
   ========================================================================== */
const BHAGAVAD_GITA_QUOTES = [
    {
        quote: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
        chapter: "Chapter 2, Verse 47"
    },
    {
        quote: "Man is made by his belief. As he believes, so he is.",
        chapter: "Chapter 17, Verse 3"
    },
    {
        quote: "The mind is restless, turbulent, obstinate and very strong. But it can be mastered through persistent practice and detachment.",
        chapter: "Chapter 6, Verse 35"
    },
    {
        quote: "A person can rise through the efforts of their own mind, or draw themselves down. For each person is their own friend or their own enemy.",
        chapter: "Chapter 6, Verse 5"
    },
    {
        quote: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
        chapter: "Chapter 6, Verse 19"
    },
    {
        quote: "Perform your duty with an equanimous mind, abandoning all attachment to success or failure. Such equanimity is called Yoga.",
        chapter: "Chapter 2, Verse 48"
    },
    {
        quote: "Set your heart upon your work, but never on its reward. Work not for a reward, but never cease to do your work.",
        chapter: "Chapter 2, Verse 47"
    },
    {
        quote: "Better is one's own duty, though imperfectly performed, than the duty of another discharged with perfection.",
        chapter: "Chapter 3, Verse 35"
    },
    {
        quote: "The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be. The soul is eternal, ever-existing, and primeval.",
        chapter: "Chapter 2, Verse 20"
    },
    {
        quote: "No one who does good work will ever come to an evil end, either here or in the world to come.",
        chapter: "Chapter 6, Verse 40"
    },
    {
        quote: "Whatever action is performed by a great person, common people follow. Whatever standards they set, all the world pursues.",
        chapter: "Chapter 3, Verse 21"
    },
    {
        quote: "Calmness, gentleness, silence, self-restraint, and purity of heart: these are the disciplines of the mind.",
        chapter: "Chapter 17, Verse 16"
    },
    {
        quote: "One who has conquered the mind is calm in heat and cold, in pleasure and pain, in honor and dishonor.",
        chapter: "Chapter 6, Verse 7"
    },
    {
        quote: "There is nothing in this world so purifying as divine knowledge. One who attains purity through yoga finds this within oneself in due course.",
        chapter: "Chapter 4, Verse 38"
    },
    {
        quote: "Delusion arises from anger. From delusion comes confusion of memory. From confusion of memory comes loss of intellect, and from loss of intellect a person is ruined.",
        chapter: "Chapter 2, Verse 63"
    },
    {
        quote: "Reshape yourself through the power of your will; never let yourself be degraded by self-will.",
        chapter: "Chapter 6, Verse 5"
    }
];

function initGitaQuotes() {
    const quoteCard = document.getElementById('quote-card');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    if (!quoteText || !quoteAuthor) return;

    function renderQuote(idx, animate = false) {
        const item = BHAGAVAD_GITA_QUOTES[idx];
        if (!item) return;

        if (animate) {
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';
            setTimeout(() => {
                quoteText.textContent = `“${item.quote}”`;
                quoteAuthor.textContent = `— Bhagavad Gita, ${item.chapter}`;
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';
            }, 180);
        } else {
            quoteText.textContent = `“${item.quote}”`;
            quoteAuthor.textContent = `— Bhagavad Gita, ${item.chapter}`;
        }
    }

    function getNextQuoteIndex() {
        let lastIdx = -1;
        try {
            const stored = sessionStorage.getItem('gita_quote_idx') || localStorage.getItem('gita_quote_idx');
            if (stored !== null) lastIdx = parseInt(stored, 10);
        } catch (e) {}

        let nextIdx;
        if (isNaN(lastIdx) || lastIdx < 0 || lastIdx >= BHAGAVAD_GITA_QUOTES.length) {
            nextIdx = Math.floor(Math.random() * BHAGAVAD_GITA_QUOTES.length);
        } else {
            const offset = Math.floor(Math.random() * (BHAGAVAD_GITA_QUOTES.length - 1)) + 1;
            nextIdx = (lastIdx + offset) % BHAGAVAD_GITA_QUOTES.length;
        }

        try {
            sessionStorage.setItem('gita_quote_idx', nextIdx.toString());
            localStorage.setItem('gita_quote_idx', nextIdx.toString());
        } catch (e) {}

        return nextIdx;
    }

    // Set dynamic quote for this visit
    let currentIdx = getNextQuoteIndex();
    renderQuote(currentIdx, false);

    // Clicking quote card cycles to another verse with smooth fade
    if (quoteCard) {
        quoteCard.addEventListener('click', () => {
            currentIdx = getNextQuoteIndex();
            renderQuote(currentIdx, true);
        });
    }
}

/* ==========================================================================
   12. EXACT 1:1 KROSZBORG.CO WEBGL ANIMATED SHADER BACKGROUND
   ========================================================================== */
function initShaderBackground() {
    const canvas = document.getElementById('shader-canvas');
    if (!canvas) return;

    // Initialize WebGL context
    let gl = null;
    try {
        gl = canvas.getContext('webgl', { 
            alpha: false, 
            antialias: false, 
            depth: false, 
            stencil: false, 
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance' 
        }) || canvas.getContext('experimental-webgl');
    } catch (e) {
        console.warn('WebGL initialization failed:', e);
        return;
    }

    if (!gl) {
        console.warn('WebGL not supported for ShaderBackground.');
        return;
    }

    // Vertex Shader: full-screen quad
    const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = position * 0.5 + 0.5;
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    // Fragment Shader: Exact 1:1 math from kroszborg.co module 52685 (ShaderBackground)
    const fsSource = `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uIsDark;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // ── Simplex noise ──────────────────────────────────────────────────
        vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

        float snoise(vec2 v) {
            const vec4 C = vec4(
                0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439
            );
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy  -= i1;
            i = mod(i, 289.0);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                     + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(
                dot(x0,  x0),
                dot(x12.xy, x12.xy),
                dot(x12.zw, x12.zw)
            ), 0.0);
            m = m * m;
            m = m * m;
            vec3 x  = 2.0 * fract(p * C.www) - 1.0;
            vec3 h  = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
            vec3 g;
            g.x  = a0.x  * x0.x   + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        // ── Fractional Brownian Motion (FBM) ──────────────────────────────
        float fbm(vec2 st) {
            float v = 0.0;
            float a = 0.5;
            mat2 rot = mat2(0.866025, 0.5, -0.5, 0.866025);
            for (int i = 0; i < 6; i++) {
                v  += a * snoise(st);
                st  = rot * st * 2.07;
                a  *= 0.46;
            }
            return v;
        }

        // ── Interleaved gradient noise (Dithering) ─────────────────────────
        float ign(vec2 pos) {
            return fract(52.9829189 * fract(dot(pos, vec2(0.06711056, 0.00583715))));
        }

        void main() {
            float aspect = uResolution.x / uResolution.y;
            
            // Exact Three.js perspective camera projection from kroszborg:
            // Camera at (0, 0, 1), fov = 75 deg, mesh: planeGeometry(2, 2) at (0, 0, 0)
            // Visible frustum half-height at z=0: tan(75° / 2) = 0.7673269879789604
            // Half-height of plane in NDC: 1.0 / 0.7673269879789604 = 1.3032253728412058
            // Half-width of plane in NDC: 1.3032253728412058 / aspect
            vec2 ndc = (vUv - 0.5) * 2.0;
            
            float halfH = 1.30322537;
            float halfW = halfH / aspect;
            
            // Check if fragment is outside the 3D plane horizontally
            float edgeDist = halfW - abs(ndc.x);
            if (edgeDist < 0.0) {
                // Outside the plane: pure black, matching Three.js clear color
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                return;
            }
            
            // Smooth anti-aliasing across 1.5 pixels at the plane boundary
            float edgeAlpha = clamp(edgeDist * (uResolution.x * 0.5), 0.0, 1.0);
            
            // Inside the plane: uv goes from 0.0 to 1.0 across the 3D planeGeometry(2, 2)
            vec2 uv = vec2(
                (ndc.x / halfW) * 0.5 + 0.5,
                (ndc.y / halfH) * 0.5 + 0.5
            );

            float t = uTime * 0.05;

            // ── Layer 1: large slow warp (Exact 1:1 kroszborg movement) ───────
            vec2 q;
            q.x = fbm(uv * 1.8 + vec2(0.00, 0.00) + t * 0.6);
            q.y = fbm(uv * 1.8 + vec2(5.20, 1.30) + t * 0.5);

            // ── Layer 2: medium warp driven by layer 1 ─────────────────────────
            vec2 r;
            r.x = fbm(uv * 2.4 + q * 2.2 + vec2(1.70, 9.20) + t * 0.7);
            r.y = fbm(uv * 2.4 + q * 2.2 + vec2(8.30, 2.80) + t * 0.65);

            // ── Final noise value, deeply warped ───────────────────────────────
            float f = fbm(uv * 3.0 + r * 1.8 + t * 0.5);
            f = f * 0.5 + 0.5;

            if (uIsDark > 0.5) {
                // ── DARK MODE: Exact 1:1 kroszborg.co contrast curve (Module 52685) ───────
                float bright = smoothstep(0.30, 0.80, f);
                bright = pow(bright, 1.6);
                bright = bright * 0.12 + 0.015; // Range: 0.015 to 0.135

                // ── Ordered dither (Exact 1:1 kroszborg math to eliminate banding) ────────
                float noise = ign(gl_FragCoord.xy);
                float dither = (noise - 0.5) * 0.015 * (1.0 + bright * 2.0);
                bright += dither;
                bright = clamp(bright, 0.0, 1.0);

                // ── Vignette (Exact 1:1 kroszborg formula) ────────────────────────
                vec2 vigUv = uv - 0.5;
                vigUv.x *= 0.85;
                float vignette = 1.0 - dot(vigUv, vigUv) * 2.8;
                vignette = clamp(vignette, 0.0, 1.0);
                vignette = pow(vignette, 0.5);

                bright *= vignette;
                bright = max(bright, 0.012);

                // Blend cleanly with the plane edge
                bright *= edgeAlpha;

                gl_FragColor = vec4(vec3(bright), 1.0);
            } else {
                float bright = smoothstep(0.20, 0.70, f);
                bright = pow(bright, 1.4);
                bright = 0.92 - bright * 0.10;

                vec2 screenPos = uv * uResolution;
                float noise = ign(screenPos);
                float dither = (noise - 0.5) * 0.015 * (1.0 - bright * 0.5);
                bright += dither;
                bright = clamp(bright, 0.75, 1.0);

                vec2 vigUv = uv - 0.5;
                vigUv.x *= 0.85;
                float vignette = 1.0 - dot(vigUv, vigUv) * 1.2;
                vignette = clamp(vignette, 0.88, 1.0);

                bright *= vignette;
                gl_FragColor = vec4(vec3(bright), 1.0);
            }
        }
    `;

    function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking failed:', gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    // Full-screen quad geometry (two triangles)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0
    ]), gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResLoc = gl.getUniformLocation(program, 'uResolution');
    const uIsDarkLoc = gl.getUniformLocation(program, 'uIsDark');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');

    // Handle viewport resizing
    let width = 0;
    let height = 0;
    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform2f(uResLoc, width, height);
        gl.uniform1f(uIsDarkLoc, 1.0);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    }, { passive: true });

    let startTime = performance.now();
    let rafId = null;

    function render(now) {
        const elapsedTime = (now - startTime) * 0.001;

        gl.uniform1f(uTimeLoc, elapsedTime);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        rafId = requestAnimationFrame(render);
    }

    // Pause when tab is not visible to conserve battery
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
        } else {
            rafId = requestAnimationFrame(render);
        }
    });

    rafId = requestAnimationFrame(render);
}

/* ==========================================================================
   12. EXACT 1:1 KROSZBORG.CO DYNAMIC GRAIN OVERLAY
   ========================================================================== */
function initGrainOverlay() {
    const gridLayer = document.querySelector('.shader-bg.grid-layer');
    if (!gridLayer) return;

    try {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgData = ctx.createImageData(128, 128);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const val = (Math.random() * 255) | 0;
            imgData.data[i] = val;
            imgData.data[i + 1] = val;
            imgData.data[i + 2] = val;
            imgData.data[i + 3] = 12; // subtle film grain dither
        }
        ctx.putImageData(imgData, 0, 0);
        gridLayer.style.backgroundImage = `url("${canvas.toDataURL()}")`;
    } catch (e) {
        console.warn('Grain overlay canvas error:', e);
    }
}

/* ==========================================================================
   13. PRIVATE OWNER VIEW COUNTER (Only visible to owner, raw & low-contrast)
   ========================================================================== */
function initOwnerViewBadge() {
    const badge = document.getElementById('owner-views-badge');
    const countEl = document.getElementById('owner-views-count');
    if (!badge || !countEl) return;

    // 1. Check if owner mode is enabled via URL parameter or local environment
    const urlParams = new URLSearchParams(window.location.search);
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:';

    if (urlParams.has('owner') || urlParams.has('admin') || urlParams.has('me')) {
        try {
            localStorage.setItem('krishna_portfolio_owner', 'true');
        } catch (e) {}
    } else if (urlParams.get('owner') === 'false') {
        try {
            localStorage.removeItem('krishna_portfolio_owner');
        } catch (e) {}
    } else if (isLocal && !localStorage.getItem('krishna_portfolio_owner')) {
        // Auto-enable for Krishna during local development
        try {
            localStorage.setItem('krishna_portfolio_owner', 'true');
        } catch (e) {}
    }

    function isOwner() {
        try {
            return localStorage.getItem('krishna_portfolio_owner') === 'true';
        } catch (e) {
            return false;
        }
    }

    function updateVisibility() {
        if (isOwner()) {
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }

    // Initialize visibility: hidden for public visitors, visible to owner
    updateVisibility();

    // 2. Secret Shortcut: Ctrl + Shift + V toggles Owner Mode
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'V' || e.key === 'v')) {
            e.preventDefault();
            const current = isOwner();
            try {
                localStorage.setItem('krishna_portfolio_owner', (!current).toString());
            } catch (err) {}
            updateVisibility();
        }
    });

    // 3. Triple Click Footer: Allows unlocking owner mode on mobile devices
    const footerCopy = document.getElementById('footer-copy');
    if (footerCopy) {
        let clickCount = 0;
        let clickTimer = null;
        footerCopy.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            if (clickCount >= 3) {
                clickCount = 0;
                const current = isOwner();
                try {
                    localStorage.setItem('krishna_portfolio_owner', (!current).toString());
                } catch (err) {}
                updateVisibility();
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            }
        });
    }

    // 4. Display cached count immediately for low-contrast raw UI
    try {
        const cached = localStorage.getItem('cached_portfolio_views');
        if (cached) {
            countEl.textContent = Number(cached).toLocaleString();
        }
    } catch (e) {}

    function updateCounterUI(val) {
        const num = Number(val);
        if (!isNaN(num) && num > 0) {
            countEl.textContent = num.toLocaleString();
            try {
                localStorage.setItem('cached_portfolio_views', num.toString());
            } catch (e) {}
        }
    }

    // 5. Fetch live count (incrementing on new session)
    try {
        const sessionKey = 'portfolio_counted_session';
        const isNewSession = !sessionStorage.getItem(sessionKey);
        const endpoint = isNewSession
            ? 'https://countapi.mileshilliard.com/api/v1/hit/krishnanand_portfolio_views'
            : 'https://countapi.mileshilliard.com/api/v1/get/krishnanand_portfolio_views';

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.value === 'number') {
                    updateCounterUI(data.value);
                    if (isNewSession) {
                        try {
                            sessionStorage.setItem(sessionKey, '1');
                        } catch (e) {}
                    }
                }
            })
            .catch(() => {
                if (!localStorage.getItem('cached_portfolio_views')) {
                    countEl.textContent = '--';
                }
            });
    } catch (err) {}

    // 6. Optional: Sync directly with Umami Share URL token if configured
    try {
        const shareToken = localStorage.getItem('umami_share_token');
        if (shareToken) {
            fetch(`https://cloud.umami.is/api/share/${shareToken}`)
                .then(r => r.json())
                .then(data => {
                    if (data && data.websiteId) {
                        const now = Date.now();
                        const start = now - 30 * 24 * 60 * 60 * 1000;
                        return fetch(`https://cloud.umami.is/api/websites/${data.websiteId}/stats?startAt=${start}&endAt=${now}`, {
                            headers: { 'x-umami-share-token': shareToken }
                        });
                    }
                })
                .then(r => r ? r.json() : null)
                .then(stats => {
                    if (stats && stats.pageviews) {
                        const views = stats.pageviews.value || stats.pageviews;
                        updateCounterUI(views);
                    }
                })
                .catch(() => {});
        }
    } catch (e) {}
}

