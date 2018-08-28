import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Heading.scss';

const sizeMapping = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export default class Heading extends Component {
  static propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  }

  static defaultProps = {
    size: 1,
  }

  render() {
    const {
      size,
      className,
      ...passProps
    } = this.props;

    const HeadingComponent = sizeMapping[size];

    console.log('COMP', HeadingComponent);

    const classes = classnames(className, styles.heading, styles[`size-${size}`]);

    return (
      <HeadingComponent className={classes} {...passProps}/>
    );
  }
}
