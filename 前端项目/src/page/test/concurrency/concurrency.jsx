import React, {useState} from 'react';

const Concurrency = () => {
    console.log('Meiwyo');
    const [num, setNum] = useState(10); //任务数量默认是10
    return (
        <React.Fragment>
            <div>
                <label htmlFor='num'>请输入任务数量：</label><input name='num' value={num} onChange={e => {setNum(e.target.value);}}></input>
            </div>
        </React.Fragment>
    );
};
export default Concurrency;