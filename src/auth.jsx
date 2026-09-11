import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export default function Auth({ onSuccess }) {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (signup) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await setDoc(doc(db, "users", result.user.uid), {
          name: name.trim(),
          studentId: studentId.trim(),
          course: course.trim(),
          year,
          email: email.trim(),
          createdAt: serverTimestamp(),
        });

        onSuccess(result.user);
      } else {
        const result = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        onSuccess(result.user);
      }
    } catch (err) {
      console.error(err);

      const messages = {
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password must contain at least 6 characters.",
        "auth/user-not-found": "No account exists with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests":
          "Too many attempts. Please wait a moment and try again.",
      };

      setError(messages[err.code] || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setSignup((current) => !current);
    setError("");
  };

  return (
    <div className="auth-shell">
      <div className="auth-background-grid" />

      <div className="auth-layout">
        <section className="auth-brand-panel">
          <div className="auth-brand">
            <span className="auth-brand-mark">C</span>
            <span>CampusBuddy</span>
          </div>

          <div className="auth-copy">
            <span className="auth-kicker">SMART CAMPUS • ONE PLACE</span>

            <h1>
              ExploreYour Campus,
              <br />
            </h1>
              <h2><span>Experience It Smarter.</span></h2>
            

            <p>
              Find spaces, discover events, connect with students,
              report lost items and get campus help — without jumping
              between a dozen places.
            </p>
          </div>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <span>01</span>
              <div>
                <strong>Smart campus discovery</strong>
                <small>Spaces, food, events & transport</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>02</span>
              <div>
                <strong>Student community</strong>
                <small>Find people studying what you study</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>03</span>
              <div>
                <strong>Personal campus profile</strong>
                <small>Your student details stay connected to your account</small>
              </div>
            </div>
          </div>

          <div className="auth-proof">
            <span className="auth-proof-dot" />
            <span>Built for the campus, by students.</span>
          </div>
        </section>

        <section className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-card-top">
              <div>
                <span className="auth-card-kicker">
                  {signup ? "NEW STUDENT" : "WELCOME BACK"}
                </span>

                <h2>
                  {signup ? "Create your account" : "Sign in"}
                </h2>

                <p>
                  {signup
                    ? "Set up your CampusBuddy student profile."
                    : "Pick up where you left off."}
                </p>
              </div>

              <div className="auth-orb">✦</div>
            </div>

            <form className="auth-form" onSubmit={submit}>
              {signup && (
                <>
                  <label>
                    <span>Full name</span>
                    <input
                      type="text"
                      placeholder="e.g. Armaan Bassan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    <span>Student ID</span>
                    <input
                      type="text"
                      placeholder="Your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </label>

                  <div className="auth-form-row">
                    <label>
                      <span>Course</span>
                      <input
                        type="text"
                        placeholder="e.g. CSE"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                      />
                    </label>

                    <label>
                      <span>Year</span>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                      </select>
                    </label>
                  </div>
                </>
              )}

              <label>
                <span>College email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </label>

              {error && (
                <div className="auth-error">
                  <span>!</span>
                  {error}
                </div>
              )}

              <button
                className="auth-submit"
                type="submit"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Connecting..."
                    : signup
                    ? "Create my account"
                    : "Enter CampusBuddy"}
                </span>
                <strong>→</strong>
              </button>
            </form>

            <div className="auth-divider">
              <span>ACCOUNT ACCESS</span>
            </div>

            <button className="auth-switch" onClick={switchMode}>
              {signup
                ? "Already have an account? Sign in"
                : "New here? Create a student account"}
            </button>

            <p className="auth-note">
              Firebase securely handles your authentication. Your student
              profile is stored separately in CampusBuddy's database.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
