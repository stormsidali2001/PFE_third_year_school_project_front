import AfficherUnSondage from "../components/AfficherUnSondage";
import CreerSondage from "../components/CreerSondage";
//<AfficherUnSondage/>
//<CreerSondage toastsRef={toastsRef}/>
const sondages = ({toastsRef}) => {
    return (
        <div>
          <CreerSondage toastsRef={toastsRef}/>
        </div>
    )
}
export default sondages;