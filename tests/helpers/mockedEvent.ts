import { Address, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { DelegationCreated } from '../../generated/TWABDelegator/TWABDelegator';

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

// export function createNewUserTwabEvent(delegate: string, amount: i32, timestamp: i32): NewUserTwab {
//   const mockEvent = newMockEvent();

//   const newUserTwabEvent = new NewUserTwab(
//     mockEvent.address,
//     mockEvent.logIndex,
//     mockEvent.transactionLogIndex,
//     mockEvent.logType,
//     mockEvent.block,
//     mockEvent.transaction,
//     mockEvent.parameters,
//   );

//   newUserTwabEvent.parameters = new Array();

//   const delegateParam = new ethereum.EventParam(
//     'delegate',
//     ethereum.Value.fromAddress(Address.fromString(delegate)),
//   );

//   const newTwabParam = new ethereum.EventParam(
//     'newTwab',
//     ethereum.Value.fromTuple(
//       changetype<ethereum.Tuple>([
//         ethereum.Value.fromI32(amount),
//         ethereum.Value.fromI32(timestamp),
//       ]),
//     ),
//   );

//   newUserTwabEvent.parameters.push(delegateParam);
//   newUserTwabEvent.parameters.push(newTwabParam);

//   return newUserTwabEvent;
// }

// export function createTransferEvent(from: string, to: string, value: i32): Transfer {
//   const mockEvent = newMockEvent();

//   const transferEvent = new Transfer(
//     mockEvent.address,
//     mockEvent.logIndex,
//     mockEvent.transactionLogIndex,
//     mockEvent.logType,
//     mockEvent.block,
//     mockEvent.transaction,
//     mockEvent.parameters,
//   );

//   transferEvent.parameters = new Array();

//   const fromParam = new ethereum.EventParam(
//     'from',
//     ethereum.Value.fromAddress(Address.fromString(from)),
//   );

//   const toParam = new ethereum.EventParam('to', ethereum.Value.fromAddress(Address.fromString(to)));

//   const valueParam = new ethereum.EventParam('value', ethereum.Value.fromI32(value));

//   transferEvent.parameters.push(fromParam);
//   transferEvent.parameters.push(toParam);
//   transferEvent.parameters.push(valueParam);

//   return transferEvent;
// }
