'use client';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  {
    href: '/',
    icon: Icons.homeIcon,
    label: 'Home',
  },
  {
    href: '/history',
    icon: Icons.sandGlassHistoryIcon,
    label: 'History',
  },
  {
    href: '/discover',
    icon: Icons.fluentGlobeIcon,
    label: 'Discover',
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 md:relative md:h-screen md:w-[72px] md:flex-col md:justify-start md:border-r md:px-3 md:py-8">
      <div className="md:mb-8">
        <Icons.logo className="h-8 w-8 dark:invert hidden sm:block" />
      </div>
      <div className="flex w-full h-full items-center justify-around sm:justify-center gap-6 md:flex-col md:space-y-6">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 transition-colors hover:text-foreground',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-6 w-6 dark:invert" />
              <span className="text-xs font-medium sm:hidden">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="hidden md:mt-auto md:flex flex-col gap-6">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Icons.siAddIcon className="h-5 w-5 dark:invert" />
        </button>
        <Avatar>
          <AvatarImage
            src="https://akshayshinde.com/Akshay1.JPEG"
            alt="@folklore"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
