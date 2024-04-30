"use client";
// import Image from "next/image";
// import styles from "./contact.module.css";
// import { AddContact } from "@/lib/action";
// import { useFormState } from "react-dom";
// import React, { useEffect } from 'react';
// import { useRouter } from "next/navigation";

// const ContactPage = () => {
//   const [state, formAction] = useFormState(AddContact, undefined);
//   const router = useRouter();
 
//   useEffect(() => {
//     if (state?.success) {
//       formAction.reset();
//       router.reload();
//     }
//   }, [state?.success]); // Reset form and reload page when success state changes

//     return(
//         <div className={styles.container}>
//         <div className={styles.imgContainer}>
//           <Image src="/contact.png" alt="" fill className={styles.img} />
//         </div>
//         <div className={styles.formContainer}>
//            {/* <HydrationTestNoSSR/>  */}

//           <form action={formAction} className={styles.form}  >
//             <input type="text" name="name" placeholder="Name and Surname" />
//             <input type="text" name="email" placeholder="Email Address" />
//             <input type="text" name="phoneNo" placeholder="Phone Number (Optional)" />
//             <textarea
//               name="message"
//               id=""
//               cols="30"
//               rows="10"
//               placeholder="Message"
//             ></textarea>
//             <button>Send</button>
//             {state?.error }
//           </form>
//         </div>
//       </div>
//     )
// }
// export default ContactPage;


import Image from "next/image";
import styles from "./contact.module.css";
import { AddContact } from "@/lib/action";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Call the AddContact function passing the formData
      
      const response = await AddContact(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phoneNo: '',
          message: ''
        });
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("Something went wrong!");
    } finally {
    
      setSubmitting(true);
    }

  
  };
console.log(submitting)
  if (success && submitting) {
    console.log("success");
    Swal.fire({
      title: "Success",
      icon: "success"
    });
    
    // router.push("/contact");
    setSuccess(false);
    
  }else if(error && submitting) { 
    console.log("error");
    
   
    console.log(error);
    Swal.fire({
      title: "Oops...",
      text:error,
      icon: "error"
    });
    setError(null);
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" placeholder="Name and Surname" value={formData.name} onChange={handleChange} />
          <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <input type="text" name="phoneNo" placeholder="Phone Number (Optional)" value={formData.phoneNo} onChange={handleChange} />
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" disabled={submitting}>Send</button>
          {/* {error && <div>{error}</div>} */}
        </form>
      </div>
    </div>
  );
}

export default ContactPage;