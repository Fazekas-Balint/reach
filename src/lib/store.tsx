'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Contact, Deal, DealStage } from './types';
import { contacts as seedContacts, deals as seedDeals } from './seed';

/**
 * A tiny reactive store. Would be Zustand or the app router's `use()` + Server Actions
 * in production; kept in-context so the portfolio version needs no extra dep and
 * every mutation stays visible in the component tree.
 */

type Store = {
  contacts: Contact[];
  deals: Deal[];
  moveDeal: (dealId: string, toStage: DealStage) => void;
  addContact: (partial: Omit<Contact, 'id' | 'orgId' | 'createdAt'>) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [deals, setDeals] = useState<Deal[]>(seedDeals);

  const value = useMemo<Store>(() => ({
    contacts,
    deals,
    moveDeal: (dealId, toStage) => {
      setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stage: toStage } : d)));
    },
    addContact: (partial) => {
      const c: Contact = {
        ...partial,
        id: `c_${Math.floor(Math.random() * 1e6)}`,
        orgId: 'org_acme',
        createdAt: new Date().toISOString()
      };
      setContacts((prev) => [c, ...prev]);
    }
  }), [contacts, deals]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const s = useContext(StoreContext);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
