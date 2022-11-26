/* eslint-disable no-console */
import axios from "axios";
import { SUBGRAPH_URL } from "../../config/config";
import {} from "../TrustAPI/types/index";

const processRequest = async (query: string): Promise<any> => {
  try {
    return await axios.post(import.meta.env.VITE_SUBGRAPH_URL, { query });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getOwnerById = (id: string): Promise<any> => {
  const query = `
    {
       owners(where: {id: "${id}"})
    }
  `;
  return processRequest(query);
};

export const getTenantById = (id: string): Promise<any> => {
  const query = `
    {
       tenants(where: {id: "${id}"})
    }
  `;
  return processRequest(query);
};

export const getTenantbyHandle = (handle: string): Promise<any> => {
  const query = `
    {
       tenants(where: {handle_contains: "${handle}"})
    }
  `;
  return processRequest(query);
};

export const getFullTrustProfileData = (address: string): Promise<any> => {
  const query = `{
          owners(where: {address: "${address}"}) {
            id handle address uri
            leases(where: {status_not: PENDING}) {
              rentPayments(where: {status: PAID}) {
                withoutIssues
              }
            }
          }
          tenants(where: {address: "${address}"}) {
            id handle address uri hasLease
            leases(where: {status_not: PENDING}) {
              rentPayments(where: {status_in: [PAID, NOT_PAID]}) {
                status
              }
            }
          }
        }`;
  return processRequest(query);
};

export const getLeaseDetailsById = (id: string): Promise<any> => {
  const query = `
    {
      leases(where: {id: "${id}"}) {
        currencyPair
        id
        ownerReviewUri
        rentAmount
        paymentToken
        rentPaymentInterval
        rentPaymentLimitTime
        startDate
        status
        tenantReviewUri
        totalNumberOfRents
        uri
        updatedAt
        cancelledByOwner
        cancelledByTenant
        createdAt
        owner {
          id
          handle
          updatedAt
        }
         rentPayments(orderBy: rentPaymentDate) {
          amount
          exchangeRate
          exchangeRateTimestamp
          id
          paymentToken
          rentPaymentDate
          rentPaymentLimitDate
          status
          validationDate
          withoutIssues
        }
        tenant {
          handle
          id
          updatedAt
          }
        }
      }
  `;
  return processRequest(query);
};

export const getLeasesByTenantId = (id: string): Promise<any> => {
  const query = `
    {
        leases(where: {tenant_: {id: "${id}"}}) {
          id
          status
          rentPaymentInterval
          totalNumberOfRents
          rentAmount
          currencyPair
          paymentToken
          tenantReviewUri
          ownerReviewUri
          startDate
          cancelledByOwner
          cancelledByTenant
          tenant {
            id
            handle
          }
          }
  }
  `;
  return processRequest(query);
};
