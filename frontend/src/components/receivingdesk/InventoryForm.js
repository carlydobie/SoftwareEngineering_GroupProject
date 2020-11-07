import React from 'react'
import FormControl from '@material-ui/core/FormControl'

function InventoryForm(){
    return(
        <FormControl>
             <input type="text" id="fname" name="fname"/>Enter
             <input type="text" id="lname" name="lname"/>Enter
        </FormControl>
    );
}
export default InventoryForm;