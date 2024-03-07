import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const DynamicGrid = ({ apiData }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (apiData) {
            setItems(apiData);
        }
    }, [apiData]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((_, index) => (
                <NewsItem key={index} newsItem={items[index]} />
            ))}
        </div>
    );
};

export default DynamicGrid;