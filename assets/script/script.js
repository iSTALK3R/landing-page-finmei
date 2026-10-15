// Scroll reveal
(function () {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("visible"); });
        return;
    }
    var io = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
})();

// FAQ (acordeão): um aberto por vez, estado exposto via aria-expanded
(function () {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
        var btn = item.querySelector(".faq-question");
        btn.addEventListener("click", function () {
            var wasOpen = item.classList.contains("open");
            items.forEach(function (i) {
                i.classList.remove("open");
                i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
            });
            if (!wasOpen) {
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });
})();

// Faíscas no hover dos botões (só em dispositivos com mouse e sem preferência por movimento reduzido)
(function () {
    var canHover = window.matchMedia("(hover: hover)").matches;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;
    document.querySelectorAll(".btn-primary").forEach(function (btn) {
        btn.addEventListener("mouseenter", function (e) {
            for (var i = 0; i < 6; i++) {
                var s = document.createElement("span");
                s.className = "spark";
                s.style.left = e.clientX + (Math.random() - 0.5) * 40 + "px";
                s.style.top = e.clientY + (Math.random() - 0.5) * 20 + "px";
                s.style.setProperty("--dx", (Math.random() - 0.5) * 60 + "px");
                s.style.setProperty("--dy", -(20 + Math.random() * 30) + "px");
                document.body.appendChild(s);
                setTimeout(function (el) { el.remove(); }, 700, s);
            }
        });
    });
})();