import { useState } from "react";

const AfficherTousLesSondages = props => {

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
            tempsRestant : 0,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        
        {
            title : 'sondage3',
            description : 'ceci est le troisième sondage',
            tempsRestant : 3,
            option : ['option1' , 'option2' , 'option3' , 'option4']
        },
    ];

    return(
        <div className="h-fit w-[100vw] flex flex-col space-y-12 items-center justify-center bg-blue-100">
            {sondageData.map((el,index)=>{
                return(
                    <form className="bg-white rounded-xl shadow-xl">
                        <div>{el.title}</div>
                        <div>{el.description}</div>
                        <div>{el.tempsRestant}</div>
                        <div>{el.option.map((ele , id)=>{
                            return(
                                <div>{ele}</div>
                            )
                        })}
                        </div>
                        <button type="submit" className="bg-blue-400 rounded-full p-2">Valider</button>
                    </form>
                )
            })}
        </div>
    )
}
export default AfficherTousLesSondages;