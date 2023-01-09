import React from 'react'

function LegBuilder() {
  const handleSegments = (e)=>{
    e.preventDefault()
  const radioBtns=   document.getElementsByClassName('segmentBtn')
    for(let i=0; i< radioBtns.length;i++){
      radioBtns[i].classList.remove('active');
    }
    console.log(e.target.children[0].value);
    e.target.classList.add("active")
  }
  return (
    <div className="legBuilder">
      <div className="segments">
        <h5>Select Segments</h5>
        <div className='segmentOptions' onClick={handleSegments}>
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

      <div className="info">
        <div>
          <h5>Total lot</h5>
          <input type="number" name="lot" id="lot" />
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
              <input type="number" name="num" id="num" />
             X ATM Straddle Price)]
        </div>
      </div>

      <div className='buttons'>
        <button className='addLeg'>Add Leg</button>
        <button className='cancel'>Cancel</button>
      </div>
    </div>
  )
}

export default LegBuilder