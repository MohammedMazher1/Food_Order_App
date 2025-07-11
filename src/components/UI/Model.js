import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from "./Model.module.css"

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModelOverlay = props => {
    return <div className={classes.model}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const portalElement = document.getElementById('overlays')
const Model = props => {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<ModelOverlay >{props.children}</ModelOverlay>, portalElement)}
    </>
}
export default Model; 