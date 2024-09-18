import { useState  , useEffect ,forwardRef  , useImperativeHandle} from "react"
import { deleteRole, fetchAllRole } from "../../services/roleService"
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";

const TableRole =  forwardRef((props ,ref) => {
    const [ListRoles , setListRole] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPage, setTotalPage] = useState(0)

    useImperativeHandle(ref ,  () => ({
        fetchListRoleAgain() {
             fetchRole()
        }

    }))
    useEffect(() => {
        fetchRole()
    }, [currentPage])

    // const {user} = React.useContext(UserContext)
    // console.log(user)

    const fetchRole = async (page) => {
        let respone = await  fetchAllRole(currentPage, currentLimit)
        // console.log('check resonpone' , respone)
        if (respone  && respone.EC === 0) {
     
            setTotalPage(respone.DT.totalPage)
            setListRole(respone.DT.roles)
        }
    }
    const handleEditRole = () => {

    }
    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role)
        if(data && data.EC===0) {
            toast.success(data.EM)
            await fetchRole()
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchRole()
    };


    return (
        <>
            <div className="user-body">

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                          
                            <th scope="col">ID</th>
                            <th scope="col">URL</th>
                            <th scope="col">Description</th>
                            <th> Action</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {ListRoles && ListRoles.length > 0 ?
                            <>
                                {ListRoles.map((item, index) => {
                                    return (
                                        <tr key={` row ${index}`}>
                                            {/* <td > {(currentPage - 1) * currentLimit + index + 1}</td> */}
                                            <td > {item.id}</td>
                                            <td > {item.url}</td>
                                            <td > {item.description}</td>
                        

                                            <td>

                                                <span className="edit" title="edit"
                                                    onClick={() => handleEditRole(item)}>
                                                    <i className="fa fa-pencil" /> </span>
                                                <span className="delete" title="delete"
                                                    onClick={() => handleDeleteRole(item)}>
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

      
        </>
    )
})
export default TableRole