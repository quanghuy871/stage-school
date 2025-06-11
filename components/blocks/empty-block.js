import React from 'react';

const EmptyBlock = ({ children }) => (
    <div style={{
        paddingTop: '48px',
        paddingBottom: '48px',
    }}
    >
        Block missing:
        {' '}
        {children}
    </div>
);

export default EmptyBlock;