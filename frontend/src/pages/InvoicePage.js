import InvoiceContent from '../components/InvoiceContent.js';
import axios from 'axios';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function InvoicePage() {

    let { id } = useParams();

    //state to hold axios responses
    const [entries, setEntries] = useState();
    const [packingList, setPackingList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    //get data function, gets all orders, then loops thru orders to get all 
    //products ordered in that order, orders get stored in entries,
    //array of product objects stored in packingList list array
    const getData = async () => {
      //get order for main table
      await axios.get('http://localhost:8080/orders/GetCustomerOrderByID/' + id)
        .then (function (response) {
          setEntries(response.data[0])

          axios.get('http://localhost:8080/orders/PartsInOrder/' + id)
            .then(function (orderResponse) {
              orderResponse.data.forEach(part => {
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