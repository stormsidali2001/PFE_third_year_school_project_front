import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import Link from "next/link";
import { data } from "autoprefixer";
import { useStoreActions } from "../../store/hooks";
import { useEffect } from "react";

const theme = props => {
   
    
  
    useEffect(async()=>{
        await getAllPromotionsThunk()
        if(!promotion || promotion?.length === 0) {
            await getThemeSuggestionsThunk()
            return;
        }
        const label = promotions.find(el=>el.id=== promotion)?.name
        if(!label) {
            await getThemeSuggestionsThunk()
            return ;
        }
        setChoosenPromotion({value:promotion,label})
        await getThemeSuggestionsThunk(promotion)

    },[promotion])
   
    const handleChange = async option=>{
      
        router.push(`/suggestions?promotion=${option.value}`)
       
    }
    if(data.length === 0) return <div>Aucune donnée</div>
   const columns = [...Object.keys(data[0]).filter(el=>el!=='id')];

    return (
       <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor">
                <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
                <div className="flex flex-row space-x-72 items-center justify-center pt-10">
                <div className="text-[30px]">Liste des thèmes</div>
                   
                 </div>
                <table className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg  leading-normal h-fit p-4   w-[80vw]">
                    <thead>
                        <tr  className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">
                            {
                               
                                columns.map(el=>{
                                    return(
                                        <th className="text-center">{el}</th>
                                    )
                                })
                               
                               
                            }     
                             <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            data.map(row=>{
                                return(
                                    <tr  className=" bg-white/60  rounded-[10px] border-red  border-b-2">
                                        {
                                            Object.keys(data[0]).filter(el=>el!=='id').map(col=>{
                                                return(
                                                    <td className="text-center truncate h-[36px] ">
                                                        {row[col]}
                                                    </td>
                                                )
                                            })
                                        }
                                        <td className="flex items-center justify-center">
                                            <Link href={`/theme/${row.id}`}><button className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
       </div>
    )
}
export default theme;