lucide.createIcons();

const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggleSidebar");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

/* ACTIVE MENU on click */
const links = document.querySelectorAll(".nav a");
links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

/* ACTIVE MENU on scroll */
const sections = document.querySelectorAll(".page[id], #activity");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                links.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach(section => observer.observe(section));
