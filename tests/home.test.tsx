import { render, screen } from '@testing-library/react';

import { expect, vi, test } from 'vitest';
import Home from '../app/page';

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((res) => res({ userId: '2321312' })),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: '2321312',
        fullName: 'John Doe',
      }
    })
  }
})

test('Home page includes text', async () => {
  render(await Home());

  expect(screen.getByText('Journal Mood App AI')).toBeTruthy();
});