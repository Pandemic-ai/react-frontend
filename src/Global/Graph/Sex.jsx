import React, { Component } from "react";
import Chart from "react-apexcharts";

const colors = ["#783bff", "#6ac75a"];
export class Sex extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      options: {
        chart: {
          type: "donut"
        },
        labels: ["Male", "Female"],
        dataLabels: {
          enabled: false
        },
        colors: colors,
        title: {
          text: "Fatality Rate by Sex",
          align: "left",
          style: {
            fontSize: "17px",
            color: "white"
          }
        },
        tooltip: {
          theme: "dark"
        },

        legend: {
          position: "top",
          labels: {
            colors: "white",
            useSeriesColors: false
          },
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
          }
        }
      },
      series: []
    };
  }

  render() {
    const fun = this.props.state;

    const dat1 = fun.map(c => {
      return parseFloat(c.rate.split("%"));
    });

    return (
      <div>
        <Chart
          style={{ marginTop: "22px" }}
          options={this.state.options}
          series={dat1}
          type="donut"
          stacked="true"
          height="250"
        />
      </div>
    );
  }
}

export default Sex;
