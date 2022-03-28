const Voeu = (VoeuOrder , handleDrag , handleDrop) => {
    return(
        <div id={VoeuOrder}
        onDragOver={(ev) => ev.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}
        draggable={true}
        >{VoeuOrder}</div>
    )
}
export default Voeu;