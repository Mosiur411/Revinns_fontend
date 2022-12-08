import { useEffect, useState } from 'react';
import Tables from './components/Layout/Tables';
function App() {
  const [GetProduct, setGetProduct] = useState([])
  const [DeleteGetTable, setDeleteGetTable] = useState(false)
  const [GetTable, setGetTable] = useState([])
  const [productInputData, setProductInputData] = useState([])
  const [PI, setPI] = useState()
  const [SubTotalValue, setSubTotalValue] = useState(0)


  /* ================ my product get ==============  */
  const DataGet = () => {
    fetch("https://revinns-backed.vercel.app/v1/product")
      .then(res => res.json())
      .then(data => {
        try {
          setGetProduct(data)
        } catch (err) {
          console.log(err)
        }
      })
  }
  /* ================ table info click tab ==============  */
  const TableGet = () => {
    fetch("https://revinns-backed.vercel.app/v1/table")
      .then(res => res.json())
      .then(data => {
        try {
          setGetTable(data)
        } catch (err) {
          console.log(err)
        }
      })
  }
  /* ================ table info delete  ==============  */
  const TablesDelete = (id) => {
    if (id) {
      fetch(`https://revinns-backed.vercel.app/v1/table?prodId=${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            setDeleteGetTable(!DeleteGetTable)
          }
        })
    }
  }
  /* ================ subTotal and total prices   ==============  */
  const subTotal = (value, id, UnitPrice) => {
    if (!UnitPrice) {
      alert('Plz product Id')
    }
    setPI(value)
    const number = Number(UnitPrice) * Number(value)
    if (number) {
      fetch(`https://revinns-backed.vercel.app/v1/table?prodId=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: number }),
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            console.log(data)
            setDeleteGetTable(!DeleteGetTable)
            setSubTotalValue(data?.result?.total + SubTotalValue)
          }
        })
    }
  }
  /* ============= side effect product and table data ===============  */
  useEffect(() => {
    TableGet()
    DataGet()
  }, [DeleteGetTable])

  /* ============= product id info return  ===============  */
  const ProductInfo = (id, index) => {
    const showData = GetProduct?.filter(pd => pd?.ProductID === id)
    if (showData[0]?.ProductID) {
      setProductInputData([...productInputData, { showData: showData }])
    } else {
      setProductInputData([...productInputData])
    }
  }
  return (
    <div>
      {/* =========== single table =============  */}
      <Tables SubTotalValue={SubTotalValue} PI={PI} DeleteGetTable={DeleteGetTable} setDeleteGetTable={setDeleteGetTable} GetTable={GetTable} ProductInfo={ProductInfo} subTotal={subTotal} productInputData={productInputData} TablesDelete={TablesDelete} />
    </div>
  );
}

export default App;
