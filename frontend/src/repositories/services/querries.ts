/* eslint-disable no-console */
import axios from 'axios';
import { SUBGRAPH_URL } from '../../config/config';
import {  } from '../TrustAPI/types/index';

const processRequest = async (query: string): Promise<any> => {
  try {
    return await axios.post(SUBGRAPH_URL, { query });
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


