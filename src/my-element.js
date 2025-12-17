import { LitElement, html } from 'lit'

import { Editor } from 'mini-canvas-editor';
import 'mini-canvas-editor/css/editor.css';


export class MyElement extends LitElement {
  constructor() {
    super()

    this.editor = null
  }
  createRenderRoot() {
    return this
  }

  firstUpdated() {
    const container = this.querySelector('#canvas-editor-container')
    if (container) {
      this.editor = Editor.createBlank(container, 800, 600, {})
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
