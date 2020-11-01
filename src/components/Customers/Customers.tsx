import React, { useEffect, useCallback, useState } from 'react';
import { message, Spin, Table } from 'antd';
import moment from 'moment';
import CustomersService from '../../api/customers/CustomersService';
import { Customer } from '../../api/customers/models';
import ModalCustomer from '../../api/customers/CustomerModal';

const Customers: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerToEdit, setCustomerToEdit] = useState<number>();

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await CustomersService.get();
      setCustomers(response.list);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleRowClick = (customerId: number) => {
    setCustomerToEdit(customerId);
    handleModalVisible(true);
  };

  const handleModalVisible = (modalVisible: boolean) => {
    setIsModalVisible(modalVisible);
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of a first purchase',
      render: (cell: Customer) =>
        moment(new Date(cell.date_of_first_purchase)).format('DD/MM/YYYY'),
    },
    {
      title: 'Total Budget',
      render: (cell: Customer) =>
        new Intl.NumberFormat('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(cell.budget),
    },
    {
      title: 'Budget Spent',
      render: (cell: Customer) =>
        new Intl.NumberFormat('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(cell.budget_spent),
    },
    {
      title: 'Budget Left',
      render: (cell: Customer) =>
        new Intl.NumberFormat('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(cell.budget - cell.budget_spent),
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <ModalCustomer
        id={customerToEdit}
        handleModalVisible={handleModalVisible}
        isModalVisible={isModalVisible}
      />

      <Table
        dataSource={customers}
        columns={columns}
        key="id"
        pagination={false}
        onRow={(record: Customer) => ({
          onClick: () => {
            handleRowClick(record.id);
          },
        })}
      />
    </>
  );
};

export default Customers;
