import {Dropdown} from "../../components";
interface Props {
    setFilter: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;
    categories: string[];
    searchQuery: string;
    setSearchQuery: (value: (((prevState: string) => string) | string)) => void;
}
export const FiltersBar = ({setFilter, setSearchQuery, searchQuery, categories}:Props) => {
    return (
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div className="flex items-center space-x-4">
                <Dropdown label="Filtros">
                    <a onClick={() => setFilter(null)} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all" role="menuitem" id="menu-item-0">Todos</a>
                    {categories.map((category) => (
                        <a onClick={() => {setFilter(category); console.log(category)}} href="#" className="capitalize w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all" role="menuitem" key={category}>{category}</a>
                    ))}

                </Dropdown>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded-md border-gray-200 focus:outline-none  focus:border-gray-600 hover:border-gray-400 transition-all"
                />
            </div>
        </div>
    );
};