import { Contract } from "@ethersproject/contracts";
import { ethers, Signer } from "ethers";
import TenantIdABI from "./TenantId.json";
import OwnerABI from "./OwnerId.json";
import LeaseABI from "./Lease.json";
import ERC20ABI from "./ERC20.json";
import OracleABI from "./IexecRateOracle.json";
import { config } from "../config/config";
import { OracleData } from "../repositories/TrustAPI";

// ***************************   TenantId   ***************************

export const mintTenantId = async (
  signer: Signer,
  handle: string
): Promise<void> => {
  const tenantIdContract = new Contract(
    config.tenantIdAddress,
    TenantIdABI.abi,
    signer
  );
  console.log("mint signer", await signer.getChainId());
  console.log("tenantIdContract", tenantIdContract);
  const tsx = await tenantIdContract.mint(handle);
  console.log("tsx", tsx);
};

export const updateTenantProfileData = async (
  signer: Signer,
  tokenId: string,
  newCid: string
): Promise<void> => {
  const tenantIdContract = new Contract(
    config.tenantIdAddress,
    TenantIdABI.abi,
    signer
  );
  await tenantIdContract.updateProfileData(tokenId, newCid);
};

export const updateTenantHasLease = async (
  signer: Signer,
  tokenId: string,
  hasLease: boolean
): Promise<void> => {
  const tenantIdContract = new Contract(
    config.tenantIdAddress,
    TenantIdABI.abi,
    signer
  );
  await tenantIdContract.updateHasLease(tokenId, hasLease);
};

// ***************************   OwnerId   ***************************

export const mintOwnerId = async (
  signer: Signer,
  handle: string
): Promise<void> => {
  const ownerIdContract = new Contract(
    config.ownerIdAddress,
    OwnerABI.abi,
    signer
  );
  await ownerIdContract.mint(handle);
};

export const updateOwnerProfileData = async (
  signer: Signer,
  tokenId: string,
  newCid: string
): Promise<void> => {
  const ownerIdContract = new Contract(
    config.ownerIdAddress,
    OwnerABI.abi,
    signer
  );
  await ownerIdContract.updateProfileData(tokenId, newCid);
};

// ***************************   Lease   ***************************

export const createLease = async (
  signer: Signer,
  tenantId: string,
  rentAmount: string,
  totalNumberOfRents: string,
  paymentToken: string,
  rentPaymentInterval: string,
  rentPaymentLimitTime: string,
  currencyPair: string,
  startDate: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.createLease(
    tenantId,
    rentAmount,
    totalNumberOfRents,
    paymentToken,
    rentPaymentInterval,
    rentPaymentLimitTime,
    currencyPair,
    startDate
  );
};

export const updateLeaseMetaData = async (
  signer: Signer,
  leaseId: string,
  newCid: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.updateLeaseMetaData(leaseId, newCid);
};

export const declineLease = async (
  signer: Signer,
  leaseId: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.declineLease(leaseId);
};

export const validateLease = async (
  signer: Signer,
  leaseId: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.validateLease(leaseId);
};

export const payCryptoRentInETH = async (
  signer: Signer,
  leaseId: string,
  rentId: string,
  //TODO a check si ca doit petre un string ici
  withoutIssues: boolean,
  amount: string
): Promise<void> => {
  //The "amount" MUST already be in wei
  const amountInWei = ethers.utils.parseUnits(amount, "wei");

  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.payCryptoRentInETH(leaseId, rentId, withoutIssues, {
    value: amountInWei,
  });
};

//TODO Authorize token transfer for token amount
export const payCryptoRentInToken = async (
  signer: Signer,
  leaseId: string,
  rentId: string,
  paymentToken: string,
  withoutIssues: boolean,
  amount: string
): Promise<void> => {
  //The "amount" MUST already be in smallest token unit
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  const tokenContract = new Contract(paymentToken, ERC20ABI.abi, signer);

  const amountInToken = ethers.utils.parseUnits(amount, 0);
  //Approve the transfer of the token amount by Lease contract
  await tokenContract.approve(config.leaseAddress, amountInToken);
  await leaseContract.payCryptoRentInETH(
    leaseId,
    rentId,
    withoutIssues,
    amountInToken
  );
};

//TODO call oracle to determine eth value to send
export const payFiatRentInEth = async (
  signer: Signer,
  leaseId: string,
  rentId: string,
  withoutIssues: boolean,
  amount: string
): Promise<void> => {
  //The "amount" MUST already be in wei
  const amountInWei = ethers.utils.parseUnits(amount, "wei");

  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.payFiatRentInEth(leaseId, rentId, withoutIssues, {
    value: amountInWei,
  });
};

//TODO call oracle to determine token value to send
//TODO Authorize token transfer for token amount
export const payFiatRentInToken = async (
  signer: Signer,
  leaseId: string,
  rentId: string,
  paymentToken: string,
  withoutIssues: boolean,
  amount: string
): Promise<void> => {
  //The "amount" MUST already be in smallest token unit
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  const tokenContract = new Contract(paymentToken, ERC20ABI.abi, signer);

  const amountInToken = ethers.utils.parseUnits(amount, 0);
  //Approve the transfer of the token amount by Lease contract
  await tokenContract.approve(config.leaseAddress, amountInToken);

  await leaseContract.payFiatRentInToken(
    leaseId,
    rentId,
    withoutIssues,
    amountInToken
  );
};

export const markRentAsNotPaid = async (
  signer: Signer,
  leaseId: string,
  rentId: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.markRentAsNotPaid(leaseId, rentId);
};

export const markRentAsPending = async (
  signer: Signer,
  leaseId: string,
  rentId: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.markRentAsPending(leaseId, rentId);
};

export const cancelLease = async (
  signer: Signer,
  leaseId: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.cancelLease(leaseId);
};

export const reviewLease = async (
  signer: Signer,
  leaseId: string,
  reviewUri: string
): Promise<void> => {
  const leaseContract = new Contract(config.leaseAddress, LeaseABI.abi, signer);
  await leaseContract.reviewLease(leaseId, reviewUri);
};

// ***************************   Oracle   ***************************

export const getRate = async (
  signer: Signer,
  currencyPair: string
): Promise<any> => {
  // ): Promise<OracleData> => {
  //TODO Pas sur du retour, peut être un array. Je met "any" pour l'instant
  const oracleContract = new Contract(
    config.iexecOracle,
    OracleABI.abi,
    signer
  );
  return await oracleContract.getRate(currencyPair);
};

export const updateRate = async (
  signer: Signer,
  currencyPair: string
): Promise<void> => {
  const oracleContract = new Contract(
    config.iexecOracle,
    OracleABI.abi,
    signer
  );
  await oracleContract.updateRate(currencyPair);
};


// ***************************   ERC20 Tokens   ***************************

