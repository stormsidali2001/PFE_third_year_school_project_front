
const AfficherUnSondage = props => {
    const sondageData = [
        {
            title : 'sondage1',
            description : 'ceci est le premier sondage',
            tempsRestant : 1,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        {
            title : 'sondage2',
            description : 'ceci est le deuxième sondage',
            tempsRestant : 2,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        
        {
            title : 'sondage3',
            description : 'ceci est le troisième sondage',
            tempsRestant : 3,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
    ];
    return(
        <div className="h-fit w-[100vw] flex flex-col space-y-12 items-center justify-center bg-blue-100">
            {sondageData.map((el,index)=>{
                return(
                    <div className="bg-white rounded-xl shadow-xl">
                        <div>{el.title}</div>
                        <div>{el.description}</div>
                        <div>{el.tempsRestant}</div>
                        <div>{el.option}</div>
                    </div>
                )
            })}
        </div>
    )
}
export default AfficherUnSondage;