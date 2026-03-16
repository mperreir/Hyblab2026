function displayScroll(id){
    const scrollable = document.getElementById(id);
    scrollable.classList.remove("slide-out", "slide-in");
    scrollable.style.display = "block";
    void scrollable.offsetWidth;
    scrollable.classList.add("slide-in");

    const header = document.querySelector("header")
    header.classList.add("blurred")
    const main = document.querySelector("main")
    main.classList.add("blurred")

    if (window.initWavesurfers) {
        window.initWavesurfers();
    }
}

function hideScroll(id){
    const scrollable = document.getElementById(id);
    scrollable.classList.remove("slide-in");
    scrollable.classList.add("slide-out");
    const header = document.querySelector("header")
    header.classList.remove("blurred")
    const main = document.querySelector("main")
    main.classList.remove("blurred")
    scrollable.addEventListener("animationend", () => {
        scrollable.style.display = "none";
        scrollable.classList.remove("slide-out");
    }, { once: true })
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const requestedView = params.get("view");

    if (requestedView === "company") {
        displayScroll("scrollable_page");
    }
});

window.addEventListener('mouseup', function(event) {
    var scrollable = document.getElementById('scrollable_page');
    var scrollable_2 = document.getElementById('scrollable_page_2');
    const isVisible = getComputedStyle(scrollable).display !== "none";
    const isVisible_2 = getComputedStyle(scrollable_2).display !== "none";
    if (!isVisible && !isVisible_2) return;
    if (isVisible && !event.target.closest("#scrollable_page") && !event.target.closest(".entreprisePin")) {
        hideScroll('scrollable_page');
    }
    if (isVisible_2 && !event.target.closest("#scrollable_page_2")){
        hideScroll('scrollable_page_2')
    }
});
