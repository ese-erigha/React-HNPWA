import {Fragment} from 'react';
const Spinner = (props)=>{
    return (
        <Fragment>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
            <style jsx>{`
                .progress{
                    background-color: #5755d9;
                    height: 2px;
                    margin-top: 5px;
                }
            
                .progress .indeterminate{
                    background-color: #fff;
                }
            `}</style>
        </Fragment>
    );
};

export default Spinner;