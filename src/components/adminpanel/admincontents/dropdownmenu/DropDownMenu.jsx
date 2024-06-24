import "./dropdownmenu.style.scss"

const DropDownMenu = ({valueSelected,chooseSection,title="",render,edit=false}) => {

 return (

   <div>

     <label>
       <select onChange={(e)=>render(e.target.value)}>

        {<option hidden>{title}</option>}
           {/* eslint-disable-next-line react/prop-types */}
        {chooseSection?.map(({title, id})=>{
          if(title == valueSelected) return <option selected key={id} value={title}>{title}</option>
          if(edit) return <option key={id} value={title}>{title}</option>
           return title == "Բոլորը"?<option key={id} disabled value={title}>{title}</option>:<option key={id} value={title}>{title}</option>
            
        })}

       </select>

     </label>
   </div>

 );

};

export default DropDownMenu