import AdminSideDropdowns from "../adminSideDropdowns/AdminSideDropdowns.jsx";
import ContentForm from "../contentForm/ContentForm.jsx";

function AddNewContent(props) {
    return (
        <div className='addNewContent container'>
            <AdminSideDropdowns/>
            <ContentForm/>
        </div>
    );
}

export default AddNewContent;