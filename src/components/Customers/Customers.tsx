import React, { useEffect, useCallback, useState } from 'react';
import { message, Table } from 'antd';
import moment from 'moment';
import CustomersService from '../../api/customers/CustomersService';
import { Customer } from '../../api/customers/models';
import ModalCustomer from './CustomerModal';
import { germanFormat } from '../../helpers/number.helpers';
import Spinner from '../Spinner/Spinner';

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
    handleModalVisible(true, false);
  };

  const handleModalVisible = (modalVisible: boolean, shouldUpdate: boolean) => {
    setIsModalVisible(modalVisible);
    if (shouldUpdate) {
      fetchCustomers();
    }
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
      render: (cell: Customer) => germanFormat(cell.budget),
    },
    {
      title: 'Budget Spent',
      render: (cell: Customer) => germanFormat(cell.budget_spent),
    },
    {
      title: 'Budget Left',
      render: (cell: Customer) => germanFormat(cell.budget - cell.budget_spent),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Spinner />
      </div>
    );
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
        rowKey="id"
        pagination={false}
        onRow={(record: Customer) => ({
          onClick: () => {
            handleRowClick(record.id);
          },
        })}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        style={{ boxShadow: '6px 5px 20px 0px #9492924f' }}
      />
    </>
  );
};

export default Customers;
