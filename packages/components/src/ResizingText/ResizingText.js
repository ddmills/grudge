import { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeDetector from 'react-resize-detector';

export default class ResizingText extends Component {
  static propTypes = {
    relativeSize: PropTypes.number,
  };

  static defaultProps = {
    relativeSize: 10,
  };

  constructor() {
    super();
    this.onResize = this.adjustText.bind(this);
    this.state = {
      width: 10,
    };
  }

  adjustText(width) {
    this.setState({ width });
  }

  render() {
    const size = (this.props.relativeSize / 100) * this.state.width;
    const style = {
      fontSize: `${size}px`,
    };

    return (
      <div style={style}>
        <ResizeDetector handleWidth onResize={this.onResize}/>
        {this.props.children}
      </div>
    );
  }
}
