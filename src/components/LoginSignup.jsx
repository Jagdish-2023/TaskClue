import { useState } from "react";
import "../css/loginSignup.css";
import { newUserSignupAsync, signInuserAsync } from "../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ path }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storageToken, isRegistered, error, status } = useSelector(
    (state) => state.tasks
  );

  const [isSignup, setIsSignup] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  // const [error, setError] = useState(null);
  // const [hasToken, setHasToken] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = ({ fullName, email, password }) => {
    dispatch(newUserSignupAsync({ name: fullName, email, password }));

    if (isRegistered) {
      setIsSignup(false);
      setIsAccountCreated(true);
    }
  };

  const signInUser = ({ email, password }) => {
    dispatch(signInuserAsync({ email, password }));
    if (storageToken) {
      navigate(path ? path : "/dashboard");
      // setHasToken(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      registerNewUser({ fullName, email, password });
      setFullName("");
      setEmail("");
      setPassword("");
    } else {
      signInUser({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {!storageToken && (
        <div
          className="row justify-content-center align-items-center bg-light m-0"
          style={{ height: "100vh" }}
        >
          <div className="col-md-3 border rounded-4 bg-white p-4">
            <div>
              <p
                className="fs-5 text-center"
                style={{ color: "rgb(125 7 255)" }}
              >
                Workasana
              </p>
              {!isAccountCreated && (
                <div>
                  {" "}
                  <p className="fs-4 text-center m-0">
                    {isSignup
                      ? "Register a new account"
                      : "Log in to your account"}
                  </p>
                  <p className="text-center" style={{ marginTop: "0.5rem" }}>
                    Please enter your details
                  </p>{" "}
                </div>
              )}
            </div>

            {!isAccountCreated && (
              <form onSubmit={handleFormSubmit}>
                {isSignup && (
                  <div className="mt-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        required
                      />
                      <br />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                      <br />
                    </div>

                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </div>
                  </div>
                )}

                {!isSignup && (
                  <div className="d-flex flex-column gap-3 mt-4">
                    <div>
                      <label htmlFor="email">*Email</label>
                      <br />
                      <input
                        id="email"
                        type="text"
                        placeholder="Enter your Email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="password">*Password</label>
                      <br />
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-primary">
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setFullName("");
                      setEmail("");
                      setPassword("");
                      setIsSignup((prev) => (prev ? false : true));
                      // setError(null);
                    }}
                  >
                    {isSignup ? "Sign In" : "Sign Up"}
                  </button>
                </div>
              </form>
            )}

            {isAccountCreated && (
              <div>
                <p className="text-success fs-5 text-center">
                  Account registered successfully
                </p>
                <p
                  className="text-center"
                  onClick={() => {
                    setIsSignup(false);
                    setIsAccountCreated(false);
                  }}
                >
                  Return to Login
                </p>
              </div>
            )}

            {error && status === "error" && (
              <p className="text-danger text-center m-0">{error}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
