import { LitElement, html } from 'lit'
import { Editor } from 'mini-canvas-editor';
import 'mini-canvas-editor/css/editor.css';
import { Onboarding } from './components/onboarding.js';

export class MyElement extends LitElement {
  constructor() {
    super()
    this.editor = null
    this.onboarding = null
  }

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    const container = this.querySelector('#canvas-editor-container')
    if (container) {
      this.editor = Editor.createBlank(container, 800, 600, {})

      setTimeout(() => {
        this.onboarding = new Onboarding(this.editor, container)
        this.onboarding.show()
      }, 1000)
    }
  }

  render() {
    return html`
      <div id="canvas-editor-container"></div>
    `
  }

  _onClick() {
    this.count++
  }
}

window.customElements.define('my-element', MyElement)
