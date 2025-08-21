import IngredientForm from "@/forms/ingredient.form";
import IngredientsTable from "@/components/UI/tables/Ingredients";

const Ingredients = () => {
    return (
        <div>
            <IngredientForm />
            <IngredientsTable />
        </div>
    );
};

export default Ingredients;