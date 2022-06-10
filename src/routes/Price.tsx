import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  market: string;
  candle_date_time_utc: Date;
  candle_date_time_kst: Date;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

function Price() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading
        ? "Loading Price..."
        : `Todays Max Value is ${data[0]?.high_price}원`}
    </div>
  );
}

export default Price;
