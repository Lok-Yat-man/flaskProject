import React, {useEffect, useState} from 'react'


import MainThreeScene from './components/MainThreeScene'
import Sidebar from './components/Sidebar'
import Overlay from './components/Overlay'

export function App() {
    const [selectedItem, setSelectedItem] = useState(null)
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(jsonData => {
                setCompanyData(jsonData);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    const handleHoverItem = (itemId) => {
        console.log('--------hoverSelected', itemId)
        //曾经是hover item就直接显示数据，优势是非常交互友好
        //劣势是如果数据有隔得近且密，会有太多误触
        //为了不让用户显得迷惑，所以此处密集数据修改成了点击之后显示
    }

    const handleClickItem = (itemId) => {
        console.log('-------click selected', itemId)
        console.log(`Clicked item ID: ${itemId}`)
        setSelectedItem(itemId)
        // 可以在这里处理点击小球后的逻辑，比如更新状态、发送请求等
    }


    return (
        <>
            {/* render Three.js Scene */}
            <MainThreeScene onHoverItem={handleHoverItem} onClickItem={handleClickItem} companyData={companyData}/>
            <Overlay/>

            {/* render React Component */}
            <Sidebar selectedItem={selectedItem} companyData={companyData}/>
        </>
    )
}