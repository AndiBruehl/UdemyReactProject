import Card from "../layout/Card";
import FilterItem from "./FilterItem";
import "./FilterBar.css"

const FilterBar = (props) => {
    return (
        <Card className="filterbar">
            <h1 className="filterbar-title">Filtern:</h1>
            {props.categories.map((category) =>
                <FilterItem
                    category={category}
                    onFilter={props.onFilter}
                    activeFilter={props.activeFilter}
                />
            )}
        </Card>);

};

export default FilterBar;