import React, { useState, memo } from "react";
import { Select, Button, Divider, Modal, Form, Checkbox, message } from "antd";
const { Option } = Select;
interface optionT {
  key: string;
  label: string;
}
const SelectAll = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();
  const { setFieldsValue, validateFields } = form;
  const children: optionT[] = [];
  for (let i = 10; i < 36; i++) {
    const value = {
      key: i.toString(36) + i,
      label: i.toString(36) + i,
    };
    children.push(value);
  }
  /**
   * @description: Modal确认，表单提交与验证
   */
  const handleOk = async () => {
    try {
      // 4.x与3.X版本不一样，validateFields被封装成立Promise
      const values = await validateFields();
      // if (values.selectAll.length === 26) throw new Error("请不要全选");
      message.info(`这里是表单所有数据：${JSON.stringify(values)}`, 3);
      form.resetFields();
    } catch (info) {
      console.log("Validate Failed:", info);
    }
  };
  /**
   * @description: CheckBox全选与反选
   */
  const handleCheckBox = (e) => {
    if (e.target.checked === true) {
      setFieldsValue({
        selectAll: children,
      });
    } else {
      setFieldsValue({
        selectAll: [],
      });
    }
  };

  return (
    <>
      {/* <Divider style={{ marginBottom: "10px" }}></Divider> */}
      <Button onClick={() => setFormVisible(true)}> 表单弹出</Button>
      <Modal
        visible={formVisible}
        title={"全选"}
        onCancel={() => setFormVisible(false)}
        onOk={() => handleOk()}
      >
        <Form name="selectAll" form={form}>
          <Form.Item
            label="selectAll"
            // 给出当前表单值，会影响提交表单的key
            name="selectAll"
            rules={[{ required: true, message: "Choose what you like" }]}
          >
            <Select
              mode="multiple"
              labelInValue={true}
              placeholder="Please select"
              style={{ width: "80%" }}
              dropdownRender={(menu) => {
                return (
                  <div>
                    <div
                      style={{ padding: "4px 8px 8px 8px", cursor: "pointer" }}
                      // 阻止事件冒泡
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Checkbox
                        onChange={(e) => {
                          handleCheckBox(e);
                        }}
                      >
                        全选
                      </Checkbox>
                    </div>
                    <Divider style={{ margin: "2px 0" }} />
                    {menu}
                  </div>
                );
              }}
            >
              {children.map((item) => {
                return (
                  <Option value={item.label} key={item.key}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(SelectAll);
