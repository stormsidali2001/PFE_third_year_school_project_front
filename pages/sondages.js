import { useState } from "react";
import AfficherTousLesSondages from "../components/AfficherTousLesSondages";
import CreerSondage from "../components/CreerSondage";
import Sondage from "../components/Sondage";
//<AfficherTousLesSondages/>
//<CreerSondage title={title} setTitle={setTitle} description={description} setDescription={setDescription} duree={duree} setDuree={setDuree} options={options} setOptions={setOptions} toastsRef={toastsRef}/>
//<Sondage title={title} description={description} duree={duree} options={options}/>
const sondages = ({toastsRef}) => {
    const [title,setTitle] = useState('Titre');
    const [description , setDescription] = useState('Ajoutez une description');
    const [duree , setDuree] = useState(1);
    const [options , setOptions] = useState(['option1' , 'option2', 'option1' , 'option2','option1' , 'option2','option1' , 'option2','option1' , 'option2']);
    const n = 3
    return (
        <div>
            <Sondage title={title} description={description} duree={duree} options={options} n={n}/>
        </div>
    )
}
export default sondages;