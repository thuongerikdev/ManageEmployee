import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllUser, deleteUser } from "../../services/userService";
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
import './Users.scss'
const User = (props) => {
    const [ListUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPage, setTotalPage] = useState(0)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    //modal delete
    const [dataModal, setDataModal] = useState({})
    const [isShowModalUser, setIsShowModalUser] = useState(false)

    const [actionModalUser, setActionModalUser] = useState('CREATE')
    //modal update/create
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUser()
    }, [currentPage])

    const fetchUser = async (page) => {
        let respone = await fetchAllUser(currentPage, currentLimit)
        console.log('check resonpone' , respone)
        if (respone  && respone.EC === 0) {
     
            setTotalPage(respone.DT.totalPage)
            setListUser(respone.DT.users)
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUser()
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }
    const  handleEditUser = async(user) => {
        setDataModalUser (user)
        setIsShowModalUser(true)
        setActionModalUser("EDIT")
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }
    const confirmDeleteuser = async () => {
        let respone = await deleteUser(dataModal)
        console.log("respone", respone)
        if (respone && respone.EC === 0) {
            toast.success(respone.EM)
            await fetchUser()
            setIsShowModalDelete(false)
        }
        else {
            toast.error(respone.EM)
        }
    }
    const onHideModalUSer = async() => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUser()
    }
    const handleCreateUser = () => {
        setIsShowModalUser(true)
        setActionModalUser('CREATE')
    }
    const handleRefresh = async() => {
        await fetchUser()
    }



    return (
        <>

            <div className="manage-user-container">
                <div className="user-header">
                    <div className="title mt-3">
                        <h3>
                            ManageUser
                        </h3>
                    </div>
                    <div className="actions my-3">
                        <button className="btn btn-success refresh"> <i className="fa fa-refresh" /> refresh </button>
                        <button className="btn btn-primary" onClick={() => handleCreateUser() }>
                        <i className="fa fa-plus-circle" onClick={() => handleRefresh()} /> add new user</button>
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
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListUser && ListUser.length > 0 ?
                                <>
                                    {ListUser.map((item, index) => {
                                        return (
                                            <tr key={` row ${index}`}>
                                                <td > {(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td > {item.id}</td>
                                                <td > {item.email}</td>
                                                <td > {item.username}</td>
                                                <td > {item.Group? item.Group.name : ''} </td>

                                                <td>
                                                    
                                                    <span className="edit" title="edit"
                                                        onClick={() => handleEditUser(item)}>
                                                              <i className="fa fa-pencil" /> </span>
                                                    <span className="delete" title="delete"
                                                        onClick={() => handleDeleteUser(item)}>
                                                             <i className="fa fa-trash-o" /></span>
                                                </td>
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
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteuser={confirmDeleteuser}
                dataModal={dataModal}

            >

            </ModalDelete>

            <ModalUser
                onHide={onHideModalUSer}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}

            />
        </>

    )
}
export default User