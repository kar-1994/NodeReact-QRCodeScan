import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const Societylist = () => {

    const [lists, setList] = useState([]);

    useEffect(() => {
        AuthService.getsocietylist().then((res) => {
            console.log(res.data);
            setList(res.data)
        }).catch((err) => {
            setList([])
        })
    }, [])

    const downloadBarcode = (id) => {
        AuthService.getBase64(id).then((res) => {
            var a = document.createElement("a"); //Create <a>
            a.href = res.data ; //Image Base64 Goes here
            a.download = "Image.png"; //File name Here
            a.click(); //Downloaded file
        })
    }

    return (
        <div className="container">
            <h2>Society List</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>

                        <th>Society Name</th>
                        <th>Address</th>
                        <th>Pincode</th>
                        <th>QrCode</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        lists.map((list, i) => {
                            return <tr key={i}>
                                <td>{list.society_name}</td>
                                <td>{list.address}</td>
                                <td>{list.pincode}</td>
                                <td><button type="button" className="btn btn-success" onClick={() => downloadBarcode(list.id)}>Download</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
export default Societylist;