import Team from "../icons/Team";

const CardsStudent = props => {
    const data = [
        {
            id : 1,
            title : 'Equipes :' ,
            url : "teamStudent.jpg",
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
            url : "stdStudent.jpg",
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
            url : "themeStudent.jpg",
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
            url : "joinStudent.jpg",
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
        <div className="lg:h-[100vh] p-[80px] flex flex-row items-center justify-center gap-12 font-xyz">
            {
                data.map((el,index)=> {
                    return(
                        <div className="h-[300px] hover:h-[310px] hover:w-[260px] w-[250px] flex flex-col items-center bg-gradient-to-b hover:from-slate-400 hover:to-slate-600 from-slate-300 to-slate-500  border-2 rounded-lg border-zinc-600 relative text-gray-900">
                            <div className="  h-full w-full"> 
                                <img src = {el.url} className="object-contain h-full w-full mix-blend-darken opacity-50"/>
                            </div>
                            <div className="absolute space-y-6 mt-6 flex items-center justify-center flex-col">
                                <div className="text-[25px]">{el.title}</div>
                                <div>{el.composants.map((element) =>{
                                    return(
                                        <div className="flex flex-row space-x-1">
                                            <div className="text-[20px] truncate max-w-[220px]">{element.composant}</div>
                                            <div className="text-[20px]">{element.nombre}</div>
                                        </div>
                                    )
                                })}</div>
                                <button className="h-[35px] w-[130px] text-[20px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}
export default CardsStudent;