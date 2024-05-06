export const BoxAndInputField = ({label, placeholder }) =>{
    return (
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">{label}</label>
            <input id="username" type="text" className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder={placeholder} />
        </div>
    )
}