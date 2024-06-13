import "./livestreamslice.style.scss"

const LiveStreamSlice = ({url,title}) => {
  
  return (
    <div className="live_stream_slice">
        <div ></div>
        <iframe src={url}></iframe>
        <h3>{title}</h3>
        <h4>Ուղիղ եթեր</h4>
    </div>
  )
}

export default LiveStreamSlice