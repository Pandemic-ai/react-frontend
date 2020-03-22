import React, { Component } from "react";
import Chart from "react-apexcharts";

const colors = ["#730202", "#F57C01", "#FF8C37", "#13B760", "#13B760"];
export class Age extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      options: {
        chart: {
          id: "Fuel Economy"
        },
        dataLabels: {
          enabled: false
        },
        colors: colors,
        xaxis: {
          type: "category",
          title: {
            text: "Fatality Rate by Age",
            style: {
              fontSize: "10px",
              color: "white"
            }
          },
          labels: {
            style: {
              fontSize: "13px",
              opacity: "0.2",
              color: "white"
            }
          },
          categories: []
        },

        tooltip: {
          theme: "dark"
        },
        plotOptions: {
          bar: {
            columnWidth: "70%",
            // endingShape: "rounded",
            distributed: true
          }
        },
        legend: {
          // position: "right",
          verticalAlign: "top",
          labels: {
            colors: "white",
            useSeriesColors: false
          },
          containerMargin: {
            left: 35,
            right: 60
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            title: {
              text: "Percentage",
              style: {
                fontSize: "10px",
                color: "#8D8D90"
              }
            },
            labels: {
              formatter: function(value) {
                return value + " % ";
              },
              style: {
                fontSize: "10px",
                opacity: "0.2",
                color: "#8D8D90"
              }
            },
            axisBorder: {
              show: true
            }
          }
        ],
        title: {
          text: "Fatality Rate by Age",
          align: "left",
          style: {
            fontSize: "20px",
            color: "white"
          }
        },
        labels: [
          "80+",
          "70-79",
          "70-79",
          "50-59",
          "40-49",
          "30-39",
          "20-29",
          "10-19",
          "0-9"
        ]
      },
      series: [
        {
          name: "Fatality Rate by Age",
          data: []
        }
      ]
    };
  }

  render() {
    const fun = this.props.state;

    const dat1 = fun.map(c => {
      return parseFloat(c.rate.split("%"));
    });
    const newSeries = [];
    newSeries.push({
      data: dat1,
      name: "Fatality Rate by Age"
    });
    return (
      <div>
        <Chart
          style={{ marginTop: "22px" }}
          options={this.state.options}
          series={newSeries}
          type="bar"
          height="250"
        />
      </div>
    );
  }
}

export default Age;
