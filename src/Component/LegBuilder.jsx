import React, { useRef } from 'react'
import CreateLeg from './CreateLeg';

function LegBuilder() {

  const errorRef = useRef();
  const legRef = useRef();

  const handleSegments = (e)=>{
    e.preventDefault()
  const radioBtns=   document.getElementsByClassName('segmentBtn')
    for(let i=0; i< radioBtns.length;i++){
      radioBtns[i].classList.remove('active');
    }

    e.target.classList.add("active")

    if(e.target.children[0].value){
      document.getElementById('selectSegments').classList.remove('hide')
    }


  }

  const handleAddLeg = ()=>{
    let isValid = true;
    document.querySelectorAll('#selectSegments input').forEach((input)=>{
      if(input.value === ""){
        isValid = false
      }
    })

    if(isValid === false){
      errorRef.current.classList.remove('hide')
      errorRef.current.innerHTML = "All Inputs are mandatory";
      errorRef.current.style.color = "red"
      errorRef.current.style.textAlign = "center"
      return;
    }

    if(isValid){
      legRef.current.classList.remove('hide')

      document.querySelectorAll('#selectSegments select').forEach(item=>{
        item.style.backgroundColor = "#375a9e"
        item.style.color ="white"
        item.disabled = true;
      })

      document.querySelector('.buttons').classList.add('hide')
      document.querySelector('.segments').classList.add('hide')

    }


  }

  const handleCancel = ()=>{
    document.querySelectorAll('#segmentOptions label').forEach(item=> {
      item.classList.remove('active')
    })

    document.getElementById('selectSegments').classList.add('hide')
    errorRef.current.classList.add('hide')

    document.querySelectorAll('#selectSegments select').forEach(item=>{
      item.style.backgroundColor = "white"
      item.style.color ="black"
      item.disabled = false;
    })
  }

  const handleError = ()=>{
    errorRef.current.classList.add('hide')
  }



  const handleInputChange = (e)=>{
    if(Number(e.target.value) <0){
      e.target.value = 0
    }
  }

  return (
    <div className="legBuilder">
      <div className="segments">
        <h5>Select Segments</h5>
        <div id="segmentOptions" className='segmentOptions' onClick={handleSegments}>
          <label className="segmentBtn btnFutures"  htmlFor="futures">
            Futures
            <input value="1" className='hide' type="radio" name="segment" id="futures" />
          </label>
          <label className="segmentBtn btnOptions"  htmlFor="options">
            Options
            <input value="2" className='hide' type="radio" name="segment" id="options" />
          </label>
        </div>
      </div>

      <div id="selectSegments" className='hide'>

        <div className="info">
          <div>
            <h5>Total lot</h5>
            <input type="number" min="0" name="lot" id="lot" onFocus={handleError} onChange={handleInputChange} />
          </div>

          <div>
            <h5>Position</h5>
            <select name="positon" id="position">
              <option value="Sell">Sell</option>
              <option value="Buy">Buy</option>
            </select>
          </div>

          <div>
            <h5>Option Type</h5>
            <select name="optionType" id="optionType">
              <option value="Call">Call</option>
              <option value="Put">Put</option>
            </select>
          </div>

          <div>
            <h5>Expiry</h5>
            <select name="expiry" id="expiry">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div>
            <h5>Select Strike Criteria</h5>
            <select name="strikeCriteria" id="strikeCriteria">
              <option value="Straddle Width">Straddle Width</option>
              <option value="Straddle Width2">Straddle Width 2</option>
              <option value="Straddle Width3">Straddle Width 3</option>
            </select>
          </div>

          <div>
            [ATM Strike 
              <select name="posiNeg" id="posiNeg">
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
              (
                <input type="number" min="0" name="num" id="num" onFocus={handleError} onChange={handleInputChange} />
              X ATM Straddle Price)]
          </div>
        </div>
        <div ref={errorRef}>
        </div>

        <div className='buttons'>
          <button className='addLeg' onClick={handleAddLeg}>Add Leg</button>
          <button className='cancel' onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      <div ref={legRef} className="hide">
        <CreateLeg/>
      
      </div>
    </div>
  )
}

export default LegBuilder