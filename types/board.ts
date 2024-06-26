export type Board = {
    id:string;
    name:string;
    created_date:Date;
    is_favorite:boolean
    color: Color
}

export type Color = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' |'orange' | 'amber' | 'yellow' | 'lime' | 'green' |  'emerald' | 'teal' | 'cyan' |  'sky' | 'blue' |'indigo' | 'violet' | 'purple' |'fuchsia' | 'pink' | 'rose' 
