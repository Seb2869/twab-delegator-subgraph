import {
  DelegateeUpdated,
  DelegationCreated,
  TWABDelegator,
} from '../../generated/TWABDelegator/TWABDelegator';
import { setDelegatee, setDelegator, setLockUntil, setTicket } from '../helpers/delegation';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { loadOrCreateDelegation } from '../helpers/loadOrCreateDelegation';
import { loadOrCreateTicket } from '../helpers/loadOrCreateTicket';

export function handleDelegationCreated(event: DelegationCreated): void {
  const delegator = event.params.delegator;
  const delegatee = event.params.delegatee;
  const delegationAddress = event.params.delegation;
  const lockUntil = event.params.lockUntil;

  const twabDelegatorContract = TWABDelegator.bind(event.address);

  const ticketAddress = twabDelegatorContract.ticket();
  const delegation = loadOrCreateDelegation(delegationAddress.toHexString());

  loadOrCreateTicket(ticketAddress.toHexString());
  setTicket(delegation, ticketAddress);

  const delegatorAccount = loadOrCreateAccount(delegator.toHexString());
  const delegateeAccount = loadOrCreateAccount(delegatee.toHexString());

  setTicket(delegatorAccount, ticketAddress);
  setTicket(delegateeAccount, ticketAddress);

  setDelegator(delegation, delegatorAccount.id);
  setDelegatee(delegation, delegateeAccount.id);
  setLockUntil(delegation, lockUntil);

  delegation.save();
  delegatorAccount.save();
  delegateeAccount.save();
}

export function handleDelegateeUpdated(event: DelegateeUpdated): void {
  const delegator = event.params.delegator;
  const slot = event.params.slot;
  const delegatee = event.params.delegatee;
  const lockUntil = event.params.lockUntil;

  const twabDelegatorContract = TWABDelegator.bind(event.address);
  const delegationAddress = twabDelegatorContract.getDelegation(delegator, slot).value0;
  const delegation = loadOrCreateDelegation(delegationAddress.toHexString());

  const ticketAddress = twabDelegatorContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());
  setTicket(delegation, ticketAddress);

  const delegatorAccount = loadOrCreateAccount(delegator.toHexString());
  const delegateeAccount = loadOrCreateAccount(delegatee.toHexString());

  setTicket(delegatorAccount, ticketAddress);
  setTicket(delegateeAccount, ticketAddress);

  setDelegator(delegation, delegatorAccount.id);
  setDelegatee(delegation, delegateeAccount.id);
  setLockUntil(delegation, lockUntil);

  delegation.save();
  delegatorAccount.save();
  delegateeAccount.save();
}
