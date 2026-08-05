/* Init icons */
lucide.createIcons();

/* =================================================
   Utilities
================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

/* =================================================
   Image fallback
================================================= */
$$("[data-fallback]").forEach(img => {
    const done = () => {
        const holder = img.closest(".avatar,.photo-frame,.activity-card");
        if (holder) holder.classList.add("img-fallback");
        if (holder && !holder.querySelector(".fallback-text")) {
            const t = document.createElement("span");
            t.className = "fallback-text";
            t.textContent = img.getAttribute("data-fallback");
            holder.appendChild(t);
        }
    };
    if (!img.complete) on(img, "error", done);
    else if (img.naturalWidth === 0) done();
});

/* =================================================
   Sidebar collapse (persisted)
================================================= */
const sidebar = $("#sidebar");
const toggle = $("#toggleSidebar");
const saved = localStorage.getItem("sidebar");
if (saved === "collapsed" && window.innerWidth > 900) sidebar.classList.add("collapsed");

on(toggle, "click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem("sidebar", sidebar.classList.contains("collapsed") ? "collapsed" : "open");
});

/* =================================================
   Mobile drawer
================================================= */
const topbar = $("#topbar");
const backdrop = $("#backdrop");
const openDrawer = () => {
    sidebar.classList.add("open");
    sidebar.classList.remove("collapsed");
    backdrop.classList.add("show");
    $("#menuBtn").setAttribute("aria-expanded", "true");
};
const closeDrawer = () => {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
    $("#menuBtn").setAttribute("aria-expanded", "false");
};
on($("#menuBtn"), "click", () => sidebar.classList.contains("open") ? closeDrawer() : openDrawer());
on($("#closeBtn"), "click", closeDrawer);
on(backdrop, "click", closeDrawer);
on(document, "keydown", e => {
    if (e.key === "Escape") closeDrawer();
});

/* =================================================
   Scroll progress bar
================================================= */
const progress = $("#scrollProgress");
const doc = document.documentElement;
const updateProgress = () => {
    const total = doc.scrollHeight - doc.clientHeight;
    progress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
};
on(window, "scroll", updateProgress, { passive: true });
on(window, "resize", updateProgress);
updateProgress();

/* =================================================
   Back to top
================================================= */
const backTotop = $("#backtotop");
on(window, "scroll", () => {
    backTotop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
on(backTotop, "click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* =================================================
   Nav active state (scroll spy)
================================================= */
const links = $$(".nav a");
const navIndicator = $("#navIndicator");
const sections = $$(".page[id]").length
    ? $$(".page[id], #activity")
    : $$("#home,#about,#activity,#works,#knowledge,#contact");

const setIndicator = (current) => {
    const active = links.find(l => l.getAttribute("href") === `#${current}`);
    if (active) navIndicator.style.transform = `translateY(${active.offsetTop}px)`;
};

let ticking = false;
const spy = () => {
    ticking = false;
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0].id;
    for (const s of sections) {
        if (s.offsetTop <= pos) current = s.id;
    }
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${current}`));
    setIndicator(current);
    return;
};
on(window, "scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(spy); }
}, { passive: true });

links.forEach(link => {
    on(link, "click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        setIndicator(link.getAttribute("href").slice(1));
        if (window.innerWidth <= 900) closeDrawer();
    });
});

/* =================================================
   Reveal on scroll (IntersectionObserver)
================================================= */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const d = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add("in"), d * 140);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
$$(".reveal").forEach(el => revealObserver.observe(el));

/* =================================================
   Copy to clipboard
================================================= */
$$(".copy-btn").forEach(btn => {
    on(btn, "click", async () => {
        const text = btn.dataset.copy;
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text; document.body.appendChild(ta); ta.select();
            document.execCommand("copy"); ta.remove();
        }
        const icon = btn.querySelector("i");
        const name = icon.getAttribute("data-lucide");
        btn.classList.add("copied");
        icon.setAttribute("data-lucide", "check");
        lucide.createIcons({ attrs: { focusable: "false" } });
        setTimeout(() => {
            btn.classList.remove("copied");
            icon.setAttribute("data-lucide", name);
            lucide.createIcons();
        }, 1600);
    });
});

/* Init indicator position */
setTimeout(() => setIndicator("home"), 60);
spy();