const truck = document.getElementById('truck');
const panorama = document.getElementById('panorama');
const worker = document.getElementById('worker');

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

function update() {
    truck.style.display = "";
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = scrollTop / maxScroll;

    const vw = window.innerWidth;
    const truckW = truck.offsetWidth;
    const panoramaW = panorama.offsetWidth;

    const startX = -truckW - 10;
    const stopX = -truckW / 1.2;
    const halfOutX = vw - truckW * 0.33;
    const maxPan = -panoramaW;

    let truckX, panX, workerOpacity, workerY;

    if (progress < 0.25) {
        const t = progress / 0.25;
        truckX = lerp(startX, stopX, t);
        panX = 0;
        workerOpacity = 0;
        workerY = 30;
    } else if (progress < 0.55) {
        const t = (progress - 0.25) / 0.30;
        truckX = stopX;
        panX = lerp(0, maxPan, t);
        workerOpacity = 0;
        workerY = 30;
    } else if (progress < 0.75) {
        const t = (progress - 0.55) / 0.20;
        truckX = lerp(stopX, halfOutX, t);
        panX = maxPan;
        workerOpacity = 0;
        workerY = 30;
    } else {
        const t = (progress - 0.75) / 0.25;
        truckX = halfOutX;
        panX = maxPan;
        workerOpacity = Math.max(0, Math.min(1, t));
        workerY = lerp(30, 0, t);
    }

    truck.style.transform = `translateX(${truckX}px)`;
    panorama.style.transform = `translateX(${panX}px)`;

    worker.style.opacity = workerOpacity;
    worker.style.transform = `translateX(-50%) translateY(${workerY}%)`;
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();
truck.style.display = "none";
