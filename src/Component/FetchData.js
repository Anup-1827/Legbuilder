import React from 'react'
import { BASE_URL } from '../config';

function FetchData(props) {
    const {listJson, setListJson} = props;

    const fetchData = ()=>{

      fetch(BASE_URL)
      .then(res=> res.json())
    .then(result=> {
      const list = []
      for(let key in result){
        list.push(result[key])
      }
      list.reverse();
      setListJson(list)
    })
    .catch(err=> console.log(err))
    }

  return (
    <div className='fetchData'>
        <div>
            <button className='addLeg' onClick={fetchData}>Fetch Data</button>
        </div>

        <div className='dataList'>
          {
            listJson?.map(list=>{
              return(
                <pre>
                { JSON.stringify(list,null, 4)},
               </pre>
              )
            })
          }
        </div>

    </div>
  )
}

export default FetchData