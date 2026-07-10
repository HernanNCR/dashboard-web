import style from "./Dashboard.module.css"

function OthersComponents () {
    return(
        <div className={style.Jornada}>
            <article>
                <p>Agrega Jornada</p>
                <input type="text" placeholder={"Jornada x"} />
            </article>
        </div>
    )
}

export default OthersComponents;