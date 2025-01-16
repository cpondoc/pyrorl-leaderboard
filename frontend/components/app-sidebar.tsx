import { Upload, Trophy } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

interface AppSidebarProps {
  setActiveTab: (tab: 'upload' | 'leaderboard') => void
  activeTab: 'upload' | 'leaderboard'
}

export function AppSidebar({ setActiveTab, activeTab }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-4 py-2">Gym Visualizer</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('upload')} 
                  isActive={activeTab === 'upload'}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('leaderboard')} 
                  isActive={activeTab === 'leaderboard'}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

