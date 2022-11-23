import {getOrCreateOwner} from "../getters";
import {CidUpdated, Mint} from "../../generated/OwnerId/OwnerId";
import {ZERO} from "../constants";

export function handleMint(event: Mint): void {
  const owner = getOrCreateOwner(event.params._tokenId.toString());
  owner.handle = event.params._ownerName;
  owner.address = event.params._ownerAddress;

  owner.createdAt = event.block.timestamp;
  owner.updatedAt = ZERO;
  owner.save();
}

export function handleCidUpdated(event: CidUpdated): void {
  const tenant = getOrCreateOwner(event.params._tokenId.toString());
  tenant.uri = event.params._newCid;

  tenant.updatedAt = event.block.timestamp;
  tenant.save();
}
