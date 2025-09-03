import { videoSources, fallbackVideo } from './constants.js';
import { logEvent } from './utils.js';

// Управление видео потоками
export const initializeVideos = (videoElements) => {
    videoElements.forEach((video, index) => {
        // Используем новые видео-источники
        video.src = videoSources[index % videoSources.length];
        video.loop = true;
        video.muted = true;
        
        video.addEventListener('canplaythrough', () => {
            if (video.id === "video3" || video.id === "video5") {
                video.style.opacity = 0.5;
                const feed = video.closest(".camera-feed");
                const noiseOverlay = feed.querySelector(".noise-overlay");
                noiseOverlay.style.opacity = 0.15;
            }
            
            video.play().catch((error) => {
                console.error("Video playback error:", error);
                logEvent(`ОШИБКА: Видеопоток камеры ${index + 1} недоступен`);
                // При ошибке используем fallback
                video.src = fallbackVideo;
                video.play();
            });
        });
        
        video.addEventListener('error', () => {
            console.log("Video failed to load, using fallback");
            video.src = fallbackVideo;
            video.play();
        });
    });
};

export const setColorMode = (videoElements, isColorMode) => {
    videoElements.forEach((video) => {
        if (isColorMode) {
            video.classList.add("color-mode");
        } else {
            video.classList.remove("color-mode");
        }
    });
};

export const restartVideos = (videoElements) => {
    videoElements.forEach((video) => {
        video.currentTime = 0;
        video.play().catch(e => console.error("Video restart error:", e));
    });
};