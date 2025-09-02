import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthCtx } from "../../context/AuthContext";
import SideNavbar from "./components/SideNavbar";
import toast from "react-hot-toast";

export default function AdminLayout() {
  const { signOut } = useContext(AuthCtx);
  const nav = useNavigate();
  const timerRef = useRef(null);
  const warningRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleLogout = () => {
    signOut();
    nav("/");
  };

  useEffect(() => {
    const resetTimer = () => {
      // clear old timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);

      setShowWarning(false); // remove warning if active

      // show warning at 9 mins
      warningRef.current = setTimeout(() => {
        setShowWarning(true);
        toast.error("⚠️ You will be logged out in 1 minute due to inactivity.");
      }, 9 * 60 * 1000);

      // auto logout at 10 mins
      timerRef.current = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000);
    };

    // User activity resets timer
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start first timer
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, []);

  return (
    <div className="flex">
      <SideNavbar onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Optional in-page warning banner */}
      {showWarning && (
        <div className="fixed bottom-5 right-5 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
          ⚠️ You will be logged out in 1 minute due to inactivity.
        </div>
      )}
    </div>
  );
}
