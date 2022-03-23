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
} from './helpers/assertField';
import { createDelegationCreatedEvent } from './helpers/mockedEvent';
import { mockTicketFunction } from './helpers/mockedFunction';
import { handleDelegationCreated } from '../src/mappings/TWABDelegator';
import { Account, Delegation, Ticket } from '../generated/schema';
import { DelegationCreated, TWABDelegator } from '../generated/TWABDelegator/TWABDelegator';

const lockUntil = 5184000; // 60 days in seconds

const createDelegationCreated = (
  delegatorAddress: Address,
  delegateeAddress: Address,
  slot: i32,
  lockUntil: i32,
  delegationAddress: Address,
): DelegationCreated => {
  const delegationCreatedEvent = createDelegationCreatedEvent(
    delegatorAddress.toHexString(),
    delegateeAddress.toHexString(),
    slot,
    lockUntil,
    delegationAddress.toHexString(),
  );

  mockTicketFunction(delegationCreatedEvent);
  handleDelegationCreated(delegationCreatedEvent);

  return delegationCreatedEvent;
};

test('should handleDelegationCreated', () => {
  const delegationCreatedEvent = createDelegationCreated(
    delegatorAddress,
    delegateeAddress,
    0,
    lockUntil,
    delegationAddress,
  );

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
