import HorisontalNavbar from '../../components/HorisontalNavbar'
import AdminVerticalNavbar from '../../components/AdminVerticalNavbar'
import { useState } from 'react'
import Select from 'react-select'
const listesoutenance = props => {

    const [choosenPromotion , setChoosenPromotion] = useState(null)
    const soutenances = [
        {
            id : 1,
            title : "soutenacePFE",
            description : "la soutenance de l'équipe n ch pas quoi",
            promotion : "1CS",
            date : "24/06/2022",
            salle : "salle 05",
            team : "team5",
            jury : [
                {
                    id : 1,
                    firstname : "prof1",
                    lastname : 'teacher1'
                },
                {
                    id : 1,
                    firstname : "prof2",
                    lastname : 'teacher2'
                },
                {
                    id : 1,
                    firstname : "prof3",
                    lastname : 'teacher3'
                }
            ]
        },
        {
            id : 1,
            title : "soutenaceMadrasaTic",
            description : "la soutenance de l'équipe n ch pas quoi",
            promotion : "1CS",
            date : "24/06/2022",
            salle : "salle 05",
            team : "team5",
            jury : [
                {
                    id : 1,
                    firstname : "prof1",
                    lastname : 'teacher1'
                },
                {
                    id : 1,
                    firstname : "prof2",
                    lastname : 'teacher2'
                },
                {
                    id : 1,
                    firstname : "prof3",
                    lastname : 'teacher3'
                }
            ]
        },
        {
            id : 1,
            title : "soutenaceElearn",
            description : "la soutenance de l'équipe n ch pas quoi",
            promotion : "1CS",
            date : "24/06/2022",
            salle : "salle 05",
            team : "team5",
            jury : [
                {
                    id : 1,
                    firstname : "prof1",
                    lastname : 'teacher1'
                },
                {
                    id : 1,
                    firstname : "prof2",
                    lastname : 'teacher2'
                },
                {
                    id : 1,
                    firstname : "prof3",
                    lastname : 'teacher3'
                }
            ]
        },
    ]

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


    return (
        <div className='min-h-screen h-fit w-screen bg-background'>
            <div className="pt-[100px] sm:pl-[100px]font-xyz text-textcolor flex flex-col items-center justify-center p-24 space-y-12">
                <div className="text-[32px]">Liste des soutenances</div>
                <div className='flex flex-row items-center justify-center space-x-6'>
                    <div className='text-[20px] md:flex hidden'>Choisir une promotion :</div>
                    <Select
                        placeholder="Promotion..." 
                        className="z-50 h-[40px] w-[230px] rounded-lg bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                        onChange={(option)=>{setChoosenPromotion(option)}}
                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                        value={choosenPromotion}
                        styles = {{menuPortal:base=>({...base,zIndex:500})}}
                    />
                </div>
                <div className="flex flex-wrap gap-24">
                    {
                        soutenances.map((el , index) => {
                            return (
                                <div className="bg-gradient-to-b hover:bg-gradient-to-t from-blue-50 to-blue-300 rounded-md border-2 ease-linear border-slate-300 h-[350px] w-[300px] relative">
                                    <img src="/creerSoutenance.jpg" className="h-[350px] object-contain mix-blend-darken opacity-20"/>
                                    <div className="flex flex-col px-6 justify-center h-full w-full space-y-3 absolute top-0 text-[18px]">
                                        <div className='text-center w-full text-[22px]'>{el.promotion}</div>
                                        <div>Titre : {el.title}</div>
                                        <div>Description :{el.description}</div>
                                        <div>Equipe :{el.team}</div>
                                        <div>Date :{el.date}</div>
                                        <div className='w-full flex items-center justify-center'>
                                            <button className="h-[35px] w-[150px] rounded-full shadow-lg bg-blue-300 hover:bg-blue-400">Voir plus</button>
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
export default listesoutenance