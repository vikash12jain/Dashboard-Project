import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEcom } from "../Context/EcomProvider";

const RecruiterPage = () => {
  const { apiFetch, isBusy, setAuthError, authError, user, setUser, setAuthToken } = useEcom();
  const navigate = useNavigate();
  
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [loginAttemptSuccess, setLoginAttemptSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    try {
      const data = await apiFetch(
        "/users/register/recruiter",
        {
          method: "POST",
          body: JSON.stringify({ companyName, email }),
        },
        { requestKey: "recruiterLogin" }
      );
      if (!data.user || data.user.isRecruiter !== true) {
        throw new Error("Access denied: User is not marked as a Recruiter.");
      }

      if (!data.token) throw new Error("Server did not return a token");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setAuthToken(data.token);

      setLoginAttemptSuccess(true);
    } catch (error) {
      console.error("Recruiter login failed:", error);
      setAuthError(error.message);
    }
  };

  useEffect(() => {
        if (loginAttemptSuccess && user && user.isRecruiter === true) {
            navigate("/recruiter");
        }
    }, [loginAttemptSuccess, user, navigate]);

  return (
    <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">Recruiter Login</h2>

   
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Login Failed!</strong>
            <span className="ml-2">{authError}</span>
          </div>
        )}

       

        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Company Name*</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Please Enter your company name"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
            />
          </div>

          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email ID*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Please enter your official email"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
            />
          </div>

  
          <p className="text-gray-600 mb-4 text-sm border-l-4 border-stone-800 pl-3">
            <strong>Note: </strong>You will receive view-only access to the <strong>admin dashboard,</strong> allowing you to explore and review my project in a secure and transparent manner.
          </p>
          <button
            type="submit"
            disabled={isBusy && isBusy("recruiterLogin")}
            className="w-full bg-stone-800 hover:bg-stone-700 text-amber-100 font-bold py-2 px-4 rounded-full"
          >
            {isBusy && isBusy("recruiterLogin") ? "Processing…" : "Admin Access"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RecruiterPage;
