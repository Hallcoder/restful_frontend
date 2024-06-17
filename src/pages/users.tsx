// pages/users.js (or components/Users.js if used as a reusable component)
import React, { useState, useMemo } from 'react';
import Modal from '@/components/Modal';
import ModalRoot from '@/components/ModalRoot';
import axios from 'axios';
import PaginatedTable from '@/components/PaginatedTable';

const Users = () => {
    const [data, setData] = useState([
        { name: 'John Doe', age: 28, address: '123 Main St' },
        { name: 'Jane Doe', age: 32, address: '456 Oak St' },
        // Add more initial data if needed
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', age: '', address: '' });

    const columns = useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Address', accessor: 'address' },
        ],
        []
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://your-api-endpoint.com/items', newItem);
            setData([...data, response.data]);
            closeModal();
        } catch (error) {
            console.error('Error adding new item:', error);
        }
    };

    return (
        <div className="App">
            <button onClick={openModal} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Add New Item
            </button>
            <ModalRoot /> {/* Ensure ModalRoot is rendered */}
            <PaginatedTable columns={columns} data={data}/>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newItem.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={newItem.age}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={newItem.address}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Users;
