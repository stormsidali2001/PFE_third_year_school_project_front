const NotificationIcon = props => {
    return (
<div className="relative w-fit h-fit  ">

<svg {...props} width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_337_9)">
<path d="M17.9996 0C14.817 0 11.7647 1.26428 9.51429 3.51472C7.26386 5.76516 5.99957 8.8174 5.99957 12V19.172L4.58557 20.586C4.30595 20.8657 4.11554 21.222 4.03841 21.6099C3.96127 21.9978 4.00088 22.3999 4.15222 22.7653C4.30356 23.1307 4.55984 23.443 4.88866 23.6628C5.21748 23.8826 5.60407 23.9999 5.99957 24H29.9996C30.3951 23.9999 30.7817 23.8826 31.1105 23.6628C31.4393 23.443 31.6956 23.1307 31.8469 22.7653C31.9983 22.3999 32.0379 21.9978 31.9607 21.6099C31.8836 21.222 31.6932 20.8657 31.4136 20.586L29.9996 19.172V12C29.9996 8.8174 28.7353 5.76516 26.4849 3.51472C24.2344 1.26428 21.1822 0 17.9996 0V0ZM17.9996 32C16.4083 32 14.8822 31.3679 13.7569 30.2426C12.6317 29.1174 11.9996 27.5913 11.9996 26H23.9996C23.9996 27.5913 23.3674 29.1174 22.2422 30.2426C21.117 31.3679 19.5909 32 17.9996 32Z" fill="#03045E"/>
</g>
<defs>
<filter id="filter0_d_337_9" x="0" y="0" width="35.999" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_337_9"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_337_9" result="shape"/>
</filter>
</defs>
</svg>
</div>

    )
}
export default NotificationIcon;