import { forwardRef } from 'react';
import './TextArea.css'

const TextArea = forwardRef((props, ref) => {
  return (
      <div className='textarea-container'>
                <label className='textarea-label'> {props.children} </label>
            <textarea ref={ref}className='textarea'/>
  
      </div>
    );
  }) ;
  
  export default TextArea;
  