export interface Customer {
  id: number;
  name: string;
  budget: number;
  budget_spent: number;
  date_of_first_purchase: string;
}

export interface CustomersFetched {
  list: Customer[];
  count: number;
}
