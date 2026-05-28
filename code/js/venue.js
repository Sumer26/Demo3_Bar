// The Copper Room — dynamic background, sidebar support, and Night Ledger

(function () {
    const root = document.documentElement;
    let ticking = false;

    function updateBackdrop() {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));

        root.style.setProperty("--bg-x", `${82 - ratio * 58}%`);
        root.style.setProperty("--bg-y", `${12 + ratio * 68}%`);
        root.style.setProperty("--bg-x2", `${14 + ratio * 56}%`);
        root.style.setProperty("--bg-y2", `${86 - ratio * 54}%`);
        root.style.setProperty("--bg-angle", `${135 + ratio * 34}deg`);
        root.style.setProperty("--bg-copper", `${0.16 + ratio * 0.18}`);
        root.style.setProperty("--bg-cream", `${0.06 + ratio * 0.08}`);

        ticking = false;
    }

    function requestBackdropUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateBackdrop);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestBackdropUpdate, { passive: true });
    window.addEventListener("resize", requestBackdropUpdate);
    updateBackdrop();
})();

document.addEventListener("DOMContentLoaded", function () {
    const ledgerRows = Array.from(document.querySelectorAll(".ledger-row[data-day]"));

    if (!ledgerRows.length) return;

    const today = new Date().getDay();

    const shortDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    ledgerRows.forEach((row) => {
        row.classList.remove("today-row");
        row.removeAttribute("aria-current");
    });

    const todayRow = ledgerRows.find((row) => Number(row.dataset.day) === today);

    if (!todayRow) return;

    todayRow.classList.add("today-row");
    todayRow.setAttribute("aria-current", "date");

    const time = todayRow.querySelector(".eyebrow")?.textContent.trim() || "Tonight";
    const title = todayRow.querySelector("h2")?.textContent.trim() || "Tonight at The Copper Room";
    const copy = todayRow.querySelector("p:not(.eyebrow)")?.textContent.trim() || "Tonight’s feature is now available.";
    const action = todayRow.querySelector("a")?.textContent.trim() || "Reserve";
    const actionHref = todayRow.querySelector("a")?.getAttribute("href") || "reserve.html";

    const todayLabel = document.querySelector("#todayLabel");
    const todayDay = document.querySelector("#todayDay");
    const todayTime = document.querySelector("#todayTime");
    const todayTitle = document.querySelector("#todayTitle");
    const todayCopy = document.querySelector("#todayCopy");
    const todayAction = document.querySelector("#todayAction");

    if (todayLabel) todayLabel.textContent = shortDays[today];
    if (todayDay) todayDay.textContent = fullDays[today];
    if (todayTime) todayTime.textContent = time;
    if (todayTitle) todayTitle.textContent = title;
    if (todayCopy) todayCopy.textContent = copy;

    if (todayAction) {
        todayAction.textContent = action;
        todayAction.setAttribute("href", actionHref);
    }
});
