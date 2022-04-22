import { Account } from '../../generated/schema';

export function loadOrCreateAccount(id: string): Account {
  let delegatorAccount = Account.load(id);

  // create case
  if (delegatorAccount == null) {
    delegatorAccount = new Account(id);
  }

  return delegatorAccount as Account;
}
