import { Address } from '@graphprotocol/graph-ts';
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
import { createDelegateeUpdatedEvent, createDelegationCreatedEvent } from './helpers/mockedEvent';
import { mockGetDelegationFunction, mockTicketFunction } from './helpers/mockedFunction';
import { handleDelegateeUpdated, handleDelegationCreated } from '../src/mappings/TWABDelegator';
import { Account, Delegation, Ticket } from '../generated/schema';
import { DelegationCreated, TWABDelegator } from '../generated/TWABDelegator/TWABDelegator';

const lockUntil = 5184000; // 60 days in seconds

test('should handleDelegationCreated', () => {
  const delegationCreatedEvent = createDelegationCreatedEvent(
    delegatorAddress.toHexString(),
    delegateeAddress.toHexString(),
    0,
    lockUntil,
    delegationAddress.toHexString(),
  );

  mockTicketFunction(delegationCreatedEvent);
  handleDelegationCreated(delegationCreatedEvent);

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
  const delegateeUpdatedEvent = createDelegateeUpdatedEvent(
    delegatorAddress.toHexString(),
    newDelegateeAddress.toHexString(),
    0,
    lockUntil
  );

  mockGetDelegationFunction(
    delegateeUpdatedEvent,
    delegatorAddress,
    0,
    newDelegateeAddress,
    0,
    lockUntil,
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
