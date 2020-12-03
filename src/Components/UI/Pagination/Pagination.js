import React from 'react';

import Proptypes from 'prop-types';

import styles from './Pagination.module.css';

const Pagination = props => {
    const { page, totalPages, changePage} = props;
    
    if(totalPages === 1) return null;
    
    return (
        <div className={styles.Pagination}>
            {page !== 1 ? <span onClick={(event) => changePage(event, 'decr')}>&laquo;</span> : <span styles={{display: 'hidden'}}></span>}
            <span>{page}</span>
            {page !== totalPages ? <span onClick={(event) => changePage(event, 'incr')}>&raquo;</span> : <span styles={{display: 'hidden'}}></span>}
        </div>
    );
};

Pagination.propTypes = {
    page: Proptypes.number.isRequired,
    totalPages: Proptypes.number.isRequired,
    changePage: Proptypes.func.isRequired
}

export default Pagination;