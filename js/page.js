"use strict";

class Page {
  constructor(options) {
    this._el = options.element;

    this._field = new Field({
      element: this._el.querySelector('[data-component="field"]'),
      height: FIELD_HEIGHT,
      width: FIELD_WIDTH
    });

    this._controlPanel - new ControlPanel({

    });
  }
}