// import React, { useState } from 'react'
// import axios from "../Api"

// const Status = (props) => {
//     const [status, setStatus] = useState(props.status);
//     const choices = ['Pending', 'Approved', 'Denied', (props.handle == "donations" ? 'Donated' : "Completed")];
//     return (
//         <div >
//             <select name="status" id="status" onChange={async (k) => {
//                 if (k.target.value === "Donated") {
//                     await axios.put(`/bank/updateStock`, { bloodGroup: props.bloodGroup, units: props.units })
//                         .then(async (response) => {
//                             alert("Stock Updated");
//                             await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
//                                 .then(async (response) => {
//                                     setStatus(k.target.value);
//                                     props.setId(props.i);
//                                     props.setStatus(k.target.value);
//                                 }, (error) => {
//                                     alert("Something went wrong");
//                                 });
//                         }, (error) => {
//                             alert("Something went wrong");
//                         });
//                 } else if (k.target.value === "Completed") {
//                     await axios.put(`/bank/deleteStock`, { bloodGroup: props.bloodGroup, units: props.units })
//                         .then(async (response) => {
//                             alert("Stock Updated");
//                             await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
//                                 .then(async (response) => {
//                                     setStatus(k.target.value);
//                                     props.setId(props.i);
//                                     props.setStatus(k.target.value);
//                                 }, (error) => {
//                                     alert("Something went wrong");
//                                 });
//                         }, (e) => {
//                             alert(e.request.status == 404 ? "Not Enough Blood" : "Something went wrong");
//                         });
//                 } else {
//                     await axios.put(`/bank/${props.handle}`, { id: props.id, status: k.target.value })
//                         .then(async (response) => {
//                             setStatus(k.target.value);
//                             props.setId(props.i);
//                             props.setStatus(k.target.value);
//                         }, (error) => {
//                             alert("Something went wrong");
//                         });
//                 }
//             }}
//                 disabled={status == "Denied" || status == "Donated" || status == "Completed"}
//                 className={(status == "Pending" ? "border-metal text-metal" : (status == "Approved" ? "border-yellowX text-yellowX " : (status == "Denied" ? "border-red text-red" : "border-green text-green"))) + ' border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer'}
//             >
//                 {
//                     choices.map((e) =>
//                         <option value={e} selected={status === e}>{e}</option>
//                     )
//                 }
//             </select>
//         </div >
//     )
// }

// export default Status
import React, { useState } from 'react';
import axios from "../Api";

const Status = (props) => {
    const [status, setStatus] = useState(props.status);
    const choices = ['Pending', 'Approved', 'Denied', (props.handle === "donations" ? 'Donated' : 'Completed')];

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            if (newStatus === "Donated") {
                await axios.put(`/bank/updateStock`, { bloodGroup: props.bloodGroup, units: props.units });
                alert("Stock Updated");
            } else if (newStatus === "Completed") {
                await axios.put(`/bank/deleteStock`, { bloodGroup: props.bloodGroup, units: props.units });
                alert("Stock Updated");
            }
            await axios.put(`/bank/${props.handle}`, { id: props.id, status: newStatus });
            setStatus(newStatus);
            props.setId(props.i);
            props.setStatus(newStatus);
        } catch (error) {
            if (newStatus === "Completed" && error.response && error.response.status === 404) {
                alert("Not Enough Blood");
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <div>
            <select
                name="status"
                id="status"
                value={status}
                onChange={handleStatusChange}
                disabled={status === "Denied" || status === "Donated" || status === "Completed"}
                className={(status === "Pending" ? "border-metal text-metal" : 
                            status === "Approved" ? "border-yellowX text-yellowX" : 
                            status === "Denied" ? "border-red text-red" : 
                            "border-green text-green") + ' border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer'}
            >
                {choices.map((choice, index) => (
                    <option key={index} value={choice}>{choice}</option>
                ))}
            </select>
        </div>
    );
}

export default Status;
