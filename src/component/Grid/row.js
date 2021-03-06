/**
 * @Author: farzer
 * @Date:   2017-08-17 16:40:45
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 18:24:20
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Row extends Component {
  static propTypes = {
    /**
     * 额外的类名
     */
    className: PropTypes.string,
    /**
     * 行内样式
     */
    style: PropTypes.object,
    /**
     * 子组件
     */
    children: PropTypes.any
  }
  static defaultProps = {
    className: '',
    style: {}
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      style,
      children,
      ...rest
    } = this.props;
    const cls = cx('row', className);
    return (
      <div className={cls} style={style} {...rest}>
        {children}
      </div>
    );
  }
}

export default Row;