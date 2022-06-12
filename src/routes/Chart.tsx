import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

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

function Chart() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const result = data?.map(function (value) {
    const x = value.candle_date_time_kst;
    const open = value.opening_price;
    const high = value.high_price;
    const low = value.low_price;
    const close = value.trade_price;

    return {
      x: x,
      y: [open, high, low, close],
    };
  });

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[{ data: result }]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.candle_date_time_kst),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"] },
            },
            colors: ["#0fbcf9"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
