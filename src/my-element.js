import { LitElement, html } from 'lit'
import { Editor } from 'mini-canvas-editor';
import 'mini-canvas-editor/css/editor.css';
import { Onboarding } from './components/onboarding.js';
import { AddImageButton } from './components/add-image-button.js';
import { unsafeCSS } from "lit";
import globalStyles from "./index.css?inline";

export class MyElement extends LitElement {
  constructor() {
    super()
    this.editor = null
    this.onboarding = null
    this.addImageButton = null
  }

  static styles = [unsafeCSS(globalStyles)];

  createRenderRoot() {
    return this
  }

  firstUpdated() {
    const container = this.querySelector('#canvas-editor-container')
    if (container) {
      this.editor = Editor.createBlank(container, 800, 800, {})

      this.addImageButton = new AddImageButton(this.editor, () => {
        if (this.onboarding) {
          this.onboarding.hide()
        }
      })
      this.addImageButton.create()

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
