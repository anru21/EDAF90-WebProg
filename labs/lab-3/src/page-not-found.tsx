export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center text-gray-800">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-2xl mb-6 text-gray-600">
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    )
}