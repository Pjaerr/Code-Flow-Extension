/** @type {Array} */
const DataPoints = dataPoints;
console.log(DataPoints);

const body = document.getElementsByTagName('body')[0];

class DiagramNode {
  constructor(pos, data) {
    this.pos = pos;
    this.data = data;
  }

  getDOMElement() {
    let div = document.createElement('DIV');
    div.classList += ' Node';

    div.style.left = this.pos.x;
    div.style.top = this.pos.y;

    let title = document.createElement('h3');
    title.innerText = this.data.id;

    let file = document.createElement('h4');
    file.innerText = `${this.data.file}:${this.data.lineNumber}`;

    div.appendChild(title);
    div.appendChild(file);

    return div;
  }
}

let posX = 30;

DataPoints.forEach((point, index) => {
  const node = new DiagramNode({ x: posX, y: 80 }, point);
  const domElement = node.getDOMElement();
  body.appendChild(domElement);

  posX += 30 + 300;
});
