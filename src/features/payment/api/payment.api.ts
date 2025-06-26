import { createApi } from '@reduxjs/toolkit/query/react';
import { url } from "../../../app/env";
import serviceBaseQueryWithReauth from '../../../app/serviceBaseQueryReAuth';
import { CreatePaymentLinkRequest, CreatePaymentLinkResponse, Order, PaymentInfo } from '../types/payment';

const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: serviceBaseQueryWithReauth(url.graves),
	endpoints: (builder) => ({
		createPaymentLink: builder.mutation<CreatePaymentLinkResponse, CreatePaymentLinkRequest>({
			query: (body) => ({
				url: '/create-payment-link',
				method: 'POST',
				body
			}),
		}),
		listOrders: builder.mutation<Order[], void>({
			query: (body) => ({
				url: '/list-orders',
				method: 'POST',
				body
			}),
		}),
		getOrder: builder.mutation<PaymentInfo, number>({
			query: (id) => ({
				url: `/payment-link-info?orderId=${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreatePaymentLinkMutation,
	useListOrdersMutation,
	useGetOrderMutation,
} = paymentApi;

export default paymentApi;