import React, { useEffect } from 'react'
import '../Styles/StylesTables.css'
function Tables({ SubTotalValue, GetTable, TablesDelete, PI, productInputData, ProductInfo, subTotal, DeleteGetTable, setDeleteGetTable }) {
    useEffect(() => {
        const keyPressHandler = (event) => {
            if (event.keyCode == 37) {
                document.getElementById('input1').focus()
            }
            if (event.keyCode == 9) {
                const info = Math.floor(Math.random() * 90000) + 10000;
                try {
                    fetch(`https://revinns-backed.vercel.app/v1/table`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ TableNumber: info }),
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setDeleteGetTable(!DeleteGetTable)
                            }
                        })
                } catch (err) {
                }
            }
            if (event.keyCode == 39) {
                document.getElementById('input2').focus()
            }

        }
        window.addEventListener('keydown', keyPressHandler)

        return () => {
            window.removeEventListener('keydown', keyPressHandler)

        }
    }, [DeleteGetTable])
    return (
        <>
            <table id="customers">
                <tr>
                    <th>Product ID</th>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Delete</th>
                </tr>
                {
                    GetTable.map((td, index) => <tr key={index}>
                        <td><input type='text' id="input1" placeholder='Product id' onChange={(e) => ProductInfo(e.target.value, index)} /></td>
                        <td><input placeholder='auto Description' defaultValue={productInputData[index]?.showData[0]?.Description} disabled
                        /></td>
                        <td><input placeholder='auto Price' defaultValue={productInputData[index]?.showData[0]?.UnitPrice} disabled /></td>
                        <td><input type='number'
                            placeholder='Quantity' id="input2"
                            onChange={(e) => subTotal(e.target.value, td._id, productInputData[index]?.showData[0]?.UnitPrice)} /></td>
                        <td><div>{(productInputData[index]?.showData[0] && PI) ? <span >{td?.total}</span> : '0'}</div></td>
                        <td><button onClick={() => TablesDelete(td?._id)}>Delete</button></td>
                    </tr>)
                }
            </table>
            total:{SubTotalValue}
        </>

    )
}

export default Tables