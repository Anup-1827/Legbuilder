import React, { useEffect, useRef } from 'react'
import {BASE_URL} from '../config';
import LegList from "../Json/LegsList"

function CreateLeg(props) {
  const {listJson, setListJson, allFields, setAllFields, handleCancel} = props


    const errorChildRef = useRef();

    const handleCheckbox = (e) => {
        const inputField = {}
        const name = e.target.name
        const childDrd = document.getElementById(`child_drd_${name}`)
        const childInput = document.getElementById(`child_input_${name}`)
        if (e.target.checked) {
           childDrd.disabled = false
            childInput.disabled = false
            errorChildRef.current.classList.add('hide')
            inputField[name] = e.target.value;
            inputField[`${name}_drd`] = childDrd.value
            inputField[`${name}_input`] = Number(childInput.value)

        }
        else {
            childInput.disabled = true
            childDrd.disabled = true
        }


        setAllFields({...allFields, ...inputField})
    }

    const handleInputChange = (e, name) => {
        if (Number(e.target.value) < 0) {
            e.target.value = 0;
            return;
        }
        
        setAllFields({...allFields, [`${name}_input`]: Number(e.target.value)})
    }

    const handleSelectField = (e, name)=>{
        setAllFields({...allFields, [`${name}_drd`]: e.target.value})
    }   

    const handleSubmit = () => {
        let isValid = true;
        const allCheckbox = document.querySelectorAll('#legList input[type="checkbox"]')
        const allInputTag  = document.querySelectorAll('#legList input[type="number"]')
        const allSelectTag  = document.querySelectorAll('#legList select')

        allCheckbox.forEach(item => {
            if (!item.checked) {
                isValid = false
            }
        })

        if (!isValid) {

            errorChildRef.current.classList.remove('hide')
            errorChildRef.current.innerHTML = "All Checkbox should be checked";
            errorChildRef.current.style.color = "red"
            errorChildRef.current.style.textAlign = "center"
            return
        }

        allCheckbox.forEach(item=> item.disabled = true)
        allInputTag.forEach(item=> item.disabled = true)
        allSelectTag.forEach(item=> item.disabled = true)

        const payload = {
            "SegmentType": `SegmentType.${allFields?.segment}`,
            "PositionType": `PositionType.${allFields?.positon}`,
            "OptionType": `OptionType.${allFields?.optionType}`,
            "StrikeCriteriaType": `StrikeCriteriaType.${allFields?.strikeCriteria}`,
            "Lots": Number(allFields?.lot),
            "LegTrailSL": {
                "Type":  allFields?.trailSL_drd === "None"?"None": `“TrailStopLossType.${allFields?.trailSL_drd}`, //"None", //  “TrailStopLossType.Points” or “TrailStopLossType.Percentage”,
                "Value": {
                    "StopLossMove": allFields?.trailSL_input
                }
            },
            "LegMomentum": {
                 "Type": allFields?.simpleMomentum_drd === "None"?"None": `“TrailStopLossType.${allFields?.simpleMomentum_drd}`,// or “MomentumType.PointsUp” or “MomentumType.PointsDown” or so on,
                 "Value": allFields?.simpleMomentum_input//number
                },
                "ExpiryKind": `ExpiryType.${allFields.expiry}`, // or “ExpiryType.Monthly”,
                
            }   

        fetch(BASE_URL ,{
            method: "POST",
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        )
        .then(res=>{
           return res.json()
        })
        .then(result=>{
            setListJson([payload, ...listJson])
            document.querySelector('.submitDiv').classList.add('hide')
            document.querySelector('.addLegAgain').classList.remove('hide')
        })
        .catch(err=>{
            console.log(err);
        })
        // console.log(payload);

    }

    return (
        <>
            <div id='legList'>
                {
                    LegList.map((leg) => {
                        return (
                            <div key={leg.id} className='legDiv' id={`leg_${leg.checkbox}`}>
                                <label>
                                    <input value={leg.checkbox} id={leg.checkbox} type="checkbox" name={leg.checkbox} onClick={handleCheckbox} /> {leg.checkboxHeading}
                                </label>
                                <div className='childLeg' id={`child_${leg.checkbox}`}>
                                    <select disabled={true} id={`child_drd_${leg.checkbox}`} onChange={(e)=>handleSelectField(e,leg.checkbox)}>
                                        {
                                            leg.dropDownOption.map((item) => {
                                                return <option value={item.value}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                    <input disabled={true} className='inputChild' id={`child_input_${leg.checkbox}`} min="0" type="number" onChange={(e)=>handleInputChange(e,leg.checkbox)} />
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
            <div className='addLegAgain hide'>
                <button className='addLeg' onClick={handleCancel}>Add Leg</button>
            </div>
            
        </>
    )
}

export default CreateLeg