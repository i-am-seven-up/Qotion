"use client";

import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs"
import SignInBtn from "./SignInBtn";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
    const { user } = useUser();
    return (
        <div className="sticky top-0 z-[999] flex justify-between p-4 items-center bg-white">
            <p> 
                {
                    user && (
                        <h1 className="font-bold">
                            {user!.firstName}
                            {`'s`} WorkSpace
                        </h1>
                    )
                }
            </p>
            <Breadcrumbs/>
            <div>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <SignedOut>
                    <SignInBtn/>
                </SignedOut>
            </div>
        </div>
    )
}
export default Header