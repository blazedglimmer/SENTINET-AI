'use client';

import { UserProfile } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Badge variant="secondary" className="mt-1 w-fit">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {user.bio && (
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}
      </CardContent>
    </Card>
  );
}
