import Invitation from "../icons/Invitation";
import Menu from "../icons/Menu";

import Theme from "../icons/Theme";
import Link from 'next/link'
import SpeakerIcon from "../icons/SpeakerIcon";
import ModalPortal from "./ModalPortal";
import {useState} from 'react'
import ListIcon from "../icons/ListIcon";
import TeamIcon from "../icons/TeamIcon";
import { useStoreActions, useStoreState } from "../store/hooks";
import ChatIcon from "../icons/ChatIcon";
import { useRouter } from "next/router";
import OrderIcon from "../icons/OrderIcon";


const StudentVerticalNavbar = () => {
    const router = useRouter()
    const user = useStoreState(store=>store.user)
    const {student,userType} = user;
    
    
    const [announcementChoiceOpen , setAnnouncementChoiceOpen] = useState(false)
    const [surveyChoiceOpen , setSurveyChoiceOpen] = useState(false)
   

  const hasTeam = student?.team;
  const isTeamLeader =hasTeam &&( user.student?.team?.teamLeader?.id === user.student?.id);
  const hanleAnnouncementClick = e =>{
    e.preventDefault();
    if(isTeamLeader){
      
        setAnnouncementChoiceOpen(!announcementChoiceOpen);setSurveyChoiceOpen(false)
    }else{
        router.push("/announcementlist");
    }
    
  }
  const hanleSurveyClick = e =>{
    e.preventDefault();
    if(isTeamLeader){
        setSurveyChoiceOpen(!surveyChoiceOpen);setAnnouncementChoiceOpen(false)
    }else{
        router.push("/surveys");
    }
    
  }

  const  wishListSent = user?.student.promotion.wishListSent
  console.log('55555',wishListSent)
  return (
    <>
    <ModalPortal
        open={announcementChoiceOpen}
        handleClose={()=>setAnnouncementChoiceOpen(false)}

    >
        <div className="flex flex-col text-textcolor space-y-4">
            <div className="text-semibold text-[20px]">Announcements:</div>
            <div className="px-4">
                Vous voulez consulter la liste des announcement ou bien vous voulez creer un nouveau ?
            </div>
            <div className="flex space-x-4 w-fit mx-auto">
          <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px]  cursor-pointer hover:bg-blue-300"><Link href='/addannouncement'>creer</Link></div>
                <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-blue-300"><Link href='/announcementlist'>naviguer</Link></div>
            </div>
        </div>
    </ModalPortal>
    {/*SURVEY */}
    <ModalPortal
        open={surveyChoiceOpen}
        handleClose={()=>{setSurveyChoiceOpen(false)}}

    >
        <div className="flex flex-col text-textcolor space-y-4">
            <div className="text-semibold text-[20px]"> Sondages:</div>
            <div className="px-4">
                Vous voulez consulter la liste des sondages ou bien vous voulez creer un nouveau ?
            </div>
            <div className="flex space-x-4 w-fit mx-auto">
            <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px]  cursor-pointer hover:bg-blue-300"><Link href='/createsurvey'>creer</Link></div>
                <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-blue-300"><Link href='/surveys'>naviguer</Link></div>
            </div>
        </div>
    </ModalPortal>
    <div className="fixed h-[80vh] left-0 z-50 top-[50%] -translate-y-1/2  drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)]  flex flex-col justify-center space-y-4 border-2 bg-white rounded-tr-[100px]  rounded-br-[100px]">
       
            
           
           
              <div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Dashboard</div>
                    <Link href="/studentdashboard" >
                    
                        <button><Menu className='hover:cursor-pointer' /></button>
                    </Link>

                </div>
              
              {  hasTeam&&<div className='relative cursor-pointer group'
                    onClick={hanleAnnouncementClick}
                >
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Announcements</div>
                         <SpeakerIcon className='hover:cursor-pointer text-[#03045E] w-[39px] h-[40px]' />

                </div>}

              { hasTeam&& <div className='relative cursor-pointer group'
                    onClick={hanleSurveyClick}
                >
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Sondages</div>
                         <ListIcon className='hover:cursor-pointer text-[#03045E] w-[39px] h-[40px]' />

                </div>}
                
            {  hasTeam&&  <div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Documents Equipe</div>
                    <Link href="/teamdocs" >
                    
                        <button><Theme className='hover:cursor-pointer' /></button>
                    </Link>

                </div>}
                {  hasTeam&&  <div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Chat</div>
                    <Link href="/chat" >
                    
                        <button><ChatIcon className='hover:cursor-pointer w-[40px] h-[39px] text-[#03045E]' /></button>
                    </Link>

                </div>}

                {(!hasTeam || isTeamLeader)&&<div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Inviter</div>
                    <Link href="/studentlist" >
                    
                        <button><Invitation className='hover:cursor-pointer' /></button>
                    </Link>

                </div>}
        {   !hasTeam&&  <div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Invitation recues</div>
                    <Link href="/teamInvitation" >
                    
                       <TeamIcon className='hover:cursor-pointer' />
                    </Link>

                </div>}
                {   hasTeam&& isTeamLeader&& wishListSent&&  <div className='relative cursor-pointer group'>
                    <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Fiche de voeux</div>
                    <Link href="/fichevoeux" >
                    
                       <OrderIcon className='hover:cursor-pointer w-[39px] h-[40px] text-textcolor' />
                    </Link>

                </div>}
                      
    </div>
    </>
  )
}
export default StudentVerticalNavbar;