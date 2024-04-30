
import styles from "./admin.module.css"
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { auth } from "@/lib/auth";
import { Contracts } from "@/components/contacts/contacts";


//   export const metadata = {
//     title: 'Agency Admin',
//     description: 'Next.js starter app',
//    }


const AdminPage= async()=>{
    debugger
    const session = await auth();
    console.log(session);
    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    
                        <AdminPosts/>
                  
                </div>
                <div className={styles.col}>
                   
                        <AdminPostForm userId={session?.user?.id} />
                   
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.col}>
                    
                        <AdminUsers/>
                   
                </div>
                <div className={styles.col}>
                    
                        <AdminUserForm/>
                   
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.col}>                   
                        <Contracts/>               
                </div>
            </div>

        </div>
    )
}
export default AdminPage;