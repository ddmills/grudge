export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const serviceWorkerPath = 'service-worker.js';

    window.addEventListener('load', () => {
      navigator.serviceWorker.register(serviceWorkerPath);
    });
  }
}
