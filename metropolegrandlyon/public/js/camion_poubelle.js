const truck = document.getElementById('truck');
const panorama = document.getElementById('panorama');
const worker = document.getElementById('worker');
const velo = document.getElementById('velo');
const metro = document.getElementById('metro');
const panorama2 = document.getElementById('fond_eau');
const scrollSpace = document.querySelector('.scroll-space');

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

function update() {
    truck.style.display = "";
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(1, scrollSpace.scrollHeight - window.innerHeight);
    const progress = (scrollTop / maxScroll) * 2;

    const vw = window.innerWidth;
    const truckW = truck.offsetWidth;
    const panoramaW = panorama.offsetWidth;
    const panorama2W = panorama2.offsetWidth;
    const veloW = velo.offsetWidth;
    const metroW = metro.offsetWidth;

    const startX = -truckW - 10;
    const stopX = -truckW / 1.3;
    const halfOutX = vw - truckW * 0.33;
    const maxPan = -panoramaW;
    const maxPan2 = -panorama2W;

    let truckX, panX, workerOpacity, workerY;

    if (progress < 0.10) {
        const t = progress / 0.10;
        truckX = lerp(startX, stopX, t);
        panX = 0;
        workerOpacity = 0;
        workerY = 30;

    } else if (progress < 0.55) {
        const t = (progress - 0.10) / 0.45;
        truckX = stopX;
        panX = lerp(0, maxPan, t);
        workerOpacity = 0;
        workerY = 30;

    } else if (progress < 0.70) {
        const t = (progress - 0.55) / 0.15;
        truckX = lerp(stopX, halfOutX, t);
        panX = maxPan;
        workerOpacity = 0;
        workerY = 30;

    } else if (progress < 0.80) {
        const t = (progress - 0.70) / 0.10;
        truckX = halfOutX;
        panX = maxPan;
        workerOpacity = Math.max(0, Math.min(1, t));
        workerY = lerp(30, 0, t);

    }
    else if (progress < 0.90) {

    }
    else if (progress < 1) {
        const t = (progress - 0.90) / 0.10;
        truckX = lerp(halfOutX, halfOutX + truckW / 2, t);
        panX = maxPan;
        workerOpacity = lerp(1, 0, t);
        workerY = lerp(0, 30, t);

    } else if (progress < 1.05) {
        const t = (progress - 1) / 0.05;

        truck.style.display = '';
        panorama.style.display = '';
        worker.style.display = '';
        panorama2.style.display = 'none';

        truckX = halfOutX + truckW;
        panX = lerp(maxPan, maxPan + vw / 2, t);
        workerOpacity = 0;
        workerY = 30;

    } else if (progress < 1.25) {

        truck.style.display = 'none';
        worker.style.display = 'none';
        panorama.style.display = 'none';
        panorama2.style.display = '';
        panorama2.style.opacity = '1';
        velo.style.display = 'none';
        metro.style.display = 'none';

        const ZOOM_START = 0.8;
        const t = (progress - 1.05) / 0.15;
        const scale = lerp(ZOOM_START, 0.5, t);
        panorama2.style.transform = `scale(${scale})`;
        panorama2.style.transformOrigin = 'top left';

        truckX = halfOutX + truckW;
        panX = maxPan;
        workerOpacity = 0;
        workerY = 30;
    }
    else if (progress < 1.45) {
        const t = (progress - 1.25) / 0.20;
        velo.style.display = '';
        metro.style.display = '';

        const veloX = lerp(vw + veloW, -veloW - 20, t);
        velo.style.transform = `translateX(${veloX}px)`;
        const metroX = lerp(0, metroW + (vw - metroW) / 2, t);
        metro.style.transform = `translateX(${metroX}px)`;
    }
    else if (progress < 1.75) {
        const t = (progress - 1.45) / 0.30;

        const panX2 = lerp(0, (maxPan2) / 2 + vw, t);
        panorama2.style.transform = `translateX(${panX2}px) scale(0.5)`;
        const metroX = lerp(metroW + (vw - metroW) / 2, (maxPan2) / 2 + vw, t);
        metro.style.transform = `translateX(${metroX}px)`;

    }

    truck.style.transform = `translateX(${truckX}px)`;
    panorama.style.transform = `translateX(${panX}px)`;
    worker.style.opacity = workerOpacity;
    worker.style.transform = `translateX(-50%) translateY(${workerY}%)`;
}


window.addEventListener('scroll', update, { passive: true });
update();
truck.style.display = "none";
panorama2.style.display = '';
velo.style.display = 'none';
metro.style.display = 'none';

