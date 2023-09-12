import React, { useState } from "react";
import EarthCanvas from "../canvas/Earth";
import { useForm, SubmitHandler } from "react-hook-form";
// import { sendContactMsg } from "../../api";
interface IContactFrom {
  email: string;
  subject: string;
  message: string
}
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IContactFrom>();
  const onSubmit:SubmitHandler<IContactFrom> =  (data:IContactFrom) => {
    // e.preventDefault();
    // var email = $("#email").val();
    // var subject = $("#subject").val();
    // var message = $("#message").val();
    // if(email == "" || subject == "" || message == ""){
    //   alert("Email, subject and message are required!")
    // }else{
    //   setLoading(true);
    //   var res = await sendContactMsg({email: email, subject: subject, message: message}, dispatch);
    //   setLoading(false);
    //   if(res.status != 200){

    //   }else{
    //     $("#contact-form").trigger("reset");
    //   }
    //   setTimeout(() => {
    //     alert(res.data);
    //   }, 500);
    // }
  };
  return (
    <div className="h-auto py-10 w-full flex flex-col items-center justify-center bg-black-600">
      <h2 className="block mb-8 text-5xl font-bold text-white font-bookman-old-style">
        Contact Us
      </h2>
      <div className=" w-[90%] rounded-[50px] flex  flex-col items-center justify-center">
        <div className="w-[100%] md:w-[90%]  bg-gray-200 rounded-[50px] flex lg:flex-row flex-col sm:justify-between items-center md:items-center relative p-6">
          <div className="sm:w-[60%] h-[250px] mb-10 md:mb-0 lg:h-[400px]">
            <EarthCanvas />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[40%] w-full h-full px-2 flex flex-col justify-center text-black-0">
            <div className="mb-3">
              <label className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800 text-center sm:text-left">
                Email
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 focus:border-purple-800 focus:outline-none"
                placeholder='name@flowbite.com'
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="mb-3">
              <label

                className="block mb-2 text-lg font-medium text-center sm:text-left"
              >
                Subject
              </label>
              <input
                type="text"
                className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-purple-800 focus:outline-none"
                placeholder='Let us know how we can help you'
                {...register("subject", { required: true, })}
              />
              {errors.subject && <span className="text-red-600">This field is required</span>}

            </div>

            <div className="sm:col-span-2 mb-3">
              <label
                className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-800 text-center sm:text-left"
              >
                Your Message
              </label>
              <textarea
                rows={6}
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:border-purple-800 focus:outline-none"
                placeholder='Leave a comment...'
                {...register("message", { required: true, })}
              />
              {errors.message && <span className="text-red-600">This field is required</span>}

            </div>

            <div className="grid place-items-center sm:place-items-start">
              <button
                type="submit"
                className="mt-5 py-3 px-5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 "
                disabled={loading}
              >
                {loading ? "Please Wait..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
