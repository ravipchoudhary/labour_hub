export default function Login() {
    return (
        <div className="min-h-screen bg-[#8EC5FF]
         flex items-center justify-center">

            <div className="w-full max-w-[1500px]
            bg-[#141A73] rounded-[17px] flex
            justify-center py-20 mt-3 mb-3 ">

                <div className="w-[420px] bg-white 
                rounded-[20px] px-10 py-12 shadow-1g">
{/* logo */}
                    <div className="flex justify-center
                    mb-5">

                        <div className="w-14 h-14 
                        bg-[#FF8A00] rounded-xl 
                        flex items-center justify-center 
                        text-white text-xl">logo
                        </div>
                    </div>
                    <h1 className="text-center text-xl 
                    font-semibold">Admin Portal</h1>

                    <p className="text-center text-sm 
                    text-gray-500 mt-1">Sign in to access the admin dashboard</p>

                    <div className="relative mt-7">
                        <span className="absolute left-3 top-1/2 -translate-y-3/2 mt-1 
                        text-gray-400">✉️</span>
                        <label className="text-sm font-medium">Email Address</label>
                        
                        <input className="w-full mt-1 h-[46px] 
                        border rounded-lg pl-10 pr-4" defaultValue="admin@gmail.com"/>
                    </div>

                    <div className="mt-4">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative mt-1">
                            <span className="absolute left-3 
                            top-1/2 -translate-y-1/2 mt-0.5 text-gray-400">🔒</span>
                            <input type="password" className="w-full mt-1 
                        h-[46px] border rounded-lg pl-10 pr-10" 
                        placeholder="Enter your password"/>

                        <span className="absolute right-3 top-3/2
                        mt-4 -translate-1/2 text-gray-400 cursor-pointer 
                        ">👁️</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 
                    h-[46px] bg-[#FF8A00] text-white font-semibold 
                    rounded-lg">Sign In to button</button>

                    <div className="my-6 border-t"></div>

                    <p className="text-center text-sm 
                    text-gray-500 cursor-pointer ">Back to Home</p>
                </div>
            </div>
        </div>
    );
}