'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  Kanban,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  userEmail: string;
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/dashboard/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/dashboard/crm', label: 'CRM', icon: Kanban },
];

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-slate-200 rounded-lg p-2 shadow-sm"
      >
        <Menu className="w-5 h-5 text-slate-700" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0b2a3e] text-white z-50 flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Delft Admin
            </span>
          )}
          <button
            onClick={() => {
              if (mobileOpen) setMobileOpen(false);
              else setCollapsed(!collapsed);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:block"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'}
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-cyan-400' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`border-t border-white/10 p-4 ${collapsed ? 'px-2' : ''}`}>
          {!collapsed && (
            <p className="text-xs text-slate-400 truncate mb-3" title={userEmail}>
              {userEmail}
            </p>
          )}
          <form action="/admin/actions" method="POST">
            <button
              type="button"
              onClick={async () => {
                const { logout } = await import('@/app/admin/actions');
                logout();
              }}
              className={`
                flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors w-full
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span>Logout</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
