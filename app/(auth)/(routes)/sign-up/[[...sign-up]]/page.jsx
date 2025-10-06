import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-6xl w-full px-4">
            <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
      
        {/* Left Image */}
            <div
                className="relative hidden lg:block lg:w-5/12 bg-cover bg-center"
                style={{
                    backgroundImage:
                    "url('https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
                }}
                >
                {/* Fill container height */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Logo at the top-left */}
                <div className="absolute top-6 left-6 z-10">
                    <img src="/logo.svg" alt="Secure Share Logo" className="h-12 w-auto" />
                </div>

                {/* Bottom Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 z-10">
                    <h2 className="text-2xl font-semibold mb-1">
                    Welcome to the Secure File Sharing Platform
                    </h2>
                    <p className="text-sm">
                    Seamlessly and privately share your files with industry-grade security.
                    </p>
                </div>
            </div>


                {/* Right Form */}
                <div className="w-full lg:w-7/12 p-8 flex flex-col justify-center">
                    <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">
                        Sign up to your account
                    </h3>
                    <div className="flex justify-center">
                        <SignUp forceRedirectUrl='/files'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}