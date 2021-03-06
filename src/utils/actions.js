import uuid4 from 'uuid4'
export class DrawAction {
  constructor({ path }) {
    this._args = {
      path
    }
    path.name = uuid4()
  }
  exec() {
    if (this.removed) {
      this._args.path.add(...this.removed)
    }
  }
  unexec() {
    this.removed = this._args.path.removeSegments()
  }
}

export class LayerAction {
  constructor({ project, layer, type }) {
    this._args = {
      project,
      layer,
      type
    }
  }
  exec() {
    if (this._args.type === 'add') {
      if (this.removed) {
        return this._args.project.addLayer(this.removed)
      }
    }
    if (this._args.type === 'remove') {
      this._args.layer.remove()
    }
  }
  unexec() {
    if (this._args.type === 'add') {
      this.removed = this._args.layer
      this._args.layer.remove()
    }
    if (this._args.type === 'remove') {
      this._args.project.addLayer(this._args.layer)
    }
  }
}
