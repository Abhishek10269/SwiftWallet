import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ArrowLeft, Send } from 'lucide-react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTransfer = async () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: Number(amount)
            }, {
                headers: {
                    Authorization: localStorage.getItem("authToken")
                }
            });
            navigate('/dashboard', { state: { message: `Successfully sent Rs ${amount} to ${name}` } });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during the transfer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-purple-500 text-white py-4 px-6">
                    <div className="flex items-center">
                        <button onClick={() => navigate(-1)} className="mr-4">
                            <ArrowLeft size={24} />
                        </button>
                        <h2 className="text-2xl font-bold">Send Money</h2>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl font-semibold">
                            {name[0].toUpperCase()}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount (in Rs)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter amount"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={handleTransfer}
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Processing...' : (
                            <>
                                <Send size={18} className="mr-2" />
                                Initiate Transfer
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};