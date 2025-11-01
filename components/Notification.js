import React, { forwardRef } from "react";
import { useStoreState } from "../store/hooks";
import { Bell, Trash2 } from "lucide-react";


const Notification = forwardRef(({open,toastsRef},ref)=>{
    const {notifications,totalNotificationCount} = useStoreState(store=>store.notificationService)
  
    return(
        <div ref={ref} className={`absolute font-roboto bg-white rounded-xl w-96 h-fit shadow-2xl flex flex-col right-0 bottom-0 translate-y-[102%] transition-all duration-200 origin-top ${open?'scale-100 opacity-100 visible':'scale-95 opacity-0 invisible'} z-50 border border-gray-100`}>
          
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{backgroundColor: '#F4FCFF'}}>
                            <Bell className="w-5 h-5" style={{color: '#5375E2'}} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base" style={{color: '#1A2562'}}>Notifications</h3>
                            <p className="text-xs" style={{color: '#999999'}}>{totalNotificationCount} nouvelles</p>
                        </div>
                    </div>
                    {totalNotificationCount > 0 && (
                        <span className="text-white rounded-full w-6 h-6 flex justify-center items-center text-xs font-bold flex-shrink-0" style={{backgroundColor: '#5375E2'}}>
                            {totalNotificationCount > 9 ? '9+' : totalNotificationCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="flex flex-col space-y-2 overflow-y-auto max-h-96 p-3">
                {notifications.length > 0 ? (
                    notifications.map(({description,id,createdAt})=>{
                        return(
                            <div key={id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <p className="text-sm mb-1" style={{color: '#000000'}}>
                                    {description}
                                </p>
                                <p className="text-xs" style={{color: '#999999'}}>
                                    {new Date(createdAt).toLocaleString()}
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <div className="py-8 text-center">
                        <p style={{color: '#999999'}} className="text-sm">Aucune notification</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            
        </div>
    )
})
export default Notification;