import React, { useContext, useState } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { useForm } from "antd/lib/form/Form";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";

function AddRoomModals() {
  const [form] = useForm();
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { uid } = useContext(AuthContext);

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên Phòng" name="name">
            <Input placeholder="Nhập tên phòng " />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập mô tả " />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddRoomModals;
