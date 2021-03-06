import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelContent from './PanelContent';
import Animate from 'rc-animate';
import _noop from 'lodash/noop';
import Icon from '../Icon';

class CollapsePanel extends Component {
  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    id: PropTypes.string,
    children: PropTypes.any,
    openAnimation: PropTypes.object,
    prefixCls: PropTypes.string,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node
    ]),
    headerClass: PropTypes.string,
    showArrow: PropTypes.bool,
    isActive: PropTypes.bool,
    onItemClick: PropTypes.func,
    style: PropTypes.object,
    destroyInactivePanel: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    showArrow: false,
    isActive: false,
    destroyInactivePanel: false,
    onItemClick: _noop,
    headerClass: ''
  }

  handleItemClick() {
    if (this.props.onItemClick) {
      this.props.onItemClick();
    }
  }

  render() {
    const {
      className,
      id,
      style,
      prefixCls,
      header,
      headerClass,
      children,
      isActive,
      showArrow,
      destroyInactivePanel,
      disabled
    } = this.props;
    const headerCls = classNames(`${prefixCls}-header`, {
      [headerClass]: headerClass
    });
    const itemCls = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive,
      [`${prefixCls}-item-disabled`]: disabled
    }, className);
    return (
      <div className={itemCls} style={style} id={id}>
        <div
          className={headerCls}
          onClick={this.handleItemClick.bind(this)}
          role="tab"
          aria-expanded={isActive}
        >
          {showArrow && <Icon type="chevron-down" className="zmdi-hc-fw"/>}
          {header}
        </div>
        <Animate
          showProp="isActive"
          exclusive
          component=""
          animation={this.props.openAnimation}
        >
          <PanelContent
            prefixCls={prefixCls}
            isActive={isActive}
            destroyInactivePanel={destroyInactivePanel}
          >
            {children}
          </PanelContent>
        </Animate>
      </div>
    );
  }
}

export default CollapsePanel;