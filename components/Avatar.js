const Avatar = ({firstName , lastName , image}) => {


    const colors = ["bg-orange-100" , "bg-yellow-100" , "bg-pink-200" , "bg-lime-100" , "bg-red-200" , "bg-green-100" , "bg-cyan-100"]


    const chosenItem = colors[Math.floor((colors.length-1)*Math.random())]
    

    return (
        <div>
            {
                image !== null ? <img src = {image} className='h-[23px] w-[23px] object-contain rounded-full shadow-md'/> : <div className={`h-[23px] w-[23px] rounded-full shadow-md ${chosenItem} flex flex-row  text-[10px] items-center justify-center`}>
                    <div className="uppercase">{firstName.charAt(0)}</div>
                    <div>{lastName.charAt(0)}</div>
                </div>
            }
        </div>
    )
}
export default Avatar