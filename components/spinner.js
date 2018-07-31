import {Fragment} from 'react';
const Spinner = (props)=>{
    return (
        <Fragment>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        </Fragment>
    );
};

export default Spinner;