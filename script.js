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
   6. GITHUB CONTRIBUTIONS HEATMAP GENERATOR
   ========================================================================== */
function initHeatmap() {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;

    let html = '';
    for (let i = 0; i < 150; i++) {
        const rand = Math.random();
        let heatClass = '';
        if (rand > 0.85) heatClass = 'heat-4';
        else if (rand > 0.68) heatClass = 'heat-3';
        else if (rand > 0.48) heatClass = 'heat-2';
        else if (rand > 0.28) heatClass = 'heat-1';
        
        const count = heatClass === 'heat-4' ? 12 : heatClass === 'heat-3' ? 7 : heatClass === 'heat-2' ? 4 : heatClass === 'heat-1' ? 2 : 0;
        html += `<div class="heat-box ${heatClass}" title="${count} contributions"></div>`;
    }
    grid.innerHTML = html;
}

/* ==========================================================================
   7. COMMAND PALETTE SEARCH MODAL (Ctrl + K)
   ========================================================================== */
function initCommandPalette() {
    const modalBackdrop = document.getElementById('cmd-modal');
    const searchBtn = document.getElementById('cmd-k-btn');
    const searchInput = document.getElementById('cmd-search-input');
    const resultsContainer = document.getElementById('cmd-results-list');
    if (!modalBackdrop || !searchInput || !resultsContainer) return;

    const searchableItems = [
        { title: 'All Projects', desc: 'Browse all featured full-stack and AI projects', category: 'Navigation', url: 'projects.html' },
        { title: 'All Blogs', desc: 'Read deep dives, engineering notes and case studies', category: 'Navigation', url: 'blog.html' },
        { title: 'RepurposeAI', desc: 'AI-powered content repurposing SaaS', category: 'Project', url: 'https://repurposeai-rp.vercel.app/' },
        { title: 'Resume Roaster', desc: 'AI resume critique & ATS optimization tool', category: 'Project', url: 'https://resume-roaster-ro.vercel.app/' },
        { title: 'Smart Learn', desc: 'AI-powered study companion with slide vector search', category: 'Project', url: 'https://smart-learn-web.vercel.app' },
        { title: 'Kinship Family Tree', desc: 'Interactive canvas family tree builder with React Flow', category: 'Project', url: 'https://familytree-livid.vercel.app' },
        { title: 'About Krishna', desc: 'Background, philosophy, and technical stack', category: 'About', url: 'index.html#about' },
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
   11. EXACT 1:1 KROSZBORG.CO WEBGL ANIMATED SHADER BACKGROUND
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

