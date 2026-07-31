import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { HiEnvelope, HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  createProfile,
} from "../services/authService";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/firebase";

export default function LoginCard() {
  const navigate = useNavigate();
  const [firebaseUser, setFirebaseUser] = useState(null);

  // login | email | profile
  const [step, setStep] = useState("login");

  const [isLogin, setIsLogin] = useState(true);

  // Email Auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // GOOGLE LOGIN
  // ------------------------------------

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      console.log(result.user);

      /*
        NEXT PART

        MongoDB Check

        Existing User
        -> navigate("/get-started")

        New User
        -> setStep("profile")
      */

      const user = result.user;

setFirebaseUser(user);

const profile = await getProfile(user.uid);

if (profile) {
  navigate("/get-started");
} else {
  setStep("profile");
}
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // EMAIL LOGIN / SIGNUP
  // ------------------------------------

  const handleEmailAuth = async () => {
    try {
      setLoading(true);

      if (isLogin) {
        const result =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        console.log(result.user);

      } else {

        const result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        console.log(result.user);

      }

      /*
          Same Logic

          Existing
          -> Landing

          New
          -> Profile
      */

      const user = result.user;

setFirebaseUser(user);

const profile = await getProfile(user.uid);

if (profile) {
  navigate("/get-started");
} else {
  setStep("profile");
}

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">

      {/* LOGIN SCREEN */}

      {step === "login" && (

        <motion.div
          key="login"
          initial={{ opacity: 0, scale: .92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .45 }}
          className="w-[430px] rounded-3xl border border-white/10 bg-black/35 p-10 backdrop-blur-2xl text-white shadow-2xl"
        >

          <div className="mb-8 flex justify-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/30 bg-violet-500/10">

              <span className="text-3xl font-bold tracking-[6px]">
                GA
              </span>

            </div>

          </div>

          <h1 className="text-center text-4xl font-bold">
            GTA Assistant
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Your Intelligent AI Companion
          </p>

          <div className="mt-10 space-y-4">

            <button
              disabled={loading}
              onClick={handleGoogleLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-black font-semibold transition hover:scale-[1.02]"
            >

              <FcGoogle size={24} />

              Continue with Google

            </button>

            <button
              onClick={() => setStep("email")}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10"
            >

              <HiEnvelope size={22} />

              Continue with Email

            </button>

          </div>

          <p className="mt-8 text-center text-xs text-gray-500 leading-6">
            By continuing you agree to our
            Terms of Service and Privacy Policy.
          </p>

        </motion.div>

      )}

      {/* EMAIL SCREEN */}

      {step === "email" && (

        <motion.div
          key="email"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: .4 }}
          className="w-[430px] rounded-3xl border border-white/10 bg-black/35 p-10 backdrop-blur-2xl text-white"
        >

          <button
            onClick={() => setStep("login")}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
          >

            <HiArrowLeft />

            Back

          </button>

          <h2 className="text-3xl font-bold">

            {isLogin
              ? "Welcome Back"
              : "Create Account"}

          </h2>

          <p className="mt-2 text-gray-400">

            Continue using your email.

          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mt-8 h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="mt-4 h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none focus:border-violet-500"
          />

          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="mt-8 h-14 w-full rounded-2xl bg-violet-600 font-semibold hover:bg-violet-500"
          >

            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In"
                : "Create Account"}

          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 w-full text-center text-sm text-violet-300"
          >

            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}

          </button>

        </motion.div>

      )}

          {/* PROFILE SCREEN */}

      {step === "profile" && (

        <motion.div
          key="profile"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: .45 }}
          className="w-[430px] rounded-3xl border border-white/10 bg-black/35 p-10 backdrop-blur-2xl text-white shadow-2xl"
        >

          <h2 className="text-3xl font-bold text-center">
            Complete Your Profile
          </h2>

          <p className="mt-2 text-center text-gray-400">
            Just a few details before we continue.
          </p>

          {/* Name */}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-8 h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none focus:border-violet-500"
          />

          {/* DOB */}

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-4 h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 outline-none focus:border-violet-500"
          />

          {/* Gender */}

          <p className="mt-6 mb-3 text-sm text-gray-400">
            Select Gender
          </p>

          <div className="grid grid-cols-3 gap-3">

            <button
              type="button"
              onClick={() => setGender("male")}
              className={`rounded-2xl border py-4 transition ${
                gender === "male"
                  ? "border-violet-500 bg-violet-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              👨
              <div className="mt-2 text-sm">
                Male
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGender("female")}
              className={`rounded-2xl border py-4 transition ${
                gender === "female"
                  ? "border-violet-500 bg-violet-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              👩
              <div className="mt-2 text-sm">
                Female
              </div>
            </button>

            <button
              type="button"
              onClick={() => setGender("other")}
              className={`rounded-2xl border py-4 transition ${
                gender === "other"
                  ? "border-violet-500 bg-violet-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              🌐
              <div className="mt-2 text-sm">
                Other
              </div>
            </button>

          </div>

          <button
            onClick={async () => {

              if (!name.trim()) {
                alert("Please enter your name.");
                return;
              }

              if (!dob) {
                alert("Please select your date of birth.");
                return;
              }

              if (!gender) {
                alert("Please select your gender.");
                return;
              }

              // MongoDB Save
              // Coming Next

             await createProfile({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  name,
  dob,
  gender,
});
localStorage.setItem(
  "userProfile",
  JSON.stringify({
    name,
    dob,
    gender,
  })
);
navigate("/get-started");

            }}
            className="mt-8 h-14 w-full rounded-2xl bg-violet-600 font-semibold transition hover:bg-violet-500 hover:scale-[1.02]"
          >
            Continue
          </button>

        </motion.div>

      )}

    </AnimatePresence>
  );
}