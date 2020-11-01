import React, { useEffect, useState } from 'react';
import { message, Modal, Spin, Form, Input, Button } from 'antd';
import { Customer } from './models';
import CustomersService from './CustomersService';

// interface FormValues {
//   budget: number;
// }

interface Props {
  id?: number;
  isModalVisible: boolean;
  handleModalVisible: (modalVisible: boolean) => void;
}

const ModalCustomer: React.FC<Props> = ({
  id,
  isModalVisible,
  handleModalVisible,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await CustomersService.getOne(id);
          setCustomer(response);
        } catch (error) {
          message.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCustomers();
  }, [id]);

  const handleFormSubmit = async () => {
    console.log('hi');
  };

  return (
    <Modal
      title={customer ? customer.name : 'Loading...'}
      visible={isModalVisible}
      onCancel={() => handleModalVisible(false)}
      footer={null}
    >
      {isLoading && <Spin />}
      {customer !== undefined && (
        <>
          <Form colon={false}>
            <Form.Item label="Total Budget">
              <Input />
            </Form.Item>

            <Form.Item label="Budget Spent">
              <span>{customer.budget}</span>
            </Form.Item>
          </Form>

          <Button onSubmit={handleFormSubmit}>Modify</Button>
        </>
      )}
    </Modal>
  );
};

export default ModalCustomer;
