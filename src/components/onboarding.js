export class Onboarding {
  constructor(editor, container) {
    this.editor = editor
    this.container = container
    this.targetButton = null
    this.elements = {
      overlay: null,
      spotlight: null,
      tooltip: null,
      arrow: null
    }
  }

  show() {
    if (this.editor && this.editor.canvas && this.editor.canvas.getObjects().length > 0) {
      return
    }

    const toolbox = this.container.querySelector('.mce-toolbox')
    if (!toolbox) return

    this.targetButton = this.findImageButton(toolbox)
    if (!this.targetButton) return

    this.createElements()
    this.attachEventListeners()
  }

  findImageButton(toolbox) {
    const toolboxItems = toolbox.querySelectorAll('.mce-toolbox-item')

    let button = Array.from(toolboxItems).find(item => {
      return item.title === 'Image' || item.getAttribute('aria-label') === 'Image'
    })

    if (!button && toolboxItems.length > 2) {
      button = toolboxItems[2]
    }

    return button
  }

  createElements() {
    const buttonRect = this.targetButton.getBoundingClientRect()

    this.elements.overlay = this.createOverlay(buttonRect)
    this.elements.tooltip = this.createTooltip(buttonRect)
    this.elements.arrow = this.createArrow(buttonRect)

    document.body.appendChild(this.elements.overlay)
    document.body.appendChild(this.elements.tooltip)
    document.body.appendChild(this.elements.arrow)

    this.targetButton.classList.add('onboarding-button-pulse')

    this.buttonClickHandler = () => {
      this.hide()
    }
    this.targetButton.addEventListener('click', this.buttonClickHandler)
  }

  createOverlay(buttonRect) {
    const overlay = document.createElement('div')
    overlay.className = 'onboarding-overlay'

    overlay.addEventListener('click', () => {
      this.hide()
    })

    return overlay
  }

  createTooltip(buttonRect) {
    const tooltip = document.createElement('div')
    tooltip.className = 'onboarding-tooltip'
    tooltip.style.cssText = `
      top: ${buttonRect.top + buttonRect.height / 2}px;
      left: ${buttonRect.right + 20}px;
    `
    tooltip.innerHTML = `
      <div class="onboarding-tooltip-content">
        <div class="onboarding-tooltip-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>Добавьте базовый слой</h3>
        </div>
        <p>Начните с добавления изображения или фона для вашего дизайна</p>
        <div class="onboarding-tooltip-arrow"></div>
      </div>
    `
    return tooltip
  }

  createArrow(buttonRect) {
    const arrow = document.createElement('div')
    arrow.className = 'onboarding-arrow'
    arrow.style.cssText = `
      top: ${buttonRect.top + buttonRect.height / 2 - 12}px;
      left: ${buttonRect.right + 8}px;
    `
    arrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
    return arrow
  }

  attachEventListeners() {
    if (this.editor && this.editor.onChanged) {
      this.changeSubscription = this.editor.onChanged.subscribe(() => {
        setTimeout(() => {
          if (this.editor && this.editor.canvas) {
            const objects = this.editor.canvas.getObjects()
            if (objects.length > 0) {
              this.hide()
            }
          }
        }, 100)
      })
    }
  }

  hide() {
    Object.values(this.elements).forEach(element => {
      if (element) {
        element.classList.add('onboarding-fade-out')
      }
    })

    setTimeout(() => {
      this.cleanup()
    }, 300)
  }

  cleanup() {
    Object.values(this.elements).forEach(element => {
      if (element && element.parentElement) {
        element.remove()
      }
    })

    if (this.targetButton) {
      this.targetButton.classList.remove('onboarding-button-pulse')
      if (this.buttonClickHandler) {
        this.targetButton.removeEventListener('click', this.buttonClickHandler)
      }
    }

    this.elements = {
      overlay: null,
      spotlight: null,
      tooltip: null,
      arrow: null
    }
  }
}
