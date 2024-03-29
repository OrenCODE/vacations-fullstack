import React, {Fragment} from 'react';
import spinner from './spinner.svg';

export default () => {
    return (
        <div className="spinner">
            <img
                src={spinner}
                style={{width: '200px', margin: 'auto', display: "block"}}
                alt="Loading..."
            />
        </div>
    );

}
