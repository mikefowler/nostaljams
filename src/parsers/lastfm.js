import Chart from '../models/Chart';
import ChartMap from '../models/ChartMap';

export function parseChart(response) {
  return new Chart({
    id: parseInt(response.from, 10) * 1000,
    start: parseInt(response.from, 10) * 1000,
    end: parseInt(response.to, 10) * 1000,
  });
}

export function parseCharts(response) {
  const { chart: charts } = response;

  if (!charts) return new ChartMap();

  return new ChartMap(charts.map((chart) => {
    const chartRecord = parseChart(chart);
    return [chartRecord.id, chartRecord];
  }));
}
