import React, { useState } from "react";
import {
  Select,
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Form,
  Input,
} from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex !== "majorName" ? (
      <InputNumber />
    ) : record._id === "_id" ? (
      <Input />
    ) : (
      //   <Select
      //   showSearch
      //   style={{ width: 200 }}
      //   placeholder="Select a person"
      //   optionFilterProp="children"
      //   // onChange={onChange}
      //   // onFocus={onFocus}
      //   // onBlur={onBlur}
      //   // onSearch={onSearch}
      //   // filterOption={(input, option) =>
      //   //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      //   // }
      // >{
      //   getMajorListopetions()
      // }
      // </Select>
      <p>{record[dataIndex]}</p>
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.data);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => {
    return record._id === editingKey;
  };

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
        setEditingKey("");
      }

      setData(newData);
      props.onItemChange(newData, "majorPoints");
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleAdd = async () => {
    const newData = [...data];
    try {
      const item = {
        _id: "_id",
        kazPoint: 0,
        kazSelPoint: 0,
        rusSelPoint: 0,
        rusPoint: 0,
        majorName: "",
      };
      const row = await form.validateFields();
      newData.splice("_id", 1, { ...item, ...row });
      setData(newData);

      edit();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "majorName",
      dataIndex: "majorName",
      width: "25%",
      editable: true,
    },
    {
      title: "kazPoint",
      dataIndex: "kazPoint",
      width: "15%",
      editable: true,
    },
    {
      title: "kazSelPoint",
      dataIndex: "kazSelPoint",
      width: "40%",
      editable: true,
    },
    {
      title: "rusPoint",
      dataIndex: "rusPoint",
      width: "15%",
      editable: true,
    },
    {
      title: "rusSelPoint",
      dataIndex: "rusSelPoint",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        className="customButton"
        type="primary"
        style={{}}
      >
        Add Major
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={"_id"}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>{" "}
    </div>
  );
};

export default EditableTable;
