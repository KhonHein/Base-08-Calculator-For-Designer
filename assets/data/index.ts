export type Degit = {
    name:string;
    value:number | string,
    color:string;
    bgcolor:string;
    disabled:boolean;
}
export const row1 :Degit[] = [
    {
        name:'AC',
        value:'AC',
        color:'white',
        bgcolor:'#0B192C',
        disabled:false,
    },
    {
        name:'÷',
        value:'÷',
        color:'white',
        bgcolor:'#0B192C',
        disabled:false,
    },
    {
        name:'✕',
        value:'✕',
        color:'red',
        bgcolor:'#0B192C',
        disabled:false,
    },
    {
        name:'®️',
        value:'®️',
        color:'green',
        bgcolor:'white',
        disabled:false,
    },
];
export const row2 :Degit[] = [
    {
        name:'7',
        value:7,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'8',
        value:8,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'9',
        value:9,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'x',
        value:"x",
        color:'white',
        bgcolor:'#FF6500',
        disabled:false,
    },
];
export const row3 :Degit[] = [
    {
        name:'4',
        value:4,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'5',
        value:5,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'6',
        value:6,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'-',
        value:'-',
        color:'white',
        bgcolor:'#FF6500',
        disabled:false,
    },
];

export const row4 :Degit[] = [
    {
        name:'1',
        value:1,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'2',
        value:2,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'3',
        value:3,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'+',
        value:'+',
        color:'white',
        bgcolor:'#FF6500',
        disabled:false,
    },
];
export const row5 :Degit[] = [
    {
        name:'ⅰ',
        value:"ⅰ",
        color:'white',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'0',
        value:0,
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'.',
        value:'.',
        color:'#FF6500',
        bgcolor:'#1E3E62',
        disabled:false,
    },
    {
        name:'=',
        value:'=',
        color:'white',
        bgcolor:'#FF6500',
        disabled:false,
    },
];

export  const STORAGE_DESIGNER_KEY = "designer_calculator_history";
export  const STORAGE_KEY = "calculator_history";

export const warning1 = [
    {
        status:'⚠️',
        describion:'Overcharging or undercharging.',
    },
    {
        status:'⚠️',
        describion:'Miscalculations in costs.',
    },
    {
        status:'⚠️',
        describion:'Damaged reputation or financial loss.',
    },
    
]
export const warning2 = [
    {
        status:'⚠️',
        describion:'This calculator is your trusted tool for design work only.',
    },
    {
        status:'⚠️',
        describion:'Use it wisely for creative and measurement purposes in your projects.',
    },
    {
        status:'⚠️',
        describion:'When it comes to handling finances, always rely on standard calculators or professional accounting software to avoid costly mistakes.',
    },
    
]
export const warning3 = [
    {
        status:'⚠️',
        describion:'Do not use this calculator for cash transactions or business billing!',
    },
    {
        status:'⚠️',
        describion:'It’s a specialized tool for designers, not for general-purpose or financial use.',
    },
    {
        status:'⚠️',
        describion:'Misuse could result in significant issues, including financial losses.',
    },
    {
        status:'⚠️',
        describion:'Stay cautious and use the right tool for the right task!',
    },
]
export const developed = [
    {
        status:'▶',
        describion:`I'm Sai Khon Hein who developed this application to be able to calculate for base-8 numeric 🙎‍♂️.`,
    },
    {
        status:'▶',
        describion:'All of you can use this application for fully free 😊.',
    },
    {
        status:'▶',
        describion:'But I wish you to follow my warning described on above ⚠️.',
    },
    {
        status:'▶',
        describion:'Make your design more easy using with my application💕',
    },
]