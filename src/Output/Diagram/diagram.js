/** @type {Array} */
const DataPoints = dataPoints;
console.log(DataPoints);

const body = document.getElementsByTagName('body')[0];

const container = document.createElement('div');
container.classList += ' Container';

body.append(container);

let lines = [];
let diagramNodes = [];

class DiagramNode {
  constructor(pos, data, width = 120, height = 60) {
    this.pos = pos;

    this.width = width;
    this.height = height;

    this.data = data;

    this.id = this.data.id;

    this.entry = { x: this.pos.x, y: this.pos.y + this.height * 0.5 };

    this.exit = { x: this.pos.x + this.width, y: this.pos.y + this.height * 0.5 };
  }

  makeConnections() {
    const linkedDataPoints = diagramNodes.filter(domElement => {
      return this.data.linkedDataPoints.includes(domElement.id);
    });

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('width', '1024');
    svg.setAttribute('height', '960');
    svg.style.position = 'absolute';

    linkedDataPoints.forEach(linkedPoint => {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      // line.style.position = 'fixed';

      line.setAttribute('id', this.id + '-' + linkedPoint.id);

      line.setAttribute('x1', this.exit.x);
      line.setAttribute('y1', this.exit.y);

      line.setAttribute('x2', linkedPoint.entry.x);
      line.setAttribute('y2', linkedPoint.entry.y);

      line.setAttribute('stroke', 'red');

      svg.append(line);
    });

    lines.push(svg);
    container.appendChild(svg);
  }

  //TODO: get the dom element internally and then getDomElement() should return it
  // -> Then we can use the width and height of the actual element to calculate the
  // entry and exit points.

  getDOMElement() {
    let div = document.createElement('DIV');
    div.classList += ' Node';

    div.style.left = this.pos.x;
    div.style.top = this.pos.y;
    div.style.width = this.width;
    div.style.height = this.height;

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

  diagramNodes.push(node);

  container.appendChild(domElement);

  posX += 30 + 300;
});

diagramNodes.forEach(element => element.makeConnections());

// window.onresize = () => {
//   lines.forEach(line => line.remove());
//   diagramNodes.forEach(element => element.makeConnections());
// };
