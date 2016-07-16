var ColorBoxes = React.createClass({
  _generateColor(num) {
    if (num < 0 || num > 7) {
      return;
    }

    return this.props.colorGenerator(
      num,
      this.props.L,
      this.props.A,
      this.props.B,
      this.props.radius,
      this.props.angleOffset
    );
  },

  _labToHex(L, A, B) {
    return chroma(L, A, B, 'lab').hex();
  },

  _boxNode(num) {
    var className = 'box box' + num;
    var color = this._generateColor(num);
    var hex = this._labToHex(color.L, color.A, color.B);
    return (
      <div className={className}
        style={{backgroundColor: hex, color: (color.L >= 60) ? "black" : "white"}}>
        {"L: " + color.L}
        <br/>
        {"A: " + color.A}
        <br/>
        {"B: " + color.B}
        <br/>
        {"hex: " + hex}
      </div>
    );
  },

  shouldComponentUpdate(nextProps, nextState) {
    var propsToCheck = ['angleOffset', 'radius', 'L', 'A', 'B'];
    var propsChanged = !(propsToCheck.every((prop) => {
      return this.props[prop] === nextProps[prop];
    }));

    if (propsChanged) return true;

    return false;
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
      <div className="colorlab">
        {sliderNodeObjs.map((obj) => {
          return this._sliderNode(obj);
        })}
        <ColorBoxes
            radius={this.state.radius}
            angleOffset={this.state.angleOffset}
            L={this.state.L}
            A={this.state.A}
            B={this.state.B}
            colorGenerator={this.props.colorGenerator}/>
      </div>
    );
  },
});

ReactDOM.render(
  <ColorLab colorGenerator={(num, L, A, B, radius, angleOffset) => {
      // 8 colors
      var angle = ( (num * 45) + angleOffset ) * (Math.PI / 180);

      var newL = L;
      var newA = A + (radius * Math.cos(angle));
      var newB = B + (radius * Math.sin(angle));

      return {
        L: newL,
        A: newA,
        B: newB,
      };
    }}/>,
  document.getElementById('container-left')
);

ReactDOM.render(
  <ColorLab colorGenerator={(num, L, A, B, radius, angleOffset) => {
      // 8 colors
      var newL = (num == 0 ? 10 :
                  (num == 1 ? 18 :
                  (num == 2 ? 42 :
                  (num == 3 ? 50 :
                  (num == 4 ? 58 :
                  (num == 5 ? 66 :
                  (num == 6 ? 90 :
                  (num == 7 ? 98 : 0))))))));
      var newA = A;
      var newB = B;

      return {
        L: newL,
        A: newA,
        B: newB,
      };
    }}/>,
  document.getElementById('container-right')
);
