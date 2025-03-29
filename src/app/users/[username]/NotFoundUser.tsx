export default async function NotFoundUser() {

    return (
      <div className="min-h-screen bg-black flex justify-center items-center py-12">
        <div className="shadow-lg w-[90%] max-w-[600px] p-6 pt-12 rounded-lg bg-slate-200 flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl italic sm:text-4xl font-bold bg-gradient-to-br from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center p-4">
              User Not Found
            </h1>
        </div>
      </div>
    );
  }
  