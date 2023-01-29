import React from "react";
import axios from 'axios';
import qs from 'querystring';

const api = 'http://localhost:8000'

class ListComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mahasiswa: [],
            display: 'none'
        }
    }

    componentDidMount(){
        axios.get(api+'/mhs')
            .then(res => {
                this.setState({
                    mahasiswa: res.data
                })
            })
    }

    render(){
        const renderList = this.state.mahasiswa.map(mhs => {
            return (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={mhs.id}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {mhs.nim}
                </th>
                <td class="px-6 py-4">
                    {mhs.nama}
                </td>
                <td class="px-6 py-4">
                    {mhs.jurusan}
                </td>
                <td class="px-6 py-4">
                    Edit | Hapus
                </td>
            </tr>
            )
        })
        return (
            <div class="relative overflow-x-auto py-6">
                <h1 className="text-center font-bold text-3xl">Daftar List</h1>
                <table class="w-4/5 mx-auto mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                NIM
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Jurusan
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListComp