import { Link } from "react-router"

const AdminHeader = () => {
  return (
    <header>
      <Link to='/' className="logo"><img src="/images/logo.png" alt="Logo Le 63 restaurant"/></Link>
      
    </header>
  )
}

export default AdminHeader