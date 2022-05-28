const Avatar = ({firstName , lastName , image}) => {


    const colors = ["bg-orange-100 , bg-blue-200 , bg-lime-100 , bg-red-200 , bg-green-100 , bg-cyan-100"]


    const chosenItem = colors[(colors.length-1)*Math.random()]


    return (
        <div>
            {
                image !== null ? <img src = {image} className='h-[35px] w-[35px] object-contain rounded-full shadow-md'/> : <div className={`h-[35px] w-[35px] rounded-full shadow-md ${chosenItem}`}></div>
            }
        </div>
    )
}
export default Avatar