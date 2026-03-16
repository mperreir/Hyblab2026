export const sharePage = async () => {
    if (navigator.share) {
        await navigator.share({
            title: document.title,
            url: window.location.href
        })
    }
}
