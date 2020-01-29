const parallaxBg = document.querySelector('.rockmus-bg')
const parallaxMus = document.querySelector('.parallax-rockmus');
const parallaxMusLayers = parallaxMus.children;

function moveLayersOnMove(scroll, layers, speed) {
    Array.from(layers).forEach(layer => {

        const divider = layer.dataset.speed;
        const strafe = scroll * divider / speed;

        layer.style.transform = `translateX(-${strafe}%)`;
    })
    
}

parallaxBg.addEventListener('mousemove', e => {
    const mMove = e.clientX;
    moveLayersOnMove(mMove, parallaxMusLayers, 30);
})