window.onresize = function (event) {
    var maxHeight = window.screen.height,
        maxWidth = window.screen.width,
        curHeight = window.innerHeight,
        curWidth = window.innerWidth;

    if (maxWidth == curWidth && maxHeight == curHeight) {
        $('.navbar').hide();
    } else {
        $('.navbar').show();
    }
}
