import { scpLogMessages, scpWarningMessages, prefersReducedMotion } from './constants.js';
import { logEvent } from './utils.js';

// Эффекты глитчей и анимации
export const setupGlitchEffects = (cameraFeeds) => {
    if (prefersReducedMotion) {
        setupReducedMotionEffects(cameraFeeds);
        return;
    }

    cameraFeeds.forEach((feed, index) => {
        const glitchOverlay = feed.querySelector(".glitch-overlay");
        const colorDistortion = feed.querySelector(".color-distortion");
        const video = feed.querySelector(".camera-video");

        // Trigger an immediate glitch on startup
        setTimeout(() => {
            applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
        }, Math.random() * 2000);

        // Random glitch intervals for each camera
        const minInterval = 3000 + index * 500;
        const maxInterval = 10000 + index * 1000;

        function scheduleNextGlitch() {
            const nextGlitchDelay =
                Math.random() * (maxInterval - minInterval) + minInterval;

            setTimeout(() => {
                if (Math.random() < 0.7) {
                    applySCPGlitch(feed, video, glitchOverlay, colorDistortion);
                }
                scheduleNextGlitch();
            }, nextGlitchDelay);
        }

        scheduleNextGlitch();
    });
};

export const applySCPGlitch = (feed, video, glitchOverlay, colorDistortion) => {
    const glitchDuration = Math.random() * 800 + 400;

    // Choose random SCP glitch effects
    const effects = ["anomaly", "containment", "reality", "signal"];
    const effect = effects[Math.floor(Math.random() * effects.length)];

    switch (effect) {
        case "anomaly":
            // Anomaly detection effect
            video.style.filter = "hue-rotate(180deg) contrast(2)";
            glitchOverlay.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
            
            setTimeout(() => {
                video.style.filter = "";
                glitchOverlay.style.backgroundColor = "transparent";
            }, glitchDuration);
            break;

        case "containment":
            // Containment breach effect
            video.style.transform = `scale(1.1) rotate(${Math.random() * 5 - 2.5}deg)`;
            colorDistortion.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            colorDistortion.style.opacity = "0.6";
            
            setTimeout(() => {
                video.style.transform = "";
                colorDistortion.style.opacity = "0";
            }, glitchDuration);
            break;

        case "signal":
            // Signal interference effect
            feed.querySelector(".noise-overlay").style.opacity = "0.2";
            video.style.opacity = "0.7";
            
            setTimeout(() => {
                feed.querySelector(".noise-overlay").style.opacity = "0.03";
                video.style.opacity = "1";
            }, glitchDuration);
            break;
    }

    // Log SCP-themed messages
    if (Math.random() < 0.6) {
        const cameraId = feed.querySelector(".camera-id").textContent;
        const isWarning = Math.random() < 0.3;
        
        if (isWarning) {
            const message = scpWarningMessages[Math.floor(Math.random() * scpWarningMessages.length)];
            logEvent(`${message}: ${cameraId}`);
        } else {
            const message = scpLogMessages[Math.floor(Math.random() * scpLogMessages.length)];
            logEvent(`${message}: ${cameraId}`);
        }
    }
};

export const setupReducedMotionEffects = (cameraFeeds) => {
    cameraFeeds.forEach((feed) => {
        const noiseOverlay = feed.querySelector(".noise-overlay");
        noiseOverlay.style.opacity = 0.02;
        feed.querySelector(".camera-content").style.border = "1px solid var(--border-dark)";
    });
};