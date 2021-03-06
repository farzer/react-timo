import './_transfer.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectTable from './SelectTable';
import Flex from '../Flex';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';

import { defaultRenderItem } from './util';

/**
 * Transfer Component
 */
class Transfer extends Component {
  static propTypes = {
    /**
     * transfer height
     */
    height: PropTypes.number,
    /**
     * title
     */
    title: PropTypes.array,
    /**
     * source object data
     */
    sourceData: PropTypes.array.isRequired,
    /**
     * target object data
     */
    targetData: PropTypes.array.isRequired,
    /**
     * transfer change callback
     */
    onChange: PropTypes.func.isRequired,
    /**
     * render the custom item
     */
    render: PropTypes.func
  }
  static defaultProps = {
    height: 300,
    title: [
      '源数据', '已选项'
    ],
    render: defaultRenderItem
  }
  constructor(props) {
    super(props);
    this.handleAllToTarget = ::this.handleAllToTarget;
    this.handleToTarget = ::this.handleToTarget;
    this.handleAllToSource = ::this.handleAllToSource;
    this.handleToSource = ::this.handleToSource;
  }
  handleToTarget(item) {
    const {sourceData, targetData, onChange} = this.props;
    const newSourceData = [...sourceData];
    const newTargetData = uniqBy([
      ...targetData,
      item
    ], '_transfer_id');
    remove(newSourceData, {_transfer_id: item._transfer_id});
    onChange(newSourceData, newTargetData);
  }
  handleToSource(item) {
    const {sourceData, targetData, onChange} = this.props;
    const newTargetData = [...targetData];
    const newSourceData = uniqBy([
      ...sourceData,
      item
    ], '_transfer_id');
    remove(newTargetData, {_transfer_id: item._transfer_id});
    onChange(newSourceData, newTargetData);
  }
  handleAllToTarget() {
    const {sourceData, targetData, onChange} = this.props;
    const newSourceData = [];
    const newTargetData = uniqBy([
      ...targetData,
      ...sourceData
    ], '_transfer_id');
    onChange(newSourceData, newTargetData);
  }
  handleAllToSource() {
    const {sourceData, targetData, onChange} = this.props;
    const newTargetData = [];
    const newSourceData = uniqBy([
      ...sourceData,
      ...targetData
    ], '_transfer_id');
    onChange(newSourceData, newTargetData);
  }
  render() {
    const {sourceData, targetData, height, title, render} = this.props;
    return (
      <Flex className="nf-transfer" width="100%">
        <Flex flex={1} className="nf-transfer-item-box">
          <Flex column width="100%">
            <Flex className="p-2">
              <Flex justifyBetween alignCenter flex={1}>
                <Flex className="nf-transfer-item-title">{title[0]}</Flex>
                <Flex>一共<span className="text-primary">{sourceData.length}</span>项</Flex>
              </Flex>
            </Flex>
            <Flex className="nf-transfer-button">
              <button
                className="btn btn-block btn-primary nf-transfer-button-corner waves-effect"
                onClick={this.handleAllToTarget}
              >
                <i className="zmdi zmdi-arrow-forward" />
              </button>
            </Flex>
            <SelectTable
              data={sourceData}
              height={height}
              render={render}
              onClickItem={this.handleToTarget}
              animated="fadeInRight"
            />
          </Flex>
        </Flex>
        <Flex width="10px" />
        <Flex flex={1} className="nf-transfer-item-box">
          <Flex column width="100%">
            <Flex className="p-2">
              <Flex justifyBetween alignCenter flex={1}>
                <Flex className="nf-transfer-item-title">{title[1]}</Flex>
                <Flex>一共<span className="text-primary">{targetData.length}</span>项</Flex>
              </Flex>
            </Flex>
            <Flex className="nf-transfer-button">
              <button
                className="btn btn-block btn-primary nf-transfer-button-corner waves-effect"
                onClick={this.handleAllToSource}
              >
                <i className="zmdi zmdi-arrow-back" />
              </button>
            </Flex>
            <SelectTable
              data={targetData}
              height={height}
              render={render}
              onClickItem={this.handleToSource}
              animated="fadeInLeft"
            />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Transfer;
