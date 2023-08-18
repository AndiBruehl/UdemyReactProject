import "./Selection.css"
import { forwardRef } from "react";

const Selection = forwardRef((props, ref) => {
    return <div className="selection-container">

        <label className="selection-label"> {props.children} </label>
        <select className="selection-field" ref={ref}>
            {props.content.map(item => (
            <option value={item.id}>{item.displayName}</option>
            ))}
        </select>
    </div>;

});

export default Selection;