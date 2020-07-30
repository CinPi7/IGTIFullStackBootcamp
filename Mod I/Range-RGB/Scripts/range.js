let redValue, greenValue, blueValue = 0;

window.addEventListener('load', () => {

    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    activateInputs();
});

const activateInputs = () => {
    
    document.querySelector('#red').addEventListener('input', updateColor);
    document.querySelector('#green').addEventListener('input', updateColor);
    document.querySelector('#blue').addEventListener('input', updateColor);
};

const updateColor = (e) => {

    if (e.target.id === 'red'){
        redValue = e.target.value;
        document.querySelector('#number-red').value = redValue;
    } else if (e.target.id === 'green'){
        greenValue = e.target.value;
        document.querySelector('#number-green').value = greenValue;
    } else if (e.target.id === 'blue'){
        blueValue = e.target.value;
        document.querySelector('#number-blue').value = blueValue;
    }
    applyColor(redValue, greenValue, blueValue);
};

const applyColor = (red, green, blue) => {

    let colorPreview = document.querySelector('.color-block');
    colorPreview.style.backgroundColor = `rgb(${red},${green},${blue})`;

    /* hexadecimal */
    let hexaCode = document.querySelector('.hexaCode');
    hexaCode.innerHTML = `# ${handleHex(red)} ${handleHex(green)} ${handleHex(blue)}`;

    let redLight = relativeLuminance(parseInt(red, 10));
    let greenLight = relativeLuminance(parseInt(green, 10));
    let blueLight = relativeLuminance(parseInt(blue, 10));
    hexaCode.style.color = 0.2126 * redLight + 0.7152 * greenLight + 0.0722 * blueLight > 0.179
      ? '#000'
      : '#FFF';
};

/* Converting to RGB to Hexadecimal */
const handleHex = (value) => {
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    let hex = parseInt(value, 10).toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
};

const relativeLuminance = (color) => {

    color /= 255;
    return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
};

