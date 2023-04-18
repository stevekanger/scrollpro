"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStyles = void 0;
function setStyles(orientation, track, thumb) {
    track.classList.add('track');
    track.style.position = 'relative';
    track.style.display = 'block';
    track.style.width = '100%';
    track.style.height = '100%';
    track.style.overflow = 'hidden';
    thumb.classList.add('bar');
    thumb.style.display = 'block';
    thumb.style.width = '100%';
    thumb.style.height = '100%';
    thumb.style.position = 'absolute';
    thumb.style.right = orientation === 'vertical' ? '0' : '100%';
    thumb.style.bottom = orientation === 'vertical' ? '100%' : '0';
    thumb.style.pointerEvents = 'none';
}
exports.setStyles = setStyles;
