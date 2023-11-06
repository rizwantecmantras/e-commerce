
export default function Button({label,onClick,...rest}:any) {
  return (
     <>
     <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-1 px-4 rounded"
              onClick={onClick}
              {...rest}
            >
              Add Option
    </button>
     </>
  )
}
