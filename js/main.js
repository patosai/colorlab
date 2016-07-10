var RADIUS = 50;
var ColorBoxes = React.createClass({
  generateColor(num) {
    if (num < 0 || num > 7) {
      return;
    }

    // 8 colors
    var angle = ( (num * 45) + this.props.angleOffset ) * (Math.PI / 180);

    var newL = this.props.L;
    var newA = this.props.A + (RADIUS * Math.cos(angle));
    var newB = this.props.B + (RADIUS * Math.sin(angle));

    return chroma(newL, newA, newB, 'lab').hex();
  },

  render() {
    return (
      <div className="boxes">
        <div className="box box0" style={{backgroundColor: this.generateColor(0)}} />
        <div className="box box1" style={{backgroundColor: this.generateColor(1)}} />
        <div className="box box2" style={{backgroundColor: this.generateColor(2)}} />
        <div className="box box3" style={{backgroundColor: this.generateColor(3)}} />
        <div className="box box4" style={{backgroundColor: this.generateColor(4)}} />
        <div className="box box5" style={{backgroundColor: this.generateColor(5)}} />
        <div className="box box6" style={{backgroundColor: this.generateColor(6)}} />
        <div className="box box7" style={{backgroundColor: this.generateColor(7)}} />
      </div>
    );
  },
});

var Container = React.createClass({
  getInitialState() {
    return {
      angleOffset: 0,
      L: 50,
      A: 0,
      B: 0,
    };
  },

  onAngleOffsetChange(event) {
    this.setState({angleOffset: parseFloat(event.target.value)});
  },

  onLChange(event) {
    this.setState({L: parseFloat(event.target.value)});
  },

  onAChange(event) {
    this.setState({A: parseFloat(event.target.value)});
  },

  onBChange(event) {
    this.setState({B: parseFloat(event.target.value)});
  },

  render() {
    return (
      <div>
        <label htmlFor="angleOffset">Angle Offset</label>
        <input type="number" step="0.01" value={this.state.angleOffset} onChange={this.onAngleOffsetChange}/>
        <input name="angleOffset"
            type="range"
            min="0"
            max="360"
            step="0.01"
            value={this.state.angleOffset}
            onChange={this.onAngleOffsetChange} />

        <label htmlFor="L">L</label>
        <input type="number" step="0.01" value={this.state.L} onChange={this.onLChange}/>
        <input name="L"
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={this.state.L}
            onChange={this.onLChange} />

        <label htmlFor="A">A</label>
        <input type="number" step="0.01" value={this.state.A} onChange={this.onAChange}/>
        <input name="A"
            type="range"
            min="-128"
            max="127"
            step="0.01"
            value={this.state.A}
            onChange={this.onAChange} />

        <label htmlFor="B">B</label>
        <input type="number" step="0.01" value={this.state.B} onChange={this.onBChange}/>
        <input name="B"
            type="range"
            min="-128"
            max="127"
            step="0.01"
            value={this.state.B}
            onChange={this.onBChange} />
        <ColorBoxes angleOffset={this.state.angleOffset} L={this.state.L} A={this.state.A} B={this.state.B}/>
      </div>
    );
  },
});

ReactDOM.render(<Container />, document.getElementById("container"));