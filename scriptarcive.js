(function()

{
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

const inputs =
{   r: document.getElementById('rMax'),
    g: document.getElementById('gMax'),
    b: document.getElementById('bMax'),
    avg: document.getElementById('avgBright'),
    speed: document.getElementById('speed') };

const btnYellow = document.getElementById('btnYellow');

let allowYellow = false; 
let targetPixelsPerFrame = 0;
let rMult = 128, gMult = 256, bMult = 256; 
let width, height, totalPixels, imgData, buffer;

const brightnessLUT = new Uint8Array(256);

btnYellow.addEventListener
('click', () => 
{   allowYellow = !allowYellow;
    updateButtonUI(); }
);

Object.values(inputs).forEach
(input => 
{   input.addEventListener('input', updateSettings); }
);

window.addEventListener('resize', resize);

function updateButtonUI() 
{   if (allowYellow) 
    {   btnYellow.classList.add('active');
        btnYellow.textContent = "Allowing yellow. Click to prevent."; } 
    else 
    {   btnYellow.classList.remove('active');
        btnYellow.textContent = "Preventing yellow. Click to allow."; }
}

function updateSettings() 
{   const maxR = parseInt(inputs.r.value);
    const maxG = parseInt(inputs.g.value);
    const maxB = parseInt(inputs.b.value);
    rMult = maxR + 1;
    gMult = maxG + 1;
    bMult = maxB + 1;
    
    const uiColor = `rgb(${maxR}, ${maxG}, ${maxB})`;
    document.documentElement.style.setProperty('--ui-color', uiColor);

    const updateTrack = (el, activeColor, dimColor) => {
        const pct = (el.value - el.min) / (el.max - el.min) * 100;
        el.style.background = `linear-gradient(to right, ${activeColor} ${pct}%, ${dimColor} ${pct}%)`;
    };

    updateTrack(inputs.r, '#ff4444', 'rgba(255, 68, 68, 0.2)');
    updateTrack(inputs.g, '#44ff44', 'rgba(68, 255, 68, 0.2)');
    updateTrack(inputs.b, '#4444ff', 'rgba(68, 68, 255, 0.2)');
    updateTrack(inputs.avg, '#ffffff', 'rgba(255, 255, 255, 0.2)');
    updateTrack(inputs.speed, '#ffffff', 'rgba(255, 255, 255, 0.2)');

    const sliderVal = parseInt(inputs.avg.value);
    const normalized = sliderVal / 100;
    const exponent = (1 - normalized) / normalized;

    for (let i = 0; i < 256; i++) 
    {   brightnessLUT[i] = (Math.pow(i / 255, exponent) * 255); }

    const minSpeed = 500;
    const maxSpeed = (totalPixels / 60) * 2; 
    targetPixelsPerFrame = minSpeed + (parseFloat(inputs.speed.value) * (maxSpeed - minSpeed));
}

function resize() 
{   width = window.innerWidth;
    height = window.innerHeight;
    totalPixels = width * height;
    canvas.width = width;
    canvas.height = height;
    imgData = ctx.createImageData(width, height);
    buffer = new Uint32Array(imgData.data.buffer);
    buffer.fill(0xFF000000);
    updateSettings();
}

function animate() 
{   for (let i = 0; i < targetPixelsPerFrame; i++) 
    {   const index = (Math.random() * totalPixels) | 0;
        
        let r = (brightnessLUT[(Math.random() * 255) | 0] * (rMult / 256)) | 0;
        let g = (brightnessLUT[(Math.random() * 255) | 0] * (gMult / 256)) | 0;
        let b = (brightnessLUT[(Math.random() * 255) | 0] * (bMult / 256)) | 0;

        if (!allowYellow) 
        {   if (Math.random() < 0.5) r = 0;
            else g = 0; }

        buffer[index] = 0xFF000000 | (b << 16) | (g << 8) | r;
    }

    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(animate);
}

updateButtonUI();
resize();
animate();
}

)
();