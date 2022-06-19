const OutLinedButton = ({className,children,...otherProps})=>{

    return (
        <button {...otherProps} className={'h-[35px] w-[150px]  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg text-center '+className}>{children}</button>
    )
}

export default OutLinedButton;