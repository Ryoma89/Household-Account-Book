import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

export const subNavigation = [
  {
    name: 'Profile',
    icon: UserCircleIcon,
    href: '/settings/profile',
  },
  {
    name: 'Email',
    icon: EnvelopeIcon,
    href: '/settings/email',
  },
  {
    name: 'Password',
    icon: KeyIcon,
    href: '/settings/password',
  },
  {
    name: 'Logout',
    icon: ArrowLeftOnRectangleIcon,
    href: '/settings/logout',
  },
]