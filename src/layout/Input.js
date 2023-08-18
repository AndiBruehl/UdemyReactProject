import { forwardRef } from 'react';
import './Input.css'

const Input = forwardRef((props, ref) => {
  return (
    <div className='input-container'>
            <label className='input-label'> {props.children} </label>
            <input ref={ref}className='input-field' type={props.type}/>
    </div>
  );
});
  
  export default Input;
  