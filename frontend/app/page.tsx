'use client'

import { useState } from 'react'
import { AppSidebar } from '../components/app-sidebar'
import { FileUpload } from '../components/file-upload'
import { Leaderboard } from '../components/leaderboard'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'leaderboard'>('upload')

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <SidebarInset className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Gym Environment Visualizer</h1>
          {activeTab === 'upload' ? <FileUpload /> : <Leaderboard />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

