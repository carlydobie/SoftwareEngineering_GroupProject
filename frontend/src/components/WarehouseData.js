import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

export default function WarehouseData() {
    const columns = [
    { label: "ID", name: "customer_number"},
    { label: "Customer Name", name: "name"},
    { label: "E-Mail", name: "email"},
    { label: "Street Address", name: "address"},
    { label: "Credit Card #", name: "cc"},
    { label: "Expiration Date", name: "exp"}
    ];
    const [entries, setEntries] = useState([]);

    const getData = async () => {
    await axios.get('http://localhost:8080/JARGet')
    .then(function (response) {
      // handle success
      setEntries(response.data)
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

    useEffect(() => {
        getData()

    }, [])

    let data = Array.from(entries);
    console.log(data);

    return (
        <div>
            <MUIDataTable
                title={"Temp List"}
                data={data}
                columns={columns}
            />
        </div>
    )

}