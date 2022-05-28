import Avatar from "../../components/Avatar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import { useState } from "react"
import  Select  from "react-select"

const MyTeams = props => {

    const teams = [
        {
            id : 1,
            name : 'team5',
            teamLeader : {
                id : 5,
                firstName : 'chef',
                lastName : 'équipe',
                image : null
                
            },
            members : [
                {
                    id : 1,
                    firstName : 'student1',
                    lastName : 'etudiant1',
                    image : null
                },
                {
                    id : 5,
                    firstName : 'chef',
                    lastName : 'équipe',
                    image : null
                },
                {
                    id : 6,
                    firstName : 'membre',
                    lastName : 'membre5',
                    image : null
                },
                {
                    id : 7,
                    firstName : 'etudiant',
                    lastName : 'etudiante',
                    image : null
                }
            ]
        },
        {
            id : 1,
            name : 'team7',
            teamLeader : {
                id : 5,
                firstName : 'chef',
                lastName : 'équipe',
                image : null
            },
            members : [
                {
                    id : 1,
                    firstName : 'student1',
                    lastName : 'etudiant1',
                    image : null
                },
                {
                    id : 5,
                    firstName : 'chef',
                    lastName : 'équipe',
                    image : null
                },
                {
                    id : 6,
                    firstName : 'membre',
                    lastName : 'membre5',
                    image : null
                },
                {
                    id : 7,
                    firstName : 'etudiant',
                    lastName : 'etudiante',
                    image : null
                }
            ]
        },
        {
            id : 1,
            name : 'team6',
            teamLeader : {
                id : 5,
                firstName : 'chef',
                lastName : 'équipe',
                image : null
            },
            members : [
                {
                    id : 1,
                    firstName : 'student1',
                    lastName : 'etudiant1',
                    image : null
                },
                {
                    id : 5,
                    firstName : 'chef',
                    lastName : 'équipe',
                    image : null
                },
                {
                    id : 6,
                    firstName : 'membre',
                    lastName : 'membre5',
                    image : null
                },
                {
                    id : 7,
                    firstName : 'etudiant',
                    lastName : 'etudiante',
                    image : "/sondage.png"
                },
                {
                    id : 6,
                    firstName : 'membre',
                    lastName : 'membre5',
                    image : null
                },
                {
                    id : 7,
                    firstName : 'etudiant',
                    lastName : 'etudiante',
                    image : "/sondage.png"
                }
            ]
        }
    ]

    const [choosenPromotion , setChoosenPromotion] = useState(null)

    const promotions = [
        {
            id : 1,
            name : '1CPI'
        },
        {
            id : 1,
            name : '2CPI'
        },
        {
            id : 1,
            name : '1CS'
        },
        {
            id : 1,
            name : '2CS'
        },
        {
            id : 1,
            name : '3CS'
        }
    ]

    return(
        <div>
            
            <div className="h-screen w-screen bg-background text-black font-xyz flex flex-col space-y-10 items-center justify-center">
            <div className="flex flex-row space-x-4">
                <div className='text-[20px]'>Choisir une promotion :</div>
                <Select
                    placeholder="Promotion..." 
                    className="z-50 h-[40px] w-[230px] rounded-lg bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                    onChange={(option)=>{setChoosenPromotion(option)}}
                    options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                    value={choosenPromotion}
                    styles = {{menuPortal:base=>({...base,zIndex:500})}}
                />
            </div>
                <div className="flex flex-row gap-16">
                    {
                        teams.map ((el ,index) => {
                            return(
                                <div className="flex flex-col space-y-3 bg-gradient-to-b from-blue-50 to-blue-100 hover:bg-gradient-to-t h-[300px] w-[250px] rounded-lg border-2 border-slate-300 shadow-lg p-6 text-[15px] relative">
                                    <img src="/teamStudent.jpg" className="h-full object-contain mix-blend-darken opacity-20"/>
                                    <div className="absolute top-2 flex flex-col space-y-2">
                                        <div className="w-full text-center text-[17px]">{el.name}</div>
                                        {
                                            el.members.map((element) => {
                                                return (
                                                    <div className="flex flex-row items-center space-x-2">
                                                        <Avatar firstName={element.firstName} lastName={element.lastName} image={element.image}/>
                                                        <div className="text-black">{element.firstName}</div>
                                                        <div className="text-black">{element.lastName}</div>
                                                        {
                                                            element.id === el.teamLeader.id ? <div className="underline text-black italic">CF</div> : <div></div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="w-full flex justify-center">
                                            <button className="bg-blue-300 hover:bg-blue-400 rounded-full shadow-lg h-[30px] w-[180px]">Voir les documents</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default MyTeams