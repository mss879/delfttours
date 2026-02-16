'use client';

import { logout } from '../actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button variant="outline" size="sm" onClick={() => logout()}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
