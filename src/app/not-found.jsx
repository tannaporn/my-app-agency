import Link from "next/link"
const Notfound=()=>{
    return(
        <div>
            <h2>Not Found</h2>
            <p>Sorry the page you looking for does not exist.</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}
export default Notfound;