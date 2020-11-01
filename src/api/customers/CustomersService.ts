import { API } from '../../config/api';
import FetchService from '../shared/services/FetchService';
import { Customer, CustomersFetched } from './models';

class CustomersService {
  public static async getOne(id: number) {
    const response = await FetchService.get<Customer>({
      url: `${API.CUSTOMERS}/${id}`,
    });
    return response;
  }

  public static async get(): Promise<CustomersFetched> {
    const response = await FetchService.get<CustomersFetched>({
      url: API.CUSTOMERS,
    });
    return response;
  }

  public static async updateCustomer(entity: Customer) {
    await FetchService.put<Customer>({
      url: `${API.CUSTOMERS}/${entity.id}`,
      body: entity,
    });
  }
}

export default CustomersService;
