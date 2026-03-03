const typedText = document.getElementById("typed-text");

const stages = {
    count: document.getElementById("countdown-container"),
    type: document.getElementById("typing-section"),
    vision: document.getElementById("vision-board"),
    testimony: document.getElementById("testimony-section"),
    evidence: document.getElementById("evidence-section"),
};

// --- STAGE 1: COUNTDOWN ---
let seconds = 10;
const timer = setInterval(() => {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) {
        clearInterval(timer);
        stages.count.style.display = "none";
        runTrial();
    }
}, 1000);

async function runTrial() {
    // --- STAGE 2: OPENING STATEMENT ---
    stages.type.classList.add("visible");
    await typeAndErase("Initiating Court Proceedings...");
    await typeAndErase("The defendant is charged with: EXTREME GREATNESS.");

    // --- STAGE 3: THE VISION ---
    await typeText("Exhibit A: The Vision Board...");
    stages.vision.classList.add("visible");
    await wait(5000); // 5 seconds to look
    stages.vision.classList.replace("visible", "hidden");
    await eraseText();

    // --- STAGE 4: WITNESS TESTIMONY ---
    await typeText("Counsel Akosua Akoma calls the witnesses...");
    stages.testimony.classList.add("visible");
    await wait(10000); // 10 seconds to read wishes
    stages.testimony.classList.replace("visible", "hidden");
    await eraseText();

    // --- STAGE 5: EVIDENCE ---
    await typeText("The evidence is overwhelming. Behold.");
    stages.evidence.classList.add("visible");
    await wait(8000); // 8 seconds to see all 4 photos
    
    // --- STAGE 6: VERDICT ---
    stages.type.classList.add("hidden");
    stages.evidence.classList.add("hidden");
    
    await wait(2000); // Suspenseful pause in total blackness

    const finalVerdict= document.getElementById("verdict");
    finalVerdict.style.display="block";
    finalVerdict.style.opacity="1";
    finalVerdict.classList.add("visible");
}

// --- CORE UTILITIES ---
function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

async function typeAndErase(text) {
    await typeText(text);
    await wait(1500);
    await eraseText();
}

function typeText(text) {
    return new Promise(resolve => {
        typedText.textContent = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                typedText.textContent += text[i];
                i++;
                setTimeout(type, 60);
            } else { resolve(); }
        }
        type();
    });
}

function eraseText() {
    return new Promise(resolve => {
        let text = typedText.textContent;
        function erase() {
            if (text.length > 0) {
                text = text.substring(0, text.length - 1);
                typedText.textContent = text;
                setTimeout(erase, 30);
            } else { resolve(); }
        }
        erase();
    });
}