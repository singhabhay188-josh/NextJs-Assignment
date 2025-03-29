import Link from "next/link";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import NotFoundUser from "./NotFoundUser";

// To Display: Avatar, Username, Location, Following/Followers, Bio, Link to the Github Page, Blog, Email

async function getGithubInformation(username: string): Promise<User | null> {
  try {
    const userUrl = `https://api.github.com/users/${username}`;
    console.log(userUrl);
    const info = await axios.get(userUrl);
    return info.data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  const cuserInfo = await getGithubInformation(username);

  if (cuserInfo === null) return <NotFoundUser/>

  return (
    <div className="min-h-screen bg-black flex justify-center items-center py-12">
      <div className="shadow-lg w-[90%] max-w-[600px] p-6 pt-12 rounded-lg bg-slate-200 flex flex-col items-center justify-center gap-4">

        <div className="w-full flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-32 border-b pb-6 border-gray-500">
          <div className="rounded-full min-h-32 min-w-32 h-32 w-32 border border-black overflow-hidden">
            <img src={cuserInfo.avatar_url} alt="Avatar" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center">
              {cuserInfo.name ?? "Anonymous"}
            </h1>
            <p className="text-sm max-sm:text-center font-semibold text-center">@{cuserInfo.login}</p>
            {cuserInfo.bio ? <p className="text-center">{cuserInfo.bio}</p> : <p className="italic text-sm text-center">Bio Not Available</p> }
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <MdEmail className="text-blue-500" />
            { cuserInfo.email ? <p>{cuserInfo.email}</p> : <p className="italic">Email Not Found</p>}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaLocationArrow className="text-green-500" />
            { cuserInfo.location ? <p>{cuserInfo.location}</p> : <p className="italic">Space</p>}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaUser className="text-orange-500" />
            <p>
              Want to View My Profile{" "}
              <Link
                href={cuserInfo.url}
                className="text-blue-500 hover:underline"
              >
                <FaExternalLinkSquareAlt className="inline"/>
              </Link>
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full text-gray-700">
          <p className="text-2xl font-semibold">
            <span className="text-blue-500">{cuserInfo.followers ?? 'NULL'}</span>{" "}
            Followers
          </p>
          <p className="text-2xl font-semibold">
            <span className="text-blue-500">{cuserInfo.following ?? 'NULL'}</span>{" "}
            Following
          </p>
        </div>
      </div>
    </div>
  );
}
