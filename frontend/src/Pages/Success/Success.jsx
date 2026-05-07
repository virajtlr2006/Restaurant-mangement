import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Success = () => {
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.confirmationMessage) {
      navigate("/", { replace: true });
      return;
    }

    const timeoutId = setInterval(() => {
      setCountdown((preCount) => {
        if (preCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return preCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate, state?.confirmationMessage]);

  return (
    <>
      <section className="notFound">
        <div className="container">
          <img src="/sandwich.png" alt="success" />
          <h1>Table Registered Successfully!</h1>
          <p>{state?.confirmationMessage}</p>
          <p>
            Reservation for <strong>{state?.reservationName}</strong> on{" "}
            <strong>{state?.date}</strong> at <strong>{state?.time}</strong>.
          </p>
          <p>Redirecting to Home in {countdown} seconds...</p>
          <Link to={"/"}>
            Back to Home <HiOutlineArrowNarrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Success;
