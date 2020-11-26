import Navbar from '../components/core/employeeNav.js';
import InvoiceContent from '../components/InvoiceContent.js';
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

/*
 * This Page is accessible via 'localhost:8080/InvoicePage/:id', where 'id' is the
 * order number of the order you would like to generate an invoice for.
 */
function InvoicePage() {

    let { id } = useParams(); // Get the 'id' from the url parameter of the same name.

    //state to hold axios responses
    const [entries, setEntries] = useState(); // Lists the order retrieved from an axios call
    const [packingList, setPackingList] = useState([]); // List of parts in said order above.
    const [isLoading, setLoading] = useState(true); // Boolean denoting whether or not the page is ready to fully display its contents

    /*
     * Retrieves the order corresponding to the id passed through the parameter,
     * then gets all of the parts in that order, as well as appending the price
     * and weight information to every part in that order from the legacy data-
     * base.
     */
    const getData = async () => {
      //get order for main table
      await axios.get('http://localhost:8080/orders/GetCustomerOrderByID/' + id) // Get order by ID
        .then (function (response) {
          setEntries(response.data[0]) //Set 'entries' to this fetched order.

          axios.get('http://localhost:8080/orders/PartsInOrder/' + id) // Get all parts in the fetched order.
            .then(function (orderResponse) {
              orderResponse.data.forEach(part => { //For every part in this order, append it's price and weight from the legacy Database
                axios.get('http://localhost:8080/legacy/' + part.part_number)
                  .then(function (partResponse) {
                    part.price = partResponse.data[0].price;
                    part.weight = partResponse.data[0].weight
                    part.id = part.part_number
                    setPackingList(packingList => [...packingList, part])
                    setLoading(false)
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              })
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch (function (error) {
          console.log(error);
        })
        
    }
    useEffect(() => {
        getData()
    }, [])

    /*
     * This div is displayed whilst the page awaits for the
     * axios data.
     */
    if (isLoading) {
        return <div>
            <h1>Building Invoice For Order #{id}...</h1>
            <p>If you had time to read this, something has probably gone horribly wrong.</p>
        </div>
    }

    return (
        <div>
            <InvoiceContent data={entries} packingList={packingList} />
        </div>
    )
}

export default InvoicePage;