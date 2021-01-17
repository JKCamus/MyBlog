import React, { useState, memo } from "react";
import { Select, Button, Divider, Modal, Form, Checkbox, message } from "antd";
const { Option } = Select;
interface optionT {
  key: string;
  label: string;
}
// FormComponentProps
const SelectAll = (props) => {
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
  const handleOk = async () => {
    try {
      const values = await validateFields();
      // if(values.selectAll.length===26)throw new Error('taicahngle')
      message.info(`这里是表单所有数据：${JSON.stringify(values)}`, 3);
      form.resetFields();
      console.log("ssss", values);
    } catch (info) {
      console.log("Validate Failed:", info);
    }
    /* selectAll可以定为最后提交数据的那个字段需做处理获得其value */
    // console.log("这里是表单所有数据", value);
    // setFormVisible(false);
    // message.info(`这里是表单所有数据：${JSON.stringify(value)}`, 3);
    //  validateFields()
    //     .then((values) => {
    //       console.log('values', values)
    //       form.resetFields();
    //     })
    //     .catch((info) => {
    //       console.log("Validate Failed:", info);
    //     });

  };
  return (
    <>
      <Divider style={{ marginBottom: "10px" }}></Divider>
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
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setFieldsValue({
                              selectAll: children,
                            });
                          } else {
                            setFieldsValue({
                              selectAll: [],
                            });
                          }
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
