"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { PAT_TOKEN } from "@/ENV";

interface FormInput {
  value: string;
  error: null | string;
}



export default function auth() {
  const router = useRouter();
  const [username, setUsername] = useState<FormInput>({
    value: "",
    error: null,
  });
  const [pat, setPat] = useState<FormInput>({ value: PAT_TOKEN, error: null });
  const [showPat, setShowPat] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleToggle() {
    setShowPat((prev) => !prev);
  }

  function validateUsername(): string | null {
    if (username.value.length === 0) return "Username is Required";
    if (username.value.length < 5)
      return "Username should be atleast of 5 characters";

    return null;
  }

  function validatePat(): string | null {
    if (pat.value.length === 0) return "Pat is Required";
    if (pat.value.length < 5) return "Pat should be atleast of 5 characters";

    return null;
  }

  async function handleAuth() {
    setLoading(true);
    setError(null);

    const userRes = validateUsername();
    const patRes = validatePat();

    if (userRes) setUsername({ ...username, error: userRes });
    if (patRes) setPat({ ...pat, error: patRes });

    if (userRes || patRes) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/auth", {
        username: username.value,
        pat: pat.value,
      });
      router.push("/user/me");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Unable to Authorize");
      } else {
        setError("Unable to Authorize");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="rounded-lg w-[90%] max-w-[400px] p-4 md:p-8 shadow-lg text-center bg-white flex flex-col gap-4 md:gap-6 lg:gap-8 items-center">
        <div className="py-4 md:py-6 flex items-center gap-4 justify-center text-xl">
          <p>Authenticate via</p>
          <FaGithub className="text-2xl" />
        </div>

        <div className="flex flex-col items-start w-[90%]">
          <label htmlFor="username" className="text-sm">
            Github Username
          </label>
          <input
            type="text"
            id="username"
            value={username.value}
            onChange={(e) => {
              setUsername({ error: null, value: e.target.value });
            }}
            className="p-4 w-full rounded-lg outline-none border-2 border-gray-300 focus:border-gray-500"
            placeholder="ronnie43"
          />
          {username.error && (
            <p className="text-sm text-red-400">{username.error}</p>
          )}
        </div>

        <div className="flex flex-col items-start w-[90%]">
          <div className="flex justify-between w-full">
            <label htmlFor="pat" className="text-sm">
              Personal Access Token
            </label>

            <button onClick={handleToggle}>
              {showPat ? (
                <RxEyeOpen className="cursor-pointer text-lg" />
              ) : (
                <GoEyeClosed className="cursor-pointer text-lg" />
              )}
            </button>
          </div>
          <input
            type={showPat ? "text" : "password"}
            id="pat"
            className="p-4 w-full rounded-lg outline-none border-2 border-gray-300 focus:border-gray-500"
            placeholder="Personal Access Token"
            value={pat.value}
            onChange={(e) => {
              setPat({ error: null, value: e.target.value });
            }}
          />
          {pat.error && <p className="text-sm text-red-400">{pat.error}</p>}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          className={`text-white py-3 w-full rounded-xl cursor-pointer ${loading ? "bg-gray-500" : "bg-black"}`}
          onClick={handleAuth}
        >
          {loading ? "Authenticating ..." : "Authenticate"}
        </button>
      </div>
    </div>
  );
}
