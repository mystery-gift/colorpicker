document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('imageCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('imageCanvas').addEventListener('click', function(event) {
    const canvas = event.target;
    const ctx = canvas.getContext('2d');
    const x = event.offsetX;
    const y = event.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    document.getElementById('colorInfo').textContent = `Hex: ${hexColor}`;
    document.getElementById('colorDisplay').style.backgroundColor = hexColor;
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
