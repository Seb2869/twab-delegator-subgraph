import { BigInt } from '@graphprotocol/graph-ts';
import { clearStore, test } from 'matchstick-as/assembly/index';

import {
  assertAccountFields,
  delegatorAddress,
  delegateeAddress,
  delegationAddress,
  delegatorAccountId,
  delegateeAccountId,
  delegationId,
  assertDelegationFields,
  assertTicketFields,
  newDelegateeAddress,
  newDelegateeAccountId,
} from './helpers/assertField';
import { createDelegateeUpdatedEvent, createDelegationCreatedEvent, createDelegationFundedEvent, createTransferredDelegationEvent } from './helpers/mockedEvent';
import { mockGetDelegationFunction, mockTicketFunction } from './helpers/mockedFunction';
import { handleDelegateeUpdated, handleDelegationCreated, handleDelegationFunded, handleTransferredDelegation } from '../src/mappings/TWABDelegator';
import { Account, Delegation, Ticket } from '../generated/schema';
import { DelegationCreated, DelegationFunded, TWABDelegator } from '../generated/TWABDelegator/TWABDelegator';

const amount = 1000;
const lockUntil = 5184000; // 60 days in seconds

const createDelegation = (): DelegationCreated => {
  const delegationCreatedEvent = createDelegationCreatedEvent(
    delegatorAddress.toHexString(),
    delegateeAddress.toHexString(),
    0,
    lockUntil,
    delegationAddress.toHexString(),
  );

  mockTicketFunction(delegationCreatedEvent);
  handleDelegationCreated(delegationCreatedEvent);

  return delegationCreatedEvent;
}

const fundDelegation = (): DelegationFunded => {
  const delegationFundedEvent = createDelegationFundedEvent(
    delegatorAddress.toHexString(),
    0,
    amount
  );

  mockGetDelegationFunction(
    delegationFundedEvent,
    delegatorAddress,
    BigInt.fromI32(0),
    newDelegateeAddress,
    BigInt.fromI32(amount),
    BigInt.fromI32(lockUntil),
    true
  );

  handleDelegationFunded(delegationFundedEvent);

  return delegationFundedEvent;
}

test('should handleDelegationCreated', () => {
  const delegationCreatedEvent = createDelegation();

  const twabDelegatorContract = TWABDelegator.bind(delegationCreatedEvent.address);
  const ticketAddress = twabDelegatorContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const delegatorAccount = Account.load(delegatorAccountId) as Account;
  const delegateeAccount = Account.load(delegateeAccountId) as Account;

  assertAccountFields(delegatorAccount.id, ticketAddress);
  assertAccountFields(delegateeAccount.id, ticketAddress);

  const delegation = Delegation.load(delegationId) as Delegation;

  assertDelegationFields(
    delegation.id,
    delegatorAccount.id,
    delegateeAccount.id,
    0,
    lockUntil,
    ticketAddress,
  );

  clearStore();
});

test('should handleDelegateeUpdated', () => {
  createDelegation();

  const delegateeUpdatedEvent = createDelegateeUpdatedEvent(
    delegatorAddress.toHexString(),
    newDelegateeAddress.toHexString(),
    0,
    lockUntil
  );

  mockGetDelegationFunction(
    delegateeUpdatedEvent,
    delegatorAddress,
    BigInt.fromI32(0),
    newDelegateeAddress,
    BigInt.fromI32(0),
    BigInt.fromI32(lockUntil),
    true
  );

  mockTicketFunction(delegateeUpdatedEvent);
  handleDelegateeUpdated(delegateeUpdatedEvent);

  const twabDelegatorContract = TWABDelegator.bind(delegateeUpdatedEvent.address);
  const ticketAddress = twabDelegatorContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const delegatorAccount = Account.load(delegatorAccountId) as Account;
  const newDelegateeAccount = Account.load(newDelegateeAccountId) as Account;

  assertAccountFields(newDelegateeAccount.id, ticketAddress);

  const delegation = Delegation.load(delegationId) as Delegation;

  assertDelegationFields(
    delegation.id,
    delegatorAccount.id,
    newDelegateeAccount.id,
    0,
    lockUntil,
    ticketAddress,
  );

  clearStore();
});

test('should handleDelegationFunded', () => {
  createDelegation();

  const delegationFundedEvent = fundDelegation();
  const twabDelegatorContract = TWABDelegator.bind(delegationFundedEvent.address);
  const ticketAddress = twabDelegatorContract.ticket();

  const delegatorAccount = Account.load(delegatorAccountId) as Account;
  const delegateeAccount = Account.load(delegateeAccountId) as Account;
  const delegation = Delegation.load(delegationId) as Delegation;

  assertDelegationFields(
    delegation.id,
    delegatorAccount.id,
    delegateeAccount.id,
    amount,
    lockUntil,
    ticketAddress,
  );

  clearStore();
});

test('should handleTransferredDelegation', () => {
  createDelegation();
  fundDelegation();

  const transferredDelegationEvent = createTransferredDelegationEvent(
    delegatorAddress.toHexString(),
    0,
    amount,
    newDelegateeAddress.toHexString(),
  );

  mockGetDelegationFunction(
    transferredDelegationEvent,
    delegatorAddress,
    BigInt.fromI32(0),
    newDelegateeAddress,
    BigInt.fromI32(0),
    BigInt.fromI32(lockUntil),
    true
  );

  handleTransferredDelegation(transferredDelegationEvent);

  const twabDelegatorContract = TWABDelegator.bind(transferredDelegationEvent.address);
  const ticketAddress = twabDelegatorContract.ticket();

  const delegatorAccount = Account.load(delegatorAccountId) as Account;
  const delegateeAccount = Account.load(delegateeAccountId) as Account;
  const delegation = Delegation.load(delegationId) as Delegation;

  assertDelegationFields(
    delegation.id,
    delegatorAccount.id,
    delegateeAccount.id,
    0,
    lockUntil,
    ticketAddress,
  );

  clearStore();
});
