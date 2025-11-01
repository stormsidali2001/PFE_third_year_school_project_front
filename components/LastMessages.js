import { forwardRef } from "react";
import { Mail } from "lucide-react";

const LastMessages = forwardRef(({open},ref)=>{
  
    return(
        <div ref={ref} className={`absolute font-roboto bg-white rounded-xl w-96 h-fit shadow-2xl flex flex-col right-0 bottom-0 translate-y-[102%] transition-all duration-200 origin-top ${open?'scale-100 opacity-100 visible':'scale-95 opacity-0 invisible'} z-50 border border-gray-100`}>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{backgroundColor: '#F4FCFF'}}>
                            <Mail className="w-5 h-5" style={{color: '#5375E2'}} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base" style={{color: '#1A2562'}}>Messages</h3>
                            <p className="text-xs" style={{color: '#999999'}}>50 non lus</p>
                        </div>
                    </div>
                    <span className="text-white rounded-full w-6 h-6 flex justify-center items-center text-xs font-bold flex-shrink-0" style={{backgroundColor: '#5375E2'}}>
                        50
                    </span>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex flex-col space-y-2 overflow-y-auto max-h-96 p-3">
                {/* Team Messages */}
                <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm" style={{color: '#1A2562'}}>Équipe</h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{backgroundColor: '#F4FCFF', color: '#5375E2'}}>
                            +25
                        </span>
                    </div>
                    <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <p className="text-sm mb-1" style={{color: '#000000'}}>
                            houda debza a accepté votre invitation. Une nouvelle équipe a été créée.
                        </p>
                        <p className="text-xs" style={{color: '#999999'}}>
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Team & Teachers Messages */}
                <div className="border-b border-gray-100 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm" style={{color: '#1A2562'}}>Équipe & Enseignants</h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{backgroundColor: '#F4FCFF', color: '#5375E2'}}>
                            +25
                        </span>
                    </div>
                    <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <p className="text-sm mb-1" style={{color: '#000000'}}>
                            houda debza a accepté votre invitation. Une nouvelle équipe a été créée.
                        </p>
                        <p className="text-xs" style={{color: '#999999'}}>
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
           
        </div>
    )
})
export default LastMessages;