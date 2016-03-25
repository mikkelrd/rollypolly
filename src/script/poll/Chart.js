export default React.createClass({

  propTypes: {
    data: React.PropTypes.array
  },

  componentWillReceiveProps (newProps) {
    if (this.chart) this.chart.load({
      columns: newProps.data.map(c => [c.text, c.count])
    });
  },

  componentDidMount () {
    this._renderChart(this.props.data);
  },

  _renderChart (chartData) {
    this.chart = c3.generate({
      bindTo: `chart`,
      data: {
        type: 'pie',
        size: {
          height: 300,
          width: 300
        },
        columns: chartData,
      },
      color: {
        pattern: ['#2199e8', '#ffae00', '#ec5840', '#3adb76']
      }
    });
  },

  render () {
    return (
      <div className="chart" id={`chart`}></div>
    )
  }

});
