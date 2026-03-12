function toggleDropdown(id, btn) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle("open");
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".selector-wrapper")) {
        document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
    }
});