import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { createMockedFunction } from 'matchstick-as/assembly/index';

import { delegationAddress, ticketAddress } from './assertField';

export const mockGetDelegationFunction = (
  event: ethereum.Event,
  delegatorAddress: Address,
  slot: BigInt,
  delegateeAddress: Address,
  balance: BigInt,
  lockUntil: BigInt,
  wasCreated: boolean,
): void => {
  createMockedFunction(event.address, 'getDelegation', 'getDelegation(address,uint256):(address,address,uint256,uint256,bool)')
    .withArgs([
      ethereum.Value.fromAddress(delegatorAddress),
      ethereum.Value.fromUnsignedBigInt(slot)
    ])
    .returns([
      ethereum.Value.fromAddress(delegationAddress),
      ethereum.Value.fromAddress(delegateeAddress),
      ethereum.Value.fromUnsignedBigInt(balance),
      ethereum.Value.fromUnsignedBigInt(lockUntil),
      ethereum.Value.fromBoolean(wasCreated)
    ]);
};

export const mockTicketFunction = (event: ethereum.Event): void => {
  createMockedFunction(event.address, 'ticket', 'ticket():(address)').returns([
    ethereum.Value.fromAddress(ticketAddress),
  ]);
};
