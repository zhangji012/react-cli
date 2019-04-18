/** 主页 **/

/** 所需的各种插件 **/
import React, { Component } from "react";
import { Form, Radio, Row, Col, Table, Button } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleTimeChange = e => {
    // 日或月时间控件数值变化取消快速查询
    console.log("00000");
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("111", values);
        this.props.form.resetFields("radio-group2");
      }
    });
  };
  handleTimeChange2 = () => {
    // 日或月时间控件数值变化取消快速查询
    this.props.form.setFieldsValue({
      quickSearch: 0
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div>
        <FormItem>
          {getFieldDecorator("radio-group1", {
            initialValue: ""
          })(
            <RadioGroup onChange={this.handleTimeChange}>
              <Radio value="a">item 1</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("radio-group2", {
            initialValue: ""
          })(
            <RadioGroup>
              <Radio value="b">item 2</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </div>
    );
  }
}

export default Form.create()(Sort);
