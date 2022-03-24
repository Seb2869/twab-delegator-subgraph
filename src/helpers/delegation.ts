import { Address, BigInt } from '@graphprotocol/graph-ts';

import { Delegation } from '../../generated/schema';

export function setTicket<Entity>(entity: Entity, ticket: Address): void {
  // If just created set ticket field
  if (entity.ticket == null) {
    entity.ticket = ticket.toHexString();
  }
}

// export const setBalance = (
//   delegation: Delegation,
//   ticket: Ticket,
//   walletAddress: Address,
// ): void => {
//   const balance = ticket.balanceOf(walletAddress);

//   delegation.balance = balance;
// };

export const setDelegator = (delegation: Delegation, delegatorId: string): void => {
  // If just created set delegator field
  if (delegation.delegator == '') {
    delegation.delegator = delegatorId;
  }
};

export const setDelegatee = (delegation: Delegation, delegateeId: string): void => {
  delegation.delegatee = delegateeId;
};

export const setLockUntil = (delegation: Delegation, lockUntil: BigInt): void => {
  delegation.lockUntil = lockUntil;
};
