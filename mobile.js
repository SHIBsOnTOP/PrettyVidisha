let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentX = 0;
    this.currentY = 0;
  }

  init(paper) {
    const handleStart = (x, y) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      this.startX = x;
      this.startY = y;
      this.prevX = x;
      this.prevY = y;
    };

    const handleMove = (x, y) => {
      if (!this.holdingPaper) return;

      this.velX = x - this.prevX;
      this.velY = y - this.prevY;

      this.currentX += this.velX;
      this.currentY += this.velY;

      this.prevX = x;
      this.prevY = y;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
    };

    const handleEnd = () => {
      this.holdingPaper = false;
    };

    // Touch Events
    paper.addEventListener('touchstart', (e) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    paper.addEventListener('touchend', handleEnd);

    // Mouse Events
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);

      const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
      const onMouseUp = () => {
        handleEnd();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

