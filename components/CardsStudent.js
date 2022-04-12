import Team from "../icons/Team";

const CardsStudent = props => {
    const data = [
        {
            id : 1,
            title : 'Equipes :' ,
            composants : [
                {
                    composant : 'Complete :',
                    nombre : 5
                },
                {
                    composant : 'incomplete :',
                    nombre : 18
                }
            ]
        },
        {
            id : 1,
            title : 'Etudiants :' ,
            composants : [
                {
                    composant : 'Sans équipe :',
                    nombre : 5
                },
                {
                    composant : 'Avec équipe :',
                    nombre : 18
                }
            ]
        },
        {
            id : 1,
            title : 'Thème :' ,
            composants : [
                {
                    composant : 'Nombre total de thèmes :',
                    nombre : 5
                },
            ]
        },
        {
            id : 1,
            title : 'Invitation :' ,
            composants : [
                {
                    composant : 'Invitations envoyées :',
                    nombre : 18
                },
                {
                    composant : 'invitations reçus :',
                    nombre : 18
                }
            ]
        },
    ]
    return (
        <div className="lg:h-[100vh] p-[80px] flex flex-row items-center justify-center gap-12">
            {
                data.map((el,index)=> {
                    return(
                        <div className="h-[300px] w-[250px] flex flex-col justify-center border-2 rounded-lg border-zinc-600">
                            <div>{el.title}</div>
                            <div>{el.composants.map((element) =>{
                                return(
                                    <div className="flex flex-row space-x-2">
                                        <div>{element.composant}</div>
                                        <div>{element.nombre}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CardsStudent;