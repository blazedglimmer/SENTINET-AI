'use client';
import { useUserProfile } from '@/hooks/use-user-profile';
import { ProfileCard } from '@/components/profile/profile-card';
import { ProfileEditor } from '@/components/profile/profile-editor';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function ProfilePage() {
  const { user, updateProfile } = useUserProfile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-4 flex flex-col mx-36 my-12">
      <Link href={'/'}>
        <ArrowLeft />
      </Link>

      <ProfileCard user={user} />
      <ProfileEditor user={user} onUpdate={updateProfile} />
    </div>
  );
}

export default ProfilePage;
