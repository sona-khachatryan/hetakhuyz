import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './richeditor.style.scss'


const RichEditor = ({value,setValue,click,btnValue = "Add new content"}) => {
  const modules = {
            toolbar:[
                [{ 'header': [2, 3, false] }],
                ['bold', 'italic', 'underline'],  
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ align: 'center' }, { align: 'justify' },{ align: '' },  { align: 'right' }],
                ['link','image'],
              ]
            }

  return (
    <div className='quill_container'>
      <ReactQuill theme="snow" value={value} onChange={setValue}  modules={modules} placeholder='Type there....'/> 
      <button onClick={(click)}>{btnValue}</button>
    </div>
  )
}

export default RichEditor