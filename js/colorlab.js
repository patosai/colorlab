var ColorBoxes = React.createClass({
  _generateColor(num) {
    if (num < 0 || num > 7) {
      return;
    }

    // 8 colors
    var angle = ( (num * 45) + this.props.angleOffset ) * (Math.PI / 180);

    var newL = this.props.L;
    var newA = this.props.A + (this.props.radius * Math.cos(angle));
    var newB = this.props.B + (this.props.radius * Math.sin(angle));

    return chroma(newL, newA, newB, 'lab').hex();
  },

  _boxNode(num) {
    var className = 'box box' + num;
    return (
      <div className={className} style={{backgroundColor: this._generateColor(num)}} />
    );
  },

  shouldComponentUpdate(nextProps, nextState) {
    var propsToCheck = ['radius', 'angle', 'L', 'A', 'B'];
    return !(propsToCheck.every((prop) => {
      return this.props[prop] === nextProps[prop];
    }));
  },

  render() {
    var numbers = [];
    for (var i = 1; i <= 8; ++i) {
      numbers.push(i);
    }

    return (
      <div className='boxes'>
        {numbers.map((val) => {
          return this._boxNode(val);
        })}
      </div>
    );
  },
});

var ColorLab = React.createClass({
  getInitialState() {
    return {
      radius: 50,
      angleOffset: 0,
      L: 50,
      A: 0,
      B: 0,
    };
  },

  onRadiusChange(event) {
    this.setState({radius: parseFloat(event.target.value)});
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

  sliderNode(name, className, min, max, step, value, onChange) {
    return (
      <div class='slider'>
        <label htmlFor={className}>{name}</label>
        <input type='number' step={step} value={value} onChange={onChange}/>
        <input name='angleOffset'
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange} />
      </div>
    );
  },

  render() {
    return (
      <div>
        { this.sliderNode('Radius', 'radius', 0, 100, 0.01, this.state.radius, this.onRadiusChange) }
        { this.sliderNode('Angle Offset', 'angleOffset', 0, 360, 0.01, this.state.angleOffset, this.onAngleOffsetChange) }
        { this.sliderNode('L', 'L', 0, 100, 0.01, this.state.L, this.onLChange) }
        { this.sliderNode('A', 'A', -128, 128, 0.01, this.state.A, this.onAChange) }
        { this.sliderNode('B', 'B', -128, 128, 0.01, this.state.B, this.onBChange) }
        <ColorBoxes
            radius={this.state.radius}
            angleOffset={this.state.angleOffset}
            L={this.state.L}
            A={this.state.A}
            B={this.state.B}/>
      </div>
    );
  },
});

ReactDOM.render(<ColorLab />, document.getElementById('container-left'));
