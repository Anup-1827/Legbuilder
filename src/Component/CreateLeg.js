import React, {useRef} from 'react'
import LegList from '../Json/LegsList'

function CreateLeg() {
    
  const errorChildRef = useRef();

    const handleCheckbox = (e)=>{
            const name = e.target.name
            if(e.target.checked){
                document.getElementById(`child_drd_${name}`).disabled= false
                document.getElementById(`child_input_${name}`).disabled= false
        errorChildRef.current.classList.add('hide')

            }
            else{
                document.getElementById(`child_drd_${name}`).disabled= true
                document.getElementById(`child_input_${name}`).disabled= true
            }
    }

    const handleInputChange = (e)=>{
        if(Number(e.target.value) <0){
          e.target.value = 0
        }
      }

      const handleSubmit = ()=>{
        errorChildRef.current.classList.remove('hide')
        errorChildRef.current.innerHTML = "All Checkbox should be checked";
        errorChildRef.current.style.color = "red"
          errorChildRef.current.style.textAlign = "center"
      }
    
  return (
    <>
    <div id='legList'>
        {
            LegList.map((leg)=>{
                return(
                    <div key={leg.id} className='legDiv' id={`leg_${leg.checkbox}`}>
                        <label>
                            <input id={leg.checkbox} type="checkbox" name={leg.checkbox} onClick={handleCheckbox}/> {leg.checkboxHeading}
                        </label>
                        <div  className='childLeg' id={`child_${leg.checkbox}`}>
                            <select disabled={true} id={`child_drd_${leg.checkbox}`}>
                                {
                                    leg.dropDownOption.map((item)=>{
                                        return <option value={item.value}>{item.name}</option>
                                    })
                                }
                            </select>
                            <input disabled={true} className='inputChild' id={`child_input_${leg.checkbox}`} min="0" type="number" onChange={handleInputChange}  />
                        </div>
                        
                    </div>
                )
            })
        }

    </div>
<div ref={errorChildRef} className="hide"> </div>
        <div className='submitDiv'>
        <button className='addLeg' onClick={handleSubmit}>Submit</button>
        </div>
    </>
  )
}

export default CreateLeg