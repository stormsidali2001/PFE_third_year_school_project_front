import Image from "next/image";
import { useRef } from "react";
import { useOutSideContainer } from "../custom hooks/useOutSideContainer";
import { Mail, Bell, User, LogOut, FileText } from "lucide-react";
import LastMessages from "./LastMessages";
import Notification from "./Notification";
import {useStoreActions, useStoreState} from '../store/hooks';
import Link from 'next/link'
import { useRouter } from "next/router";


const HorisontalNavbar = ({toastsRef}) => {
    const router = useRouter()
    const notificationRef = useRef(null);
    const lastMessagesRef = useRef(null);
    const profilRef = useRef(null)
    const user = useStoreState(store=>store.user)
    const {userType, student, teacher, entreprise, admin} = user;
    const entity = user[userType];
  
    const {open:openNotifications, setOpen:setOpenNotifications} = useOutSideContainer({ref:notificationRef});
    const {open:openlastMessages, setOpen:setOpenLastMessages} = useOutSideContainer({ref:lastMessagesRef});
    const {open:openProfileDropdown, setOpen:setOpenProfileDropdown} = useOutSideContainer({ref:profilRef});

    const {totalNotificationCount} = useStoreState(store=>store.notificationService)
    const {logoutThunk} = useStoreActions(store=>store.user)
  
    
    return ( 
        <div className="fixed z-50 top-0 left-0 right-0 w-full">
            <div className="backdrop-blur-md bg-white/80 h-16 flex flex-row justify-between px-8 items-center font-roboto shadow-sm">

                <Notification
                    open={openNotifications}
                    ref={notificationRef}
                    toastsRef={toastsRef}
                />
                <LastMessages
                    open={openlastMessages}
                    ref={lastMessagesRef}
                />

                <div className="flex flex-row gap-6 flex-1">
                    <div className="relative">
                        <button
                            className='w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center'
                            onClick={()=>setOpenProfileDropdown(v=>!v)}
                        >
                            <User className='w-6 h-6' style={{color: '#1A2562'}} strokeWidth={1.5} />
                        </button>
                        
                        <div className={`absolute top-14 left-0 w-56 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-50 ${
                            openProfileDropdown ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'
                        }`}
                            ref={profilRef}
                            style={{borderColor: '#5375E2', borderWidth: '1px'}}
                        >
                            <div className="px-4 py-3" style={{borderBottomColor: '#5375E2', borderBottomWidth: '1px'}}>
                                <p className="text-sm font-semibold" style={{color: '#1A2562'}}>Mon compte</p>
                            </div>
                            <div 
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors text-sm flex items-center gap-2"
                                style={{color: '#1A2562'}}
                                onClick={()=>{setOpenProfileDropdown(false);router.push(`/${user?.userType}s/${user[user?.userType].id}`)}}
                            >
                                <FileText className='w-4 h-4' strokeWidth={1.5} />
                                Profil
                            </div>
                            <hr style={{borderColor: '#5375E2', margin: '0', borderWidth: '1px'}}/>
                            <div
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors text-sm flex items-center gap-2"
                                style={{color: '#1A2562'}}
                                onClick={async()=>{setOpenProfileDropdown(false);await logoutThunk();router.push('/login')}}
                            >
                                <LogOut className='w-4 h-4' strokeWidth={1.5} />
                                Déconnexion
                            </div>
                        </div>
                    </div>
                  
                    <div className="h-8 w-px" style={{backgroundColor: '#5375E2'}}></div>
                  
                    <div className="flex flex-col justify-center">
                        {
                            userType === 'entreprise' ? (
                                <p style={{color: '#1A2562'}} className="font-semibold text-sm">{entity?.name}</p>
                            ) : (
                                <>
                                    <p style={{color: '#1A2562'}} className="font-semibold text-sm">{entity?.firstName} {entity?.lastName}</p>
                                    {userType && (
                                        <p style={{color: '#1A2562'}} className="text-xs opacity-70">{userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
                                    )}
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-row gap-2 items-center">
                    <button 
                        className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={()=>setOpenLastMessages(!openlastMessages)}
                        title="Messages"
                    >
                        <Mail className='w-5 h-5' style={{color: '#1A2562'}} strokeWidth={1.5} />
                    </button>
                    
                    <div className="relative">
                        <button 
                            className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                            onClick={()=>setOpenNotifications(!openNotifications)}
                            title="Notifications"
                        >
                            <Bell className='w-5 h-5' style={{color: '#1A2562'}} strokeWidth={1.5} />
                            {totalNotificationCount > 0 && (
                                <span className="absolute top-1 right-1 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold" style={{backgroundColor: '#5375E2'}}>
                                    {totalNotificationCount > 9 ? '9+' : totalNotificationCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default HorisontalNavbar;