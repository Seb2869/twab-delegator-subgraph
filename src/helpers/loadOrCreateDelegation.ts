import { Delegation } from '../../generated/schema';

export function loadOrCreateDelegation(id: string): Delegation {
  let delegateDelegation = Delegation.load(id);

  // create case
  if (delegateDelegation == null) {
    delegateDelegation = new Delegation(id);
  }

  return delegateDelegation as Delegation;
}
