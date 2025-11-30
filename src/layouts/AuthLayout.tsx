import { useIngredients } from "@/hooks/useIngredients";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const IngredientConsumer = (props: any) => {
    const {
        children,
        ...rest
    } = props;
    const query = useSearchParams();
    const { addIngredients } = useIngredients();

    useEffect(() => {

    })

    
}