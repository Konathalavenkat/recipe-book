import RecipeProvider from "@/containers/ReciperProvider/RecipeProvider"
import Recipe from "@/components/pages/Recipe/Recipe"

const RecipePage = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecipeProvider>
            <Recipe />
        </RecipeProvider>
    )
}

export default RecipePage;