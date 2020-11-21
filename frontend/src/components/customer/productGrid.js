import React from 'react';
import ProductGridItem from './product.js';
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'

export default function ProductGrid(props) {

    const searchTerm = useSelector(state => state.search.term);

    function filterData(){
        if(searchTerm !== ""){
          let length = searchTerm.length
          let filtered = [];
          props.data.forEach(part => {
            if(part.description.substring(0, length) === searchTerm){
              filtered.push(part)
            }
          })
          return filtered
        }else{
            return props.data
        }
      }

    return(
      <Grid container spacing={2}>
        {filterData().map(part => {
          return (
            <div>
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