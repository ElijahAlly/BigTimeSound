import React, { Component } from 'react';

const TopSearchResult = ({item}) => {

    return (
        <section className='top-result-background'>
            <img src={item.imgUrl ? item.imgUrl : item.url} id='best-img' height='120px' width='120px'/>
        </section>
    );
}

export default TopSearchResult;