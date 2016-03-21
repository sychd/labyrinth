class ControlPanel {
  constructor(options){
    this._el = options.element;
    this._field = options.field;

    this.genBtn = document.getElementById('genBtn');
    this.genBtn.addEventListener('click',this._genBtnClick);

  }

  _genBtnClick(){
    new Page({
      element: document.querySelector('[data-component="page"]')
    });
  }
  //rewrite

}
