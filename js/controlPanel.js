class ControlPanel {
  //n2rf
  constructor(options){
    this._el = options.element;
    this._field = options.field;

    this.genBtn = document.getElementById('genBtn');
    this.genBtn.addEventListener('click',this.genBtnClick);

    this.findBtn = document.getElementById('findBtn');
    this.findBtn.addEventListener('click',this.findBtnClick);
  }

  genBtnClick(){
    new Page({
      element: document.querySelector('[data-component="page"]')
    });

  }


  findBtnClick(e){
    let c = -1;

    e.target.disabled = true;
    document.getElementById('genBtn').disabled = true;

    let move = setInterval(function(){
      if(++c !== way.length) {
        way[c].divElem.style.backgroundColor = 'darkred';
      } else {
        clearInterval(move);
        e.target.disabled = false;
        document.getElementById('genBtn').disabled = false;
        finish.divElem.style.backgroundColor = 'red';
      }
    },1);
    //or, for instantrender
    //for (let i = 0; i < way.length; i++) {
    //  way[i].divElem.style.backgroundColor = 'darkred';
    //}
    //finish.divElem.style.backgroundColor = 'red';
  }

}
