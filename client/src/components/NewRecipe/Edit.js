import './Form.css';
import '../Layout/Footer.css'
import FormTemplate from './FormTemplate';

function Edit() {
  return (
      <div className="Form" id="pageContainer">
        <div>
          <h1 className="edit-recipes-title">Edit Recipe:</h1>
          <form id="editForm" encType="multipart/form-data" method="PUT">
            <FormTemplate />
          </form>
        </div>
      </div>
  );
}

export default Edit;
