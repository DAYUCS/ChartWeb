export class InvoiceModel {
  constructor(public referenceNumber: string,
              public maturityDate: string,
              public faceValueInUSD: string) {
  }
}
