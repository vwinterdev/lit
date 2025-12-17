import { MceImage } from 'mini-canvas-core'
import confetti from 'canvas-confetti'

export class AddImageButton {
  constructor(editor, onImageAdded) {
    this.editor = editor
    this.onImageAdded = onImageAdded
    this.button = null

    this.svgAssets = [
      'Deer.svg',
      'Hat 1.svg',
      'Hat 2.svg',
      'Hat 3.svg',
      'Hat 4.svg',
      'Hat 5.svg',
      'Lights 1.svg',
      'Lights 2.svg',
      'Lights 3.svg',
      'Lights 4.svg',
      'Snowman.svg',
      'Snowman 1.svg',
      'Snowman 2.svg',
      'Snowman 3.svg'
    ]
  }

  create() {
    this.button = document.createElement('button')
    this.button.className = 'add-image-button'
    this.button.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 9 5 9 8C9 8 7 8 7 10C7 12 9 12 9 12V14C9 14 7 14 7 16C7 18 9 18 9 18V20C9 21.1 9.9 22 11 22H13C14.1 22 15 21.1 15 20V18C15 18 17 18 17 16C17 14 15 14 15 14V12C15 12 17 12 17 10C17 8 15 8 15 8C15 5 12 2 12 2Z" fill="currentColor"/>
        <circle cx="10" cy="10" r="0.5" fill="#000"/>
        <circle cx="14" cy="10" r="0.5" fill="#000"/>
        <path d="M10 13C10 13 11 14 12 14C13 14 14 13 14 13" stroke="#000" stroke-width="0.5" stroke-linecap="round"/>
        <path d="M12 2L12 3L11 3.5L12 4L13 3.5L12 3Z" fill="currentColor"/>
      </svg>
    `

    this.button.addEventListener('click', () => {
      this.handleClick()
    })

    document.body.appendChild(this.button)
  }

  getRandomSvg() {
    const randomIndex = Math.floor(Math.random() * this.svgAssets.length)
    return `/assets/decorations/${this.svgAssets[randomIndex]}`
  }

  getRandomPosition() {
    const canvas = this.editor.state.canvas
    const margin = 100

    const x = margin + Math.random() * (canvas.workspaceWidth - margin * 2)
    const y = margin + Math.random() * (canvas.workspaceHeight - margin * 2)

    return { x, y }
  }

  fireConfetti() {
    const duration = 2000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#4fd1c5', '#38bdf8', '#f472b6', '#fbbf24', '#a78bfa']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#4fd1c5', '#38bdf8', '#f472b6', '#fbbf24', '#a78bfa']
      })
    }, 250)
  }

  async handleClick() {
    if (!this.editor) return

    const svgPath = this.getRandomSvg()
    const position = this.getRandomPosition()

    try {
      const img = new Image()
      img.onload = () => {
        const image = new MceImage(img, {
          left: position.x,
          top: position.y
        })

        this.editor.add(image)

        this.fireConfetti()

        if (this.onImageAdded) {
          this.onImageAdded()
        }
      }
      img.src = svgPath
    } catch (error) {
      console.error('Error adding image:', error)
    }
  }

  show() {
    if (this.button) {
      this.button.style.display = 'flex'
    }
  }

  hide() {
    if (this.button) {
      this.button.style.display = 'none'
    }
  }

  remove() {
    if (this.button && this.button.parentElement) {
      this.button.remove()
      this.button = null
    }
  }
}
