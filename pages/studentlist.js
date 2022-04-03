import { useState } from "react";
import Table from "../components/Table";

const StudentList = props=>{
    const [data, setData] = useState([
        {
            id:1,
            firstName:"assoul",
            lastName:"sidali",
            dob:"12/12/12",
        },
      


    ]);
    const column = (
        <button className="bg-[#5375E2]/80 backdrop-blur-[8px]  font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">
        invite</button>
    )
    return(
        <div  className="bg-background min-h-screen flex justify-center py-8">
            <Table
                data={data}
                extraColumns = {[{column,name:"invite to team"}]}
            />
        </div>
    )
}

export default StudentList;