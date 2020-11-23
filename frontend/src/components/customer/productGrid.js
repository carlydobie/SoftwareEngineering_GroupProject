import React from 'react';
import ProductGridItem from './product.js';
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
/*
 *  Product Grid Component that renders and a grid 
 *  displaying all the product items. Implements search
 *  function that is connected to search bar through redux
 * 
 */
export default function ProductGrid(props) {
    //pull in state from redux to access the search bar term
    const searchTerm = useSelector(state => state.search.term);

    //filter the data based on the search bar term
    function filterData(){
        if(searchTerm !== ""){
          let filtered = [];
          props.data.forEach(part => {
            if(part.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
              filtered.push(part)
            }
          })
          return filtered
        }else{
            return props.data
        }
      }

    //render the grid by looping thru the filtered data
    //and displaying a grid item for each product
    return(
      <Grid container spacing={2}>
        {filterData().map((part, id) => {
          return (
            <div key={id}>
              <Grid item style={{ margin: '0.5vw' }}>
                <ProductGridItem 
                  number = {part.number} 
                  description = {part.description}
                  price = {part.price}
                  weight = {part.weight}
                  pictureURL = {part.pictureURL}
                  qty = {part.qty}
                />
              </Grid>
            </div>
          );
        })}
      </Grid>
    )
}