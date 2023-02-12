import { ServerRespond } from './DataStreamer';

export interface Row {
  abc_price: number,
  def_price: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC/ priceDEF;
    const UpperBound = 1 + 0.1;
    const LowerBound = 1 - 0.1;
    return {
      abc_price: priceABC,
      def_price: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
          serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: UpperBound,
      lower_bound: LowerBound,
      trigger_alert: (ratio > UpperBound || ratio < LowerBound) ? ratio : undefined,
    };
  }
}
