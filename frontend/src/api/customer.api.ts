import api from "./api.ts";
import type {PageResponse} from "../types/page/PageResponse.ts";
import type {Customer} from "../types/customer/Customer.ts";
import type {CreateCustomerRequest} from "../types/customer/CreateCustomerRequest.ts";

const baseURL = "/customers"

export async function getAllCustomers(): Promise<PageResponse<Customer>> {
    return await api.get(`${baseURL}`)
        .then(res => res.data);
}

export async function getCustomerById(customerId: number): Promise<Customer> {
    return await api.get(`${baseURL}/${customerId}`)
        .then(res => res.data);
}

export async function getCustomerByEmail(customerEmail: string): Promise<Customer> {
    return await api.get(`${baseURL}/by-email`,
        {
            params: {
                email: customerEmail
            }
        }
    ).then(res => res.data);
}

export async function createCustomer(request: CreateCustomerRequest): Promise<Customer> {
    return await api.post(`${baseURL}`, request)
        .then(res => res.data);
}

export async function updateCustomer(customerId: number, request: CreateCustomerRequest): Promise<Customer> {
    return await api.patch(`${baseURL}/${customerId}`, request)
        .then(res => res.data);
}