function WelcomePage() {
    return (
        <div className="flex flex-col items-center min-h-screen text-gray-800">
            <h1 className="text-4xl font-semibold mb-4 text-green-700">
                Välommen till salladsbaren 🥗
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-md">
                Tryck på en av länkarna för att göra din egna sallad eller för att se din varukorg 
            </p>
        </div>

    );
}

export default WelcomePage;