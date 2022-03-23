import { Address } from '@graphprotocol/graph-ts';
import { assert } from 'matchstick-as/assembly/index';

export const delegatorAddress = Address.fromString('0x897ea87eC79b9Fe5425f9f6c072c5Aa467bAdB0f');
export const delegatorAccountId = delegatorAddress.toHexString();

export const delegateeAddress = Address.fromString('0x8a37cb10f5AB9374283237551E396b53194E64e3');
export const delegateeAccountId = delegateeAddress.toHexString();

export const delegationAddress = Address.fromString('0x817d54177e42E3FBCB3EA64009111e0a086347a8');
export const delegationId = delegationAddress.toHexString();

export const ticketAddress = Address.fromString('0x793e45332B7976Ead76E789A4876c68b5AB8430c');

export const assertAccountFields = (accountId: string, ticketAddress: Address): void => {
  assert.fieldEquals('Account', accountId, 'id', accountId);
  assert.fieldEquals('Account', accountId, 'ticket', ticketAddress.toHexString());
};

export const assertDelegationFields = (
  delegationId: string,
  delegatorId: string,
  delegateeId: string,
  balance: i32,
  lockUntil: i32,
  ticketAddress: Address,
): void => {
  assert.fieldEquals('Delegation', delegationId, 'id', delegationId);
  assert.fieldEquals('Delegation', delegationId, 'delegator', delegatorId);
  assert.fieldEquals('Delegation', delegationId, 'delegatee', delegateeId);
  assert.fieldEquals('Delegation', delegationId, 'balance', balance.toString());
  assert.fieldEquals('Delegation', delegationId, 'lockUntil', lockUntil.toString());
  assert.fieldEquals('Delegation', delegationId, 'ticket', ticketAddress.toHexString());
};

export const assertTicketFields = (ticketId: string): void => {
  assert.fieldEquals('Ticket', ticketId, 'id', ticketId);
};
