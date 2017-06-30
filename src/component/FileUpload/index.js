import React, {Component, PropTypes} from 'react';

class FileUpload extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    btnValue: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    filter: PropTypes.oneOfType([
      PropTypes.oneOf([false]),
      PropTypes.func
    ])
  }
  static defaultProps = {
    btnValue: '上传图片',
    className: 'btn btn-primary',
    multiple: true,
    filter: false
  }
  constructor(props) {
    super(props);
    this.handleChange = ::this.handleChange;
  }
  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    let files = target.files;
    const count = this.props.multiple ? files.length : 1;
    for (let i = 0; i < count; i++) {
      files[i].thumb = window.URL.createObjectURL(files[i]);
    }
    // 将对象转化成数组
    files = Array.prototype.slice.call(files, 0);
    // 文件类型过滤
    if(this.props.filter) {
      files = this.props.filter(files);
      // filter 举例
      // (files) => {
      //   return _.filter(files, file => /image/i.test(file.type));
      // }
    }
    this.props.onChange(files, event);
  }
  render() {
    const { className, multiple, btnValue } = this.props;
    return (
      <label className={className}>
        <input
          type="file"
          multiple={multiple}
          ref="fileInput"
          className="hide"
          onChange={this.handleChange}
        />
        { btnValue }
      </label>
    );
  }
}

export default FileUpload;
