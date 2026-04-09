import api from "./api.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import type {Customer} from "../types/customer/Customer.ts";
import type {CreateCustomerRequest} from "../types/customer/CreateCustomerRequest.ts";
import type {CustomerSearchRequest} from "../types/customer/CustomerSearchRequest.ts";
import type {UpdateCustomerRequest} from "../types/customer/UpdateCustomerRequest.ts";

const baseURL = "/customers"

export async function searchCustomers(
    params: CustomerSearchRequest
): Promise<PageResponse<Customer>> {
    return await api.get(`${baseURL}`, {params})
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

export async function registerCustomer(request: CreateCustomerRequest): Promise<Customer> {
    return await api.post(`${baseURL}/register`, request)
        .then(res => res.data);
}

export async function updateCustomer(customerId: number, request: UpdateCustomerRequest): Promise<Customer> {
    return await api.patch(`${baseURL}/${customerId}`, request)
        .then(res => res.data);
}