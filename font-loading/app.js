const regularTimer = document.getElementById('regularTimer');
const slowTimer = document.getElementById('slowTimer');
const start = Date.now();

let loaded = {
    regular: false,
    slow: false
};

if (document.fonts && document.fonts.load) {
    document.fonts.load('12px Margarine', 'Hello').then(() => (loaded.regular = true));
    document.fonts.load('12px Margarine-Slow', 'Hello').then(() => (loaded.slow = true));
} else {
    // Fallback in case the browser doesn't implement the CSS FontLoading API
    setTimeout(() => (loaded.regular = true), 2500);
    setTimeout(() => (loaded.slow = true), 10000);
}

window.requestAnimationFrame(onFrame);

function onFrame() {
    const now = Date.now();
    const secondsElapsed = (now - start) / 1000;

    if (!loaded.regular) {
        regularTimer.textContent = `${secondsElapsed.toFixed(1)}s`;
    }

    if (!loaded.slow) {
        slowTimer.textContent = `${secondsElapsed.toFixed(1)}s`;
    }

    if (!loaded.regular || !loaded.slow) {
        window.requestAnimationFrame(onFrame);
    }
}
