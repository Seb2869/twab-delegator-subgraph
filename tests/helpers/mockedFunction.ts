import { Address, ethereum } from '@graphprotocol/graph-ts';
import { createMockedFunction } from 'matchstick-as/assembly/index';

import { delegationAddress, ticketAddress } from './assertField';

export const mockGetAccountDetailsFunction = (
  event: ethereum.Event,
  userAddress: Address,
  balance: i32,
  nextTwabIndex: i32,
  cardinality: i32,
): void => {
  createMockedFunction(
    event.address,
    'getAccountDetails',
    'getAccountDetails(address):((uint208,uint24,uint24))',
  )
    .withArgs([ethereum.Value.fromAddress(userAddress)])
    .returns([
      ethereum.Value.fromTuple(
        changetype<ethereum.Tuple>([
          ethereum.Value.fromI32(balance),
          ethereum.Value.fromI32(nextTwabIndex),
          ethereum.Value.fromI32(cardinality),
        ]),
      ),
    ]);
};

export const mockBalanceOfFunction = (
  event: ethereum.Event,
  userAddress: Address,
  balance: i32,
): void => {
  createMockedFunction(event.address, 'balanceOf', 'balanceOf(address):(uint256)')
    .withArgs([ethereum.Value.fromAddress(userAddress)])
    .returns([ethereum.Value.fromI32(balance)]);
};

export const mockGetDelegationFunction = (
  event: ethereum.Event,
  delegatorAddress: Address,
  slot: i32,
  delegateeAddress: Address,
  balance: i32,
  lockUntil: i32,
  wasCreated: boolean,
): void => {
  createMockedFunction(event.address, 'getDelegation', 'getDelegation(address,uint256):(address,address,uint256,uint256,bool)')
    .withArgs([
      ethereum.Value.fromAddress(delegatorAddress),
      ethereum.Value.fromI32(slot)
    ])
    .returns([
      ethereum.Value.fromAddress(delegationAddress),
      ethereum.Value.fromAddress(delegateeAddress),
      ethereum.Value.fromI32(balance),
      ethereum.Value.fromI32(lockUntil),
      ethereum.Value.fromBoolean(wasCreated)
    ]);
};

export const mockTicketFunction = (event: ethereum.Event): void => {
  createMockedFunction(event.address, 'ticket', 'ticket():(address)').returns([
    ethereum.Value.fromAddress(ticketAddress),
  ]);
};
