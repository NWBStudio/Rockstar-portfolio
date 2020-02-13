const parallaxRock = document.querySelector('.parallax-rockfest');
const parallaxRockLayers = parallaxRock.children;

function moveLayersOnScroll(scroll, layers, speed) {
    Array.from(layers).forEach(layer => {
        
        const divider = layer.dataset.speed;
        const strafe = scroll * divider / speed;

        layer.style.transform = `translateY(-${strafe}%)`;
    })
    
}

window.addEventListener('scroll', () => {
    const wScroll = window.pageYOffset;
    moveLayersOnScroll(wScroll, parallaxRockLayers, 20);
})