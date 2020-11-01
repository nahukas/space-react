import React, { useEffect, useState } from 'react';
import { message, Modal, Spin, Form, Input, Button } from 'antd';
import { Customer } from '../../api/customers/models';
import CustomersService from '../../api/customers/CustomersService';
import { FormComponentProps } from 'antd/lib/form';
import { germanFormat } from '../../helpers/number.helpers';
import { validateAntForm } from '../../helpers/ant-form';
import { RegEx } from '../../config/constants';

interface FormValues {
  budget: number;
}

interface Props extends FormComponentProps<FormValues> {
  id?: number;
  isModalVisible: boolean;
  handleModalVisible: (modalVisible: boolean, shouldUpdate: boolean) => void;
}

const ModalCustomer: React.FC<Props> = ({
  form,
  id,
  isModalVisible,
  handleModalVisible,
}) => {
  const { getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (customer) {
      try {
        e.preventDefault();
        setIsSubmitting(true);
        const { budget } = await validateAntForm(form);

        const entity: Customer = {
          id: customer.id,
          name: customer.name,
          budget,
          budget_spent: customer.budget_spent,
          date_of_first_purchase: customer.date_of_first_purchase,
        };

        console.log(entity);

        await CustomersService.updateCustomer(entity);
        message.success('Customer updated');
        handleModalVisible(false, true);
      } catch (error) {
        message.error('Error');
        handleModalVisible(false, true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal
      title={customer ? customer.name : 'Loading...'}
      visible={isModalVisible}
      onCancel={() => handleModalVisible(false, false)}
      footer={null}
    >
      {isLoading && <Spin />}
      {customer !== undefined && (
        <>
          <Form onSubmit={handleSubmit} colon={false} layout="vertical">
            <Form.Item label="Budget">
              {getFieldDecorator('budget', {
                initialValue: germanFormat(customer?.budget).replace('.', ''),
                rules: [
                  {
                    required: true,
                    message: 'Field Required',
                  },
                  {
                    pattern: RegEx.GERMAN_NUMBER_FORMAT,
                    message: 'Please enter only numbers and comma for decimals',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Budget Spent">
              <span>{germanFormat(customer.budget)}</span>
            </Form.Item>

            <Button
              type="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
              htmlType="submit"
            >
              Modify
            </Button>
          </Form>
        </>
      )}
    </Modal>
  );
};

const form = Form.create<Props>();

export default form(ModalCustomer);