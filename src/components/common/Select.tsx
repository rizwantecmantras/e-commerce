
export default function Select({label, name, options , currentObject , ...rest}:any) {
  return (
    <>
      <div className="form-group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>

            <select
              {...rest}
              name={name}
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //   onChange={handleChange}
            >
              {options &&
                options.map((item:any) => (
                  <option
                    value={item.value}
                    selected={currentObject === item.value}
                    key={item.value}
                  >
                    {" "}
                    {item.label}{" "}
                  </option>
                ))}
            </select>
          </div>
    </>
  )
}