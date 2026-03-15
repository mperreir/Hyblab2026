function displayScroll(){
    const scrollable = document.getElementById("scrollable_page");
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

function hideScroll(){
    const scrollable = document.getElementById("scrollable_page");
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

window.addEventListener('mouseup', function(event) {
    var scrollable = document.getElementById('scrollable_page');
    const isVisible = getComputedStyle(scrollable).display !== "none";
    if (!isVisible) return;
    if (!event.target.closest("#scrollable_page") && !event.target.closest(".entreprisePin")) {
        hideScroll();
    }
});
