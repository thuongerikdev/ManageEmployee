import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from 'react-paginate';


const User = (props) => {
    const [ListUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        fetchUser()
    }, [currentPage])

    const fetchUser = async (page) => {
        let respone = await fetchAllUser( currentPage, currentLimit)
        if (respone && respone.data && respone.data.EC === 0) {
            // console.log(respone.data.DT)
            setTotalPage (respone.data.DT.totalPage)
            setListUser (respone.data.DT.users)
        }
    }
    const handlePageClick =  async (event) => {
       setCurrentPage(+event.selected +1)
       await fetchUser()
    };

    return (
        <div className="manage-user-container">
            <div className="user-header">
                <div className="title">
                    <h3>
                        TablerUser
                    </h3>
                </div>
                <div className="actions">
                    <button className="btn btn-success"> refresh </button>
                    <button className="btn btn-primary"> add new </button>
                </div>
            </div>
            <div className="user-body">

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListUser && ListUser.length > 0 ?
                            <>
                                {ListUser.map((item, index) => {
                                    return (
                                        <tr key={` row ${index}`}>
                                            <td > {index + 1}</td>
                                            <td > {item.id}</td>
                                            <td > {item.email}</td>
                                            <td > {item.username}</td>
                                            {/* <td > {item.Group ? item.Group.name : ''}</td> */}
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <>
                                <tr>
                                    <td>
                                        Not found user
                                    </td>

                                </tr>
                            </>

                        }
                    </tbody>
                </table>
            </div>

            {totalPage > 0 &&
                <div className="user-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>}

        </div>
    )
}
export default User