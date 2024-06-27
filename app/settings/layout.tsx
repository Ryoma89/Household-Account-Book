'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import Nav from '../components/layout/Nav'
import { subNavigation } from '@/constants/Nav'


// レイアウト
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <>
    <Nav />
    <Separator />
    <div className="sm:grid sm:grid-cols-3 sm:gap-3 p-10">
      <div className="hidden sm:col-span-1 text-sm space-y-1 font-bold sm:flex sm:flex-col">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-hover text-buttonPrimary'
              } hover:bg-hover px-3 py-2 rounded-full`}
            >
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
    </>
  )
}

export default SettingsLayout