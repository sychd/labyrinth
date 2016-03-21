class ControlPanel {
  //n2rf
  constructor(options){
    this._el = options.element;
    this._field = options.field;

    this.genBtn = document.getElementById('genBtn');
    this.genBtn.addEventListener('click',this._genBtnClick);

    this.findBtn = document.getElementById('findBtn');
    this.findBtn.addEventListener('click',this._findBtnClick);

  }

  _genBtnClick(){
    new Page({
      element: document.querySelector('[data-component="page"]')
    });
  }
  _findBtnClick(){
    for (let i = 0; i < way.length; i++) {
      way[i].divElem.style.backgroundColor = 'darkred';
    }

    finish.divElem.style.backgroundColor = 'red';
  }

}
