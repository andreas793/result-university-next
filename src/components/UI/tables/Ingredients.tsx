"use client"

import {useIngredientStore} from "@/store/ingredient.store";
import {useAuthStore} from "@/store/auth.store";
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from "@/constans/select-options";


const IngredientsTable = () => {

    const {ingredients, removeIngredient, isLoading} = useIngredientStore();
    const {isAuth} = useAuthStore();

    const handleDelete = async (id: string) => {
        await removeIngredient(id);
    }

    const getCategoryLabel = (value: string) => {
        const option = CATEGORY_OPTIONS.find(opt => opt.value === value);
        return option ? option.label : value;
    }

    const getUnitLabel = (value: string) => {
        const option = UNIT_OPTIONS.find(opt => opt.value === value);
        return option ? option.label : value;
    }

    return  !isLoading && isAuth ? (
        <Table
            aria-label="Список ингредиентов"
            classNames={{
                wrapper: "mt-4",
                table: "w-full",
                th: "text-black",
                td: "text-black",
            }}
        >
            <TableHeader>
                <TableColumn>Название</TableColumn>
                <TableColumn>Категория</TableColumn>
                <TableColumn>Ед. измерения</TableColumn>
                <TableColumn>Цена</TableColumn>
                <TableColumn>Описание</TableColumn>
                <TableColumn>Действие</TableColumn>
            </TableHeader>
            <TableBody>
                { ingredients.map(({id, name, category, unit, pricePerUnit, description }) => (
                    <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{getCategoryLabel(category)}</TableCell>
                        <TableCell>{getUnitLabel(unit)}</TableCell>
                        <TableCell>{pricePerUnit}</TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell>
                            <Button color="danger" size="sm" onPress={() => handleDelete(id)}>Удалить</Button>
                        </TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    ) : (<p className="mt-4">Загрузка...</p>);
};

export default IngredientsTable;