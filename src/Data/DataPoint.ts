class DataPoint {
  lineNumber: string;
  name: string;
  detail: string;
  file: string;
  orderId: number;

  constructor(lineNumber: string, name: string, detail: string, file: string, orderId: number) {
    this.lineNumber = lineNumber;
    this.name = name;
    this.detail = detail;
    this.file = file;
    this.orderId = orderId;
  }
}

export default DataPoint;
