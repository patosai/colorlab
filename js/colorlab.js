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
    var propsToCheck = ['angleOffset', 'radius', 'angle', 'L', 'A', 'B'];
    return !(propsToCheck.every((prop) => {
      return this.props[prop] === nextProps[prop];
    }));
  },

  render() {
    var numbers = [];
    for (var i = 0; i <= 7; ++i) {
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

  _onRadiusChange(event) {
    this.setState({radius: parseFloat(event.target.value)});
  },

  _onAngleOffsetChange(event) {
    this.setState({angleOffset: parseFloat(event.target.value)});
  },

  _onLChange(event) {
    this.setState({L: parseFloat(event.target.value)});
  },

  _onAChange(event) {
    this.setState({A: parseFloat(event.target.value)});
  },

  _onBChange(event) {
    this.setState({B: parseFloat(event.target.value)});
  },

  // obj required properties: name, className, min, max, step, value, onChange
  _sliderNode(obj) {
    return (
      <div class='slider'>
        <label htmlFor={obj.className}>{obj.name}</label>
        <input type='number' step={obj.step} value={obj.value} onChange={obj.onChange}/>
        <input name='angleOffset'
            type='range'
            min={obj.min}
            max={obj.max}
            step={obj.step}
            value={obj.value}
            onChange={obj.onChange} />
      </div>
    );
  },

  render() {
    var sliderNodeObjs = [
      {
        name: 'Radius',
        className: 'radius',
        min: 0,
        max: 100,
        step: 0.01,
        value: this.state.radius,
        onChange: this._onRadiusChange
      },
      {
        name: 'Angle Offset',
        className: 'angleOffset',
        min: 0,
        max: 360,
        step: 0.01,
        value: this.state.angleOffset,
        onChange: this._onAngleOffsetChange
      },
      {
        name: 'L',
        className: 'L',
        min: 0,
        max: 100,
        step: 0.01,
        value: this.state.L,
        onChange: this._onLChange
      },
      {
        name: 'A',
        className: 'A',
        min: -128,
        max: 127,
        step: 0.01,
        value: this.state.A,
        onChange: this._onAChange
      },
      {
        name: 'B',
        className: 'B',
        min: -128,
        max: 127,
        step: 0.01,
        value: this.state.B,
        onChange: this._onBChange
      }
    ];
    return (
      <div>
        {sliderNodeObjs.map((obj) => {
          return this._sliderNode(obj);
        })}
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
