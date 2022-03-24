import { Address, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { DelegateeUpdated, DelegationCreated } from '../../generated/TWABDelegator/TWABDelegator';

export function createDelegationCreatedEvent(
  delegator: string,
  delegatee: string,
  slot: i32,
  lockUntil: i32,
  delegation: string,
): DelegationCreated {
  const mockEvent = newMockEvent();

  const delegationCreatedEvent = new DelegationCreated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  delegationCreatedEvent.parameters = new Array();

  const delegatorParam = new ethereum.EventParam(
    'delegator',
    ethereum.Value.fromAddress(Address.fromString(delegator)),
  );

  const userParam = new ethereum.EventParam(
    'user',
    ethereum.Value.fromAddress(Address.fromString(delegator)),
  );

  const delegateeParam = new ethereum.EventParam(
    'delegatee',
    ethereum.Value.fromAddress(Address.fromString(delegatee)),
  );

  const delegationParam = new ethereum.EventParam(
    'delegation',
    ethereum.Value.fromAddress(Address.fromString(delegation)),
  );

  const slotParam = new ethereum.EventParam('slot', ethereum.Value.fromI32(slot));
  const lockUntilParam = new ethereum.EventParam('lockUntil', ethereum.Value.fromI32(lockUntil));

  delegationCreatedEvent.parameters.push(delegatorParam);
  delegationCreatedEvent.parameters.push(slotParam);
  delegationCreatedEvent.parameters.push(lockUntilParam);
  delegationCreatedEvent.parameters.push(delegateeParam);
  delegationCreatedEvent.parameters.push(delegationParam);
  delegationCreatedEvent.parameters.push(userParam);

  return delegationCreatedEvent;
}

export function createDelegateeUpdatedEvent(
  delegator: string,
  delegatee: string,
  slot: i32,
  lockUntil: i32
): DelegateeUpdated {
  const mockEvent = newMockEvent();

  const delegateeUpdatedEvent = new DelegateeUpdated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  delegateeUpdatedEvent.parameters = new Array();

  const delegatorParam = new ethereum.EventParam(
    'delegator',
    ethereum.Value.fromAddress(Address.fromString(delegator)),
  );

  const userParam = new ethereum.EventParam(
    'user',
    ethereum.Value.fromAddress(Address.fromString(delegator)),
  );

  const delegateeParam = new ethereum.EventParam(
    'delegatee',
    ethereum.Value.fromAddress(Address.fromString(delegatee)),
  );

  const slotParam = new ethereum.EventParam('slot', ethereum.Value.fromI32(slot));
  const lockUntilParam = new ethereum.EventParam('lockUntil', ethereum.Value.fromI32(lockUntil));

  delegateeUpdatedEvent.parameters.push(delegatorParam);
  delegateeUpdatedEvent.parameters.push(slotParam);
  delegateeUpdatedEvent.parameters.push(delegateeParam);
  delegateeUpdatedEvent.parameters.push(lockUntilParam);
  delegateeUpdatedEvent.parameters.push(userParam);

  return delegateeUpdatedEvent;
}

