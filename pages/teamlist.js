import { useState } from "react";
import Table from "../components/Table";

const teamList = props=>{
    const [data, setData] = useState([
        {
            id:1,
            nickName:"team0",
            leader:"sidali assoul",
            members:5
        },
        {
            id:2,
            nickName:"team1",
            leader:"houda debza",
            members:5
        },
        {
            id:3,
            nickName:"team2",
            leader:"kach bnadem",
            members:5
        },
        {
            id:4,
            nickName:"team3",
            leader:"kach bnadem",
            members:5
        }


    ]);
    const column = (
        <button className="bg-[#5375E2]/80 backdrop-blur-[8px]  font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">
        Join</button>
    )
    return(
        <div className="bg-background min-h-screen flex justify-center py-8">
            <Table
                data= {data}
                extraColumns = {[{column,name:"join team"}]}
            />
        </div>
    )
}

export default teamList;