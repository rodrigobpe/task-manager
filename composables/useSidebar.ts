import {ClipboardList, LayoutDashboard,PanelsTopLeft} from 'lucide-vue-next'

export const useSidebar = () => {
    const sidebarMenuItems = ref([
        {path:'/',name:'Dashboard',icon:LayoutDashboard},
        {path:'/boards',name:'Boards',icon:PanelsTopLeft},
        {path:'/tasks',name:'Tarefas',icon:ClipboardList},
    ])

    return {sidebarMenuItems}
}