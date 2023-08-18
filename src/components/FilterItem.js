import "./FilterItem.css"

const FilterItem = (props) => {
    return <p className={`filteritem ${props.activeFilter === props.category ? "active" : "inactive"} `} onClick={() => props.onFilter(props.category)}>
        {props.category}
       </p>;
};

export default FilterItem;