function displayScroll(){
    const scrollable = document.getElementById("scrollable_page");
    console.log(scrollable)
    scrollable.classList.remove("slide-out", "slide-in");
    scrollable.style.display = "block";
    void scrollable.offsetWidth;
    scrollable.classList.add("slide-in");
}

function hideScroll(){
    const scrollable = document.getElementById("scrollable_page");
    scrollable.classList.remove("slide-in");
    scrollable.classList.add("slide-out");
    scrollable.addEventListener("animationend", () => {
        scrollable.style.display = "none";
        scrollable.classList.remove("slide-out");
    }, { once: true })
}

window.addEventListener('mouseup', function(event) {
    var scrollable = document.getElementById('scrollable_page');
    if (scrollable.style.display === "none") return; // ✅ déjà caché, rien à faire
    if (!event.target.closest("#scrollable_page")) {
        console.log("call")
        hideScroll();
    }
});