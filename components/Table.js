const Table = ({data = [],extraColumns = [],handleClick})=>{
 
    if(data.length === 0) return <div>Aucune donnée</div>
    const columns = [...Object.keys(data[0]).filter(el=>el!=='id'),...extraColumns.map(el=>el.name)];
    return(
        <table className="   bg-[#282873]/10 backdrop-blur-[8px] shadow-lg  leading-normal h-fit p-4   w-[80vw]">
            <thead>
                <tr  className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">

                    {
                        columns.map(el=>{
                            return(
                                <th className="text-center">{el}</th>
                            )
                        })

                    }
                     
                </tr>
            </thead>

            <tbody className=" ">
                {
                    data.map(row=>{
                        return(
                            <tr  className=" bg-white/60  rounded-[10px] bg-white/60  border-red  border-b-2">
                               

                                {
                                    Object.keys(data[0]).filter(el=>el!=='id').map(col=>{
                                        return(
                                            <td className="text-center  h-[36px] ">
                                            

                                                {row[col]}
                                            
                                            </td>
                                        )
                                    })
                                }
                                {
                                    extraColumns.map(el=>{
                                        return(
                                        <td className="text-center  h-[36px] ">
                                              
                                             { 
                                                handleClick?(<el.Column onClick={(e)=>handleClick(row.id)}/>)
                                                :(
                                                    <el.Column {...row}/>
                                                )
                                             
                                             }
                                        </td>
                                        )
                                    })
                                }
                                
                                
                                
                              
                                
                            
                            </tr>
                        )
                    })
}

            </tbody>
        </table>
    )
}
export default Table;