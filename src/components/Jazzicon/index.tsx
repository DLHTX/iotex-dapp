import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import jazzicon from '@metamask/jazzicon';
import iconFactoryGenerator from './icon-factory';

const iconFactory = iconFactoryGenerator(jazzicon);

/**
 * Wrapper around the jazzicon library to return a React component, as the library returns an
 * HTMLDivElement which needs to be appended.
 */
export default class Jazzicon extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    className: PropTypes.string,
    diameter: PropTypes.number,
    style: PropTypes.object,
    useTokenDetection: PropTypes.bool
  };

  static defaultProps = {
    diameter: 46
  };

  container = createRef();

  componentDidMount() {
    this.appendJazzicon();
  }

  componentDidUpdate(prevProps) {
    const { address: prevAddress, diameter: prevDiameter } = prevProps;
    //@ts-ignore
    const { address, diameter } = this.props;

    if (address !== prevAddress || diameter !== prevDiameter) {
      this.removeExistingChildren();
      this.appendJazzicon();
    }
  }

  removeExistingChildren() {
    //@ts-ignore
    const { children } = this.container.current;

    for (let i = 0; i < children.length; i++) {
      //@ts-ignore
      this.container.current.removeChild(children[i]);
    }
  }

  appendJazzicon() {
    //@ts-ignore
    const { address, diameter, useTokenDetection } = this.props;
    const image = iconFactory.iconForAddress(address, diameter, useTokenDetection, [address]);
    //@ts-ignore
    this.container.current.appendChild(image);
  }

  render() {
    //@ts-ignore
    const { className, style } = this.props;
    //@ts-ignore
    return <div className={className} ref={this.container} style={{ ...style, display: 'flex' }}></div>;
  }
}
