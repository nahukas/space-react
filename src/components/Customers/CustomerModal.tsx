import React, { useEffect, useState } from 'react';
import { message, Modal, Form, Input, Button } from 'antd';
import { Customer } from '../../api/customers/models';
import CustomersService from '../../api/customers/CustomersService';
import { FormComponentProps } from 'antd/lib/form';
import { germanFormat } from '../../helpers/number.helpers';
import { validateAntForm } from '../../helpers/ant-form';
import { RegEx } from '../../config/constants';
import { formItemLayout } from '../../layout/constants';
import Spinner from '../Spinner/Spinner';

interface FormValues {
  budget: string;
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
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [submit, setSubmit] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleExtraValidations = async (): Promise<boolean> => {
    const { budget } = await validateAntForm(form);
    if (customer) {
      try {
        const budgetNumber = Number(budget.replace(',', '.'));
        if (budgetNumber < customer.budget_spent) {
          setSubmit(false);
          form.setFields({
            budget: {
              value: form.getFieldValue('budget'),
              errors: [new Error('Budget must be greater than budget spent')],
            },
          });
        } else {
          setSubmit(true);
          return true;
        }
      } catch (error) {
        setSubmit(false);
        return false;
      }
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (customer && handleExtraValidations) {
      try {
        e.preventDefault();
        setIsSubmitting(true);
        const { budget } = await validateAntForm(form);

        const entity: Customer = {
          id: customer.id,
          name: customer.name,
          budget: Number(budget.replace(',', '.')),
          budget_spent: customer.budget_spent,
          date_of_first_purchase: customer.date_of_first_purchase,
        };

        await CustomersService.updateCustomer(entity);
        message.success('Customer updated');
        handleModalVisible(false, true);
      } catch (error) {
        message.error('Error');
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
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
          }}
        >
          <Spinner />
        </div>
      )}
      {customer !== undefined && (
        <Form
          onSubmit={handleSubmit}
          colon={false}
          hideRequiredMark={true}
          {...formItemLayout}
        >
          <Form.Item label="Budget" labelAlign="left">
            {getFieldDecorator('budget', {
              initialValue: germanFormat(customer?.budget).replace('.', ''),
              rules: [
                {
                  required: true,
                  message: 'Field Required',
                },
                {
                  pattern: RegEx.GERMAN_NUMBER_FORMAT,
                  message:
                    'Please enter only numbers and use a comma for decimals',
                },
              ],
            })(
              <Input
                onBlur={() => handleExtraValidations()}
                onChange={() => handleExtraValidations()}
              />
            )}
          </Form.Item>

          <Form.Item label="Budget Spent" labelAlign="left">
            <span>{germanFormat(customer.budget_spent)}</span>
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              loading={isSubmitting}
              disabled={isSubmitting || !submit}
              htmlType="submit"
            >
              Modify
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

const form = Form.create<Props>();

export default form(ModalCustomer);
