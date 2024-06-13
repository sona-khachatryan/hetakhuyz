import "./manyviewsslice.style.scss"

const ManyViewsSlice = ({data:{country,title,description},count}) => {
    
    return (
    <>
    <div className="many_views_slice_container">
        <div className="many_views_slice_count">
            <div><p>{count}</p></div>
        </div>
        <div className="many_views_slice_about">
            <h3>{country?.title}</h3>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>
        {count == 3 ||<hr />}
    </>
  )
}

export default ManyViewsSlice