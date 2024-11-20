import React, { useState, useEffect } from 'react';
import './style.css'; // Ensure this style file exists or create one

function Home() {
    const [character, setCharacter] = useState('');
    const [environment, setEnvironment] = useState('');
    const [song, setSong] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setVideoUrl(''); // Reset the video URL before new generation

        try {
            const response = await fetch('https://xy8pxzs8vt8j9a-8000.proxy.runpod.net/generate-video-audio/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    character,
                    environment,
                    song,
                    genre,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate video and audio');
            }

            const data = await response.json();
            setVideoUrl(data.video_url);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error generating the video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center mt-[150px]">Music Tech MVP :)</h1>
            <div className="flex flex-col md:flex-row max-w-6xl w-full bg-[#d9d8d8] shadow-md rounded-lg">
                <div className="md:w-1/3 p-4 border-r bg-white border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">INPUT</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="character" className="block text-sm font-medium text-gray-700">
                                Character prompt:
                            </label>
                            <textarea
                                id="character"
                                value={character}
                                onChange={(e) => setCharacter(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
                                Environment prompt:
                            </label>
                            <textarea
                                id="environment"
                                value={environment}
                                onChange={(e) => setEnvironment(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label htmlFor="song" className="block text-sm font-medium text-gray-700">
                                Song lyrics:
                            </label>
                            <textarea
                                id="song"
                                value={song}
                                onChange={(e) => setSong(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                Genre:
                            </label>
                            <select
                                id="genre"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <option value="">Select a genre</option>
                                <option value="hip-hop">Hip Hop</option>
                                <option value="electronic">Electronic Music</option>
                                <option value="country">Country</option>
                                <option value="rock">Rock</option>
                                <option value="lo-fi">Lo-fi</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Generate Video
                        </button>
                    </form>
                </div>

                <div className="md:w-2/3 bg-white p-4 md:ml-4 flex justify-center items-center">
                    {loading ? (
                        <div className="flex flex-col items-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                            <p className="text-center text-gray-500">Generating video...</p>
                        </div>
                    ) : videoUrl ? (
                        <video className="w-full h-full" autoPlay controls>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p>Welcome! Enter details to generate a video.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
