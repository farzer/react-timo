/**
 * @Author: farzer
 * @Date:   2017-08-17 16:48:18
 * @Last modified by:   farzer
 * @Last modified time: 2017-08-17 16:48:34
 */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import _isNil from 'lodash/isNil';
import _map from 'lodash/map';

import BreadcrumbItem from './Item';

function defaultItemRender(route) {
  if (_isNil(route.breadcrumbName)) {
    return null;
  }
  return route.breadcrumbName;
}

/**
 * 面包屑组件
 * @type {Component}
 * routes React Router routes属性
 * params React Router params属性
 * itemRender 面包屑项渲染函数
 * separator  面包屑分隔符号
 */
class Breadcrumb extends Component {
  static propTypes = {
    /**
     * 根据路由进行配置,包含breadcrumbName显示
     */
    routes: PropTypes.array,
    /**
     * 路由参数
     */
    params: PropTypes.object,
    /**
     * Breadcrumb Item 自定渲染函数
     */
    itemRender: PropTypes.func,
    /**
     * 分隔符
     */
    separator: PropTypes.any,
    /**
     * 为Breadcrumb.Item
     */
    children: PropTypes.any,
    /**
     * 是否需要下横线
     */
    border: PropTypes.bool
  }

  static defaultProps = {
    routes: [],
    params:  {},
    separator: '/',
    itemRender: defaultItemRender,
    border: false
  }
  constructor(props) {
    super(props);
    this.renderItems = ::this.renderItems;
  }

  renderItems() {
    const {routes, itemRender, separator, params, children} = this.props;
    // 通过react-router进行渲染
    if(routes && routes.length > 0) {
      return _map(routes, (route, index) => {
        const isLastItem = index === routes.length - 1;
        const restProps = {};
        if(!isLastItem) restProps.href = route.path;
        return (
          <BreadcrumbItem separator={separator} key={`${route.path}index`} {...restProps}>
            {itemRender(route, params, routes)}
          </BreadcrumbItem>
        );
      });
    } else if(children) {  // 通过children items进行渲染
      // use React.Children.map function
      return React.Children.map(children, (element, index) => { // eslint-disable-line
        if (!element) {
          return element;
        }

        return cloneElement(element, {
          separator,
          key: index
        });
      });
    }
  }

  render() {
    const style = {};
    if(!this.props.border) {
      style.border = 'none';
    }
    return (
      <ol className="breadcrumb nf-breadcrumb" style={style}>
        {this.renderItems()}
      </ol>
    );
  }

}

export default Breadcrumb;