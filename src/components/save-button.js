export class SaveButton {
  constructor(editor) {
    this.editor = editor
    this.button = null
  }

  create(container) {
    const toolbox = container.querySelector('.mce-toolbox')
    if (!toolbox) return

    this.button = document.createElement('button')
    this.button.className = 'mce-toolbox-item save-button'
    this.button.title = 'Сохранить'
    this.button.innerHTML = `
      <div class="mce-toolbox-item-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `

    this.button.addEventListener('click', () => {
      this.handleClick()
    })

    toolbox.appendChild(this.button)
  }

  async handleClick() {
    if (!this.editor) return

    try {
      const canvas = this.editor.render()

      const dataURL = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.download = `ПРИВЕТ_ИЗ_НАШЕГО_РЕДАКТОРА_ФОТОГРАФИЙ_${Date.now()}.png`
      link.href = dataURL
      link.click()
    } catch (error) {
      console.error('Error saving image:', error)
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
