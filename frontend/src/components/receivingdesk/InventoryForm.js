import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import {useForm} from 'react-hook-form';
function InventoryForm(){
    // hook from react-hook-form library
    const {register, handleSubmit, errors} = useForm();
    
    // Handles the form when submitted
    const onSubmit = data => {
        console.log(data);
    };

    return(
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <form onSubmit={handleSubmit(onSubmit)}>
             Enter a description
             {/* register your input into the hook by invoking the "register" function */}
             <input type="text" id="Description" name="description" ref={register({required: true})}/>
             Enter quantity
             <input type="number" id="Qty" name="qty" ref={register({required: true})}/>
             <input type="submit"/>
             {/* errors will return when field validation fails */}
             {errors.description && <p>Must have a description</p>}
        </form>
    );
}
export default InventoryForm;